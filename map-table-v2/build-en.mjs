import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/Victor/Documents/hermes_obsidian_memory/skills/ui-ux-design/anatomy/kit/iso-kit.mjs";
import { kitScript } from "file:///C:/Users/Victor/Documents/hermes_obsidian_memory/skills/ui-ux-design/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WIDTH = 600, HEIGHT = 372;

/* ---------- world: a surveyor's chart table ---------- */
const TABLE = { x: -138, y: -72, w: 276, d: 144, r: 10 };
const TABLE_H = 12, FOOT_H = 5;
const SEA = { x: -128, y: -62, w: 256, d: 124, r: 8 };
const SEA_Z = 0, SEA_H = 2;

/* four territories, each a relief plate; height reads as density of evidence */
const T = {
  cases:      { x: -120, y: -54, w: 116, d: 56, r: 4, h: 10 },
  skills:     { x:    6, y: -54, w: 114, d: 56, r: 4, h: 14 },
  experience: { x: -120, y:  10, w: 116, d: 48, r: 4, h:  8 },
  hire:       { x:    6, y:  10, w: 114, d: 48, r: 4, h: 12 },
};
const TOP = Object.fromEntries(Object.entries(T).map(([id, t]) => [id, SEA_Z + SEA_H + t.h]));
const REG_ORDER = ["cases", "skills", "experience", "hire"];
const topAt = (x, y) => {
  for (const id of REG_ORDER) {
    const t = T[id];
    if (x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.d) return TOP[id];
  }
  return SEA_Z + SEA_H;
};

/* the route: five survey flags, assistant to Head of Product */
const FLAGS = [
  { id: "assist", x: -96, y:  32, ter: "experience" },
  { id: "po",     x: -96, y: -30, ter: "cases" },
  { id: "res",    x: -30, y: -30, ter: "cases" },
  { id: "dpm",    x:  40, y: -30, ter: "skills" },
  { id: "hop",    x:  90, y:  32, ter: "hire" },
];
/* two beacons: the two places the business model changed */
const BEACONS = [
  { x: -40, y: -44, ter: "cases",  h: 17 },
  { x:  92, y: -44, ter: "skills", h: 17 },
];
const PEAKS = [
  { x: -110, y: -44, ter: "cases",      r: 5.5, h:  9 },
  { x:   30, y: -46, ter: "skills",     r: 6.5, h: 11 },
  { x: -110, y:  40, ter: "experience", r: 5.0, h:  7 },
];
const TREES = [
  { x: -18, y: -40, ter: "cases" }, { x: 104, y: -18, ter: "skills" },
  { x: -42, y:  30, ter: "experience" }, { x: 24, y: 42, ter: "hire" },
];
const COMPASS = { x: -108, y: 44, ter: "experience" };
const PHONE = { x: 98, y: 18, ter: "hire" };
const BRIDGE = { x: -8, y: -30 };

/* ---------- copy: every figure carries its measurement base ---------- */
const REGIONS = [
  { id: "cases",      jump: "#cases",      name: "Cases Bay",     sub: "TTM x1.8 \u00b7 +16% revenue A/B",         read: "cases \u00b7 TTM x1.8 \u00b7 +16% revenue A/B" },
  { id: "skills",     jump: "#skills",     name: "Skills Ridge",  sub: "130+ interviews \u00b7 20+ cycles",        read: "skills \u00b7 130+ interviews \u00b7 20+ cycles" },
  { id: "experience", jump: "#experience", name: "Track Plateau", sub: "6.5M views back \u00b7 ~4M MAU",           read: "track \u00b7 6.5M views back \u00b7 ~4M MAU" },
  { id: "hire",       jump: "#hire",       name: "Hire Beacon",   sub: "20 \u2192 80% blind n=30 \u00b7 CSAT ~97% n=2581", read: "hire \u00b7 20 \u2192 80% blind n=30 \u00b7 CSAT ~97% n=2581" },
];
const JUMPS = { cases: "#cases", skills: "#skills", experience: "#experience", hire: "#hire", contact: "https://t.me/victorpinksight" };
const ARIA = "Chart table of a product career: four territories \u2014 cases, skills, track, hire \u2014 with an expedition route of five flags from assistant to Head of Product, two beacons where the business model changed, a compass, a survey boat and a phone booth to Telegram. Arrow keys pick a territory, Enter opens its section.";
const CONTACT_READ = "contact \u00b7 telegram \u2014 replies within a day";
const HINT = "Hover a territory \u2014 it lifts and lights; click to jump";

const P = k.fitProjection(
  [...k.boxCorners(TABLE, -TABLE_H - FOOT_H, 0),
   ...k.boxCorners(SEA, 0, SEA_H + 14),
   [BEACONS[0].x, BEACONS[0].y, TOP.cases + 26],
   [BEACONS[1].x, BEACONS[1].y, TOP.skills + 26],
   [FLAGS[4].x, FLAGS[4].y, TOP.hire + 24]],
  WIDTH, HEIGHT, { pad: 34, azimuth: 42 });

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const liftV = (() => { const o = k.iso([0, 0, 0], P), u = k.iso([0, 0, 6], P); return [u[0] - o[0], u[1] - o[1]]; })();

