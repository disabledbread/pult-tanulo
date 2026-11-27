MA.lesson({
  id: '20', part: 'extra', title: 'Timecode', en: 'Timecode', min: 20,
  lead: 'A hangosító timecode-ot küld a zenével együtt, mi pedig felvesszük rá a cue-kat: miközben szól, a megfelelő pillanatban nyomjuk a Go-t. Utána a pult magától, pontosan a zenére hívja a jeleket.',
  learn: ['Mi a timecode', 'Timecode pool és szerkesztő', 'Forrás (Slot): Intern gyakorláshoz, a hangosítóé élesben', 'Felvétel: Record + Go', 'Ellenőrzés és lejátszás'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi a timecode?', text: ['A **timecode** egy óra (óra : perc : másodperc . képkocka), amit a **hangosító** küld a zenével együtt. Ha a zene a 12. másodpercnél tart, a timecode is 12-t mutat.', 'Mi csak **felvesszük rá a cue-kat**: amikor jön a zene, a megfelelő pillanatban Go-t nyomunk. A pult megjegyzi, mikor nyomtuk, és legközelebb magától, pontosan ott nyomja.'] },
    { t: 'tip', kind: 'onpc', title: 'Gyakorlás hangosító nélkül', text: 'onPC-n a pult saját órájával (**Intern**) gyakorolsz: a felvétel ugyanúgy megy, csak az idő nem kívülről jön. Semmit nem kell telepíteni.' },
    { t: 'h', text: 'Előkészítés' },
    { t: 'step', title: 'Timecode pool', text: 'Kattints egy üres területre → {{Pools}} → {{Timecode Pool}}.', see: 'A pool bal felső sarkában: **SMPTE Slot 1** és **MIDI Slot 2** — itt látszik az idő, ha a hangosító küldi.' },
    { t: 'step', title: 'Új timecode show', text: '**Jobb klikk** az 1-es gombra. Megnyílik a **Timecode** szerkesztő: fent a lejátszó gombok (vissza, stop, pause, play, előre, piros ● = felvétel).' },
    { t: 'step', title: 'Forrás: Slot', text: 'Kattints a szerkesztő bal felső **sárga gombjára** → **Timecode Options**. A **Slot** mezőben: gyakorláshoz {{Intern}}. A színházban azt a slotot választod, amin a hangosító timecode-ja jön.', shot: 'tc-options', mini: 'A többihez most ne nyúlj. Bezárás: sárga X.' },
    { t: 'h', text: 'Felvétel' },
    { t: 'step', title: 'Record', text: 'Nyomd meg a piros **●** gombot. Intern-nél az óra azonnal indul. Élesben akkor indul, amikor a hangosító elindítja a zenét (és vele a timecode-ot).' },
    { t: 'step', title: 'Go a megfelelő pillanatban', text: 'Ahol a cue-nak jönnie kell, nyomd meg a sequence executorának **Go** gombját. Annyiszor, ahány cue kell.' },
    { t: 'step', title: 'Stop', text: 'A végén nyomd meg a **■** (stop) gombot, majd a **|◀** gombbal tekerj vissza az elejére.', shot: 'tc-view', see: 'Az executor sávján nyilak: ezek a Go-k.' },
    { t: 'step', title: 'Ellenőrizd az időket', text: 'A szerkesztőben jobb oldalt kattints a {{Text}}-re: listában látod, melyik cue hány másodpercnél jön (pl. 2.17 s Goto Cue 1). Ha egy kicsit csúszik, a **Time** cellában átírhatod.', shot: 'tc-editor' },
    { t: 'h', text: 'Lejátszás' },
    { t: 'step', title: 'Play', text: 'Nyomd meg a **▶** gombot: a pult magától hívja a cue-kat a felvett időpontokban. Élesben: elindítod a timecode show-t, és a hangosító timecode-ja viszi.' },
    { t: 'tip', kind: 'info', title: 'Ha elrontottad', text: 'Jelöld ki a rossz eseményt, és {{Delete Selected}} — vagy vedd fel újra az egészet.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Mielőtt felveszel, egyeztess a hangosítóval: tényleg jön-e a timecode (a Timecode pool sarkában pörög az idő). Felvétel után mindig nézd végig egyben a zenével.' },
    { t: 'checkpoint', items: ['Van egy timecode show az 1-es helyen, Slot: Intern.', 'Felvettél rá legalább két Go-t.', 'Play-re a pult magától hívja a cue-kat.'] },
    { t: 'quiz', items: [
      { q: 'Ki küldi a timecode-ot élesben?', a: ['A hangosító (a zenével együtt)', 'A fénypult magától', 'A rendező'], ok: 0, why: 'A hang lejátszója küldi; a fénypult arra veszi fel és arra játssza vissza a cue-kat.' },
      { q: 'Hogyan veszed fel a cue-kat?', a: ['● Record, majd a megfelelő pillanatban Go', 'Minden cue-hoz beírod a Delay-t', 'Az Effect Editorban'], ok: 0, why: 'Felvétel közben a Go-nyomásokat jegyzi meg a pult a pontos idővel.' }
    ] }
  ]
});
