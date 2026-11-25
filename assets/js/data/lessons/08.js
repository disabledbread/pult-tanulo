MA.lesson({
  id: '08', part: 'prog', title: 'Sequence szerkesztése', en: 'Edit a Sequence', min: 20,
  lead: 'Javítasz a cue-listán: automatikus folytatás, nevek, egy cue frissítése és az idők átírása.',
  learn: ['Follow trigger', 'Cue frissítése (Update)', 'Cue Only vs. Tracking', 'Idők szerkesztése a táblázatban', 'Gyors mentés'],
  blocks: [
    { t: 'h', text: 'Follow: magától induló cue' },
    { t: 'step', title: 'Cue 3 legyen Follow', text: 'A Sequence Executor Sheetben **jobb klikk** a 3-as cue **Trig** cellájára (ahol „Go” áll). A választékból kattints a {{Follow}}-ra.', shot: 'ch08-select-trig', see: 'A 3-as cue Trig oszlopában „Follow”. Mostantól a cue 2 befejezése után magától indul.' },
    { t: 'h', text: 'Nevek' },
    { t: 'step', title: 'Nevezd át a cue-kat', text: 'Jobb klikk a Name cellákra (vagy [[Assign Assign Cue 2 Please]]), és add meg a neveket:', see: 'Mind a 6 cue-nak neve van.' },
    { t: 'table', head: ['Cue', 'Név'], rows: [['1', 'Behind Curtain'], ['2', 'With Curtain Up'], ['3', 'Build'], ['4', 'Darker'], ['5', 'Cold'], ['6', 'B.O.']] },
    { t: 'h', text: 'Egy cue frissítése' },
    { t: 'concept', tag: 'Alapfogalom', title: 'Tracking — miért fontos?', text: ['Az MA2 **csak a változást** tárolja: ha egy lámpa a cue 3-ban nem változik, az értéke „továbbkövet” (track) a következő cue-kba. Ezért amikor egy cue-t módosítasz, el kell döntened: csak ezt a cue-t javítod (**Cue Only**), vagy hagyod, hogy a változás továbbmenjen (**Tracking**).'] },
    { t: 'step', title: 'Menj a cue 3-ra', keys: 'Goto 3 Please', text: 'A pult a cue 3-ra ugrik, a saját idejével úszik be (itt 20 mp). Várd meg, amíg beér.', cmd: 'Goto Cue 3', see: 'Sárga keret a 3-as cue körül, az executor aktív.' },
    { t: 'step', title: 'A tervező 5%-kal többet kér', keys: 'Group 2 At + 5 Please', text: 'Az LX1 Warm (group 2) 75%-ról 80%-ra megy.', cmd: 'group 2 at + 5' },
    { t: 'step', title: 'Update — csak ezt a cue-t', keys: 'Update', text: 'Nyomd meg az **Update** gombot. Felugrik az Update menü. Kattints a {{Tracking Update}} feliratra (konzolon U3), hogy {{Update Cue Only}} legyen belőle, majd az {{Update Cue}} gombra (konzolon X6).', mini: 'Billentyűvel: **U** = Update, **Alt+F3** = U3, **F6** = X6.' },
    { t: 'step', title: 'Kilépés a cue-ból', text: 'Kapcsold ki az executort: az 1-es executor feletti {{Off}} gomb. onPC-n: jobb szélen **Executor 1–15** nézet, vagy a Screen 2 bal alsó sarkában a kijelölt executor **Off** gombja.', see: 'A sárga keret eltűnik, az executor nem aktív.' },
    { t: 'h', text: 'Idők szerkesztése' },
    { t: 'p', text: 'Ugyanúgy, mint a 07. leckében: kattints a cellára a Sequence Executor Sheetben, üsd be az új értéket, Enter (ha nem ugrik fel az érték-ablak: jobb klikk a cellára). Üres cella = 0, Out Fade-nél pedig ugyanaz, mint a Fade. Out időt csak akkor kell megadni, ha eltér.' },
    { t: 'table', head: ['Cue', 'Fade', 'Out Fade', 'Delay', 'Out Delay'], rows: [['1', '0', '', '', ''], ['2', '15', '', '3', ''], ['3', '20', '25', '', ''], ['4', '10', '', '', ''], ['5', '15', '10', '**0**', '5'], ['6', '0', '', '', '']] },
    { t: 'step', title: 'Állítsd be az időket', text: 'Írd át a cellákat a táblázat szerint. Figyelj: a cue 5-nél a korábbi **Delay 5** helyett most **Out Delay 5** kell, a Delay legyen 0.', see: 'A táblázatod pont így néz ki.' },
    { t: 'step', title: 'Próbáld ki!', keys: 'Go+', text: 'Nyomd a nagy **Go**-t (onPC: jobb szélen **Masters**, vagy Space shortcut módban), és figyeld, hogyan úsznak a csatornák a különböző időkkel.' },
    { t: 'step', title: 'Gyors mentés', keys: 'Backup Backup', text: 'A Backup kétszer gyorsan (mint egy dupla kattintás) ugyanazzal a névvel elmenti a showt.', see: 'A parancssor-visszajelzésben látod, hogy mentett.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Előadás közben az Update-tel nagyon óvatosan! A „Cue Only” védi a következő cue-kat a véletlen változástól. Ha bizonytalan vagy, kérdezz.' },
    { t: 'checkpoint', items: ['Cue 3 Follow.', 'Mind a 6 cue el van nevezve.', 'Cue 3-ban az LX1 Warm 80%.', 'Az idők a táblázat szerint.', 'A show mentve.'] },
    { t: 'quiz', items: [
      { q: 'Mit csinál a [[Goto 3 Please]]?', a: ['A cue 3-ra ugrik, a saját idejével', 'Törli a cue 3-at', 'Átnevezi a cue 3-at'], ok: 0, why: 'A Goto egy adott cue-ra visz; a cue a tárolt fade idejével úszik be.' },
      { q: 'Mikor jó a „Cue Only” update?', a: ['Ha a változás csak ebben a cue-ban kell, és a következőket nem akarod elrontani', 'Mindig rossz', 'Csak blackoutnál'], ok: 0, why: 'A Cue Only megakadályozza, hogy a változás továbbkövessen a következő cue-kba.' }
    ] }
  ]
});
