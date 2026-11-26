MA.lesson({
  id: '16', part: 'extra', title: 'Pan/Tilt offset lámpacsere után', en: 'Pan / Tilt Offset', min: 15,
  lead: 'Lámpacsere után az új mozgófej kicsit máshová néz. Nem kell minden presetet és cue-t újraírni: a patch-ben egy offsettel az összes pozíciót egyszerre javítod.',
  learn: ['Mi az offset és mikor kell', 'Mennyi offset kell? — megmérés presettel', 'Pan Offset és Tilt Offset a patch-ben', 'Offset visszaállítása 0-ra'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Miért áll máshol az új lámpa?', text: ['Ha egy mozgófejet kicserélnek (javításra viszik, és egy másikat kapsz helyette), az új lámpát sosem pontosan ugyanúgy szerelik fel. Pár fokkal elfordulhat — és **minden pozíció** egy kicsit mellé megy.', 'Ilyenkor nem a presetekhez nyúlunk. A patch-ben az adott lámpa kap egy **Pan Offset** és/vagy **Tilt Offset** értéket: a pult ennyivel eltolja a lámpa kimenetét. Így minden preset és cue egyszerre javul, a show többi része érintetlen marad.'] },
    { t: 'tip', kind: 'onpc', title: 'onPC-n csak gyakorlás', text: 'onPC-n nincs igazi lámpa, ezért itt a lépéseket gyakoroljuk: a **111-es** Mac 700 kap egy kis offsetet, a végén visszaállítjuk 0-ra.' },
    { t: 'h', text: 'Mennyi offset kell?' },
    { t: 'p', text: 'A színpadon így méred meg: kell egy pozíció, ahol pontosan tudod, hová kell világítania a lámpának (pl. egy preset a színpad közepére).' },
    { t: 'list', items: ['Jelöld ki **csak a cserélt lámpát**, és hívd be a pozíció presetet.', 'A **Pan** és **Tilt** encoderrel told pontosan a helyére. Figyeld, mennyit mozdítottál (pl. Pan 0 → 5).', 'Ez a különbség lesz az offset. Utána **Clear** — ezt a programmerből ne tárold sehova!'] },
    { t: 'h', text: 'Offset beírása a patch-ben' },
    { t: 'step', title: 'Nyisd meg a patch-et', keys: 'Setup', text: 'Kattints a **Setup** gombra, majd a {{Patch & Fixture Schedule}} gombra.', mini: 'Billentyűvel: **F12** = Setup.' },
    { t: 'step', title: 'Válaszd a Mac700 réteget', text: 'Bal oldalt a rétegek közül kattints a **Mac700**-ra. Jobb oldalt megjelennek a mozgófejek (111–133).' },
    { t: 'step', title: 'Görgess az offset oszlopokig', text: 'A jobb oldali táblázatot görgesd jobbra (alul a **>** nyíllal), amíg meg nem látod a **Pan Offset** és **Tilt Offset** oszlopokat.', shot: 'off-columns', see: 'Oszlopok: Pan Enc. Invert, Tilt Enc. Invert, **Pan Offset**, **Tilt Offset**, Swap… Minden offset 0.00.' },
    { t: 'step', title: 'Írd be az értéket', text: 'Kattints a **111-es** sor **Pan Offset** cellájára, és üsd be: `5`, majd Enter (vagy {{Please}}). Ha rossz irányba ment volna, írd negatívval: `-5`.', shot: 'off-calculator', see: 'A 111-es Pan Offset cellájában **5.00** áll.', mini: 'Ha nem ugrik fel a számbeíró ablak, kattints a cellára jobb gombbal.' },
    { t: 'step', title: 'Mentés', text: 'Zárd be a patch-et a sárga X-szel. A kérdésre („Save changes?”) kattints a {{Yes}} gombra, majd a Setup menüt is zárd be.' },
    { t: 'tip', kind: 'info', title: 'Ne nyúlj a többi oszlophoz', text: 'A **Pan / Tilt Enc. Invert** csak az encoder forgásirányát fordítja meg, a **Swap** felcseréli a Pant és a Tiltet. Offsethez ezekre nincs szükség.' },
    { t: 'h', text: 'Visszaállítás' },
    { t: 'step', title: 'Offset vissza 0-ra', keys: 'Setup', text: 'Ha visszajön az eredeti lámpa, az offsetet törölni kell: ugyanitt írd be a cellába: `0`, Enter, majd zárd be a patch-et és mentsd ({{Yes}}). Most gyakorlásként csináld meg a 111-essel.', see: 'Minden offset újra 0.00.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A patch-et a valódi pulton **csak engedéllyel** módosítsd. Az offsetet írd fel (melyik lámpa, mennyi) — ha visszajön a régi lámpa, ne felejtsd el visszaállítani 0-ra, különben az lesz elcsúszva.' },
    { t: 'checkpoint', items: ['Megtalálod a Pan Offset / Tilt Offset oszlopokat a Mac700 rétegben.', 'Be tudsz írni egy offsetet, és el tudod menteni a patch-et.', 'A gyakorlás végén minden offset 0.00.'] },
    { t: 'quiz', items: [
      { q: 'Lámpacsere után minden pozíció kicsit mellé megy. Mit csinálsz?', a: ['A patch-ben Pan/Tilt Offsetet adok a lámpának', 'Minden presetet újratárolok', 'Újrapatchelem a lámpát'], ok: 0, why: 'Az offset egyszerre javítja az összes presetet és cue-t, a show többi része érintetlen marad.' },
      { q: 'Hol van a Pan Offset?', a: ['Setup → Patch & Fixture Schedule, a lámpa sorában', 'A Preset poolban', 'Az Effect Editorban'], ok: 0, why: 'Az offset a patch (fixture schedule) egyik oszlopa.' },
      { q: 'Visszajött az eredeti lámpa. Mi a teendő?', a: ['Az offsetet visszaírom 0-ra', 'Semmi', 'Törlöm a lámpát'], ok: 0, why: 'Az offset a lámpához tartozik a patch-ben; ha nem állítod vissza, az eredeti lámpa fog mellémenni.' }
    ] }
  ]
});
