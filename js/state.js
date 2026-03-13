/* ============================================================
   GAME STATE & CONSTANTS
   ============================================================ */

const CLASS_PRESETS = {
  warrior:  { hp:120, maxHp:120, atk:10, def:12, crit:5,  skill:'Shield Bash', skillCD:4 },
  mage:     { hp:80,  maxHp:80,  atk:16, def:6,  crit:10, skill:'Mana Blast',  skillCD:3 },
  assassin: { hp:90,  maxHp:90,  atk:14, def:8,  crit:20, skill:'Shadow Step', skillCD:3 }
};

const MONSTERS = {
  forest: [
    { name:'Wolf',          hp:30,  atk:8,  def:4,  xp:15, gold:10, svg:'<circle cx="32" cy="36" r="16" fill="#888"/><polygon points="22,26 26,16 30,26" fill="#888"/><polygon points="34,26 38,16 42,26" fill="#888"/><circle cx="27" cy="32" r="2" fill="#ff0"/><circle cx="37" cy="32" r="2" fill="#ff0"/>' },
    { name:'Treant',        hp:60,  atk:10, def:8,  xp:30, gold:20, svg:'<rect x="26" y="30" width="12" height="24" rx="3" fill="#5a3a1a"/><circle cx="32" cy="22" r="16" fill="#2d6a4f"/><circle cx="26" cy="18" r="8" fill="#3a8a5f"/><circle cx="38" cy="18" r="8" fill="#3a8a5f"/>' },
    { name:'Forest Spirit', hp:45,  atk:14, def:5,  xp:35, gold:25, svg:'<circle cx="32" cy="32" r="18" fill="#4ecca3" opacity=".6"/><circle cx="32" cy="32" r="10" fill="#7ec8e3" opacity=".8"/><circle cx="28" cy="28" r="2" fill="#fff"/><circle cx="36" cy="28" r="2" fill="#fff"/>' }
  ],
  desert: [
    { name:'Scorpion',      hp:40,  atk:12, def:6,  xp:25, gold:15, svg:'<ellipse cx="32" cy="38" rx="16" ry="10" fill="#c2a83e"/><path d="M16 38Q10 20 22 16" stroke="#c2a83e" stroke-width="3" fill="none"/><circle cx="22" cy="16" r="3" fill="#e94560"/>' },
    { name:'Sandworm',      hp:70,  atk:14, def:10, xp:40, gold:30, svg:'<ellipse cx="32" cy="36" rx="12" ry="20" fill="#c2a83e"/><circle cx="32" cy="20" r="10" fill="#8b6914"/><circle cx="28" cy="18" r="2" fill="#111"/><circle cx="36" cy="18" r="2" fill="#111"/>' },
    { name:'Mummy',         hp:55,  atk:11, def:9,  xp:35, gold:25, svg:'<rect x="24" y="14" width="16" height="40" rx="4" fill="#d4c9a8"/><rect x="22" y="14" width="20" height="6" rx="3" fill="#d4c9a8"/><circle cx="28" cy="22" r="2" fill="#4a0"/><circle cx="36" cy="22" r="2" fill="#4a0"/>' }
  ],
  hell: [
    { name:'Imp',           hp:35,  atk:13, def:5,  xp:30, gold:20, svg:'<circle cx="32" cy="34" r="14" fill="#9b2226"/><polygon points="24,24 28,12 32,24" fill="#9b2226"/><polygon points="32,24 36,12 40,24" fill="#9b2226"/><circle cx="28" cy="30" r="2" fill="#ffd700"/><circle cx="36" cy="30" r="2" fill="#ffd700"/>' },
    { name:'Demon',         hp:80,  atk:18, def:12, xp:50, gold:40, svg:'<rect x="22" y="20" width="20" height="30" rx="4" fill="#6a040f"/><polygon points="22,24 16,10 28,20" fill="#6a040f"/><polygon points="42,24 48,10 36,20" fill="#6a040f"/><circle cx="28" cy="30" r="3" fill="#e94560"/><circle cx="36" cy="30" r="3" fill="#e94560"/>' },
    { name:'Dragon',        hp:120, atk:22, def:15, xp:80, gold:60, svg:'<ellipse cx="32" cy="36" rx="18" ry="14" fill="#9b2226"/><polygon points="14,36 6,18 22,30" fill="#6a040f"/><polygon points="50,36 58,18 42,30" fill="#6a040f"/><polygon points="28,22 32,10 36,22" fill="#9b2226"/><circle cx="27" cy="30" r="2" fill="#ffd700"/><circle cx="37" cy="30" r="2" fill="#ffd700"/>' }
  ],
  mountains: [
    { name:'Mountain Lion',  hp:45,  atk:12, def:7,  xp:25, gold:18, svg:'<ellipse cx="32" cy="38" rx="18" ry="10" fill="#b8860b"/><circle cx="32" cy="28" r="10" fill="#daa520"/><polygon points="24,22 28,14 30,22" fill="#daa520"/><polygon points="34,22 36,14 40,22" fill="#daa520"/><circle cx="28" cy="26" r="2" fill="#111"/><circle cx="36" cy="26" r="2" fill="#111"/>' },
    { name:'Stone Golem',    hp:80,  atk:15, def:14, xp:45, gold:35, svg:'<rect x="22" y="18" width="20" height="28" rx="4" fill="#708090"/><rect x="18" y="26" width="8" height="16" rx="3" fill="#708090"/><rect x="38" y="26" width="8" height="16" rx="3" fill="#708090"/><rect x="22" y="12" width="20" height="12" rx="6" fill="#778899"/><circle cx="28" cy="18" r="2" fill="#ffd700"/><circle cx="36" cy="18" r="2" fill="#ffd700"/>' },
    { name:'Ice Wyvern',     hp:65,  atk:18, def:10, xp:50, gold:40, svg:'<ellipse cx="32" cy="36" rx="14" ry="10" fill="#5f9ea0"/><polygon points="14,32 4,16 24,28" fill="#87ceeb"/><polygon points="50,32 60,16 40,28" fill="#87ceeb"/><polygon points="28,26 32,14 36,26" fill="#5f9ea0"/><circle cx="28" cy="32" r="2" fill="#fff"/><circle cx="36" cy="32" r="2" fill="#fff"/>' }
  ],
  swamp: [
    { name:'Swamp Lurker',   hp:35,  atk:10, def:5,  xp:20, gold:12, svg:'<ellipse cx="32" cy="42" rx="20" ry="8" fill="#3a5a2a"/><ellipse cx="32" cy="36" rx="14" ry="12" fill="#4a6a3a"/><circle cx="26" cy="30" r="4" fill="#ff0" opacity=".8"/><circle cx="38" cy="30" r="4" fill="#ff0" opacity=".8"/><circle cx="26" cy="30" r="2" fill="#111"/><circle cx="38" cy="30" r="2" fill="#111"/>' },
    { name:'Venomous Hydra',  hp:75,  atk:16, def:9,  xp:40, gold:30, svg:'<ellipse cx="32" cy="42" rx="16" ry="10" fill="#2d5a2d"/><path d="M24 34Q18 16 22 10" stroke="#3a7a3a" stroke-width="4" fill="none"/><path d="M32 30Q32 14 32 8" stroke="#3a7a3a" stroke-width="4" fill="none"/><path d="M40 34Q46 16 42 10" stroke="#3a7a3a" stroke-width="4" fill="none"/><circle cx="22" cy="10" r="4" fill="#4a8a4a"/><circle cx="32" cy="8" r="4" fill="#4a8a4a"/><circle cx="42" cy="10" r="4" fill="#4a8a4a"/>' },
    { name:'Bog Witch',       hp:50,  atk:20, def:6,  xp:35, gold:28, svg:'<polygon points="32,4 44,24 20,24" fill="#2a1a3a"/><circle cx="32" cy="30" r="10" fill="#8a6aaa"/><rect x="30" y="24" width="4" height="30" rx="1" fill="#5a3a1a"/><circle cx="28" cy="28" r="2" fill="#4ecca3"/><circle cx="36" cy="28" r="2" fill="#4ecca3"/>' }
  ],
  caves: [
    { name:'Cave Bat',        hp:25,  atk:8,  def:3,  xp:15, gold:8,  svg:'<ellipse cx="32" cy="34" rx="8" ry="6" fill="#444"/><polygon points="12,28 24,34 20,22" fill="#555"/><polygon points="52,28 40,34 44,22" fill="#555"/><circle cx="28" cy="32" r="2" fill="#e94560"/><circle cx="36" cy="32" r="2" fill="#e94560"/>' },
    { name:'Crystal Spider',  hp:55,  atk:14, def:8,  xp:30, gold:22, svg:'<circle cx="32" cy="32" r="12" fill="#7b68ee"/><line x1="20" y1="26" x2="10" y2="18" stroke="#9370db" stroke-width="2"/><line x1="44" y1="26" x2="54" y2="18" stroke="#9370db" stroke-width="2"/><line x1="20" y1="34" x2="8" y2="38" stroke="#9370db" stroke-width="2"/><line x1="44" y1="34" x2="56" y2="38" stroke="#9370db" stroke-width="2"/><circle cx="28" cy="30" r="2" fill="#fff"/><circle cx="36" cy="30" r="2" fill="#fff"/>' },
    { name:'Shadow Beast',    hp:90,  atk:19, def:11, xp:55, gold:45, svg:'<ellipse cx="32" cy="36" rx="18" ry="14" fill="#1a1a2e"/><circle cx="32" cy="28" r="14" fill="#2a2a3e"/><circle cx="26" cy="26" r="4" fill="#e94560" opacity=".8"/><circle cx="38" cy="26" r="4" fill="#e94560" opacity=".8"/><polygon points="22,18 26,8 30,18" fill="#2a2a3e"/><polygon points="34,18 38,8 42,18" fill="#2a2a3e"/>' }
  ]
};

