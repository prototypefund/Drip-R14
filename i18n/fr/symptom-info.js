import links from './links'

export const generalInfo = {
  chartNfp: `Sur le graphique, vous pouvez suivre les signes de fertilité. Quand une augmentation valide de la température et un changement dans la glaire cervicale ou le col de l'utérus ont été détectés, une ligne orange apparaîtra sur le graphique. Cela indique la fin de la période péri-ovulatoire et le début de la phase post-ovulatoire.`,
  curiousNfp: `Si vous voulez en savoir plus sur la méthode symptothermique de suivi de la fertilité utilisée dans l'application, vous pouvez visiter ${links.wiki.url}.`,
  cycleRelation: `Cela peut être influencé par votre cycle menstruel et ses changements hormonaux, ou bien les influencer.`,
  excludeExplainer: `vous pouvez exclure ces valeurs pour qu'elles ne soient pas prises en compte dans le calcul de fertilité.`,
  nfpTfyReminder: `Quand vous entrez -\xa0sur une base quotidienne ou régulière\xa0:
  1. votre température basale,
  2. votre glaire cervicale OU l'état de votre col de l'utérus,
  3. vos règles
cette application vous aide à identifier dans quelle phase de votre cycle menstruel vous êtes.

drip fait des prédictions de règles et vous aide à appliquer les règles de MOC (méthodes d'observation du cycle, NFP en anglais) pour mieux comprendre votre fertilité. Mais n'oubliez pas que cette application est fait par des humain·es, et que les humain·es font des erreurs. Demandez-vous toujours\xa0: «\xa0Est-ce que ça a du sens\xa0?\xa0». Rappelez-vous que vous n'avez pas besoin d'une application pour comprendre votre cycle\xa0! Cela étant, drip veut rendre le suivi de cycle plus facile, plus transparent et plus sûr.

Vous trouverez plus d'informations sur la méthode symptothermique sur ${links.wiki.url}.`,
  noNfpSymptom: `Cette application vous permet de suivre ce symptôme pour votre information personnelle. Il n'entre pas en compte dans les calculs de fertilité ou de règles. Sur le graphique, vous pouvez voir à quelle fréquence vous entrez ce symptôme.`
}

