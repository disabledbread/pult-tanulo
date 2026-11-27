MA.lesson({
  id: '18', part: 'extra', title: 'Toggle gomb készítése', en: 'Executor button: Toggle', min: 15,
  lead: 'Egy gomb, ami egyszer megnyomva bekapcsol, másodszor kikapcsol. Megcsinálod a „DIM” gombot: egy nyomásra az összes dimmer felgyullad, újabb nyomásra elalszik.',
  learn: ['Mit tud egy executor gomb (Go, Toggle, Flash)', 'Fényállapot tárolása gombra', 'Gomb funkció átállítása az Assign menüben', 'Gomb elnevezése'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mire jó a Toggle?', text: ['Az executor gombja alapból **Go**: elindítja a következő cue-t. Át lehet állítani mást csinálni.', 'A **Toggle** be-ki kapcsoló: egy nyomás = be, még egy = ki. Ideális mindenre, amit gyorsan fel-le kapcsolsz: **DIM** teszt, **munkafény**, ügyelő fény.'] },
    { t: 'table', head: ['Funkció', 'Mit csinál a gomb'], rows: [['Go', 'A következő cue (alapértelmezés)'], ['Toggle', 'Egy nyomás be, még egy ki'], ['Flash', 'Csak amíg nyomva tartod'], ['Off', 'Kikapcsolja az executort']] },
    { t: 'h', text: 'A DIM gomb' },
    { t: 'step', title: 'Minden dimmer 100%-on', keys: '1 Thru 4 0 At 1 0 0 Please', text: 'Az összes dimmer (1–40) teljes fényen.', cmd: 'Channel 1 Thru 40 At 100' },
    { t: 'step', title: 'Tárold egy gombra', keys: 'Store', text: 'Nyomd meg a **Store**-t, majd kattints egy üres gombra a **201–220** gombsorban (pl. a 201-esre). A pulton/wingen: Store, majd a gomb.', see: 'A 201-esen: **Sequ**, **1 Cue**, alatta a gomb felirata: **Go**.' },
    { t: 'step', title: 'Takaríts', keys: 'Clear', text: 'Tartsd nyomva a Clear-t (vagy nyomd meg háromszor).', fb: 'Executing : ClearAll' },
    { t: 'step', title: 'Assign menü', keys: 'Assign', text: 'Nyomd meg az {{Assign}} gombot, majd kattints a 201-es gombra. Megnyílik az **Assign Sequ 1.201** menü.', see: 'Bal oldalt egy gomb-mező: **Go**.' },
    { t: 'step', title: 'Funkció: Toggle', text: 'Kattints a bal oldali **Go** mezőre. A **Select Function** listából válaszd: {{Toggle}}.', shot: 'tg-select-function', see: 'A mezőben most **Toggle** áll.' },
    { t: 'step', title: 'Nevezd el: DIM', text: 'Jobb oldalt kattints a {{Label}} gombra, írd be: `DIM`, Enter. Zárd be a menüt (sárga X).', see: 'A 201-es gombon: **DIM**, alul: **Toggle**.' },
    { t: 'step', title: 'Próbáld ki', text: 'Nyomd meg a 201-es gombot: minden dimmer 100%. Nyomd meg még egyszer: mind kialszik.', shot: 'tg-on', see: 'Bekapcsolva a gomb kék, a DMX-ben 100-ak.' },
    { t: 'tip', kind: 'info', title: 'Ugyanígy: munkafény', text: 'Munkafényhez tárold a washeket 100%-on, fehéren egy másik gombra, és azt is állítsd Toggle-re. Ha szabályozni is akarod (pl. nézőtéri fény), azt **faderre** tedd, ne gombra.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A Toggle gombok mindig legyenek elnevezve (DIM, Munkafény, NT…), és ne a cue-lista executorán legyenek — különben véletlenül elindíthatod vele a következő jelet.' },
    { t: 'checkpoint', items: ['A 201-es gomb neve DIM, a funkciója Toggle.', 'Egy nyomás: minden dimmer 100%; még egy: ki.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Mit csinál a Toggle gomb?', a: ['Egy nyomás be, még egy ki', 'Csak amíg nyomod, addig világít', 'A következő cue-t indítja'], ok: 0, why: 'Ez a be-ki kapcsoló. A „csak amíg nyomod” a Flash, a következő cue a Go.' },
      { q: 'Hol állítod át a gomb funkcióját?', a: ['Assign + a gomb → a gomb-mező → Select Function', 'Setup → Patch', 'Az Effect Editorban'], ok: 0, why: 'Az Assign menüben minden executor-gombnak kiválaszthatod a funkcióját.' }
    ] }
  ]
});
