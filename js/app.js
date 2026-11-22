const COLORS = [
  "var(--red)",
  "var(--blue)",
  "var(--yel)",
  "#2e9e5b",
  "#7a7f87",
  "#e0703a",
  "#6b4fd8",
  "#15171a",
];

const Q = [
  {
    id: "goal",
    t: "Koji ti je glavni cilj?",
    d: "Trening ostaje sličan, a mijenjaju se savjeti za prehranu i kardio.",
    o: () => [
      ["muscle", "Izgradnja mišića", "Više mišića i snage"],
      ["fat", "Mršavljenje", "Manje masnog tkiva, uz očuvanje mišića"],
      ["fit", "Održavanje forme", "Zdravlje i dobar osjećaj"],
    ],
  },
  {
    id: "sport",
    t: "Baviš li se još nečim osim teretane?",
    d: "Teretana se mora uklopiti u ostale treninge, da stigneš oporaviti.",
    o: () => [
      ["none", "Ne", "Samo teretana"],
      ["combat", "Borilački sport", "Boks, MMA, BJJ, kickboks…"],
      ["other", "Drugi sport", "Nogomet, košarka, trčanje…"],
    ],
  },
  {
    id: "days",
    t: "Koliko puta tjedno možeš trenirati?",
    d: (a) =>
      a.sport === "combat"
        ? "Uz borilački sport najbolja opcija je full body 2–3x tjedno. Tako ostaje dovoljno snage i oporavka za borilačke treninge."
        : "Budi realan. Bolje 2 treninga koja odradiš kako treba nego 5 koje preskočiš.",
    o: (a) => {
      const combat = a.sport === "combat";
      return [
        [2, "2x tjedno", "", combat],
        [3, "3x tjedno", "", combat],
        [4, "4x tjedno", ""],
        [5, "5x tjedno", ""],
        [6, "6x tjedno", ""],
      ];
    },
  },
  {
    id: "split",
    t: "Koji split želiš raditi?",
    d: (a) =>
      a.sport === "combat"
        ? "Uz borilački sport najbolji je full body."
        : "Ako nisi siguran, odaberi prvu opciju i Trainia će složiti najbolji za tvoj fokus.",
    o: (a) => {
      const auto = ["auto", "Svejedno, složi mi najbolji", "Ovisi o fokusu koji odabereš u idućem pitanju"];
      const splits = Object.entries(SPL)
        .filter(([, s]) => s.k[a.days])
        .map(([id, s]) => [id, s.n, s.d, s.no ? "no" : a.sport === "combat" && id === "fb"]);
      return [auto, ...splits];
    },
  },
  {
    id: "focus",
    t: "Na što se želiš fokusirati?",
    d: "Ostatak tijela ne izbacujemo, samo dobije manje volumena.",
    o: (a) => [
      ["full", "Cijelo tijelo", "Ravnomjerno sve", a.sport === "combat"],
      ["lower", "Donji dio", "Noge i gluteus dobivaju više"],
      ["upper", "Gornji dio", "Prsa, leđa, ramena, ruke"],
    ],
  },
  {
    id: "priority",
    t: "Je li ti neki mišić prioritet?",
    d: "Prioritetni mišić radiš prvi dok si svjež i dobije seriju više.",
    o: (a) => {
      const none = [["none", "Svejedno", "Sve jednako"]];
      const upper = [
        ["chest", "Prsa", ""],
        ["back", "Leđa", ""],
        ["shoulders", "Ramena", ""],
        ["arms", "Ruke", "Biceps i triceps"],
      ];
      const lower = [
        ["glutes", "Gluteus", ""],
        ["legs", "Noge", "Kvadriceps, stražnja loža i listovi"],
      ];
      if (a.focus === "upper") return [...none, ...upper];
      if (a.focus === "lower") return [...none, ...lower];
      return [...none, ...upper, ...lower];
    },
  },
  {
    id: "level",
    t: "Koliko dugo treniraš?",
    d: "Od ovoga ovisi koliko vježbi i tjednih serija dobiješ.",
    o: () => [
      ["beg", "Početnik", "Manje od 6 mjeseci"],
      ["mid", "Srednji", "6 mjeseci do 2 godine"],
      ["adv", "Napredni", "Više od 2 godine"],
    ],
  },
  {
    id: "time",
    t: "Koliko vremena imaš za jedan trening?",
    d: (a) =>
      isFB(a)
        ? "Na full bodyju se u jednom treningu radi cijelo tijelo, pa treba barem sat vremena."
        : "Uključeno je zagrijavanje i odmor između serija.",
    o: (a) => [
      ["45", "Do 45 minuta", isFB(a) ? "Full body traje barem sat vremena" : "", false, isFB(a)],
      ["60", "Oko sat vremena", ""],
      ["90", "Sat i pol", "", isFB(a)],
      ["any", "Svejedno", "Bez vremenskog ograničenja"],
    ],
  },
  {
    id: "reps",
    t: "Koliko ponavljanja ti više paše?",
    d: (a) =>
      `Svaka vježba ima ${isFB(a) ? 3 : 2} radne serije. Rast je podjednak, pa biraj ono što ti je ugodnije.`,
    help: true,
    o: () => [
      ["low", "6–8 ponavljanja", "Teža kilaža, kraće serije"],
      ["mid", "6–10 ponavljanja", ""],
      ["high", "10–14 ponavljanja", "Lakša kilaža, duže serije"],
    ],
  },
  {
    id: "equip",
    t: "Gdje treniraš?",
    d: "Biramo samo vježbe koje stvarno možeš odraditi.",
    o: () => [
      ["gym", "Teretana", "Sve sprave i utezi"],
      ["db", "Doma s bučicama", "Bučice i klupa"],
      ["bw", "Bez opreme", "Samo vlastita težina"],
    ],
  },
];

