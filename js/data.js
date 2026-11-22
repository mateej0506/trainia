const P = [
  {
    id: "hpress",
    name: "Horizontalni pres",
    m: "chest",
    t: "c",
    tip: "Lopatice drži skupljene i spuštene, a laktove otprilike 45° od tijela, nikako pod pravim kutom.",
    o: [
      ["Machine chest press", "gym"],
      [
        "Bench press",
        "gym",
        "",
        "Drugu seriju završi jedno ponavljanje prije otkaza, osim ako te netko osigurava.",
      ],
      ["Smith bench press", "gym"],
      ["Dumbbell bench press", "db"],
      ["Sklekovi", "bw"],
    ],
  },
  {
    id: "ipress",
    name: "Kosi pres",
    m: "chest",
    t: "c",
    tip: "Klupu postavi nisko, na otprilike 15° (jedna rupa). Laktove drži u ravnini sa šipkom, što bliže horizontalnoj ravnini. Veći nagib klupe prebacuje opterećenje na prednji dio ramena.",
    o: [
      ["Incline dumbbell press", "db", "Veći opseg pokreta, a svaka strana radi samostalno"],
      ["Incline Smith press", "gym"],
      ["Incline machine press", "gym"],
      [
        "Incline bench press",
        "gym",
        "",
        "Drugu seriju završi jedno ponavljanje prije otkaza, osim ako te netko osigurava.",
      ],
      ["Sklekovi s nogama na povišenju", "bw"],
    ],
  },
  {
    id: "fly",
    name: "Razvlačenje za prsa",
    m: "chest",
    t: "i",
    o: [
      ["Cable fly", "gym", "Sajla održava konstantnu tenziju kroz cijeli pokret"],
      ["Pec deck", "gym"],
      ["Dumbbell fly", "db", "", "U gornjem dijelu pokreta bučice gotovo ne opterećuju prsa."],
      ["Široki sklekovi", "bw"],
    ],
  },
  {
    id: "vpull",
    name: "Vertikalno povlačenje",
    m: "back",
    t: "c",
    tip: "Uhvati šipku širokim hvatom i drži laktove u frontalnoj ravnini, tako da tijekom pokreta ne bježe prema unutra. Povlači dok nadlaktica ne prijeđe ispod 90°, a zatim se kontrolirano vrati, bez trzaja.<br><br>Sila kod ovog pokreta djeluje odozgo, pa šipku vučeš okomito prema gornjem dijelu prsa. Blagi nagib trupa je prihvatljiv, ali izbjegavaj zabacivanje i ljuljanje. Pri jačem zabacivanju sila više ne djeluje odozgo nego sprijeda: pokret se pretvara u veslanje, a latissimus radi manje.",
    o: [
      ["Lat pulldown", "gym"],
      [
        "Zgibovi",
        "gym",
        "",
        "Pokret je isti kao kod lat pulldowna. Ako ne možeš napraviti nijedno ponavljanje, radi lat pulldown ili zgibove uz pomoć elastične trake.",
      ],
      [
        "Zgibovi uz pomoć trake",
        "gym",
        "",
        "Traka olakšava pokret dok ne skupiš dovoljno snage za prave zgibove.",
      ],
      [
        "Zgibovi na šipki za vrata",
        "bw",
        "",
        "Ako ne možeš napraviti nijedno ponavljanje, probaj zgibove uz pomoć elastične trake.",
      ],
    ],
  },
  {
    id: "hpull",
    name: "Horizontalno povlačenje",
    m: "back",
    t: "c",
    tip: "Sila kod ovog pokreta djeluje sprijeda, pa uteg vučeš prema trbuhu. Prsa drži podignuta, a na kraju pokreta skupi lopatice. Ne pomaži si trzajem trupa unazad.",
    o: [
      ["Chest-supported row", "gym", "Prsa su naslonjena, pa nema varanja trupom"],
      ["Seated cable row", "gym"],
      ["Barbell row", "gym"],
      ["Jednoručno veslanje bučicom", "db"],
      ["Chest-supported dumbbell row", "db", "Prsa su naslonjena na kosu klupu, pa nema varanja trupom"],
      ["Veslanje ispod stola", "bw"],
    ],
  },
  {
    id: "pullover",
    name: "Izolacija leđa",
    m: "back",
    t: "i",
    o: [
      ["Straight-arm pulldown", "gym", "Sajla održava tenziju na latissimusu cijelo vrijeme"],
      ["Dumbbell pullover", "db"],
      ["Superman", "bw"],
    ],
  },
  {
    id: "ohp",
    name: "Pres iznad glave",
    m: "shoulders",
    t: "c",
    tip: "Laktove spusti ispod 90° i tek tada potisni. Hvat neka bude u širini raširenih laktova. Kilaža nikad ne smije narušiti tehniku.",
    o: [
      ["Machine shoulder press", "gym", "Stabilno i sigurno do otkaza"],
      ["Seated dumbbell press", "db"],
      ["Overhead press", "gym", "", "Drugu seriju završi jedno ponavljanje prije otkaza."],
      ["Smith shoulder press", "gym"],
      ["Arnold press", "db"],
      ["Pike sklekovi", "bw"],
    ],
  },
  {
    id: "lateral",
    name: "Bočno podizanje",
    m: "shoulders",
    t: "i",
    tip: "Ruke podiži do visine ramena, s blago savijenim laktovima i bez zamaha trupom.<br><br>Najvažnije je da rame ostane na mjestu: ne smije se podizati prema uhu niti pomicati gore-dolje. Kad se rame podiže, posao preuzima trapez umjesto bočnog dijela ramena.",
    o: [
      [
        "Cable lateral raise",
        "gym",
        "Sajla daje tenziju i na dnu pokreta, gdje bučica gotovo ništa ne opterećuje",
      ],
      ["Machine lateral raise", "gym"],
      ["Lateral raise bučicama", "db"],
      ["Lateral raise s bocama vode", "bw"],
    ],
  },
  {
    id: "rear",
    name: "Stražnje rame",
    m: "shoulders",
    t: "i",
    o: [
      ["Reverse pec deck", "gym", "Stabilan položaj, lako se osjeti stražnji dio ramena"],
      ["Face pull", "gym"],
      ["Rear delt fly", "db"],
      ["Y-T-W podizanja", "bw"],
    ],
  },
  {
    id: "curl",
    name: "Pregib za biceps",
    m: "biceps",
    t: "i",
    tip: "Laktovi miruju uz tijelo, a uteg spuštaj polako i do kraja.",
    o: [
      [
        "Cable curl",
        "gym",
        "Sajla održava konstantnu tenziju. S bučicom ili šipkom u gornjem dijelu pokreta opterećenja gotovo nema.",
      ],
      ["EZ bar curl", "gym"],
      ["Preacher curl", "gym"],
      ["Dumbbell curl", "db"],
      ["Pregib s ručnikom", "bw"],
    ],
  },
  {
    id: "curl2",
    name: "Hammer ili reverse pregib",
    m: "biceps",
    t: "i",
    o: [
      ["Cable rope hammer curl", "gym", "Sajla održava konstantnu tenziju"],
      ["Hammer curl", "db"],
      [
        "Reverse curl",
        "gym",
        "",
        "Pregib nathvatom koji uključuje i podlakticu. Na dnu se slobodno zaustavi, zadrži sekundu i kreni ponovno.",
      ],
      ["Reverse curl bučicama", "db"],
    ],
  },
  {
    id: "pushdown",
    name: "Potisak za triceps",
    m: "triceps",
    t: "i",
    o: [
      ["Rope pushdown", "gym", "Sajla održava konstantnu tenziju"],
      ["Bar pushdown", "gym"],
      ["Dips", "gym"],
      ["Dumbbell kickback", "db"],
      ["Propadanja na klupi", "bw"],
      ["Dijamant sklekovi", "bw"],
    ],
  },
  {
    id: "ohext",
    name: "Triceps iznad glave",
    m: "triceps",
    t: "i",
    o: [
      ["Overhead cable extension", "gym", "Duga glava tricepsa radi u istegnutom položaju"],
      ["EZ skull crusher", "gym"],
      ["Overhead dumbbell extension", "db"],
      ["Dumbbell skull crusher", "db"],
    ],
  },
  {
    id: "squat",
    name: "Čučanj ili potisak nogama",
    m: "quads",
    t: "c",
    tip: "Spuštaj se onoliko duboko koliko ti mobilnost dopušta, a koljena neka prate smjer prstiju.",
    o: [
      ["Hack squat", "gym", "Stabilno i sigurno za seriju do otkaza, bez osiguravanja"],
      ["Pendulum squat", "gym"],
      ["Leg press", "gym"],
      ["Smith squat", "gym"],
      [
        "Back squat",
        "gym",
        "",
        "Drugu seriju završi jedno ponavljanje prije otkaza, osim ako imaš sigurnosne šipke.",
      ],
      ["Bugarski čučanj", "db"],
      ["Goblet squat", "db"],
      ["Čučanj bez opterećenja", "bw"],
    ],
  },
  {
    id: "single",
    name: "Jednonožna vježba",
    m: "quads",
    t: "c",
    o: [
      [
        "Bugarski čučanj",
        "db",
        "Svaka noga radi samostalno, uz malo opterećenje za leđa",
        "Bučice drži u obje ruke, pod petu prednje noge stavi mali teg, a stražnju nogu osloni na klupu. Spuštaj se što dublje možeš. Bolje je odraditi 8–10 kontroliranih ponavljanja s manjom kilažom nego pet loših.",
      ],
      ["Iskoraci s bučicama", "db"],
      ["Smith split squat", "gym"],
      ["Split čučanj", "bw"],
    ],
  },
  {
    id: "legext",
    name: "Ekstenzija nogu",
    m: "quads",
    t: "i",
    tip: "Naslon postavi u srednji položaj, tako da ne ležiš previše unazad, ali ni previše uspravno, jer to skraćuje pokret. Rukama se čvrsto drži za ručke kako se zdjelica ne bi odizala od sjedala. Koljeno poravnaj s osi rotacije sprave.<br><br>Na dnu se nije potrebno pretjerano istezati, a na vrhu nogu ne treba nasilno izbaciti do kraja. Izvodi pokret polako i svaki put jednako.",
    o: [
      ["Leg extension", "gym", "Izolira kvadriceps bez opterećenja za leđa"],
      ["Sissy squat", "bw"],
    ],
  },
  {
    id: "hinge",
    name: "Hip hinge",
    m: "hamstrings",
    t: "c",
    tip: "Zdjelicu pomiči unazad, leđa drži ravna, a šipku ili bučice blizu nogu. Spuštaj se dok ne osjetiš istezanje stražnje lože.",
    o: [
      ["Romanian deadlift", "gym"],
      [
        "SLDL (stiff-leg deadlift)",
        "gym",
        "",
        "Izvodi se kao rumunjsko mrtvo dizanje, ali su koljena fiksnija: blago ih savij i zadrži u tom položaju tijekom cijelog pokreta. Šipku drži blizu tijela, pogled usmjeri prema podu, a pomiče se samo zdjelica, naprijed i natrag.",
      ],
      ["Smith RDL", "gym", "Stabilnije, pa se lakše usredotočiti na istezanje"],
      ["45° hiperekstenzija", "gym"],
      ["Dumbbell RDL", "db"],
      ["Jednonožni RDL", "bw"],
    ],
  },
  {
    id: "legcurl",
    name: "Pregib nogu",
    m: "hamstrings",
    t: "i",
    o: [
      ["Seated leg curl", "gym", "Radi u istegnutom položaju, nešto bolje za rast od ležećeg"],
      ["Lying leg curl", "gym"],
      ["Nordic curl", "bw"],
      ["Klizni pregib nogu", "bw"],
    ],
  },
  {
    id: "thrust",
    name: "Hip thrust",
    m: "glutes",
    t: "c",
    tip: "Bradu drži prema prsima, a na vrhu pokreta stisni gluteus i zadrži sekundu.",
    o: [
      ["Machine hip thrust", "gym", "Brzo se namjesti i stabilan je"],
      ["Hip thrust sa šipkom", "gym"],
      ["Smith hip thrust", "gym"],
      ["Dumbbell hip thrust", "db"],
      ["Glute bridge", "bw"],
    ],
  },
  {
    id: "stepup",
    name: "Step-up ili iskorak",
    m: "glutes",
    t: "c",
    o: [
      ["Step-up na klupu", "db"],
      ["Reverse lunge", "db", "Iskorak unazad više opterećuje gluteus"],
      ["Smith reverse lunge", "gym"],
      ["Step-up bez opterećenja", "bw"],
    ],
  },
  {
    id: "abduct",
    name: "Izolacija gluteusa",
    m: "glutes",
    t: "i",
    o: [
      ["Hip abduction mašina", "gym", "Gornji dio gluteusa, lako do otkaza"],
      ["Cable kickback", "gym"],
      ["Bočno odmicanje noge", "bw"],
      ["Frog pumps", "bw"],
    ],
  },
  {
    id: "calf",
    name: "Calf raise (ispružena noga)",
    m: "calves",
    t: "i",
    tip: "<b>Zašto ispružena noga?</b> Gastrocnemius je veći mišić lista i upravo se on vidi. Prelazi preko koljena, pa najviše radi kad je noga ispružena. Sa savijenim koljenom, kao kod seated calf raisea, posao preuzima soleus.<br><br><b>Opseg pokreta:</b> kreni iz najdubljeg istezanja, s petom skroz dolje, i podiži se samo do otprilike sredine pokreta. Nije potrebno dizati se skroz na prste. U istraživanju su ispitanice koje su radile samo donji dio pokreta postigle veći rast gastrocnemiusa od onih koje su radile gornji dio, a barem jednak kao uz puni opseg.<br><br><b>Otkaz:</b> zadnju seriju izvodi sve dok težinu više ne možeš pomaknuti ni centimetar.<br><br><b>Nemaš spravu za listove?</b> Vježbu možeš izvoditi na hack squatu ili leg pressu: prednji dio stopala postavi na donji rub platforme, a koljena drži ispružena.",
    src: [
      [
        "Kassiano i sur. (2023): djelomični opseg u istegnutom položaju i rast gastrocnemiusa",
        "https://pubmed.ncbi.nlm.nih.gov/37015016/",
      ],
      [
        "Studija iz 2025.: donji djelomični opseg i ponavljanja nakon otkaza kod listova",
        "https://pubmed.ncbi.nlm.nih.gov/40850937/",
      ],
    ],
    o: [
      ["Standing calf raise", "gym", "Sprava za listove, noga ispružena"],
      [
        "Calf raise na hack squatu",
        "gym",
        "",
        "Prednji dio stopala na donji rub platforme, koljena ispružena.",
      ],
      [
        "Calf raise na leg pressu",
        "gym",
        "",
        "Prednji dio stopala na donji rub platforme, koljena ispružena.",
      ],
      ["Calf raise na stepenici", "bw", "", "Noga ispružena, a peta se spušta ispod razine stepenice."],
    ],
  },
  {
    id: "core",
    name: "Trbuh",
    m: "core",
    t: "i",
    o: [
      ["Cable crunch", "gym", "Opterećenje se lako povećava"],
      ["Hanging leg raise", "gym"],
      ["Ab wheel", "bw"],
      ["Plank", "bw"],
      ["Dead bug", "bw"],
    ],
  },
].map((p) => ({ ...p, o: p.o.map(([n, eq, rec, note]) => ({ n, eq, rec, note })) }));
const MC = {
  chest: "#d7263d",
  back: "#1f4fd1",
  shoulders: "#e0703a",
  biceps: "#6b4fd8",
  triceps: "#a24fd8",
  quads: "#2e9e5b",
  hamstrings: "#1d7f8c",
  glutes: "#e04f8f",
  calves: "#8a9a2e",
  core: "#7a7f87",
};
const PBY = Object.fromEntries(P.map((p) => [p.id, p]));

