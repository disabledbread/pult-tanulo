/* MA2 Tanuló — cloud: username login, progress sync, exam upload, admin API (Supabase) */
(function () {
  'use strict';
  const MA = window.MA;
  const cfg = window.MA_CONFIG || {};
  const ready = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase && window.supabase.createClient);
  const sb = ready ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'ma2tanulo:admin' }
  }) : null;

  const USER_KEY = 'ma2tanulo:user';
  const C = (MA.cloud = { ready, user: null, submissions: [], status: ready ? 'idle' : 'off', listeners: [] });
  const emit = () => C.listeners.forEach((f) => { try { f(C); } catch (e) { /* ignore */ } });
  C.on = (f) => C.listeners.push(f);

  /* "Kati Szabó" -> "kati.szabo" */
  C.slug = (name) => String(name || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '.').replace(/[^a-z0-9._-]/g, '').replace(/\.{2,}/g, '.').replace(/^[._-]+|[._-]+$/g, '').slice(0, 32);
  C.valid = (u) => /^[a-z0-9._-]{2,32}$/.test(u);

  try { C.user = JSON.parse(localStorage.getItem(USER_KEY)); } catch (e) { C.user = null; }
  const saveUser = () => { try { if (C.user) localStorage.setItem(USER_KEY, JSON.stringify(C.user)); else localStorage.removeItem(USER_KEY); } catch (e) { /* ignore */ } };

  /* ---------- learner ---------- */
  C.login = async (displayName) => {
    if (!ready) throw new Error('A szerver még nincs beállítva.');
    const username = C.slug(displayName);
    if (!C.valid(username)) throw new Error('A név legyen legalább 2 betű (ékezet nélkül is jó).');
    C.status = 'syncing'; emit();
    const { data, error } = await sb.rpc('learner_load', { p_username: username, p_display: String(displayName).trim() });
    if (error) { C.status = 'error'; emit(); throw new Error('Nem sikerült kapcsolódni a szerverhez.'); }
    const sameUser = C.user && C.user.username === username;
    if (sameUser) MA.store.merge(data.progress);         // same person: keep both
    else MA.store.replace(data.progress || {});           // someone else: start from their server copy
    C.user = { username, display: data.display_name || displayName };
    C.submissions = data.submissions || [];
    saveUser();
    C.status = 'ok'; emit();
    C.push(true);
    return data;
  };

  C.logout = () => {
    C.user = null; C.submissions = []; saveUser();
    MA.store.replace({});           // local copy belongs to the previous person
    emit();
  };

  C.refresh = async () => {
    if (!ready || !C.user) return;
    const { data, error } = await sb.rpc('learner_load', { p_username: C.user.username, p_display: C.user.display });
    if (error) { C.status = 'error'; emit(); return; }
    MA.store.merge(data.progress);
    C.submissions = data.submissions || [];
    C.status = 'ok'; emit();
  };

  let pushTimer = null, pushing = false, again = false;
  C.push = (now) => {
    if (!ready || !C.user) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      if (pushing) { again = true; return; }
      pushing = true; C.status = 'syncing'; emit();
      const st = MA.store.state;
      const { error } = await sb.rpc('learner_save', {
        p_username: C.user.username, p_progress: st, p_pct: MA.totalProgress(), p_lesson: (st.pos && st.pos.l) || st.last || null
      });
      pushing = false;
      C.status = error ? 'error' : 'ok'; emit();
      if (again) { again = false; C.push(); }
    }, now ? 0 : 1500);
  };
  MA.onSave = () => C.push();

  C.submitExam = async (file, note) => {
    if (!ready || !C.user) throw new Error('Előbb lépj be a neveddel.');
    if (!file) throw new Error('Válaszd ki a .show.gz fájlt.');
    if (!/\.gz$/i.test(file.name)) throw new Error('Csak .show.gz fájlt tölts fel (a grandMA2 showfájlja).');
    if (file.size > 50 * 1024 * 1024) throw new Error('A fájl túl nagy (max. 50 MB).');
    const safe = file.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9._-]+/g, '_');
    const path = `${C.user.username}/${Date.now()}-${safe}`;
    const up = await sb.storage.from('exams').upload(path, file, { contentType: 'application/gzip', upsert: false });
    if (up.error) throw new Error('A feltöltés nem sikerült: ' + up.error.message);
    const { error } = await sb.rpc('learner_submit', { p_username: C.user.username, p_file_path: path, p_file_name: file.name, p_note: note || '' });
    if (error) throw new Error('A beküldés nem sikerült: ' + error.message);
    await C.refresh();
  };

  /* ---------- admin ---------- */
  C.admin = {
    async session() {
      if (!ready) return null;
      const { data } = await sb.auth.getSession();
      if (!data.session) return null;
      const { data: ok } = await sb.rpc('is_admin');
      return ok ? data.session : 'not-admin';
    },
    async login(email, password) {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw new Error('Hibás email vagy jelszó.');
      const { data: ok } = await sb.rpc('is_admin');
      if (!ok) { await sb.auth.signOut(); throw new Error('Ez a fiók nem admin. (Add hozzá az admins táblához — lásd setup.sql vége.)'); }
    },
    async logout() { await sb.auth.signOut(); },
    async learners() {
      const { data, error } = await sb.from('learners').select('username, display_name, pct, current_lesson, progress, created_at, updated_at').order('updated_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    async submissions() {
      const { data, error } = await sb.from('exam_submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    async review(id, fields) {
      const { error } = await sb.from('exam_submissions').update(Object.assign({}, fields, { reviewed_at: new Date().toISOString() })).eq('id', id);
      if (error) throw error;
    },
    async fileUrl(path) {
      const { data, error } = await sb.storage.from('exams').createSignedUrl(path, 600, { download: true });
      if (error) throw error;
      return data.signedUrl;
    },
    async removeLearner(username) {
      const { error } = await sb.from('learners').delete().eq('username', username);
      if (error) throw error;
    }
  };
})();
