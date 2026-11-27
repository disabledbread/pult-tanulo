MA.lesson({
  id: '21', part: 'extra', title: 'MIDI', en: 'MIDI Show Control & MIDI Remotes', min: 15,
  lead: 'MIDI-vel egy másik gép (pl. a hang lejátszója) vagy egy MIDI eszköz tudja nyomni a pult gombjait. Két dolgot nézünk: MIDI Show Control (GO/STOP parancs) és MIDI hang → executor gomb.',
  learn: ['Mi a MIDI, mire használjuk', 'MIDI Show Control beállítása', 'MIDI hang → executor (MIDI Remotes)', 'Hogyan ellenőrzöd, hogy jön-e jel'],
  blocks: [
    { t: 'concept', tag: 'Alapfogalom', title: 'Két felhasználás', text: ['**MIDI Show Control (MSC):** egy másik gép GO, STOP stb. parancsot küld, a pult pedig lépteti a cue-listát — mintha te nyomnád a Go-t.', '**MIDI hang → executor:** egy MIDI hang (pl. egy billentyű vagy a lejátszó által küldött 60-as hang) megnyom egy executor gombot.'] },
    { t: 'tip', kind: 'onpc', title: 'onPC-n csak beállítás', text: 'Kipróbálni csak MIDI eszközzel vagy a hangosító gépével lehet. onPC-n a beállításokat gyakorold — semmit nem kell telepíteni.' },
    { t: 'h', text: 'MIDI Show Control' },
    { t: 'step', title: 'Nyisd meg', keys: 'Setup', text: '**Setup** → a **Console** oszlopban: {{MIDI Show Control}}.', shot: 'midi-setup' },
    { t: 'step', title: 'Bemenet bekapcsolása', text: 'Az **MSC In Mode** mezőben válaszd: {{MIDI}} (MIDI kábelen jön) vagy {{Ethernet}} (hálózaton jön). Alapból **Disabled** (ki van kapcsolva).', shot: 'midi-msc' },
    { t: 'step', title: 'Egyeztess a hangosítóval', text: 'Az **MSC In Device** és **MSC In Group** számának egyeznie kell azzal, amit a küldő gép használ. Az **MSC In Exec: Default Only** azt jelenti: a fő (kiválasztott) executort lépteti.' },
    { t: 'step', title: 'Jön-e jel?', text: 'Ha a hangosító küld egy parancsot, az **MSC In Monitor** mezőben megjelenik. Ha üres marad, nem jön jel — ellenőrizd a kábelt / a beállítást.' },
    { t: 'h', text: 'MIDI hang → executor gomb' },
    { t: 'step', title: 'Remote Inputs', keys: 'Setup', text: '**Setup** → a **Show** oszlopban: {{Remote Inputs Setup}} → {{MIDI Remotes}} fül → {{Add}}.', see: 'Új sor: Name, Note, Channel, Type, Page, Executor, Button.' },
    { t: 'step', title: 'Töltsd ki', text: '**Note**: a MIDI hang száma (pl. `60`). **Type**: jobb klikk → {{Exec}}. **Executor**: az executor száma (pl. `1`). **Button**: jobb klikk → {{Button 1}} (az executor első gombja, ami alapból Go).', shot: 'midi-remote', see: 'A sor: 60 · All · Exec · Current · 1 · Button 1.' },
    { t: 'step', title: 'Bekapcsolva', text: 'Alul az {{Enabled}} legyen bekapcsolva. Zárd be az ablakot és a Setupot.' },
    { t: 'tip', kind: 'theatre', title: 'A színházban', text: 'A MIDI-s indítást mindig próbáld ki az előadás előtt a hangosítóval együtt. Ha nem működik, ne kísérletezz élesben: nyomd a Go-t kézzel.' },
    { t: 'checkpoint', items: ['Megtalálod a MIDI Show Control beállítást, és tudod, hol kapcsolod be (MSC In Mode).', 'Tudsz MIDI Remote sort felvenni: Note → Exec → Executor → Button.'] },
    { t: 'quiz', items: [
      { q: 'Hol kapcsolod be a MIDI Show Control bemenetet?', a: ['Setup → MIDI Show Control → MSC In Mode', 'Setup → Patch', 'A Timecode poolban'], ok: 0, why: 'Alapból Disabled; MIDI-re vagy Ethernetre kell állítani.' },
      { q: 'Hogyan nyom meg egy MIDI hang egy executor gombot?', a: ['Remote Inputs Setup → MIDI Remotes → Note, Exec, Executor, Button', 'Az Assign menüben', 'Az Effect Editorban'], ok: 0, why: 'A MIDI Remotes sorban mondod meg, melyik hang melyik executor melyik gombját nyomja.' }
    ] }
  ]
});
