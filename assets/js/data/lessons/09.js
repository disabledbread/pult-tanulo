MA.lesson({
  id: '09', part: 'ml', title: 'Moving lightok hozzáadása', en: 'Add Moving Lights', min: 20,
  lead: '9 db Martin Mac 700 Profile kerül a fénytervbe. Behozod a típust a könyvtárból, és a terv szerint számozod őket.',
  learn: ['Show mentése új néven', 'Új réteg a patch-ben', 'Lámpatípus importálása a könyvtárból', 'ID-k átírása a táblázatban'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az a moving light?', text: ['A **((Moving light))** (mozgófej) motorral forog (**Pan** = vízszintes, **Tilt** = függőleges), és színt, gobót (mintát), fókuszt, zoomot is tud váltani. Ezért egy lámpa sok DMX címet használ: a Mac 700 extended módban **31-et**.'] },
    { t: 'plot', movers: true, caption: 'Az új fényterv: a Mac 700-asok az LX1, LX2 és LX4 húzókon, a számuk a sor szerint: 111–113, 121–123, 131–133.' },
    { t: 'step', title: 'Mentsd új néven', keys: 'Backup', text: '{{Internal}} fül → {{Save Show as}} → név: `quick start guide 2` (a neveddel az elején). Zárd be a sárga X-szel.' },
    { t: 'step', title: 'Patch megnyitása', keys: 'Setup', text: '{{Show}} oszlop → {{Patch & Fixture Schedule}}.' },
    { t: 'step', title: 'Új réteg: Mac700', text: 'Bal oldalt a rétegeknél nyomd meg az {{Add Layer}} gombot (konzolon X1). Név: `Mac700`, Enter.', see: 'Rögtön megnyílik a Fixture Wizard.' },
    { t: 'step', title: 'Típus a könyvtárból', text: 'A Mac 700 még nincs a showban. Kattints a {{From Library}}-re. Szűrj: **Manufacturer** = `Martin`, **Fixture** = `700`.', shot: 'ch09-library' },
    { t: 'step', title: 'Mac 700 Profile, Extended', text: 'Kattints a **Mac 700 Profile / Extended** sorra (kék lesz), majd {{Import}}.', see: 'Lent látod a lámpa csatornáit: Shutter, Dim, ColorRGB…, Pan, Tilt…' },
    { t: 'step', title: 'Töltsd ki a varázslót', text: 'Quantity: `9`. Fixture ID: `111`. Channel ID: `111`. Patch Break 1: `2.001` (2-es universe, 1-es cím). Majd {{Apply}}.', shot: 'ch09-wizard' },
    { t: 'step', title: 'Számozd a terv szerint', text: 'A pult 111–119-ig számozott. Írd át a **FixID** és **ChaID** cellákat: kattints a 4. sor cellájára, gépeld `121`, Enter — a kurzor magától lép a következő sorra. Így tovább: 122, 123, 131, 132, 133.', shot: 'ch09-fixture-list', see: 'FixID és ChaID: 111, 112, 113, 121, 122, 123, 131, 132, 133. Patch: 2.001, 2.032, 2.063 … 2.249.' },
    { t: 'step', title: 'Kilépés, mentés', text: 'Sárga X → „Save changes?” → {{Yes}}. A Setup menüt is zárd be.', see: 'Fent a Preset Type sávban megjelent: Position, Gobo, Color, Beam, Focus, Control.' },
    { t: 'tip', kind: 'info', title: 'Miért 2.032 a második lámpa?', text: 'Mert egy Mac 700 extended módban 31 címet foglal: 2.001–2.031. A következő a 2.032-n kezdődik. A pult ezt magától kiszámolja.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A valódi lámpán a DMX címet a lámpa kijelzőjén kell beállítani, és ugyanannak kell lennie, mint a patch-ben. Ha egy lámpa „nem reagál”, először ezt nézd meg.' },
    { t: 'checkpoint', items: ['Új rétegben 9 Mac 700 Profile Extended.', 'ID-k: 111–113, 121–123, 131–133.', 'A show „quick start guide 2” néven mentve.'] },
    { t: 'quiz', items: [
      { q: 'Hány DMX címet használ egy Mac 700 Profile extended módban?', a: ['1', '16', '31'], ok: 2, why: 'Ezért lesz a második lámpa címe 2.032.' },
      { q: 'Honnan hozod be az új lámpatípust?', a: ['From Library — a beépített könyvtárból', 'Az internetről', 'Csak USB-ről'], ok: 0, why: 'A Fixture Wizardban a From Library gombbal érsz el több ezer típust.' }
    ] }
  ]
});
