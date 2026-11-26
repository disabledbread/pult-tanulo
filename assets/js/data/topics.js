/* Témakörök — gyors receptek azoknak, akik elfelejtettek valamit */
(function () {
  const MA = window.MA;
  const t = (id, icon, title, en, desc, recipe, links, kw = '') => MA.topics.push({ id, icon, title, en, desc, recipe, links, kw });

  t('show', 'file', 'Showfájl: új, mentés, betöltés', 'Backup · New Show · Save', 'Minden munka egy showfájlban él. Rendszeresen mentsd!', [
    '[[Backup]] → {{Internal}} fül.',
    'Új show: {{New Show}} → név → {{Check All}} → {{Please}}.',
    'Mentés másik néven: {{Save Show as}}. Betöltés: {{Load Show}}.',
    'Gyors mentés ugyanazzal a névvel: [[Backup]] kétszer gyorsan.'
  ], [['01'], ['08']], 'backup save load mentés betöltés új show newshow');

  t('patch', 'plug', 'Lámpák patchelése', 'Patch & Fixture Schedule', 'Megmondod a pultnak, milyen lámpa melyik DMX címen van.', [
    '[[Setup]] → {{Patch & Fixture Schedule}} (billentyű: **F12**).',
    'Új réteg: {{Add Layer}} → név. Típus: {{Please select fixturetype}} (új típus: {{From Library}} → szűrés → {{Import}}).',
    'Quantity, Fixture ID / Channel ID, **Patch Break 1** (pl. `1.001`) → {{Apply}}.',
    'Sárga X → „Save changes?” → {{Yes}}.'
  ], [['02'], ['09']], 'patch dmx cím fixture wizard library import layer');

  t('window', 'grid', 'Ablak és view létrehozása', 'Create Basic Window · View', 'Saját munkaterület, egy gombnyomással visszahívható.', [
    'Kattints egy üres terület bal felső sarkába → **Create Basic Window**.',
    'Fül + ablak: pl. {{Sheets}} → {{Channel}}, {{Pools}} → {{Groups}}.',
    'Méretezés: jobb alsó sarok (sárga pöttyök). Mozgatás: címsor.',
    'Mentés: [[Store]] + view gomb → {{Please}}. Név: [[Assign Assign]] + view gomb.'
  ], [['03'], ['10']], 'window ablak view sheet pool screen create basic window');

  t('channels', 'sliders', 'Lámpák fel- és lekapcsolása', 'At · Thru · Clear', 'Kijelölés és érték megadása.', [
    '[[1 Thru 1 0 + 2 0 At 5 0 Please]] — billentyűvel: 1 **Num /** 10 **+** 20 **A** 50 **Enter**.',
    'Teljes fény: [[At At]]. Nulla: [[. .]]. Relatív: [[At + 1 0 Please]].',
    'Egy csatorna kivétele a programmerből: [[Off Channel 5 Please]].',
    'Programmer törlése: [[Clear]] háromszor vagy hosszan.'
  ], [['04']], 'at thru clear full off channel érték fényerő programmer');

  t('group', 'layers', 'Group készítése', 'Store Group · Label', 'Lámpakijelölés elmentése egy gombra.', [
    'Jelöld ki a lámpákat: [[5 + 7 + 9 Please]] — vagy kattints a lámpákra a Channel Sheetben.',
    '[[Store]] + kattints egy üres gombra a Groups poolban.',
    'Rögtön gépeld be a nevet + Enter (vagy [[Assign Assign]] + gomb).',
    '[[Clear]] — és kész. Group groupokból is lehet: [[Group 1 Thru 5]].'
  ], [['05']], 'group csoport store label kijelölés pool');

  t('cue', 'play', 'Cue tárolása', 'Store Cue', 'Egy fényállapot mentése a sequence-be.', [
    'Kijelölt executor: [[Select Exec 1 Please]] (zöld névmező).',
    'Állítsd be a fényt, pl. [[Group 1 At 7 5 Please]].',
    '[[Store Please]] — a következő szabad cue számra ment. Adott számra: [[Store Cue 5 Please]].',
    'Név: [[Assign Assign Cue 1 Please]] vagy jobb klikk a Name cellára.'
  ], [['06'], ['07']], 'cue store sequence executor tárolás jelenet');

  t('time', 'clock', 'Időzítés (fade, delay)', 'Sequence sheet · Fade · Delay', 'Mennyi idő alatt és mikor induljon a cue.', [
    'Tárold a cue-t idő nélkül: [[Store Please]].',
    'Nyisd meg a **Sequence Executor Sheetet** (Create Basic Window → {{Sheets}} → {{Sequence Executor}}).',
    'Kattints a cue **Fade** cellájára, üsd be az időt (pl. 15), Enter. Ha nem ugrik fel az érték-ablak: jobb klikk a cellára.',
    '**Delay** = várakozás indulás előtt. **Out Fade** csak akkor kell, ha más, mint a Fade.'
  ], [['07', 'sec-az-idok-beirasa'], ['08']], 'time fade delay outfade idő időzítés sequence sheet');

  t('update', 'spark', 'Cue módosítása (Update)', 'Goto · Update', 'Egy meglévő cue javítása.', [
    'Menj a cue-ra: [[Goto 3 Please]], és várd meg, amíg beúszik.',
    'Állítsd át, amit kell, pl. [[Group 2 At + 5 Please]].',
    '[[Update]] → válaszd: {{Update Cue Only}} vagy Tracking → {{Update Cue}}.',
    'Kilépés: az executor {{Off}} gombja. Utána [[Clear]].'
  ], [['08']], 'update goto javítás módosítás cue only tracking');

  t('follow', 'list', 'Automatikus következő cue', 'Trig · Follow', 'A cue magától induljon az előző után.', [
    'Sequence Executor Sheet → jobb klikk a cue **Trig** cellájára.',
    'Válaszd: {{Follow}}.',
    'A cue mostantól az előző befejezése után magától indul.'
  ], [['08']], 'follow trig automatikus');

  t('fixtures', 'move', 'Moving light vezérlése', 'Preset Type · Encoder', 'Pozíció, gobó, szín beállítása.', [
    'Válaszd ki: [[Fixture 1 1 1 Please]] (billentyű: **F** 111 **Enter**).',
    'Fent a Preset Type sávban: {{Position}}, {{Gobo}}, {{Color}}…',
    'Encoder: egérrel húzd fel-le. Kattints rá: számot vagy gobó-képet választhatsz.',
    'Színhez: {{Special Dialog}} → Color Picker.'
  ], [['11'], ['10']], 'encoder pan tilt gobo color szín pozíció preset type moving');

  t('preset', 'palette', 'Preset készítése', 'Store Preset', 'Pozíció, szín, gobó elmentése újrahasznosításra.', [
    'Állítsd be a lámpákat (pl. színt).',
    '[[Store]] + kattints a megfelelő preset pool gombjára (pl. Color pool).',
    'Számmal: [[Store Preset 4 . 1 Please]] (4 = Color, 2 = Position, 3 = Gobo, 0 = All).',
    'Név: [[Assign Assign]] + preset gomb. G = global, S = selective.'
  ], [['13'], ['12']], 'preset store pool position color gobo global selective');

  t('sequence2', 'flag', 'Második sequence, executor', 'Store Exec · Assign', 'Új cue-lista másik executoron, linkeléssel.', [
    '[[Store Exec 3 Please]] — új sequence a 3-as executoron.',
    'Kiválasztás: [[Select]] + az executor gombja.',
    'Executor beállítások: kattints a zöld névmezőre (Assign Menu).',
    'Másik sequence indítása cue-ból: CMD oszlop: `Goto cue 1 exec 1.3`.'
  ], [['14']], 'executor sequence assign rate priority cmd link');

  t('clear', 'trash', 'Programmer ürítése, hibák', 'Clear · Oops · Esc', 'Ha valami „beragadt” vagy elrontottad.', [
    '[[Clear]] hosszan nyomva (vagy 3×) = üres programmer. A parancssorban: `ClearAll`.',
    '[[Oops]] = az utolsó lépés visszavonása.',
    '[[Esc]] = a félbehagyott parancs törlése a parancssorból.',
    'Ha véletlenül felugrik egy érték-ablak (kalkulátor): zárd be a sárga X-szel.'
  ], [['04'], ['00']], 'clear oops esc hiba visszavonás');

  t('effect', 'spark', 'Effekt készítése és leállítása', 'Effect Editor · Stomp', 'Futófény, kör, színváltás — és a leállítás a következő cue-ban.', [
    'Előbb **jelöld ki a lámpákat**.',
    'Effects pool → jobb klikk egy üres gombra → **Effect Editor**.',
    '{{Add}} → attribútum ({{Dim}}, {{Position}}, {{MixColor}}) → {{Confirm}}.',
    'Form cella jobb klikk: {{Chase 5}} = futófény; Pan {{Sin 8}} + Tilt {{Cos 9}} = kör.',
    'Tárolás cue-ba: lámpák kijelölve, effekt gombja, [[Store Exec 4 Please]].',
    'Leállítás a következő cue-ban: lámpák kijelölve → [[MA At Please]] (Stomp) → Store.'
  ], [['15']], 'effekt effect chase kör circle szín stomp leállítás');

  t('offset', 'move', 'Pan/Tilt offset lámpacsere után', 'Patch · Pan Offset · Tilt Offset', 'Az új lámpa kicsit máshová néz — javítsd egyszerre minden pozíción.', [
    '[[Setup]] → {{Patch & Fixture Schedule}} → a lámpa rétege.',
    'Görgess jobbra a **Pan Offset** / **Tilt Offset** oszlopig.',
    'Kattints a lámpa cellájára, írd be az eltolást (pl. `5` vagy `-5`), Enter.',
    'Zárd be a patch-et → {{Yes}}. Ha visszajön a régi lámpa: offset `0`.'
  ], [['16']], 'offset pan tilt lámpacsere eltolás patch');

  t('switch', 'plug', 'Direkt kapcsoló (non-dim)', 'DMX Profile · Fixture Type', '50% alatt 0, fölötte 100 — ki-be kapcsolható eszközökhöz.', [
    'Patch → {{DMX Profiles}} → {{Add}} → {{Edit}} → {{Table Mode}}.',
    'Pontok: (0, 0) {{Step (End)}} · (128, 255) · (255, 255). {{Label}}: `Direkt kapcsolo`.',
    '{{Fixture Types}} → {{Add}} → {{Edit}} → {{Add}} {{Dim}}, Coarse `1`, **Profile**: Direkt kapcsolo.',
    'Patch: {{Add Layer}} → a Direkt kapcsolo típus → szabad csatorna és DMX cím → {{Apply}} → mentés.',
    'Próba a DMX sheetben: 40% → 0, 60% → 100.'
  ], [['17']], 'direkt kapcsoló non dim nondim switch dmx profile fixture type relé');

  /* Bonus modules (planned) */
  MA.bonus = [
    { id: 'B1', title: 'Executorok és page-ek', en: 'Executors & Pages' },
    { id: 'B3', title: 'Layout View és MAtricks', en: 'Layout View & MAtricks' },
    { id: 'B4', title: 'Záró projekt: saját show', en: 'Final project' }
  ];
})();
