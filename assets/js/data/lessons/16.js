MA.lesson({
  id: '16', part: 'extra', title: 'Pan/Tilt offset lámpacsere után', en: 'Pan / Tilt Offset', min: 10,
  lead: 'Lámpacsere után az új mozgófej kicsit máshová néz. Nem kell minden presetet és cue-t újraírni: a lámpának adsz egy offsetet, és az összes pozíció egyszerre javul. A leggyorsabb út: a layoutban, a lámpán.',
  learn: ['Mi az offset és mikor kell', 'Mennyi offset kell? — megmérés presettel', 'Offset beírása a layoutból (jobb klikk / hosszú nyomás)', 'Offset visszaállítása 0-ra'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Miért áll máshol az új lámpa?', text: ['Ha egy mozgófejet kicserélnek (javításra viszik, és egy másikat kapsz helyette), az új lámpát sosem pontosan ugyanúgy szerelik fel. Pár fokkal elfordulhat — és **minden pozíció** egy kicsit mellé megy.', 'Ilyenkor nem a presetekhez nyúlunk. A lámpa kap egy **Pan Offset** és/vagy **Tilt Offset** értéket: a pult ennyivel eltolja a kimenetét. Így minden preset és cue egyszerre javul, a show többi része érintetlen marad.'] },
    { t: 'tip', kind: 'onpc', title: 'onPC-n csak gyakorlás', text: 'onPC-n nincs igazi lámpa, ezért a lépéseket gyakoroljuk: a **111-es** Mac 700 kap egy kis offsetet, a végén visszaállítjuk 0-ra. Kell hozzá egy layout a mozgófejekkel — ha még nincs, a 19. leckében megcsinálod (vagy használd a lenti patch-es utat).' },
    { t: 'h', text: 'Mennyi offset kell?' },
    { t: 'p', text: 'A színpadon így méred meg: kell egy pozíció, ahol pontosan tudod, hová kell világítania a lámpának (pl. egy preset a színpad közepére).' },
    { t: 'list', items: ['Jelöld ki **csak a cserélt lámpát**, és hívd be a pozíció presetet.', 'A **Pan** és **Tilt** encoderrel told pontosan a helyére. Figyeld, mennyit mozdítottál (pl. Tilt 0 → −2.5).', 'Ez a különbség lesz az offset. Utána **Clear** — ezt a programmerből ne tárold sehova!'] },
    { t: 'h', text: 'Offset a layoutból' },
    { t: 'step', title: 'Nyisd meg a layoutot', text: 'Nyisd meg azt a layoutot, amiben a mozgófejek vannak (pl. „Mozgofejek”).', see: 'A Mac 700-asok négyzetei: 111, 112, 113…' },
    { t: 'step', title: 'Jobb klikk a lámpára', text: 'onPC-n **jobb klikk** a 111-es lámpára (a pulton: **nyomd hosszan**). Megnyílik a lámpa szerkesztő ablaka: **Edit … „Mac700PE 1 111”**.', see: 'Fent egy sor: FixID, ChaID, Patch, …, **Pan Offset**, **Tilt Offset**. Ha nem látszik, húzd jobbra az alatta lévő görgetősávot.' },
    { t: 'step', title: 'Írd be az offsetet', text: 'Kattints a **Tilt Offset** (vagy **Pan Offset**) cellára, üsd be pl.: `-2.5`, Enter. Rossz irány? Írd ellenkező előjellel.', shot: 'off-layout-edit', see: 'A cellában: **-2.50**.' },
    { t: 'step', title: 'Kész', text: 'Zárd be az ablakot (sárga X). Nem kérdez mentést: az offset azonnal él — a lámpa minden pozíciója eltolódik.', mini: 'A {{Previous}} / {{Next}} gombbal az ablakon belül a többi lámpára is átléphetsz.' },
    { t: 'h', text: 'Visszaállítás' },
    { t: 'step', title: 'Offset vissza 0-ra', text: 'Ha visszajön az eredeti lámpa, ugyanígy: jobb klikk a lámpára → az offset cellába `0`, Enter. Most gyakorlásként csináld meg a 111-essel.', see: 'Pan Offset és Tilt Offset: 0.00.' },
    { t: 'tip', kind: 'info', title: 'Másik út: a patch-ben', text: 'Ugyanezek az oszlopok megvannak a patch-ben is: [[Setup]] → {{Patch & Fixture Schedule}} → a lámpa rétege (pl. Mac700) → görgess jobbra a **Pan Offset / Tilt Offset** oszlopig. Kilépéskor a mentésre {{Yes}}. Ez akkor jó, ha egyszerre sok lámpán kell átnézni.' },
    { t: 'tip', kind: 'info', title: 'Ne nyúlj a többi mezőhöz', text: 'A **Pan / Tilt Enc. Invert** csak az encoder forgásirányát fordítja meg, a **Swap** felcseréli a Pant és a Tiltet. Offsethez ezekre nincs szükség.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Az offsetet írd fel (melyik lámpa, mennyi). Ha visszajön a régi lámpa, ne felejtsd el visszaállítani 0-ra, különben az lesz elcsúszva.' },
    { t: 'checkpoint', items: ['A layoutban jobb klikkel (pulton hosszú nyomással) megnyitod a lámpa ablakát.', 'Be tudsz írni egy Tilt / Pan Offsetet.', 'A gyakorlás végén minden offset 0.00.'] },
    { t: 'quiz', items: [
      { q: 'Lámpacsere után minden pozíció kicsit mellé megy. Mit csinálsz?', a: ['Pan/Tilt Offsetet adok a lámpának', 'Minden presetet újratárolok', 'Újrapatchelem a lámpát'], ok: 0, why: 'Az offset egyszerre javítja az összes presetet és cue-t, a show többi része érintetlen marad.' },
      { q: 'Mi a leggyorsabb út az offsethez?', a: ['Layout → jobb klikk (pulton hosszú nyomás) a lámpára → Tilt/Pan Offset', 'Az Effect Editor', 'Új preset tárolása'], ok: 0, why: 'A lámpa ablakában rögtön ott van a Pan és Tilt Offset mező.' },
      { q: 'Visszajött az eredeti lámpa. Mi a teendő?', a: ['Az offsetet visszaírom 0-ra', 'Semmi', 'Törlöm a lámpát'], ok: 0, why: 'Az offset a lámpához tartozik; ha nem állítod vissza, az eredeti lámpa fog mellémenni.' }
    ] }
  ]
});
