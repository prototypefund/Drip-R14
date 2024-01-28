import links from './links'

export const generalInfo = {
  chartNfp: `A diagramon nyomon követheted a termékenységi jeleket. Ha érvényes hőmérséklet-eltolódást és méhnyak- vagy méhnyaknyálkahártya-eltolódást is észlelsz, a diagramon egy narancssárga vonal jelenik meg. Ez jelzi a peri-ovulációs szakasz végét és a posztovulációs szakasz kezdetét.`,
  curiousNfp: `Ha kíváncsi vagy a szimptotermikus módszerre, amelyet a termékenység nyomon követésére használunk az alkalmazáson belül, akkor látogass el a ${links.wiki.url} oldalra.`,
  cycleRelation: `Befolyásolhatja, vagy hatással lehet az Te menstruációs ciklusodra és annak hormonális változásaira.`,
  excludeExplainer: `Ezeket az értékeket kizárhatod, így nem lesz figyelembe véve a termékenységi számítás során.`,
  nfpTfyReminder: `Amikor - naponta/rendszeresen - nyomon követed:
  1. a tested alaphőmérsékletét,
  2. a méhnyaknyálkádat VAGY a méhnyakad,
  3. és menstruációs vérzésedet
az alkalmazás segít azonosítani, hogy a menstruációs ciklus melyik szakaszában vagy.

A drip. időszaki előrejelzéseket készít neked, és segít az NFP termékenységtudatossági szabályok alkalmazásában. De ne feledd, hogy ezt az alkalmazást emberek készítik, és az emberek hibáznak. Mindig gondolkodj el saját magadon: "Van ennek értelme?" Ne feledd, nincs szükséged egy alkalmazásra ahhoz, hogy megértsd a ciklusodat! A drip. azonban támogatni szeretne téged, és egyszerűbbé, átláthatóbbá és biztonságosabbá szeretné tenni a menstruációkövetést.

A szimptotermikus módszerről bővebb információt a ${links.wiki.url} oldalon találsz.`,
  noNfpSymptom: `Az alkalmazás lehetővé teszi, hogy nyomon kövesd ezt a tünetet, hogy téged tájékoztasson, ezt semmilyen számításnál nem veszi figyelembe. A táblázaton ellenőrizheted, hogy milyen gyakran követed ezt a tünetet.`,
}