const ACT = [
  [1.2, "Sjedeći posao, malo kretanja"],
  [1.375, "Lagano aktivan, nešto hodanja"],
  [1.55, "Umjereno aktivan, puno na nogama"],
  [1.725, "Vrlo aktivan, fizički posao"],
  [1.9, "Ekstremno, fizički posao i sport"],
];

const LABELS = {
  goal: { muscle: "Izgradnja mišića", fat: "Mršavljenje", fit: "Održavanje forme" },
  focus: { full: "Cijelo tijelo", lower: "Donji dio", upper: "Gornji dio" },
  level: { beg: "Početnik", mid: "Srednji", adv: "Napredni" },
  equip: { gym: "Teretana", db: "Bučice", bw: "Bez opreme" },
};

const LOGO = `
  <svg class="mark" viewBox="0 0 64 40" aria-hidden="true">
    <rect x="0" y="0" width="11" height="40" rx="3" fill="#d7263d" />
    <rect x="13" y="3" width="9" height="34" rx="3" fill="#1f4fd1" />
    <rect x="24" y="6.5" width="7" height="27" rx="2.5" fill="#f5c518" />
    <rect x="33" y="17" width="31" height="6" rx="2" fill="currentColor" opacity=".55" />
    <rect x="2" y="2" width="2" height="36" rx="1" fill="#fff" opacity=".25" />
  </svg>`;

const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  },
};

const app = document.getElementById("app");
const back = document.getElementById("back");
const modal = document.getElementById("help");

const OPEN = new Set([0]);
let W1 = false;
let ans = {};
let step = -1;
let KG = +storage.get("trainia-kg", 0) || 0;
let CAL = Object.assign({ sex: "m", age: 0, h: 0, act: 1 }, storage.get("trainia-cal", {}));
let CH = storage.get("trainia-ch", {}) || {};

const QBY = (id) => Q.find((q) => q.id === id);
const desc = (q) => (typeof q.d === "function" ? q.d(ans) : q.d);
const sets = (e) => (W1 ? 1 : e.sets);
const reps = (e) => (W1 ? REPS[ans.reps].w1 : e.reps);

function badge(rec) {
  if (rec === "no") return '<span class="pr no">Nije preporuka</span>';
  if (rec) return '<span class="pr">Preporuka</span>';
  return "";
}

function helpButton(type) {
  return `<button class="qm" data-${type} aria-label="Zašto?">?</button>`;
}

function link(href, text) {
  return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
}

function kcalText() {
  const w = +KG;
  const h = +CAL.h;
  const age = +CAL.age;
  if (!(w >= 30 && w <= 250 && h >= 130 && h <= 230 && age >= 15 && age <= 90)) {
    return "Upiši dob, visinu i težinu";
  }
  const bmr = 10 * w + 6.25 * h - 5 * age + (CAL.sex === "m" ? 5 : -161);
  const tdee = Math.round((bmr * ACT[+CAL.act][0]) / 10) * 10;
  let text = `Održavanje: oko ${tdee} kcal dnevno`;
  if (ans.goal === "fat") text += ` · za mršavljenje: ${tdee - 500}–${tdee - 300} kcal`;
  if (ans.goal === "muscle") text += " · za rast mišića dovoljno je jesti na održavanju, suficit nije nužan";
  return text;
}

function protText(kg) {
  kg = +kg;
  if (!(kg >= 30 && kg <= 250)) return "upiši težinu";
  return `${Math.round(kg * 1.6)}–${Math.round(kg * 2)} g proteina, do ${Math.round(kg)} g masti dnevno`;
}

function chosen(pt) {
  const list = opts(pt, ans.equip);
  const saved = list.find((o) => o.n === CH[pt.id]);
  return (saved || list.find((o) => o.rec) || list[0]).n;
}

