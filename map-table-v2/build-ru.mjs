import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/Victor/Documents/hermes_obsidian_memory/skills/ui-ux-design/anatomy/kit/iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WIDTH = 600, HEIGHT = 390;

// ---------- world layout: картографический стол Discovery ----------
const TABLE = { x: -138, y: -72, w: 276, d: 144, r: 10 };
const TABLE_H = 12, FOOT_H = 5;
const LEG_H = 30;                      // ножки стола: от низа столешницы до пола
const FLOOR = -TABLE_H - LEG_H;
const APRON = 11;                      // каркас под столешницей
const SEA = { x: -128, y: -62, w: 256, d: 124, r: 8 };
const SEA_Z = 0, SEA_H = 2;
// 4 территории: высоты рельефа разные, подпись — крупным HTML-чипом НА территории (не мелкий текст в плоскости грани)
const T = {
  cases:      { x: -120, y: -54, w: 116, d: 56, r: 4, h: 10 },
  skills:     { x:   6, y: -54, w: 114, d: 56, r: 4, h: 14 },
  experience: { x: -120, y:  10, w: 116, d: 48, r: 4, h: 8 },
  hire:       { x:   6, y:  10, w: 114, d: 48, r: 4, h: 12 },
};
const top = (t) => SEA_Z + SEA_H + t.h;
const TOP = { cases: top(T.cases), skills: top(T.skills), experience: top(T.experience), hire: top(T.hire) };

// маршрут экспедиции: ассистент -> PO -> Researcher -> Discovery PM -> HoP
const FLAGS = [
  { id: "assist", x: -96, y: 32,  ter: "experience", n: "1 · ассистент" },
  { id: "po",     x: -96, y: -30, ter: "cases",      n: "2 · PO" },
  { id: "res",    x: -30, y: -30, ter: "cases",      n: "3 · Researcher" },
  { id: "dpm",    x:  40, y: -30, ter: "skills",     n: "4 · Discovery PM" },
  { id: "hop",    x:  90, y:  32, ter: "hire",       n: "5 · Head of Product" },
];
const topAt = (x, y) => {
  for (const id of ["cases", "skills", "experience", "hire"]) {
    const t = T[id];
    if (x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.d) return TOP[id];
  }
  return SEA_Z + SEA_H;
};
// маяки = «менял бизнес-модель здесь»
const BEACONS = [
  { x: -40, y: -44, ter: "cases",  h: 17 },
  { x:  92, y: -44, ter: "skills", h: 17 },
];
const PEAKS = [
  { x: -110, y: -44, ter: "cases",  r: 5.5, h: 9 },
  { x:  30, y: -46, ter: "skills", r: 6.5, h: 11 },
  { x: -110, y:  40, ter: "experience", r: 5, h: 7 },
];
const TREES = [
  { x: -18, y: -40, ter: "cases" }, { x: 104, y: -18, ter: "skills" },
  { x: -42, y: 30, ter: "experience" }, { x: 24, y: 42, ter: "hire" },
];
const COMPASS = { x: -112, y: 44, ter: "experience" };
const PHONE = { x: 100, y: 18, ter: "hire" }; // телефонная будка в Telegram
const BRIDGE = { x: -8, y: -30 };

// канон цифр: только с базой замера; никакой коммерческой конкретики
const REGIONS = [
  { id: "cases",      jump: "#cases",      name: "Бухта кейсов",   sub: "TTM ×1.8 · +16% A/B",              read: "кейсы · TTM ×1.8 · +16% A/B" },
  { id: "skills",     jump: "#skills",     name: "Хребет навыков", sub: "130+ интервью · 20+ циклов",       read: "навыки · 130+ интервью · 20+ циклов" },
  { id: "experience", jump: "#experience", name: "Плато опыта",    sub: "6,5 млн · ~4 млн MAU",              read: "опыт · 6,5 млн возврат · ~4 млн MAU" },
  { id: "hire",       jump: "#hire",       name: "Маяк найма",     sub: "blind n=30 · CSAT ~97%",            read: "найм · 20→80% blind n=30 · CSAT ~97% n=2581" },
];
const REG_ORDER = ["cases", "skills", "experience", "hire"];
const JUMPS = { cases: "#cases", skills: "#skills", experience: "#experience", hire: "#hire", contact: "https://t.me/victorpinksight" };
const ARIA = "Карта экспедиции: стрелки выбирают территорию, Enter открывает раздел";
const CONTACT_READ = "контакт · telegram — отвечаю в течение дня";

