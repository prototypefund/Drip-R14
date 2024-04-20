import links from './links'

export default {
  export: {
    errors: {
      noData: 'Nincsenek exportálható adatok',
      couldNotConvert: 'Nem sikerült az adatokat CSV-be konvertálni',
      problemSharing: 'Probléma adódott az adatexport fájl megosztásával',
    },
    title: 'Az én drip. adat exportálásom',
    subject: 'Az én drip. adat exportálásom',
    button: 'Adatok exportálása',
    segmentExplainer:
      'Az adatok exportálása CSV formátumban biztonsági mentéshez vagy máshol történő felhasználáshoz',
  },
  deleteSegment: {
    title: 'Alkalmazás adatainak törlése',
    explainer: 'Alkalmazásadatok törlése erről a telefonról',
    question: 'Szeretnéd törölni az alkalmazásadatokat erről a telefonról?',
    message:
      'Felhívjuk figyelmedet, hogy az alkalmazás adatainak törlése végleges és visszafordíthatatlan. A törlés előtt javasoljuk a meglévő adatok exportálását.',
    confirmation: 'Alkalmazás adatainak végleges törlése',
    errors: {
      couldNotDeleteFile: 'Nem sikerült törölni az adatokat',
      postFix: 'Nem törlődtek, vagy változtak meg az adatok',
      noData: 'Nincs törölhető adat',
    },
    success: {
      message: 'Az alkalmazás adatai sikeresen törlődtek',
    },
  },
  tempScale: {
    segmentTitle: 'Hőmérséklet skála',
    segmentExplainer:
      'A hőmérsékleti diagram minimális és maximális értékének módosítása',
    min: 'Min',
    max: 'Max',
    loadError: 'Nem sikerült betölteni az elmentett hőmérsékleti skála beállításokat',
    saveError: 'Nem sikerült elmenteni a hőmérsékleti skála beállításait',
  },
  tempReminder: {
    title: 'Hőmérséklet emlékeztető',
    noTimeSet: 'Állítsd be a napi emlékeztető időpontját a hőmérséklet mérésére',
    timeSet: (time) => `Napi emlékeztető beállítva ${time}-ra/-re`,
    notification: 'Rögzítsd a reggeli hőmérsékletedet',
  },
  periodReminder: {
    title: 'Következő periódus emlékeztető',
    reminderText:
      'Kapj értesítést 3 nappal a következő periódusod várható kezdete előtt.',
    notification: (daysToEndOfPrediction) =>
      `A következő periódusod valószínűleg 3 és ${daysToEndOfPrediction} nap múlva kezdődik.`,
    alertNoPeriodReminder: {
      title: 'Periódus emlékeztető kikapcsolva',
      message:
        'A periódus emlékeztető használatához először engedélyezd a periódus emlékeztetést a beállításokban.',
    },
  },
  useCervix: {
    title: 'Másodlagos tünet',
    cervixModeOn:
      'A méhnyak értékeket tüneti termékenység kimutatására használják. Itt válthatsz, hogy az alkalmazás a méhnyaknyálkahártya-értékeket használja a tüneti termékenység kimutatására. ',
    cervixModeOff:
      'Alapértelmezés szerint a méhnyakváladék-értékeket használják a tüneti termékenység kimutatására. Itt válthatsz, hogy az alkalmazás a méhnyak értékeket használja a tüneti termékenység kimutatására.',
  },
  periodPrediction: {
    title: 'Periódus előrejelzés',
    on: 'a drip a korábban nyomon követett ciklusok statisztikái alapján (min. 3 teljes ciklusból) megjósolja a 3 következő menstruációs vérzést.',
    off: 'A menstruációs ciklusokra vonatkozóan nincsenek emlékeztetők. Ha bekapcsolod, a naptár és a kezdőképernyő megjeleníti a menstruációs előrejelzéseket.',
  },
  passwordSettings: {
    title: 'Alkalmazás jelszó',
    explainerDisabled:
      "Titkosítja az alkalmazás adatbázisát egy jelszóval. A jelszót minden alkalommal meg kell adnod, amikor az alkalmazást elindítod.",
    explainerEnabled:
      'A jelszavas védelem és az adatbázis titkosítása jelenleg engedélyezve van',
    setPassword: 'Jelszó beállítása',
    savePassword: 'Jelszó mentése',
    changePassword: 'Jelszó módosítása',
    deletePassword: 'Jelszó törlése',
    enterCurrent: 'Kérjük, add meg a jelenlegi jelszavadat',
    enterNew: 'Kérjük, adj meg egy új jelszót',
    confirmPassword: 'Kérjük, erősítsd meg a jelszót',
    passwordsDontMatch: "A jelszó és a megerősítés nem egyezik",
    backupReminder: {
      title: 'Olvasd el ezt, mielőtt megváltoztatnád a jelszavadat',
      message: `
A biztonság kedvéért, kérjük, készíts biztonsági másolatot az adataidról az exportálás funkcióval, mielőtt bármilyen változtatást eszközölnél a jelszavadon.\n
A hosszabb jelszavak jobbak! Fontold meg a jelmondat használatát.\n
Kérjük, győződj meg arról is, hogy nem veszíted el jelszavadat. Ha mégis megteszed, nincs mód az adatok helyreállítására.\n
A jelszóbeállítások megváltoztatásával az adatok maradnak a korábbi állapotukban.\n`,
    },
    deleteBackupReminder: {
      title: 'Olvasd el ezt, mielőtt törölnéd a jelszavadat',
      message: `
A jelszó törlése azt jelenti, hogy az adatok többé nem lesznek titkosítva.\n
A biztonság kedvéért kérjük, hogy mielőtt törölnéd jelszavadat, készíts egy biztonsági mentést adataidról az exportálás funkcióval.\n
A jelszóbeállítások megváltoztatásával az adatok a korábbi állapotukban maradnak, és az alkalmazás újraindul.\n    
    `,
    },
    backupReminderAppendix: {
      android:
        'A jelszó frissítése után az alkalmazás automatikusan újraindul.',
      ios: 'A jelszó frissítése után az alkalmazás automatikusan bezárul. Kérjük, nyisd meg újra manuálisan.',
    },
  },
  website: {
    title: 'Weboldal',
  },
  preOvu: {
    title: 'Terméketlen napok a ciklus kezdetén',
    note: `A drip. az NFP terméketlen napok kiszámítására vonatkozó szabályokat alkalmazza a ciklus elején (további információért lásd ${links.wiki.url}). A drip. azonban jelenleg nem alkalmazza az ún. 20 napos szabályt, amely a terméketlen napokat a ciklus kezdetén a múltbeli ciklushosszból határozza meg, amennyiben nem áll rendelkezésre múltbeli tüneti információ.`,
  },
}