function render() {
  back.hidden = step < 0 || step >= Q.length;
  document.querySelector(".logo").style.visibility = step < 0 ? "hidden" : "";
  if (step < 0) return renderHome();
  if (step >= Q.length) return renderPlan();
  renderQuestion(Q[step]);
}

function renderHome() {
  app.innerHTML = `
    <section class="hero fade">
      <div class="brand">
        <span class="heromark">${LOGO}</span>
        <span class="bname">Trainia</span>
      </div>
      <h1>Plan treninga za tebe, u ${Q.length} pitanja.</h1>
      <button class="btn" id="go">Kreni</button>
    </section>`;

  document.getElementById("go").onclick = () => {
    step = 0;
    render();
  };
}

function renderQuestion(q) {
  const options = q.o(ans);
  const progress = ((step + 1) / Q.length) * 100;

  app.innerHTML = `
    <div class="bar"><b style="width:${progress}%"></b></div>
    <section class="q fade">
      <div class="step">Pitanje ${step + 1} od ${Q.length}</div>
      <h2>${q.t}</h2>
      <p>${desc(q)} ${q.help ? helpButton("help") : ""}</p>
      <div class="opts">
        ${options.map((o, i) => optionButton(q, o, i)).join("")}
      </div>
    </section>`;

  bindHelp();
  app.querySelectorAll(".opt").forEach((button) => {
    button.onclick = () =>
      answer(
        q,
        options.find((o) => String(o[0]) === button.dataset.v),
      );
  });
}

function optionButton(q, [value, label, sub, rec, disabled], i) {
  return `
    <button class="opt${ans[q.id] === value ? " on" : ""}" data-v="${value}"${disabled ? " disabled" : ""}>
      <span class="plate" style="background:${COLORS[i % COLORS.length]}">${q.id === "days" ? value : label[0]}</span>
      <span>
        <strong>${label}${badge(rec)}</strong>
        ${sub ? `<span>${sub}</span>` : ""}
      </span>
    </button>`;
}

function answer(q, option) {
  ans[q.id] = option[0];

  const stillValid = (id) =>
    QBY(id)
      .o(ans)
      .some((o) => o[0] === ans[id]);
  if (q.id === "days" && ans.split && !stillValid("split")) delete ans.split;
  if (q.id === "focus" && ans.priority && !stillValid("priority")) delete ans.priority;
  if (ans.time === "45" && isFB(ans)) delete ans.time;

  step++;
  if (step >= Q.length) storage.set("trainia", ans);
  render();
  window.scrollTo(0, 0);
}

function renderPlan() {
  if (ans.level !== "beg") W1 = false;
  const plan = buildPlan(ans);

  app.innerHTML = `
    <section class="fade">
      <div class="step">Tvoj plan</div>
      <h1 class="plan-title">${planName(ans)}</h1>
      ${summaryChips()}
      ${weekToggle()}
      ${intro()}
      ${weekStrip()}
      ${plan.map(dayCard).join("")}
      ${volumeChart(plan)}
      ${sportSection()}
      ${fatLossSection()}
      ${nutritionSection()}
      ${infoSections()}
      ${progressSection()}
      ${exportSection()}
      <button class="btn alt" id="edit">Promijeni odgovore</button>
      <button class="btn" id="new">Novi plan od početka</button>
    </section>`;

  bindHelp();
  bindPlan(plan);
  bindCalculators();
}

function summaryChips() {
  const prio = (QBY("priority")
    .o({ focus: "full" })
    .find((o) => o[0] === ans.priority) || [])[1];
  const chips = [
    LABELS.goal[ans.goal],
    `${ans.days}x tjedno`,
    LABELS.focus[ans.focus],
    ans.priority && ans.priority !== "none" && prio ? `Prioritet: ${prio}` : "",
    LABELS.level[ans.level],
    `2×${REPS[ans.reps].r} ${helpButton("help")}`,
    LABELS.equip[ans.equip],
  ];
  return `
    <div class="sum">
      ${chips
        .filter(Boolean)
        .map((c) => `<span class="chip">${c}</span>`)
        .join("")}
    </div>`;
}

function weekToggle() {
  if (ans.level !== "beg") return "";
  return `
    <div class="seg" role="tablist">
      <button class="${W1 ? "on" : ""}" data-w="1">Tjedan 1 – uvod</button>
      <button class="${W1 ? "" : "on"}" data-w="0">Od 2. tjedna</button>
    </div>`;
}

