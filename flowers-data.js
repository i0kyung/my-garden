// 두 사이트(키우기 정원 · 손 정원)가 함께 쓰는 꽃 정보와 저장소
// rarity: 1 흔함 · 2 가끔 · 3 귀함
export const FLOWERS = [
  { id: 'daisy',          name: '데이지',   latin: 'Bellis perennis',          meaning: '희망',          rarity: 1, color: '#f6f3ea', bg: '#e9eddc', stem: 0.40, head: 0.22 },
  { id: 'tulip',          name: '튤립',     latin: 'Tulipa gesneriana',        meaning: '사랑의 고백',    rarity: 1, color: '#ee7d9a', bg: '#f7dde4', stem: 0.46, head: 0.20 },
  { id: 'sunflower',      name: '해바라기', latin: 'Helianthus annuus',        meaning: '기다림',         rarity: 1, color: '#f7c52a', bg: '#f8ecc3', stem: 0.70, head: 0.30 },
  { id: 'rose',           name: '장미',     latin: 'Rosa hybrida',             meaning: '열렬한 사랑',    rarity: 1, color: '#c8202a', bg: '#f2d5d3', stem: 0.52, head: 0.20 },
  { id: 'carnation',      name: '카네이션', latin: 'Dianthus caryophyllus',    meaning: '감사',          rarity: 1, color: '#f27a8e', bg: '#f9dfe3', stem: 0.48, head: 0.20 },
  { id: 'hydrangea',      name: '수국',     latin: 'Hydrangea macrophylla',    meaning: '진심',          rarity: 2, color: '#8ea0ee', bg: '#dfe4f6', stem: 0.36, head: 0.27 },
  { id: 'daffodil',       name: '수선화',   latin: 'Narcissus pseudonarcissus', meaning: '자기 사랑',     rarity: 2, color: '#f3dc6e', bg: '#f8f0cc', stem: 0.46, head: 0.22 },
  { id: 'lilac',          name: '라일락',   latin: 'Syringa vulgaris',         meaning: '첫사랑',         rarity: 2, color: '#b9a3e6', bg: '#e8e0f5', stem: 0.50, head: 0.27 },
  { id: 'lily_of_valley', name: '은방울꽃', latin: 'Convallaria majalis',      meaning: '다시 찾은 행복', rarity: 2, color: '#e9efe0', bg: '#dfeadb', stem: 0.16, head: 0.26 },
  { id: 'lily',           name: '백합',     latin: 'Lilium longiflorum',       meaning: '순수',          rarity: 2, color: '#f3c8d6', bg: '#f6e4ea', stem: 0.48, head: 0.26 },
  { id: 'orchid',         name: '난초',     latin: 'Phalaenopsis aphrodite',   meaning: '아름다운 숙녀',  rarity: 3, color: '#d35ad9', bg: '#efdaf0', stem: 0.40, head: 0.24 },
  { id: 'lotus',          name: '연꽃',     latin: 'Nelumbo nucifera',         meaning: '깨끗한 마음',    rarity: 3, color: '#f49ac7', bg: '#f9e0ec', stem: 0.30, head: 0.28 },
];
FLOWERS.forEach(f => f.model = `flowers/${f.id}.glb`);
export const byId = Object.fromEntries(FLOWERS.map(f => [f.id, f]));

// 화면에서 보이는 순서(거울 화면 기준): 왼손은 새끼→검지, 오른손은 검지→새끼
export const FINGERS = [
  ['left', 'pinky'], ['left', 'ring'], ['left', 'middle'], ['left', 'index'],
  ['right', 'index'], ['right', 'middle'], ['right', 'ring'], ['right', 'pinky'],
];
export const HAND_KO = { left: '왼손', right: '오른손' };
export const FINGER_KO = { index: '검지', middle: '중지', ring: '약지', pinky: '새끼' };

// 랜덤 씨앗: 아직 못 만난 꽃이 조금 더 잘 나오고, 귀한 꽃은 드물게
const WEIGHT = { 1: 6, 2: 3, 3: 1 };
export function pickSeed(owned) {
  const unseen = FLOWERS.filter(f => !owned.includes(f.id));
  const pool = unseen.length && Math.random() < 0.6 ? unseen : FLOWERS;
  let r = Math.random() * pool.reduce((s, f) => s + WEIGHT[f.rarity], 0);
  for (const f of pool) { r -= WEIGHT[f.rarity]; if (r <= 0) return f.id; }
  return pool[0].id;
}

export const STORE_KEY = 'najungwon_v2';
export function loadState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
  if (!s || !Array.isArray(s.owned)) {
    s = { owned: [], plants: [], garden: [], fingers: {}, sun: 0.35, uid: 1, t: Date.now() };
    try { // 예전 버전에서 피운 꽃은 그대로 가져오기
      const o = JSON.parse(localStorage.getItem('najungwon_v1'));
      if (o && o.plants) for (const [id, p] of Object.entries(o.plants)) if (p.g >= 1 && byId[id]) s.owned.push(id);
      if (o && Array.isArray(o.garden)) s.garden = o.garden.filter(d => byId[d.id]);
    } catch (e) {}
  }
  s.plants ||= []; s.garden ||= []; s.fingers ||= {}; s.uid ||= 1;
  if (typeof s.sun !== 'number') s.sun = 0.35;
  if (!s.owned.length) { // 처음 오면 흔한 꽃 하나를 선물
    const commons = FLOWERS.filter(f => f.rarity === 1);
    const g = commons[Math.floor(Math.random() * commons.length)].id;
    s.owned.push(g); s.gift = g;
  }
  return s;
}
export function saveState(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {}
}
