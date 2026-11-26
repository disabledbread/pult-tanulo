/* Záróvizsga — feladatlista.
   TERVEZET: a végleges feladatokat az oktató adja meg. Itt nyugodtan átírható:
   minden feladat: { id, title, text }. Az id maradjon egyedi (a visszajelzés ehhez kapcsolódik). */
window.MA.exam = {
  draft: true,
  title: 'Záróvizsga: saját show',
  intro: 'Készíts egy új showt a grandMA2 onPC-ben a lenti feladatok szerint, mentsd el, és töltsd fel a .show.gz fájlt. Az oktató betölti, ellenőrzi, és itt kapsz visszajelzést.',
  tasks: [
    { id: 'show', title: 'Új show a saját neveddel', text: 'Backup → New Show, név: `vizsga-` + a neved (pl. `vizsga-kati`), Check All.' },
    { id: 'patch', title: 'Patch', text: 'Dimmerek és moving lightok az oktató által megadott számban és címeken.' },
    { id: 'groups', title: 'Groupok', text: 'Elnevezett groupok a fényterv szerint.' },
    { id: 'presets', title: 'Presetek', text: 'Elnevezett Position, Color és Gobo presetek.' },
    { id: 'cues', title: 'Cue-k', text: 'Elnevezett cue-k az 1-es executoron, a Sequence sheetben beírt időkkel, egy blackouttal a végén.' },
    { id: 'views', title: 'View', text: 'Legalább egy elnevezett view.' },
    { id: 'save', title: 'Mentés és feltöltés', text: 'Backup → Save Show, majd töltsd fel itt a .show.gz fájlt.' }
  ]
};
