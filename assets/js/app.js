/* MA2 Tanuló — router + views */
(function () {
  'use strict';
  const MA = window.MA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const md = MA.md;
  const esc = MA.esc;
  const icon = MA.icon;
  let app = $('#app');
  const lessons = () => MA.lessons.slice().sort((a, b) => a.id.localeCompare(b.id));

  /* ---------------- shared bits ---------------- */
  /* keyboard-shortcut equivalent of a key sequence */
  const scRow = (k) => {
    const toks = k.trim().split(/\s+/).map((t) => t.replace(/_/g, ' '));
    const parts = toks.map((t) => {
      if (/^[0-9.+\-]$/.test(t)) return `<span class="pk">${esc(t)}</span>`;
      const sc = MA.SC[t];
      if (!sc) return `<span class="pk na" title="Nincs alap billentyű — kattints a gombra">${esc(t)}</span>`;
      return sc.split(' + ').map((p) => `<span class="pk">${esc(p)}</span>`).join('<span class="plus">+</span>');
    });
    return `<span class="combo seq">${parts.join('<span class="sep"></span>')}</span>`;
  };
  const keysBlock = (k) => `<div class="keys-block"><div class="kb-row"><span class="lbl">Gombok</span><span class="keys">${MA.keys(esc(k))}</span></div><div class="kb-row kb-sc"><span class="lbl">Billentyűvel</span>${scRow(k)}</div></div>`;
  /* the command line as the learner will SEE it after pressing the buttons */
  const WORDS = { ch: 'Channel', channel: 'Channel', fi: 'Fixture', fixture: 'Fixture', g: 'Group', group: 'Group', t: 'Thru', thru: 'Thru', at: 'At', store: 'Store', label: 'Label', seq: 'Sequence', sequ: 'Sequence', sequence: 'Sequence', cue: 'Cue', exec: 'Executor', executor: 'Executor', select: 'Select', time: 'Time', fade: 'Fade', outfade: 'OutFade', delay: 'Delay', outdelay: 'OutDelay', goto: 'Goto', off: 'Off', update: 'Update', ifoutput: 'IfOutput', clearall: 'ClearAll', preset: 'Preset', viewbutton: 'ViewButton', full: 'Full' };
  const canon = (c) => (c.match(/"[^"]*"|\S+/g) || []).map((w) => WORDS[w.toLowerCase()] || w).join(' ');
  const cmdBlock = (c) => `<div class="cmd"><div class="cmd-head"><span>A parancssorban ezt látod</span><span class="cmd-hint">a gombok után</span></div><div class="cmd-body"><span class="p">[Channel]&gt;</span> <span class="c">${esc(canon(c))}</span></div></div>`;
  const fbBlock = (f) => `<div class="fb"><span class="t">[idő] :</span> ${esc(f)}</div>`;
  const shotFig = (src, cap) => `<figure class="fig fig-shot"><button class="shot-btn" data-zoom="assets/shots/${esc(src)}.jpg" aria-label="Nagyítás"><img src="assets/shots/${esc(src)}.jpg" alt="${esc(cap || 'onPC képernyőkép')}" loading="lazy"></button>${cap ? `<figcaption>${md(cap)}</figcaption>` : ''}</figure>`;
  const partName = (id) => (MA.parts.find((p) => p.id === id) || {}).name || '';

  const lessonCard = (l) => {
    const p = MA.lessonProgress(l);
    const chip = MA.store.isDone(l.id) || p.pct === 1 ? `<span class="chip done">${icon.check} Kész</span>` : p.n ? `<span class="chip go">${p.n}/${p.total} lépés</span>` : `<span class="chip">${l.min} perc</span>`;
    return `<a class="l-card${MA.store.isDone(l.id) || p.pct === 1 ? ' is-done' : ''}" href="#/lecke/${l.id}"><span class="num">${l.id}</span><h4>${esc(l.title)}</h4><span class="en">${esc(l.en)}</span><div class="foot">${chip}${icon.chev}</div><div class="bar"><i style="width:${Math.round(p.pct * 100)}%"></i></div></a>`;
  };
  const bonusCard = (b) => `<div class="l-card soon"><span class="num">${b.id}</span><h4>${esc(b.title)}</h4><span class="en">${esc(b.en)}</span><div class="foot"><span class="chip soon">Hamarosan</span></div></div>`;

  const courseMap = () => MA.parts.map((pt) => {
    const ls = lessons().filter((l) => l.part === pt.id);
    if (!ls.length) return '';
    return `<div class="part"><div class="part-head"><h3>${pt.name}</h3><span>${pt.sub}</span></div><div class="grid-cards">${ls.map(lessonCard).join('')}</div></div>`;
  }).join('') + (MA.bonus.length ? `<div class="part"><div class="part-head"><h3>Bónusz modulok</h3><span>Hogy egyedül is fel tudj építeni egy showt</span></div><div class="grid-cards">${MA.bonus.map(bonusCard).join('')}</div></div>` : '');

  /* ---------- where am I? (saved position, or first unfinished step) ---------- */
  const plain = (s) => String(s).replace(/\*\*|==|`|\{\{|\}\}|\[\[|\]\]/g, '').replace(/\(\(([^|)]*)\|?([^)]*)\)\)/g, (_, a, b) => b || a);
  const stepList = (l) => l.blocks.filter((b) => b.t === 'step').map((b, i) => ({ id: b.id || String(i + 1), n: i + 1, title: b.title }));
  const where = () => {
    const p = MA.store.pos();
    if (p && MA.byId[p.l]) {
      const l = MA.byId[p.l];
      return { l, st: stepList(l).find((s) => s.id === p.s), saved: true };
    }
    const l = lessons().find((x) => !MA.store.isDone(x.id) && MA.lessonProgress(x).pct < 1);
    if (!l) return null;
    return { l, st: stepList(l).find((s) => !MA.store.step(l.id, s.id)), saved: MA.lessonProgress(l).n > 0 };
  };
  const resumeHref = (w) => `#/lecke/${w.l.id}${w.st && w.st.n > 1 ? '?s=step-' + w.st.id : ''}`;
  const resumeCard = (big) => {
    const w = where();
    const cls = big ? 'resume big' : 'resume';
    if (!w) return `<div class="${cls}"><div><b>Végeztél a Quick Start résszel!</b><p>Ismételj a Témakörök oldalon, vagy jöhetnek a bónusz modulok.</p></div><div class="resume-actions"><a class="btn btn-primary" href="#/temak">Témakörök</a><a class="btn btn-ghost btn-sm" href="#/folytatas">Máshonnan</a></div></div>`;
    const stepTxt = w.st ? ` — ${w.st.n}. lépés: ${esc(plain(w.st.title))}` : '';
    return `<div class="${cls}"><div><b>${w.saved ? 'Itt tartottál' : 'Következő lecke'}</b><p>${w.l.id} · ${esc(w.l.title)}${stepTxt}</p></div><div class="resume-actions"><a class="btn btn-primary" href="${resumeHref(w)}">${w.saved ? 'Folytatás' : 'Kezdés'}</a><a class="btn btn-ghost btn-sm" href="#/folytatas">Máshonnan folytatnám</a></div></div>`;
  };
  const markBefore = (lid, sid) => {
    lessons().forEach((l) => {
      if (l.id < lid) { MA.stepIds(l).forEach((s) => MA.store.setStep(l.id, s, true)); MA.store.setDone(l.id, true); }
      else if (l.id === lid) { for (const s of MA.stepIds(l)) { if (s === sid) break; MA.store.setStep(l.id, s, true); } }
    });
  };

  /* ---------------- RESUME PICKER (#/folytatas) ---------------- */
  const resumePage = () => {
    const hasSaved = !!(MA.store.pos() && MA.byId[MA.store.pos().l]);
    const w = where();
    const noMemory = `<div class="call info"><span class="ci">${icon.info}</span><div><h4>Nincs mentett hely</h4><p>Ebben a böngészőben nem találok mentett haladást — például másik gépen vagy, vagy törlődtek az adatok. Válaszd ki lent, hol tartasz.</p></div></div>`;
    app.innerHTML = `<header class="page-head wrap">${cmdbar('Folytatás')}<h1 class="h1">Honnan folytatod?</h1>
      <p class="lead">Az oldal megjegyzi, hol tartottál ebben a böngészőben. Ha mégsem, itt kiválaszthatod a leckét és a lépést.</p></header>
      <section class="wrap" style="padding-bottom:40px">
        ${hasSaved ? resumeCard() : noMemory}
        <label class="mark-prev"><input type="checkbox" id="markPrev" checked> <span>Az előtte lévő leckéket és lépéseket jelölje késznek</span></label>
        <div class="pick">${lessons().map((l) => {
          const pr = MA.lessonProgress(l);
          const chip = pr.pct === 1 ? '<span class="chip done">Kész</span>' : pr.n ? `<span class="chip go">${pr.n}/${pr.total}</span>` : `<span class="chip">${pr.total} lépés</span>`;
          return `<details class="pick-l"${w && w.l.id === l.id ? ' open' : ''}><summary><span class="num">${l.id}</span><b>${esc(l.title)}</b>${chip}</summary>
            <ol>${stepList(l).map((s) => `<li><button class="pick-s${MA.store.step(l.id, s.id) ? ' done' : ''}${w && w.l.id === l.id && w.st && w.st.id === s.id ? ' here' : ''}" data-l="${l.id}" data-s="${s.id}"><span class="n">${s.n}</span><span class="t">${esc(plain(s.title))}</span><span class="go">Innen ›</span></button></li>`).join('')}</ol></details>`;
        }).join('')}</div>
      </section>`;
    app.addEventListener('click', (e) => {
      const b = e.target.closest('.pick-s');
      if (!b) return;
      const lid = b.dataset.l, sid = b.dataset.s;
      if ($('#markPrev').checked) markBefore(lid, sid);
      MA.store.setPos(lid, sid);
      location.hash = `#/lecke/${lid}?s=step-${sid}`;
    });
  };

  /* ---------------- HOME ---------------- */
  const cmdbar = (txt, right = '') => `<div class="cmdline"><span class="ball"></span><span class="prompt">[Tanuló]&gt;</span><span class="txt">${txt}</span>${right ? `<span class="right">${right}</span>` : ''}</div>`;
  const home = () => {
    const steps = lessons().reduce((a, l) => a + MA.stepIds(l).length, 0);
    const mins = lessons().reduce((a, l) => a + l.min, 0);
    app.innerHTML = `
    <section class="home-top wrap-wide">
      ${cmdbar('Üdv! Kezdd a 00. leckével, vagy keresd meg, amit elfelejtettél.')}
      ${resumeCard(true)}
      <div class="intro">
        <div>
          <p class="eyebrow">grandMA2 onPC · magyarul</p>
          <h1 class="h1">grandMA2 alapok</h1>
          <p class="lead">A hivatalos Quick Start Guide 14 fejezete kezdőknek elmagyarázva. A lépéseket te csinálod meg az onPC-ben — ez az oldal mellette fut, és megmutatja, melyik gombot nyomd és mit kell látnod.</p>
          <div class="cta-row"><a class="btn btn-primary" href="#/lecke/00">Kezdés</a><a class="btn" href="#/temak">Témakörök</a><a class="btn btn-ghost" href="#/billentyuk">Billentyűk</a></div>
          <ul class="facts">
            <li>Leckék <b>${lessons().length}</b></li>
            <li>Lépések az onPC-ben <b>${steps}</b></li>
            <li>Becsült idő <b>~${Math.round(mins / 60)} óra</b></li>
            <li>Szoftver <b>grandMA2 onPC 3.9</b></li>
          </ul>
        </div>
        <figure class="win screen-shot">
          <div class="win-title"><span class="ball"></span>Screen 2 · így néz ki a 7. lecke végére</div>
          <button class="shot-btn" data-zoom="assets/shots/ch03-screen-layout.jpg" aria-label="Nagyítás"><img src="assets/shots/ch03-screen-layout.jpg" alt="grandMA2 onPC Screen 2: Channel Sheet és Command Line Feedback"></button>
          <figcaption>Valódi képernyőkép a mi onPC-nkről. Kattints a nagyításhoz.</figcaption>
        </figure>
      </div>
    </section>
    <section class="section wrap-wide">
      ${courseMap()}
    </section>
    <section class="section wrap-wide">
      <div class="part-head"><h3>Gyors receptek</h3><span>ha elfelejtettél valamit</span></div>
      <div class="tiles">${MA.topics.map((t) => `<a class="tile" href="#/temak?t=${t.id}"><span class="ico">${icon[t.icon] || icon.star}</span><div><b>${esc(t.title)}</b><span>${esc(t.desc)}</span></div></a>`).join('')}</div>
    </section>
    <section class="section wrap-wide">
      <div class="part-head"><h3>Leggyakoribb billentyűk</h3><span>Insert = shortcut mód be/ki</span></div>
      <div class="tiles" style="display:block;padding:10px"><div class="key-strip">${[['Store', 'S'], ['Please', 'Enter'], ['At', 'A'], ['Thru', 'Num /'], ['Clear', 'Delete'], ['Oops', 'Backspace'], ['Group', 'G'], ['Fixture', 'F'], ['Update', 'U'], ['Go+', 'Space']].map(([k, s]) => `<div class="kk">${k}<small>${s}</small></div>`).join('')}</div>
      <div class="cta-row" style="margin-top:12px"><a class="btn btn-sm" href="#/billentyuk">Összes billentyű</a></div></div>
    </section>`;
  };

  /* ---------------- COURSE ---------------- */
  const course = () => {
    app.innerHTML = `<header class="page-head wrap-wide">${cmdbar('Tanfolyam')}<h1 class="h1">Minden lecke</h1><p class="lead rv rv-d2">Sorban haladj — minden lecke az előzőre épít, és ugyanabban a showfájlban dolgozol.</p></header>
      <section class="wrap-wide" style="padding-bottom:40px">${resumeCard()}${courseMap()}</section>`;
  };

  /* ---------------- LESSON ---------------- */
  const renderBlock = (l, b, ctx) => {
    switch (b.t) {
      case 'h': { const id = 'sec-' + MA.slug(b.text); ctx.toc.push({ id, text: b.text, sec: true }); return `<h2 class="b-h" id="${id}">${md(b.text)}</h2>`; }
      case 'p': return `<p class="b-p">${md(b.text)}</p>`;
      case 'list': return `<ul class="b-list">${b.items.map((i) => `<li>${md(i)}</li>`).join('')}</ul>`;
      case 'concept': return `<div class="concept rv"><span class="tag">${esc(b.tag || 'Alapfogalom')}</span><h3>${md(b.title)}</h3>${b.text.map((p) => `<p>${md(p)}</p>`).join('')}${b.fig ? `<figure>${MA.fig[b.fig]()}</figure>` : ''}</div>`;
      case 'step': {
        ctx.n++;
        const sid = b.id || String(ctx.n);
        const domId = `step-${sid}`;
        ctx.toc.push({ id: domId, text: b.title, step: sid });
        const done = MA.store.step(l.id, sid);
        return `<article class="step${done ? ' done' : ''}" id="${domId}" data-sid="${sid}">
          <div class="step-head"><span class="step-n">${ctx.n}</span><h3 class="step-title">${md(b.title)}</h3><button class="check" aria-pressed="${done}" data-step="${sid}"><i>${icon.check}</i><span>${done ? 'Kész' : 'Megcsináltam'}</span></button></div><div class="step-body">${b.text ? `<p class="step-text">${md(b.text)}</p>` : ''}
          ${b.keys ? keysBlock(b.keys) : ''}${b.cmd ? cmdBlock(b.cmd) : ''}${b.fb ? fbBlock(b.fb) : ''}
          ${b.see ? `<div class="see">${icon.eye}<div><b>Mit kell látnod:</b> ${md(b.see)}</div></div>` : ''}
          ${b.mini ? `<div class="mini">${icon.bulb}<div>${md(b.mini)}</div></div>` : ''}
          ${b.shot ? shotFig(b.shot) : ''}</div></article>`;
      }
      case 'tip': {
        const map = { onpc: ['kbd', 'onPC tipp'], theatre: ['desk', 'A színházban'], warn: ['warn', 'Figyelem'], info: ['info', 'Jó tudni'] };
        const [ic, def] = map[b.kind] || map.info;
        return `<div class="call ${b.kind}"><span class="ci">${icon[ic]}</span><div><h4>${md(b.title || def)}</h4><p>${md(b.text)}</p></div></div>`;
      }
      case 'table': return `<div class="sheet-wrap"><table class="sheet"><thead><tr>${b.head.map((h) => `<th>${md(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'fig': return `<figure class="fig rv">${MA.fig[b.name](b.opts)}${b.caption ? `<figcaption>${md(b.caption)}</figcaption>` : ''}</figure>`;
      case 'shot': return shotFig(b.src, b.caption);
      case 'cmd': return cmdBlock(b.cmd) + (b.fb ? fbBlock(b.fb) : '');
      case 'plot': {
        const chips = b.groups ? `<div class="plot-groups">${MA.fig.groups.map((g) => `<button class="pg" data-g="${g.n}"><b>${g.n}</b> ${esc(g.name)}</button>`).join('')}</div>` : '';
        return `<figure class="fig rv plot" data-movers="${b.movers ? 1 : 0}"><div class="plot-svg">${MA.fig.lightplot({ movers: b.movers })}</div>${chips}${b.caption ? `<figcaption>${md(b.caption)}</figcaption>` : ''}</figure>`;
      }
      case 'checkpoint': return `<div class="checkpoint rv"><h3>${md(b.title || 'Ellenőrzőpont')}</h3><p>Mielőtt továbblépsz, ennek kell igaznak lennie:</p><ul>${b.items.map((i) => `<li>${icon.check}<span>${md(i)}</span></li>`).join('')}</ul></div>`;
      case 'quiz': {
        ctx.toc.push({ id: 'sec-kviz', text: 'Gyors kvíz', sec: true });
        return `<h2 class="b-h" id="sec-kviz">Gyors kvíz</h2>` + b.items.map((q, qi) => {
          const ans = MA.store.quiz(l.id, qi);
          const answered = ans !== undefined;
          return `<div class="quiz${answered ? ' answered' : ''}" data-q="${qi}" data-ok="${q.ok}"><p class="quiz-q"><span>${qi + 1}.</span>${md(q.q)}</p><div class="quiz-opts">${q.a.map((a, ai) => {
            const cls = answered ? (ai === q.ok ? ' right' : ai === ans ? ' wrong' : '') : '';
            return `<button class="qo${cls}" data-a="${ai}"${answered ? ' disabled' : ''}><i>${String.fromCharCode(65 + ai)}</i><span>${md(a)}</span></button>`;
          }).join('')}</div><div class="quiz-why">${md(q.why)}</div></div>`;
        }).join('');
      }
      default: return '';
    }
  };

  const lesson = (id, q) => {
    const l = MA.byId[id];
    if (!l) return notFound();
    const savedPos = MA.store.pos();
    const herePos = savedPos && savedPos.l === l.id ? stepList(l).find((s) => s.id === savedPos.s && s.n > 1) : null;
    MA.store.setLast(l.id);
    const ctx = { n: 0, toc: [] };
    const body = l.blocks.map((b) => renderBlock(l, b, ctx)).join('');
    const ls = lessons();
    const idx = ls.indexOf(l);
    const prev = ls[idx - 1], next = ls[idx + 1];
    const toc = `<h3>Ebben a leckében</h3><ol>${ctx.toc.map((t) => `<li><a href="#/lecke/${l.id}?s=${t.id}" data-target="${t.id}" class="${t.sec ? 'sec' : ''}${t.step && MA.store.step(l.id, t.step) ? ' done' : ''}"><span class="dot"></span>${esc(t.text)}</a></li>`).join('')}</ol>`;
    app.innerHTML = `
      <div class="lnav"><div class="lnav-inner"><div class="cmdline"><span class="ball"></span><span class="prompt">[Lecke]&gt;</span><span class="txt lnav-title"><span>${l.id}</span>${esc(l.title)}</span><span class="right"><span class="lnav-count" id="lcount"></span><button class="btn btn-ghost btn-sm lnav-toc" id="tocBtn">Tartalom</button>${next ? `<a class="btn btn-sm" href="#/lecke/${next.id}">Következő ›</a>` : `<a class="btn btn-sm" href="#/tanfolyam">Tanfolyam</a>`}</span><div class="lnav-progress" id="lbar"></div></div></div></div>
      <header class="l-hero wrap-wide">
        <p class="eyebrow rv">Lecke ${l.id} · ${partName(l.part)}</p>
        <h1 class="h1 rv rv-d1">${esc(l.title)}</h1>
        <p class="lead rv rv-d2">${md(l.lead)}</p>
        <div class="l-meta rv rv-d3">${herePos && !q.s ? `<a class="chip go here-chip" href="#/lecke/${l.id}?s=step-${herePos.id}">Itt tartottál: ${herePos.n}. lépés ›</a>` : ''}<span class="chip">${icon.clock} kb. ${l.min} perc</span><span class="chip">${icon.monitor} onPC kell</span><span class="chip">Eredeti fejezet: ${esc(l.en)}</span></div>
        <div class="l-learn win"><h2 class="win-title gray"><span class="ball"></span>Amit megtanulsz</h2><ul>${l.learn.map((x) => `<li>${icon.check}<span>${md(x)}</span></li>`).join('')}</ul></div>
      </header>
      <div class="l-layout"><nav class="l-toc" aria-label="Lecke tartalma">${toc}</nav>
        <div class="l-body">${body}
          <div class="l-end"><div class="finish" id="finish"></div>
          <div class="next">${prev ? `<a href="#/lecke/${prev.id}"><small>‹ Előző</small><b>${prev.id} · ${esc(prev.title)}</b></a>` : '<span></span>'}${next ? `<a class="nx" href="#/lecke/${next.id}"><small>Következő ›</small><b>${next.id} · ${esc(next.title)}</b></a>` : `<a class="nx" href="#/tanfolyam"><small>Kész ›</small><b>Vissza a tanfolyamhoz</b></a>`}</div></div>
        </div></div>
      <div class="toc-sheet" id="tocSheet"><div class="scrim"></div><div class="panel"><nav class="l-toc">${toc}</nav></div></div>`;

    const refresh = () => {
      const p = MA.lessonProgress(l);
      $('#lcount').textContent = `${p.n}/${p.total} lépés`;
      $('#lbar').style.width = Math.round(p.pct * 100) + '%';
      const done = MA.store.isDone(l.id) || p.pct === 1;
      $('#finish').innerHTML = done
        ? `<div><b>${icon.check} Lecke kész!</b><p>Szép munka. Ha valamit elfelejtesz, a Témakörök oldalon gyorsan visszanézheted.</p></div><button class="btn btn-ghost btn-sm" id="undoDone">Újrakezdem</button>`
        : `<div><b>Végeztél a leckével?</b><p>${p.n} / ${p.total} lépés kipipálva.</p></div><button class="btn btn-primary" id="markDone">Megjelölöm késznek</button>`;
      updateNav();
    };
    refresh();

    app.addEventListener('click', (e) => {
      const chk = e.target.closest('.check');
      if (chk) {
        const sid = chk.dataset.step;
        const v = !MA.store.step(l.id, sid);
        MA.store.setStep(l.id, sid, v);
        const card = chk.closest('.step');
        card.classList.toggle('done', v);
        chk.setAttribute('aria-pressed', v);
        chk.querySelector('span').textContent = v ? 'Kész' : 'Megcsináltam';
        $$(`.l-toc a[data-target="${card.id}"]`).forEach((a) => a.classList.toggle('done', v));
        if (!v) MA.store.setDone(l.id, false);
        if (v) { const nxt = MA.stepIds(l).find((s) => !MA.store.step(l.id, s)); if (nxt) MA.store.setPos(l.id, nxt); else if (next) MA.store.setPos(next.id, MA.stepIds(next)[0]); }
        refresh();
        if (v) {
          const p = MA.lessonProgress(l);
          toast(p.pct === 1 ? 'Lecke kész' : `Lépés ${p.n}/${p.total} kész`);
          const nextStep = card.nextElementSibling && card.nextElementSibling.closest && $$('.step:not(.done)').find((s) => s.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_PRECEDING);
          if (nextStep && nextStep.getBoundingClientRect().top > innerHeight * 0.85) nextStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      if (e.target.closest('#markDone')) { MA.stepIds(l).forEach((s) => MA.store.setStep(l.id, s, true)); MA.store.setDone(l.id, true); if (next) MA.store.setPos(next.id, MA.stepIds(next)[0]); $$('.step').forEach((s) => { s.classList.add('done'); const b = $('.check', s); b.setAttribute('aria-pressed', true); $('span', b).textContent = 'Kész'; }); $$('.l-toc a[data-target^="step-"]').forEach((a) => a.classList.add('done')); refresh(); toast('Lecke kész'); return; }
      if (e.target.closest('#undoDone')) { MA.stepIds(l).forEach((s) => MA.store.setStep(l.id, s, false)); MA.store.setDone(l.id, false); $$('.step').forEach((s) => { s.classList.remove('done'); const b = $('.check', s); b.setAttribute('aria-pressed', false); $('span', b).textContent = 'Megcsináltam'; }); $$('.l-toc a').forEach((a) => a.classList.remove('done')); refresh(); return; }
      const qo = e.target.closest('.qo');
      if (qo && !qo.disabled) {
        const qz = qo.closest('.quiz'); const qi = +qz.dataset.q; const ok = +qz.dataset.ok; const ai = +qo.dataset.a;
        MA.store.setQuiz(l.id, qi, ai);
        $$('.qo', qz).forEach((b, i) => { b.disabled = true; if (i === ok) b.classList.add('right'); else if (i === ai) b.classList.add('wrong'); });
        qz.classList.add('answered');
        toast(ai === ok ? 'Helyes válasz' : 'Nem jó — lásd a magyarázatot');
        return;
      }
      const pg = e.target.closest('.pg');
      if (pg) {
        const fig = pg.closest('.plot'); const on = pg.classList.contains('on');
        $$('.pg', fig).forEach((b) => b.classList.remove('on'));
        const g = MA.fig.groups.find((x) => x.n === +pg.dataset.g);
        if (!on) pg.classList.add('on');
        $('.plot-svg', fig).innerHTML = MA.fig.lightplot({ movers: fig.dataset.movers === '1', highlight: on ? [] : g.ch });
        return;
      }
      const tl = e.target.closest('.l-toc a');
      if (tl) { e.preventDefault(); closeToc(); scrollToId(tl.dataset.target); return; }
    });
    $('#tocBtn').addEventListener('click', () => $('#tocSheet').classList.add('open'));
    const closeToc = () => $('#tocSheet').classList.remove('open');
    $('#tocSheet .scrim').addEventListener('click', closeToc);

    // scroll spy
    let posTimer;
    const spy = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        $$('.l-toc a').forEach((a) => a.classList.toggle('cur', a.dataset.target === en.target.id));
        if (en.target.classList.contains('step')) { // remember the step being read
          const sid = en.target.dataset.sid;
          clearTimeout(posTimer); posTimer = setTimeout(() => MA.store.setPos(l.id, sid), 700);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    cleanup.push(() => clearTimeout(posTimer));
    ctx.toc.forEach((t) => { const el = document.getElementById(t.id); if (el) spy.observe(el); });
    cleanup.push(() => spy.disconnect());

    if (q.s) setTimeout(() => scrollToId(q.s), 60);
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (el.classList.contains('step')) { el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); }
  };

  /* ---------------- TOPICS ---------------- */
  const topics = (q) => {
    app.innerHTML = `<header class="page-head wrap">${cmdbar('Témakörök')}<h1 class="h1">Mit felejtettél el?</h1>
      <p class="lead rv rv-d2">Rövid receptek a leggyakoribb feladatokhoz. Ha mélyebben kell, kattints a leckére.</p>
      <label class="search rv rv-d3">${icon.search}<input id="tq" type="search" placeholder="Keresés: group, cue, preset, mentés…" autocomplete="off"></label></header>
      <section class="wrap" style="padding-bottom:100px"><div class="topic-grid" id="tgrid">${MA.topics.map((t) => `
        <article class="topic" id="topic-${t.id}" data-kw="${esc((t.title + ' ' + t.en + ' ' + t.desc + ' ' + (t.kw || '')).toLowerCase())}">
          <div class="topic-top"><span class="ico">${icon[t.icon] || icon.star}</span><h3>${esc(t.title)}<small>${esc(t.en)}</small></h3></div>
          <p>${md(t.desc)}</p><ol class="recipe">${t.recipe.map((r) => `<li><span>${md(r)}</span></li>`).join('')}</ol>
          <div class="topic-links">${t.links.map(([lid, s]) => `<a href="#/lecke/${lid}${s ? '?s=' + s : ''}">${lid} · ${esc((MA.byId[lid] || {}).title || 'Lecke')}</a>`).join('')}</div>
        </article>`).join('')}</div><p class="empty" id="tempty">Nincs találat. Próbáld angolul is (pl. „store”, „group”).</p></section>`;
    const inp = $('#tq');
    const filter = () => {
      const v = inp.value.trim().toLowerCase();
      let shown = 0;
      $$('.topic').forEach((el) => { const hit = !v || el.dataset.kw.includes(v); el.classList.toggle('hidden', !hit); shown += hit; });
      $('#tempty').classList.toggle('show', !shown);
    };
    inp.addEventListener('input', filter);
    if (q.t) setTimeout(() => { const el = $('#topic-' + q.t); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.style.boxShadow = '0 0 0 2px var(--ma)'; setTimeout(() => (el.style.boxShadow = ''), 1800); } }, 80);
  };

  /* ---------------- SHORTCUTS ---------------- */
  const combo = (s) => `<span class="combo">${s.split(' + ').map((p) => `<span class="pk">${esc(p)}</span>`).join('<span class="plus">+</span>')}</span>`;
  const shortcuts = () => {
    app.innerHTML = `<header class="page-head wrap">${cmdbar('onPC billentyűk')}<h1 class="h1">onPC billentyűparancsok</h1>
      <p class="lead rv rv-d2">A hivatalos alapértelmezett grandMA2 onPC billentyűparancsok (v3.9). A magyar billentyűzet a némethez hasonló QWERTZ, ezért szinte mind működik.</p>
      <label class="search rv rv-d3">${icon.search}<input id="sq" type="search" placeholder="Keresés: Store, Thru, Backup…" autocomplete="off"></label></header>
      <section class="wrap" style="padding-bottom:100px">
        <div class="sc-note">
          <div class="call onpc"><span class="ci">${icon.kbd}</span><div><h4>Kapcsold be: Insert</h4><p>A shortcutok csak <b>shortcut módban</b> működnek. Be/ki: <b>Insert</b>, vagy a jobb felső <b>Shortcut (Ins)</b> gomb. Bekapcsolva a gombok alatt zárójelben látod a betűt.</p></div></div>
          <div class="call warn"><span class="ci">${icon.warn}</span><div><h4>Nevek beírása</h4><p>Shortcut módban a betűk gombokat nyomnak (S = Store). Amikor egy felugró ablakba nevet írsz (pl. group neve), a billentyűzet ott rendesen szöveget ír.</p></div></div>
          <div class="call info"><span class="ci">${icon.info}</span><div><h4>A leckékben</h4><p>Minden lépésnél a gombok alatt ott a billentyűzetes változat is. Vidd az egeret bármelyik gomb fölé: megmutatja a billentyűjét.</p></div></div>
        </div>
        ${MA.shortcutGroups.map((g) => `<div class="sc-group"><h3>${esc(g.title)}</h3>${g.note ? `<p class="muted" style="margin:-6px 0 14px">${esc(g.note)}</p>` : ''}<div class="sc-table">${g.rows.map(([k, s, hu, star]) => `<div class="sc-row${star ? ' star' : ''}" data-kw="${esc((k + ' ' + s + ' ' + (hu || '')).toLowerCase())}"><span class="what"><kbd class="k">${esc(k)}</kbd>${hu ? `<em>${esc(hu)}</em>` : ''}</span>${combo(s)}</div>`).join('')}</div></div>`).join('')}
        <p class="empty" id="sempty">Nincs találat.</p>
      </section>`;
    $('#sq').addEventListener('input', (e) => {
      const v = e.target.value.trim().toLowerCase(); let n = 0;
      $$('.sc-row').forEach((r) => { const hit = !v || r.dataset.kw.includes(v); r.classList.toggle('hidden', !hit); n += hit; });
      $$('.sc-group').forEach((g) => { g.style.display = $$('.sc-row:not(.hidden)', g).length ? '' : 'none'; });
      $('#sempty').classList.toggle('show', !n);
    });
  };

  /* ---------------- GLOSSARY ---------------- */
  const glossary = (q) => {
    let letter = '';
    const items = MA.glossary.map((g) => {
      const L = g.term[0].toUpperCase();
      const head = L !== letter ? `<div class="gl-letter">${(letter = L)}</div>` : '';
      return head + `<article class="gl-item" id="t-${MA.slug(g.term)}" data-kw="${esc((g.term + ' ' + g.hu + ' ' + g.text).toLowerCase())}"><h3>${esc(g.term)} <small>${esc(g.hu)}</small></h3><p>${md(g.text)}</p>${g.lessons.length ? `<div class="topic-links" style="margin-top:10px">${g.lessons.map((lid) => `<a href="#/lecke/${lid}">${lid} · ${esc((MA.byId[lid] || {}).title || '')}</a>`).join('')}</div>` : ''}</article>`;
    }).join('');
    app.innerHTML = `<header class="page-head wrap">${cmdbar('Szótár')}<h1 class="h1">Pult-szótár</h1><p class="lead rv rv-d2">A gombok és menük angolul maradnak — itt van, mit jelentenek magyarul.</p>
      <label class="search rv rv-d3">${icon.search}<input id="gq" type="search" placeholder="Keresés: programmer, cue, preset…" autocomplete="off"></label></header>
      <section class="wrap-narrow" style="padding-bottom:100px" id="glist">${items}<p class="empty" id="gempty">Nincs találat.</p></section>`;
    $('#gq').addEventListener('input', (e) => {
      const v = e.target.value.trim().toLowerCase(); let n = 0;
      $$('.gl-item').forEach((r) => { const hit = !v || r.dataset.kw.includes(v); r.classList.toggle('hidden', !hit); n += hit; });
      $$('.gl-letter').forEach((L) => { L.style.display = v ? 'none' : ''; });
      $('#gempty').classList.toggle('show', !n);
    });
    if (q.t) setTimeout(() => { const el = $('#t-' + q.t); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1800); } }, 80);
  };

  const notFound = () => { app.innerHTML = `<header class="page-head wrap"><p class="eyebrow">404</p><h1 class="h1">Ez a lap nem létezik.</h1><div class="cta-row"><a class="btn btn-primary" href="#/">Főoldal</a></div></header>`; };

  /* ---------------- chrome ---------------- */
  let toastTimer;
  const toast = (msg) => {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = `${icon.check}<span>${esc(msg)}</span>`;
    t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
  };

  const updateNav = () => {
    const pct = MA.totalProgress();
    $('#navPct').textContent = Math.round(pct * 100) + '%';
    $('#navRing').style.strokeDashoffset = String(94.25 * (1 - pct));
    const w = where(), wl = $('#navResumeWhere');
    if (wl) wl.textContent = w && w.saved ? `${w.l.id}${w.st ? ' · ' + w.st.n + '.' : ''}` : '';
    if (typeof MA.onNav === 'function') MA.onNav();
  };

  const revealAll = () => {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach((el) => io.observe(el));
    cleanup.push(() => io.disconnect());
  };

  // copy buttons + screenshot zoom (global)
  document.addEventListener('click', (e) => {
    const cp = e.target.closest('.cmd-copy');
    if (cp) {
      const txt = cp.dataset.copy;
      const ok = () => { cp.textContent = 'Másolva'; cp.classList.add('ok'); setTimeout(() => { cp.textContent = 'Másolás'; cp.classList.remove('ok'); }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, ok); else ok();
      return;
    }
    const z = e.target.closest('[data-zoom]');
    if (z) {
      const box = document.createElement('div');
      box.className = 'lightbox';
      box.innerHTML = `<img src="${z.dataset.zoom}" alt=""><button class="lb-x" aria-label="Bezárás">×</button>`;
      box.addEventListener('click', () => box.remove());
      document.body.appendChild(box);
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const lb = $('.lightbox'); if (lb) lb.remove(); const ts = $('#tocSheet'); if (ts) ts.classList.remove('open'); } });

  /* theme switch: MA2 (default) / Modern */
  const setTheme = (t) => {
    const modern = t === 'modern';
    if (modern) document.documentElement.setAttribute('data-theme', 'modern');
    else document.documentElement.removeAttribute('data-theme');
    $$('[data-theme-set]').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.themeSet === 'modern') === modern)));
    try { localStorage.setItem('ma2tanulo:theme', modern ? 'modern' : 'ma2'); } catch (e) { /* ignore */ }
  };
  setTheme(document.documentElement.getAttribute('data-theme') === 'modern' ? 'modern' : 'ma2');
  $$('[data-theme-set]').forEach((b) => b.addEventListener('click', () => setTheme(b.dataset.themeSet)));

  const menuBtn = $('#menuBtn'), links = $('#gnavLinks');
  menuBtn.addEventListener('click', () => { const open = !links.classList.contains('open'); links.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); });
  $('#resetBtn').addEventListener('click', () => { if (confirm('Biztosan törlöd a haladásodat? (Csak ebben a böngészőben tárolt pipák és kvízválaszok.)')) { MA.store.reset(); route(); } });

  /* ---------------- router ---------------- */
  let cleanup = [];
  const parse = () => {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const q = Object.fromEntries(new URLSearchParams(qs || ''));
    return { parts: path.split('/').filter(Boolean), q };
  };
  let lastPath = null;
  const route = () => {
    const { parts, q } = parse();
    const path = parts.join('/');
    if (path === lastPath && parts[0] === 'lecke' && q.s) { scrollToId(q.s); return; }
    cleanup.forEach((f) => f()); cleanup = [];
    const fresh = app.cloneNode(false); app.replaceWith(fresh); app = fresh; // drop old listeners
    const sec = parts[0] || '';
    $$('.gnav-links a').forEach((a) => a.classList.toggle('active', a.dataset.nav === (sec === 'lecke' ? 'tanfolyam' : sec)));
    links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false');
    $('.nav-resume').classList.toggle('active', sec === 'folytatas');
    if (!sec) home();
    else if (sec === 'tanfolyam') course();
    else if (sec === 'lecke') lesson(parts[1], q);
    else if (sec === 'temak') topics(q);
    else if (sec === 'billentyuk') shortcuts();
    else if (sec === 'szotar') glossary(q);
    else if (sec === 'folytatas') resumePage();
    else if (MA.routes && MA.routes[sec]) MA.routes[sec]({ app, parts, q });
    else notFound();
    document.title = ({ '': 'MA2 Tanuló', tanfolyam: 'Tanfolyam · MA2 Tanuló', temak: 'Témakörök · MA2 Tanuló', billentyuk: 'Billentyűk · MA2 Tanuló', szotar: 'Szótár · MA2 Tanuló', folytatas: 'Folytatás · MA2 Tanuló', vizsga: 'Záróvizsga · MA2 Tanuló', profil: 'Profil · MA2 Tanuló', admin: 'Admin · MA2 Tanuló' })[sec] || (MA.byId[parts[1]] ? `${MA.byId[parts[1]].id} ${MA.byId[parts[1]].title} · MA2 Tanuló` : 'MA2 Tanuló');
    if (path !== lastPath && !q.s && !q.t) window.scrollTo(0, 0);
    lastPath = path;
    if (typeof MA.afterRoute === 'function') MA.afterRoute(sec);
    updateNav();
    revealAll();
  };
  MA.ui = { cmdbar, toast, md, esc, icon, lessons, stepList, plain, partName, route: () => { lastPath = null; route(); }, updateNav: () => updateNav() };
  window.addEventListener('hashchange', route);
  route();
  MA._route = route;
})();
