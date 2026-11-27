/* MA2 Tanuló — cloud: username login, progress sync, exam upload, admin API (Supabase) */
(function () {
  'use strict';
  const MA = window.MA;
  const cfg = window.MA_CONFIG || {};
  const ready = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase && window.supabase.createClient);
  /* The admin session lives only in memory: a reload logs the admin out too. */
  const sb = ready ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: true }
  }) : null;

  /* The learner "login" also lives only in memory: reload = logged out, so the next
     person at a shared (work) PC never lands in someone else's account.
     OWNER/DIRTY only remember whose unsaved progress is still in this browser. */
  const OWNER_KEY = 'ma2tanulo:owner', DIRTY_KEY = 'ma2tanulo:dirty';
  const OLD_KEYS = ['ma2tanulo:user', 'ma2tanulo:admin'];
  const IDLE_MS = 10 * 60 * 1000, WARN_MS = 60 * 1000;
  const C = (MA.cloud = { ready, user: null, submissions: [], quiz: [], status: ready ? 'idle' : 'off', listeners: [], idleLeft: IDLE_MS, adminActive: false, loggedOutReason: null });
  const emit = () => C.listeners.forEach((f) => { try { f(C); } catch (e) { /* ignore */ } });
  C.on = (f) => C.listeners.push(f);
  C.IDLE_MIN = IDLE_MS / 60000;
  C.PASS = 0.8;

  /* "Kati Szabó" -> "kati.szabo" */
  C.slug = (name) => String(name || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '.').replace(/[^a-z0-9._-]/g, '').replace(/\.{2,}/g, '.').replace(/^[._-]+|[._-]+$/g, '').slice(0, 32);
  C.valid = (u) => /^[a-z0-9._-]{2,32}$/.test(u);

  const ls = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
    del: (k) => { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };
  const hasProgress = (st) => !!st && ['steps', 'done', 'quiz'].some((k) => st[k] && Object.keys(st[k]).length);
  const lessonOf = (st) => (st.pos && st.pos.l) || st.last || null;

  /* Save someone's leftover progress to the server without touching the screen. */
  const flushTo = async (username, snap) => {
    const { data, error } = await sb.rpc('learner_load', { p_username: username, p_display: null });
    if (error) return false;
    const merged = MA.mergeStates(snap, (data && data.progress) || {});
    const r = await sb.rpc('learner_save', { p_username: username, p_progress: merged, p_pct: MA.totalOf(merged), p_lesson: lessonOf(merged) });
    return !r.error;
  };

  /* On every page load: nobody is logged in. If the previous person left unsaved
     progress here, send it to their account, then forget it locally. */
  (() => {
    let owner = ls.get(OWNER_KEY), dirty = ls.get(DIRTY_KEY) === '1';
    let legacy = null;
    try { legacy = JSON.parse(ls.get('ma2tanulo:user') || 'null'); } catch (e) { legacy = null; }
    if (!owner && legacy && legacy.username) { owner = legacy.username; dirty = true; } // from before this update
    const snap = JSON.parse(JSON.stringify(MA.store.state));
    [OWNER_KEY, DIRTY_KEY].concat(OLD_KEYS).forEach(ls.del);
    MA.store.replace({});
    if (ready && owner && C.valid(owner) && dirty && hasProgress(snap)) flushTo(owner, snap).catch(() => {});
  })();

  /* ---------- learner ---------- */
  C.login = async (displayName) => {
    if (!ready) throw new Error('A szerver még nincs beállítva.');
    const username = C.slug(displayName);
    if (!C.valid(username)) throw new Error('A név legyen legalább 2 betű (ékezet nélkül is jó).');
    C.status = 'syncing'; emit();
    const { data, error } = await sb.rpc('learner_load', { p_username: username, p_display: String(displayName).trim() });
    if (error) { C.status = 'error'; emit(); throw new Error('Nem sikerült kapcsolódni a szerverhez.'); }
    MA.store.replace(data.progress || {});
    C.user = { username, display: data.display_name || displayName };
    C.submissions = data.submissions || [];
    C.quiz = data.quiz || [];
    C.loggedOutReason = null;
    ls.set(OWNER_KEY, username); ls.del(DIRTY_KEY);
    C.touch();
    C.status = 'ok'; emit();
    return data;
  };

  C.logout = async (reason) => {
    if (C.user && ls.get(DIRTY_KEY) === '1') { clearTimeout(pushTimer); await saveNow().catch(() => {}); }
    C.user = null; C.submissions = []; C.quiz = []; C.loggedOutReason = reason || null;
    MA.quizRun = null;
    ls.del(OWNER_KEY); ls.del(DIRTY_KEY);
    MA.store.replace({});           // local copy belongs to the person who just left
    emit();
  };

  C.refresh = async () => {
    if (!ready || !C.user) return;
    const { data, error } = await sb.rpc('learner_load', { p_username: C.user.username, p_display: C.user.display });
    if (error) { C.status = 'error'; emit(); return; }
    MA.store.merge(data.progress);
    C.submissions = data.submissions || [];
    C.quiz = data.quiz || [];
    C.status = 'ok'; emit();
  };

  let pushTimer = null, pushing = false, again = false;
  const saveNow = async () => {
    const user = C.user;
    if (!user) return;
    const st = MA.store.state;
    const { error } = await sb.rpc('learner_save', { p_username: user.username, p_progress: st, p_pct: MA.totalProgress(), p_lesson: lessonOf(st) });
    if (error) throw error;
    if (C.user === user && !again) ls.del(DIRTY_KEY);
  };
  C.push = (now) => {
    if (!ready || !C.user) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      if (pushing) { again = true; return; }
      pushing = true; C.status = 'syncing'; emit();
      let ok = true;
      try { await saveNow(); } catch (e) { ok = false; }
      pushing = false;
      C.status = ok ? 'ok' : 'error'; emit();
      if (again) { again = false; C.push(); }
    }, now ? 0 : 1500);
  };
  MA.onSave = () => { if (C.user) { ls.set(DIRTY_KEY, '1'); C.push(); } };
  window.addEventListener('pagehide', () => { if (C.user && ls.get(DIRTY_KEY) === '1') C.push(true); });

  /* ---------- inactivity: 10 minutes without touching the page = logged out ---------- */
  let lastAct = Date.now();
  C.touch = () => { lastAct = Date.now(); };
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'scroll', 'touchstart'].forEach((ev) =>
    window.addEventListener(ev, C.touch, { passive: true, capture: true }));
  C.onIdle = null;        // accounts.js shows the warning / handles the timeout
  setInterval(() => {
    if (!C.user && !C.adminActive) return;
    C.idleLeft = Math.max(0, IDLE_MS - (Date.now() - lastAct));
    if (C.onIdle) C.onIdle(C.idleLeft, C.idleLeft <= WARN_MS);
  }, 1000);

  /* ---------- elméleti teszt (timed quiz) ---------- */
  C.quizPassed = () => C.quiz.some((a) => a.passed);
  C.quizStart = async () => {
    if (!ready || !C.user) throw new Error('Előbb lépj be a neveddel.');
    const { data, error } = await sb.rpc('learner_quiz_start', { p_username: C.user.username });
    if (error) throw new Error('Nem sikerült elindítani a tesztet: ' + error.message);
    return data;                     // { id, started_at }
  };
  C.quizFinish = async (id, score, total, answers) => {
    if (!ready || !C.user) throw new Error('Kiléptél — a teszt nem lett beadva.');
    const { data, error } = await sb.rpc('learner_quiz_finish', { p_username: C.user.username, p_id: id, p_score: score, p_total: total, p_answers: answers });
    if (error) throw new Error('A beadás nem sikerült: ' + error.message);
    await C.refresh();
    return data;                     // { id, duration_s, score, total, passed, ... }
  };

  C.submitExam = async (file, note) => {
    if (!ready || !C.user) throw new Error('Előbb lépj be a neveddel.');
    if (!C.quizPassed()) throw new Error('Előbb az elméleti tesztet kell legalább 80%-kal teljesítened.');
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

  /* ---------- hibajelzés (flag) ---------- */
  C.report = async (lessonId, stepId, stepTitle, comment) => {
    if (!ready || !C.user) throw new Error('Előbb lépj be a neveddel.');
    const text = String(comment || '').trim();
    if (text.length < 3) throw new Error('Írd le röviden, mi a hiba.');
    const { error } = await sb.rpc('learner_report', { p_username: C.user.username, p_lesson: lessonId, p_step: stepId || null, p_title: stepTitle || null, p_comment: text });
    if (error) throw new Error('Nem sikerült elküldeni: ' + error.message);
  };

  /* ---------- admin ---------- */
  C.admin = {
    async session() {
      if (!ready) return null;
      const { data } = await sb.auth.getSession();
      if (!data.session) { C.adminActive = false; return null; }
      const { data: ok } = await sb.rpc('is_admin');
      C.adminActive = !!ok;
      return ok ? data.session : 'not-admin';
    },
    async login(email, password) {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw new Error('Hibás email vagy jelszó.');
      const { data: ok } = await sb.rpc('is_admin');
      if (!ok) { await sb.auth.signOut(); throw new Error('Ez a fiók nem admin. (Add hozzá az admins táblához — lásd setup.sql vége.)'); }
      C.adminActive = true; C.touch();
    },
    async logout() { C.adminActive = false; await sb.auth.signOut(); },
    async quizAttempts() {
      const { data, error } = await sb.from('quiz_attempts').select('*').order('started_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    async reports() {
      const { data, error } = await sb.from('lesson_reports').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    async setReport(id, status) {
      const { error } = await sb.from('lesson_reports').update({ status }).eq('id', id);
      if (error) throw error;
    },
    async deleteReport(id) {
      const { error } = await sb.from('lesson_reports').delete().eq('id', id);
      if (error) throw error;
    },
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
