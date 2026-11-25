MA.lesson({
  id: '13', part: 'preset', title: 'Presetek készítése', en: 'Making Presets', min: 25,
  lead: 'Elmented a pozíciókat, színeket és gobókat presetekbe, és megtanulod a Global / Selective különbséget.',
  learn: ['Position, Color, Gobo presetek', 'Mit jelent a G és az S a preset gombon', 'Alapállapot-preset (All)', 'Presetek elnevezése'],
  blocks: [
    { t: 'tip', kind: 'info', title: 'Ha véletlenül felugrik egy ablak a Store-ra', text: 'Ha a Store gombot sokáig nyomva tartod, megnyílik egy beállító ablak. Ezzel most nem kell foglalkoznod — az alapbeállítás jó. Csukd be: [[Esc Esc]].' },
    { t: 'h', text: 'Position presetek' },
    { t: 'step', title: 'Első pozíció', keys: 'Fixture 1 1 1 Thru 1 3 3 Please', text: 'Jelöld ki az összes Mac 700-at, és a **Position** encoderekkel állíts be valami pozíciót. Aztán [[Store]] + kattints a Position pool **első** gombjára.', see: 'A Fixture Sheetben a számok helyett **P2.1** áll: Preset Pool 2 (Position), 1-es gomb.', shot: 'ch13-preset-links' },
    { t: 'step', title: 'Második pozíció számmal', keys: 'Store Preset 2 . 2 Please', text: 'Mozgasd másfelé a lámpákat, majd tárold így. A „2 .” közvetlenül a Position poolra mutat (a pool neve is „2 Position”).' },
    { t: 'step', title: 'Harmadik pozíció, takarítás', keys: 'Clear', text: 'Csinálj még egy harmadik pozíció presetet (Store + a pool 3. gombja), utána ürítsd a programmert.' },
    { t: 'h', text: 'Color és Gobo presetek' },
    { t: 'step', title: 'Kék szín egyetlen lámpával', keys: 'Fixture 1 1 1 Please', text: 'Csak a 111-es legyen kijelölve. {{Color}} → {{Special Dialog}} → válassz kéket a Color Pickerben. Aztán [[Store]] + a Color pool első gombja.', see: 'A preset magától kap nevet (pl. „blue #”) — a # jelzi, hogy a pult adta.' },
    { t: 'shot', src: 'ch13-pools-sg', caption: 'A mi onPC-nkben: a Position preset piros **S**-sel, a Color preset narancs **G**-vel és a saját nevével („blue#”).' },
    { t: 'concept', tag: 'Jó tudni', title: 'Mit jelent az S és a G a gombon?', text: ['**S** (piros): ezt a presetet csak azok a lámpák kapják meg, amelyek tároláskor ki voltak jelölve.', '**G** (narancs): ugyanolyan típusú lámpa **mind** használhatja — akkor is, ha csak egy lámpával tároltad.', 'A pult ezt magától választja ki. Neked most elég tudni, mit jelent.'] },
    { t: 'step', title: 'Még 2 szín és 3 gobó', keys: 'Clear', text: 'Csinálj még két Color presetet és három Gobo presetet (Gobo → encoderre kattintás → válassz gobót → Store + Gobo pool gomb). A végén Clear.' },
    { t: 'h', text: 'All preset: minden alapérték' },
    { t: 'step', title: 'Alapértékek mentése', keys: 'Fixture 1 1 1 Thru 1 3 3 Please Please Please Store Preset 0 . 1 Please', text: 'Az első Please kijelöli a lámpákat, a másik kettő a lámpák **minden tulajdonságát alapállapotba** teszi. Ezt mented az All pool 1-es gombjára: egy „mindent vissza alapra” preset.' },
    { t: 'h', text: 'Nevek' },
    { t: 'step', title: 'Nevezd el a pozíciókat és az All presetet', keys: 'Assign Assign', text: 'A színek és gobók maguktól kaptak nevet (# jellel), de a pozíciót a pult nem tudja kitalálni. [[Assign Assign]] + kattints a preset gombra, írj nevet (pl. „Középre”, „Közönségbe”, „Default”).', see: 'Minden presetnek értelmes neve van.' },
    { t: 'tip', kind: 'onpc', title: 'Billentyűvel', text: '**S** = Store, **P** = Preset, **F** = Fixture, **Alt+A** kétszer = Label.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Az előadás showjában a presetek nevei megegyezés szerint készülnek (pl. „DS Center”, „Szólóspot”). Mielőtt új presetet csinálsz, nézd meg, nincs-e már ilyen.' },
    { t: 'checkpoint', items: ['3 Position, 3 Color, 3 Gobo és 1 All preset.', 'Mindegyiknek van neve.', 'A programmer üres.'] },
    { t: 'quiz', items: [
      { q: 'Mit jelent a G a preset gombon?', a: ['Group', 'Global — a lámpatípus minden példánya használhatja', 'Gobo'], ok: 1, why: 'A Global preset a típus összes lámpájára érvényes, később hozzáadottakra is.' },
      { q: 'Mit jelent a P2.1 a Fixture Sheetben?', a: ['2-es pool (Position), 1-es preset — a lámpa a presetre mutat', 'Patch 2.1', 'Page 2, Cue 1'], ok: 0, why: 'A lámpa nem számot, hanem a presetre mutató linket kapott.' },
      { q: 'Mit csinál a Please háromszor kijelölés után?', a: ['Törli a lámpákat', 'Aktiválja az összes attribútumot (alapértéken)', 'Elmenti a showt'], ok: 1, why: 'A további Please-ek az összes attribútumot aktiválják/kikapcsolják.' }
    ] }
  ]
});
