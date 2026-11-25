MA.lesson({
  id: '14', part: 'preset', title: 'Második sequence', en: 'A Second Sequence', min: 30,
  lead: 'A moving lightoknak külön cue-listát csinálsz, beállítod az executorokat, és összekötöd a két sequence-et.',
  learn: ['Sequence tárolása új executorra', 'Store Method: Merge, Create Second Cue', 'Assign Menu: executor szélesség és gombok', 'Rate fader', 'Sequence-ek összekötése CMD-vel', 'Executor prioritás'],
  blocks: [
    { t: 'h', text: 'A második sequence' },
    { t: 'step', title: 'Első pozíció a lámpákra', keys: 'Clear', text: 'Üres programmerrel nyomd meg **kétszer** az első Position presetet (első nyomás kijelöl, második rájuk teszi).' },
    { t: 'step', title: 'Tárold a 3-as executorra', keys: 'Store Exec 3 Please', text: 'Konzolon elég a Store, majd a 3-as executor egyik gombja.', see: 'Új sequence a 3-as executoron.' },
    { t: 'step', title: 'Válaszd ki a 3-ast, tegyél rá gobót és színt', keys: 'Select Exec 3 Please', text: 'Nyomd meg az első Gobo és Color presetet, majd [[Store Please]]. Felugrik a **Store Method** ablak — válaszd: {{Merge}} (hozzáadja a meglévő cue-hoz).', shot: 'ch14-store-method', see: 'Az 1-es cue-ban pozíció + gobó + szín.' },
    { t: 'step', title: 'Második cue', keys: 'Clear', text: 'Clear. Második Position preset kétszer, második Gobo és Color preset, [[Store Please]] → most válaszd a {{Create Second Cue}}-t.' },
    { t: 'step', title: 'Harmadik cue', keys: 'Store Please', text: 'A harmadik Position, Gobo és Color presettel. Most már nem kérdez: ha több cue van, új cue-t csinál a következő számon.' },
    { t: 'step', title: 'Negyedik cue: All preset, 0 idővel', keys: 'Store Please', text: 'Az **All** preset (alapállapot) kerüljön a 4. cue-ba. Utána a Sequence sheetben nézd meg, hogy **minden idő 0** legyen — ha nem, kattints a Fade cellára és írd be: `0`, Enter. A végén Clear.' },
    { t: 'h', text: 'Executor beállítás (Assign Menu)' },
    { t: 'step', title: 'Nyisd meg az Assign Menüt', keys: 'Select Exec 1 Please', text: 'Kattints az 1-es executor fölötti **zöld névmezőre** („Main Show”), vagy nyomd: [[Assign]] + az 1-es executor gombja. Megnyílik az **Assign Main Show 1.1** menü. Jobbra válaszd a {{Function}} fület.' },
    { t: 'step', title: 'Dupla szélesség', text: 'Kattints a {{Width 2}}-re (konzolon X2). Az 1-es executor két fader széles lesz.', shot: 'ch14-assign-menu', see: 'Két oszlop: balra **Off, Black, Mstr, Flash**, jobbra **GoBack, On, XF, Go**.' },
    { t: 'step', title: 'Gombok és faderek', text: 'Kattints egy gombra, és a felugró listából válaszd az újat:', see: 'Az executor úgy néz ki, mint a lenti ábrán.' },
    { t: 'table', head: ['Ez van most', 'Erre cseréld'], rows: [['GoBack', 'Rate1'], ['Black', '<<<'], ['On', '>>>'], ['XF (fader)', 'Rate'], ['Flash', 'GoBack']] },
    { t: 'fig', name: 'exec', caption: 'Az 1-es executor gombjai és faderei a beállítás után (sárga keret = újonnan beállított).' },
    { t: 'concept', tag: 'Alapfogalom', title: 'Mire jó a Rate fader?', text: ['A **((Rate))** fader az összes cue-idő sebességét szorozza: gyorsíthat, lassíthat, vagy teljesen megállíthat — a tárolt idők nem változnak.', 'A **Rate1** gomb visszaállítja középre (eredeti idők). A **<<<** és **>>>** egy cue-t lép vissza / előre, idő nélkül és a Follow-t nem indítva.'] },
    { t: 'h', text: 'A két sequence összekötése' },
    { t: 'step', title: 'CMD oszlop', text: 'A Sequence Executor Sheetben keresd meg a **CMD** (command) oszlopot. Ide parancsot írhatsz, ami a cue indulásakor lefut. Jobb klikk a cue 1 CMD cellájára, és írd be: `Goto cue 1 exec 1.3` (az 1.3 = 1-es oldal, 3-as executor).', see: 'A cue 1 elindítja a második sequence 1-es cue-ját is.' },
    { t: 'table', head: ['Cue (Main Show)', 'CMD'], rows: [['1', 'Goto Cue 1 Executor 1.3'], ['3', 'Goto Cue 2 Executor 1.3'], ['4', 'Goto Cue 3 Executor 1.3'], ['6', 'Goto Cue 4 Executor 1.3']] },
    { t: 'step', title: 'Próbáld ki', keys: 'Go+', text: 'Nyomd meg a nagy Go-t (Masters vagy Space shortcut módban).', see: 'Mindkét sequence a cue 1-re ugrik.' },
    { t: 'h', text: 'Fényerő a moving lightoknak' },
    { t: 'step', title: 'Update: új tartalom is', keys: '>>> Update', text: 'Lépj a következő cue-ra a **>>>** gombbal, kapcsold a moving lightokat teljes fényre ([[Fixture 1 1 1 Thru 1 3 3 At At]]), és nyomd meg az **Update**-et. Kattints az {{Original Content Only}}-ra, amíg {{Add new Content}} nem lesz, majd {{Save as Default}}. Válaszd a **Sequ 1 „Main Show”** sort.', mini: 'Így az Update nemcsak a meglévő értékeket frissíti, hanem újakat is hozzáad.' },
    { t: 'step', title: 'Cue 6: a lámpák menjenek 0-ra', keys: 'Fixture 1 1 1 Thru 1 3 3 . . Update', text: 'Menj a cue 6-ra. A presetet **ne** frissítsd — csak a cue-t a sequence 1-ben.' },
    { t: 'step', title: 'Prioritás: nyerjen a Main Show', keys: 'Assign', text: 'Assign + az 1-es executor gombja → jobb oldalt {{Options}} → a **Playback** oszlop tetején {{Priority LTP}} → válaszd: {{High}}. Ha figyelmeztet, hogy kikapcsolja az executort, fogadd el. Zárd be.', see: 'A cue 6-nál a moving lightok dimmere most „closed” — a magasabb prioritású sequence 1 nyer.' },
    { t: 'tip', kind: 'warn', title: 'Élőben vigyázz!', text: 'A prioritás módosítása kikapcsolja az executort. Előadás közben soha ne csináld!' },
    { t: 'step', title: 'Mentsd el!', keys: 'Backup Backup', text: 'Lehet, hogy nem a legszebb show, de mentsd el — és programozás közben rendszeresen ments.' },
    { t: 'checkpoint', title: 'Gratulálok — végigértél!', items: ['Két sequence: Main Show (executor 1) és a moving lightok (executor 3).', 'Az executor 1 dupla széles, Rate faderrel.', 'A CMD-k összekötik a két sequence-et.', 'A Main Show prioritása High.', 'A show elmentve.'] },
    { t: 'quiz', items: [
      { q: 'Mit csinál a Merge a Store Method ablakban?', a: ['Új cue-t hoz létre', 'Hozzáadja az új értékeket a meglévő cue-hoz', 'Törli a cue-t'], ok: 1, why: 'A Merge összefésüli az új értékeket a meglévő cue-val.' },
      { q: 'Mit jelent a „Goto cue 1 exec 1.3” a CMD oszlopban?', a: ['Az 1-es oldal 3-as executorán a cue 1-re ugrik', 'Három cue-t ugrik', 'Kikapcsolja az executort'], ok: 0, why: 'Az 1.3 = page 1, executor 3. A cue indulásakor ez a parancs is lefut.' },
      { q: 'Mire jó a Rate fader?', a: ['A fényerőt állítja', 'A cue-idők sebességét állítja a tárolt idők módosítása nélkül', 'A színt állítja'], ok: 1, why: 'A Rate az összes időt szorozza: gyorsabb, lassabb vagy megállítja.' }
    ] }
  ]
});
