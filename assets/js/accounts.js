/* MA2 Tanuló — accounts UI: username login, profile, exam upload, admin */
(function () {
  'use strict';
  const MA = window.MA, C = MA.cloud;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = MA.esc, md = MA.md;
  MA.routes = MA.routes || {};

  /* ---------- small helpers ---------- */
  const fmt = (d) => (d ? new Intl.DateTimeFormat('hu-HU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d)) : '—');
  const ago = (d) => {
    if (!d) return '—';
    const s = (Date.now() - new Date(d).getTime()) / 1000;
    if (s < 90) return 'épp most';
    if (s < 3600) return Math.round(s / 60) + ' perce';
    if (s < 86400) return Math.round(s / 3600) + ' órája';
    if (s < 86400 * 30) return Math.round(s / 86400) + ' napja';
    return fmt(d);
  };
  const pctTxt = (p) => Math.round((p || 0) * 100) + '%';
  const bar = (p) => `<span class="pbar"><i style="width:${pctTxt(p)}"></i></span>`;
  const STATUS = { bekuldve: ['Ellenőrzésre vár', 'wait'], elfogadva: ['Elfogadva', 'ok'], javitando: ['Javítandó', 'fix'] };
  const chip = (s) => { const [t, c] = STATUS[s] || [s, 'wait']; return `<span class="chip st st-${c}">${t}</span>`; };
  const SYNC = { off: 'Nincs szerver beállítva', idle: 'Kapcsolódás…', syncing: 'Mentés…', ok: 'Mentve a szerverre', error: 'Nem sikerült menteni — újrapróbálom' };
  const ui = () => MA.ui;
  const head = (cmd, title, lead) => `<header class="page-head wrap">${ui().cmdbar(esc(cmd))}<h1 class="h1">${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</header>`;
  const notReady = (title) => `${head(title, title)}<section class="wrap"><div class="call info"><span class="ci"></span><div><h4>A profilrendszer még nincs bekapcsolva</h4><p>Ehhez az oktatónak be kell állítania a szervert (Supabase). Addig a haladásod ebben a böngészőben mentődik.</p></div></div></section>`;

  /* ---------- nav user chip ---------- */
  MA.onNav = () => {
    const el = document.getElementById('navUser');
    if (!el) return;
    if (!C.ready) { el.hidden = true; return; }
    el.hidden = false;
    el.classList.toggle('active', location.hash.startsWith('#/profil'));
    el.innerHTML = C.user
      ? `<span class="sync ${C.status}"></span><span class="nm">${esc(C.user.display)}</span>`
      : '<span class="nm">Belépés</span>';
    el.title = C.user ? `${C.user.username} · ${SYNC[C.status] || ''}` : 'Lépj be a neveddel';
  };
  C.on(() => MA.onNav());

  /* ---------- login (gate + inline) ---------- */
  const loginBox = () => `<div class="login-box win">
      <div class="win-title"><span class="ball"></span>Belépés</div>
      <form class="login-form" autocomplete="off" novalidate>
        <h2>Szia! Hogy hívnak?</h2>
        ${C.loggedOutReason === 'idle' ? `<p class="login-note">${C.IDLE_MIN} percig nem csináltál semmit, ezért kiléptettünk. A haladásod el van mentve — lépj be újra a neveddel.</p>` : ''}
        <p>Írd be a neved. Ugyanezzel a névvel bármelyik gépen onnan folytatod, ahol abbahagytad. Jelszó nem kell.</p>
        <p class="muted small">Biztonság: az oldal frissítésekor és ${C.IDLE_MIN} perc tétlenség után automatikusan kilépsz, így a közös gépen senki nem kerül a te fiókodba.</p>
        <input class="login-name" name="name" type="text" maxlength="40" placeholder="pl. Szabó Kati" required>
        <div class="login-user">Felhasználónév: <code class="login-slug">—</code></div>
        <div class="login-err" role="alert"></div>
        <button class="btn btn-primary" type="submit">Belépés</button>
      </form></div>`;
  const bindLogin = (root, after) => {
    const inp = $('.login-name', root), slug = $('.login-slug', root), err = $('.login-err', root), form = $('form', root), btn = $('button', form);
    inp.addEventListener('input', () => { slug.textContent = C.slug(inp.value) || '—'; });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = ''; btn.disabled = true; btn.textContent = 'Kapcsolódás…';
      try {
        const data = await C.login(inp.value);
        const back = data && data.progress && data.progress.steps && Object.keys(data.progress.steps).length;
        ui().toast(back ? 'Üdv újra! Onnan folytatod, ahol abbahagytad.' : `Szia, ${C.user.display}!`);
        if (after) after();
      } catch (ex) {
        err.textContent = ex.message; btn.disabled = false; btn.textContent = 'Belépés';
      }
    });
    setTimeout(() => inp.focus(), 60);
  };
  const closeGate = () => { const g = $('#gate'); if (g) g.remove(); };
  const openGate = () => {
    if ($('#gate')) return;
    const d = document.createElement('div');
    d.id = 'gate'; d.className = 'gate'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.innerHTML = loginBox();
    document.body.appendChild(d);
    bindLogin(d, () => { closeGate(); ui().route(); });
  };
  MA.afterRoute = (sec) => {
    if (!C.ready || C.user || sec === 'admin') { closeGate(); return; }
    openGate();
  };

  /* ---------- inactivity: warning in the last minute, then log out ---------- */
  let idleEl = null;
  C.onIdle = async (left, warn) => {
    if (left <= 0) {
      if (idleEl) { idleEl.remove(); idleEl = null; }
      if (C.user) { await C.logout('idle'); closeGate(); ui().route(); }
      if (C.adminActive) { await C.admin.logout(); if (location.hash.startsWith('#/admin')) ui().route(); ui().toast(`Admin: ${C.IDLE_MIN} perc tétlenség miatt kiléptél`); }
      return;
    }
    if (!warn) { if (idleEl) { idleEl.remove(); idleEl = null; } return; }
    if (!idleEl) {
      idleEl = document.createElement('div');
      idleEl.className = 'idle-warn'; idleEl.setAttribute('role', 'alert');
      document.body.appendChild(idleEl);
    }
    idleEl.innerHTML = `<b>${Math.ceil(left / 1000)} mp</b> múlva kiléptetünk, mert ${C.IDLE_MIN} perce nem csináltál semmit. Mozdítsd meg az egeret, és maradsz.`;
  };

  /* ---------- hibajelzés (flag) dialog ---------- */
  MA.openReport = (lid, sid, title) => {
    if (!C.ready) { ui().toast('A hibajelzéshez szerver kell'); return; }
    if (!C.user) { openGate(); return; }
    const l = MA.byId[lid];
    const d = document.createElement('div');
    d.className = 'gate'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.innerHTML = `<form class="login-box win report-box" novalidate>
        <div class="win-title"><span class="ball"></span>${MA.icon.flag} Hibajelzés</div>
        <div class="login-form">
          <p class="muted small">${esc(lid)} · ${esc(l ? l.title : '')}${title ? ` — <b>${esc(title)}</b>` : ''}</p>
          <textarea class="rep-text" rows="4" maxlength="2000" placeholder="Mi a hiba? Pl. „nálam nem ez a gomb van”, „a kép mást mutat”…"></textarea>
          <div class="login-err" role="alert"></div>
          <div class="cta-row" style="margin:0"><button class="btn btn-primary" type="submit">Elküldöm</button><button class="btn btn-ghost rep-cancel" type="button">Mégse</button></div>
        </div></form>`;
    document.body.appendChild(d);
    const close = () => d.remove();
    $('.rep-cancel', d).addEventListener('click', close);
    d.addEventListener('click', (e) => { if (e.target === d) close(); });
    $('form', d).addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = $('button[type=submit]', d), err = $('.login-err', d);
      btn.disabled = true; err.textContent = '';
      try { await C.report(lid, sid, title, $('.rep-text', d).value); close(); ui().toast('Köszi! Az oktató megkapta a jelzést.'); }
      catch (ex) { err.textContent = ex.message; btn.disabled = false; }
    });
    setTimeout(() => $('.rep-text', d).focus(), 60);
  };

  /* ---------- PROFILE ---------- */
  MA.routes.profil = ({ app }) => {
    if (!C.ready) { app.innerHTML = notReady('Profil'); return; }
    if (!C.user) { app.innerHTML = head('Profil', 'Belépés') + `<section class="wrap">${loginBox()}</section>`; bindLogin(app, () => ui().route()); return; }
    const total = MA.totalProgress();
    const last = C.submissions[0];
    app.innerHTML = head('Profil · ' + C.user.username, esc(C.user.display), `Felhasználónév: <code>${esc(C.user.username)}</code> — ezzel tudsz bármelyik gépen belépni.`) + `
      <section class="wrap" style="padding-bottom:40px">
        <div class="prof-top">
          <div class="win"><div class="win-title gray"><span class="ball"></span>Haladás</div>
            <div class="win-body"><b class="big">${pctTxt(total)}</b>${bar(total)}<p class="muted small">${SYNC[C.status] || ''}</p></div></div>
          <div class="win"><div class="win-title gray"><span class="ball"></span>Záróvizsga</div>
            <div class="win-body">${last ? `${chip(last.status)}<p class="muted small">Beküldve: ${fmt(last.created_at)}</p>` : '<p class="muted small">Még nem küldtél be vizsgát.</p>'}
            <a class="btn btn-sm" href="#/vizsga">Vizsga oldal</a></div></div>
        </div>
        <div class="part-head"><h3>Leckék</h3><span>kattints egy leckére</span></div>
        <div class="prog-list">${ui().lessons().map((l) => { const p = MA.lessonProgress(l); return `<a class="prog-row" href="#/lecke/${l.id}"><span class="num">${l.id}</span><span class="t">${esc(l.title)}</span>${bar(p.pct)}<span class="v">${pctTxt(p.pct)}</span></a>`; }).join('')}</div>
        <p class="muted small">Automatikus kilépés: az oldal frissítésekor és ${C.IDLE_MIN} perc tétlenség után.</p>
        <div class="cta-row"><button class="btn btn-ghost" id="logoutBtn" type="button">Kilépés</button></div>
      </section>`;
    $('#logoutBtn', app).addEventListener('click', async () => {
      if (confirm('Kilépsz? A haladásod a szerveren megmarad, ugyanezzel a névvel bármikor visszajöhetsz.')) { await C.logout(); ui().route(); }
    });
  };

  /* ---------- EXAM ---------- */
  const feedbackHtml = (s) => {
    const E = MA.exam;
    const tf = s.task_feedback || {};
    const per = E.tasks.filter((t) => tf[t.id]).map((t) => `<li><b>${esc(t.title)}:</b> ${esc(tf[t.id])}</li>`).join('');
    return `${s.feedback ? `<div class="fb-text">${esc(s.feedback).replace(/\n/g, '<br>')}</div>` : ''}${per ? `<ul class="fb-tasks">${per}</ul>` : ''}`;
  };
  const subCard = (s, i) => `<article class="sub-card win">
      <div class="win-title gray"><span class="ball"></span>${i === 0 ? 'Legutóbbi beküldés' : 'Korábbi beküldés'} · ${fmt(s.created_at)}</div>
      <div class="win-body">
        <div class="sub-row">${chip(s.status)}<span class="muted small">${esc(s.file_name || '')}</span></div>
        ${s.note ? `<p class="muted small">Megjegyzésed: ${esc(s.note)}</p>` : ''}
        ${s.status !== 'bekuldve' ? `<div class="sub-fb"><h4>Az oktató visszajelzése</h4>${feedbackHtml(s) || '<p class="muted small">Nincs részletes megjegyzés.</p>'}</div>` : ''}
      </div></article>`;

  let examRefreshed = false;
  MA.routes.vizsga = ({ app, parts }) => {
    if (parts[1] === 'teszt') { MA.quiz.render(app); return; }
    const E = MA.exam;
    const tasks = `<ol class="recipe exam-tasks">${E.tasks.map((t) => `<li><span><b>${esc(t.title)}</b><br>${md(t.text)}</span></li>`).join('')}</ol>`;
    const where = `<div class="call onpc"><span class="ci"></span><div><h4>Hol találom a .show.gz fájlt?</h4><p>Start menü → <b>Open Show Folder grandMA2 onPC</b>. A fájl neve a show neve + <code>.show.gz</code> (pl. <code>vizsga_final_kovacs_kati.show.gz</code>). Előtte mentsd el a showt: Backup → Save Show.</p></div></div>`;
    let quizPart = '', body;
    if (!C.ready) body = '<div class="call info"><span class="ci"></span><div><h4>A beküldés még nincs bekapcsolva</h4><p>Az oktatónak előbb be kell állítania a szervert.</p></div></div>';
    else if (!C.user) body = loginBox();
    else {
      quizPart = MA.quiz.card();
      const subs = C.submissions;
      const accepted = subs.some((s) => s.status === 'elfogadva');
      body = !C.quizPassed()
        ? `<div class="win exam-locked"><div class="win-title gray"><span class="ball"></span>Beküldés · zárolva</div><div class="win-body"><p>A show-t akkor töltheted fel, ha az <b>elméleti tesztet</b> legalább ${Math.round(C.PASS * 100)}%-kal teljesítetted (fent).</p></div></div>${subs.map(subCard).join('')}`
        : `${accepted ? '<div class="call info"><span class="ci"></span><div><h4>Gratulálok, elfogadva!</h4><p>A záróvizsgád elfogadva. Ha mégis újat küldenél, lent megteheted.</p></div></div>' : ''}
        <form class="exam-form win" id="examForm"><div class="win-title"><span class="ball"></span>Beküldés · ${esc(C.user.display)}</div>
          <div class="win-body">
            <label class="file-drop"><input type="file" id="examFile" accept=".gz,application/gzip"><span id="examFileName">Kattints, és válaszd ki a .show.gz fájlt</span></label>
            <textarea id="examNote" maxlength="2000" rows="3" placeholder="Megjegyzés az oktatónak (nem kötelező)"></textarea>
            <div class="login-err" id="examErr" role="alert"></div>
            <button class="btn btn-primary" type="submit">Beküldés</button>
          </div></form>
        ${subs.map(subCard).join('')}`;
    }
    app.innerHTML = head('Záróvizsga', esc(E.title), 'Két részből áll: <b>1.</b> elméleti teszt (kérdések), <b>2.</b> gyakorlati vizsga (show az onPC-ben). A második rész az első teljesítése után nyílik meg.') + `<section class="wrap" style="padding-bottom:40px">
        ${quizPart}
        <div class="part-head" style="margin-top:22px"><h3>2. rész · Gyakorlati vizsga</h3><span>${E.tasks.length} feladat</span></div>
        <p class="lead" style="margin-top:0">${md(E.intro)}</p>
        <div class="win exam-box"><div class="win-body">${tasks}</div></div>
        ${where}${body}</section>`;
    if (C.ready && !C.user) { bindLogin(app, () => ui().route()); return; }
    const form = $('#examForm', app);
    if (form) {
      const file = $('#examFile', app), name = $('#examFileName', app), err = $('#examErr', app), btn = $('button[type=submit]', form);
      file.addEventListener('change', () => { name.textContent = file.files[0] ? `${file.files[0].name} (${(file.files[0].size / 1024 / 1024).toFixed(2)} MB)` : 'Kattints, és válaszd ki a .show.gz fájlt'; });
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); err.textContent = ''; btn.disabled = true; btn.textContent = 'Feltöltés…';
        try { await C.submitExam(file.files[0], $('#examNote', app).value.trim()); ui().toast('Beküldve az oktatónak'); ui().route(); }
        catch (ex) { err.textContent = ex.message; btn.disabled = false; btn.textContent = 'Beküldés'; }
      });
    }
    if (C.ready && C.user && !examRefreshed) { examRefreshed = true; C.refresh().then(() => { if (location.hash.startsWith('#/vizsga')) ui().route(); }); }
  };

  /* ---------- ADMIN ---------- */
  const lessonTitle = (id) => (MA.byId[id] ? `${id} · ${MA.byId[id].title}` : '—');
  const stillHere = (app) => document.body.contains(app) && location.hash.startsWith('#/admin');
  const adm = { q: '', sort: 'active', rep: 'open' };      // remembered while the page is open

  MA.routes.admin = async ({ app, parts }) => {
    if (!C.ready) { app.innerHTML = notReady('Admin'); return; }
    app.innerHTML = head('Admin', 'Admin') + '<section class="wrap"><p class="muted">Betöltés…</p></section>';
    let s;
    try { s = await C.admin.session(); } catch (e) { s = null; }
    if (!stillHere(app)) return;
    if (!s) return adminLogin(app);
    if (s === 'not-admin') {
      app.innerHTML = head('Admin', 'Nincs jogosultság') + `<section class="wrap"><div class="call warn"><span class="ci"></span><div><h4>Ez a fiók nem admin</h4><p>Futtasd a setup.sql végén lévő sort a saját email címeddel.</p></div></div><div class="cta-row"><button class="btn" id="admOut" type="button">Kilépés</button></div></section>`;
      $('#admOut', app).addEventListener('click', async () => { await C.admin.logout(); ui().route(); });
      return;
    }
    let learners, subs, quiz, reports;
    const soft = (p) => p.catch(() => []);     // quiz / reports tables may not exist yet
    try { [learners, subs, quiz, reports] = await Promise.all([C.admin.learners(), C.admin.submissions(), soft(C.admin.quizAttempts()), soft(C.admin.reports())]); }
    catch (e) { app.innerHTML = head('Admin', 'Hiba') + `<section class="wrap"><p class="login-err">Nem sikerült betölteni: ${esc(e.message || e)}</p></section>`; return; }
    if (!stillHere(app)) return;
    const D = { learners, subs, quiz, reports, latest: {} };
    subs.forEach((x) => { if (!D.latest[x.username]) D.latest[x.username] = x; });
    if (parts[1] === 'u' && parts[2]) return adminDetail(app, D, decodeURIComponent(parts[2]));
    if (parts[1] === 'vizsgak') return adminExams(app, D);
    if (parts[1] === 'jelzesek') return adminReports(app, D);
    adminList(app, D);
  };

  /* ---------- shared bits ---------- */
  const mmss = (s) => (MA.quiz ? MA.quiz.mmss(s) : String(s));
  const qpct = (a) => (MA.quiz ? MA.quiz.pct(a) : 0);
  const okChip = (a) => (a.passed ? '<span class="chip st st-ok">Sikeres</span>' : '<span class="chip st st-fix">Nem sikerült</span>');
  const finished = (quiz, u) => quiz.filter((a) => a.username === u && a.finished_at);
  const bestOf = (list) => list.reduce((b, a) => (!b || a.score / a.total > b.score / b.total ? a : b), null);
  const quizCell = (att) => {
    const b = bestOf(att);
    if (!b) return '<span class="muted">—</span>';
    return `<div class="adm-qz"><b>${b.score}/${b.total}</b><span>${qpct(b)}% · ⏱ ${mmss(b.duration_s)}</span>${okChip(b)}${att.length > 1 ? `<span class="muted small">${att.length} próba</span>` : ''}</div>`;
  };
  const counts = (D) => ({
    waiting: D.subs.filter((x) => x.status === 'bekuldve' && D.latest[x.username] === x).length,
    openRep: D.reports.filter((r) => r.status !== 'megoldva').length,
    passed: D.learners.filter((l) => D.quiz.some((a) => a.username === l.username && a.passed)).length
  });
  const nameOf = (D, u) => { const l = D.learners.find((x) => x.username === u); return l ? (l.display_name || u) : u; };
  const userLink = (D, u) => `<a href="#/admin/u/${encodeURIComponent(u)}"><b>${esc(nameOf(D, u))}</b></a><br><span class="muted small">${esc(u)}</span>`;

  /* tabs + tools around every admin page */
  const shell = (app, D, tab, title, lead, body) => {
    const c = counts(D);
    const tabs = [['tanulok', '#/admin', 'Tanulók', D.learners.length, false], ['vizsgak', '#/admin/vizsgak', 'Vizsgák', c.waiting, true], ['jelzesek', '#/admin/jelzesek', `${MA.icon.flag} Hibajelzések`, c.openRep, true]];
    app.innerHTML = `<header class="page-head wrap-wide adm-head">${ui().cmdbar('Admin')}
        <div class="adm-top"><h1 class="h1">${title}</h1><div class="adm-tools"><button class="btn btn-sm btn-ghost" id="admReload" type="button">Frissítés</button><button class="btn btn-sm btn-ghost" id="admOut" type="button">Kilépés</button></div></div>
        ${lead ? `<p class="adm-lead">${lead}</p>` : ''}
        <nav class="adm-tabs" aria-label="Admin">${tabs.map(([id, href, t, n, hot]) => `<a href="${href}" class="${tab === id ? 'on' : ''}">${t}${n ? `<span class="badge${hot ? ' hot' : ''}">${n}</span>` : ''}</a>`).join('')}</nav>
      </header><section class="wrap-wide adm" style="padding-bottom:40px">${body}</section>`;
    $('#admReload', app).addEventListener('click', () => ui().route());
    $('#admOut', app).addEventListener('click', async () => { await C.admin.logout(); ui().route(); });
  };
  const kpi = (n, label, href, hot) => `${href ? `<a class="adm-kpi${hot ? ' hot' : ''}" href="${href}">` : '<div class="adm-kpi">'}<b>${n}</b><span>${label}</span>${href ? '</a>' : '</div>'}`;

  /* ---------- reports (flags) ---------- */
  const where = (r) => `${esc(r.lesson_id)}${MA.byId[r.lesson_id] ? ' · ' + esc(MA.byId[r.lesson_id].title) : ''}${r.step_title ? `<br><span class="muted small">${esc(r.step_title)}</span>` : ''}`;
  const reportRow = (D, r, showUser) => `<tr class="${r.status === 'megoldva' ? 'rep-done' : ''}">
      <td class="nowrap">${fmt(r.created_at)}</td>
      ${showUser ? `<td>${userLink(D, r.username)}</td>` : ''}
      <td><a href="#/lecke/${esc(r.lesson_id)}${r.step_id ? '?s=step-' + esc(r.step_id) : ''}" target="_blank" rel="noopener">${where(r)}</a></td>
      <td class="rep-c">${esc(r.comment)}</td>
      <td class="rep-act">${r.status === 'megoldva' ? '<span class="chip st st-ok">Megoldva</span>' : `<button class="btn btn-sm rep-ok" data-id="${r.id}" type="button">Megoldva</button>`}<button class="btn btn-sm btn-ghost rep-del" data-id="${r.id}" type="button">Törlés</button></td></tr>`;
  const bindReports = (app) => {
    $$('.rep-ok', app).forEach((b) => b.addEventListener('click', async () => { try { await C.admin.setReport(b.dataset.id, 'megoldva'); ui().route(); } catch (e) { ui().toast('Nem sikerült'); } }));
    $$('.rep-del', app).forEach((b) => b.addEventListener('click', async () => { if (!confirm('Törlöd ezt a hibajelzést?')) return; try { await C.admin.deleteReport(b.dataset.id); ui().route(); } catch (e) { ui().toast('Nem sikerült'); } }));
  };

  const adminReports = (app, D) => {
    const c = counts(D);
    const list = D.reports.filter((r) => adm.rep === 'all' || r.status !== 'megoldva')
      .sort((a, b) => (a.status === 'megoldva') - (b.status === 'megoldva') || new Date(b.created_at) - new Date(a.created_at));
    shell(app, D, 'jelzesek', 'Hibajelzések', `A tanulók a leckékben a ${MA.icon.flag} gombbal jelzik, ha valami nem stimmel. A „Hol” linkre kattintva megnyílik a lépés.`, `
      <div class="adm-toolbar"><div class="seg" role="group"><button type="button" data-rep="open" class="${adm.rep === 'open' ? 'on' : ''}">Nyitott (${c.openRep})</button><button type="button" data-rep="all" class="${adm.rep === 'all' ? 'on' : ''}">Összes (${D.reports.length})</button></div></div>
      <div class="sheet-wrap"><table class="sheet adm-table rep-table"><thead><tr><th>Mikor</th><th>Ki</th><th>Hol</th><th>Megjegyzés</th><th></th></tr></thead>
      <tbody>${list.length ? list.map((r) => reportRow(D, r, true)).join('') : `<tr><td colspan="5" class="muted">${adm.rep === 'open' ? 'Nincs nyitott hibajelzés.' : 'Még nincs hibajelzés.'}</td></tr>`}</tbody></table></div>`);
    $$('[data-rep]', app).forEach((b) => b.addEventListener('click', () => { adm.rep = b.dataset.rep; adminReports(app, D); }));
    bindReports(app);
  };

  /* ---------- exams (show submissions) ---------- */
  const adminExams = (app, D) => {
    const waiting = D.subs.filter((x) => x.status === 'bekuldve' && D.latest[x.username] === x);
    const row = (x) => `<tr data-u="${esc(x.username)}" tabindex="0"><td class="nowrap">${fmt(x.created_at)}</td><td>${userLink(D, x.username)}</td><td>${esc(x.file_name || '')}</td><td>${chip(x.status)}</td><td class="nowrap">${x.reviewed_at ? fmt(x.reviewed_at) : '<span class="muted">—</span>'}</td><td class="go">›</td></tr>`;
    shell(app, D, 'vizsgak', 'Vizsgák', 'A beküldött show-k. Kattints egy sorra: a tanuló oldalán töltheted le és értékelheted.', `
      <h3 class="adm-h">Ellenőrzésre vár <span class="muted">${waiting.length}</span></h3>
      ${waiting.length ? `<div class="sheet-wrap"><table class="sheet adm-table click"><thead><tr><th>Beküldve</th><th>Tanuló</th><th>Fájl</th><th>Állapot</th><th>Értékelve</th><th></th></tr></thead><tbody>${waiting.map(row).join('')}</tbody></table></div>` : '<p class="muted">Nincs ellenőrzésre váró vizsga.</p>'}
      <h3 class="adm-h">Összes beküldés <span class="muted">${D.subs.length}</span></h3>
      ${D.subs.length ? `<div class="sheet-wrap"><table class="sheet adm-table click"><thead><tr><th>Beküldve</th><th>Tanuló</th><th>Fájl</th><th>Állapot</th><th>Értékelve</th><th></th></tr></thead><tbody>${D.subs.map(row).join('')}</tbody></table></div>` : '<p class="muted">Még senki nem küldött be vizsgát.</p>'}`);
    bindRows(app);
  };

  const bindRows = (app) => $$('.adm-table.click tbody tr[data-u]', app).forEach((tr) => {
    const go = () => { location.hash = '#/admin/u/' + encodeURIComponent(tr.dataset.u); };
    tr.addEventListener('click', (e) => { if (!e.target.closest('a')) go(); });
    tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  });

  const adminLogin = (app) => {
    app.innerHTML = head('Admin', 'Admin belépés', 'Csak az oktatónak.') + `<section class="wrap"><form class="login-box win" id="admForm" autocomplete="on">
        <div class="win-title"><span class="ball"></span>Admin</div>
        <div class="login-form"><input id="admEmail" type="email" placeholder="Email" autocomplete="username" required>
        <input id="admPass" type="password" placeholder="Jelszó" autocomplete="current-password" required>
        <p class="muted small">Biztonság: az oldal frissítésekor és ${C.IDLE_MIN} perc tétlenség után az admin is kilép.</p>
        <div class="login-err" id="admErr" role="alert"></div><button class="btn btn-primary" type="submit">Belépés</button></div></form></section>`;
    $('#admForm', app).addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = $('#admErr', app);
      err.textContent = '';
      try { await C.admin.login($('#admEmail', app).value.trim(), $('#admPass', app).value); ui().route(); }
      catch (ex) { err.textContent = ex.message; }
    });
  };

  /* ---------- learner list ---------- */
  const adminList = (app, D) => {
    const { learners } = D;
    const c = counts(D);
    const avg = learners.length ? learners.reduce((a, l) => a + (l.pct || 0), 0) / learners.length : 0;
    shell(app, D, 'tanulok', 'Tanulók', '', `
      <div class="adm-kpis">
        ${kpi(learners.length, 'tanuló')}
        ${kpi(pctTxt(avg), 'átlagos haladás')}
        ${kpi(`${c.passed}/${learners.length}`, 'átment az elméleti teszten')}
        ${kpi(c.waiting, 'show vár ellenőrzésre', '#/admin/vizsgak', c.waiting > 0)}
        ${kpi(c.openRep, 'nyitott hibajelzés', '#/admin/jelzesek', c.openRep > 0)}
      </div>
      <div class="adm-toolbar">
        <input class="adm-search" id="admQ" type="search" placeholder="Keresés névre…" value="${esc(adm.q)}" aria-label="Keresés névre">
        <label class="adm-sort">Rendezés <select id="admSort">
          <option value="active"${adm.sort === 'active' ? ' selected' : ''}>Utoljára aktív</option>
          <option value="name"${adm.sort === 'name' ? ' selected' : ''}>Név</option>
          <option value="pct"${adm.sort === 'pct' ? ' selected' : ''}>Haladás</option>
          <option value="quiz"${adm.sort === 'quiz' ? ' selected' : ''}>Elméleti teszt</option>
        </select></label>
      </div>
      <div class="sheet-wrap"><table class="sheet adm-table click">
        <thead><tr><th>Név</th><th>Haladás</th><th>Hol tart</th><th>Aktív</th><th>Elméleti teszt</th><th>Show vizsga</th><th></th></tr></thead>
        <tbody id="admRows"></tbody>
      </table></div>`);
    const rows = () => {
      const q = C.slug(adm.q);
      const best = (l) => { const b = bestOf(finished(D.quiz, l.username)); return b ? b.score / b.total : -1; };
      const list = learners.filter((l) => !q || l.username.includes(q) || C.slug(l.display_name || '').includes(q)).slice().sort((a, b) =>
        adm.sort === 'name' ? String(a.display_name || a.username).localeCompare(String(b.display_name || b.username), 'hu')
          : adm.sort === 'pct' ? (b.pct || 0) - (a.pct || 0)
            : adm.sort === 'quiz' ? best(b) - best(a)
              : new Date(b.updated_at) - new Date(a.updated_at));
      $('#admRows', app).innerHTML = list.length ? list.map((l) => `<tr data-u="${esc(l.username)}" tabindex="0">
          <td><b>${esc(l.display_name || l.username)}</b><br><span class="muted small">${esc(l.username)}</span></td>
          <td class="adm-pct">${bar(l.pct)}<span>${pctTxt(l.pct)}</span></td>
          <td>${esc(lessonTitle(l.current_lesson))}</td>
          <td class="nowrap">${ago(l.updated_at)}</td>
          <td>${quizCell(finished(D.quiz, l.username))}</td>
          <td>${D.latest[l.username] ? chip(D.latest[l.username].status) : '<span class="muted">—</span>'}</td>
          <td class="go">›</td></tr>`).join('') : `<tr><td colspan="7" class="muted">${learners.length ? 'Nincs találat.' : 'Még senki nem lépett be.'}</td></tr>`;
      bindRows(app);
    };
    rows();
    $('#admQ', app).addEventListener('input', (e) => { adm.q = e.target.value; rows(); });
    $('#admSort', app).addEventListener('change', (e) => { adm.sort = e.target.value; rows(); });
  };

  /* ---------- one learner ---------- */
  const adminDetail = (app, D, username) => {
    const l = D.learners.find((x) => x.username === username);
    if (!l) { shell(app, D, 'tanulok', 'Nincs ilyen tanuló', '', '<a class="btn" href="#/admin">‹ Vissza</a>'); return; }
    const mine = D.subs.filter((s) => s.username === username);
    const tries = D.quiz.filter((a) => a.username === username);
    const done = tries.filter((a) => a.finished_at);
    const best = bestOf(done);
    const myReps = D.reports.filter((r) => r.username === username);
    const openReps = myReps.filter((r) => r.status !== 'megoldva').length;
    const st = l.progress || {};
    const E = MA.exam;

    const tile = (x) => { const p = MA.progressOf(st, x); return `<div class="ltile${p.pct === 1 ? ' done' : ''}" title="${esc(x.title)}"><span class="num">${x.id}</span><span class="t">${esc(x.title)}</span>${bar(p.pct)}<span class="v">${p.pct === 1 ? '✓' : `${p.n}/${p.total}`}</span></div>`; };
    const core = ui().lessons().filter((x) => !MA.isExtra(x)), extra = ui().lessons().filter((x) => MA.isExtra(x));
    const tryRow = (a) => `<tr><td class="nowrap">${fmt(a.started_at)}</td>
        <td>${a.finished_at ? `<b>${a.score}/${a.total}</b> (${qpct(a)}%)` : '<span class="muted">félbehagyva</span>'}</td>
        <td class="nowrap">${a.finished_at ? '⏱ ' + mmss(a.duration_s) : '—'}</td>
        <td>${a.finished_at ? okChip(a) : ''}</td>
        <td>${a.finished_at && (a.answers || []).length ? `<details><summary>Válaszok</summary><ol class="qz-ans">${a.answers.map((x) => `<li class="${x.ok ? 'ok' : 'bad'}">${esc(x.q)}<br><span class="small">${x.pick === null ? 'nem válaszolt' : esc(x.pick)}${x.ok ? '' : ` → helyes: ${esc(x.correct)}`}</span></li>`).join('')}</ol></details>` : ''}</td></tr>`;
    const review = (s) => `<form class="review win" data-id="${s.id}">
        <div class="win-title gray"><span class="ball"></span>Beküldve: ${fmt(s.created_at)} · ${chip(s.status)}</div>
        <div class="win-body">
          <div class="sub-row"><button class="btn btn-sm dl" type="button" data-path="${esc(s.file_path)}">Letöltés: ${esc(s.file_name || 'show.gz')}</button>
          ${s.reviewed_at ? `<span class="muted small">Utoljára értékelve: ${fmt(s.reviewed_at)}</span>` : ''}</div>
          ${s.note ? `<p class="muted small">A tanuló megjegyzése: ${esc(s.note)}</p>` : ''}
          <div class="rv-status">
            <label><input type="radio" name="st-${s.id}" value="elfogadva" ${s.status === 'elfogadva' ? 'checked' : ''}> Elfogadva</label>
            <label><input type="radio" name="st-${s.id}" value="javitando" ${s.status === 'javitando' ? 'checked' : ''}> Javítandó</label>
            <label><input type="radio" name="st-${s.id}" value="bekuldve" ${s.status === 'bekuldve' ? 'checked' : ''}> Még nincs kész</label>
          </div>
          <label class="rv-lbl">Összegzés a tanulónak</label>
          <textarea class="rv-fb" rows="3" maxlength="4000">${esc(s.feedback || '')}</textarea>
          <details class="rv-tasks"${Object.keys(s.task_feedback || {}).length ? ' open' : ''}><summary>Megjegyzés feladatonként</summary>
            ${E.tasks.map((t) => `<label class="rv-lbl">${esc(t.title)}</label><input class="rv-task" data-task="${esc(t.id)}" type="text" maxlength="1000" value="${esc((s.task_feedback || {})[t.id] || '')}">`).join('')}
          </details>
          <div class="login-err rv-err" role="alert"></div>
          <button class="btn btn-primary" type="submit">Visszajelzés mentése</button>
        </div></form>`;
    const sec = (id, title, meta, body, open) => `<details class="adm-sec" id="sec-${id}"${open ? ' open' : ''}><summary><span class="ball"></span><h3>${title}</h3><span class="meta">${meta}</span></summary><div class="adm-sec-body">${body}</div></details>`;
    const latest = mine[0];

    shell(app, D, 'tanulok', esc(l.display_name || username), `<a href="#/admin">‹ Tanulók</a> · <code>${esc(username)}</code> · utoljára aktív: ${ago(l.updated_at)}`, `
      <div class="adm-kpis">
        ${kpi(pctTxt(l.pct), 'haladás (alapleckék)')}
        ${kpi(esc(l.current_lesson || '—'), esc(MA.byId[l.current_lesson] ? MA.byId[l.current_lesson].title : 'hol tart'))}
        ${kpi(best ? `${best.score}/${best.total}` : '—', best ? `elméleti teszt · ${qpct(best)}% · ⏱ ${mmss(best.duration_s)}` : 'elméleti teszt', '#sec-quiz', best && !best.passed)}
        ${kpi(latest ? (STATUS[latest.status] || [latest.status])[0] : '—', 'show vizsga', '#sec-exam', !!latest && latest.status === 'bekuldve')}
        ${kpi(openReps, 'nyitott hibajelzés', '#sec-rep', openReps > 0)}
      </div>
      ${sec('quiz', 'Elméleti teszt', `${done.length} beadott · ${tries.length - done.length} félbehagyott`, tries.length ? `<div class="sheet-wrap"><table class="sheet adm-table qz-hist"><thead><tr><th>Mikor</th><th>Eredmény</th><th>Idő</th><th></th><th></th></tr></thead><tbody>${tries.map(tryRow).join('')}</tbody></table></div>` : '<p class="muted">Még nem írta meg.</p>', true)}
      ${sec('exam', 'Gyakorlati vizsga (show)', `${mine.length} beküldés`, (mine.length ? mine.map(review).join('') : '<p class="muted">Még nem küldött be vizsgát.</p>') + '<p class="muted small adm-howto">Megnézés: töltsd le, másold a shows mappába (Start menü → <b>Open Show Folder grandMA2 onPC</b>), majd onPC-ben Backup → Load Show. Előtte mentsd, amin dolgozol.</p>', mine.length > 0)}
      ${sec('progress', 'Haladás leckénként', esc(lessonTitle(l.current_lesson)), `<h4 class="adm-sub">Alapleckék</h4><div class="ltiles">${core.map(tile).join('')}</div><h4 class="adm-sub">Extrák</h4><div class="ltiles">${extra.map(tile).join('')}</div>`, true)}
      ${sec('rep', `${MA.icon.flag} Hibajelzései`, `${myReps.length} db`, myReps.length ? `<div class="sheet-wrap"><table class="sheet adm-table rep-table"><thead><tr><th>Mikor</th><th>Hol</th><th>Megjegyzés</th><th></th></tr></thead><tbody>${myReps.map((r) => reportRow(D, r, false)).join('')}</tbody></table></div>` : '<p class="muted">Nem jelzett hibát.</p>', openReps > 0)}
      <div class="adm-danger"><span class="muted small">A tanuló törlése a haladását, a tesztjeit, a hibajelzéseit és a beküldött vizsgáit is törli.</span><button class="btn btn-sm btn-ghost" id="admDel" type="button">Tanuló törlése</button></div>`);

    $$('.adm-kpi[href^="#sec-"]', app).forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault(); const d = $(a.getAttribute('href'), app); if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }));
    bindReports(app);
    $$('.dl', app).forEach((b) => b.addEventListener('click', async () => {
      try { const url = await C.admin.fileUrl(b.dataset.path); window.location.href = url; }
      catch (e) { ui().toast('A letöltés nem sikerült'); }
    }));
    $$('form.review', app).forEach((f) => f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = $(`input[name="st-${f.dataset.id}"]:checked`, f);
      const tf = {};
      $$('.rv-task', f).forEach((i) => { if (i.value.trim()) tf[i.dataset.task] = i.value.trim(); });
      try {
        await C.admin.review(f.dataset.id, { status: statusEl ? statusEl.value : 'bekuldve', feedback: $('.rv-fb', f).value.trim(), task_feedback: tf });
        ui().toast('Visszajelzés elmentve'); ui().route();
      } catch (ex) { $('.rv-err', f).textContent = 'Mentés nem sikerült: ' + (ex.message || ex); }
    }));
    $('#admDel', app).addEventListener('click', async () => {
      if (!confirm(`Biztosan törlöd: ${username}? A haladása, a tesztjei, a hibajelzései és a beküldött vizsgái is törlődnek, és ez nem vonható vissza.`)) return;
      try { await C.admin.removeLearner(username); location.hash = '#/admin'; }
      catch (ex) { ui().toast('A törlés nem sikerült'); }
    });
  };
})();
