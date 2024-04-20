export const home = {
  unknown: '?',
  phase: (n) => `${['1.', '2.', '3.'][n - 1]} ciklus szakasz`,
}

export const shared = {
  cancel: 'Mégse',
  save: 'Mentés',
  dataSaved: 'Tüneti adatok mentése megtörtént',
  dataDeleted: 'Tüneti adatok törlése megtörtént',
  errorTitle: 'Hiba',
  successTitle: 'Sikeres',
  warning: 'Figyelmeztetés',
  incorrectPassword: 'Helytelen jelszó',
  incorrectPasswordMessage: 'Ez a jelszó helytelen.',
  tryAgain: 'Próbáld újra',
  ok: 'OK',
  confirmToProceed: 'Erősítsd meg a folytatáshoz',
  date: 'Dátum',
  loading: 'Betöltés ...',
  noDataWarning: "Még nem adtál meg semmilyen adatot.",
  noTemperatureWarning: "Még nem adtál meg semmilyen hőmérsékleti adatot.",
  noDataButtonText: 'Kezdd el az adatok bevitelét most',
  enter: 'Bevitel',
  remove: 'Eltávolítás',
  learnMore: 'Tudj meg többet',
}

export const stats = {
  cycleLengthExplainer: 'Alapvető statisztikák a ciklusok hosszáról.',
  emptyStats: 'A statisztikák megjelenítéséhez legalább egy befejezett ciklusra van szükség.',
  daysLabel: 'napok',
  basisOfStatsEnd: 'befejezett\nciklusok',
  averageLabel: 'Átlagos ciklus',
  minLabel: `Legrövidebb`,
  maxLabel: `leghosszabb`,
  stdLabel: `Normál\neltérés`,
}

export const bleedingPrediction = {
  predictionInFuture: (startDays, endDays) =>
    `A következő periódusod valószínűleg ${startDays} - ${endDays} napon belül kezdődik.`,
  predictionStartedXDaysLeft: (numberOfDays) =>
    `A következő periódusod valószínűleg ma, vagy a következő ${numberOfDays} napban kezdődik.`,
  predictionStarted1DayLeft:
    'A következő periódusod valószínűleg ma, vagy holnap kezdődik.',
  predictionStartedNoDaysLeft: 'A következő periódusod valószínűleg ma kezdődik',
  predictionInPast: (startDate, endDate) =>
    `A dokumentált adataid alapján a következő periódusod valószínűleg ${startDate} és ${endDate} között kezdődik.`,
}

export const passwordPrompt = {
  title: 'Alkalmazás feloldása',
  enterPassword: 'Írd be ide a jelszavadat',
  deleteDatabaseExplainer:
    "Ha elfelejtetted a jelszavadat, sajnos mi nem tehetünk semmit az adatok visszaállítása érdekében, mert azok titkosítva vannak azzal a jelszóval, amelyet csak Te ismersz. Törölheted azonban az összes titkosított adatot, és újrakezdheted. Az összes adat törlése után, ha akarod, új jelszót állíthatsz be a beállításokban.",
  forgotPassword: 'Elfelejtetted a jelszavadat?',
  deleteDatabaseTitle: 'Elfelejtetted a jelszavadat?',
  deleteData: 'Igen, törölje az összes adatomat',
  areYouSureTitle: 'Biztos vagy benne?',
  areYouSure:
    'Teljesen biztos vagy benne, hogy véglegesen törölni szeretnéd az összes adatodat?',
  reallyDeleteData: 'Igen, biztos vagyok benne',
}

export const fertilityStatus = {
  fertile: 'termékeny',
  infertile: 'terméketlen',
  fertileUntilEvening: 'A termékenységi szakasz este ér véget',
  unknown:
    'Nem tudunk semmilyen ciklusinformációt megjeleníteni, mivel nem adtál hozzá periódus adatokat.',
  preOvuText:
    "Az NFP szabályai szerint a ciklus elején 5 napos terméketlenséget feltételezhetsz, feltéve, hogy nem észlelsz termékeny méhnyakváladékot vagy méhnyak értékeket.",
  periOvuText:
    'Nem tudtuk kimutatni sem a hőmérséklet-eltolódást, sem a méhnyak nyálkahártyát, sem a méhnyak eltolódását.',
  periOvuUntilEveningText: (tempRule) => {
    return (
      'Hőmérséklet-eltolódást észleltünk (' +
      ['rendszeres', '1. kivétel', '2. kivétel'][tempRule] +
      ' hőmérsékleti szabály), valamint a méhnyaknyálkahártya/nyakszáj eltolódása az NFP szabályai szerint. Ma este terméketlenséget feltételezhetsz, de ' +
      'mindig emlékezz arra, hogy kétszer is ellenőrizd magad. Győződj meg róla, hogy az adatoknak van-e értelmük a számodra.'
    )
  },
  postOvuText: (tempRule) => {
    return (
      'Hőmérséklet-eltolódást észleltünk (' +
      ['rendszeres', '1. kivétel', '2. kivétel'][tempRule] +
      ' hőmérsékleti szabály), valamint a méhnyaknyálkahártya/nyakszáj eltolódása az NFP szabályai szerint. Terméketlenséget feltételezhetsz, de mindig emlékezz arra, ' +
      'hogy kétszer is ellenőrizd magad. Győződj meg róla, hogy az adatoknak van-e értelmük a számodra.'
    )
  },
}