/* ---------- the table ---------- */
function drawer() {
  /* a drawer front on the near face, with a pull: the cue that this is furniture */
  const out = [];
  const face = { x: -44, y: TABLE.y + TABLE.d, w: 100, d: 2.6, r: 1.2 };
  out.push(S(k.slabOf(face, -10.4, 8, P, 4, 0.5), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(face, 1.4), -10.4 + 8, P, 4), { tone: "faint" }));
  out.push(L(k.lineOnTop([face.x + 6, face.y + 1.3], [face.x + 34, face.y + 1.3], -10.4 + 6.2, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([face.x + 6, face.y + 1.3], [face.x + 22, face.y + 1.3], -10.4 + 4.6, P), { tone: "faint", free: true }));
  const pull = { x: -2, y: face.y + face.d, w: 26, d: 1.8, r: 0.9 };
  out.push(S(k.slabOf(pull, -6.8, 1.8, P, 3, 0.4), { tone: "hi" }));
  out.push(D([at([pull.x + 3, pull.y + 0.9, -5]), at([pull.x + pull.w - 3, pull.y + 0.9, -5])], { size: 0.4, tone: "hi" }));
  /* two straight edges, as on a drafting table */
  for (const x of [TABLE.x + 6, TABLE.x + TABLE.w - 9]) {
    out.push(S(k.slabOf({ x, y: TABLE.y + 10, w: 3, d: TABLE.d - 20, r: 1 }, 0, 1.8, P, 3, 0.4), { tone: "mid" }));
    out.push(D([at([x + 1.5, TABLE.y + 14, 1.8]), at([x + 1.5, TABLE.y + TABLE.d - 14, 1.8])], { size: 0.4 }));
  }
  return out.join("");
}

