# MA2 Tanuló — grandMA2 onPC tanfolyam magyarul

Interaktív, magyar nyelvű tanulósegéd a hivatalos **grandMA2 Quick Start Guide** (v3.9) alapján, kezdőknek.
A lépéseket a **grandMA2 onPC**-ben kell megcsinálni — ez az oldal mellette fut, és megmutatja, melyik gombot nyomd és mit kell látnod.

**Megnyitás:** https://disabledbread.github.io/pult-tanulo/

## Mi van benne
- 15 lecke (00–14): show létrehozása, patch, ablakok és view-k, csatornák, groupok, cue-k, sequence szerkesztés, moving lightok, presetek, második sequence
- 7 extra lecke (15–21, nem számít bele a %-ba): könnyű effektek és strobe (+ Stomp a következő cue-ban), Pan/Tilt offset, „direkt kapcsoló” fixture type, Toggle gomb, Layout View, Timecode, MIDI
- Minden lecke végén „Elvégeztem, mehet a következő” gomb (a lépésenkénti pipák nem kötelezők)
- Minden lépésnél: a megnyomandó gombok + billentyűparancsok (onPC shortcut mód), és hogy mit kell látnod
- Valódi onPC képernyőképek (grandMA2 onPC 3.9.63)
- Rövid kvízek, „A színházban” tippek
- Témakörök (gyors receptek), Billentyűk, Szótár
- Belépés csak névvel (jelszó/email nélkül): a haladás a szerverre mentődik, bármelyik gépről folytatható
- Biztonság közös gépen: oldal-frissítéskor és 10 perc tétlenség után automatikus kilépés (az admin is)
- Hibajelzés: minden lépésnél és leckénél zászló gomb, megjegyzéssel; az admin oldalon látszik (Megoldva / Törlés)
- „Folytatás” menü, Profil oldal
- Záróvizsga két részben: 1. elméleti teszt (30 véletlen kérdés, időmérés, legalább 80%, bármennyi próba), 2. a .show.gz feltöltése — az oktató az oldalon ad visszajelzést (Elfogadva / Javítandó)
- Admin oldal (lap alja → Admin): mindenki haladása %-ban, vizsgák letöltése és értékelése

## Szerver (Supabase)
- A kapcsolat adatai: `assets/js/config.js` (csak a nyilvános *anon* kulcs — a service_role kulcs SOHA ne kerüljön ide).
- Adatbázis-beállítás: `supabase/setup.sql`, utána `supabase/quiz-reports.sql` (egyszer kell lefuttatni a Supabase SQL Editorban).
- Admin: Supabase → Authentication → Users → új felhasználó, majd felvétel az `admins` táblába (lásd a setup.sql végét).
- A záróvizsga feladatlistája: `assets/js/data/exam.js`.

## Helyi futtatás
Csak egy böngésző kell. Windows-on PowerShellben:

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Utána: http://localhost:5173/

---
Nem hivatalos tanulósegéd. A grandMA2 és az MA Lighting az MA Lighting Technology GmbH védjegyei.
