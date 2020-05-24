export const mucusNFP = ['t', 'Ø', 'f', 'S', 'S+']
export const intensity = ['faible', 'moyen', 'important']

export const bleeding = {
  labels: ['pertes', 'faible', 'moyen', 'important'],
  heaviness: {
    header: "Saignements",
    explainer: "Quelle est l'intensité de votre saignement\xa0?",
  },
  exclude: {
    header: "Exclure",
    explainer: "Vous pouvez exclure cette valeur si ce ne sont pas des règles."
  }
}

export const cervix = {
  subcategories: {
    opening: 'ouverture',
    firmness: 'texture',
    position: 'position'
  },
  opening: {
    categories: ['fermé', 'moyen', 'ouvert'],
    explainer: "Votre col de l'utérus est-il ouvert ou fermé\xa0?"
  },
  firmness: {
    categories: ['dur', 'mou'],
    explainer: "Quand il est dur, la texture ressemble à celle du bout de votre nez."
  },
  position: {
    categories: ['bas', 'moyen', 'haut'],
    explainer: 'À quelle hauteur est votre cervix\xa0?'
  },
  actionHint: 'Sélectionnez une valeur au moins pour "Ouverture" et "Texture" avant de sauvegarder.'
}

export const mucus = {
  subcategories: {
    feeling: 'sensation',
    texture: 'texture'
  },
  feeling: {
    categories: ['sèche', 'rien', 'humide', 'glissante'],
    explainer: "Quelle est la sensation à l'entrée de votre vagin\xa0?"
  },
  texture: {
    categories: ['rien', 'crémeuse', "blanc d'œuf"],
    explainer: "À la vue et au toucher, qu'est-ce qui décrit le mieux votre glaire cervicale\xa0?"
  },
  excludeExplainer: "Vous pouvez exclure cette valeur si vous ne voulez pas qu'elle entre dans le calcul de fertilité.",
  actionHint: 'Sélectionnez une valeur pour "Sensation" et "Texture" avant de sauvegarder.'
}

export const desire = {
  header: 'Intensité',
  explainer: 'Comment évalueriez-vous votre désir sexuel\xa0?'
}

export const sex = {
  categories:{
    solo: 'seul·e',
    partner: 'à plusieurs',
  },
  header: "Activité",
  explainer: "Avez-vous eu une activité sexuelle aujourd'hui\xa0?",
}

export const contraceptives = {
  categories:{
    condom: 'préservatif',
    pill: 'pilule',
    iud: 'diu',
    patch: 'patch',
    ring: 'anneau',
    implant: 'implant',
    diaphragm: 'diaphragme',
    none: 'aucun',
    other: 'autre',
  },
  header: "Contraceptifs",
  explainer: 'Avez-vous utilisé un moyen de contraception\xa0?'
}

export const pain = {
  categories: {
    cramps: 'crampes',
    ovulationPain: "douleur d'ovulation",
    headache: 'mal de tête',
    backache: 'mal au dos',
    nausea: 'nausée',
    tenderBreasts: 'seins sensibles',
    migraine: 'migraine',
    other: 'autre'
  },
  explainer: "Qu'avez-vous ressenti dans votre corps aujourd'hui\xa0?"
}

export const mood = {
  categories: {
    happy: 'joie',
    sad: 'tristesse',
    stressed: 'stress',
    balanced: 'équilibre',
    fine: 'bien-être',
    anxious: 'anxiété',
    energetic: 'énergie',
    fatigue: 'fatigue',
    angry: 'colère',
    other: 'autre'
  },
  explainer: "Quelles émotions avez-vous ressenties aujourd'hui\xa0?"
}

export const temperature = {
  outOfRangeWarning: "Cette température est en dehors des valeurs actuelles d'affichage du graphique. Vous pouvez changer les valeurs dans les réglages.",
  outOfAbsoluteRangeWarning: "Cette température est trop haute ou trop basse pour être affichée sur le graphique.",
  saveAnyway: 'Enregistrer malgré tout',
  temperature: {
    header: "Température",
    explainer: 'Prenez votre température dès votre réveil, avant de sortir du lit.'
  },
  time: "Heure",
  note: {
    header: "Note",
    explainer: "Est-ce que cette température a pu être influencée, par un mauvais sommeil ou de la consommation d'alcool par exemple\xa0?"
  },
  exclude: {
    header: "Exclure",
    explainer: "Vous pouvez exclure cette valeur si vous ne voulez pas qu'elle entre dans le calcul de fertilité."
  }
}

export const noteExplainer = "Voulez-vous ajouter quelque chose pour la journée\xa0?"

export const sharedDialogs = {
  cancel: 'Annuler',
  areYouSureTitle: 'Êtes-vous sûr·e\xa0?',
  areYouSureToDelete: 'Êtes-vous sûr·e de vouloir supprimer cette entrée\xa0?',
  reallyDeleteData: 'Oui, je suis sûr·e',
  save: 'Enregistrer',
  delete: 'Supprimer',
  disabledInfo: 'Il manque certaines données'
}
