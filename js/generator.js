function opts(p, eq) {
  const ok = p.o.filter((o) => EQ[eq].includes(o.eq));
  const nobw = ok.filter((o) => o.eq !== "bw");
  return eq !== "bw" && nobw.length ? nobw : ok;
}
function pick(m, type, eq, counter, used) {
  let pool = P.filter((p) => p.m === m && !used.has(p.id) && opts(p, eq).length);
  if (!pool.length) return null;
  const typed = pool.filter((p) => p.t === type);
  if (typed.length) pool = typed;
  const k = m + type;
  const n = counter[k] || 0;
  counter[k] = n + 1;
  return pool[n % pool.length];
}
const RMIN = { "3–5 min": 4, "2–3 min": 2.5, "1,5–2 min": 1.75, "2 min": 2 };
function minutes(d, w1) {
  return Math.round(
    5 +
      d.ex.reduce((t, e) => {
        const n = (w1 ? 1 : e.sets) * (UNI.includes(e.id) ? 2 : 1);
        return t + 2 + n + (n - 1) * RMIN[e.rest];
      }, 0),
  );
}
function trim(d, budget) {
  const KEEP = ["vpull", "hpull"];
  while (minutes(d) > budget && d.ex.length > 3) {
    let j = d.ex.map((e) => !e.p && !KEEP.includes(e.id)).lastIndexOf(true);
    if (j < 0)
      j = d.ex.map((e, k) => e.p && d.ex.some((x, q) => q < k && x.p && x.m === e.m)).lastIndexOf(true);
    if (j < 0) break;
    d.used.delete(d.ex[j].id);
    d.ex.splice(j, 1);
  }
}
function buildPlan(a) {
  const budget = a.time === "any" ? Infinity : +a.time || 90;
  const keys = planKeys(a),
    prio = PRIO[a.priority] || [];
  const counter = {},
    seen = {};
  keys.forEach((k) => (seen[k] = (seen[k] || 0) + 1));
  const nth = {};
  const days = keys.map((k, i) => {
    const t = DAYS[k];
    let slots = t.s.map(([m, type]) => ({ m, type, p: false }));
    const hits = prio.filter((m) => GROUP[t.g].includes(m));
    if (hits.length) {
      const front = slots.filter((s) => hits.includes(s.m)),
        rest = slots.filter((s) => !hits.includes(s.m));
      hits.forEach((m) => {
        if (!front.some((s) => s.m === m)) front.push({ m, type: "c" });
        if (front.filter((s) => s.m === m).length < 3) front.push({ m, type: "i" });
      });
      front.forEach((s) => (s.p = true));
      front.sort((x, y) => (x.type === "c" ? 0 : 1) - (y.type === "c" ? 0 : 1));
      slots = front.concat(rest);
    }
    const used = new Set();
    const ex = slots
      .map((s) => {
        const e = pick(s.m, s.type, a.equip, counter, used);
        if (!e) return null;
        used.add(e.id);
        return mk(e, s.p, a);
      })
      .filter(Boolean);
    while (ex.length > CAP[a.level]) {
      const j = ex.map((e) => e.p).lastIndexOf(false);
      if (j < 0) break;
      used.delete(ex[j].id);
      ex.splice(j, 1);
    }
    nth[k] = (nth[k] || 0) + 1;
    const suffix =
      seen[k] > 1 ? (/ [ABC]$/.test(t.name) ? (nth[k] > 1 ? " (2)" : "") : " " + "ABC"[nth[k] - 1]) : "";
    const d = { name: t.name + suffix, day: WD[WEEK[a.days][i]], g: t.g, used, ex };
    return d;
  });
  ["vpull", "hpull"].forEach((id) => {
    const pt = PBY[id];
    if (!opts(pt, a.equip).length || days.some((d) => d.ex.some((e) => e.id === id))) return;
    const d = days.filter((d) => GROUP[d.g].includes("back")).sort((x, y) => x.ex.length - y.ex.length)[0];
    if (!d) return;
    d.used.add(id);
    const j = d.ex.map((e) => e.t === "c").lastIndexOf(true);
    d.ex.splice(j + 1, 0, mk(pt, prio.includes("back"), a));
  });
  days.forEach((d) => trim(d, budget));
  const vol = {};
  days.forEach((d) => d.ex.forEach((e) => (vol[e.m] = (vol[e.m] || 0) + e.sets)));
  const blocked = new Set();
  for (let guard = 0; guard < 80; guard++) {
    let m = null,
      def = 0;
    ALL.forEach((x) => {
      const dd = target(x, a) - (vol[x] || 0);
      if (!blocked.has(x) && dd > def) {
        def = dd;
        m = x;
      }
    });
    if (!m) break;
    const d = days
      .filter((d) => GROUP[d.g].includes(m) && d.ex.length < MAXEX[a.level])
      .sort((x, y) => x.ex.length - y.ex.length)[0];
    const e = d && pick(m, "i", a.equip, counter, d.used);
    if (!e || minutes({ ex: d.ex.concat(mk(e, prio.includes(m), a)) }) > budget) {
      blocked.add(m);
      continue;
    }
    d.used.add(e.id);
    const p = prio.includes(m),
      item = mk(e, p, a);
    if (p) {
      const j = d.ex.map((x) => x.p).lastIndexOf(true);
      d.ex.splice(j + 1, 0, item);
    } else d.ex.push(item);
    vol[m] = (vol[m] || 0) + item.sets;
  }
  return days;
}
const HEAVY = ["squat", "hinge", "thrust"],
  UNI = ["single", "stepup"];
function restFor(pt) {
  if (HEAVY.includes(pt.id)) return "3–5 min";
  if (UNI.includes(pt.id)) return "1,5–2 min";
  return pt.t === "c" ? "2–3 min" : "2 min";
}
const isFB = (a) => {
  const k = planKeys(a);
  return k.length > 0 && k.every((x) => x.startsWith("full"));
};
function mk(pt, p, a) {
  return {
    id: pt.id,
    m: pt.m,
    t: pt.t,
    p,
    sets: (isFB(a) ? 3 : 2) + (p ? 1 : 0),
    reps: REPS[a.reps].r,
    rest: restFor(pt),
  };
}