const P = k.fitProjection(
  [...k.boxCorners(TABLE, FLOOR, 0),
   ...k.boxCorners(SEA, 0, SEA_H + 14),
   [BEACONS[0].x, BEACONS[0].y, TOP.cases + 26],
   [BEACONS[1].x, BEACONS[1].y, TOP.skills + 26],
   [FLAGS[4].x, FLAGS[4].y, TOP.hire + 22]],
  WIDTH, HEIGHT, { pad: 30, azimuth: 42 });
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const liftV = (() => { const o = k.iso([0, 0, 0], P), u = k.iso([0, 0, 6], P); return [u[0] - o[0], u[1] - o[1]]; })();

// ---------- стол ----------
function table() {
  const out = [`<path class="iso-halo" d="${k.haloOf(TABLE, FLOOR, TABLE_H, P)}"/>`];
  // четыре ножки: точёная ножка + пятка + кольцо-наконечник
  for (const [x, y] of byDepth(k.corners(TABLE, 20))) {
    out.push(S(k.cylinder(x, y, 4.6, FLOOR, 2, P, 24), { tone: "lo" }));                  // пятка
    out.push(S(k.cylinder(x, y, 3.4, FLOOR + 2, LEG_H - 6, P, 24), { tone: "mid" }));       // ножка
    out.push(S(k.cylinder(x, y, 4.2, FLOOR + LEG_H - 4, 4, P, 24), { tone: "mid" }));       // капитель под каркасом
    out.push(L(k.sideArc(x, y, 3.4, FLOOR + LEG_H * 0.55, P, 16), { tone: "faint" }));      // поясок
  }
  // боковые стяжки между ножками (две по коротким сторонам, одна по длинной)
  const brace = 3.2;
  out.push(S(k.slabOf({ x: TABLE.x + 20, y: TABLE.y + 20 - brace / 2, w: TABLE.w - 40, d: brace, r: 1 }, FLOOR + 9, brace, P, 2, 0.4), { tone: "lo" }));
  out.push(S(k.slabOf({ x: TABLE.x + 20 - brace / 2, y: TABLE.y + 20, w: brace, d: TABLE.d - 40, r: 1 }, FLOOR + 9, brace, P, 2, 0.4), { tone: "lo" }));
  // каркас под столешницей + ящик с ручкой на передней грани
  out.push(S(k.slabOf(k.insetPlan(TABLE, 12), -TABLE_H, APRON, P, 6, 0.8), { tone: "mid" }));
  const drawer = { x: -26, y: TABLE.y + 12, w: 96, d: 6, r: 1.6 };
  out.push(S(k.slabOf(drawer, -TABLE_H + 2.5, 7, P, 3, 0.5), { tone: "hi", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(drawer, 1.4), -TABLE_H + 9.5, P, 3), { tone: "faint" }));
  const knob = [drawer.x + drawer.w / 2, TABLE.y + 12 + 3];
  out.push(S(k.cylinder(knob[0], knob[1], 1.7, -TABLE_H + 2.5, 3.4, P, 18), { tone: "mid", crease: "none" }));
  out.push(D([at([knob[0], knob[1] + 2.4, -TABLE_H + 5.2])], { size: 0.5, tone: "hi" }));
  // столешница
  out.push(S(k.slabOf(TABLE, -TABLE_H, TABLE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(TABLE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(TABLE, 11);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // линейка-шкала по переднему краю
  const strip = { x: -112, y: TABLE.y + TABLE.d - 16, w: 224, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  // табличка с 3 гравированными линейками + 2 заклёпки
  const plate = { x: 62, y: TABLE.y + 8, w: 58, d: 12, r: 2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 4), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.6), 0.8, P, 4), { tone: "faint" }));
  out.push(L(k.lineOnTop([plate.x + 4, plate.y + 4], [plate.x + plate.w - 6, plate.y + 4], 0.8, P), { tone: "lo", free: true }));
  out.push(L(k.lineOnTop([plate.x + 4, plate.y + 7], [plate.x + plate.w - 12, plate.y + 7], 0.8, P), { tone: "lo", free: true }));
  out.push(D([at([plate.x + 3, plate.y + 9.5, 0.8]), at([plate.x + plate.w - 3, plate.y + 9.5, 0.8])], { size: 0.4 }));
  // свёрнутая карта и латунный груз — инструменты картографа на краю стола
  const roll = { x: -132, y: -70, w: 26, d: 6.4, r: 3 };
  out.push(S(k.slabOf(roll, 0.6, 4.2, P, 3, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.sideArc(roll.x + 3, roll.y + 3.2, 3.2, 2.6, P, 14), { tone: "faint" }));
  out.push(S(k.cylinder(roll.x + roll.w + 2, roll.y + 3.2, 0.9, 0.6, 3.4, P, 12), { tone: "mid", crease: "none" }));
  const weight = [-60, -58.5];
  out.push(S(k.cylinder(weight[0], weight[1], 3.2, SEA_Z + SEA_H, 3.2, P, 28), { tone: "hi", crease: "lo" }));
  out.push(L(k.ring(weight[0], weight[1], 1.9, SEA_Z + SEA_H + 3.2, P, 20), { tone: "lo" }));
  out.push(D([at([weight[0], weight[1], SEA_Z + SEA_H + 3.2])], { size: 0.5, tone: "hi" }));
  return out.join("");
}
function sea() {
  const out = [];
  out.push(S(k.slabOf(SEA, SEA_Z, SEA_H, P, 6, 0.8), { tone: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(SEA, 3), SEA_Z + SEA_H, P, 6), { tone: "faint" }));
  // промеры глубин: пунктир со свободными концами на воде
  out.push(L(k.onTop([[-4, -2], [2, 44]], SEA_Z + SEA_H, P), { tone: "faint", dotted: true, free: true }));
  out.push(D([at([-4, -2, SEA_H]), at([2, 44, SEA_H])], { size: 0.45, tone: "lo" }));
  return out.join("");
}
// ---------- территория (без мелкого текста: подпись — крупный HTML-чип поверх) ----------
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
  out.push(S(k.cylinder(b.x, b.y, 3.4, z, 3, P, 24), { tone: "mid" }));           // основание
  out.push(S(k.cylinder(b.x, b.y, 2.2, z + 3, b.h, P, 24), { tone: "hi", crease: "lo" })); // башня
  out.push(L(k.sideArc(b.x, b.y, 2.2, z + 3 + b.h * 0.5, P, 16), { tone: "faint" }));
  out.push(S(k.cylinder(b.x, b.y, 2.8, z + 3 + b.h, 3.4, P, 24), { tone: "mid" })); // фонарная
  out.push(S(k.cylinder(b.x, b.y, 1.5, z + 3 + b.h + 3.4, 2.2, P, 18), { tone: "hi", lit: true })); // лампа (акцент)
  out.push(S(k.cylinder(b.x, b.y, 3.1, z + 3 + b.h + 5.6, 1.2, P, 24), { tone: "mid" })); // крыша
  out.push(`<g data-beacon="${bi}">${D([at([b.x, b.y, z + 3 + b.h + 4.5])], { size: 0.6, tone: "hi" })}</g>`);
  return out.join("");
}
function flag(f, i) {
  const z = topAt(f.x, f.y), out = [];
  out.push(S(k.cylinder(f.x, f.y, 0.7, z, 15, P, 12), { tone: "mid", crease: "none" }));
  out.push(D([at([f.x, f.y, z + 15])], { size: 0.45, tone: "hi" }));
  const anchor = at([f.x + 0.7, f.y - 1.6, z + 12.7]);
  const w = 9, penn = { x: f.x + 0.7, y: f.y - 1.6, w, d: 3.2, r: 0.6 };
  out.push(`<g data-penn="${i}" data-ax="${anchor[0].toFixed(1)}" data-ay="${anchor[1].toFixed(1)}">${S(k.slabOf(penn, z + 11.4, 2.6, P, 2), { tone: "hi", crease: "none", lit: i === 4 ? true : false })}${D([at([f.x, f.y, z])], { size: 0.5, tone: "hi" })}</g>`);
  return out.join("");
}
function compass() {
  const z = TOP[COMPASS.ter], out = [];
  out.push(S(k.cylinder(COMPASS.x, COMPASS.y, 7, z, 2, P, 40), { tone: "mid" }));
  out.push(L(k.ring(COMPASS.x, COMPASS.y, 5.6, z + 2, P, 40), { tone: "lo" }));
  const t = k.radialTicks(COMPASS.x, COMPASS.y, 5, 12, 3, z + 2, [1, 2.2], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  // стрелка — отдельный узел: live-модуль доворачивает её к выбранной территории (та же модель, что двигает подъём и корабль)
  const c = at([COMPASS.x, COMPASS.y, z + 2.2]);
  out.push(`<g data-part="needle"><path class="iso-line" data-tone="lit" d="M${c[0].toFixed(1)} ${(c[1] + 26).toFixed(1)}L${c[0].toFixed(1)} ${(c[1] - 26).toFixed(1)}"/><circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="3" fill="none" stroke="var(--anatomy-lit)" stroke-width="1"/></g>`);
  out.push(D([at([COMPASS.x, COMPASS.y, z + 2.2])], { size: 0.55, tone: "hi" }));
  return out.join("");
}
function phone() {
  const z = TOP[PHONE.ter], out = [];
  out.push(`<g data-jump="contact" data-read="${CONTACT_READ}" style="cursor:pointer">`);
  out.push(S(k.slabOf({ x: PHONE.x - 4, y: PHONE.y - 4, w: 8, d: 8, r: 1.4 }, z, 13, P, 3, 0.5), { tone: "hi", crease: "lo" }));
  out.push(S(k.slabOf({ x: PHONE.x - 5, y: PHONE.y - 5, w: 10, d: 10, r: 1.6 }, z + 13, 1.6, P, 3), { tone: "mid" }));
  out.push(L(k.sideSeam({ x: PHONE.x - 4, y: PHONE.y - 4, w: 8, d: 8, r: 1.4 }, z + 8, P, 3), { tone: "faint" }));
  out.push(S(k.cylinder(PHONE.x + 2.6, PHONE.y + 2.6, 0.5, z + 14.6, 5, P, 10), { tone: "mid", crease: "none" }));
  out.push(D([at([PHONE.x + 2.6, PHONE.y + 2.6, z + 19.6])], { size: 0.5, tone: "hi", pulse: true }));
  out.push(`</g>`);
  return out.join("");
}
function river() {
  const z = SEA_Z + SEA_H + 0.1;
  const pts = [[-4, -62], [-3, -34], [-5, -6], [-4, 8]];
  const d = k.onTop(pts, z, P);
  return L(d, { tone: "faint" }) + D([at([-4, -62, z]), at([-4, 8, z])], { size: 0.45, tone: "lo" });
}
function bridge() {
  const z = SEA_Z + SEA_H;
  return S(k.slabOf({ x: BRIDGE.x - 2, y: -36, w: 12, d: 5, r: 1 }, z, 2.4, P, 2, 0.4), { tone: "mid" })
    + D([at([BRIDGE.x + 4, -33.5, z + 2.4])], { size: 0.4 });
}
function routeLine() {
  const pts = FLAGS.map((f) => [f.x, f.y, topAt(f.x, f.y) + 1.2]);
  const d = pts.slice(1).map((p, i) => k.segment(pts[i], p, P)).join("");
  return L(d, { tone: "lit", dashed: true, flow: true, free: false });
}
function ship() {
  const out = [];
  out.push(S(k.slabOf({ x: -7, y: -3, w: 14, d: 6, r: 2 }, 0, 2.6, P, 4, 0.5), { tone: "hi", crease: "lo", lit: true }));
  out.push(S(k.slabOf({ x: -2, y: -1.4, w: 5, d: 2.8, r: 0.8 }, 2.6, 2.2, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(1, 0, 0.7, 2.6, 11, P, 12), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: 1.7, y: -2.4, w: 6.4, d: 1.4, r: 0.5 }, 9, 3.4, P, 2), { tone: "hi", crease: "none" }));
  out.push(D([at([1, 0, 14])], { size: 0.45, tone: "hi" }));
  return out.join("");
}

// painter order: территории от дальней к ближней по глубине центра
const order = ["cases", "skills", "experience", "hire"]
  .map((id) => ({ id, d: k.depthOf([T[id].x + T[id].w / 2, T[id].y + T[id].d / 2, 0], P) }))
  .sort((a, b) => a.d - b.d).map((o) => o.id);
const byTer = (ter, fnList) => fnList.filter((f) => f.ter === ter);

let svgBody = table() + sea();
for (const id of order) {
  const reg = REGIONS.find((r) => r.id === id);
  let inner = territory(id);
  for (const p of PEAKS.filter((p) => p.ter === id)) inner += peak(p);
  for (const t of TREES.filter((t) => t.ter === id)) inner += tree(t);
  for (const b of BEACONS.filter((b) => b.ter === id)) inner += beacon(b, BEACONS.indexOf(b));
  if (id === COMPASS.ter) inner += compass();
  if (id === PHONE.ter) inner += phone();
  for (const f of byTer(id, FLAGS)) inner += flag(f, FLAGS.indexOf(f));
  svgBody += `<g class="rg" data-region="${id}" data-jump="${reg.jump}" data-read="${reg.read}"><g class="lift">${inner}</g></g>`;
}
svgBody += river() + bridge() + routeLine();
svgBody += `<g data-part="ship">${ship()}</g>`;

const svg = k.figureSvg({ width: WIDTH, height: HEIGHT,
  label: "Картографический стол Discovery: четыре территории-рельефа — кейсы, навыки, опыт, найм, — маршрут экспедиции с пятью флажками от ассистента до Head of Product, два маяка «менял бизнес-модель здесь», корабль-маркер, компас и телефонная будка в Telegram.",
  body: svgBody });

// screen-space модель для live: маршрут корабля, углы стрелки компаса, якоря чипов
const ROUTE = FLAGS.map((f) => at([f.x, f.y, topAt(f.x, f.y) + 3]));
const needleC = at([COMPASS.x, COMPASS.y, TOP[COMPASS.ter] + 2.2]);
const ANG = REG_ORDER.map((id) => {
  const t = T[id];
  const c = at([t.x + t.w / 2, t.y + t.d / 2, TOP[id]]);
  const deg = Math.atan2(c[1] - needleC[1], c[0] - needleC[0]) * 180 / Math.PI + 90;
  return Math.round(deg * 10) / 10;
});
// позиции чипов: % стейджа, чипы лежат НА территориях (подписи карты), пары не пересекаются
const CHIP = {
  cases:      { x: 28, y: 24, below: false },
  skills:     { x: 71, y: 38, below: false },
  experience: { x: 27, y: 62, below: false },
  hire:       { x: 73, y: 76, below: false },
};
const r2 = (v) => Math.round(v * 10) / 10;

const live = `
/**
 * Карта экспедиции (hero-map-ru): одна модель движения для всех частей.
 * Состояние: target (выбранная территория), shipTarget (позиция корабля 0..1),
 * clock (время тура), lift[] (подъём регионов), needleA (угол стрелки компаса).
 * От этой же модели: readout под картой, подъём региона, корабль, стрелка,
 * развевающиеся вымпелы и пульс маяков. Ничего не ререндерится — только атрибуты.
 */
const REG_ORDER = ${JSON.stringify(REG_ORDER)};
const JUMPS = ${JSON.stringify(JUMPS)};
const ROUTE = ${JSON.stringify(ROUTE.map((p) => [r2(p[0]), r2(p[1])]))};
const ANG = ${JSON.stringify(ANG)};
const LIFT = ${JSON.stringify(liftV.map((v) => Math.round(v * 100) / 100))};
const STEP_TER = ${JSON.stringify(FLAGS.map((f) => f.ter))};
const CONTACT_JUMP = "contact";
/* В ES-модуле document.currentScript === null: ищем стейдж по классу (сниппет один на страницу). */
const stage = document.querySelector(".mapfig-stage");
if (!stage) throw new Error("hero-map: .mapfig-stage не найден");
const steps = [...stage.parentNode.querySelectorAll("[data-step]")];
const svg = stage.querySelector("svg");
const ship = svg.querySelector('[data-part="ship"]');
const needle = svg.querySelector('[data-part="needle"]');
const beacons = [0, 1].map((i) => svg.querySelector('[data-beacon="' + i + '"]'));
const penns = [0, 1, 2, 3, 4].map((i) => svg.querySelector('[data-penn="' + i + '"]'));
const groups = REG_ORDER.map((id) => svg.querySelector('[data-region="' + id + '"] .lift'));
const wraps = REG_ORDER.map((id) => svg.querySelector('[data-region="' + id + '"]'));
const chips = REG_ORDER.map((id) => stage.querySelector('[data-chip="' + id + '"]'));
/* readout живёт в hero__fig лендинга; для standalone-использования создаём свой */
const fig = stage.closest(".hero__fig");
let readout = fig ? fig.querySelector(".hero__read") : null;
if (!readout) { readout = document.createElement("div"); readout.className = "hero__read"; readout.setAttribute("aria-live", "polite"); stage.after(readout); }
const still = matchMedia("(prefers-reduced-motion: reduce)");
const clamp01 = (v) => Math.min(1, Math.max(0, v));
/* Модель: sel едет к target экспонентой (calm), корабль — медленнее, подъём — средне. */
let sel = 2, target = 2, shipT = 0.5, shipTarget = 0.5, needleA = ANG[2], needleTarget = ANG[2];
let touring = !still.matches, clock = 0, frame = 0, last = 0, visible = false, idleTimer = 0;
const lift = REG_ORDER.map(() => 0);
const segLen = []; let total = 0;
for (let i = 1; i < ROUTE.length; i++) { const l = Math.hypot(ROUTE[i][0]-ROUTE[i-1][0], ROUTE[i][1]-ROUTE[i-1][1]); segLen.push(l); total += l; }
function shipAt(t) {
  let d = clamp01(t) * total;
  for (let i = 0; i < segLen.length; i++) {
    if (d <= segLen[i] || i === segLen.length - 1) {
      const s = segLen[i] ? d / segLen[i] : 0;
      return [ROUTE[i][0] + (ROUTE[i+1][0]-ROUTE[i][0])*s, ROUTE[i][1] + (ROUTE[i+1][1]-ROUTE[i][1])*s];
    }
    d -= segLen[i];
  }
  return ROUTE[ROUTE.length-1];
}
/** Живой readout от той же модели: текст всегда соответствует поднятому региону. */
function say(i) {
  const text = wraps[i].dataset.read;
  if (readout && readout.textContent !== text) readout.textContent = text;
  wraps.forEach((w, j) => { const on = j === i; if (on) w.setAttribute("data-on", ""); else w.removeAttribute("data-on"); });
  chips.forEach((c, j) => { if (c) c.toggleAttribute("data-on", j === i); });
  /* Легенда маршрута: подсвечиваем шаги, чья территория сейчас поднята — та же модель. */
  steps.forEach((s, j) => s.toggleAttribute("data-on", STEP_TER[j] === REG_ORDER[i]));
  stage.setAttribute("aria-valuetext", wraps[i].dataset.read);
}
function angLerp(a, b, k) {
  let d = ((b - a + 540) % 360) - 180;
  return a + d * k;
}
function draw() {
  groups.forEach((g, j) => g.setAttribute("transform", "translate(" + (LIFT[0]*lift[j]).toFixed(1) + " " + (LIFT[1]*lift[j]).toFixed(1) + ")"));
  const p = shipAt(shipT), o = ROUTE[0];
  ship.setAttribute("transform", "translate(" + (p[0]-o[0]).toFixed(1) + " " + (p[1]-o[1]).toFixed(1) + ")");
  needle.setAttribute("transform", "rotate(" + needleA.toFixed(1) + " " + needleCX + " " + needleCY + ")");
  /* Вымпелы развеваются и маяки пульсируют от тех же часов clock, что ведёт тур. */
  const t = clock;
  penns.forEach((g, i) => {
    if (!g) return;
    const s = 1 + 0.05 * Math.sin(t * 2.2 + i * 1.3);
    g.setAttribute("transform", "translate(" + g.dataset.ax + " " + g.dataset.ay + ") scale(" + s.toFixed(3) + " 1) translate(" + (-g.dataset.ax) + " " + (-g.dataset.ay) + ")");
  });
  beacons.forEach((g, i) => {
    if (!g) return;
    const op = 0.35 + 0.65 * Math.pow(Math.max(0, Math.sin(t * 2.4 + i * Math.PI)), 2);
    g.setAttribute("opacity", op.toFixed(2));
  });
  say(sel);
}
const needleCX = ${r2(needleC[0])}, needleCY = ${r2(needleC[1])};
function tick(now) {
  const dt = last ? Math.min((now-last)/1000, 1/30) : 1/60; last = now;
  const calm = still.matches;
  if (touring) { clock += dt; const step = Math.floor(clock/2.6) % REG_ORDER.length; target = step; shipTarget = REG_ORDER.length === 1 ? 0.5 : step/(REG_ORDER.length-1); needleTarget = ANG[step]; }
  const k1 = calm ? 1 : 1 - Math.exp(-dt/0.22);
  sel = calm ? target : (Math.abs(target-sel) < 0.002 ? target : sel + (target-sel)*k1);
  const si = Math.round(sel) % REG_ORDER.length;
  const k2 = calm ? 1 : 1 - Math.exp(-dt/0.5);
  shipT = calm ? shipTarget : shipT + (shipTarget-shipT)*k2;
  needleA = calm ? needleTarget : angLerp(needleA, needleTarget, 1 - Math.exp(-dt/0.3));
  for (let j = 0; j < lift.length; j++) { const want = (j === si) ? 1 : 0; lift[j] = calm ? want : lift[j] + (want-lift[j])*(1-Math.exp(-dt/0.28)); if (Math.abs(want-lift[j]) < 0.004) lift[j] = want; }
  sel = si; draw();
  const settled = !touring && lift.every((v, j) => v === (j === si ? 1 : 0)) && Math.abs(shipT-shipTarget) < 0.002;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
/* Выбор территории: поднимает регион, ведёт корабль и стрелку, обновляет readout. */
const pick = (i, user) => { target = (i+REG_ORDER.length)%REG_ORDER.length; shipTarget = REG_ORDER.length === 1 ? 0.5 : target/(REG_ORDER.length-1); needleTarget = ANG[target]; if (user) { touring = false; clearTimeout(idleTimer); idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 5000); } run(); };
/* Переход к разделу; с клавиатуры — переносим фокус на секцию для скринридеров. */
const go = (i, kb) => { const w = wraps[i].querySelector("[data-jump]") || wraps[i]; const j = w.dataset.jump || wraps[i].dataset.jump; if (j && j[0] === "#") { const el = document.querySelector(j); if (el) { el.scrollIntoView({ behavior: still.matches ? "auto" : "smooth", block: "start" }); if (kb) { if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); } } } };
/* Offscreen-stop: кадр крутится только пока карта в вьюпорте; вкладка в фоне — тоже стоп. */
const io = new IntersectionObserver((es) => { visible = es[es.length-1].isIntersecting; if (visible) run(); else { frame = 0; } }, { rootMargin: "120px 0px" });
io.observe(stage);
document.addEventListener("visibilitychange", () => { if (document.hidden) frame = 0; else if (visible) run(); });
if (still.matches) touring = false;
stage.addEventListener("pointermove", (e) => { const g = e.target.closest ? e.target.closest("[data-region]") : null; if (!g) return; const i = REG_ORDER.indexOf(g.dataset.region); if (i >= 0 && i !== target) pick(i, true); });
stage.addEventListener("click", (e) => {
  const j = e.target.closest ? e.target.closest("[data-jump]") : null; if (!j) return;
  const jump = j.dataset.jump;
  if (jump === CONTACT_JUMP) { window.open(JUMPS.contact, "_blank", "noopener"); return; }
  if (jump && jump[0] === "#") { const el = document.querySelector(jump); if (el) el.scrollIntoView({ behavior: still.matches ? "auto" : "smooth", block: "start" }); }
});
chips.forEach((c, i) => {
  if (!c) return;
  c.addEventListener("pointerenter", () => pick(i, true));
  c.addEventListener("focus", () => pick(i, true));
});
/* Keyboard: стрелки выбирают территорию, Enter открывает раздел, Home/End — края. */
stage.addEventListener("keydown", (e) => {
  if (e.target !== stage && !e.target.closest("[data-chip]")) return;
  let to = null;
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft") {
    const d = (e.key === "ArrowRight" || e.key === "ArrowDown") ? 1 : -1;
    to = (Math.round(target) + d + REG_ORDER.length) % REG_ORDER.length;
  }
  if (e.key === "Home") to = 0; if (e.key === "End") to = REG_ORDER.length - 1;
  if (e.key === "Enter" || e.key === " ") {
    if (e.target.closest && e.target.closest("[data-chip]")) return; /* чипы-кнопки кликаются сами */
    e.preventDefault(); go(Math.round(target), true); pick(Math.round(target), true); return;
  }
  if (to === null) return; e.preventDefault(); pick(to, true);
});
draw();
`;

const CSS = `${k.ISO_CSS}
.mapfig{--anatomy-page:transparent;--anatomy-card:transparent;--anatomy-paper:#161c30;--anatomy-face:#1d2540;--anatomy-top:#232e52;--anatomy-shade-0:#10182c;--anatomy-shade-1:#131c33;--anatomy-shade-2:#182039;--anatomy-shade-3:#1c2540;--anatomy-lit-top:#2a3a5e;--anatomy-lit-shade:#22304f;--anatomy-hi:#d3dcea;--anatomy-mid:#7d89a1;--anatomy-lo:#4d5870;--anatomy-faint:#2b3348;--anatomy-lit:#7bc4a8;--anatomy-halo:#04060c;--anatomy-halo-opacity:.85;--anatomy-dot:#eef2f9}
.mapfig .iso-svg{width:100%;height:auto;display:block}
.mapfig-stage{position:relative;border-radius:10px;touch-action:pan-y;cursor:pointer}
.mapfig-stage:focus-visible{outline:2px solid #7bc4a8;outline-offset:6px}
.mapfig .rg .lift{transition:transform .7s cubic-bezier(.22,1,.36,1)}
.mapfig .rg[data-on] .iso-top{fill:var(--anatomy-lit-top)}
.mapfig .rg[data-on]>.lift>.iso-solid>.iso-shade{fill:var(--anatomy-lit-shade)}
.mapfig .rg[data-on]>.lift .iso-edge{stroke:var(--anatomy-lit)}
.mapfig .iso-line[data-flow]{animation:iso-flow 2.6s linear infinite}
@keyframes iso-flow{to{stroke-dashoffset:-32}}
@keyframes iso-pulse{0%,100%{opacity:.18}12%{opacity:1}40%{opacity:.18}}
/* Крупные читаемые подписи: HTML-чипы НА территориях, а не мелкий текст в плоскости грани */
.mapchip{position:absolute;transform:translate(-50%,-50%);display:block;min-width:0;max-width:40%;padding:7px 11px 8px;border:1px solid rgba(255,255,255,.16);border-radius:9px;background:rgba(13,17,32,.93);color:#eef2f9;font-family:var(--sans,system-ui,sans-serif);text-align:center;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.45)}
.mapchip b{display:block;font-size:13.5px;line-height:1.25;font-weight:650;letter-spacing:.01em;white-space:nowrap}
.mapchip span{display:block;margin-top:2px;font-size:13px;line-height:1.35;color:#7bc4a8;font-variant-numeric:tabular-nums;text-wrap:balance}
.mapchip[data-on]{border-color:#7bc4a8;box-shadow:0 0 0 1px #7bc4a8,0 6px 18px rgba(0,0,0,.45)}
.mapchip:focus-visible{outline:2px solid #7bc4a8;outline-offset:3px}
/* Легенда маршрута: 13px, читается без увеличения; подсветка идёт от той же модели, что поднимает регион */
.maplegend{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:12px 0 0;font-family:var(--sans,system-ui,sans-serif);font-size:13px;line-height:1.5;color:#b8c3d6}
.maplegend em{font-style:normal;font-family:var(--mono,ui-monospace,monospace);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#8893a8;margin-right:2px}
.maplegend [data-step]{padding:2px 8px;border:1px solid rgba(255,255,255,.14);border-radius:999px;white-space:nowrap;transition:border-color .4s ease,color .4s ease,background .4s ease}
.maplegend [data-step][data-on]{border-color:#7bc4a8;background:rgba(123,196,168,.12);color:#eef2f9}
.maplegend .sep{color:#4d5870}
.maplegend .note{flex-basis:100%;font-size:13px;color:#8893a8}
.maplegend .note b{color:#7bc4a8;font-weight:500}
@media (max-width:560px){.maplegend{font-size:13px}.maplegend [data-step]{padding:2px 6px}.mapchip{padding:6px 9px 7px;max-width:47%}.mapchip b{font-size:13px}.mapchip span{font-size:13px}}
@media (prefers-reduced-motion:reduce){.mapfig .rg .lift{transition:none}.mapfig .iso-line[data-flow]{animation:none}.iso-line[data-flow],.iso-dots circle[data-pulse]{animation:none}}`;

const chipsHtml = REG_ORDER.map((id) => {
  const r = REGIONS.find((x) => x.id === id);
  const c = CHIP[id];
  return `<button type="button" class="mapchip" data-chip="${id}" data-jump="${r.jump}" aria-label="${r.name}: перейти к разделу" style="left:${c.x}%;top:${c.y}%"><b>${r.name}</b><span>${r.sub}</span></button>`;
}).join("");

const legendHtml = `<p class="maplegend"><em>маршрут</em>${FLAGS.map((f, i) => `<span data-step="${i}">${f.n}</span>${i < FLAGS.length - 1 ? '<span class="sep" aria-hidden="true">→</span>' : ""}`).join("")}<span class="note">Два маяка — <b>менял бизнес-модель здесь</b>. Будка на «Найме» открывает Telegram.</span></p>`;

const snippet = `<style>${CSS}</style>
<div class="mapfig iso" data-theme="dark"><div class="mapfig-stage" tabindex="0" role="group" aria-label="${ARIA}" aria-valuetext="${REGIONS[2].read}">${svg}${chipsHtml}</div>${legendHtml}</div>
<script type="module">${live}</scr` + `ipt>`;

mkdirSync(HERE, { recursive: true });
writeFileSync(join(HERE, "hero-map-ru.html"), snippet);
console.log("wrote hero-map-ru.html", snippet.length, "chars");

// тест-страница в оболочке hero__fig лендинга
const test = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>map v2 test</title></head><body style="margin:0;background:#111524;color:#b8c3d6;font:16px/1.6 system-ui"><div class="hero__fig" style="max-width:440px;margin:40px auto;padding:0 20px">${snippet}<div class="hero__read" style="min-height:20px;margin-top:6px;font-family:monospace;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#7bc4a8" aria-live="polite">${REGIONS[2].read}</div><figcaption class="hero__cap" style="margin-top:2px;font-size:13px;color:#8893a8">Карта экспедиции: четыре территории — кейсы, навыки, опыт, найм. Наведение поднимает регион, клик ведёт к разделу. Пять флажков — путь от ассистента до Head of Product, два маяка — точки смены бизнес-модели. Будка открывает Telegram.</figcaption></div><section id="cases" style="height:40vh">cases</section><section id="skills" style="height:40vh">skills</section><section id="experience" style="height:40vh">experience</section><section id="hire" style="height:40vh">hire</section></body></html>`;
writeFileSync(join(HERE, "test-ru.html"), test);
console.log("wrote test-ru.html", test.length, "chars");
