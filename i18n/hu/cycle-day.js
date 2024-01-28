export const mucusNFP = ['t', 'Ø', 'f', 'S', 'S+']
export const intensity = ['alacsony', 'közepes', 'magas']

export const bleeding = {
  labels: ['pöttyöző', 'gyenge', 'közepes', 'erős'],
  heaviness: {
    header: "Erősség",
    explainer: "Mennyire erős a vérzés?",
  },
  exclude: {
    header: "Kizárás",
    explainer: "Ezt az értéket kizárhatod, ha nem menstruációs vérzésről van szó."
  }
}

export const cervix = {
  subcategories: {
    opening: 'nyitottság',
    firmness: 'szilárdság',
    position: 'pozíció'
  },
  opening: {
    categories: ['zárt', 'közepes', 'nyitott'],
    explainer: 'Nyitott vagy zárt a méhnyak?'
  },
  firmness: {
    categories: ['kemény', 'puha'],
    explainer: "Amikor kemény, olyan érzés lehet, mintha az orrod hegye lenne."
  },
  position: {
    categories: ['alacsony', 'közepes', 'magas'],
    explainer: 'Milyen magasan van a méhnyak a hüvelyben?'
  },
  excludeExplainer: "Ezt az értéket kizárhatod, ha nem szeretnéd használni a termékenység észleléséhez.",
  actionHint: 'Válaszd ki legalább a "Nyitottság" és a "Szilárdság" értékeit a mentéshez.'
}

export const mucus = {
  subcategories: {
    feeling: 'érzés',
    texture: 'textúra'
  },
  feeling: {
    categories: ['száraz', 'semmi', 'nedves', 'csúszós'],
    explainer: 'Milyen érzés a hüvelybemenet?'
  },
  texture: {
    categories: ['semmi', 'krémes', 'tojásfehérje'],
    explainer: "Ha megnézed és megérinted a méhnyakváladékot, melyik írja le a legjobban?"
  },
  excludeExplainer: "Ezt az értéket kizárhatod, ha nem szeretnéd használni a termékenység észleléséhez.",
  actionHint: 'Válaszd ki az "Érzés" és a "Textúra" értékeit a mentéshez.'
}

export const desire = {
  header: 'Intenzitás',
  explainer: 'Hogyan értékelnéd a szexuális vágyadat?'
}

export const sex = {
  categories:{
    solo: 'egyedül',
    partner: 'partnerrel',
  },
  header: "Aktivitás",
  explainer: 'Voltál ma szexuálisan aktív?',
}

export const contraceptives = {
  categories:{
    condom: 'óvszer',
    pill: 'tabletta',
    iud: 'iud',
    patch: 'tapasz',
    ring: 'gyűrű',
    implant: 'implantátum',
    diaphragm: 'pesszárium',
    none: 'semmi',
    other: 'egyéb',
  },
  header: "Fogamzásgátlók",
  explainer: 'Használtál fogamzásgátlót?'
}

export const pain = {
  categories: {
    cramps: 'görcsölés',
    ovulationPain: 'ovulációs fájdalom',
    headache: 'fejfájás',
    backache: 'hátfájás',
    nausea: 'hányinger',
    tenderBreasts: 'érzékeny mellek',
    migraine: 'migrén',
    other: 'egyéb'
  },
  explainer: 'Milyennek érezted ma a tested?'
}

export const mood = {
  categories: {
    happy: 'boldog',
    sad: 'szomorú',
    stressed: 'stresszes',
    balanced: 'kiegyensúlyozott',
    fine: 'jól',
    anxious: 'szorongó',
    energetic: 'energikus',
    fatigue: 'fáradt',
    angry: 'mérges',
    other: 'egyéb'
  },
  explainer: 'Hogy érezted ma magadat?'
}

export const temperature = {
  outOfRangeWarning: 'Ez a hőmérsékleti érték kívül esik a hőmérsékleti diagram aktuális tartományán. A tartományt a beállításokban módosíthatod.',
  outOfAbsoluteRangeWarning: 'Ez a hőmérsékleti érték túl magas vagy túl alacsony ahhoz, hogy megjelenjen a hőmérsékleti diagramon.',
  temperature: {
    header: "Hőmérséklet",
    explainer: 'Ébredés után azonnal mérd meg a lázadat, mielőtt felkelnél az ágyból.'
  },
  time: "Idő",
  note: {
    header: "Jegyzet",
    explainer: 'Van valami, ami befolyásolhatta ezt az értéket, például rossz alvás, vagy alkoholfogyasztás?'
  },
  exclude: {
    header: "Kizárás",
    explainer: "Ezt az értéket kizárhatod, ha nem szeretnéd használni a termékenység észleléséhez."
  }
}

export const noteExplainer = "Szeretnél még valamit hozzátenni a mai napodhoz?"

export const general = {
  cycleDayNumber: "Ciklus nap ",
  today: "Ma"
}

export const sharedDialogs = {
  cancel: 'Mégse',
  areYouSureTitle: 'Biztos vagy benne?',
  areYouSureToDelete: 'Biztos, hogy törölni szeretnéd ezt a bejegyzést?',
  reallyDeleteData: 'Igen, biztos vagyok benne',
  save: 'Mentés',
  delete: 'Törlés',
  disabledInfo: 'Néhány adat hiányzik'
}
