MA.lesson({
  id: '15', part: 'extra', title: 'Könnyű effektek', en: 'Effects (Effect Editor)', min: 30,
  lead: 'Az Effect Editorral magad rakod össze az effekteket: futófény a dimmereken, kör a mozgófejekkel, színváltás — és megtanulod, hogyan kerül cue-ba és hogyan veszed ki a következő cue-ban (Stomp).',
  learn: ['Effects pool és Effect Editor', 'Dimmer chase (futófény)', 'Mozgás: kör a mozgófejekkel', 'Színváltás (szivárvány)', 'Effekt cue-ba tárolása', 'Effekt kivétele a következő cue-ban: Stomp'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az effekt?', text: ['Az **effekt** egy magától ismétlődő változás: a fényerő hullámzik, a lámpák egymás után villannak, a mozgófej kört ír le, a szín körbejár. Nem kell minden lépést külön cue-ba tenni — a pult számolja.', 'Az effekteket az **Effect Editorban** rakod össze (ez az effekt generátor), és az **Effects poolba** mented. Van kész effekt-könyvtár is ({{Load Predefined}}), de most magunk építjük fel, hogy értsd, miből áll.'] },
    { t: 'h', text: 'Előkészítés' },
    { t: 'step', title: 'Effects pool', text: 'Kattints egy üres képernyőterületre → {{Pools}} → {{Effects}}.', see: 'Üres, számozott effekt-gombok.' },
    { t: 'tip', kind: 'warn', title: 'Mindig előbb a lámpák!', text: 'Mielőtt új effektet csinálsz, **jelöld ki a lámpákat**. Az Effect Editor a kijelölésből tudja, kikre vonatkozik (a **QTY** oszlopban látod, hány lámpa). Ha előtte nincs kijelölés, „None” lesz.' },
    { t: 'h', text: 'Dimmer chase (futófény)' },
    { t: 'step', title: 'Jelöld ki a lámpákat', keys: 'Group 6 Please', text: 'Group 6 = az összes meleg dimmer (20 lámpa).' },
    { t: 'step', title: 'Nyisd meg az Effect Editort', text: 'Az Effects poolban **jobb klikk** az első üres gombra (a pulton: {{Edit}} + rábökés). Megnyílik az **Effect Editor**.', see: 'Üres lista „New” sorral, alul Add, Take Selection, # Groups… gombok.' },
    { t: 'step', title: 'Add → Dim', text: 'Nyomd meg az {{Add}} gombot. A felugró **Select Effect Attribute** ablakban válaszd a {{Dim}}-et, majd {{Confirm}}.', shot: 'fx-attribute', see: 'Egy sor: QTY 20, Attrib **DIM**, Form **Sin**.' },
    { t: 'step', title: 'Form: Chase', text: '**Jobb klikk** a sor **Form** cellájára. A **Select Form** ablak képpel mutatja a formákat — válaszd a {{Chase 5}}-öt.', shot: 'fx-form' },
    { t: 'step', title: 'Sebesség és sorrend', text: 'Fent az encodereken állíthatod: **Speed** (BPM — ütés/perc), **Low / High** (milyen mélyre és magasra menjen), **Phase**. A Phase alapból **0..-360**: ez osztja szét a lámpákat, ettől futnak egymás után. Ha mindet egyszerre akarod, a Phase legyen 0.', shot: 'fx-chase-line', mini: 'Az encoder-oldalakat az encoder-sor jobb felső gombjával lapozod (Basic / Advanced). Ha a QTY „None”, jelöld ki a lámpákat, és nyomd meg bal alul a {{Take Selection}} gombot.' },
    { t: 'step', title: 'Próbáld ki', keys: 'Group 6 Please', text: 'Zárd be az editort (sárga X). Jelöld ki a lámpákat, és **kattints az effekt gombjára** a poolban.', shot: 'fx-effect-bar', see: 'A gombon a lámpák száma (20), fent egy effekt-sáv: Speed / Low / High / Phase, és gombok: **Off Effect**, **Release Effect**, **Stomp Effect**.' },
    { t: 'h', text: 'Mozgás: kör' },
    { t: 'step', title: 'Mozgófejek + új effekt', keys: 'Fixture 1 1 1 Thru 1 3 3 Please', text: 'Jelöld ki a Mac 700-asokat, majd jobb klikk a következő üres effekt gombra → {{Add}} → válaszd a {{Position}}-t (ez a Pan és a Tilt együtt) → {{Confirm}}.', see: 'Két sor: **PAN** és **TILT**, mindkettő Sin.' },
    { t: 'step', title: 'A Tilt legyen Cos', text: 'Jobb klikk a **TILT** sor Form cellájára → {{Cos 9}}. A Sin és a Cos negyed ütemmel el van csúszva egymáshoz képest — ettől lesz kör.', shot: 'fx-circle', mini: 'A kör méretét a Low / High Value adja (alap: −50 és 50). Kisebb körhöz pl. −20 és 20.' },
    { t: 'h', text: 'Színváltás' },
    { t: 'step', title: 'MixColor effekt', text: 'Mac 700-asok kijelölve → jobb klikk egy üres effekt gombra → {{Add}} → {{MixColor}} → {{Confirm}}.', see: 'Három sor: COLORRGB1, 2, 3 (piros, zöld, kék).' },
    { t: 'step', title: 'Csúsztasd el a színeket', text: 'Görgess jobbra a **Phase** oszlopig. Jobb klikk a cellákra, és írd be: piros **0**, zöld **120**, kék **240**. Így a lámpák együtt végigmennek a szivárványon.', shot: 'fx-color' },
    { t: 'h', text: 'Effekt cue-ba, és kivétel a következő cue-ban' },
    { t: 'concept', tag: 'Fontos', title: 'Miért kell Stomp?', text: ['Az effekt a cue-ban **továbbkövet** (tracking): ha a következő cue-ban nem mondod neki, hogy álljon le, tovább fut.', 'A **Stomp** leállítja a futó effektet a kijelölt lámpákon. A következő cue-ba **gombokkal** teszed bele: kijelölöd a lámpákat, **MA + At** (= Stomp), Please, Store.'] },
    { t: 'step', title: 'Cue 1: az effekt', keys: 'Store Exec 4 Please', text: 'Jelöld ki a dimmereket ([[Group 6 Please]]), kattints a chase effekt gombjára (elindul), majd tárold egy **üres executorra**, pl. a 4-esre. Konzolon: Store, majd a 4-es executor gombja.', see: 'Új sequence a 4-es executoron, benne Cue 1.' },
    { t: 'step', title: 'Indítsd el a cue-ból', keys: 'Clear', text: 'Ürítsd a programmert (tartsd nyomva a Clear-t), majd nyomd meg a 4-es executor **Go** gombját. Most már a cue futtatja az effektet.', fb: 'Executing : ClearAll' },
    { t: 'step', title: 'Cue 2: Stomp', keys: 'Group 6 Please MA At Please', text: 'Jelöld ki ugyanazokat a lámpákat, majd **MA + At** — a parancssorba „Stomp” kerül —, aztán Please. onPC-n kattints az {{MA}}-ra, utána az {{At}}-ra: az MA „rajtamarad”, nem kell nyomva tartani.', shot: 'fx-stomp-cmd', cmd: 'Stomp', mini: 'Billentyűvel (shortcut módban): **Shift** = MA, **A** = At.' },
    { t: 'step', title: 'Tárold a 4-esre', keys: 'Store Exec 4 Please', text: 'Felugrik a tárolás ablak — válaszd: {{Create Second Cue}}. Utána Clear.', shot: 'fx-two-cues', see: 'Két cue a 4-es sequence-ben: Cue 1 = fut az effekt, Cue 2 = leáll.' },
    { t: 'step', title: 'Próbáld ki', text: 'A 4-es executoron **Go**: fut az effekt. Még egy **Go**: megáll.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Élesben az effektet mindig a Sequence-ből indítsd és állítsd le (cue-val), ne a programmerből. Ha valami „beragad”, a Stomp-os cue a megoldás.' },
    { t: 'checkpoint', items: ['Van egy chase, egy kör és egy színváltó effekted a poolban.', 'Cue 1-ben fut az effekt, cue 2-ben Stomp-pal leáll.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Mit csinálj, mielőtt új effektet adsz hozzá?', a: ['Jelöld ki a lámpákat', 'Ments showt', 'Semmit'], ok: 0, why: 'Az Effect Editor a kijelölésből tudja, kikre vonatkozik az effekt (QTY).' },
      { q: 'Mitől lesz a Pan + Tilt effektből kör?', a: ['A Tilt Cos, a Pan Sin', 'Mindkettő Chase', 'A Speed 0'], ok: 0, why: 'A Sin és a Cos negyed ütemmel el vannak csúszva, ettől kört ír le a fej.' },
      { q: 'Hogyan állítod le az effektet a következő cue-ban?', a: ['Kijelölés → MA + At (Stomp) → Please → Store', 'Törlöd az effektet a poolból', 'Kikapcsolod a lámpát'], ok: 0, why: 'A Stomp leállítja a futó effektet; tárolva a cue-ban marad.' }
    ] }
  ]
});
