MA.lesson({
  id: '10', part: 'ml', title: 'A Fixture Sheet', en: 'Fixture Sheet', min: 12,
  lead: 'Olyan táblázatot készítesz, ami a moving lightok minden tulajdonságát mutatja, nem csak a fényerőt.',
  learn: ['Képernyő ürítése (Clear Screen)', 'Fixture Sheet létrehozása', 'Sheet Options: a sárga golyó', 'Hasznos megjelenítési beállítások'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Channel Sheet vs. Fixture Sheet', text: ['A Channel Sheet csak a **fényerőt** (Dimmer) mutatja. A **Fixture Sheet** minden ((Attribute|attribútumot)): soronként egy lámpa, oszloponként a tulajdonságok (Dimmer, Pan/Tilt, Gobo, Color…).'] },
    { t: 'step', title: 'Ürítsd a képernyőt', keys: 'Encoder', text: 'Az onPC-ben a gombok tetején lévő **⊙ (kör) gomb** az encoder gomb. Kattints rá: lent megjelenik egy sáv. Kattints a {{Clear Screen}}-re — ez az adott képernyő összes ablakát törli. A {{Clear All Screens}} mindet.', shot: 'ch10-encoder-settings', mini: 'A konzolon ez az encoder **nyomva tartása**. A tárolt view-id ettől nem vesznek el.' },
    { t: 'step', title: 'Fixture Sheet', text: 'Kattints az üres területre → {{Sheets}} → {{Fixture}}. onPC-n jó helye az 1-es képernyő (a főablak), közel az encoderekhez.', see: 'Soronként a lámpák (111 Mac700PE 1…), oszloponként a tulajdonságok.' },
    { t: 'step', title: 'Sheet Options', text: 'Kattints a táblázat bal felső sarkában a **sárga golyóra**. Megnyílnak a beállítások (innen egy ablakot törölni is tudsz: {{Delete Window}}).', see: 'Fülek: Tools, LayerMask, Display, Title Buttons, Mask (Local).' },
    { t: 'step', title: 'Display beállítások', text: 'Nyisd meg a {{Display}} fület és állítsd be a lenti táblázat szerint.', shot: 'ch10-sheet-options' },
    { t: 'table', head: ['Beállítás', 'Érték', 'Mire jó'], rows: [
      ['Symbol Output', 'Auto', 'kis négyzet a névnél: a lámpa aktuális fénye és színe'],
      ['Symbol Features', 'On', 'kis ikonok a cellákban (szín, gobó, fényerő)'],
      ['Feature Sort', 'On', 'amit éppen állítasz, a név mellé kerül — nem kell görgetni'],
      ['Hide Empty Cells', 'On', 'eltünteti az üres cellákat, ha többféle lámpád van'],
      ['Merge Same Values', 'Off', 'minden értéket külön látsz (pl. R, G, B), nem összevonva']
    ] },
    { t: 'step', title: 'Mentsd alapértelmezésnek', text: 'Kattints a fejlécben a {{Save to Default}} gombra — minden új Fixture Sheet így jön létre. Zárd be a beállításokat a sárga X-szel.' },
    { t: 'tip', kind: 'info', title: 'Nem látod mindet?', text: 'Ha az ablak kicsi, a lenti beállítások (Hide Empty Cells, Merge Same Values) lejjebb vannak — görgess az opciók ablakban.' },
    { t: 'checkpoint', items: ['Van egy Fixture Sheeted a 9 Mac 700-zal.', 'A Display beállítások a táblázat szerint, alapértelmezésként mentve.'] },
    { t: 'quiz', items: [
      { q: 'Mit mutat a Fixture Sheet a Channel Sheettel szemben?', a: ['Csak a fényerőt', 'A lámpák összes tulajdonságát', 'A cue-kat'], ok: 1, why: 'A Fixture Sheet minden attribútumot mutat, a Channel Sheet csak a dimmert.' },
      { q: 'Hol érsz el egy ablak beállításait?', a: ['Jobb klikk a tálcán', 'Az ablak bal felső sárga golyóján', 'A Setup menüben'], ok: 1, why: 'A sárga golyó nyitja az ablak opcióit (és innen törölhető is).' }
    ] }
  ]
});
