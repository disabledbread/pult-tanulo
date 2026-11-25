MA.lesson({
  id: '00', part: 'start', title: 'Üdv a pult mögött!', en: 'Welcome', min: 10,
  lead: 'Mielőtt bármit programoznál: hogyan használd ezt a tanfolyamot az onPC mellett, és mit jelentenek a jelölések.',
  learn: ['Hogyan tedd egymás mellé az onPC-t és ezt az oldalt', 'Mi van az onPC főablakában', 'Hogyan olvasd a gombokat és parancsokat', 'Mi az a shortcut mód (Insert)'],
  blocks: [
    { t: 'h', text: 'Így működik a tanfolyam' },
    { t: 'p', text: 'Ez nem olvasós tananyag. Minden leckében **te csinálod meg a lépéseket a grandMA2 onPC-ben**, ez az oldal csak mellette fut és megmondja, mit nyomj és mit kell látnod. Ha egy lépés kész, pipáld ki — a haladásod elmentődik ebben a böngészőben.' },
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az a grandMA2 onPC?', text: ['A grandMA2 az MA Lighting profi fénypultja — ilyen van a színházban is. Az **onPC** ugyanez a szoftver számítógépen: ugyanazok a gombok, menük és parancsok, csak egérrel kattintasz a gombokra.', 'Amit itt megtanulsz, az 1:1-ben működik a valódi pulton is. Ezért kell először onPC-n gyakorolnod, mielőtt a színházi pulthoz engednek.'] },
    { t: 'step', title: 'Indítsd el a grandMA2 onPC-t', text: 'Nyisd meg a **grandMA2 onPC 3.9** programot. Ha kérdez valamit induláskor, válaszd az alapértelmezettet (vagy kérdezd meg az oktatót).', see: 'Fekete-sárga ablak jobbra gombokkal, bal oldalt négy forgatógombbal (encoder).' },
    { t: 'step', title: 'Tedd egymás mellé a két ablakot', text: 'Kattints az onPC ablakára és nyomd meg a **Windows + ←** billentyűt, majd ezt a böngészőt tedd jobbra a **Windows + →**-val. Ez az oldal fél képernyőn is kényelmesen olvasható.', see: 'Bal oldalt az onPC, jobb oldalt ez a tanfolyam.' },
    { t: 'h', text: 'Mit látsz az onPC-ben?' },
    { t: 'fig', name: 'onpc', caption: 'Az onPC főablaka (vázlat). A számok magyarázata lent.' },
    { t: 'list', items: [
      '**1 — Encoderek:** forgatógombok. Egérrel fel-le húzva állítod az értéket, rákattintva számot is beírhatsz.',
      '**2 — Ablakterület (Screen 1):** ide nyílnak a menük (Setup, Backup) és ide tehetsz saját ablakokat.',
      '**3 — Parancssor:** itt látod, mit írtál be. Az elején a `[Channel]>` az alap kulcsszó.',
      '**4 — Executor gombok:** ide kerülnek majd a lejátszók.',
      '**5 — Gombok (keys):** a pult gombjai: Store, Please, At, Thru, számok… Ugyanazok, mint a valódi pulton.',
      '**6 — Jobb szél:** Masters (nagy faderek és Go), Executor oldalak, és a **Screen 2/3/4** gombok — ezek nálunk **külön ablakot nyitnak**.'
    ] },
    { t: 'shot', src: 'ch03-screen2-empty', caption: 'Így néz ki a Screen 2 ablak: nagy üres ablakterület, jobb oldalt a view gombok (1.1–1.10), lent a parancssor és az encoder sáv.' },
    { t: 'h', text: 'Jelölések ebben a tanfolyamban' },
    { t: 'table', head: ['Jelölés', 'Mit jelent'], rows: [
      ['[[Store Cue 1 Please]]', 'Ezeket a **gombokat** nyomd meg sorban (onPC-n kattints rájuk). Alattuk mindig ott a **billentyűzetes** változat is (shortcut módban).'],
      ['{{New Show}}', 'Egy **képernyőn lévő gomb** vagy fül, amire rá kell kattintanod.'],
      ['`Store Cue 1`', 'Ezt **látod a parancssorban**, miután megnyomtad a gombokat. Nem kell begépelni — csak ellenőrzésre van.'],
      ['((Programmer))', 'Szakkifejezés — kattints rá, és a Szótárban elmagyarázzuk.']
    ] },
    { t: 'tip', kind: 'onpc', title: 'Please = Enter', text: 'A pult **Please** gombja hajtja végre a parancsot. onPC-n a billentyűzet **Enter**-je ugyanez. Kattintás = a pulton megnyomás. **Jobb klikk** = a pulton {{Edit}} + rábökés.' },
    { t: 'step', title: 'Próbáld ki a shortcut módot', text: 'Nyomd meg a billentyűzeten az **Insert**-et (vagy kattints a jobb felső **Shortcut (Ins)** gombra). Bekapcsolt állapotban a gombok alatt zárójelben megjelenik a billentyű betűje, pl. Store = S. Nyomd meg még egyszer: kikapcsol.', see: 'A gombok alatt megjelennek, majd eltűnnek a (betűk).', mini: 'Kezdésnek nyugodtan dolgozz egérrel. A Billentyűk oldalon minden parancs megvan.' },
    { t: 'tip', kind: 'warn', title: 'Ha a billentyű „nem csinál semmit”', text: 'Nézd meg, be van-e kapcsolva a shortcut mód (Insert). Ha egy táblázat cellája van kijelölve, a billentyűzet egy érték-ablakot nyithat meg — ilyenkor zárd be a sárga X-szel. Neveket (pl. group neve) mindig a felugró ablakba írsz a billentyűzettel.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A pulton ugyanezek a gombok fizikailag is megvannak, a menük az 1-es képernyőn (a gombok fölötti kis kijelzőn) nyílnak. A jobb klikk helyett ott az **Edit** gombot nyomod, aztán rábökőd a képernyőre.' },
    { t: 'checkpoint', items: ['Fut az onPC és mellette ez az oldal.', 'Tudod, hol van a parancssor, a gombok és a Screen 2 gomb.', 'Tudod, hogy a Please = Enter.'] },
    { t: 'quiz', items: [
      { q: 'Melyik billentyű hajtja végre a parancsot onPC-n?', a: ['Space', 'Enter (Please)', 'Esc'], ok: 1, why: 'A Please gomb hajtja végre a parancsot, billentyűzeten ez az Enter.' },
      { q: 'Mit csinál a jobb klikk az onPC-ben?', a: ['Ugyanaz, mint a pulton az Edit + rábökés', 'Törli az elemet', 'Semmit'], ok: 0, why: 'A jobb klikk a szerkesztést (Edit) nyitja meg — a pulton ez az Edit gomb + rábökés.' }
    ] }
  ]
});
