/* MA2 Tanuló — core: registry, inline markup, progress store, icons */
(function () {
  'use strict';

  const MA = (window.MA = {
    lessons: [],
    byId: {},
    SC: {},          // key label -> onPC shortcut (filled by data/shortcuts.js)
    glossary: [],
    topics: [],
    bonus: [],
    parts: [
      { id: 'start', name: 'Kezdés', sub: 'Mielőtt hozzányúlsz' },
      { id: 'alapok', name: 'Alapok', sub: 'Show, patch, ablakok, csatornák' },
      { id: 'prog', name: 'Programozás', sub: 'Groupok és cue-k' },
      { id: 'ml', name: 'Moving lightok', sub: 'Mozgófejek hozzáadása és vezérlése' },
      { id: 'preset', name: 'Presetek és lejátszás', sub: 'Presetek, második sequence, executorok' }
    ]
  });

  MA.lesson = (def) => { MA.lessons.push(def); MA.byId[def.id] = def; };

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  MA.esc = esc;
  MA.slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* Keycaps. Input is already HTML-escaped. "_" inside a token = space. */
  MA.keys = (escaped) => escaped.trim().split(/\s+/).map((tok) => {
    const label = tok.replace(/_/g, ' ');
    const raw = label.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    let cls = 'k';
    if (/^[0-9.]$/.test(raw)) cls += ' n';
    if (raw === 'Please') cls += ' please';
    const sc = MA.SC[raw];
    return `<kbd class="${cls}"${sc ? ` data-sc="${esc(sc)}"` : ''}>${label}</kbd>`;
  }).join('');

  /* Inline markup:
     [[Store Cue 1 Please]]  keycaps
     {{New Show}}            on-screen MA button
     `cmd`                   code
     **bold**                strong
     ((Term)) / ((Term|szöveg)) glossary link
     ==text==                highlight
  */
  MA.md = (src) => {
    if (src == null) return '';
    let h = esc(src);
    h = h.replace(/\[\[(.+?)\]\]/g, (_, k) => `<span class="keys">${MA.keys(k)}</span>`);
    h = h.replace(/\{\{(.+?)\}\}/g, (_, t) => `<span class="ui">${t}</span>`);
    h = h.replace(/`(.+?)`/g, (_, t) => `<code>${t}</code>`);
    h = h.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
    h = h.replace(/==(.+?)==/g, (_, t) => `<mark>${t}</mark>`);
    h = h.replace(/\(\((.+?)\)\)/g, (_, t) => {
      const [term, label] = t.split('|');
      return `<a class="term" href="#/szotar?t=${MA.slug(term)}">${label || term}</a>`;
    });
    return h.replace(/\n/g, '<br>');
  };

  /* ---------- progress store (localStorage, fail-safe) ---------- */
  const KEY = 'ma2tanulo:v1';
  let state = { steps: {}, quiz: {}, done: {}, last: null };
  try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (e) { /* private mode */ }
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    if (typeof MA.onSave === 'function') MA.onSave(); // cloud sync (cloud.js)
  };
  const blank = () => ({ steps: {}, quiz: {}, done: {}, last: null, pos: null });

  MA.store = {
    get state() { return state; },
    step(lid, sid) { return !!state.steps[lid + ':' + sid]; },
    setStep(lid, sid, v) { if (v) state.steps[lid + ':' + sid] = 1; else delete state.steps[lid + ':' + sid]; save(); },
    quiz(lid, qi) { return state.quiz[lid + ':' + qi]; },
    setQuiz(lid, qi, ans) { state.quiz[lid + ':' + qi] = ans; save(); },
    isDone(lid) { return !!state.done[lid]; },
    setDone(lid, v) { if (v) state.done[lid] = 1; else delete state.done[lid]; save(); },
    setLast(lid) { state.last = lid; save(); },
    pos() { return state.pos || null; },
    setPos(lid, sid) { state.pos = { l: lid, s: sid, t: Date.now() }; state.last = lid; save(); },
    reset() { state = blank(); save(); },
    /* replace local progress with another state (e.g. from the server) */
    replace(next) { state = Object.assign(blank(), next || {}); try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } },
    /* merge server progress into local: union of ticks, newest position wins */
    merge(remote) {
      if (!remote) return;
      ['steps', 'quiz', 'done'].forEach((k) => { state[k] = Object.assign({}, remote[k] || {}, state[k] || {}); });
      const rp = remote.pos, lp = state.pos;
      if (rp && (!lp || (rp.t || 0) > (lp.t || 0))) { state.pos = rp; state.last = remote.last || rp.l; }
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    }
  };

  /* progress of any saved state (used by the admin page) */
  MA.progressOf = (st, lesson) => {
    const ids = MA.stepIds(lesson);
    const steps = (st && st.steps) || {};
    const n = ids.filter((id) => steps[lesson.id + ':' + id]).length;
    const done = st && st.done && st.done[lesson.id];
    return { n, total: ids.length, pct: done ? 1 : ids.length ? n / ids.length : 0 };
  };
  MA.totalOf = (st) => MA.lessons.length ? MA.lessons.reduce((a, l) => a + MA.progressOf(st, l).pct, 0) / MA.lessons.length : 0;

  /* Count steps of a lesson */
  MA.stepIds = (lesson) => lesson.blocks.filter((b) => b.t === 'step').map((b, i) => b.id || String(i + 1));
  MA.lessonProgress = (lesson) => {
    const ids = MA.stepIds(lesson);
    const n = ids.filter((id) => MA.store.step(lesson.id, id)).length;
    const total = ids.length;
    const pct = MA.store.isDone(lesson.id) ? 1 : total ? n / total : 0;
    return { n, total, pct };
  };
  MA.totalProgress = () => {
    if (!MA.lessons.length) return 0;
    return MA.lessons.reduce((a, l) => a + MA.lessonProgress(l).pct, 0) / MA.lessons.length;
  };

  /* ---------- icons ---------- */
  const I = (d, extra = '') => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  MA.icon = {
    check: I('<path d="M5 12.5l4.2 4.2L19 7"/>', 'stroke-width="2.6"'),
    chev: '<svg class="chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    eye: I('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    kbd: I('<rect x="2" y="6" width="20" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'),
    desk: I('<rect x="2" y="9" width="20" height="10" rx="2"/><path d="M6 9V5M10 9V7M14 9V4M18 9V6"/><path d="M6 13h2M11 13h2M16 13h2"/>'),
    warn: I('<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18h.01"/>'),
    info: I('<circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.5h.01"/>'),
    clock: I('<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>'),
    search: I('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    bulb: I('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>'),
    layers: I('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>'),
    grid: I('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    sliders: I('<path d="M6 3v18M12 3v18M18 3v18"/><rect x="4" y="13" width="4" height="3" rx="1"/><rect x="10" y="7" width="4" height="3" rx="1"/><rect x="16" y="15" width="4" height="3" rx="1"/>'),
    palette: I('<path d="M12 3a9 9 0 100 18c1.1 0 1.5-.8 1.5-1.6 0-1.1-.9-1.4-.9-2.4 0-1 .8-1.6 1.8-1.6H17a4 4 0 004-4c0-4.7-4-8.4-9-8.4z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'),
    list: I('<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>'),
    play: I('<path d="M7 4.5v15l13-7.5-13-7.5z"/>'),
    file: I('<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"/><path d="M14 3v6h6"/>'),
    plug: I('<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4"/>'),
    monitor: I('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
    move: I('<path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3"/>'),
    star: I('<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3z"/>'),
    book: I('<path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5v-17z"/><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>'),
    spark: I('<path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5"/>'),
    flag: I('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'),
    trash: I('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>')
  };
})();
