MA.lesson({
  id: '19', part: 'extra', title: 'Layout View', en: 'Layout View', min: 25,
  lead: 'A Layout View-ban a lámpák úgy látszanak, ahogy a színpad fölött lógnak. Rájuk kattintva kijelölöd őket, és egy pillantással látod, mi ég. Két layoutot csinálsz: egyet a dimmereknek, egyet a mozgófejeknek.',
  learn: ['Layouts pool és Layout View', 'Lámpák betárolása egy layoutba', 'Elrendezés: Arrange → Rectangle', 'Kijelölés a layoutban', 'Layout elnevezése, view-ba mentése'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi a layout?', text: ['A **layout** egy „térkép”: a lámpák négyzetei úgy vannak elhelyezve, mint a valóságban (FOH, LX1, LX2…). Minden négyzeten látod a lámpa számát és értékét.', 'A layoutok a **Layouts poolban** vannak, a **Layout View** ablak mutatja a kiválasztottat.'] },
    { t: 'h', text: 'Előkészítés: nagy képernyő' },
    { t: 'step', title: 'Használd a nagy képernyőt', text: 'A Layout View-nak hely kell. onPC-n nyisd meg a {{Screen 2}} ablakot (jobb szélen). Ha tele van, kattints egy üres területre → {{Clear Screen}}, vagy húzd kisebbre a meglévő ablakot.' },
    { t: 'step', title: 'Layouts pool', text: 'Kattints a bal felső üres területre → {{Pools}} → {{Layout Pool}}. Az ablak jobb alsó sarkát húzd fel, hogy csak **egy sor** legyen.' },
    { t: 'step', title: 'Layout View', text: 'Alatta kattints az üres területre → {{Other}} → {{Layout View}}. Ez kitölti a maradék helyet.', see: 'Fekete ablak „Layout View” címmel, fent: DMX, Edit All, Fast Call, Select, Zoom to Fit, Setup.' },
    { t: 'h', text: '1. layout: dimmerek' },
    { t: 'step', title: 'Jelöld ki a dimmereket', keys: '1 Thru 4 0 Please', text: 'Az 1–40 dimmer kijelölve.', cmd: 'Channel 1 Thru 40' },
    { t: 'step', title: 'Tárold a layoutba', keys: 'Store', text: 'Nyomd meg a **Store**-t, majd kattints a Layouts pool **1-es** gombjára. Utána a 1-es layout gombjára kattintva a Layout View megmutatja.', see: 'A lámpák egy hosszú sorban. A {{Zoom to Fit}} gombbal mind belefér.' },
    { t: 'step', title: 'Rendezd el: Arrange → Rectangle', text: 'A Layout View fejlécén kattints a {{Setup}}-ra, lent az {{Arrange}}-re, majd a {{Rectangle}}-re. Az encoder-mezőkre kattintva írd be: **Columns** `10`, **Horizontal Interval** `2`, **Vertical Interval** `3`. Ha tetszik az előnézet: {{Apply}}.', shot: 'ly-arrange', see: 'Előnézet: 4 sor, soronként 10 dimmer (1–10, 11–20, 21–30, 31–40).' },
    { t: 'step', title: 'Kész', text: 'Kattints újra a {{Setup}}-ra (kilépés), majd {{Zoom to Fit}}.', shot: 'ly-dimmers', see: 'Szép rács: 4 sor × 10 dimmer.' },
    { t: 'step', title: 'Kijelölés a layoutban', keys: 'Clear', text: 'Clear után kattints a layoutban egy-egy lámpára: kijelölődik (sárga keret). Most már a lámpák helye alapján is ki tudsz jelölni — nem kell fejből tudni a számukat.' },
    { t: 'step', title: 'Nevezd el', keys: 'Assign Assign', text: 'Az **Assign** kétszer = **Label**. Kattints a layout gombjára, és írd be: `Dimmerek`, Enter.', see: 'A pool gombján és a Layout View címében: **Dimmerek**.' },
    { t: 'h', text: '2. layout: mozgófejek' },
    { t: 'step', title: 'Mozgófejek a 2-es layoutba', keys: 'Fixture 1 1 1 Thru 1 3 3 Please', text: 'Utána [[Store]] → a Layouts pool **2-es** gombja. Kattints a 2-es layoutra.' },
    { t: 'step', title: 'Rendezd el', text: '{{Setup}} → {{Arrange}} → {{Rectangle}}: **Columns** `3`, **Vertical Interval** `2` → {{Apply}}. Kilépés: {{Setup}}, majd {{Zoom to Fit}}. Nevezd el: `Mozgofejek`.', shot: 'ly-movers', see: '3 sor × 3 Mac 700 (111–113, 121–123, 131–133).' },
    { t: 'step', title: 'Mentsd view-ba', keys: 'Store', text: 'Tárold el a képernyőt egy view gombra, és nevezd el `Layout`-nak — ugyanúgy, mint a 03. leckében.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A layout akkor jó, ha a valóságot mutatja: rendezd a lámpákat úgy, ahogy a húzókon lógnak (elöl a FOH, hátrébb az LX-ek). Így a próbán gyorsan rábökhetsz arra a lámpára, amit a rendező mutat.' },
    { t: 'checkpoint', items: ['Layout 1 „Dimmerek”: 4 × 10 rács.', 'Layout 2 „Mozgofejek”: 3 × 3.', 'A layoutban kattintással ki tudsz jelölni.', 'Van egy „Layout” nevű view-d.'] },
    { t: 'quiz', items: [
      { q: 'Hogyan kerülnek lámpák egy layoutba?', a: ['Kijelölöd őket → Store → a Layouts pool gombja', 'A patch-ben', 'Az Effect Editorban'], ok: 0, why: 'Ugyanúgy, mint a groupnál: kijelölés, Store, pool gomb.' },
      { q: 'Mivel rendezed rácsba a lámpákat?', a: ['Setup → Arrange → Rectangle', 'Zoom to Fit', 'Fast Call'], ok: 0, why: 'Az Arrange menü Rectangle pontja oszlopokba-sorokba rakja a kijelölt lámpákat.' }
    ] }
  ]
});