function intro() {
  if (W1) {
    return `
      <p class="intro">
        <b>Prvi tjedan:</b> na svakoj vježbi samo <b>1 radna serija</b> uz 1–2 serije zagrijavanja.
        Nađi kilažu s kojom dođeš do otkaza na oko ${REPS[ans.reps].w1} ponavljanja.
        Gledaš paše li ti vježba i je li forma ok. Ako ne paše, klikni na nju i zamijeni je.
      </p>`;
  }
  const fb = isFB(ans);
  return `
    <p class="intro">
      <b>${fb ? "Sve tri" : "Obje"} radne serije s istom kilažom.</b>
      U ${fb ? "prve dvije" : "prvoj"} namjerno ostavi 1–2 ponavljanja u rezervi ${helpButton("rir")}.
      Bitno je da zadnju odradiš do otkaza ili najviše 1 ponavljanje prije.
    </p>`;
}

function weekStrip() {
  const training = WEEK[ans.days];
  return `
    <div class="week">
      ${WD.map((d, i) => `<div class="wd${training.includes(i) ? " t" : ""}"><i></i>${d}</div>`).join("")}
    </div>`;
}

function dayCard(day, i) {
  return `
    <details data-i="${i}"${OPEN.has(i) ? " open" : ""}>
      <summary>
        <span class="plate" style="background:${COLORS[i % 3]}">${i + 1}</span>
        <span>
          <h3>${day.name}</h3>
          <small>${day.day} · ${day.ex.length} vježbi · oko ${minutes(day, W1)} min</small>
        </span>
      </summary>
      <ul class="ex">
        ${day.ex.map(exerciseRow).join("")}
      </ul>
    </details>`;
}

function exerciseRow(e) {
  const pt = PBY[e.id];
  return `
    <li>
      <button class="exb" data-pid="${e.id}">
        <span class="n">${chosen(pt)}${e.p ? '<span class="pr">Prioritet</span>' : ""}</span>
        <span class="d">${sets(e)}×${reps(e)}<small>odmor ${e.rest}</small></span>
        <span class="m">
          <i class="dot" style="background:${MC[pt.m]}"></i>${MUSCLE[pt.m]} · ${pt.name} · <b>Promijeni</b>
        </span>
      </button>
    </li>`;
}

function volumeChart(plan) {
  const vol = {};
  plan.forEach((d) => d.ex.forEach((e) => (vol[e.m] = (vol[e.m] || 0) + e.sets)));
  const max = Math.max(...Object.values(vol));
  const prio = PRIO[ans.priority] || [];
  const rows = Object.entries(vol)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([m, v]) => `
        <div class="vr${prio.includes(m) ? " p" : ""}">
          <span>${MUSCLE[m]}</span>
          <div><b style="width:${(v / max) * 100}%"></b></div>
          <em>${v}</em>
        </div>`,
    )
    .join("");
  return `
    <h2 class="sec">Tjedne serije po mišiću</h2>
    <div class="vol">${rows}</div>`;
}

function tips(title, items) {
  return `
    <h2 class="sec">${title}</h2>
    <ul class="tips">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>`;
}

function sportSection() {
  if (ans.sport === "combat") {
    return tips("Uz borilački sport", [
      "<b>Full body 2–3x tjedno</b> je najbolja opcija: svaki mišić dobije dovoljno rada, a ostaje snage za sparinge i tehniku.",
      "<b>Teški trening nogu</b> ne stavljaj dan prije sparinga ili natjecanja.",
      "<b>Ako ne stižeš oporaviti,</b> prvo smanji broj serija, a ne borilačke treninge.",
    ]);
  }
  if (ans.sport === "other") {
    return tips("Uz drugi sport", [
      "<b>Teški trening nogu</b> ne stavljaj dan prije utakmice ili važnog treninga.",
      "<b>Ako ne stižeš oporaviti,</b> smanji broj treninga u teretani prije nego što smanjiš sport.",
    ]);
  }
  return "";
}

function fatLossSection() {
  if (ans.goal !== "fat") return "";
  return (
    tips("Mršavljenje", [
      "<b>Presudan je kalorijski unos na kraju dana.</b> Mršaviš kad potrošiš više nego što pojedeš. Ne moraš izbaciti sve redom, gladovati ni trčati satima po traci.",
      "<b>Umjeren deficit:</b> oko 300–500 kcal dnevno manje od održavanja, odnosno gubitak od oko 0,5–1% tjelesne mase tjedno. Tako čuvaš mišiće i snagu na treningu.",
      "<b>Trening s utezima ostaje isti.</b> On je signal tijelu da zadrži mišiće dok gubiš masno tkivo.",
      "<b>Ugljikohidrate ne izbacuj.</b> Oni su gorivo za trening. Deficit radiš manjim ukupnim unosom, a ne izbacivanjem jedne skupine namirnica.",
    ]) +
    tips("Kardio", [
      "<b>Nije obavezan, ali se preporučuje.</b> Povećava potrošnju kalorija i dobar je za srce.",
      "<b>Biraj ono što ti je ugodno:</b> brzo hodanje, bicikl, plivanje, veslački ergometar ili eliptični trenažer.",
      "<b>Lagan do umjeren intenzitet,</b> 2–4 puta tjedno po 20–40 minuta. Dovoljno je da možeš pričati dok ga radiš. I svakodnevno hodanje se računa.",
    ])
  );
}