function table() {
  const out = [`<path class="iso-halo" d="${k.haloOf(TABLE, -TABLE_H - FOOT_H, TABLE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(TABLE, 24))) {
    out.push(S(k.cylinder(x, y, 7, -TABLE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.2, -TABLE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(TABLE, -TABLE_H, TABLE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(TABLE, 5), 0, P), { tone: "lo" }));
  /* apron seam wraps the side of the slab: a real edge, not a floating rule */
  out.push(L(k.sideSeam(TABLE, -TABLE_H * 0.45, P, 8), { tone: "faint" }));
  const screws = k.corners(TABLE, 11);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  /* corner brackets sit on the four table corners, outside the chart */
  for (const [x, y] of [[TABLE.x + 6, TABLE.y + 6], [TABLE.x + TABLE.w - 6, TABLE.y + 6],
                        [TABLE.x + 6, TABLE.y + TABLE.d - 6], [TABLE.x + TABLE.w - 6, TABLE.y + TABLE.d - 6]]) {
    out.push(S(k.slabOf({ x: x - 4, y: y - 4, w: 8, d: 8, r: 1.4 }, 0, 1.1, P, 3, 0.3), { tone: "mid" }));
    out.push(D([at([x, y, 1.1])], { size: 0.42 }));
  }
  /* scale strip along the near edge, ticks hang from the strip edge */
  const strip = { x: -112, y: TABLE.y + TABLE.d - 15, w: 224, d: 6, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.7, 0.6, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3, 0.6]), at([strip.x + strip.w - 2, strip.y + 3, 0.6])], { size: 0.45 }));
  /* title plate: three engraved rules and two rivets */
  const plate = { x: 58, y: TABLE.y + 8, w: 62, d: 12, r: 2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 4), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.6), 0.8, P, 4), { tone: "faint" }));
  out.push(L(k.lineOnTop([plate.x + 4, plate.y + 4], [plate.x + plate.w - 6, plate.y + 4], 0.8, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([plate.x + 4, plate.y + 7], [plate.x + plate.w - 12, plate.y + 7], 0.8, P), { tone: "lo", free: true }));
  out.push(D([at([plate.x + 3, plate.y + 9.5, 0.8]), at([plate.x + plate.w - 3, plate.y + 9.5, 0.8])], { size: 0.4 }));
  return out.join("");
}

function sea() {
  const out = [];
  out.push(S(k.slabOf(SEA, SEA_Z, SEA_H, P, 6, 0.8), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(SEA, 3), SEA_Z + SEA_H, P, 6), { tone: "faint" }));
  /* sounding line across the strait, ends on its own dots */
  out.push(L(k.onTop([[-4, -2], [2, 44]], SEA_Z + SEA_H, P), { tone: "faint", dotted: true, free: true }));
  out.push(D([at([-4, -2, SEA_H]), at([2, 44, SEA_H])], { size: 0.45, tone: "lo" }));
  return out.join("");
}

/* ---------- territories ---------- */
function territory(id) {
  const t = T[id], z = TOP[id], out = [];
  out.push(S(k.slabOf(t, SEA_Z + SEA_H, t.h, P, 5, 0.7), { tone: "hi", crease: "lo" }));
  out.push(L(k.sideSeam(t, SEA_Z + SEA_H + t.h * 0.55, P, 5), { tone: "faint" }));
  out.push(S(k.slabOf(k.insetPlan(t, 5), z, 0.7, P, 4), { tone: "mid", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(t, 8), z + 0.7, P, 4), { tone: "faint" }));
  return out.join("");
}

function peak(p) {
  const z = TOP[p.ter], out = [];
  out.push(S(k.cylinder(p.x, p.y, p.r, z, p.h, P, 36), { tone: "hi", crease: "lo" }));
  out.push(L(k.sideArc(p.x, p.y, p.r, z + p.h * 0.6, P, 20), { tone: "faint" }));
  out.push(L(k.ring(p.x, p.y, p.r * 0.45, z + p.h, P, 24), { tone: "lo" }));
  out.push(D([at([p.x, p.y, z + p.h])], { size: 0.5, tone: "hi" }));
  /* a contour ring at the foot: closed, so it ends on itself */
  out.push(L(k.ring(p.x, p.y, p.r + 2.6, z + 0.7, P, 40), { tone: "faint" }));
  return out.join("");
}

function tree(t) {
  const z = TOP[t.ter], out = [];
  out.push(S(k.cylinder(t.x, t.y, 1.1, z, 3, P, 14), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(t.x, t.y, 2.6, z + 3, 3.6, P, 18), { tone: "hi", crease: "lo" }));
  out.push(L(k.sideArc(t.x, t.y, 2.6, z + 4.4, P, 14), { tone: "faint" }));
  return out.join("");
}

function beacon(b, bi) {
  const z = TOP[b.ter], out = [];
  out.push(S(k.cylinder(b.x, b.y, 3.4, z, 3, P, 24), { tone: "mid" }));          /* footing */
  out.push(S(k.cylinder(b.x, b.y, 2.2, z + 3, b.h, P, 24), { tone: "hi", crease: "lo" })); /* tower */
  /* two painted bands make the tower read as a lighthouse, not a pin */
  for (const share of [0.3, 0.68]) {
    const zz = z + 3 + b.h * share;
    out.push(L(k.sideArc(b.x, b.y, 2.2, zz, P, 18), { tone: "faint" }));
    out.push(L(k.ring(b.x, b.y, 2.2, zz, P, 24), { tone: "faint" }));
  }
  out.push(S(k.cylinder(b.x, b.y, 3.1, z + 3 + b.h, 1.1, P, 24), { tone: "mid" })); /* gallery */
  out.push(S(k.cylinder(b.x, b.y, 2.6, z + 3 + b.h + 1.1, 2.6, P, 24), { tone: "mid" })); /* lamp room */
  out.push(S(k.cylinder(b.x, b.y, 1.6, z + 3 + b.h + 1.5, 1.8, P, 18), { tone: "hi", lit: true })); /* lamp */
  out.push(S(k.cylinder(b.x, b.y, 2.9, z + 3 + b.h + 3.7, 1.3, P, 24), { tone: "mid" })); /* cap */
  out.push(D([at([b.x, b.y, z + 3 + b.h + 5.2])], { size: 0.45, tone: "hi" }));
  out.push(`<g data-beacon="${bi}">${D([at([b.x, b.y, z + 3 + b.h + 2.4])], { size: 0.66, tone: "hi" })}</g>`);
  return out.join("");
}

function flag(f, i) {
  const z = topAt(f.x, f.y), out = [];
  out.push(S(k.cylinder(f.x, f.y, 0.7, z, 15, P, 12), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(f.x, f.y, 1.25, z + 15, 1.1, P, 14), { tone: "mid" }));  /* finial */
  out.push(D([at([f.x, f.y, z + 15.8])], { size: 0.4, tone: "hi" }));
  /* the pennant is a real triangle: a cloth, not a plate, so it reads as a flag at 1x */
  const top = at([f.x, f.y, z + 14.6]);
  const tip = at([f.x + 12, f.y - 1.6, z + 13.4]);
  const foot = at([f.x, f.y, z + 10.4]);
  const pts = [top, tip, foot].map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L");
  const fill = i === FLAGS.length - 1 ? "var(--anatomy-lit)" : "var(--anatomy-hi)";
  out.push(`<g data-penn="${i}" data-ax="${top[0].toFixed(1)}" data-ay="${top[1].toFixed(1)}">`);
  out.push(`<path d="M${pts}Z" fill="${fill}" fill-opacity="${i === FLAGS.length - 1 ? 0.95 : 0.72}" stroke="var(--anatomy-lit)" stroke-opacity="${i === FLAGS.length - 1 ? 0.9 : 0.28}" stroke-width=".8" stroke-linejoin="round"/>`);
  out.push(D([at([f.x, f.y, z])], { size: 0.55, tone: "hi" }));
  out.push(`</g>`);
  return out.join("");
}

function compass() {
  const z = TOP[COMPASS.ter], out = [];
  out.push(S(k.cylinder(COMPASS.x, COMPASS.y, 9, z, 2, P, 40), { tone: "mid" }));
  out.push(L(k.ring(COMPASS.x, COMPASS.y, 7.4, z + 2, P, 44), { tone: "lo" }));
  const t = k.radialTicks(COMPASS.x, COMPASS.y, 6.8, 12, 3, z + 2, [1.4, 2.8], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  const c = at([COMPASS.x, COMPASS.y, z + 2.2]);
  /* the needle is rebuilt each frame from the model angle: its shape changes, so it is a live part */
  out.push(`<g data-part="needle"><path class="iso-line" data-tone="lit" data-free="start" style="stroke-width:1.15" d="M${c[0].toFixed(1)} ${(c[1] + 30).toFixed(1)}L${c[0].toFixed(1)} ${(c[1] - 30).toFixed(1)}"/><circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="3.4" fill="none" stroke="var(--anatomy-lit)" stroke-width="1"/></g>`);
  out.push(D([at([COMPASS.x, COMPASS.y, z + 2.2])], { size: 0.6, tone: "hi" }));
  return out.join("");
}

function phone() {
  const z = TOP[PHONE.ter], out = [];
  out.push(`<g data-jump="contact" data-read="${CONTACT_READ}" style="cursor:pointer">`);
  out.push(S(k.slabOf({ x: PHONE.x - 5.5, y: PHONE.y - 5.5, w: 11, d: 11, r: 1.6 }, z, 17, P, 3, 0.5), { tone: "hi", crease: "lo" }));
  out.push(S(k.slabOf({ x: PHONE.x - 6.8, y: PHONE.y - 6.8, w: 13.6, d: 13.6, r: 1.8 }, z + 17, 1.8, P, 3), { tone: "mid" }));
  out.push(L(k.sideSeam({ x: PHONE.x - 5.5, y: PHONE.y - 5.5, w: 11, d: 11, r: 1.6 }, z + 11, P, 3), { tone: "faint" }));
  out.push(L(k.planOutline(k.insetPlan({ x: PHONE.x - 3.4, y: PHONE.y - 3.4, w: 6.8, d: 6.8, r: 1 }, 0), z + 18.8, P, 3), { tone: "faint" }));
  out.push(S(k.cylinder(PHONE.x + 3.4, PHONE.y + 3.4, 0.6, z + 18.8, 6, P, 10), { tone: "mid", crease: "none" }));
  out.push(D([at([PHONE.x + 3.4, PHONE.y + 3.4, z + 24.8])], { size: 0.55, tone: "hi" }));
  out.push(`</g>`);
  return out.join("");
}

function river() {
  const z = SEA_Z + SEA_H + 0.1;
  const d = k.onTop([[-4, -62], [-3, -34], [-5, -6], [-4, 8]], z, P);
  return L(d, { tone: "faint" }) + D([at([-4, -62, z]), at([-4, 8, z])], { size: 0.45, tone: "lo" });
}

function bridge() {
  const z = SEA_Z + SEA_H;
  return S(k.slabOf({ x: BRIDGE.x - 2, y: -36, w: 12, d: 5, r: 1 }, z, 2.4, P, 2, 0.4), { tone: "mid" })
    + D([at([BRIDGE.x + 4, -33.5, z + 2.4])], { size: 0.4 });
}

function routeLine() {
  /* the trail follows the relief: it is sampled every 3 units and lifted 0.9
     above whatever surface is under it, so it never cuts through a plate edge */
  const legs = FLAGS.map((f) => [f.x, f.y]);
  const pts = [];
  for (let i = 1; i < legs.length; i++) {
    const [ax, ay] = legs[i - 1], [bx, by] = legs[i];
    const steps = Math.max(2, Math.ceil(Math.hypot(bx - ax, by - ay) / 3));
    for (let s = i === 1 ? 0 : 1; s <= steps; s++) {
      const t = s / steps;
      pts.push([ax + (bx - ax) * t, ay + (by - ay) * t]);
    }
  }
  const d = pts.map(([x, y], i) => {
    const [px, py] = at([x, y, topAt(x, y) + 0.9]);
    return (i ? "L" : "M") + px.toFixed(1) + " " + py.toFixed(1);
  }).join("");
  return L(d, { tone: "lit", dashed: true, flow: true });
}

function ship() {
  const out = [];
  out.push(S(k.slabOf({ x: -9, y: -3.6, w: 18, d: 7.2, r: 2.4 }, 0, 3, P, 4, 0.6), { tone: "hi", crease: "lo", lit: true }));
  out.push(S(k.slabOf({ x: -2.6, y: -1.8, w: 6.4, d: 3.6, r: 1 }, 3, 2.6, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(1.2, 0, 0.8, 3, 13, P, 12), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: 2, y: -3, w: 7.6, d: 1.7, r: 0.6 }, 10.6, 4, P, 2), { tone: "hi", crease: "none" }));
  out.push(D([at([1.2, 0, 16.4])], { size: 0.5, tone: "hi" }));
  out.push(D([at([-11.5, 1.8, 0.3]), at([-13.5, -1.8, 0.3])], { size: 0.36, tone: "lo" }));
  return out.join("");
}

/* painter order: far territories first, by centre depth */
const order = REG_ORDER
  .map((id) => ({ id, d: k.depthOf([T[id].x + T[id].w / 2, T[id].y + T[id].d / 2, 0], P) }))
  .sort((a, b) => a.d - b.d).map((o) => o.id);
const byTer = (ter, list) => list.filter((f) => f.ter === ter);

let svgBody = table() + drawer() + sea();
for (const id of order) {
  const reg = REGIONS.find((r) => r.id === id);
  let inner = territory(id);
  for (const p of PEAKS.filter((p) => p.ter === id)) inner += peak(p);
  for (const t of TREES.filter((t) => t.ter === id)) inner += tree(t);
  for (const b of BEACONS.filter((b) => b.ter === id)) inner += beacon(b, BEACONS.indexOf(b));
  if (id === COMPASS.ter) inner += compass();
  if (id === PHONE.ter) inner += phone();
  for (const f of byTer(id, FLAGS)) inner += flag(f, FLAGS.indexOf(f));
  svgBody += `<g class="rg" data-region="${id}" data-jump="${reg.jump}"><g class="lift">${inner}</g></g>`;
}
svgBody += river() + bridge() + routeLine();
const SHIP_BASE = at([0, 0, 0]);
const SHIP_START = at([FLAGS[0].x, FLAGS[0].y, topAt(FLAGS[0].x, FLAGS[0].y) + 3]);
svgBody += `<g data-part="ship" transform="translate(${(SHIP_START[0] - SHIP_BASE[0]).toFixed(1)} ${(SHIP_START[1] - SHIP_BASE[1]).toFixed(1)})">${ship()}</g>`;

const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label: ARIA, body: svgBody });

/* screen-space model handed to the live module */
const ROUTE = FLAGS.map((f) => at([f.x, f.y, topAt(f.x, f.y) + 3]));
const NEEDLE = at([COMPASS.x, COMPASS.y, TOP[COMPASS.ter] + 2.2]);
const ANG = REG_ORDER.map((id) => {
  const t = T[id];
  const c = at([t.x + t.w / 2, t.y + t.d / 2, TOP[id]]);
  return Math.round((Math.atan2(c[1] - NEEDLE[1], c[0] - NEEDLE[0]) * 180 / Math.PI + 90) * 10) / 10;
});
const MODEL = {
  regions: REGIONS.map((r) => ({ id: r.id, jump: r.jump, read: r.read })),
  jumps: JUMPS,
  route: ROUTE.map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]),
  origin: [+SHIP_START[0].toFixed(1), +SHIP_START[1].toFixed(1)],
  needle: [+NEEDLE[0].toFixed(1), +NEEDLE[1].toFixed(1)],
  angles: ANG,
  lift: liftV.map((v) => +v.toFixed(2)),
  contactRead: CONTACT_READ,
};

const live = `
/* ---------------------------------------------------------------------------
   Chart table: one model drives every moving part.
   State: target (chosen territory), shipT (0..1 along the route), clock (tour
   time), lift[] (per-territory lift), needleA (compass bearing). The readout,
   the lift, the boat, the needle, the pennants and the beacon pulse all read
   from it, so nothing on screen can disagree with anything else.
   --------------------------------------------------------------------------- */
const MODEL = ${JSON.stringify(MODEL)};
const REG_ORDER = MODEL.regions.map((r) => r.id);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)");
const TOUR_STEP = 3.1, IDLE_RESUME = 6000;

function initMap(stage) {
  const svgEl = stage.querySelector("svg");
  const shipEl = svgEl.querySelector('[data-part="ship"]');
  const needleEl = svgEl.querySelector('[data-part="needle"]');
  const regionEls = REG_ORDER.map((id) => svgEl.querySelector('[data-region="' + id + '"]'));
  const liftEls = regionEls.map((el) => el && el.querySelector(".lift"));
  const keyEls = REG_ORDER.map((id) => stage.querySelector('[data-key="' + id + '"]'));
  const beacons = [0, 1].map((i) => svgEl.querySelector('[data-beacon="' + i + '"]'));
  const penns = [0, 1, 2, 3, 4].map((i) => svgEl.querySelector('[data-penn="' + i + '"]'));

  /* the readout lives in the landing's hero figure; standalone pages get one */
  const fig = stage.closest(".hero__fig") || stage.parentElement;
  let readout = fig ? fig.querySelector(".hero__read") : null;
  if (!readout) {
    readout = document.createElement("div");
    readout.className = "hero__read";
    readout.setAttribute("aria-live", "polite");
    stage.after(readout);
  }

  const route = MODEL.route;
  const segLen = [];
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    const len = Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]);
    segLen.push(len);
    total += len;
  }

  let target = 0, sel = 0, shipT = 0, shipTarget = 0, needleA = MODEL.angles[0], needleTarget = MODEL.angles[0];
  let touring = !REDUCED.matches, clock = 0, frame = 0, lastT = 0, visible = false, idleTimer = 0;
  const lift = REG_ORDER.map(() => 0);

  function pointOnRoute(t) {
    let d = Math.min(1, Math.max(0, t)) * total;
    for (let i = 0; i < segLen.length; i++) {
      if (d <= segLen[i] || i === segLen.length - 1) {
        const s = segLen[i] ? d / segLen[i] : 0;
        return [route[i][0] + (route[i + 1][0] - route[i][0]) * s,
                route[i][1] + (route[i + 1][1] - route[i][1]) * s];
      }
      d -= segLen[i];
    }
    return route[route.length - 1];
  }

  /* one place decides what is selected: text, lift, highlight and aria */
  function say(i) {
    const text = MODEL.regions[i].read;
    if (readout.textContent !== text) readout.textContent = text;
    for (let j = 0; j < REG_ORDER.length; j++) {
      const on = j === i;
      if (regionEls[j]) regionEls[j].toggleAttribute("data-on", on);
      if (keyEls[j]) { keyEls[j].toggleAttribute("data-on", on); keyEls[j].setAttribute("aria-current", on ? "true" : "false"); }
    }
    stage.setAttribute("aria-valuetext", text);
  }

  const angLerp = (a, b, kk) => a + (((b - a + 540) % 360) - 180) * kk;

  function draw(index = Math.round(sel) % REG_ORDER.length) {
    for (let j = 0; j < liftEls.length; j++) {
      if (liftEls[j]) liftEls[j].setAttribute("transform",
        "translate(" + (MODEL.lift[0] * lift[j]).toFixed(1) + " " + (MODEL.lift[1] * lift[j]).toFixed(1) + ")");
    }
    const p = pointOnRoute(shipT);
    if (shipEl) shipEl.setAttribute("transform",
      "translate(" + (p[0] - MODEL.origin[0]).toFixed(1) + " " + (p[1] - MODEL.origin[1]).toFixed(1) + ")");
    if (needleEl) needleEl.setAttribute("transform",
      "rotate(" + needleA.toFixed(1) + " " + MODEL.needle[0] + " " + MODEL.needle[1] + ")");
    /* pennants and beacons ride the same clock as the tour */
    for (let i = 0; i < penns.length; i++) {
      const g = penns[i];
      if (!g) continue;
      const s = REDUCED.matches ? 1 : 1 + 0.045 * Math.sin(clock * 2.1 + i * 1.3);
      g.setAttribute("transform", "translate(" + g.dataset.ax + " " + g.dataset.ay + ") scale(" +
        s.toFixed(3) + " 1) translate(" + (-g.dataset.ax) + " " + (-g.dataset.ay) + ")");
    }
    for (let i = 0; i < beacons.length; i++) {
      const g = beacons[i];
      if (!g) continue;
      const op = REDUCED.matches ? 0.85 : 0.32 + 0.68 * Math.pow(Math.max(0, Math.sin(clock * 2.3 + i * Math.PI)), 2);
      g.setAttribute("opacity", op.toFixed(2));
    }
    say(index);
  }

  function tick(now) {
    const dt = lastT ? Math.min((now - lastT) / 1000, 1 / 30) : 1 / 60;
    lastT = now;
    const calm = REDUCED.matches;
    if (touring) {
      clock += dt;
      const step = Math.floor(clock / TOUR_STEP) % REG_ORDER.length;
      target = step;
      shipTarget = step / (REG_ORDER.length - 1);
      needleTarget = MODEL.angles[step];
    } else if (!calm) {
      clock += dt;
    }
    const k1 = calm ? 1 : 1 - Math.exp(-dt / 0.24);
    sel = calm ? target : (Math.abs(target - sel) < 0.002 ? target : sel + (target - sel) * k1);
    const si = Math.round(sel) % REG_ORDER.length;
    const k2 = calm ? 1 : 1 - Math.exp(-dt / 0.55);
    shipT = calm ? shipTarget : shipT + (shipTarget - shipT) * k2;
    needleA = calm ? needleTarget : angLerp(needleA, needleTarget, 1 - Math.exp(-dt / 0.34));
    for (let j = 0; j < lift.length; j++) {
      const want = j === si ? 1 : 0;
      lift[j] = calm ? want : lift[j] + (want - lift[j]) * (1 - Math.exp(-dt / 0.3));
      if (Math.abs(want - lift[j]) < 0.004) lift[j] = want;
    }
    draw(si);
    const settled = !touring && lift.every((v, j) => v === (j === si ? 1 : 0)) &&
      Math.abs(shipT - shipTarget) < 0.002 && Math.abs(needleA - needleTarget) < 0.05;
    frame = visible && !settled ? requestAnimationFrame(tick) : 0;
  }

  const run = () => { if (!frame && visible) { lastT = 0; frame = requestAnimationFrame(tick); } };

  function pick(i, byUser) {
    target = (i + REG_ORDER.length) % REG_ORDER.length;
    shipTarget = target / (REG_ORDER.length - 1);
    needleTarget = MODEL.angles[target];
    if (byUser) {
      touring = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { if (!REDUCED.matches) { touring = true; clock = 0; run(); } }, IDLE_RESUME);
    }
    run();
  }

  function goTo(i, withFocus) {
    const jump = MODEL.regions[i].jump;
    const el = document.querySelector(jump);
    if (!el) return;
    el.scrollIntoView({ behavior: REDUCED.matches ? "auto" : "smooth", block: "start" });
    if (withFocus) {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  }

  /* offscreen and background tabs stop the loop entirely */
  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run(); else frame = 0;
  }, { rootMargin: "120px 0px" }).observe(stage);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) frame = 0; else if (visible) run();
  });

  stage.addEventListener("pointermove", (event) => {
    const hit = event.target.closest("[data-region], [data-key]");
    if (!hit) return;
    const id = hit.dataset.region || hit.dataset.key;
    const i = REG_ORDER.indexOf(id);
    if (i >= 0 && i !== target) pick(i, true);
  });

  stage.addEventListener("click", (event) => {
    const jumpEl = event.target.closest("[data-jump]");
    if (!jumpEl) return;
    const jump = jumpEl.dataset.jump;
    if (jump === "contact") { window.open(MODEL.jumps.contact, "_blank", "noopener"); return; }
    const i = REG_ORDER.indexOf(jumpEl.dataset.region || jumpEl.dataset.key || "");
    if (i >= 0) pick(i, true);
    if (jump && jump.charAt(0) === "#") {
      const el = document.querySelector(jump);
      if (el) el.scrollIntoView({ behavior: REDUCED.matches ? "auto" : "smooth", block: "start" });
    }
  });

  keyEls.forEach((el, i) => {
    if (!el) return;
    el.addEventListener("pointerenter", () => pick(i, true));
    el.addEventListener("focus", () => pick(i, true));
    el.addEventListener("click", () => goTo(i, true));
  });

  /* keyboard: arrows walk the territories, Enter opens, Home/End jump to the ends */
  stage.addEventListener("keydown", (event) => {
    if (event.target !== stage && !event.target.closest("[data-key]")) return;
    let to = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") to = (target + 1) % REG_ORDER.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") to = (target - 1 + REG_ORDER.length) % REG_ORDER.length;
    if (event.key === "Home") to = 0;
    if (event.key === "End") to = REG_ORDER.length - 1;
    if (event.key === "Enter" || event.key === " ") {
      if (event.target.closest && event.target.closest("[data-key]")) return;
      event.preventDefault();
      pick(target, true);
      goTo(target, true);
      return;
    }
    if (to === null) return;
    event.preventDefault();
    pick(to, true);
    if (event.target.closest && event.target.closest("[data-key]")) keyEls[to].focus();
  });

  if (REDUCED.matches) touring = false;
  REDUCED.addEventListener("change", (event) => {
    touring = !event.matches;
    clock = 0;
    if (event.matches) { sel = target; shipT = shipTarget; needleA = needleTarget; lift.fill(0); }
    draw();
    run();
  });

  draw();
  run();
}

