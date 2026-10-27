// 두 사이트(키우기방 · 손 정원)가 함께 쓰는 꽃 정보
export const FLOWERS = [
  { id: 'tulip',          name: '튤립',     meaning: '사랑의 고백',     hand: 'left',  finger: 'index',  model: 'flowers/tulip.glb',          pot: 'classic', potColor: '#c9775a', stem: 0.46, head: 0.20, color: '#ee7d9a' },
  { id: 'rose',           name: '장미',     meaning: '열렬한 사랑',     hand: 'left',  finger: 'middle', model: 'flowers/rose.glb',           pot: 'belly',   potColor: '#e3b5b0', stem: 0.52, head: 0.20, color: '#c8202a' },
  { id: 'daisy',          name: '데이지',   meaning: '희망',           hand: 'left',  finger: 'ring',   model: 'flowers/daisy.glb',          pot: 'cup',     potColor: '#a9bf9d', stem: 0.40, head: 0.22, color: '#f6f3ea' },
  { id: 'lily_of_valley', name: '은방울꽃', meaning: '다시 찾은 행복',  hand: 'left',  finger: 'pinky',  model: 'flowers/lily_of_valley.glb', pot: 'small',   potColor: '#b9dccd', stem: 0.16, head: 0.26, color: '#f4f6ee' },
  { id: 'sunflower',      name: '해바라기', meaning: '기다림',          hand: 'right', finger: 'index',  model: 'flowers/sunflower.glb',      pot: 'tall',    potColor: '#e2b45c', stem: 0.70, head: 0.30, color: '#f7c52a' },
  { id: 'lily',           name: '백합',     meaning: '순수',           hand: 'right', finger: 'middle', model: 'flowers/lily.glb',           pot: 'flask',   potColor: '#f1ece4', stem: 0.48, head: 0.26, color: '#f3c8d6' },
  { id: 'hydrangea',      name: '수국',     meaning: '진심',           hand: 'right', finger: 'ring',   model: 'flowers/hydrangea.glb',      pot: 'bucket',  potColor: '#8fa8c9', stem: 0.36, head: 0.27, color: '#8ea0ee' },
  { id: 'lilac',          name: '라일락',   meaning: '첫사랑',          hand: 'right', finger: 'pinky',  model: 'flowers/lilac.glb',          pot: 'dish',    potColor: '#b7aec7', stem: 0.50, head: 0.27, color: '#b9a3e6' },
];

export const HAND_KO = { left: '왼손', right: '오른손' };
export const FINGER_KO = { index: '검지', middle: '중지', ring: '약지', pinky: '새끼손가락' };

// 저장소 (두 페이지가 같은 주소 아래에 있으면 공유됨)
export const STORE_KEY = 'najungwon_v1';
export function loadState() {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s && s.plants) return s; } catch (e) {}
  return { plants: {} };
}
export function saveState(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}
export function isBloomed(state, id) { return !!(state.plants[id] && state.plants[id].g >= 1); }
