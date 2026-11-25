MA.lesson({
  id: '06', part: 'prog', title: 'Az első cue', en: 'Store the First Cue', min: 15,
  lead: 'Elmented az első fényállapotot. Megtanulod, hogyan függ össze a cue, a sequence és az executor.',
  learn: ['Cue → Sequence → Executor', 'Sequence Executor Sheet', 'Az első cue tárolása', 'Cue és sequence elnevezése'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Cue, sequence, executor', text: ['A **((Cue))** egy elmentett fényállapot („fotó a színpadról”) az idővel együtt. A cue-k egy **((Sequence))**-be (cue-listába) kerülnek, mindig számsorrendben: a 4-es nem lehet a 3-as előtt.', 'A sequence egy **((Executor))**-on fut — ez a fader és a gombjai, amivel lejátszod. A **Go** indítja a következő cue-t.'], fig: 'hierarchy' },
    { t: 'concept', tag: 'Alapfogalom', title: 'Mi az a fade?', text: ['A **fade** az átúszás ideje: hány másodperc alatt érje el a fény az új állapotot. 0 = azonnal („snap”), 15 = lassú, észrevétlen változás.'] },
    { t: 'step', title: 'Sequence Executor Sheet', text: 'Kell egy hely, ahol látod a cue-kat. Kattints egy üres képernyőterület bal felső sarkába (pl. a Screen 2 alsó részén) → {{Sheets}} → {{Sequence Executor}}.', see: 'Egy üres táblázat. Majd ide kerülnek a cue-k.', mini: 'Mentsd el új view-ként, és adj neki értelmes nevet (pl. „Cues”), ne csak „View 2”.' },
    { t: 'step', title: 'Válaszd ki az 1-es executort', keys: 'Select Exec 1 Please', text: 'Ha nem mondasz mást, a pult mindig a **kijelölt executor**-ra tárol. A kijelölt executor névmezője **zöld**.', cmd: 'select exec 1' },
    { t: 'step', title: 'Állíts be fényt', keys: '2 0 At 4 0 Please', text: 'A 20-as csatorna 40%-on.', cmd: 'ch 20 at 40' },
    { t: 'step', title: 'Tárold!', keys: 'Store Please', text: 'Ennyi. Elmentetted a 20-as csatornát 40%-on az 1-es cue-ba, az 1-es sequence-be, az 1-es executorra.', cmd: 'store', see: 'A Sequence Executor Sheetben megjelent egy sor: **1 · Cue 1 · Go**. Az executoron „Sequ” felirat.' },
    { t: 'h', text: 'A táblázat oszlopai' },
    { t: 'table', head: ['Oszlop', 'Jelentés'], rows: [
      ['Number', 'a cue száma'], ['Name', 'a cue neve'], ['Trig', 'mi indítja — most **Go**: a Go gombra indul'],
      ['Fade / Out Fade', 'átúszás ideje (beúszó / kiúszó fény)'], ['Delay / Out Delay', 'várakozás indulás előtt']
    ] },
    { t: 'h', text: 'Nevek' },
    { t: 'step', title: 'Nevezd el a cue-t', keys: 'Assign Assign Cue 1 Please', text: 'Írd be: `Behind Curtain`, Enter. Másik mód: **jobb klikk** a Name cellára.', cmd: 'label cue 1 "Behind Curtain"', see: 'Az 1-es cue neve „Behind Curtain”. Mivel a sequence-nek még nincs neve, az executoron is ez látszik.' },
    { t: 'step', title: 'Nevezd el a sequence-et', keys: 'Assign Assign Sequ 1 Please', text: 'A **Sequ** gomb a sequence-et jelenti. A felugró ablakba írd be: `Main Show`, Enter.', cmd: 'Label Sequence 1', fb: 'Executing : Label Sequence 1 "Main Show"', see: 'Az executor névmezőjén „Main Show” áll.' },
    { t: 'step', title: 'Oszlopszélesség', text: 'Ha nem látszik a teljes név: vidd az egeret a „Name” és „Trig” fejléc közötti vonalra, és húzd jobbra. Utána mentsd újra a view-t, hogy megmaradjon.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'Az előadás fő cue-listája általában az 1-es executoron, a nagy fadereken van. Ott a Go-t nyomod az előadás alatt — programozás közben vigyázz, nehogy véletlenül Go-t nyomj élő előadásban!' },
    { t: 'checkpoint', items: ['Van egy Sequence Executor Sheeted.', 'Cue 1 „Behind Curtain” tárolva, a sequence neve „Main Show”.'] },
    { t: 'quiz', items: [
      { q: 'Hova tárol a Store, ha nem mondasz cue számot?', a: ['A kijelölt executor sequence-ébe, a következő szabad számra', 'Mindig a 100-as cue-ba', 'Sehova'], ok: 0, why: 'A kijelölt (zöld) executor sequence-ébe ment, a következő szabad egész számra.' },
      { q: 'Hogyan adsz nevet a sequence-nek?', a: ['[[Assign Assign Sequ 1 Please]], majd beírod a nevet', '[[Store Store]]', 'Sehogy, csak a cue-nak lehet neve'], ok: 0, why: 'Assign kétszer = Label. Utána megmondod, mit nevezel el (Sequ 1), és a felugró ablakba írod a nevet.' }
    ] }
  ]
});