export default {
  bleeding: {
    title: `Suivi des saignements menstruels`,
    text: `Suivre vos règles vous permet de connaître le début et la fin d'un cycle menstruel.

Après avoir suivi au moins 3 cycles, drip vous donnera un aperçu de\xa0:
· la longueur moyenne de vos cycles (dans «\xa0stats\xa0»),
· si la longueur de votre cycle varie beaucoup (dans «\xa0stats\xa0» et dans les prédictions pour vos prochaines règles),
· prédictions pour vos 3 prochains cycles dans un intervalle de 3 à 5 jours (dans l'écran d'accueil et «\calendrier\xa0»).

Cette application vous permet de renseigner différentes intensités de sainements. Sur le graphique et sur le calendrier, les valeurs de saigements sont indiquées dans différentes nuances de rouge. Plus c'est sombre, plus c'est intense.

Chaque valeur de saignement qui n'est pas exclue est prise en compte pour calculer la fenêtre de fertilité et pour prédire le début du prochain cycle. Exclure des valeurs permet de suivre des saignements qui ne sont pas des règles et ne marquent pas le début d'un nouveau cycle, comme des saignements dûs à une ovulation ou à une fausse couche.

${generalInfo.nfpTfyReminder}`,
  },
  cervix:  {
    title: `Suivre votre col de l'utérus`,
    text: `Le cervix est situé à l'intérieur du corps, au fond du vagin, avant l'utérus.

Suivre son ouverture et sa texture peut aider à déterminer dans quelle phase du cycle menstruel vous êtes.

Par défaut, le symptôme secondaire pour la méthode symptothermique est la glaire cervicale, mais vous pouvez changer pour le col de l'utérus dans «\xa0Paramètres\xa0» -> «\xa0Paramètres MOC\xa0».

· Comment identifier un cervix fertile\xa0?
Un cervix fertile est ouvert et mou comme vos lobes d'oreilles. Par contraste, un cervix infertile est fermé et dur comme le bout de votre nez. Si le cervix est quoi que ce soit d'autre que fermé et dur, drip prend ça comme un signe de fertilité. Sur le graphique, un cervix fertile est représenté par une pastille jaune foncé, et un cervix infertile est jaune clair.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`
  },
  desire:  {
    title: 'Suivre le désir sexuel',
    text: `L'application vous permet de suivre votre désir indépendamment de votre activité sexuelle.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  mood:  {
    title: "Suivre l'humeur",
    text: `L'application vous permet de suivre votre humeur.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  mucus:  {
    title: 'Suivre la glaire cervicale',
    text: `La glaire cervicale peut aider à déterminer dans quelle phase de votre cycle menstruel vous êtes.

Par défaut, le symptôme secondaire pour la méthode symptothermique que l'application utilise est la glaire cervicale.

· Comment identifier la glaire cervicale\xa0?
Suivre la sensation et la texture de votre glaire cervicale sur une base quotidienne vous aide à identifier des changements dans sa qualité. Les valeurs que vous entrez pour la sensation et la texture de votre qlaire sont combinées par drip en une des cinq valeurs identifiées par les MOC.
De la qualité la plus basse à la plus haute\xa0:
From lowest to best quality:
· t = (sensation sèche + pas de texture),
· ∅ = (pas de sensation + pas de texture),
· f = (sensation mouillée + pas de texture),
· S = (pas de sensation OU mouillée + texture crémeuse),
· S+ = (n'importe quelle sensation + texture de blanc d'œuf) OU (sensation glissante + n'importe quelle texture).

Sur le graphique, la glaire cervicale est représentée par une couleur bleue\xa0; plus le bleu est foncé, meilleure est votre glaire.

Veuillez noter que, pour l'instant, drip ne permet pas d'entrer des valeurs entre parenthèses. Selon les règles des MOC, il est possible de mettre des parenthèses autour d'une valeur quand elle ne correspond pas parfaitement à la description d'une des cinq catégories mais est entre deux. Cette fonctionnalité sera ajoutée dans le futur.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`
  },
  note:  {
    title: 'Notes',
    text: `Les notes vous permettent de noter n'importe quelle information que vous voudriez suivre. C'est la seule donnée que vous pouvez renseigner pour le futur. Cela peut être utile pour vous rappeler un rendez-vous.

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  pain:  {
    title: 'Suivre des douleurs',
    text: `Cette application vous permet de suivre différentes douleurs que vous pourriez ressentir.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  sex:  {
    title: "Suivre l'activité sexuelle et la contraception",
    text: `Cette application vous permet de garder une trace de votre activité sexuelle indépendamment de votre désir. Vous pouvez noter de la masturbation ou du sexe avec une ou plusieurs autre(s) personne(s). Vous pouvez aussi indiquer quel(s) moyen(s) de contraception vous avez utilisé. Seulement l'activité sexuelle sera montrée sur le graphique, en violet clair pour la masturbation et en violet foncé pour le sexe à plusieurs. Saviez-vous qu'avoir un orgasme pouvait aider à apaiser les crampes\xa0?

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`
  },
  temperature:  {
    title: 'Suivre la température basale',
    text: `Un des signes corporels que vous devez suivre pour connaître votre fertilité est votre température basale. La température de votre corps change au cours d'un cycle menstruel, elle est plus haute après l'ovulation.

Par défaut, le symptôme secondaire pour la méthode symptothermique est la glaire cervicale, mais vous pouvez changer pour le col de l'utérus dans «\xa0Paramètres\xa0» -> «\xa0Paramètres MOC\xa0».

· Qu'est-ce que la température basale\xa0?
C'est votre température après être resté·e allongé·e sans bouger pendant au moins 6 heures. Pour beaucoup, c'est la température au réveil, apros avoir dormi au moins six heures et avant de se lever.

· Quel thermomètre utiliser\xa0?
Le thermomètre doit avoir deux décimales.

· Comment prendre sa température\xa0?
Vous pouvez la mesurer par le rectum, le vagin ou la bouche. Si vous choisissez une mesure rectale ou vaginale, vous devez prendre votre température pendant au moins 3 minutes. Si vous la prenez par la bouche, cela doit durer au moins 5 minutes. Choisissez une voie et utilisez toujours la même.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`
  },
}