function calorieCalculator() {
  const activity = ACT.map(
    ([, label], i) => `<option value="${i}"${+CAL.act === i ? " selected" : ""}>${label}</option>`,
  ).join("");
  return `
    <div class="calc kc">
      <div class="seg2" role="group" aria-label="Spol">
        <button data-sex="m" class="${CAL.sex === "m" ? "on" : ""}">Muško</button>
        <button data-sex="f" class="${CAL.sex === "f" ? "on" : ""}">Žensko</button>
      </div>
      <label>Dob
        <input id="c-age" type="number" inputmode="numeric" min="15" max="90" placeholder="25" value="${CAL.age || ""}" />
      </label>
      <label>Visina (cm)
        <input id="c-h" type="number" inputmode="numeric" min="130" max="230" placeholder="180" value="${CAL.h || ""}" />
      </label>
      <label>Težina (kg)
        <input id="c-w" type="number" inputmode="decimal" min="30" max="250" placeholder="80" value="${KG || ""}" />
      </label>
      <label class="full">Aktivnost izvan teretane
        <select id="c-act">${activity}</select>
      </label>
      <output id="kcal">${kcalText()}</output>
    </div>`;
}

function proteinCalculator() {
  return `
    <div class="calc">
      <label for="kg">Tvoja težina</label>
      <input id="kg" type="number" inputmode="decimal" min="30" max="250" placeholder="npr. 80" value="${KG || ""}" />
      <span>kg</span>
      <output id="prot">${protText(KG)}</output>
    </div>`;
}

function nutritionSection() {
  return (
    tips("Prehrana", [
      `<b>Koliko kalorija trebaš?</b> Kalkulator procjenjuje tvoju dnevnu potrošnju (TDEE) u dva koraka.
       Prvo izračuna osnovni metabolizam, odnosno koliko tijelo troši u mirovanju, po Mifflin-St Jeor formuli
       iz spola, dobi, visine i težine. Zatim to pomnoži s razinom aktivnosti.
       ${calorieCalculator()}
       Procjena može odstupati 10% ili više. Prva 2–3 tjedna jedi po njoj i prati težinu:
       ako se kreće u krivom smjeru, prilagodi unos za 100–200 kcal.`,
      `<b>Protein: 1,6–2 g po kilogramu tjelesne mase dnevno.</b> Meta-analiza 49 studija pokazala je da iznad
       otprilike 1,6 g/kg dodatni protein više ne donosi primjetno veći rast mišića. Gornja granica ostavlja malo
       rezerve, posebno u deficitu.
       ${proteinCalculator()}
       Izvori: piletina, puretina, jaja, riba, skyr ili grčki jogurt, sir, mahunarke, whey. Rasporedi ga na 3–5 obroka.
       <span class="src">${link("https://pubmed.ncbi.nlm.nih.gov/28698222/", "Morton i sur. (2018), British Journal of Sports Medicine")}</span>`,
      "<b>Ugljikohidrati</b> su glavno gorivo za intenzivan trening. Pune zalihe glikogena u mišićima, pa s njima imaš više snage i ponavljanja. Najviše ih pojedi u obroku prije i poslije treninga. Izvori: riža, krumpir, zob, tjestenina, kruh, voće.",
      "<b>Obrok prije treninga</b> pojedi barem sat vremena prije, a veći obrok 2–3 sata prije, da se stigne probaviti. Neka bude ugljikohidrat uz protein, s malo masti i vlakana, jer oni usporavaju probavu. Primjeri: riža i piletina, zobene pahuljice s jogurtom i bananom, kruh s puretinom.",
      "<b>Masti</b> su potrebne za proizvodnju hormona, uključujući testosteron i estrogen, i za upijanje vitamina A, D, E i K. Orijentacijski unosi onoliko grama masti koliko imaš kilograma: s 80 kg to je najviše oko 80 g dnevno. Izvori: maslinovo ulje, orašasti plodovi, avokado, jaja, masna riba.",
    ]) +
    `<p class="fine">Ovo su opće smjernice za zdrave odrasle osobe. Ako imaš zdravstveno stanje, posavjetuj se s liječnikom ili nutricionistom.</p>`
  );
}