document.querySelectorAll("[data-mapfig]").forEach(initMap);
`;

/* only the iso classes this figure draws with: no plate/legend styles, no 10.5px text */
const ISO_MIN = `
.iso-svg{display:block;width:100%;height:auto}
.iso-svg path,.iso-svg circle{vector-effect:non-scaling-stroke}
.iso-fill{fill:var(--anatomy-paper);stroke:none}
.iso-solid[data-lit]>.iso-fill{fill:var(--anatomy-face)}
.iso-shade,.iso-top{stroke:none}
.iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
.iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
.iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
.iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
.iso-top{fill:var(--anatomy-top)}
.iso-solid[data-lit]>.iso-top{fill:var(--anatomy-lit-top)}
.iso-solid[data-lit]>.iso-shade{fill:var(--anatomy-lit-shade)}
.iso-halo{fill:var(--anatomy-halo);stroke:none;filter:blur(9px);opacity:var(--anatomy-halo-opacity);transform:translateY(3px)}
.iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linecap:round;stroke-linejoin:round}
.iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
.iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
.iso-line[data-tone="lo"]{stroke:var(--anatomy-lo)}
.iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
.iso-line[data-tone="lit"]{stroke:var(--anatomy-lit)}
.iso-line[data-tone="red"]{stroke:var(--anatomy-red)}
.iso-line[data-tone="green"]{stroke:var(--anatomy-green)}
.iso-line[data-tone="blue"]{stroke:var(--anatomy-blue)}
.iso-line[data-dotted]{stroke-dasharray:.01 3.5;stroke-width:1}
.iso-line[data-dashed]{stroke-dasharray:3 3}
.iso-line[data-flow]{stroke-dasharray:2 6}
.iso-solid[data-lit]>.iso-edge{stroke:var(--anatomy-lit)}
.iso-dots circle{fill:var(--anatomy-dot);stroke:none;opacity:.32}
.iso-dots[data-tone="hi"] circle{opacity:.85}
.iso-dots[data-tone="mid"] circle{opacity:.45}
.iso-dots[data-tone="lo"] circle{opacity:.22}
.iso-dots[data-tone="faint"] circle{opacity:.12}
`;

const CSS = `${ISO_MIN}
.mapfig.iso{--anatomy-page:transparent;--anatomy-card:transparent;
  --anatomy-paper:#1a2138;--anatomy-face:#212b47;--anatomy-top:#2a3557;
  --anatomy-shade-0:#121a2f;--anatomy-shade-1:#16203a;--anatomy-shade-2:#1a2442;--anatomy-shade-3:#1e294a;
  --anatomy-lit-top:#34436e;--anatomy-lit-shade:#2b3862;
  --anatomy-hi:#d3dcea;--anatomy-mid:#7d89a1;--anatomy-lo:#4d5870;--anatomy-faint:#2b3348;
  --anatomy-lit:#7bc4a8;--anatomy-halo:#04060c;--anatomy-halo-opacity:.85;--anatomy-dot:#eef2f9;
  --map-ease:cubic-bezier(.22,1,.36,1)}
