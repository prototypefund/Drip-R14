import labels from './settings'
const settingsTitles = labels.menuTitles

export const shared = {
  cancel: 'Annuler',
  save: 'Enregistrer',
  errorTitle: 'Erreur',
  successTitle: 'Réusite',
  warning: 'Attention',
  incorrectPassword: 'Mot de passe incorrect',
  incorrectPasswordMessage: 'Ce mot de passe est incorrect.',
  tryAgain: 'Réessayez',
  ok: 'OK',
  confirmToProceed: 'Confirmez pour continuer',
  date: 'Date',
  cycleDayWithLinebreak: 'Jour du\ncycle',
  loading: 'Chargement…',
  noDataWarning: 'Vous n\'avez pas encore entré de données.',
  noTemperatureWarning: 'Vous n\'avez pas encore renseigné de température.',
  noDataButtonText: 'Commencer à entrer des données',
  enter: 'Entrer',
}

export const headerTitles = {
  Home: 'Accueil',
  Calendar: 'Calendrier',
  Chart: 'Graphique',
  Stats: 'Statistiques',
  SettingsMenu: 'Paramètres',
  Reminders: settingsTitles.reminders,
  NfpSettings: settingsTitles.nfpSettings,
  DataManagement: settingsTitles.dataManagement,
  Password: settingsTitles.password,
  About: settingsTitles.about,
  License: settingsTitles.license,
  bleeding: 'Saignements',
  temperature: 'Température',
  mucus: 'Glaire cervicale',
  cervix: 'Col de l'utérus',
  note: 'Note',
  desire: 'Désir',
  sex: 'Sexe',
  pain: 'Douleurs',
  mood: 'Humeur',
  InfoSymptom: 'Info'
}

export const menuTitles = {
  Home: 'Accueil',
  Calendar: 'Calendrier',
  Chart: 'Graphique',
  Stats: 'Stats',
  Settings: 'Paramètres',
  PasswordPrompt: 'Drip'
}

export const stats = {
  cycleLengthTitle: 'Longueur du cycle',
  cycleLengthExplainer: 'Statistiques simples sur la longueur de vos cycles.',
  emptyStats: 'Il faut renseigner au moins un cycle complet pour voir des statistiques.',
  //oneCycleStats: (number) => `Vous avez enregistré un cycle de ${number} jours.`,
  oneCycleStats: 'Vous avez enregistré un cycle de',
  daysLabel: 'jours',
  //getBasisOfStats: (numberOfCycles) => `Stats are based on ${numberOfCycles} completed cycles.`,
  basisOfStatsBeginning: "Les statistiques s'appuient sur",
  basisOfStatsEnd: 'cycles enregistrés.',
  averageLabel: "Longueur moyenne d'un cycle",
  minLabel: 'Cycle le plus court',
  maxLabel: 'Cycle le plus long',
  stdLabel: 'Écart type'
}

export const bleedingPrediction = {
  noPrediction: "Il n'y a pas assez de données pour prédire vos prochaines règles.",
  predictionInFuture: (startDays, endDays) => `Vos prochaines règles commenceront probablement dans ${startDays} à ${endDays} jours.`,
  predictionStartedXDaysLeft: (numberOfDays) => `Vos règles commenceront probablement aujourd'hui ou dans les ${numberOfDays} prochains jours.`,
  predictionStarted1DayLeft: "Vos règles commenceront probablement aujourd'hui ou demain.",
  predictionStartedNoDaysLeft: "Vos règles commenceront probablement aujourd'hui.",
  predictionInPast: (startDate, endDate) => `D'après vos données entrées dans l'application, vos règles auraient probablement commencé entre le ${startDate} et le ${endDate}.`
}

export const passwordPrompt = {
  title: "Déverrouiller l'application",
  enterPassword: 'Tapez votre mot de passe ici',
  deleteDatabaseExplainer: "Si vous avez oublié votre mot de passe, malheureusement, il nous est impossible de retrouver vos données parce qu'elles sont chiffrées avec le mot de passe que vous êtes seul·e à connaître. En revanche, vous pouvez supprimer toutes vos données et recommencer à zéro. Une fois que vos données seront effacées, vous pourrez, si vous le souhaitez, définir un nouveau mot de passe dans les paramètres.",
  forgotPassword: 'Mot de passe oublié\xa0?',
  deleteDatabaseTitle: 'Mot de passe oublié\xa0?',
  deleteData: 'Oui, effacer toutes mes données',
  areYouSureTitle: 'Êtes-vous sûr·e\xa0?',
  areYouSure: 'Êtes-vous absolument certain·e de vouloir effacer définitivement toutes vos données\xa0?',
  reallyDeleteData: 'Oui, je suis sûr·e'
}

export const home = {
  editToday: 'ajouter des données pour la journée',
  cycleDayNotEnoughInfo: "Nous n'avons pas assez d'informations pour savoir à quel jour de votre cycle vous en êtes.",
  unknown: '?',
  cycleDayKnown: d => `Vos dernières règles ont commencé ${getDaysDescriptor(d)}.`,
  trackPeriod: 'entrer des saignements',
  checkFertility: 'vérifier la fertilité',
  phase: n => `${['1re', '2e', '3e'][n - 1]} phase du cycle`,
}

const getDaysDescriptor = cycleDayNumber => {
  if (cycleDayNumber === 1) return "aujourd'hui"
  if (cycleDayNumber === 2) return 'hier'
  return `il y a ${cycleDayNumber - 1} jours`
}

export const fertilityStatus = {
  fertile: 'fertile',
  infertile: 'infertile',
  fertileUntilEvening: 'La phase fertile se termine ce soir',
  unknown: "Nous ne pouvons afficher aucune information sur votre cycle parce qu'aucune donnée de règles n'a été ajoutée.",
  preOvuText: "Avec les règles de la MOC, vous pouvez partir du principe que les 5 premiers jours de vos cycles sont infertiles tant que vous n'observez pas de glaire cervicale ou de position du cervix qui traduirait une fertilité.",
  periOvuText: "Nous n'avons pas pu détecter à la fois une augmentation de la température et un changement significatif de la glaire cervicale ou du col de l'utérus. Vous trouverez plus d'informations sur nos règles de MOC ici\xa0:",
  postOvuText: tempRule => {
    return (
      "Nous avons détecté une augmentation de la température (règle " + ["normale", "1re exception", "2e exception"][tempRule] + "), ainsi qu'un changement dans la glaire cervicale tel que décrit par les règles de MOC. Vous pouvez vous " +
      "considérer comme infertile, mais vérifiez par vous-même. Assurez-vous que vous comprenez les données."
    )
  }
}
