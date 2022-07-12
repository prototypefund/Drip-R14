import labels from './settings'
const settingsTitles = labels.menuItems

export const home = {
  unknown: '?',
  phase: n => `${['1re', '2e', '3e'][n - 1]} phase du cycle`,
  cycleDay: ' jour de votre cycle',
  cyclePhase: ' phase du cycle - ',
  addData: 'ajouter des données pour aujourd’hui'
}

export const chart = {
  tutorial: 'Vous pouvez faire glisser le graphique pour afficher plus de dates.'
}

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
  loading: 'Chargement…',
  noDataWarning: 'Vous n’avez pas encore entré de données.',
  noTemperatureWarning: 'Vous n’avez pas encore renseigné de température.',
  noDataButtonText: 'Commencez à entrer des données',
  enter: 'Entrer',
  remove: 'Supprimer',
  learnMore: 'En savoir plus'
}

export const headerTitles = {
  Home: 'Accueil',
  Calendar: 'Calendrier',
  Chart: 'Graphique',
  Stats: 'Statistiques',
  SettingsMenu: 'Paramètres',
  Reminders: settingsTitles.reminders.name,
  NfpSettings: settingsTitles.nfpSettings.name,
  DataManagement: settingsTitles.dataManagement.name,
  Password: settingsTitles.password.name,
  About: 'À propos',
  License: 'Licence',
  bleeding: 'Saignements',
  temperature: 'Température',
  mucus: 'Glaire cervicale',
  cervix: 'Col de l’utérus',
  note: 'Note',
  desire: 'Désir',
  sex: 'Sexe',
  pain: 'Douleurs',
  mood: 'Humeur'
}

export const stats = {
  cycleLengthExplainer: 'Statistiques simples sur la longueur de vos cycles.',
  emptyStats: 'Il faut renseigner au moins un cycle complet pour voir des statistiques.',
  daysLabel: 'jours',
  basisOfStatsEnd: 'cycles\ncomplets',
  averageLabel: 'Longueur moyenne d’un cycle',
  minLabel: `Le plus court`,
  maxLabel: `Le plus long`,
  stdLabel: `Écart\ntype`
}

export const bleedingPrediction = {
  noPrediction: `Dès que vous aurez complété 3 cycles menstruels, drip commencera à faire des prédictions pour vos cycles suivants.`,
  predictionInFuture: (startDays, endDays) => `Vos prochaines règles commenceront probablement dans ${startDays} à ${endDays} jours.`,
  predictionStartedXDaysLeft: (numberOfDays) => `Vos règles commenceront probablement aujourd’hui ou dans les ${numberOfDays} prochains jours.`,
  predictionStarted1DayLeft: "Vos règles commenceront probablement aujourd’hui ou demain.",
  predictionStartedNoDaysLeft: "Vos règles commenceront probablement aujourd’hui.",
  predictionInPast: (startDate, endDate) => `D’après vos données entrées dans l’application, vos règles auraient probablement commencé entre le ${startDate} et le ${endDate}.`
}

export const passwordPrompt = {
  title: 'Déverrouiller l’application',
  enterPassword: 'Tapez votre mot de passe ici',
  deleteDatabaseExplainer: "Si vous avez oublié votre mot de passe, malheureusement, il nous est impossible de retrouver vos données parce qu’elles sont chiffrées avec le mot de passe que vous êtes seul·e à connaître. En revanche, vous pouvez supprimer toutes vos données et recommencer à zéro. Une fois que vos données seront effacées, vous pourrez, si vous le souhaitez, définir un nouveau mot de passe dans les paramètres.",
  forgotPassword: 'Mot de passe oublié ?',
  deleteDatabaseTitle: 'Mot de passe oublié ?',
  deleteData: 'Oui, effacer toutes mes données',
  areYouSureTitle: 'Êtes-vous sûr·e ?',
  areYouSure: 'Êtes-vous absolument certain·e de vouloir effacer définitivement toutes vos données ?',
  reallyDeleteData: 'Oui, je suis sûr·e'
}

export const fertilityStatus = {
  fertile: 'fertile',
  infertile: 'infertile',
  fertileUntilEvening: 'La phase fertile se termine ce soir',
  unknown: 'Nous ne pouvons afficher aucune information sur votre cycle parce qu’aucune donnée concernant vos règles n’a été ajoutée.',
  preOvuText: "D’après la Méthode d’Observation du Cycle, vous pouvez partir du principe que les 5 premiers jours de vos cycles sont infertiles tant que vous n’observez pas de glaire cervicale ou de position du col de l’uterus qui traduirait une fertilité.",
  periOvuText: "Nous n’avons pas pu détecter à la fois une augmentation de la température et un changement significatif de la glaire cervicale ou du col de l’utérus. Vous trouverez plus d’informations sur les règles de la MOC ici (en anglais) : https://gitlab.com/bloodyhealth/drip/wikis/home",
  postOvuText: tempRule => {
    return (
      'Nous avons détecté un changement de température (règle de temp. ' + ['normale', '1re exception', '2e exception'][tempRule] +
      '), ainsi qu’un changement dans la glaire cervicale tel que décrit par la Méthode d’Observation du Cycle. Vous pouvez vous ' +
      'considérer comme infertile, mais vérifiez par vous-même. Assurez-vous que vous les données aient du sens pour vous.'
    )
  }
}
