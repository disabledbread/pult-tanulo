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
        <p>Írd be a neved. Ugyanezzel a névvel bármelyik gépen onnan folytatod, ahol abbahagytad. Jelszó nem kell.</p>
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
  // pull the newest progress + feedback once per page load
  if (C.ready && C.user) C.refresh().then(() => ui() && ui().updateNav());

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
        <div class="cta-row"><button class="btn btn-ghost" id="logoutBtn" type="button">Kilépés (másik név)</button></div>
      </section>`;
    $('#logoutBtn', app).addEventListener('click', () => {
      if (confirm('Kilépsz? A haladásod a szerveren megmarad, ugyanezzel a névvel bármikor visszajöhetsz.')) { C.logout(); ui().route(); }
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
  MA.routes.vizsga = ({ app }) => {
    const E = MA.exam;
    const tasks = `<ol class="recipe exam-tasks">${E.tasks.map((t) => `<li><span><b>${esc(t.title)}</b><br>${md(t.text)}</span></li>`).join('')}</ol>`;
    const where = `<div class="call onpc"><span class="ci"></span><div><h4>Hol találom a .show.gz fájlt?</h4><p>Start menü → <b>Open Show Folder grandMA2 onPC</b>. A fájl neve a show neve + <code>.show.gz</code> (pl. <code>vizsga-kati.show.gz</code>). Előtte mentsd el a showt: Backup → Save Show.</p></div></div>`;
    let body;
    if (!C.ready) body = '<div class="call info"><span class="ci"></span><div><h4>A beküldés még nincs bekapcsolva</h4><p>Az oktatónak előbb be kell állítania a szervert.</p></div></div>';
    else if (!C.user) body = loginBox();
    else {
      const subs = C.submissions;
      const accepted = subs.some((s) => s.status === 'elfogadva');
      body = `${accepted ? '<div class="call info"><span class="ci"></span><div><h4>Gratulálok, elfogadva!</h4><p>A záróvizsgád elfogadva. Ha mégis újat küldenél, lent megteheted.</p></div></div>' : ''}
        <form class="exam-form win" id="examForm"><div class="win-title"><span class="ball"></span>Beküldés · ${esc(C.user.display)}</div>
          <div class="win-body">
            <label class="file-drop"><input type="file" id="examFile" accept=".gz,application/gzip"><span id="examFileName">Kattints, és válaszd ki a .show.gz fájlt</span></label>
            <textarea id="examNote" maxlength="2000" rows="3" placeholder="Megjegyzés az oktatónak (nem kötelező)"></textarea>
            <div class="login-err" id="examErr" role="alert"></div>
            <button class="btn btn-primary" type="submit">Beküldés</button>
          </div></form>
        ${subs.map(subCard).join('')}`;
    }
    app.innerHTML = head('Záróvizsga', esc(E.title), md(E.intro)) + `<section class="wrap" style="padding-bottom:40px">
        ${E.draft ? '<div class="call warn"><span class="ci"></span><div><h4>Tervezet</h4><p>A feladatlista még nem végleges — az oktató hamarosan pontosítja.</p></div></div>' : ''}
        <div class="part-head"><h3>Feladatok</h3><span>${E.tasks.length} feladat</span></div>
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
    let learners, subs;
    try { [learners, subs] = await Promise.all([C.admin.learners(), C.admin.submissions()]); }
    catch (e) { app.innerHTML = head('Admin', 'Hiba') + `<section class="wrap"><p class="login-err">Nem sikerült betölteni: ${esc(e.message || e)}</p></section>`; return; }
    if (!stillHere(app)) return;
    if (parts[1] === 'u' && parts[2]) return adminDetail(app, learners, subs, decodeURIComponent(parts[2]));
    adminList(app, learners, subs);
  };

  const adminLogin = (app) => {
    app.innerHTML = head('Admin', 'Admin belépés', 'Csak az oktatónak.') + `<section class="wrap"><form class="login-box win" id="admForm" autocomplete="on">
        <div class="win-title"><span class="ball"></span>Admin</div>
        <div class="login-form"><input id="admEmail" type="email" placeholder="Email" autocomplete="username" required>
        <input id="admPass" type="password" placeholder="Jelszó" autocomplete="current-password" required>
        <div class="login-err" id="admErr" role="alert"></div><button class="btn btn-primary" type="submit">Belépés</button></div></form></section>`;
    $('#admForm', app).addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = $('#admErr', app);
      err.textContent = '';
      try { await C.admin.login($('#admEmail', app).value.trim(), $('#admPass', app).value); ui().route(); }
      catch (ex) { err.textContent = ex.message; }
    });
  };

  const adminList = (app, learners, subs) => {
    const latest = {};
    subs.forEach((s) => { if (!latest[s.username]) latest[s.username] = s; });
    const waiting = subs.filter((s) => s.status === 'bekuldve' && latest[s.username] === s).length;
    const avg = learners.length ? learners.reduce((a, l) => a + (l.pct || 0), 0) / learners.length : 0;
    app.innerHTML = head('Admin', 'Tanulók') + `<section class="wrap-wide" style="padding-bottom:40px">
        <div class="adm-stats">
          <div class="win"><div class="win-body"><b class="big">${learners.length}</b><span class="muted">tanuló</span></div></div>
          <div class="win"><div class="win-body"><b class="big">${pctTxt(avg)}</b><span class="muted">átlagos haladás</span></div></div>
          <div class="win"><div class="win-body"><b class="big">${waiting}</b><span class="muted">vizsga vár ellenőrzésre</span></div></div>
        </div>
        <div class="sheet-wrap"><table class="sheet adm-table">
          <thead><tr><th>Név</th><th>Haladás</th><th>Hol tart</th><th>Utoljára aktív</th><th>Vizsga</th></tr></thead>
          <tbody>${learners.length ? learners.map((l) => `<tr data-u="${esc(l.username)}" tabindex="0">
              <td><b>${esc(l.display_name || l.username)}</b><br><span class="muted small">${esc(l.username)}</span></td>
              <td class="adm-pct">${bar(l.pct)}<span>${pctTxt(l.pct)}</span></td>
              <td>${esc(lessonTitle(l.current_lesson))}</td>
              <td>${ago(l.updated_at)}</td>
              <td>${latest[l.username] ? chip(latest[l.username].status) : '<span class="muted">—</span>'}</td></tr>`).join('') : '<tr><td colspan="5" class="muted">Még senki nem lépett be.</td></tr>'}</tbody>
        </table></div>
        <div class="cta-row"><button class="btn btn-ghost" id="admReload" type="button">Frissítés</button><button class="btn btn-ghost" id="admOut" type="button">Admin kilépés</button></div>
      </section>`;
    $$('.adm-table tbody tr[data-u]', app).forEach((tr) => {
      const go = () => { location.hash = '#/admin/u/' + encodeURIComponent(tr.dataset.u); };
      tr.addEventListener('click', go);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    });
    $('#admReload', app).addEventListener('click', () => ui().route());
    $('#admOut', app).addEventListener('click', async () => { await C.admin.logout(); ui().route(); });
  };

  const adminDetail = (app, learners, subs, username) => {
    const l = learners.find((x) => x.username === username);
    if (!l) { app.innerHTML = head('Admin', 'Nincs ilyen tanuló') + '<section class="wrap"><a class="btn" href="#/admin">‹ Vissza</a></section>'; return; }
    const mine = subs.filter((s) => s.username === username);
    const st = l.progress || {};
    const E = MA.exam;
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
    app.innerHTML = head('Admin · ' + username, esc(l.display_name || username), `Felhasználónév: <code>${esc(username)}</code> · utoljára aktív: ${ago(l.updated_at)} · összesen <b>${pctTxt(l.pct)}</b>`) + `
      <section class="wrap" style="padding-bottom:40px">
        <div class="cta-row" style="margin-top:0"><a class="btn btn-sm" href="#/admin">‹ Vissza a listához</a></div>
        <div class="part-head" style="margin-top:18px"><h3>Leckék</h3><span>${esc(lessonTitle(l.current_lesson))}</span></div>
        <div class="prog-list">${ui().lessons().map((x) => { const p = MA.progressOf(st, x); return `<div class="prog-row"><span class="num">${x.id}</span><span class="t">${esc(x.title)}</span>${bar(p.pct)}<span class="v">${p.n}/${p.total}</span></div>`; }).join('')}</div>
        <div class="part-head" style="margin-top:22px"><h3>Záróvizsga</h3><span>${mine.length} beküldés</span></div>
        ${mine.length ? mine.map(review).join('') : '<p class="muted">Még nem küldött be vizsgát.</p>'}
        <div class="call info"><span class="ci"></span><div><h4>Hogyan nézd meg a showt?</h4><p>Töltsd le, másold be a shows mappába (Start menü → <b>Open Show Folder grandMA2 onPC</b>), majd az onPC-ben Backup → Load Show. Előtte mentsd el, amin éppen dolgozol.</p></div></div>
        <div class="cta-row"><button class="btn btn-ghost" id="admDel" type="button">Tanuló törlése</button></div>
      </section>`;
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
      if (!confirm(`Biztosan törlöd: ${username}? A haladása és a beküldött vizsgái is törlődnek, és ez nem vonható vissza.`)) return;
      try { await C.admin.removeLearner(username); location.hash = '#/admin'; }
      catch (ex) { ui().toast('A törlés nem sikerült'); }
    });
  };
})();
