MA.lesson({
  id: '01', part: 'alapok', title: 'Új show létrehozása', en: 'Create a New Show', min: 8,
  lead: 'Minden munka egy showfájlban él. Most csinálsz egy üreset, amiben a tanfolyam végéig dolgozol.',
  learn: ['Mi az a showfájl', 'A Backup menü használata', 'Új, üres show készítése', 'Hogyan zárj be pop-upokat'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi van egy showfájlban?', text: ['Egy ((Show file|showfájl)) mindent tartalmaz: melyik lámpa hol van (patch), a csoportokat, színeket, pozíciókat, cue-kat és még a képernyőid elrendezését is.', 'Ezért fontos: **mindig a saját showfájlodban dolgozz**, és rendszeresen mentsd.'] },
    { t: 'tip', kind: 'warn', title: 'Ne a színház showjába dolgozz!', text: 'A New Show bezárja az éppen nyitott showt. Ha a gépen ott van az előadás showfájlja, azt soha ne írd felül — mindig új nevet adj.' },
    { t: 'step', title: 'Nyisd meg a Backup menüt', keys: 'Backup', text: 'Kattints a jobb felső **Backup** gombra.', see: 'Megnyílik a Backup menü. A tetején ott a jelenlegi show neve (**Current Show**).', shot: 'ch01-backup-menu' },
    { t: 'step', title: 'Válaszd az Internal fület', text: 'Kattints az {{Internal}} fülre (ez a gép saját tárhelye). Itt vannak a showjaid.' },
    { t: 'step', title: 'Kattints a New Show gombra', text: 'Kattints a {{New Show}} gombra. Megnyílik a „New Show” ablak.', shot: 'ch01-new-show' },
    { t: 'step', title: 'Add meg a nevet', text: 'A **Show Name** mezőben alapból „New Show + dátum” áll. Írd be: `Quick Start Guide 1`. Ha mások is használják a gépet, írd elé a neved, pl. `Kati Quick Start Guide 1`.' },
    { t: 'step', title: 'Pipáld be az összes négyzetet', text: 'Kattints a {{Check All}} gombra. Így a show tényleg üres lesz, alapbeállításokkal, és semmit nem hoz át a régi showból.', see: 'Mind a hét négyzet (Clear Show Data, Clear Time Config, Clear Global Settings, Clear Local Settings, Clear Network Protocols, Clear Network Config, Clear User Profiles) be van pipálva.' },
    { t: 'step', title: 'Hozd létre', keys: 'Please', text: 'Kattints a {{Please}} gombra. Ha már van ilyen nevű show, a pult rákérdez: adj új nevet, vagy írd felül (csak ha biztosan a tiéd!).', fb: 'Executing : NewShow "Quick Start Guide 1" /timeconfig /globalsettings /localsettings /protocols /network /user' },
    { t: 'step', title: 'Zárd be a Backup menüt', text: 'Kattints a jobb felső **sárga X**-re. A sárga X mindig bezárja az ideiglenes ablakokat és pop-upokat.', see: 'Visszakaptad az üres főképernyőt.' },
    { t: 'tip', kind: 'onpc', title: 'Gyors mentés', text: 'Később a **Backup gomb kétszeri gyors megnyomása** (mint egy dupla kattintás) ugyanazzal a névvel elmenti a showt. Billentyűn: **Ctrl+Alt+B** kétszer (shortcut módban).' },
    { t: 'tip', kind: 'info', title: 'Meglévő show megnyitása', text: 'A Backup menüben a {{Load Show}} gombbal nyitsz meg egy korábbi showt. Másik néven a {{Save Show as}} gombbal mented.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A pulton a Backup menüben az {{Internal}} mellett USB-meghajtó is megjelenik. Az előadás showját mindig az ott megszokott helyről töltsd be, és soha ne nyomj rá New Show-t engedély nélkül.' },
    { t: 'checkpoint', items: ['Van egy új, üres showd a saját neveddel.', 'A Backup menü bezárva.'] },
    { t: 'quiz', items: [
      { q: 'Miért nyomod meg a Check All gombot új shownál?', a: ['Hogy gyorsabban mentsen', 'Hogy a régi showból semmi ne jöjjön át, alapbeállításokkal induljon', 'Hogy töröljön minden showt a gépről'], ok: 1, why: 'A Check All minden „Clear” opciót bekapcsol, így teljesen tiszta, alapállapotú showt kapsz. A többi showfájlt nem törli.' },
      { q: 'Hogyan zárod be a menüket és pop-upokat?', a: ['Esc-kel mindig', 'A jobb felső sárga X-szel', 'Az ablak tálcán'], ok: 1, why: 'A sárga X zárja be az ideiglenes ablakokat. (Az Esc is működik sok helyen, de a sárga X a biztos.)' }
    ] }
  ]
});
