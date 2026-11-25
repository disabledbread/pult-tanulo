MA.lesson({
  id: '04', part: 'alapok', title: 'Csatornák vezérlése', en: 'Control Dimmers or Channels', min: 20,
  lead: 'Felkapcsolod a lámpákat: értéket adsz, több csatornát választasz ki, és megtanulod, mit jelentenek a színek.',
  learn: ['At, Thru, +, − használata', 'Mi a programmer és mit jelentenek a színek', 'A Clear három lépcsője', 'Billentyűparancsok a gyorsabb munkához'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'A programmer', text: ['Amit állítasz, először a **((Programmer))**-be kerül — ez egy ideiglenes munkaterület. A lámpák már világítanak, de még semmi nincs elmentve.', 'A **Store** a programmer tartalmát menti el (cue-ba, presetbe). A **Clear** üríti a programmert.'] },
    { t: 'step', title: 'Csatorna 1 teljes fényen', keys: '1 At 1 0 0 Please', text: 'Nyomd meg a gombokat sorban. Mivel az alap kulcsszó `[Channel]`, a pult így érti: **Channel 1 At 100**.', see: 'Az 1-es csatorna ID-ja sárga (kijelölt), a háttere piros (aktív érték), és „open” felirat jelenik meg (= 100%).', shot: 'ch04-channel-open' },
    { t: 'tip', kind: 'info', title: 'Miért nem kell a Channel gomb?', text: 'A parancssor elején `[Channel]>` áll: ez az **alap kulcsszó**. Ha számmal kezdesz, a pult magától elé teszi. Lámpáknál (moving light) a **Fixture** gombbal kezded, groupoknál a **Group** gombbal.' },
    { t: 'step', title: 'Új érték a kijelölt csatornának', keys: 'At 5 0 Please', text: 'A csatorna még ki van jelölve, ezért elég az új érték.', see: 'Az 1-es csatorna 50%-on.' },
    { t: 'h', text: 'A Clear három lépcsője' },
    { t: 'fig', name: 'clear' },
    { t: 'step', title: 'Clear egyszer', keys: 'Clear', text: 'A kijelölés megszűnik (az ID nem sárga). Most már nem tudsz egyszerűen új értéket adni neki.' },
    { t: 'step', title: 'Clear másodszor', keys: 'Clear', text: 'A piros háttér eltűnik, az érték piros betűs lesz: a lámpa még világít, de **a Store már nem mentené el**.' },
    { t: 'step', title: 'Clear harmadszor', keys: 'Clear', text: 'A programmer üres, a csatorna lekapcsolt.', mini: 'Gyorsabban: tartsd a Clear-t kb. 1 másodpercig **nyomva** — ugyanaz, mintha háromszor nyomtad volna. A parancssorban ilyenkor `ClearAll` jelenik meg.' },
    { t: 'h', text: 'Gyors értékek' },
    { t: 'step', title: 'Teljes fény két At-tel', keys: '1 At At', text: 'Az **At** kétszer = 100% (Full).', see: 'Az 1-es csatorna „open”.' },
    { t: 'step', title: 'Nulla két ponttal', keys: '. .', text: 'Két pont = **At 0**. Ez nem „kikapcsolás”, hanem egy 0%-os érték a programmerben, amit a Store elment.' },
    { t: 'step', title: 'Egy csatorna kivétele: Off', keys: 'Off Channel 1 Please', text: 'Kapcsold fel újra az 1-est ([[1 At At]]), majd vedd ki a programmerből az **Off Channel 1**-gyel. Ha sok csatorna van a programmerben, így csak egyet „engedsz el”.' },
    { t: 'h', text: 'Több csatorna egyszerre' },
    { t: 'step', title: 'Thru és +', keys: '1 Thru 1 0 + 2 0 At 2 0 Please', text: '1-től 10-ig, plusz a 20-as, mind 20%-on.', cmd: 'ch 1 thru 10 + 20 at 20' },
    { t: 'step', title: 'Kivétel: −', keys: '1 Thru 1 0 + 2 0 - 5 . .', text: '1–10 és 20, **kivéve az 5-öst**, mind 0%-ra. A két pont azonnal végrehajtja.', see: 'Mindenki 0%, csak az 5-ös marad 20%-on.' },
    { t: 'step', title: 'Relatív érték: At +', keys: '5 At + 3 0 Please', text: 'Az 5-ös 20%-ról **30%-kal feljebb** megy: 50%.' },
    { t: 'step', title: 'Relatív lefelé', keys: '5 At - 5 0 Please', text: '50% − 50% = 0%. Piros háttérrel 0% van a programmerben.' },
    { t: 'step', title: 'Takaríts', keys: 'Clear', text: 'Tartsd nyomva a Clear-t (vagy nyomd meg háromszor).', fb: 'Executing : ClearAll', see: 'Minden csatorna „closed”, a programmer üres.' },
    { t: 'tip', kind: 'onpc', title: 'Billentyűzettel (shortcut módban)', text: '**A** = At, **Num /** = Thru, **+ / −** a numerikus billentyűzeten, **Delete** = Clear, **O** = Off, **C** = Channel, **Enter** = Please.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A pulton van egy **Level** kerék is: előre tekerve emeli, magad felé tekerve csökkenti a kijelölt csatornák fényét. onPC-n ennek helyén a Dimmer encodert húzod fel-le.' },
    { t: 'checkpoint', items: ['Tudsz csatornát kijelölni és értéket adni (At, Thru, +, −).', 'Érted a sárga ID / piros háttér / piros szöveg jelentését.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Mit jelent a piros háttér egy csatorna értéke mögött?', a: ['Hibás a lámpa', 'Aktív érték a programmerben — a Store elmenti', 'A lámpa túlmelegedett'], ok: 1, why: 'A piros háttér = aktív érték a programmerben, ezt menti el a Store.' },
      { q: 'Miért elég a [[1 At 1 0 0 Please]], miért nem kell a Channel gomb?', a: ['Mert a [Channel] az alap kulcsszó, a pult elé teszi', 'Mert a Channel gomb nem létezik', 'Véletlenül működik'], ok: 0, why: 'A parancssor elején látható [Channel] az alap kulcsszó: ha számmal kezdesz, ezt használja.' },
      { q: 'Mit csinál a két pont (. .)?', a: ['At 0 — nullára állít', 'Törli a programmert', '100%'], ok: 0, why: 'A dupla pont = At 0, és ez egy tárolható 0% érték.' }
    ] }
  ]
});
