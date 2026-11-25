MA.lesson({
  id: '11', part: 'ml', title: 'Lámpák vezérlése', en: 'Control Fixtures', min: 25,
  lead: 'A moving lightok irányítása: pozíció, gobó és szín az encoderekkel és a Color Pickerrel.',
  learn: ['A Preset Type sáv', 'Encoderek használata egérrel', 'Gobó választása a kalkulátorban', 'Feature váltás', 'Color Picker (Special Dialog)'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Preset Type sáv', text: ['A lámpák tulajdonságai csoportokba vannak sorolva: **Dimmer, Position, Gobo, Color, Beam, Focus, Control**. Ezek a **((Preset Type))**-ok. A képernyő tetején lévő sávban választod ki, melyiket állítják az encoderek.', 'A sáv csak azt mutatja, amit a lámpáid tudnak — a Mac 700-asok előtt csak „Dimmer” volt. **Zöld keret** = a kijelölt lámpa tudja; **piros négyzet** = változtattál rajta (a Store elmentené).'] },
    { t: 'shot', src: 'ch11-preset-bar', caption: 'A Preset Type sáv a Mac 700-asok hozzáadása után.' },
    { t: 'step', title: 'Válaszd ki a 111-est', keys: 'Clear Fixture 1 1 1 Please', text: 'Üres programmerrel kezdj. A moving lightokat a **Fixture** gombbal jelölöd ki (itt a Channel is működne, mert a Channel ID is 111).', see: 'A Fixture Sheetben a 111-es sor sárga.' },
    { t: 'step', title: 'Dimmer', text: 'Kattints a sávban a {{Dimmer}}-re, és húzd felfelé a bal oldali encodert (vagy [[At At]]).', see: 'A Dim érték nő.' },
    { t: 'step', title: 'Position', text: 'Kattints a {{Position}}-re. Az encoderek most **Pan** (vízszintes) és **Tilt** (függőleges). Az encoderen **nyomva tartott egérrel húzz fel-le** — így változik az érték.', shot: 'ch11-position-encoders', mini: 'Az egér görgője nagyon apró lépésekben állít. Finomabb állításhoz kattints a **Normal / Fine / Ultra** gombra az érték mellett.' },
    { t: 'step', title: 'Gobo a kalkulátorral', text: 'Kattints a {{Gobo}}-ra, majd **kattints egyet** az első encoderen (G1). Megnyílik a „kalkulátor”: számok helyett gobó-képekkel. Kattints a {{water}} gobóra.', shot: 'ch11-gobo-calculator', see: 'A Fixture Sheetben a Gobo1 oszlopban „water”.' },
    { t: 'step', title: 'Feature: másik gobókerék', text: 'A Mac 700-nak két gobókereke van. A bal oldali **Feature** gombon (pl. „Gobo1”) kattintva váltasz. A kis **hullám** ikonos gombokon „swipe”-olhatsz is: nyomd le, húzd ki a gombból, engedd el — megjelenik a lista.' },
    { t: 'step', title: 'Color: színkerék', text: 'Kattints a {{Color}}-ra. A „C1” az első színkerék — úgy működik, mint a gobókerék (kattintás = kalkulátor).' },
    { t: 'step', title: 'MixColor: R, G, B', text: 'A **Feature** gombbal válts **MixColor**-ra: az első három encoder **R** (piros), **G** (zöld), **B** (kék).' },
    { t: 'step', title: 'Color Picker', text: 'Kattints a {{Special Dialog}} gombra (jobbra fent, az encoderek fölött). Megnyílik a **Color Picker**: kattints bárhová a színmezőn.', shot: 'ch11-color-picker', see: 'A lámpa színe a kattintott szín. Jobb oldalt négy mód: **Fader** (HSB / CMY / RGB faderek), **HSB** (színmező), **Swatch Book** (gyártók színszűrői, pl. Lee), **Raw Faders** (közvetlen mix-faderek).' },
    { t: 'step', title: 'Kísérletezz, aztán takaríts', keys: 'Clear', text: 'Próbálgass nyugodtan, figyeld a Fixture Sheetet. A végén ürítsd a programmert.' },
    { t: 'tip', kind: 'onpc', title: 'Billentyűvel', text: '**F** = Fixture, **Ctrl+Alt+E** = Encoder gomb, **A A** = Full. A preset type-ok közt a sávra kattintva váltasz.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A pulton az encodereket valóban tekered; lenyomva tekerve gyorsabb. Rövid lenyomás = kalkulátor. A lámpák mozgását mindig a színpadon is nézd — a képernyő nem mutatja, ha egy fej díszletre világít.' },
    { t: 'checkpoint', items: ['Tudsz lámpát kijelölni a Fixture gombbal.', 'Tudsz pozíciót, gobót és színt állítani.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Mit jelent a piros négyzet a Preset Type sáv egy gombján?', a: ['Hiba van', 'Ebben a csoportban változtattál — a Store elmentené', 'A lámpa ki van kapcsolva'], ok: 1, why: 'A piros négyzet jelzi, hogy van aktív érték ebben a preset type-ban.' },
      { q: 'Hogyan nyitod meg a gobó-képes kalkulátort?', a: ['Egy kattintás az encoderen', 'Dupla Store', 'Setup menüben'], ok: 0, why: 'Az encoderre kattintva (konzolon: röviden megnyomva) nyílik a kalkulátor.' },
      { q: 'Hol van a Color Picker?', a: ['Special Dialog gomb', 'Backup menü', 'Groups pool'], ok: 0, why: 'A Special Dialog gomb nyitja a Color Pickert, ha a Color preset type van kiválasztva.' }
    ] }
  ]
});