const MUSCLE = {
  chest: "Prsa",
  back: "Leđa",
  shoulders: "Ramena",
  biceps: "Biceps",
  triceps: "Triceps",
  quads: "Kvadriceps",
  hamstrings: "Stražnja loža",
  glutes: "Gluteus",
  calves: "Listovi",
  core: "Trbuh",
};

const ALL = Object.keys(MUSCLE);
const GROUP = {
  full: ALL,
  upper: ["chest", "back", "shoulders", "biceps", "triceps"],
  lower: ["quads", "hamstrings", "glutes", "calves"],
  push: ["chest", "shoulders", "triceps"],
  pull: ["back", "biceps"],
  arms: ["biceps", "triceps", "shoulders"],
  cb: ["chest", "back"],
  sa: ["shoulders", "biceps", "triceps"],
  bc: ["chest", "triceps"],
  bb: ["back", "biceps"],
  bs: ["shoulders", "core"],
};
const DAYS = {
  fullA: {
    name: "Full Body A",
    g: "full",
    s: [
      ["quads", "c"],
      ["chest", "c"],
      ["back", "c"],
      ["hamstrings", "c"],
      ["shoulders", "i"],
      ["core", "i"],
    ],
  },
  fullB: {
    name: "Full Body B",
    g: "full",
    s: [
      ["quads", "c"],
      ["back", "c"],
      ["chest", "c"],
      ["hamstrings", "c"],
      ["glutes", "c"],
      ["shoulders", "i"],
      ["biceps", "i"],
      ["triceps", "i"],
    ],
  },
  fullC: {
    name: "Full Body C",
    g: "full",
    s: [
      ["quads", "c"],
      ["shoulders", "c"],
      ["back", "c"],
      ["glutes", "c"],
      ["chest", "i"],
      ["core", "i"],
    ],
  },
  upper: {
    name: "Gornji dio",
    g: "upper",
    s: [
      ["chest", "c"],
      ["back", "c"],
      ["shoulders", "c"],
      ["back", "c"],
      ["shoulders", "i"],
      ["biceps", "i"],
      ["triceps", "i"],
    ],
  },
  lower: {
    name: "Donji dio",
    g: "lower",
    s: [
      ["quads", "c"],
      ["hamstrings", "c"],
      ["glutes", "c"],
      ["quads", "i"],
      ["hamstrings", "i"],
      ["calves", "i"],
    ],
  },
  lowerG: {
    name: "Donji dio – gluteus",
    g: "lower",
    s: [
      ["glutes", "c"],
      ["hamstrings", "c"],
      ["glutes", "c"],
      ["quads", "c"],
      ["glutes", "i"],
      ["core", "i"],
    ],
  },
  lowerQ: {
    name: "Donji dio – kvadriceps",
    g: "lower",
    s: [
      ["quads", "c"],
      ["glutes", "c"],
      ["quads", "c"],
      ["hamstrings", "i"],
      ["glutes", "i"],
      ["calves", "i"],
    ],
  },
  push: {
    name: "Push",
    g: "push",
    s: [
      ["chest", "c"],
      ["shoulders", "c"],
      ["chest", "c"],
      ["shoulders", "i"],
      ["triceps", "i"],
      ["triceps", "i"],
    ],
  },
  pull: {
    name: "Pull",
    g: "pull",
    s: [
      ["back", "c"],
      ["back", "c"],
      ["back", "c"],
      ["shoulders", "i"],
      ["biceps", "i"],
      ["biceps", "i"],
    ],
  },
  legs: {
    name: "Noge",
    g: "lower",
    s: [
      ["quads", "c"],
      ["hamstrings", "c"],
      ["quads", "c"],
      ["glutes", "c"],
      ["hamstrings", "i"],
      ["calves", "i"],
    ],
  },
  arms: {
    name: "Ruke i ramena",
    g: "arms",
    s: [
      ["biceps", "i"],
      ["triceps", "i"],
      ["shoulders", "i"],
      ["biceps", "i"],
      ["triceps", "i"],
      ["shoulders", "i"],
    ],
  },
  cb: {
    name: "Prsa i leđa",
    g: "cb",
    s: [
      ["chest", "c"],
      ["back", "c"],
      ["chest", "c"],
      ["back", "c"],
      ["chest", "i"],
      ["back", "i"],
    ],
  },
  sa: {
    name: "Ramena i ruke",
    g: "sa",
    s: [
      ["shoulders", "c"],
      ["shoulders", "i"],
      ["biceps", "i"],
      ["triceps", "i"],
      ["shoulders", "i"],
      ["biceps", "i"],
      ["triceps", "i"],
    ],
  },
  bchest: {
    name: "Prsa",
    g: "bc",
    s: [
      ["chest", "c"],
      ["chest", "c"],
      ["chest", "i"],
      ["triceps", "i"],
      ["triceps", "i"],
    ],
  },
  bback: {
    name: "Leđa",
    g: "bb",
    s: [
      ["back", "c"],
      ["back", "c"],
      ["back", "i"],
      ["biceps", "i"],
      ["biceps", "i"],
    ],
  },
  bsho: {
    name: "Ramena",
    g: "bs",
    s: [
      ["shoulders", "c"],
      ["shoulders", "i"],
      ["shoulders", "i"],
      ["core", "i"],
    ],
  },
};
const SPLIT = {
  full: {
    2: ["fullA", "fullB"],
    3: ["fullA", "fullB", "fullC"],
    4: ["upper", "lower", "upper", "lower"],
    5: ["push", "pull", "legs", "upper", "lower"],
    6: ["push", "pull", "legs", "push", "pull", "legs"],
  },
  lower: {
    2: ["lowerG", "fullA"],
    3: ["lowerG", "upper", "lowerQ"],
    4: ["lowerG", "upper", "lowerQ", "fullB"],
    5: ["lowerG", "upper", "lowerQ", "upper", "lowerG"],
    6: ["lowerG", "push", "lowerQ", "pull", "lowerG", "upper"],
  },
  upper: {
    2: ["upper", "fullA"],
    3: ["upper", "lower", "upper"],
    4: ["upper", "lower", "upper", "arms"],
    5: ["push", "pull", "legs", "upper", "arms"],
    6: ["push", "pull", "legs", "push", "pull", "upper"],
  },
};
const SPL = {
  fb: {
    n: "Full body",
    d: "Cijelo tijelo na svakom treningu",
    k: { 2: ["fullA", "fullB"], 3: ["fullA", "fullB", "fullC"], 4: ["fullA", "fullB", "fullC", "fullA"] },
  },
  ul: {
    n: "Upper / Lower",
    d: "Gornji i donji dio naizmjence",
    k: {
      2: ["upper", "lower"],
      4: ["upper", "lower", "upper", "lower"],
      6: ["upper", "lower", "upper", "lower", "upper", "lower"],
    },
  },
  ulf: {
    n: "Upper / Lower / Full body",
    d: "Gornji dio, donji dio, pa cijelo tijelo",
    k: { 3: ["upper", "lower", "fullA"], 5: ["upper", "lower", "fullA", "upper", "lower"] },
  },
  ppl: {
    n: "Push / Pull / Legs",
    d: "Guranje, povlačenje i noge",
    k: { 3: ["push", "pull", "legs"], 6: ["push", "pull", "legs", "push", "pull", "legs"] },
  },
  pplfb: {
    n: "PPL + Full body",
    d: "Push, Pull, Legs i jedan full body",
    k: { 4: ["push", "pull", "legs", "fullA"] },
  },
  pplul: {
    n: "PPL + Upper / Lower",
    d: "Push, Pull, Legs, pa Upper i Lower",
    k: { 5: ["push", "pull", "legs", "upper", "lower"] },
  },
  arnold: {
    n: "Arnold split",
    d: "Prsa i leđa, ramena i ruke, noge",
    k: { 3: ["cb", "sa", "legs"], 6: ["cb", "sa", "legs", "cb", "sa", "legs"] },
  },
  bro: { n: "Bro split", d: "", no: true, k: { 5: ["bchest", "bback", "legs", "bsho", "arms"] } },
};
function planKeys(a) {
  if (!a.days) return [];
  if (a.split && a.split !== "auto" && SPL[a.split] && SPL[a.split].k[a.days]) return SPL[a.split].k[a.days];
  return a.focus ? SPLIT[a.focus][a.days] : [];
}
function planName(a) {
  if (a.split && a.split !== "auto" && SPL[a.split]) return SPL[a.split].n + " " + a.days + "x";
  return SPLITNAME[a.focus][a.days];
}
const SPLITNAME = {
  full: { 2: "Full body 2x", 3: "Full body 3x", 4: "Upper / Lower", 5: "PPL + Upper/Lower", 6: "PPL 2x" },
  lower: {
    2: "Donji + full body",
    3: "Donji / gornji / donji",
    4: "Donji fokus 4x",
    5: "Donji fokus 5x",
    6: "Donji fokus 6x",
  },
  upper: {
    2: "Gornji + full body",
    3: "Gornji / donji / gornji",
    4: "Upper / Lower + ruke",
    5: "PPL + upper + ruke",
    6: "PPL 2x",
  },
};
const WEEK = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
const WD = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
const PRIO = {
  none: [],
  chest: ["chest"],
  back: ["back"],
  shoulders: ["shoulders"],
  arms: ["biceps", "triceps"],
  legs: ["quads", "hamstrings", "calves"],
  glutes: ["glutes"],
};
const EQ = { gym: ["gym", "db", "bw"], db: ["db", "bw"], bw: ["bw"] };
const CAP = { beg: 5, mid: 7, adv: 8 };
const MAXEX = { beg: 6, mid: 8, adv: 9 };
const REPS = {
  low: { r: "6–8", top: 8, drop: 6, w1: "7–8" },
  mid: { r: "6–10", top: 10, drop: "6–7", w1: "7–8" },
  high: { r: "10–14", top: 14, drop: 10, w1: "11–12" },
};
const TARGET = { beg: 6, mid: 8, adv: 10 };
const SMALL = ["biceps", "triceps", "calves", "core"];
function target(m, a) {
  let t = TARGET[a.level];
  if (SMALL.includes(m)) t -= 2;
  if (a.focus === "lower" && GROUP.upper.includes(m)) t -= 2;
  if (a.focus === "upper" && GROUP.lower.includes(m)) t -= 2;
  if ((PRIO[a.priority] || []).includes(m)) t += 4;
  if (m === "core") t = Math.min(t, 4);
  return Math.max(t, 2);
}
