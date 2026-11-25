MA.lesson({
  id: '07', part: 'prog', title: 'További cue-k', en: 'Create More Cues', min: 20,
  lead: 'Megépíted a jelenetsort groupokkal, két gyors trükkel (If, blackout), és a végén beírod az időket a Sequence sheetben.',
  learn: ['Cue-k tárolása egymás után', 'Groupok használata a Group gombbal', 'If = minden, ami világít', 'Blackout cue', 'Idők beírása a Sequence sheetben'],
  blocks: [
    { t: 'concept', tag: 'Így dolgozunk', title: 'Előbb a fény, utána az idő', text: ['A cue-kat most **idő nélkül** tárolod — csak a fényállapot számít.', 'Az időket (mennyi idő alatt úszik be a cue) a végén egyszerre írod be a **Sequence Executor Sheetben**: rábökősz a cue **Fade** cellájára és beírod a számot. Így egy helyen látod és javítod az összes időt.'] },
    { t: 'h', text: 'Cue 2' },
    { t: 'step', title: 'A 20-as és 28-as 80%-on', keys: '2 0 + 2 8 At 8 0 Please', text: 'Állítsd be a fényt.', cmd: 'Channel 20 + 28 At 80' },
    { t: 'step', title: 'Tárold', keys: 'Store Please', text: 'Nem kell cue számot mondanod: a pult a következő szabad számra ment (2).', see: 'A Sequence Executor Sheetben megjelent a **2 · Cue 2** sor.' },
    { t: 'h', text: 'Cue 3: groupokkal' },
    { t: 'step', title: 'Group 1 és 2 75%-on', keys: 'Group 1 + 2 At 7 5 Please', text: 'A **Group** gombbal groupokat jelölsz ki — a szám a Groups pool gombjának száma. (Rá is kattinthatsz a pool gombjaira.)', fb: 'Executing : Group 1 + 2 At 75' },
    { t: 'step', title: 'Group 3–5 60%-on', keys: 'Group 3 Thru 5 At 6 0 Please', text: 'A Thru groupoknál is működik.', fb: 'Executing : Group 3 Thru 5 At 60' },
    { t: 'step', title: 'Tárold', keys: 'Store Please', text: 'Ez lesz a cue 3.' },
    { t: 'h', text: 'Cue 4: If — minden, ami világít' },
    { t: 'step', title: 'Mindent 30%-kal lejjebb', keys: 'If Please At - 3 0 Please', text: 'Az **If Please** kijelöl mindent, aminek most van kimenete. Az **At − 30** mindenkit 30%-kal lejjebb visz (0 alá nem mehet).', fb: 'Executing : IfOutput' },
    { t: 'step', title: 'Tárold', keys: 'Store Please', text: 'Ez lesz a cue 4.' },
    { t: 'h', text: 'Cue 5: hideg hangulat' },
    { t: 'step', title: 'Melegek ki, hidegek be', keys: 'Group 6 . . Group 9 Thru 1 1 At 6 0 Please', text: 'Group 6 (All Warm) → 0% (a két pont azonnal végrehajtja), a 9–11 hideg groupok → 60%.' },
    { t: 'step', title: 'Elöl és LX1 hideg, tárolás', keys: 'Group 7 + 8 At 7 5 Please Store Please', text: 'A FOH és LX1 hidegek 75%-on, és rögtön tárold: ez a cue 5.' },
    { t: 'h', text: 'Cue 6: blackout' },
    { t: 'step', title: 'Sötét, 6 gombnyomással', keys: 'If Please . . Store Please', text: 'Minden, ami világít → 0% → tárolás. Kész a blackout.', see: '6 cue van a listában.' },
    { t: 'step', title: 'Takaríts', keys: 'Clear', text: 'Tartsd nyomva a Clear-t (vagy nyomd meg háromszor).', fb: 'Executing : ClearAll' },
    { t: 'h', text: 'Az idők beírása' },
    { t: 'p', text: 'A Sequence Executor Sheetben minden cue-nak külön sora van. A **Fade** oszlop: hány másodperc alatt úszik be a cue. A **Delay**: mennyit várjon indulás előtt. Az **Out Fade**: a sötétedő lámpák ideje — csak akkor kell, ha más, mint a Fade.' },
    { t: 'step', title: 'Írd be az első időt', text: 'Kattints a **cue 2** sorában a **Fade** cellára, üsd be: `15`, majd Enter. Ha nem ugrik fel az érték-ablak, kattints a cellára jobb gombbal.', see: 'A cue 2 Fade cellájában 15 áll.' },
    { t: 'step', title: 'A többi idő', text: 'Ugyanígy töltsd ki a táblázat szerint (az üres cellákhoz ne nyúlj):', shot: 'ch07-cue-list', see: 'A te táblázatod is így néz ki.' },
    { t: 'table', head: ['Cue', 'Fade', 'Out Fade', 'Delay'], rows: [['2', '15', '', ''], ['3', '20', '25', ''], ['4', '10', '', ''], ['5', '15', '', '5']] },
    { t: 'tip', kind: 'onpc', title: 'Billentyűvel gyorsabb', text: '**G** = Group, **Num /** = Thru, **A** = At, **S** = Store, **I** = If, **Enter** = Please, **Delete** = Clear (shortcut módban).' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Az időket mindig a Sequence sheetben ellenőrizd tárolás után — ott egyben látod a teljes jelenetsort.' },
    { t: 'checkpoint', items: ['6 cue a listában, a cue 6 a blackout.', 'Az idők a táblázat szerint: 15 / 20 és 25 / 10 / 15 és delay 5.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Hol írod be a cue fade idejét?', a: ['A Sequence sheetben a cue Fade cellájára kattintva', 'A Setup menüben', 'Utólag már nem lehet'], ok: 0, why: 'A Sequence Executor Sheetben minden időt egy helyen látsz és javítasz.' },
      { q: 'Mit jelöl ki az If Please?', a: ['Az első lámpát', 'Mindent, aminek most van kimenete', 'A kijelölt executort'], ok: 1, why: 'If Please = IfOutput: minden, ami éppen világít.' },
      { q: 'Kell-e cue számot megadni a Store után?', a: ['Igen, mindig', 'Nem, a pult a következő szabad számra ment', 'Csak páros számoknál'], ok: 1, why: 'Ha nem adsz meg számot, a következő szabad egész számra tárol.' }
    ] }
  ]
});