.mapfig .iso-svg{width:100%;height:auto;display:block;overflow:visible}
.mapfig-stage{position:relative;border-radius:10px;touch-action:pan-y}
.mapfig-stage:focus-visible{outline:2px solid var(--accent,#7bc4a8);outline-offset:6px;border-radius:12px}
.mapfig .rg{cursor:pointer}
.mapfig .rg[data-on] .iso-top{fill:var(--anatomy-lit-top)}
.mapfig .rg[data-on]>.lift>.iso-solid>.iso-shade{fill:var(--anatomy-lit-shade)}
.mapfig .rg[data-on]>.lift .iso-edge{stroke:var(--anatomy-lit)}
.mapfig .iso-line[data-flow]{animation:iso-flow 2.8s linear infinite}
@keyframes iso-flow{to{stroke-dashoffset:-32}}
/* the key under the map carries every word at 13px or larger */
.mapkey{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:10px}
.mapkey__btn{display:grid;grid-template-columns:20px minmax(0,1fr);gap:2px 10px;align-items:center;
  padding:9px 11px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(22,28,48,.55);
  text-align:left;font:inherit;color:inherit;cursor:pointer;min-width:0;
  transition:border-color .28s var(--map-ease),background .28s var(--map-ease),transform .28s var(--map-ease)}
.mapkey__btn:hover,.mapkey__btn:focus-visible{border-color:rgba(123,196,168,.45);background:rgba(123,196,168,.08)}
.mapkey__btn[data-on]{border-color:rgba(123,196,168,.55);background:rgba(123,196,168,.1)}
.mapkey__btn:active{transform:translateY(1px)}
.mapkey__q{grid-row:span 2;width:20px;height:20px;display:block}
.mapkey__n{display:block;font-size:14px;line-height:1.3;font-weight:600;letter-spacing:-.005em;color:var(--ink,#eef2f9);min-width:0;text-wrap:balance}
.mapkey__m{display:flex;flex-wrap:wrap;gap:0 6px;font-size:13px;line-height:1.4;color:var(--accent,#7bc4a8);font-variant-numeric:tabular-nums;min-width:0}
.mapkey__m i{font-style:normal;white-space:nowrap}
@media (max-width:400px){.mapkey{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){
  .mapfig .iso-line[data-flow]{animation:none}
  .mapkey__btn{transition:none}
}`;

const glyph = (i) => {
  const cells = [[1, 1], [11, 1], [1, 11], [11, 11]];
  return `<svg class="mapkey__q" viewBox="0 0 20 20" aria-hidden="true">` +
    cells.map(([x, y], j) => `<rect x="${x}" y="${y}" width="8" height="8" rx="2.2" ` +
      (j === i ? `fill="var(--accent,#7bc4a8)"` : `fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2"`) + `/>`).join("") +
    `</svg>`;
};

const keyHtml = `<div class="mapkey">` + REGIONS.map((r, i) => {
  const parts = r.sub.split(" \u00b7 ");
  const metric = parts.map((p, j) => `<i>${p}${j < parts.length - 1 ? " \u00b7" : ""}</i>`).join("");
  return `<button type="button" class="mapkey__btn" data-key="${r.id}" data-jump="${r.jump}" ` +
    `aria-label="${r.name}: ${r.sub}. Jump to the ${r.id} section">` +
    glyph(i) + `<span class="mapkey__n">${r.name}</span><span class="mapkey__m">${metric}</span></button>`;
}).join("") + `</div>`;

/* the kit's own page/plate stylesheets are unused here: drop them from the inlined module.
   pageHtml() also carries a literal closing script tag, which would end our tag early. */
const KIT = kitScript()
  .replace(/const PAGE_CSS = `[\s\S]*?`;/, "")
  .replace(/const ISO_CSS = `[\s\S]*?`;/, "")
  .replace(/<\/script/gi, "<\\/script");

const snippet = `<style>${CSS}</style>
<div class="mapfig iso" data-theme="dark"><div class="mapfig-stage" data-mapfig tabindex="0" role="group" aria-label="${ARIA}" aria-valuetext="${REGIONS[0].read}">${svg}${keyHtml}</div></div>
<script type="module">${KIT}${live}</scr` + `ipt>`;

mkdirSync(HERE, { recursive: true });
writeFileSync(join(HERE, "hero-map-en.html"), snippet);
console.log("wrote hero-map-en.html", snippet.length, "chars");

const test = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>map v2 test — EN</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>:root{--bg:#111524;--card:#161c30;--ink:#eef2f9;--body:#b8c3d6;--meta:#8893a8;--line:rgba(255,255,255,.12);--accent:#7bc4a8;--sans:'IBM Plex Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',monospace}
body{display:grid;justify-items:center;background:var(--bg);color:var(--body);font:16px/1.7 var(--sans)}
.hero__fig{width:100%;max-width:440px;padding:40px 20px 0}
.hero__read{min-height:20px;padding-top:6px;font-family:var(--mono);font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.hero__cap{padding-top:2px;font-size:13px;line-height:1.5;color:var(--meta)}
section{width:100%;max-width:760px;padding:40px 20px;border-top:1px solid rgba(255,255,255,.07)}
h2{color:var(--ink);font-size:22px;padding:0 0 8px}</style></head>
<body><div class="hero__fig">${snippet}
<div class="hero__read" aria-live="polite">${REGIONS[0].read}</div>
<figcaption class="hero__cap">A surveyor's chart table: four relief territories, one expedition route of five flags from assistant to Head of Product, two beacons where the business model changed. Hover lifts a territory, click opens its section. The phone booth opens Telegram.</figcaption>
</div>
<section id="cases"><h2>Cases</h2><p>Jump target for the Cases Bay territory.</p></section>
<section id="skills"><h2>Skills</h2><p>Jump target for the Skills Ridge territory.</p></section>
<section id="experience"><h2>Experience</h2><p>Jump target for the Track Plateau territory.</p></section>
<section id="hire"><h2>Hiring</h2><p>Jump target for the Hire Beacon territory.</p></section>
</body></html>`;
writeFileSync(join(HERE, "test-en.html"), test);
console.log("wrote test-en.html", test.length, "chars");
