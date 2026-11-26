# MA2 Tanuló — grandMA2 onPC tanfolyam magyarul

Interaktív, magyar nyelvű tanulósegéd a hivatalos **grandMA2 Quick Start Guide** (v3.9) alapján, kezdőknek.
A lépéseket a **grandMA2 onPC**-ben kell megcsinálni — ez az oldal mellette fut, és megmutatja, melyik gombot nyomd és mit kell látnod.

**Megnyitás:** https://disabledbread.github.io/pult-tanulo/

## Mi van benne
- 15 lecke (00–14): show létrehozása, patch, ablakok és view-k, csatornák, groupok, cue-k, sequence szerkesztés, moving lightok, presetek, második sequence
- Minden lépésnél: a megnyomandó gombok + billentyűparancsok (onPC shortcut mód), és hogy mit kell látnod
- Valódi onPC képernyőképek (grandMA2 onPC 3.9.63)
- Rövid kvízek, „A színházban” tippek
- Témakörök (gyors receptek), Billentyűk, Szótár
- Belépés csak névvel (jelszó/email nélkül): a haladás a szerverre mentődik, bármelyik gépről folytatható
- „Folytatás” menü, Profil oldal
- Záróvizsga: a tanuló feltölti a .show.gz fájlt, az oktató az oldalon ad visszajelzést (Elfogadva / Javítandó)
- Admin oldal (lap alja → Admin): mindenki haladása %-ban, vizsgák letöltése és értékelése
- Két megjelenés: MA2 (alap) és Modern

## Szerver (Supabase)
- A kapcsolat adatai: `assets/js/config.js` (csak a nyilvános *anon* kulcs — a service_role kulcs SOHA ne kerüljön ide).
- Adatbázis-beállítás: `supabase/setup.sql` (egyszer kell lefuttatni a Supabase SQL Editorban).
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