function infoSections() {
  return (
    tips("Prije treninga", [
      "<b>Opće zagrijavanje:</b> prošetaj, na traci ili do teretane. To je dovoljno da digneš tjelesnu temperaturu.",
      "<b>Zagrijavanje na vježbi:</b> 1. serija s 40–50% radne kilaže × 5–6, 2. serija s 60–70% × 2–3. Između njih odmor 1–1,5 min. Ne moraš se zagrijavati više od jednom po treningu, ali ako ti paše, slobodno. Zagrijavanje se ne broji u radne serije.",
      "<b>Redoslijed vježbi</b> je uvijek onakav kako piše i uvijek isti, da možeš pratiti napredak.",
      "<b>Zapisuj</b> kilaže i postavke sprava (visina sjedala, rupa na klupi) za svaku vježbu.",
    ]) +
    tips("Istezanje", [
      "<b>Razmahivanje rukama i razgibavanje prije treninga nije potrebno,</b> osim ako imaš neku ozljedu. Ako ti paše, slobodno ga radi, ali za pokret na određenoj vježbi zagriješ se kroz lakše serije na toj spravi.",
      `<b>Istezanje mišića prije ni nakon treninga nije potrebno.</b> Njime ćeš postati gipkiji, ali ono ne ubrzava
       oporavak i ne smanjuje upalu mišića. Pregled 12 istraživanja pokazao je da istezanje prije ili nakon vježbanja
       ima zanemariv učinak na upalu u danima nakon treninga.
       <span class="src">${link("https://pubmed.ncbi.nlm.nih.gov/21735398/", "Herbert i sur. (2011), Cochrane pregled: istezanje i upala mišića")}</span>`,
      "<b>Ako želiš bolju gipkost,</b> istezanje radi zasebno, kao dodatak, a ne kao obavezni dio treninga.",
    ]) +
    tips("Upala mišića", [
      "<b>Upala nije pokazatelj dobrog ni lošeg treninga.</b> Mišić može rasti i bez upale, a jaka upala može značiti samo da je podražaj bio nov.",
      "<b>Kad se javlja:</b> obično 6–8 sati nakon treninga, a najjača je oko 48 sati nakon. Najizraženija je kod novih vježbi, u prvim tjednima i kod vježbi s jakim istezanjem mišića pod opterećenjem.",
      "<b>S vremenom slabi,</b> jer se tijelo navikne na isti trening. Ako upale više nema, to ne znači da trening ne radi.",
      "<b>Napredak prati u bilješkama,</b> kroz kilaže i ponavljanja, a ne po tome koliko te boli.",
      `<b>Ako je upala tolika da ti smeta na idućem treningu,</b> bilo je previše za sada. Oštra bol ili bol u zglobu
       nije upala mišića: tada stani i posavjetuj se sa stručnjakom.
       <span class="src">${link(
         "https://bretcontreras.com/wp-content/uploads/Is-Postexercise-Muscle-Soreness-a-Valid-Indicator-of-Muscular-Adaptations.pdf",
         "Schoenfeld i Contreras (2013): je li upala mišića pokazatelj napretka?",
       )}</span>`,
    ]) +
    tips("Odmor između serija", [
      "<b>Radne serije:</b> 2–5 min. Teške za noge (čučanj, leg press, RDL, hip thrust) traže više, dok se puls ne smiri.",
      "<b>Jednonožne i jednoručne:</b> oko 1,5–2 min između strana.",
      "Slobodno <b>šetaj</b> između serija.",
    ])
  );
}

function progressSection() {
  const r = REPS[ans.reps];
  return tips("Kako napredovati", [
    `<b>Kad dođeš do ${r.top} ponavljanja,</b> ne diži kilažu odmah. Odradi još jedan trening s tom kilažom i potvrdi da je to pravih ${r.top}, bez kvarenja forme na kraju.`,
    `<b>Tek onda dodaj 2–5%</b> kilaže. Past ćeš na oko ${r.drop} ponavljanja i opet juriš ${r.top}. ${helpButton("help")}`,
    "<b>Kod teških vježbi sa šipkom</b> (čučanj, mrtvo, bench) zadnju seriju završi 1 ponavljanje prije otkaza, osim ako imaš spottera ili sigurnosne šipke.",
    "<b>Vježba ti ne paše?</b> Klikni na nju i odaberi drugu za isti pokret. Izbor se pamti.",
  ]);
}

function exportSection() {
  return `
    <h2 class="sec">Spremi plan</h2>
    <div class="exp">
      <button class="btn" id="copy">Kopiraj cijeli plan</button>
      <button class="btn alt" id="txt">Preuzmi kao tekst</button>
      <button class="btn alt" id="pdf">Spremi kao PDF</button>
    </div>
    <p class="fine" id="copymsg" role="status"></p>`;
}

