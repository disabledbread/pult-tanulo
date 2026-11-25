/* MA2 Tanuló — figures (inline SVG / HTML, original drawings) */
(function () {
  'use strict';
  const MA = window.MA;
  const F = (MA.fig = {});

  /* ---------- Light plot ---------- */
  const PAIRS_X = [[85, 120], [225, 260], [415, 450], [560, 595]];
  const MOVER_X = [172, 337, 505];
  const ROWS = [
    { name: 'LX4', y: 70, first: 33, movers: [131, 132, 133] },
    { name: 'LX2', y: 150, first: 25, movers: [121, 122, 123] },
    { name: 'LX1', y: 230, first: 17, movers: [111, 112, 113] }
  ];
  F.lightplot = (o = {}) => {
    const hl = new Set((o.highlight || []).map(Number));
    const any = hl.size > 0;
    const dim = (ch, x, y) => {
      const warm = ch % 2 === 1;
      const on = hl.has(ch);
      return `<g class="lp-ch${on ? ' on' : ''}${any && !on ? ' off' : ''}" data-ch="${ch}">
        <circle cx="${x}" cy="${y}" r="14" fill="${warm ? 'var(--warm)' : 'var(--cold)'}" fill-opacity="${on ? 1 : 0.85}" ${on ? 'stroke="#fff" stroke-width="2.5"' : ''}/>
        <text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="12" font-weight="700" fill="#000">${ch}</text></g>`;
    };
    const mover = (id, x, y) => {
      const on = hl.has(id);
      return `<g class="lp-ch${on ? ' on' : ''}${any && !on ? ' off' : ''}" data-ch="${id}">
        <rect x="${x - 19}" y="${y - 13}" width="38" height="26" rx="7" fill="#2c2c2e" stroke="${on ? '#fff' : 'var(--ma)'}" stroke-width="${on ? 2.5 : 1.5}"/>
        <text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ma)">${id}</text></g>`;
    };
    let s = `<svg viewBox="0 0 720 560" role="img" aria-label="Fényterv: ${o.movers ? '40 dimmer és 9 Mac 700' : '40 dimmer csatorna'}" class="lightplot">
      <defs><linearGradient id="stg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151516"/><stop offset="1" stop-color="#0c0c0d"/></linearGradient></defs>
      <rect x="20" y="30" width="680" height="400" rx="16" fill="url(#stg)" stroke="#2c2c2e"/>
      <line x1="360" y1="40" x2="360" y2="420" stroke="#3a3a3c" stroke-dasharray="10 8"/>
      <text x="360" y="412" text-anchor="middle" font-size="12" letter-spacing="3" fill="#6e6e73">SZÍNPAD</text>`;
    ROWS.forEach((r) => {
      s += `<line x1="60" y1="${r.y}" x2="660" y2="${r.y}" stroke="#48484a" stroke-width="2"/>
        <text x="30" y="${r.y + 4}" font-size="11" font-weight="700" fill="#86868b">${r.name}</text>`;
      PAIRS_X.forEach(([a, b], i) => { s += dim(r.first + i * 2, a, r.y) + dim(r.first + i * 2 + 1, b, r.y); });
      if (o.movers) MOVER_X.forEach((x, i) => { s += mover(r.movers[i], x, r.y); });
    });
    // side booms (Box)
    s += `<text x="44" y="292" font-size="11" font-weight="700" fill="#86868b" text-anchor="middle">Box L</text>
      <text x="676" y="292" font-size="11" font-weight="700" fill="#86868b" text-anchor="middle">Box R</text>`;
    [1, 2, 3, 4].forEach((ch, i) => { s += dim(ch, 44, 310 + i * 30); });
    [16, 15, 14, 13].forEach((ch, i) => { s += dim(ch, 676, 310 + i * 30); });
    // FOH
    s += `<line x1="60" y1="490" x2="660" y2="490" stroke="#48484a" stroke-width="2"/>
      <text x="30" y="494" font-size="11" font-weight="700" fill="#86868b">FOH</text>`;
    PAIRS_X.forEach(([a, b], i) => { s += dim(5 + i * 2, a, 490) + dim(6 + i * 2, b, 490); });
    s += `<text x="360" y="540" text-anchor="middle" font-size="12" letter-spacing="3" fill="#6e6e73">NÉZŐTÉR</text></svg>`;
    const legend = `<div class="legend"><span><i style="background:var(--warm)"></i>Páratlan = meleg (warm)</span><span><i style="background:var(--cold)"></i>Páros = hideg (cold)</span>${o.movers ? '<span><i style="background:var(--ma);border-radius:3px"></i>Mac 700 (Fixture ID)</span>' : ''}</div>`;
    return s + legend;
  };

  /* Group data from the guide (lesson 05) */
  F.groups = [
    { n: 1, name: 'FOH Warm', ch: [5, 7, 9, 11] },
    { n: 2, name: 'LX1 Warm', ch: [17, 19, 21, 23] },
    { n: 3, name: 'LX2 Warm', ch: [25, 27, 29, 31] },
    { n: 4, name: 'LX4 Warm', ch: [33, 35, 37, 39] },
    { n: 5, name: 'Box Warm', ch: [1, 3, 13, 15] },
    { n: 6, name: 'All Warm', ch: Array.from({ length: 20 }, (_, i) => i * 2 + 1) },
    { n: 7, name: 'FOH Cold', ch: [6, 8, 10, 12] },
    { n: 8, name: 'LX1 Cold', ch: [18, 20, 22, 24] },
    { n: 9, name: 'LX2 Cold', ch: [26, 28, 30, 32] },
    { n: 10, name: 'LX4 Cold', ch: [34, 36, 38, 40] },
    { n: 11, name: 'Box Cold', ch: [2, 4, 14, 16] },
    { n: 12, name: 'All Cold', ch: Array.from({ length: 20 }, (_, i) => i * 2 + 2) }
  ];

  /* ---------- onPC main window map ---------- */
  F.onpc = () => `<svg viewBox="0 0 760 420" role="img" aria-label="A grandMA2 onPC főablaka">
    <rect x="1" y="1" width="758" height="418" rx="14" fill="#0b0b0c" stroke="#2c2c2e"/>
    <!-- screen 1 area -->
    <rect x="16" y="16" width="360" height="56" rx="6" fill="#151516" stroke="#3a3000"/>
    ${[0, 1, 2, 3].map((i) => `<circle cx="${62 + i * 90}" cy="44" r="16" fill="none" stroke="#c79a00" stroke-width="2"/>`).join('')}
    <rect x="16" y="80" width="360" height="190" rx="6" fill="#101011" stroke="#3a3000"/>
    <text x="196" y="170" text-anchor="middle" font-size="13" fill="#a1a1a6">Ablakterület</text>
    <text x="196" y="190" text-anchor="middle" font-size="11" fill="#6e6e73">ide nyílik a Setup, Backup, Fixture Sheet…</text>
    <rect x="16" y="278" width="360" height="22" rx="4" fill="#0e4f4a"/>
    <text x="26" y="293" font-size="11" fill="#86868b" font-family="monospace">[Channel]&gt;</text>
    ${Array.from({ length: 10 }, (_, i) => `<rect x="${16 + i * 36}" y="308" width="32" height="40" rx="3" fill="#1c1c1e" stroke="#2c2c2e"/>`).join('')}
    ${Array.from({ length: 10 }, (_, i) => `<rect x="${16 + i * 36}" y="354" width="32" height="20" rx="3" fill="#141416" stroke="#2c2c2e"/>`).join('')}
    <!-- keys -->
    ${Array.from({ length: 12 }, (_, r) => Array.from({ length: 3 }, (_, c) => `<rect x="${392 + c * 34}" y="${16 + r * 31}" width="30" height="26" rx="4" fill="#141416" stroke="#5c4a00"/>`).join('')).join('')}
    ${Array.from({ length: 8 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<rect x="${504 + c * 34}" y="${16 + r * 31}" width="30" height="26" rx="4" fill="#141416" stroke="#5c4a00"/>`).join('')).join('')}
    <rect x="538" y="264" width="98" height="26" rx="4" fill="#141416" stroke="#c79a00"/>
    <text x="587" y="281" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Please</text>
    <!-- right edge -->
    ${['Masters', 'Extern 1', 'Extern 2', 'Exec 1–15', 'Exec 16–30', 'Screen 2', 'Screen 3', 'Screen 4'].map((t, i) => `<rect x="${666}" y="${16 + i * 40}" width="80" height="34" rx="5" fill="#141416" stroke="#c79a00"/><text x="706" y="${37 + i * 40}" text-anchor="middle" font-size="11" fill="${t.startsWith('Screen') ? 'var(--ma)' : '#e5e5ea'}">${t}</text>`).join('')}
    <rect x="666" y="352" width="80" height="34" rx="5" fill="#141416" stroke="#c79a00"/><text x="706" y="366" text-anchor="middle" font-size="10" fill="#e5e5ea">Command</text><text x="706" y="378" text-anchor="middle" font-size="10" fill="#e5e5ea">Overlay</text>
    <rect x="644" y="392" width="102" height="20" rx="4" fill="none" stroke="#3a3a3c"/><text x="695" y="406" text-anchor="middle" font-size="10" fill="#86868b">CMD · Shortcut (Ins)</text>
    <!-- callouts -->
    ${[[30, 30, 1], [30, 98, 2], [30, 290, 3], [30, 330, 4], [400, 30, 5], [676, 26, 6]].map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="10" fill="var(--ma)"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="800" fill="#000">${n}</text>`).join('')}
  </svg>`;

  /* ---------- Cue → Sequence → Executor ---------- */
  F.hierarchy = () => `<svg viewBox="0 0 720 230" role="img" aria-label="A cue a sequence-ben van, a sequence egy executoron">
    <rect x="16" y="20" width="300" height="190" rx="16" fill="#141416" stroke="#3a3a3c"/>
    <text x="34" y="48" font-size="13" font-weight="700" fill="var(--ma)">Sequence 1 · „Main Show”</text>
    ${['Cue 1 · Behind Curtain', 'Cue 2 · With Curtain Up', 'Cue 3 · Build'].map((t, i) => `<rect x="34" y="${64 + i * 46}" width="264" height="36" rx="9" fill="#1f1f21" stroke="#48484a"/><text x="50" y="${87 + i * 46}" font-size="13" fill="#f5f5f7">${t}</text>`).join('')}
    <path d="M330 115h120" stroke="var(--ma)" stroke-width="2.5" marker-end="url(#ar)"/>
    <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ma)"/></marker></defs>
    <text x="390" y="104" text-anchor="middle" font-size="12" fill="#a1a1a6">rajta van</text>
    <rect x="470" y="20" width="230" height="190" rx="16" fill="#141416" stroke="#3a3a3c"/>
    <rect x="490" y="36" width="190" height="30" rx="7" fill="#1d4d1d"/><text x="585" y="56" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Executor 1 · Main Show</text>
    <rect x="575" y="78" width="20" height="110" rx="6" fill="#0b0b0c" stroke="#3a3a3c"/>
    <rect x="565" y="110" width="40" height="22" rx="5" fill="#3a3a3c" stroke="#c79a00"/>
    <rect x="620" y="150" width="56" height="34" rx="7" fill="#141416" stroke="#c79a00"/><text x="648" y="172" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Go</text>
    <text x="585" y="205" text-anchor="middle" font-size="11" fill="#86868b">fader + gombok</text>
  </svg>`;

  /* ---------- Clear stages ---------- */
  const cell = (id, idColor, bg, val, valColor) => `<div class="cs-cell" style="background:${bg}"><b style="color:${idColor}">${id}</b><span style="color:${valColor}">${val}</span></div>`;
  F.clear = () => `<div class="clear-stages">
    <div class="cs">${cell(':1', 'var(--ma)', '#5a0f0f', '50.0', '#fff')}<p><b>Kijelölve + aktív</b>Sárga ID, piros háttér. Új értéket kaphat, a Store elmenti.</p></div>
    <div class="cs-arrow"><kbd class="k">Clear</kbd></div>
    <div class="cs">${cell(':1', '#e5e5ea', '#5a0f0f', '50.0', '#fff')}<p><b>Nincs kijelölve</b>A piros háttér marad: a Store még elmenti.</p></div>
    <div class="cs-arrow"><kbd class="k">Clear</kbd></div>
    <div class="cs">${cell(':1', '#e5e5ea', '#141a3a', '50.0', '#ff453a')}<p><b>Inaktív</b>Piros szöveg: világít, de a Store <u>nem</u> menti.</p></div>
    <div class="cs-arrow"><kbd class="k">Clear</kbd></div>
    <div class="cs">${cell(':1', '#e5e5ea', '#141a3a', 'closed', '#86868b')}<p><b>Üres programmer</b>Minden visszaállt.</p></div>
  </div>`;

  /* ---------- DMX address ---------- */
  F.dmx = () => `<svg viewBox="0 0 720 250" role="img" aria-label="DMX cím felépítése: univerzum pont cím">
    <text x="360" y="70" text-anchor="middle" font-size="60" font-weight="800" fill="#f5f5f7" font-family="JetBrains Mono, monospace">1<tspan fill="#6e6e73">.</tspan><tspan fill="var(--ma)">001</tspan></text>
    <path d="M300 84v26h-70" stroke="#a1a1a6" stroke-width="1.5" fill="none"/>
    <text x="222" y="114" text-anchor="end" font-size="14" fill="#f5f5f7">Universe (univerzum) 1</text>
    <path d="M410 84v26h70" stroke="var(--ma)" stroke-width="1.5" fill="none"/>
    <text x="488" y="114" font-size="14" fill="var(--ma)">Cím (address) 1</text>
    <text x="20" y="160" font-size="12" fill="#86868b">Universe 1 · 512 cím</text>
    <rect x="20" y="170" width="680" height="22" rx="5" fill="#141416" stroke="#3a3a3c"/>
    <rect x="20" y="170" width="53" height="22" rx="5" fill="var(--warm)"/>
    <text x="80" y="186" font-size="11" fill="#a1a1a6">← Dim 1–40 = 1.001–1.040</text>
    <text x="20" y="218" font-size="12" fill="#86868b">Universe 2</text>
    <rect x="20" y="226" width="680" height="18" rx="5" fill="#141416" stroke="#3a3a3c"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${20 + i * 41.2}" y="226" width="39" height="18" rx="4" fill="#2c2c2e" stroke="var(--ma)"/>`).join('')}
    <text x="400" y="240" font-size="11" fill="#a1a1a6">← 9 × Mac 700 (31 cím) = 2.001, 2.032, 2.063…</text>
  </svg>`;

  /* ---------- Preset types ---------- */
  F.presetTypes = () => `<div class="pt-grid">${['All', 'Dimmer', 'Position', 'Gobo', 'Color', 'Beam', 'Focus', 'Control', 'Shapers', 'Video']
    .map((t, i) => `<div class="pt"><b>${i}</b><span>${t}</span></div>`).join('')}</div>`;

  /* ---------- Executor layout (lesson 14) ---------- */
  F.exec = () => `<div class="exec-grid">
    <div class="eb">Off</div><div class="eb new">Rate1</div>
    <div class="eb">&lt;&lt;&lt;</div><div class="eb">&gt;&gt;&gt;</div>
    <div class="ef"><span>Mstr</span></div><div class="ef"><span class="new">Rate</span></div>
    <div class="eb">GoBack</div><div class="eb">Go</div></div>`;
})();