export default {
  bleeding: {
    title: `Menstruációs vérzés nyomon követése`,
    text: `A menstruációs vérzés nyomon követése lehetővé teszi, hogy megismerd a menstruációs ciklusod kezdetét és végét.

Legalább 3 menstruációs ciklus nyomon követése után a drip. áttekintést ad a következőkről:
· mennyi ideig tartanak a ciklusok átlagosan (látható a "statisztikában"),
· hogy a ciklusok hossza jelentősen változott-e (látható a "statisztikákban" és a vérzés előrejelzésében),
· és megjósolja a következő 3 ciklusát 3 vagy 5 napos tartományban (látható a kezdőképernyőn és a "naptárban").

Az alkalmazás lehetővé teszi a vérzés különböző intenzitásának nyomon követését. A diagramon és a naptárban a vérzés értékeit a vörös különböző árnyalatai színezik. Minél sötétebb, annál intenzívebb a vérzés. Minden olyan vérzési értéket, amelyet nem zársz ki, az alkalmazás figyelembe vesz a termékenység kiszámításánál és a menstruáció előrejelzésénél.

A vérzési értékek kizárása a vérzés nyomon követésére szolgál, ha az nem egy új ciklus kezdetét, vagy az előző nap(ok) menstruációs vérzésének folytatását jelzi, pl. ovuláció vagy vetélés okozta vérzés.

${generalInfo.nfpTfyReminder}`,
  },
  cervix: {
    title: `A méhnyak követése`,
    text: `A méhnyak a test belsejében, a hüvelycsatorna végén, a hüvely és a méh között helyezkedik el.

A méhnyak nyitottságának vagy zártságának, illetve feszességének vagy puhaságának nyomon követése segíthet meghatározni, hogy a menstruációs ciklus melyik szakaszában vagy.

Alapértelmezés szerint a másodlagos tünet, amelyet az alkalmazás az NFP értékeléséhez használ, a méhnyakváladék, de ezt a "Beállítások" -> "NFP beállítások" menüpontban méhnyakra módosíthatod.

· Hogyan lehet azonosítani a termékeny méhnyakat?
A termékeny méhnyak nyitott és puha, mint a fülcimpád. Ezzel szemben a terméketlen méhnyak zárt és kemény, mint az orrhegy. Ha a méhnyak nem zártnak és keménynek tűnik, a drip. azt a termékenység jelének tekinti. A diagramon a termékeny méhnyak sötétsárga színű, a terméketlen méhnyak pedig világossárga színű.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`,
  },
  desire: {
    title: 'A szexuális vágy nyomon követése',
    text: `Az alkalmazás lehetővé teszi a szexuális vágy nyomon követését a szexuális aktivitástól függetlenül.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`,
  },
  mood: {
    title: 'A hangulat nyomon követése',
    text: `Az alkalmazás lehetővé teszi, hogy nyomon kövesd a hangulatod.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`,
  },
  mucus: {
    title: 'A méhnyakváladék nyomon követése',
    text: `A méhnyakváladék segít meghatározni, hogy a menstruációs ciklus melyik szakaszában vagy.

Alapértelmezés szerint a másodlagos tünet, amelyet az alkalmazás az NFP értékeléséhez használ, a méhnyakváladék.

· Hogyan lehet azonosítani a termékeny méhnyakváladékot?
A méhnyakváladék érzetének és állagának napi szintű nyomon követése segít a méhnyakváladék minőségében bekövetkező változások felismerésében. A méhnyakváladék érzetére és állagára vonatkozóan megadott értékeket í drip. öt NFP-nek megfelelő érték egyikévé kombinálja.
A legalacsonyabbtól a legjobb minőségig:
· t = (száraz érzés + nincs textúra),
· ∅ = (nincs érzés + nincs textúra),
· f = (nedves érzés + nincs textúra),
· S = (nincs VAGY nedves érzés + krémes textúra),
· S+ = (bármilyen érzés + tojásfehérje textúra) VAGY (csúszós érzés + bármilyen textúra).

A táblázaton a méhnyakváladék kék színű: minél sötétebb a kék árnyalata, annál jobb a méhnyakváladék minősége.

Kérjük, vedd figyelembe, hogy a drip. jelenleg nem támogatja a "zárójeles értékeket": Az NFP szabályai szerint a méhnyakváladék értékét zárójelbe téve minősítheti, jelezve, hogy az érték nem felel meg teljes mértékben az öt kategória egyikének leírójának, hanem a kettő között helyezkedik el. Ezt a funkciót a jövőben fejleszteni fogjuk.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`,
  },
  note: {
    title: 'Jegyzetek',
    text: `A jegyzetek lehetővé teszik, hogy nyomon kövess minden olyan további információt, amelyet el szeretnél menteni. Ez az egyetlen kategória, amely egy jövőbeli időpontra vonatkozó információkat tárolhat. Ez hasznos lehet, ha emlékeztetni szeretnéd magad egy találkozóra.
${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`,
  },
  pain: {
    title: 'A fájdalom nyomon követése',
    text: `Az alkalmazás lehetővé teszi, hogy nyomon kövesd a különböző típusú fájdalmakat, amelyeket tapasztalsz.

${generalInfo.cycleRelation}

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`,
  },
  sex: {
    title: 'A szex és a fogamzásgátlók nyomon követése',
    text: `Az alkalmazás lehetővé teszi, hogy a szexuális vágytól függetlenül nyomon kövesd a szexuális életed. Különbséget tehetsz a maszturbáció és a partnerrel/partnerekkel való szexuális együttlétek között. Itt nyomon követheted a fogamzásgátló módszer(eke)t is. A "táblázat" részben csak a szexuális aktivitás jelenik meg, a világosabb lila színű a szóló szexet, a sötétebb lila színű pedig a partnerszexet jelzi. Tudtad, hogy az orgazmus segíthet a görcsök oldásában?

${generalInfo.noNfpSymptom}

${generalInfo.curiousNfp}`,
  },
  temperature: {
    title: 'A test alaphőmérsékletének nyomon követése',
    text: `A termékenységi állapot megismeréséhez az egyik testjel, amelyet nyomon kell követned, a test alaphőmérséklete. A testhőmérséklet a menstruációs ciklus során változik, az ovuláció után emelkedik.

Alapértelmezés szerint a másodlagos tünet a méhnyakváladék, de a "Beállítások" -> "NFP-beállítások" menüpontban méhnyakra módosíthatod.

· Mit jelent a test alaphőmérséklete?
Ez a test-hőmérsékleted legalább 6 órán át tartó nyugalomban fekvés után. Sokak számára ez az, amikor reggel felébrednek, miután legalább 6 órát aludtak, és mielőtt felkelnek.

· Milyen hőmérőt használjak?
A hőmérőnek legalább 2 tizedesjegyet kell feltüntetnie az egész számon kívűl.

· Hogyan mérjek?
Mérhetsz rektálisan, vaginálisan vagy orálisan át. Ha a rektális, vagy vaginális mérést választod, legalább 3 percig kell mérned. Ha az orálisan történő mérést választod, legalább 5 percig kell mérned. Válasszon egy módszert, és ragaszkodj hozzá.

${generalInfo.chartNfp}

${generalInfo.excludeExplainer}

${generalInfo.nfpTfyReminder}`,
  },
}
