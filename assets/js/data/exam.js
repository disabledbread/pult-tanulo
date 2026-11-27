/* Záróvizsga — feladatlista (az oktató adta meg).
   Minden feladat: { id, title, text }. Az id maradjon egyedi (a visszajelzés ehhez kapcsolódik). */
window.MA.exam = {
  draft: false,
  title: 'Záróvizsga: kis előadás',
  intro: 'Készíts egy **teljesen új showt** a grandMA2 onPC-ben a lenti feladatok szerint, mentsd el, és töltsd fel a .show.gz fájlt. Az oktató betölti, ellenőrzi, és itt kapsz visszajelzést.',
  tasks: [
    { id: 'show', title: 'Új show: vizsga_final', text: '[[Backup]] → {{New Show}}, név: `vizsga_final`, {{Check All}} → {{Please}}. Teljesen új, üres showból indulj.' },
    { id: 'patch', title: 'Patch', text: '• 5 db **Eurus** — 10-es universe, Fixture ID **1–5**, 41 csatornás módban\n• 5 db **WildSun** wash — 11-es universe, Fixture ID **30–34**\n• 5 dimmer — **56–60.** csatorna\n• 5 dimmer — **61–65.** csatorna\n• 5 **non-dim (direkt kapcsoló)** — a 17. lecke szerinti típussal\n• 1 dimmer — **262.** csatorna, név: `NT`' },
    { id: 'fader', title: 'Executorok (fader page)', text: '• egy show sequence, név: `Buborékok`\n• egy **DIM** gomb **Toggle** funkcióval — benne az összes dimmer\n• egy **NT** húzó (fader) a nézőtéri fényre\n• egy **Munkafény** — a washek 100%-on, fehéren' },
    { id: 'layout', title: 'Layout', text: 'Szépen elrendezett Layout View-k: az egyikben **csak a dimmerek**, a másikban **csak a fixture-ök** (Eurus, WildSun).' },
    { id: 'cues', title: 'Show (cue-k a Buborékok sequence-ben)', text: 'A cue-k pontosan ezeken a számokon legyenek (cue számmal tárolás: [[Store Cue 5 Please]]):\n`5` kezdő sötét\n`7` vas szét, front\n`9` forgó indul, változás fény\n`11` forgás alatt robbanás — strobi\n`13` sötét\n`15` beforgott jelenetfény (tetszés szerint)\n`17` zene indul — szín effekt + dim effekt\n`19` **Follow**, 10 mp késleltetéssel — strobi\n`21` **Follow**, 5 mp késleltetéssel — sötét\n`23` taps\n`25` vas össze (front ki)' },
    { id: 'offset', title: 'Offset', text: 'A **3-as Eurus** Tilt Offsetje: `-2.5`.' },
    { id: 'views', title: 'Nézetek (view gombok)', text: '`1` Channel · `2` Fixture · `3` Track · `4` Layout · `5` DMX' },
    { id: 'save', title: 'Mentés és feltöltés', text: '[[Backup]] → {{Save Show}}, majd töltsd fel itt a `vizsga_final.show.gz` fájlt.' }
  ]
};
