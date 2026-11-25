MA.lesson({
  id: '03', part: 'alapok', title: 'Képernyők és ablakok', en: 'Use Screens and Windows', min: 15,
  lead: 'Berendezed a munkaterületed: parancssor-visszajelzés, csatornatábla, és elmented az egészet egy gombra (View).',
  learn: ['Ablak létrehozása (Create Basic Window)', 'Ablak átméretezése és mozgatása', 'Channel Sheet', 'View mentése és elnevezése'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Screen, window, view', text: ['A **screen** (képernyő) egy felület: a pulton fizikai kijelző, onPC-n külön ablak (Screen 2, 3, 4).', 'Egy képernyőn **window**-kat (ablakokat) helyezel el: táblázatokat (sheet), gyűjtőket (pool) stb.', 'A **((View))** az ablakok elrendezése, amit egy gombra mentesz és egy kattintással visszahívsz.'] },
    { t: 'step', title: 'Nyisd meg a Screen 2-t', text: 'Kattints a jobb szélen a **Screen 2** gombra. Nálunk ez **külön ablakként** nyílik meg.', see: 'Üres, pöttyös ablakterület, jobb oldalt 1.1–1.10 számozott view gombok.', shot: 'ch03-screen2-empty' },
    { t: 'step', title: 'Hozz létre parancssor-visszajelzést', text: 'Kattints az üres terület **bal felső** sarkába. Felugrik a **Create Basic Window**. Válaszd a {{System}} fület, majd a {{Command Line}} gombot.', shot: 'ch03-create-basic-window', see: 'Megjelenik a **Command Line Feedback** ablak: itt látod, mit hajtott végre a pult.' },
    { t: 'step', title: 'Méretezd át', text: 'Fogd meg az ablak **jobb alsó sarkát** (a sárga pöttyöknél) és húzd felfelé, amíg kb. 6–8 sor magas lesz.' },
    { t: 'step', title: 'Mozgasd a képernyő aljára', text: 'Fogd meg az ablak **címsorát** („Command Line Feedback”) és húzd le a képernyő aljára, közvetlenül a parancssor fölé.' },
    { t: 'step', title: 'Hozz létre Channel Sheetet', text: 'Kattints a fenti üres terület bal felső sarkába → {{Sheets}} fül → {{Channel}}.', see: 'Látod a 40 csatornát „closed” értékkel (= 0%), és két extra csatornát: **FT 1.1.1** és **FT 2.1.1**. Ezeket a szoftver hozza létre automatikusan — nem kell velük foglalkoznod.', shot: 'ch03-screen-layout' },
    { t: 'h', text: 'Mentsd el view-ként' },
    { t: 'step', title: 'Store + view gomb', keys: 'Store', text: 'Nyomd meg a **Store** gombot, majd kattints a Screen 2 jobb oldalán a legfelső view gombra (**1.1**).', mini: 'Ha a Screen 2 ablak eltakarja a gombokat, használd a billentyűt: **S** = Store (shortcut módban), majd kattints az 1.1 view gombra.' },
    { t: 'step', title: 'Store View Options', text: 'Felugrik a **Store View Options**: kiválaszthatod, melyik képernyők kerüljenek bele (a 2-es ki van jelölve), és itt rögtön nevet is adhatsz. Kattints a {{Please}} gombra.', shot: 'ch03-store-view-options' },
    { t: 'step', title: 'Nevezd el: Channel', keys: 'Assign Assign', text: 'Nyomd meg kétszer az **Assign** gombot (ez a **Label** = elnevezés), majd kattints a view gombra. A felugró ablakba írd be: `Channel`, Enter.', cmd: 'Label ViewButton 1.1', fb: 'Executing : Label ViewButton 1.1 "Channel"', see: 'A view gombon kis előnézet és a „Channel” név.', shot: 'ch03-viewbutton' },
    { t: 'tip', kind: 'onpc', title: 'Ugyanez billentyűvel', text: 'Shortcut módban (Insert): **S** = Store, **Alt+A** = Assign (kétszer = Label), **V** = View, **Enter** = Please.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A pulton a view gombok a 2–6. képernyők jobb oldalán vannak, a Screen 2 mellett fizikai **V1–V10** gombok is. A konzolon a Store + V1 ugyanazt csinálja.' },
    { t: 'checkpoint', items: ['Screen 2-n felül Channel Sheet, alul Command Line Feedback.', 'A view el van mentve az 1.1 gombra „Channel” néven.'] },
    { t: 'quiz', items: [
      { q: 'Mi az a View?', a: ['Egy lámpa-nézet', 'Elmentett ablak-elrendezés', 'A színpad 3D képe'], ok: 1, why: 'A view az ablakok elrendezése, amit egy gombra mentesz.' },
      { q: 'Mit jelent az Assign kétszer?', a: ['Törlés', 'Label — elnevezés', 'Mentés'], ok: 1, why: 'Assign Assign = Label, ezzel adsz nevet bármilyen elemnek.' },
      { q: 'Mi az FT 1.1.1 a Channel Sheetben?', a: ['Egy hibás lámpa', 'Automatikus Fixture Type csatorna, nem kell vele foglalkozni', 'Az első cue'], ok: 1, why: 'A szoftver automatikusan hozza létre — a tanfolyam szempontjából figyelmen kívül hagyhatod.' }
    ] }
  ]
});