function bindPlan(plan) {
  app.querySelectorAll("details").forEach((el) => {
    el.ontoggle = () => {
      const i = +el.dataset.i;
      el.open ? OPEN.add(i) : OPEN.delete(i);
    };
  });

  app.querySelectorAll(".exb").forEach((button) => {
    button.onclick = () => openPick(button.dataset.pid);
  });

  app.querySelectorAll(".seg button").forEach((button) => {
    button.onclick = () => {
      W1 = button.dataset.w === "1";
      render();
    };
  });

  const text = planText(plan);
  const msg = document.getElementById("copymsg");

  document.getElementById("copy").onclick = () => {
    if (!navigator.clipboard) return showText(text);
    navigator.clipboard.writeText(text).then(
      () => (msg.textContent = "Plan je kopiran. Zalijepi ga u bilješke ili poruku."),
      () => showText(text),
    );
  };

  document.getElementById("txt").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    a.download = "trainia-plan.txt";
    a.click();
  };

  document.getElementById("pdf").onclick = () => {
    OPEN.clear();
    plan.forEach((_, i) => OPEN.add(i));
    render();
    setTimeout(() => window.print(), 50);
  };

  document.getElementById("edit").onclick = () => {
    step = 0;
    render();
    window.scrollTo(0, 0);
  };

  document.getElementById("new").onclick = () => {
    ans = {};
    storage.remove("trainia");
    step = 0;
    render();
    window.scrollTo(0, 0);
  };
}

function bindCalculators() {
  const kgInput = document.getElementById("kg");
  const weightInput = document.getElementById("c-w");

  const update = () => {
    document.getElementById("prot").textContent = protText(KG);
    document.getElementById("kcal").textContent = kcalText();
    storage.set("trainia-kg", KG);
    storage.set("trainia-cal", CAL);
  };

  kgInput.oninput = () => {
    KG = +kgInput.value || 0;
    weightInput.value = kgInput.value;
    update();
  };
  weightInput.oninput = () => {
    KG = +weightInput.value || 0;
    kgInput.value = weightInput.value;
    update();
  };
  document.getElementById("c-age").oninput = (e) => {
    CAL.age = +e.target.value || 0;
    update();
  };
  document.getElementById("c-h").oninput = (e) => {
    CAL.h = +e.target.value || 0;
    update();
  };
  document.getElementById("c-act").onchange = (e) => {
    CAL.act = +e.target.value;
    update();
  };
  app.querySelectorAll("[data-sex]").forEach((button) => {
    button.onclick = () => {
      CAL.sex = button.dataset.sex;
      app.querySelectorAll("[data-sex]").forEach((b) => b.classList.toggle("on", b === button));
      update();
    };
  });
}

function planText(plan) {
  const lines = [`TRAINIA – ${planName(ans)}`, ""];
  plan.forEach((day, i) => {
    lines.push(`${i + 1}. ${day.name} (${day.day}, oko ${minutes(day, W1)} min)`);
    day.ex.forEach((e) => {
      const prio = e.p ? " (prioritet)" : "";
      lines.push(`   - ${chosen(PBY[e.id])}: ${sets(e)} × ${reps(e)}, odmor ${e.rest}${prio}`);
    });
    lines.push("");
  });
  lines.push(
    `Prva ${isFB(ans) ? "i druga serija" : "serija"}: 1–2 ponavljanja u rezervi. Zadnja serija: do otkaza ili 1 ponavljanje prije. Sve radne serije s istom kilažom.`,
  );
  lines.push(
    `Kad dođeš do ${REPS[ans.reps].top} ponavljanja, potvrdi na još jednom treningu, pa dodaj 2–5% kilaže.`,
  );
  return lines.join("\n");
}

function openModal(html) {
  modal.querySelector(".box").innerHTML = html;
  modal.querySelectorAll("[data-rir]").forEach((button) => {
    button.onclick = (ev) => {
      ev.stopPropagation();
      openRir();
    };
  });
  modal.hidden = false;
  const close = document.getElementById("hclose");
  close.focus();
  close.onclick = closeModal;
}

function closeModal() {
  modal.hidden = true;
}

function showText(text) {
  openModal(`
    <h3>Kopiraj plan</h3>
    <p>Označi tekst i kopiraj ga.</p>
    <textarea class="ta" readonly>${text.replace(/</g, "&lt;")}</textarea>
    <button class="btn" id="hclose">Zatvori</button>`);
  const area = modal.querySelector("textarea");
  area.focus();
  area.select();
}

