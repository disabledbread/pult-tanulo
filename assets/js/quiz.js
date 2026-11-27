/* MA2 Tanuló — Elméleti teszt: 30 random questions from the core lessons' quizzes,
   no time limit, the time is measured (server side) and shown to the admin.
   At least 80% unlocks the practical exam (show upload). Unlimited attempts. */
(function () {
  'use strict';
  const MA = window.MA, C = MA.cloud;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = MA.esc, md = MA.md;
  const COUNT = 30;
  const ui = () => MA.ui;
  const LETTERS = 'ABCDEFGH';

  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const mmss = (s) => { s = Math.max(0, Math.round(s || 0)); const m = Math.floor(s / 60); return `${m}:${String(s % 60).padStart(2, '0')}`; };
  const fmt = (d) => (d ? new Intl.DateTimeFormat('hu-HU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d)) : '—');
  const pct = (a) => (a && a.total ? Math.round((a.score / a.total) * 100) : 0);

  /* all quiz questions of the core lessons (00–14) */
  const pool = () => MA.core().flatMap((l) => l.blocks.filter((b) => b.t === 'quiz').flatMap((b) => b.items.map((it) => ({ lid: l.id, lt: l.title, ...it }))));
  const build = () => shuffle(pool()).slice(0, COUNT).map((it) => ({
    lid: it.lid, lt: it.lt, q: it.q, why: it.why, pick: null,
    opts: shuffle(it.a.map((t, i) => ({ t, ok: i === it.ok })))
  }));

  MA.quiz = {
    mmss, pct,
    /* card on the exam page (part 1) */
    card() {
      const att = C.quiz || [];
      const passed = C.quizPassed();
      const best = att.reduce((b, a) => (!b || a.score / a.total > b.score / b.total ? a : b), null);
      const running = MA.quizRun;
      const rows = att.map((a) => `<tr><td>${fmt(a.started_at)}</td><td><b>${a.score}/${a.total}</b> (${pct(a)}%)</td><td>${mmss(a.duration_s)}</td><td>${a.passed ? '<span class="chip st st-ok">Sikeres</span>' : '<span class="chip st st-fix">Nem sikerült</span>'}</td></tr>`).join('');
      return `<div class="win qz-card"><div class="win-title"><span class="ball"></span>1. rész · Elméleti teszt</div><div class="win-body">
        <p>${COUNT} kérdés a leckékből, véletlenszerűen. <b>Nincs időkorlát</b>, de mérjük, mennyi ideig tart. A gyakorlati részhez legalább <b>${Math.round(C.PASS * 100)}%</b> kell (${Math.ceil(COUNT * C.PASS)}/${COUNT}). Bármennyiszer nekifuthatsz — az oktató minden próbát lát.</p>
        ${passed ? `<div class="call info"><span class="ci"></span><div><h4>Teljesítve</h4><p>Legjobb eredményed: ${best.score}/${best.total} (${pct(best)}%) · ${mmss(best.duration_s)}. Jöhet a gyakorlati rész.</p></div></div>` : ''}
        <div class="cta-row" style="margin-top:8px"><a class="btn btn-primary" href="#/vizsga/teszt">${running ? 'Folytatom a tesztet' : att.length ? 'Új próba' : 'Teszt indítása'}</a></div>
        ${att.length ? `<div class="sheet-wrap"><table class="sheet qz-hist"><thead><tr><th>Mikor</th><th>Eredmény</th><th>Idő</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : ''}
      </div></div>`;
    },

    /* #/vizsga/teszt */
    async render(app) {
      const head = `<header class="page-head wrap">${ui().cmdbar('Elméleti teszt')}<h1 class="h1">Elméleti teszt</h1></header>`;
      if (!C.ready || !C.user) { app.innerHTML = head + '<section class="wrap"><p class="muted">Előbb lépj be a neveddel.</p></section>'; return; }
      if (!MA.quizRun) {
        app.innerHTML = head + `<section class="wrap"><div class="win"><div class="win-title"><span class="ball"></span>Indulhat?</div><div class="win-body">
          <p>${COUNT} kérdés jön. Nincs időkorlát, de az óra az indítással elindul, és az oktató látja, mennyi ideig tartott.</p>
          <p class="muted small">Ne frissítsd az oldalt teszt közben: a frissítés kiléptet, és a teszt félbe marad.</p>
          <div class="login-err" id="qzErr" role="alert"></div>
          <div class="cta-row"><button class="btn btn-primary" id="qzStart" type="button">Indítás</button><a class="btn btn-ghost" href="#/vizsga">Vissza</a></div>
        </div></div></section>`;
        $('#qzStart', app).addEventListener('click', async (e) => {
          e.target.disabled = true;
          try {
            const r = await C.quizStart();
            MA.quizRun = { id: r.id, t0: Date.now(), items: build() };
            MA.quiz.render(app);
          } catch (ex) { $('#qzErr', app).textContent = ex.message; e.target.disabled = false; }
        });
        return;
      }
      run(app, head);
    }
  };

  const run = (app, head) => {
    const R = MA.quizRun;
    const answered = () => R.items.filter((x) => x.pick !== null).length;
    app.innerHTML = head + `<section class="wrap" style="padding-bottom:40px">
      <div class="qz-bar"><span class="qz-time" id="qzTime">0:00</span><span class="qz-count" id="qzCount"></span><button class="btn btn-primary btn-sm" id="qzDone" type="button">Beadás</button></div>
      ${R.items.map((it, i) => `<div class="quiz qz" data-i="${i}"><p class="quiz-q"><span>${i + 1}.</span>${md(it.q)}</p><div class="quiz-opts">${it.opts.map((o, oi) => `<button class="qo${it.pick === oi ? ' on' : ''}" type="button" data-o="${oi}"><i>${LETTERS[oi]}</i><span>${md(o.t)}</span></button>`).join('')}</div></div>`).join('')}
      <div class="login-err" id="qzErr" role="alert"></div>
      <div class="cta-row"><button class="btn btn-primary" id="qzDone2" type="button">Beadás</button></div>
    </section>`;
    const count = () => { $('#qzCount', app).textContent = `${answered()}/${R.items.length} megválaszolva`; };
    count();
    const tick = () => { const el = $('#qzTime', app); if (!el || !document.body.contains(el) || MA.quizRun !== R) return clearInterval(timer); el.textContent = '⏱ ' + mmss((Date.now() - R.t0) / 1000); };
    const timer = setInterval(tick, 1000); tick();
    $$('.qz', app).forEach((q) => q.addEventListener('click', (e) => {
      const b = e.target.closest('.qo'); if (!b) return;
      const it = R.items[+q.dataset.i]; it.pick = +b.dataset.o;
      $$('.qo', q).forEach((x) => x.classList.toggle('on', x === b));
      count();
    }));
    const submit = async (btn) => {
      const left = R.items.length - answered();
      if (left && !confirm(`Még ${left} kérdés megválaszolatlan. Így adod be?`)) return;
      btn.disabled = true; btn.textContent = 'Beadás…';
      const score = R.items.filter((x) => x.pick !== null && x.opts[x.pick].ok).length;
      const answers = R.items.map((x) => ({ lesson: x.lid, q: x.q, pick: x.pick === null ? null : x.opts[x.pick].t, correct: x.opts.find((o) => o.ok).t, ok: x.pick !== null && x.opts[x.pick].ok }));
      try {
        const res = await C.quizFinish(R.id, score, R.items.length, answers);
        clearInterval(timer);
        MA.quizRun = null;
        result(app, head, res, R.items);
        ui().updateNav();
      } catch (ex) { $('#qzErr', app).textContent = ex.message; btn.disabled = false; btn.textContent = 'Beadás'; }
    };
    $('#qzDone', app).addEventListener('click', (e) => submit(e.target));
    $('#qzDone2', app).addEventListener('click', (e) => submit(e.target));
  };

  const result = (app, head, res, items) => {
    const wrong = items.filter((x) => !(x.pick !== null && x.opts[x.pick].ok));
    app.innerHTML = head + `<section class="wrap" style="padding-bottom:40px">
      <div class="win qz-result ${res.passed ? 'ok' : 'fix'}"><div class="win-title"><span class="ball"></span>Eredmény</div><div class="win-body">
        <div class="qz-score"><b class="big">${res.score}/${res.total}</b><span>${pct(res)}%</span><span>⏱ ${mmss(res.duration_s)}</span></div>
        <p>${res.passed ? 'Sikeres! Jöhet a gyakorlati vizsga (show feltöltése).' : `Ez most nem lett meg — legalább ${Math.round(C.PASS * 100)}% kell. Nézd át a hibás kérdéseket, és próbáld újra.`}</p>
        <div class="cta-row">${res.passed ? '<a class="btn btn-primary" href="#/vizsga">Tovább a gyakorlati részhez</a>' : '<button class="btn btn-primary" id="qzAgain" type="button">Újra próbálom</button><a class="btn btn-ghost" href="#/vizsga">Vissza</a>'}</div>
      </div></div>
      ${wrong.length ? `<div class="part-head" style="margin-top:22px"><h3>Hibás válaszok</h3><span>${wrong.length} db</span></div>
      ${wrong.map((x) => `<div class="quiz answered"><p class="quiz-q">${md(x.q)}</p>
        <p class="small">${x.pick === null ? '<span class="muted">Nem válaszoltál.</span>' : `Te: <span class="qz-bad">${md(x.opts[x.pick].t)}</span>`}<br>Helyes: <span class="qz-good">${md(x.opts.find((o) => o.ok).t)}</span></p>
        <div class="quiz-why">${md(x.why || '')} <a href="#/lecke/${x.lid}">${x.lid} · ${esc(x.lt)} ›</a></div></div>`).join('')}` : ''}
    </section>`;
    const again = $('#qzAgain', app);
    if (again) again.addEventListener('click', () => MA.quiz.render(app));
  };
})();
