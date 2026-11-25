/* Official default grandMA2 onPC keyboard shortcuts (manual v3.9, "Keyboard shortcuts").
   Active only when Shortcut mode is ON (Insert key or the "Shortcut (Ins)" button). */
(function () {
  const MA = window.MA;
  // [MA key, keyboard shortcut, short Hungarian hint, star = most useful]
  MA.shortcutGroups = [
    {
      title: 'A leggyakoribb gombok', note: 'Ezeket fogod a legtöbbet nyomni programozás közben.', rows: [
        ['Store', 'S', 'tárolás', 1], ['Please', 'Enter', 'végrehajtás', 1], ['At', 'A', 'érték megadása', 1],
        ['Thru', 'Num /', 'tól–ig', 1], ['Clear', 'Delete', 'programmer törlése', 1], ['Oops', 'Backspace', 'visszavonás', 1],
        ['Channel', 'C', 'csatorna', 1], ['Fixture', 'F', 'lámpa', 1], ['Group', 'G', 'csoport', 1],
        ['Preset', 'P', 'preset', 1], ['Cue', 'Alt + C', 'cue', 1], ['Exec', 'X', 'executor', 1],
        ['Update', 'U', 'cue frissítése', 1], ['Edit', 'E', 'szerkesztés', 1], ['Esc', 'Esc', 'kilépés', 1],
        ['If', 'I', 'feltétel (If)', 0], ['Off', 'O', 'kikapcsolás', 0]
      ]
    },
    {
      title: 'Parancs gombok', rows: [
        ['Blind', 'B'], ['Freeze', 'Alt + F'], ['Prvw', 'Ctrl + Alt + P'], ['Assign', 'Alt + A'], ['Align', 'Ctrl + A'],
        ['Fix', 'Ctrl + Alt + F'], ['Select', 'Ctrl + S'], ['Temp', 'Ctrl + Alt + T'], ['Top', 'Alt + T'], ['On', 'Ctrl + O'],
        ['<<<', 'Alt + <'], ['Learn', 'Ctrl + L'], ['>>>', 'Ctrl + Alt + <'], ['Go-', '<'], ['Pause', 'Ctrl + P'], ['Go+', 'Ctrl + <'],
        ['View', 'V'], ['Effect', 'Alt + E'], ['Goto', 'Alt + G'], ['Page', 'Alt + P'], ['Macro', 'M'], ['Sequ', 'Alt + S'],
        ['Delete', 'Ctrl + D'], ['Move', 'Ctrl + M'], ['Copy', 'Ctrl + C'], ['Full', 'Ctrl + F'], ['Highlt', 'H'],
        ['Solo', 'Ctrl + Alt + S'], ['Backg', 'Alt + B'], ['User1', 'Ctrl + U'], ['User2', 'Alt + U'], ['List', 'L'],
        ['MA', 'Shift'], ['.', '.'], ['+', '+'], ['-', '-'], ['Up', '↑'], ['Down', '↓'], ['Prev', '←'], ['Next', '→'], ['Set', 'End'],
        ['U1', 'Alt + F1'], ['U2', 'Alt + F2'], ['U3', 'Alt + F3'], ['U4', 'Alt + F4'], ['Encoder', 'Ctrl + Alt + E']
      ]
    },
    { title: 'Menük', rows: [['Setup', 'F12'], ['Tools', 'Ctrl + F12'], ['Backup', 'Ctrl + Alt + B'], ['Help', 'Ctrl + Alt + H']] },
    {
      title: 'X-gombok (képernyő alatti funkciógombok)', rows: [
        ['X1', 'F1'], ['X2', 'F2'], ['X3', 'F3'], ['X4', 'F4'], ['X5', 'F5'], ['X6', 'F6'], ['X7', 'F7'], ['X8', 'F8'], ['X9', 'F9'], ['X10', 'F10'],
        ['X11', 'Ctrl + F1'], ['X12', 'Ctrl + F2'], ['X13', 'Ctrl + F3'], ['X14', 'Ctrl + F4'], ['X15', 'Ctrl + F5'], ['X16', 'Ctrl + F6'],
        ['X17', 'Ctrl + F7'], ['X18', 'Ctrl + F8'], ['X19', 'Ctrl + F9'], ['X20', 'Ctrl + F10']
      ]
    },
    {
      title: 'Master szekció', rows: [
        ['Large Go (Go+)', 'Space', '', 1], ['Large Go-', 'Ctrl + Space'], ['Large Pause', 'Alt + Space'],
        ['Fd Pg+', 'PgUp'], ['Fd Pg-', 'PgDown'], ['Bn Pg+', 'Ctrl + PgUp'], ['Bn Pg-', 'Ctrl + PgDown'], ['Ch Pg+', 'Alt + PgUp'], ['Ch Pg-', 'Alt + PgDown']
      ]
    },
    {
      title: 'onPC képernyőgombok', rows: [
        ['Screen 2', 'Ctrl + Alt + F2'], ['Screen 3', 'Ctrl + Alt + F3'], ['Screen 4', 'Ctrl + Alt + F4'],
        ['Extern 1', 'Ctrl + Alt + F5'], ['Extern 2', 'Ctrl + Alt + F6'], ['Executor 1–15, 101–115', 'Ctrl + Alt + F7'], ['Executor 16–30, 116–130', 'Ctrl + Alt + F8']
      ]
    },
    { title: 'Ki- és bekapcsolás', rows: [['Shortcut mód be/ki', 'Insert', 'a gombok alatt zárójelben látod a betűt', 1]] }
  ];

  MA.shortcutGroups.forEach((g) => g.rows.forEach(([k, sc]) => { if (!MA.SC[k]) MA.SC[k] = sc; }));
  MA.SC['Go+'] = 'Space';
  MA.SC['Encoder'] = 'Ctrl + Alt + E';
})();