function openHelp() {
  const r = REPS[ans.reps || "high"];
  openModal(`
    <h3>Zašto broj ponavljanja nije toliko bitan?</h3>
    <p>
      Mišić raste podjednako na 6 ili na 14 ponavljanja, ako seriju odradiš blizu otkaza.
      Najviše rade zadnja, najteža ponavljanja, kad mišić jedva izgura težinu.
      Zato je najbitnije odabrati pravu kilažu.
    </p>
    <ul>
      <li>
        <b>${isFB(ans) ? "Prve dvije serije" : "Prva serija"}:</b> ostavi 1–2 ponavljanja u rezervi (RIR),
        da ti ostane snage za zadnju. Staneš kad osjetiš da bi mogao još jedno ili dva. ${helpButton("rir")}
      </li>
      <li>
        <b>Zadnja serija:</b> ista kilaža, do otkaza ili najviše 1 ponavljanje prije.
        Otkaz znači: ako je ${r.top}. ponavljanje zadnje koje izguraš, a ${r.top + 1}. više ne ide.
      </li>
      <li>
        <b>Napredak:</b> kad dođeš do ${r.top} ponavljanja, odradi još jedan trening da potvrdiš, pa dodaj 2–5%.
        Past ćeš na oko ${r.drop} i kroz treninge se opet penješ prema ${r.top}.
      </li>
    </ul>
    <p class="note">
      Kod teških vježbi sa šipkom (čučanj, mrtvo dizanje, bench) zadnju seriju završi 1 ponavljanje prije otkaza,
      osim ako imaš spottera ili sigurnosne šipke.
    </p>
    <button class="btn" id="hclose">Kužim</button>`);
}

function openRir() {
  openModal(`
    <h3>Zašto ostaviti ponavljanje u rezervi?</h3>
    <p>Zato što ti otkaz u prvoj seriji ne donosi više rasta, a uzme ti snagu za iduću.</p>
    <ul>
      <li>
        <b>Rast je isti.</b> U istraživanju na treniranim ljudima jedna je noga trenirala do otkaza,
        a druga s 1–2 ponavljanja u rezervi. Nakon 8 tjedana kvadriceps je jednako narastao na obje noge.
      </li>
      <li>
        <b>Umor je veći.</b> Kod treninga do otkaza pad broja ponavljanja i brzine dizanja bio je stalno veći
        nego kad su ostavljali ponavljanja u rezervi.
      </li>
      <li>
        <b>Što to znači za tebe:</b> ako prvu seriju odradiš do otkaza, u idućoj napraviš manje ponavljanja,
        a mišić ne dobije ništa više. S 1–2 ponavljanja u rezervi zadnju seriju odradiš jače i lakše pratiš napredak.
      </li>
    </ul>
    <p class="src">
      Istraživanje: ${link(
        "https://pubmed.ncbi.nlm.nih.gov/38393985/",
        "Refalo i sur. (2024), Journal of Sports Sciences: sličan rast mišića do otkaza i s ponavljanjima u rezervi",
      )}
    </p>
    <button class="btn" id="hclose">Kužim</button>`);
}

function openPick(pid) {
  const pt = PBY[pid];
  const current = chosen(pt);
  const sources = pt.src
    ? `<p class="src">Istraživanja: ${pt.src.map(([text, href]) => link(href, text)).join(" · ")}</p>`
    : "";
  const options = opts(pt, ans.equip)
    .map(
      (o) => `
        <button class="opt${o.n === current ? " on" : ""}" data-n="${o.n.replace(/"/g, "&quot;")}">
          <span class="radio"></span>
          <span>
            <strong>${o.n}${o.rec ? '<span class="pr">Preporuka</span>' : ""}</strong>
            ${o.rec ? `<span>${o.rec}</span>` : ""}
            ${o.note ? `<span class="warn">${o.note}</span>` : ""}
          </span>
        </button>`,
    )
    .join("");

  openModal(`
    <div class="step">${MUSCLE[pt.m]} · ${pt.t === "c" ? "višezglobna" : "izolacija"}</div>
    <h3>${pt.name}</h3>
    ${pt.tip ? `<p class="note">${pt.tip}</p>` : ""}
    ${sources}
    <div class="opts">${options}</div>
    <button class="btn alt" id="hclose">Zatvori</button>`);

  modal.querySelectorAll(".opt").forEach((button) => {
    button.onclick = () => {
      CH[pid] = button.dataset.n;
      storage.set("trainia-ch", CH);
      closeModal();
      render();
    };
  });
}

function bindHelp() {
  app.querySelectorAll("[data-help]").forEach((button) => {
    button.onclick = (ev) => {
      ev.stopPropagation();
      openHelp();
    };
  });
  app.querySelectorAll("[data-rir]").forEach((button) => {
    button.onclick = (ev) => {
      ev.stopPropagation();
      openRir();
    };
  });
}

modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

back.onclick = () => {
  step = Math.max(-1, step - 1);
  render();
};

const saved = storage.get("trainia", null);
if (saved && Q.every((q) => saved[q.id] !== undefined)) {
  ans = saved;
  step = Q.length;
}

render();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
