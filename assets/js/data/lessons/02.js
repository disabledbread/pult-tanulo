MA.lesson({
  id: '02', part: 'alapok', title: 'Dimmerek patchelése', en: 'Patch Dimmers', min: 15,
  lead: 'Megmondod a pultnak, milyen lámpáid vannak és hol. 40 dimmer csatornát adsz hozzá egyetlen varázslóval.',
  learn: ['Mi a DMX és a patch', 'A fényterv: 40 dimmer, meleg és hideg színek', 'Fixture Wizard használata', 'Fixture ID vs Channel ID'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'DMX és patch — egyszerűen', text: ['A pult a lámpákkal **((DMX))** jelen keresztül „beszél”. Egy DMX vonal (**universe**) 512 címet tud. Minden lámpa egy vagy több címet foglal el.', 'A **((Patch))** az a lista, ami megmondja: „az 1-es lámpa a DMX 1-es címen van, és egy egyszerű dimmer”. Patch nélkül a pult nem tudja, mit vezérel.'], fig: 'dmx' },
    { t: 'h', text: 'A fényterv' },
    { t: 'p', text: 'Egy egyszerű színházi alapvilágítással kezdünk: elöl a nézőtérről (**FOH**), fent a színpad fölötti húzókon (**LX1, LX2, LX4**) és oldalt a tornyokon (**Box**). A **páratlan** számú lámpák meleg, a **páros** számúak hideg színűek. Ez összesen 40 dimmer csatorna.' },
    { t: 'plot' },
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az a dimmer?', text: ['A hagyományos színházi lámpa (pl. PC, profil) magától csak ég vagy nem ég. A **dimmer** egy szabályzó, ami a fényerőt 0 és 100% között állítja. A pultban egy dimmer = egy csatorna, egy DMX cím.'] },
    { t: 'h', text: 'Csináld meg' },
    { t: 'step', title: 'Nyisd meg a patch-et', keys: 'Setup', text: 'Kattints a **Setup** gombra, majd a {{Patch & Fixture Schedule}} gombra (bal oldalt fent, a **Show** oszlopban).', shot: 'ch02-setup-menu', mini: 'Billentyűvel: **F12** = Setup (shortcut módban).' },
    { t: 'step', title: 'Nevezd el a réteget', text: 'Felugrik a **Layer Name** ablak. Írd be: `Dimmers`, majd Enter. A ((Layer|réteg)) csak egy mappa a patch-ben, hogy rendben legyenek a lámpáid.', shot: 'ch02-layer-name' },
    { t: 'step', title: 'Ismerd meg a Fixture Wizardot', text: 'Megjelenik a **Fixture Wizard**. Bal oldalt a kitöltendő zöld mezők, jobb oldalt a segítő lista, ami mindig ahhoz a mezőhöz tartozik, ahol éppen vagy.', shot: 'ch02-wizard-empty', see: 'Fixturetype, Name, Quantity, Fixture ID, Channel ID mezők. A DMX-cím mező csak a típus kiválasztása után jelenik meg.' },
    { t: 'step', title: 'Válaszd ki a típust', text: 'Kattints a {{Please select fixturetype}} gombra, majd jobb oldalt a {{2 Dimmer 00 (DMX 1)}} típusra. Ez egy sima, 1 csatornás dimmer.', see: 'A Name mezőben megjelenik a „Dim 1”, és megjelenik a **Patch Break 1** mező is.' },
    { t: 'step', title: 'Hagyd a nevet', text: 'A név „Dim 1” marad. Mivel a szöveg és a szám között szóköz van, a pult automatikusan számozza: Dim 1, Dim 2, Dim 3…' },
    { t: 'step', title: 'Mennyiség: 40', text: 'A **Quantity** mezőben vagy. Írd be: `40`, majd Enter.' },
    { t: 'step', title: 'Fixture ID 0, Channel ID 1', text: 'A **Fixture ID** maradjon `0` (Enter). A **Channel ID** legyen `1` (Enter). A többit a pult számozza: 1–40.', mini: 'Egy lámpának lehet Fixture ID-ja és Channel ID-ja is, de legalább az egyik kell. A dimmereknek most csak Channel ID-t adunk.' },
    { t: 'step', title: 'DMX cím: 1.001', text: 'A **Patch Break 1** mezőbe írd be: `1.001`, majd Enter. Ez: 1-es universe, 1-es cím. A többi dimmer innen folytatódik (1.002, 1.003…).', shot: 'ch02-wizard-filled' },
    { t: 'step', title: 'Apply', text: 'Kattints az {{Apply}} gombra.', see: 'A „Dimmers” rétegben ott van Dim 1 – Dim 40, ChaID 1–40.', shot: 'ch02-patch-result' },
    { t: 'step', title: 'Lépj ki és mentsd', text: 'Kattints a sárga X-re. A pult megkérdezi: „You are leaving patch and fixture schedule. Save changes?” — kattints a {{Yes}} gombra. Utána a Setup menüt is zárd be a sárga X-szel.', shot: 'ch02-save-warning' },
    { t: 'tip', kind: 'info', title: 'Furcsa: „available Parameters: 0”?', text: 'Az onPC külső MA hardver (pl. onPC command wing vagy node) nélkül nem ad ki DMX-et, ezért írja, hogy 0 paraméter érhető el. **Programozni ettől még teljesen tudsz** — minden ugyanúgy működik.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A valódi pulton a patch már kész az előadáshoz. Ott **soha ne módosítsd** engedély nélkül — egy rossz DMX cím miatt rossz lámpa gyullad fel.' },
    { t: 'checkpoint', items: ['40 dimmer van a „Dimmers” rétegben.', 'Channel ID 1–40, DMX 1.001–1.040.', 'A patch-et elmentetted (Yes).'] },
    { t: 'quiz', items: [
      { q: 'Mit jelent az 1.001 cím?', a: ['1. lámpa, 1%-on', '1-es universe, 1-es DMX cím', '1 óra 1 perc'], ok: 1, why: 'A DMX címet univerzum.cím formában írjuk: 1.001 = 1-es universe, 1-es cím.' },
      { q: 'Miért lesz automatikusan Dim 2, Dim 3…?', a: ['Mert szóköz van a név és a szám között', 'Mert a Quantity 40', 'Véletlen'], ok: 0, why: 'Ha a név szöveg + szóköz + szám, a pult a számot lépteti a további lámpáknál.' },
      { q: 'Hány DMX címet foglal egy egyszerű dimmer?', a: ['1', '3', '31'], ok: 0, why: 'A „2 Dimmer 00 (DMX 1)” típus egyetlen címet használ. (A Mac 700 31-et — erről a 09. leckében.)' }
    ] }
  ]
});
