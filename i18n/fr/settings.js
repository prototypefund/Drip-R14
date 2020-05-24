import links from './links'

export default {
  menuTitles: {
    reminders: 'Rappels',
    dataManagement: 'Gérer vos données',
    nfpSettings: 'Paramètres MOC',
    password: 'Mot de passe',
    about: 'À propos',
    license: 'Licence'
  },
  export: {
    errors: {
      noData: "Il n'y a pas de données à exporter",
      couldNotConvert: 'Impossible de convertir les données en CSV',
      problemSharing: 'Il y a eu un problème lors du partage du fichier des données exportées'
    },
    title: 'Export de mes données drip',
    subject: 'Export de mes données drip',
    button: 'Exporter les données',
    segmentExplainer: 'Export les données au format CSV pour pouvoir les utiliser ailleurs'
  },
  import: {
    button: 'Importer des données',
    title: 'Conserver les données existantes\xa0?',
    message: `Il y a deux options pour l'import\xa0:
1. Garder les jours entrés et ne remplacer que ceux qui sont aussi dans le fichier à importer.
2. Supprimer toutes les données entrées et ajouter celles du fichier à importer.`,
    replaceOption: 'Importer et remplacer',
    deleteOption: "Importer et supprimer l'existant",
    errors: {
      couldNotOpenFile: "Impossible d'importer le fichier",
      postFix: "Aucune donnée n'a été importée ou modifiée",
      futureEdit: 'Les dates futures ne peuvent contenir que des notes, pas des symptômes'
    },
    success: {
      message: 'Les données ont bien été importées'
    },
    segmentExplainer: 'Import de données au format CSV'
  },
  deleteSegment: {
    title: "Supprimer les données de l'application",
    explainer: 'Supprimer les données de ce téléphone',
    question: "Voulez-vous supprimer les données de l'application sur ce téléphone\xa0?",
    message: 'La suppression des données est permanente et irréversible. Nous vous conseillon de faire une sauvegarde de vos données avant de les supprimer.',
    confirmation: "Supprimer définitivement les données de l'application",
    errors: {
      couldNotDeleteFile: 'Impossible de supprimer les données',
      postFix: "Aucune donnée n'a été supprimée ou modifiée",
      noData: "Il n'y a pas de données à supprimer"
    },
    success: {
      message: 'Les données ont bien été supprimées'
    }
  },
  tempScale: {
    segmentTitle: 'Échelle de températures',
    segmentExplainer: 'Changer les valeurs maximales et minimales pour le graphique de températures',
    min: 'Min',
    max: 'Max',
    loadError: "Impossible de charger l'échelle de température",
    saveError: "Impossible d'enregistrer l'échelle de température"
  },
  tempReminder: {
    title: 'Rappel pour la température',
    noTimeSet: 'Programmer un rappel quotidien pour prendre votre température',
    timeSet: time => `Le rappel a été programmé à ${time}`,
    notification: 'Enregistrez votre température du matin'
  },
  periodReminder: {
    title: 'Rappel pour les prochaines règles',
    reminderText: 'Programmez une notification 3 jours avant la date probable de vos prochaines règles.',
    notification: daysToEndOfPrediction => `Vos prochaines règles commenceront probablement dans 3 à ${daysToEndOfPrediction} jours.`
  },
  useCervix: {
    title: 'Symptôme secondaire',
    cervixModeOn: "L'état de votre col de l'utérus est utilisé pour détecter votre fenêtre de fertilité de façon symptothermique. Vous pouvez choisir ici d'utiliser plutôt la valeur de votre glaire cervicale.",
    cervixModeOff: "Par défaut, la glaire cervicale est utilisée pour détecter votre fenêtre de fertilité de façon symptothermique. Vous pouvez choisir ici d'utiliser plutôt l'état de votre col de l'utérus."
  },
  passwordSettings: {
    title: "Mot de passe de l'app",
    explainerDisabled: "Chiffrez la base de données de l'application avec un mot de passe. Vous devrez entrer votre mot de passe à chaque lancement de l'application.",
    explainerEnabled: "La protection par mot de passe est actuellement activée",
    setPassword: 'Choisir un mot de passe',
    savePassword: 'Enregistrer le mot de passe',
    changePassword: 'Changer de mot de passe',
    deletePassword: 'Supprimer le mot de passe',
    enterCurrent: "Veuillez entrer votre mot de passe actuel",
    enterNew: "Choisissez un nouveau mot de passe",
    confirmPassword: "Confirmez votre mot de passe",
    passwordsDontMatch: "Le mot de passe et la confirmation sont différentes",
    backupReminderTitle: 'Lisez ceci avant de changer votre mot de passe',
    backupReminder: "Pour ne prendre aucun risque, veuillez sauvegarder vos données avec la fonction d'export avant de changer vos paramètres de mot de passe.\n\nPlus le mot de passe est long, mieux c'est\xa0! N'hésitez pas à utiliser une phrase de passe.\n\nAssurez-vous de ne pas perdre votre mot de passe. Si voul l'oubliez, il n'y a aucune manière de récupérer vos données.\n\nChanger vos paramètres de mot de passe ne changera rien à vos données mais va redémarrer l'application.",
    deleteBackupReminderTitle: 'Lisez ceci avant de supprimer votre mot de passe',
    deleteBackupReminder: "Si vous supprimez votre mot de passe, vos données ne seront plus chiffrées.\n\nPour ne prendre aucun risque, veuillez sauvegarder vos données avec la fonction d'export avant de changer vos paramètres de mot de passe.\n\nChanger vos paramètres de mot de passe ne changera rien à vos données mais va redémarrer l'application.",
  },
  aboutSection: {
    title: 'À propos',
    text: `Veuillez noter que vos données sont stockées localement sur votre téléphone et pas sur un serveur. Cela veut dire que vos données ne peuvent être lues par personne d'autre, à moins que quelqu'un n'ait accès à votre appareil. Nous voulons nous assurer que vous garder le contrôle sur vos données. Si vous prévoyez de réinitialiser votre téléphone ou d'en changer, n'oubliez pas d'exporter vos données avant. Vous pourrez alors réinstaller l'application et importer vos données.\n\nSi vous rencontrez un problème technique, n'hésitez pas à nous contacter via ${links.email.url}. Vous pouvez aussi contribuer à l'application sur ${links.gitlab.url}.`,
  },
  philosophy: {
    title: "N'oubliez pas de penser par vous-même",
    text: `drip fait des prédictions de règles et vous aide à appliquer les règles de MOC (méthodes d'observation du cycle, NFP en anglais) pour mieux comprendre votre fertilité. Mais n'oubliez pas que cette application est fait par des humain·es, et que les humain·es font des erreurs. Demandez-vous toujours\xa0: «\xa0Est-ce que ça a du sens\xa0?\xa0». Rappelez-vous que vous n'avez pas besoin d'une application pour comprendre votre cycle\xa0! Cela étant, drip veut rendre le suivi de cycle plus facile, plus transparent et plus sûr.`
  },
  license: {
    title: 'drip is une application libre de suivi de cycle',
    text: `Copyright (C) 2019 Bloody Health GbR

Ce programme est distribué dans l'espoir qu'il sera utile, mais avec AUCUNE GARANTIE\xa0; sans même la garantie implicite de QUALITÉ MARCHANDE ou de CONFORMITÉ POUR UN BUT PARTICULIER. Pour plus de détails, voir la GNU General Public License\xa0: https://www.gnu.org/licenses/gpl-3.0.html

Vous pouvez nous contacter à\xa0: bloodyhealth@mailbox.org.`
  },
  version: {
    title: 'Version'
  },
  website: {
    title: 'Site web'
  },
  preOvu: {
    title: 'Jours infertiles au début du cycle',
    note: `drip applique les règles de la MOC pour calculer les jours infertiles au début du cycle (consulter ${links.wiki.url} pour plus d'info). Cela dit, drip n'applique pas pour l'instant la règle des 20 jours (qui détermine les jours infertiles de la phase 1 sur la base des longueurs des cycles précédents) au cas où il n'y aurait pas d'information symptothermique de disponible.`
  },
  credits: {
    title: 'Crédits',
    note: "Merci et beaucoup de ♡ à tout·es nos contributeur·ices ainsi qu'à Susanne Umscheid pour le design merveilleux et à Paula Härtel pour les pictogrammes des symptômes."
  },
  donate: {
    title: 'Offrez-nous un café\xa0!',
    note: `L'équipe Bloody Health est toujours reconnaissante pour les dons, petits ou grands, qui nous aide à maintenir cette application et à développer de nouvelles fonctionnalités. Vous pouvez donner ${links.donate.url}. Merci\xa0! Vous êtes extraordinaire.`
  }
}
