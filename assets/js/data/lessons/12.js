MA.lesson({
  id: '12', part: 'preset', title: 'Preset poolok', en: 'Preset Pool', min: 12,
  lead: 'Megismered a preseteket, és létrehozod a poolokat, ahova majd a pozíciókat, színeket és gobókat mented.',
  learn: ['Mi a preset és miért jó', 'A 10 preset típus', 'Preset link vs. érték', 'Preset poolok színes kerettel'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az a preset?', text: ['A **((Preset))** egy elmentett érték-csomag: pl. „kék szín” vagy „énekes pozíció”. A cue-k nem a számot, hanem a **presetre mutató linket** tárolják.', 'Ezért ha később átírod a presetet (pl. kicsit odébb kell a pozíció), **minden cue frissül, ami használja**. Ez a profi programozás alapja.'] },
    { t: 'fig', name: 'presetTypes', caption: 'A 10 alap preset típus. A szám a pool száma: pl. a Position presetek „2.x”, a Color presetek „4.x”.' },
    { t: 'p', text: 'Minden típus csak a saját értékeit tárolja: egy Position preset csak pozíciót. Kivétel az **All** (0): az mindenfélét tárolhat.' },
    { t: 'tip', kind: 'info', title: 'Hogyan működik egy preset gomb?', text: 'Ha **nincs** kijelölt lámpa és megnyomsz egy presetet: kijelöli azokat a lámpákat, amik használhatják. **Második** nyomásra rájuk teszi. Ha **van** kijelölés, első nyomásra rájuk teszi.' },
    { t: 'step', title: 'Hozd létre a poolokat', text: 'Kattints üres területre → {{Presets}} fül. Hozz létre négy pool ablakot: **All**, **Position**, **Gobo**, **Color**. (Kipróbálhatod a **Dynamic**-ot is: ez mindig annak a típusnak a poolját mutatja, ami a Preset Type sávban ki van választva.)', shot: 'ch12-presets-tab', see: 'Négy üres pool ablak, mindegyik fejlécében a típus neve.', mini: 'Ha nem fér el: a pool jobb alsó sarkát (sárga pöttyök) húzd feljebb, így csak egy sor marad belőle.' },
    { t: 'step', title: 'Rendezd el és mentsd view-ba', keys: 'Store', text: 'Rendezd el őket, ahogy kényelmes, majd mentsd egy view gombra, és nevezd el (pl. „Presets”).' },
    { t: 'step', title: 'Színes keret a poolokra', text: 'Kattints a pool bal oldali **sárga golyójára** → {{Frame Color}} → válassz színt bal oldalt a színes kockák közül. Csukd be a sárga X-szel. Csináld meg mind a négynél (a Dynamic poolnál nem kell).', shot: 'ch12-frame-color', see: 'Minden pool kerete más színű, így egy pillantással megtalálod.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Az előadás showjában a presetek fontosak: ha egy pozíciót javítasz, a presetet frissítsd, ne az egyes cue-kat. Így minden jelenet egyszerre javul.' },
    { t: 'checkpoint', items: ['Van All, Position, Gobo és Color pool ablakod, színes kerettel.', 'Az elrendezés el van mentve egy view-ra.'] },
    { t: 'quiz', items: [
      { q: 'Mi történik a cue-kkal, ha átírod a presetet, amit használnak?', a: ['Semmi', 'Mind frissül, mert linket tárolnak', 'Törlődnek'], ok: 1, why: 'A cue a presetre mutató linket tárolja, ezért a preset változása minden ilyen cue-ban látszik.' },
      { q: 'Melyik preset típus tárolhat mindenfélét?', a: ['Position', 'All (0)', 'Color'], ok: 1, why: 'Az All presetek minden típusú értéket tárolhatnak.' }
    ] }
  ]
});
