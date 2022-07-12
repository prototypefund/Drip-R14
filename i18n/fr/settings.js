import links from './links'

const currentYear = new Date().getFullYear()

export default {
  title: 'Paramètres',
  menuItems: {
    reminders: {
      name: 'Rappels',
      text: 'active/désactive les rappels'
    },
    nfpSettings: {
      name: 'Paramètres MOC',
      text: 'définit la manière dont vous souhaitez utiliser la MOC',
    },
    dataManagement: {
      name: 'Gérer vos données',
      text: 'Importer, exporter ou supprimer vos données'
    },
    password: {
      name: 'Mot de passe',
      text: ''
    },
    about: 'À propos',
    license: 'Licence',
    settings: 'Paramètres'
  },
  export: {
    errors: {
      noData: 'Il n’y a pas de données à exporter',
      couldNotConvert: 'Impossible de convertir les données en CSV',
      problemSharing: 'Il y a eu un problème lors du partage du fichier des données exportées'
    },
    title: 'Export de mes données drip',
    subject: 'Export de mes données drip',
    button: 'Exporter les données',
    segmentExplainer: 'Export des données au format CSV pour pouvoir les utiliser ailleurs'
  },
  import: {
    button: 'Importer des données',
    title: 'Conserver les données existantes ?',
    message: `Il y a deux options pour l’import :
1. Garder les jours existants et ne remplacer que ceux qui sont aussi dans le fichier à importer.
2. Supprimer toutes les données existantes, puis importer celles du fichier.`,
    replaceOption: 'Importer et remplacer',
    deleteOption: 'Importer en supprimant l’existant',
    errors: {
      couldNotOpenFile: 'Impossible d’ouvrir le fichier',
      postFix: 'Aucune donnée n’a été importée ou modifiée',
      futureEdit: 'Les dates futures peuvent ne contenir que des notes, sans autres symptômes'
    },
    success: {
      message: 'Les données ont bien été importées'
    },
    segmentExplainer: 'Import de données au format CSV'
  },
  deleteSegment: {
    title: 'Supprimer les données de l’application',
    explainer: 'Supprimer les données de ce téléphone',
    question: 'Voulez-vous supprimer les données de l’application sur ce téléphone ?',
    message: 'La suppression des données est permanente et irréversible. Nous vous conseillons de faire une sauvegarde de vos données avant de les supprimer.',
    confirmation: 'Supprimer définitivement les données de l’application',
    errors: {
      couldNotDeleteFile: 'Impossible de supprimer les données',
      postFix: 'Aucune donnée n’a été supprimée ou modifiée',
      noData: 'Il n’y a pas de données à supprimer'
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
    loadError: 'Impossible de charger les valeurs de l’échelle de température',
    saveError: 'Impossible d’enregistrer les valeurs de l’échelle de température'
  },
  tempReminder: {
    title: 'Rappel pour la température',
    noTimeSet: 'Programmez un rappel quotidien pour prendre votre température',
    timeSet: time => `Le rappel quotidien a été programmé à ${time}`,
    notification: 'Enregistrez votre température du matin'
  },
  periodReminder: {
    title: 'Rappel pour les prochaines règles',
    reminderText: 'Programmez une notification 3 jours avant la date probable de vos prochaines règles.',
    notification: daysToEndOfPrediction => `Vos prochaines règles commenceront probablement dans 3 à ${daysToEndOfPrediction} jours.`
  },
  useCervix: {
    title: 'Symptôme secondaire',
    cervixModeOn: 'L’état de votre col de l’utérus est utilisé pour détecter votre fenêtre de fertilité de façon symptothermique. Vous pouvez choisir ici d’utiliser plutôt la valeur de votre glaire cervicale.',
    cervixModeOff: 'Par défaut, la glaire cervicale est utilisée pour détecter votre fenêtre de fertilité de façon symptothermique. Vous pouvez choisir ici d’utiliser plutôt l’état de votre col de l’utérus.'
  },
  passwordSettings: {
    title: 'Mot de passe de l’app',
    explainerDisabled: 'Chiffrez la base de données de l’application avec un mot de passe. Vous devrez entrer votre mot de passe à chaque lancement de l’application.',
    explainerEnabled: 'La protection par mot de passe et le chiffrement de la base de données est actuellement activée',
    setPassword: 'Choisir un mot de passe',
    savePassword: 'Enregistrer le mot de passe',
    changePassword: 'Changer de mot de passe',
    deletePassword: 'Supprimer le mot de passe',
    enterCurrent: "Veuillez entrer votre mot de passe actuel",
    enterNew: "Choisissez un nouveau mot de passe",
    confirmPassword: "Confirmez votre mot de passe",
    passwordsDontMatch: "Le mot de passe et sa confirmation sont différents",
    backupReminderTitle: 'Lisez ceci avant de changer votre mot de passe',
    backupReminder: 'Pour ne prendre aucun risque, veuillez sauvegarder vos données avec la fonction d’export avant de changer vos paramètres de mot de passe.\n\nPlus le mot de passe est long, mieux c’est ! N’hésitez pas à utiliser une phrase de passe.\n\nAssurez-vous de ne pas perdre votre mot de passe. Si vous l’oubliez, il n’y a aucune manière de récupérer vos données.\n\nChanger vos paramètres de mot de passe ne changera rien à vos données mais va redémarrer l’application.',
    deleteBackupReminderTitle: 'Lisez ceci avant de supprimer votre mot de passe',
    deleteBackupReminder: 'Si vous supprimez votre mot de passe, vos données ne seront plus chiffrées.\n\nPour ne prendre aucun risque, veuillez sauvegarder vos données avec la fonction d’export avant de changer vos paramètres de mot de passe.\n\nChanger vos paramètres de mot de passe ne changera rien à vos données mais va redémarrer l’application.',
  },
  aboutSection: {
    title: 'À propos',
    text: `Veuillez noter que vos données sont stockées localement sur votre téléphone et non sur un serveur. Cela veut dire que vos données ne peuvent être lues par personne d’autre, à moins que quelqu’un ait accès à votre appareil. Nous voulons nous assurer que vous gardez le contrôle sur vos données. Si vous prévoyez de réinitialiser votre téléphone ou d’en changer, n’oubliez pas d’exporter vos données avant. Vous pourrez alors réinstaller l’application et importer vos données.\n\nSi vous rencontrez un problème technique, n’hésitez pas à nous contacter via ${links.email.url}. Vous pouvez aussi contribuer au code sur ${links.gitlab.url}.`,
  },
  philosophy: {
    title: 'N’oubliez pas de penser par vous-même',
    text: `drip fait des prédictions de règles et vous aide à appliquer la Méthode d’Observation du Cycle (MOC, ou NFP en anglais) pour mieux comprendre votre fertilité. Mais n’oubliez pas que cette application est faite par des humain·es, et que les humain·es font des erreurs. Demandez-vous toujours : « Est-ce que ça a du sens ? ». Rappelez-vous que vous n’avez pas besoin d’une application pour comprendre votre cycle ! Cela étant, drip veut rendre le suivi de cycle plus facile, plus transparent et plus sûr.`
  },
  license: {
    title: 'drip est une application libre de suivi de cycle',
    text: `Copyright (C) ${currentYear} Bloody Health GbR

Ce programme est distribué dans l’espoir qu’il sera utile, mais avec AUCUNE GARANTIE ; sans même la garantie implicite de QUALITÉ MARCHANDE ou de CONFORMITÉ POUR UN BUT PARTICULIER. Pour plus de détails, vous pouvez vous reporter à la Licence Publique Générale GNU : https://www.gnu.org/licenses/gpl-3.0.html

Vous pouvez nous contacter à bloodyhealth@mailbox.org.`
  },
  version: {
    title: 'Version'
  },
  website: {
    title: 'Site web'
  },
  preOvu: {
    title: 'Jours infertiles au début du cycle',
    note: `drip applique les règles de la MOC pour calculer les jours infertiles au début du cycle (consulter ${links.wiki.url} pour plus d’info [en anglais]). Cela dit, drip n’applique pas pour l’instant la règle des 20 jours (qui détermine les jours infertiles de la phase 1 sur la base des longueurs des cycles précédents) au cas où il n’y aurait pas d’information symptothermique de disponible.`
  },
  credits: {
    title: 'Crédits',
    note: `Nous adorons l’équipe de drip. Beaucoup de merci et de <3 à tout·es nos condriputeur·ices. Merci à Paula Härtel pour les pictogrammes de suivi des symptômes. Toutes les autres icônes ont été faites par ${links.smashicons.url}, ${links.kazachek.url} & ${links.freepik.url} de ${links.flaticon.url}.`
  },
  donate: {
    title: 'Offrez-nous un café !',
    note: `L’équipe Bloody Health est toujours reconnaissante pour les dons, petits ou grands, qui nous aide à maintenir cette application et à développer de nouvelles fonctionnalités. Vous pouvez donner ${links.donate.url}. Merci à vous ! Vous êtes extraordinaire.`
  }
}
