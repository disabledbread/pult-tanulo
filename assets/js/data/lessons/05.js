MA.lesson({
  id: '05', part: 'prog', title: 'Groupok (csoportok)', en: 'Working with Groups', min: 20,
  lead: 'Lámpacsoportokat mentesz el, hogy később egy gombbal kijelölhesd őket. 12 csoportot csinálsz a fényterv alapján.',
  learn: ['Groups pool ablak létrehozása', 'Group tárolása és elnevezése', 'A fényterv csoportjai', 'Okos trükk: groupból group'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az a group?', text: ['A **((Group))** egy elmentett **kijelölés**: „ezek a lámpák”. **Nincs benne érték** — csak az, hogy melyik lámpák, és milyen sorrendben.', 'A programozás nagy része groupokkal megy: „az elöl lévő melegek 70%-on”. Ezért ezt csináld meg rendesen.'] },
    { t: 'step', title: 'Csinálj helyet', text: 'A Screen 2-n a Channel Sheet **jobb alsó sarkát** húzd feljebb, hogy alatta üres hely legyen.' },
    { t: 'step', title: 'Groups pool', text: 'Kattints az üres hely bal felső részére → {{Pools}} fül → {{Groups}}.', shot: 'ch05-pools-tab', see: 'Üres, számozott group gombok.' },
    { t: 'tip', kind: 'info', title: 'Mentsd újra a view-t', text: 'Az új elrendezést a [[Store]] + 1.1 view gombbal elmentheted (a pult rákérdez, felülírja-e), vagy tedd egy új view gombra.' },
    { t: 'h', text: 'Az első group' },
    { t: 'step', title: 'Jelöld ki az elöl lévő meleg lámpákat', keys: '5 + 7 + 9 + 1 1 Please', text: 'Ezek a FOH meleg lámpái.', cmd: 'ch 5 + 7 + 9 + 11', see: 'Az 5, 7, 9, 11 ID-ja sárga.' },
    { t: 'step', title: 'Tárold', keys: 'Store', text: 'Nyomd meg a **Store**-t, majd kattints az első üres group gombra.', cmd: 'store group 1', see: 'Az 1-es gombon „Group 1”.' },
    { t: 'step', title: 'Nevezd el', text: 'Rögtön gépeld be a billentyűzeten: `FOH Warm`, Enter — a pult a legutóbb érintett elemnek adja a nevet. Ha közben máshova kattintottál: [[Assign Assign]] + a group gomb, és írd be a nevet.', cmd: 'label group 1 "FOH Warm"' },
    { t: 'step', title: 'Kijelölés törlése', keys: 'Clear', text: 'Egy Clear elég: a kijelölés megszűnik.' },
    { t: 'h', text: 'A többi 11 group' },
    { t: 'p', text: 'Most már mindent tudsz. Csináld meg a táblázat szerint. Kattints egy group nevére a fényterv alatt — megmutatja, melyik lámpák tartoznak bele.' },
    { t: 'plot', groups: true },
    { t: 'table', head: ['Group', 'Csatornák', 'Név'], rows: [
      ['1', '5 + 7 + 9 + 11', 'FOH Warm'], ['2', '17 + 19 + 21 + 23', 'LX1 Warm'], ['3', '25 + 27 + 29 + 31', 'LX2 Warm'],
      ['4', '33 + 35 + 37 + 39', 'LX4 Warm'], ['5', '1 + 3 + 13 + 15', 'Box Warm'], ['6', 'az összes páratlan', 'All Warm'],
      ['7', '6 + 8 + 10 + 12', 'FOH Cold'], ['8', '18 + 20 + 22 + 24', 'LX1 Cold'], ['9', '26 + 28 + 30 + 32', 'LX2 Cold'],
      ['10', '34 + 36 + 38 + 40', 'LX4 Cold'], ['11', '2 + 4 + 14 + 16', 'Box Cold'], ['12', 'az összes páros', 'All Cold']
    ] },
    { t: 'tip', kind: 'onpc', title: 'Trükk a 6-os és 12-es grouphoz', text: 'Nem kell 20 számot beütnöd! Az 1–5 group együtt pont az összes páratlan csatorna: [[Group 1 Thru 5 Please]], majd Store a 6-os gombra. A hidegek ugyanígy: [[Group 7 Thru 1 1 Please]] → Store a 12-esre. Billentyűvel: **G** 1 **Num /** 5 **Enter**.' },
    { t: 'step', id: 'all', title: 'Kész mind a 12', text: 'Hozd létre a 2–12. groupot a táblázat alapján, mindegyik után egy Clear.', shot: 'ch05-group-pool', see: 'A pool így néz ki: FOH Warm … All Cold, 12 gomb.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Az előadás showjában a groupok már készen vannak. Mielőtt bármit programozol, nézd meg a Groups poolt: így gyorsan látod, mi hol van.' },
    { t: 'checkpoint', items: ['12 group, a táblázat szerinti nevekkel.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Tartalmaz-e értéket (pl. 50%) egy group?', a: ['Igen, mindig', 'Nem, csak a lámpák listáját (és sorrendjét)', 'Csak ha Store-ral mentem'], ok: 1, why: 'A group csak kijelölés. Az értékek cue-ba vagy presetbe kerülnek.' },
      { q: 'Hogyan adsz a leggyorsabban nevet egy épp tárolt groupnak?', a: ['Rögtön begépeled a nevet a billentyűzeten', 'Újraindítod a pultot', 'A Setup menüben'], ok: 0, why: 'Store után rögtön gépelve a pult a legutóbb érintett elemnek adja a nevet. Különben Assign Assign + gomb.' }
    ] }
  ]
});