const REGION_INFO = {
  forest:    { label:'Enchanted Forest', difficulty:'Easy',   color:'#2d6a4f' },
  desert:    { label:'Scorching Desert', difficulty:'Medium', color:'#c2a83e' },
  hell:      { label:'Infernal Depths',  difficulty:'Hard',   color:'#9b2226' },
  mountains: { label:'Frozen Peaks',     difficulty:'Medium', color:'#6a7a8a' },
  swamp:     { label:'Murky Swamp',      difficulty:'Medium', color:'#4a6a3a' },
  caves:     { label:'Crystal Caves',    difficulty:'Hard',   color:'#7b68ee' }
};

const SHOP_ITEMS = [
  { id:'potion',     name:'Health Potion', type:'consumable', cost:15, desc:'Restore 30 HP', heal:30 },
  { id:'lg_potion',  name:'Large Potion',  type:'consumable', cost:35, desc:'Restore 60 HP', heal:60 },
  { id:'iron_sword', name:'Iron Sword',    type:'weapon',     cost:50, desc:'+4 ATK', atk:4 },
  { id:'steel_sword',name:'Steel Sword',   type:'weapon',     cost:120,desc:'+8 ATK', atk:8 },
  { id:'leather',    name:'Leather Armor', type:'armor',      cost:40, desc:'+3 DEF', def:3 },
  { id:'chain',      name:'Chain Mail',    type:'armor',      cost:100,desc:'+6 DEF', def:6 },
  { id:'ring_crit',  name:'Crit Ring',     type:'accessory',  cost:80, desc:'+8% CRIT', crit:8 },
  { id:'amulet_hp',  name:'HP Amulet',     type:'accessory',  cost:70, desc:'+20 Max HP', hp:20 }
];

let P = {}; // Player state
let dungeon = {};
let combat = {};
let customStats = { hp:0, atk:0, def:0, crit:0 };
let customPts = 15;
let luStats = { hp:0, atk:0, def:0, crit:0 };
let luPts = 3;
let selectedClass = null;
let encounteredMonsters = new Set();
