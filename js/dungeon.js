/* ============================================================
   DUNGEON GENERATION & BOARD
   ============================================================ */

function enterDungeon(region) {
  dungeon = { region: region, grid: [], playerPos: { x: 0, y: 0 }, steps: 0, exitPos: { x: 6, y: 6 } };
  generateDungeon(region);
  showScreen('dungeon');
  document.getElementById('dungeon-info').textContent = 'Region: ' + region.charAt(0).toUpperCase() + region.slice(1) + ' | Steps: 0';
  addLog('You enter the ' + region + ' dungeon...', 'info');
  AudioSystem.sfxDoor();
}

function generateDungeon(region) {
  var g = dungeon.grid = [];
  // Init all as walls
  for (var y = 0; y < 7; y++) { g[y] = []; for (var x = 0; x < 7; x++) g[y][x] = { type: 'wall', revealed: false, content: null }; }
  // Carve path from (0,0) to (6,6) using random walk
  var visited = new Set();
  var path = [];
  var cx = 0, cy = 0;
  visited.add('0,0');
  path.push([0, 0]);
  while (cx !== 6 || cy !== 6) {
    var dirs = [];
    if (cx < 6) dirs.push([1, 0]);
    if (cy < 6) dirs.push([0, 1]);
    if (cx > 0 && Math.random() < 0.3) dirs.push([-1, 0]);
    if (cy > 0 && Math.random() < 0.3) dirs.push([0, -1]);
    var dir = dirs[Math.floor(Math.random() * dirs.length)];
    cx += dir[0]; cy += dir[1];
    if (!visited.has(cx + ',' + cy)) { visited.add(cx + ',' + cy); path.push([cx, cy]); }
  }
  // Add some extra open tiles
  for (var i = 0; i < 12; i++) {
    var rx = Math.floor(Math.random() * 7), ry = Math.floor(Math.random() * 7);
    visited.add(rx + ',' + ry);
    path.push([rx, ry]);
  }
  // Set open tiles
  for (var j = 0; j < path.length; j++) g[path[j][1]][path[j][0]].type = 'empty';
  // Place start and exit
  g[0][0] = { type: 'empty', revealed: true, content: null };
  g[6][6] = { type: 'exit', revealed: false, content: null };
  // Place content on empty tiles
  var monsterList = MONSTERS[region];
  for (var k = 0; k < path.length; k++) {
    var px = path[k][0], py = path[k][1];
    if ((px === 0 && py === 0) || (px === 6 && py === 6)) continue;
    var r = Math.random();
    if (r < 0.3) g[py][px].content = { kind: 'monster', monster: Object.assign({}, monsterList[Math.floor(Math.random() * monsterList.length)]) };
    else if (r < 0.4) g[py][px].content = { kind: 'treasure' };
    else if (r < 0.48) g[py][px].content = { kind: 'shrine' };
    else if (r < 0.54) g[py][px].content = { kind: 'trap' };
    else if (r < 0.58) g[py][px].content = { kind: 'mimic', monster: Object.assign({}, monsterList[Math.floor(Math.random() * monsterList.length)], { name: 'Mimic', hp: 50, atk: 15, gold: 35, xp: 40 }) };
  }
  // Reveal starting area
  dungeon.playerPos = { x: 0, y: 0 };
  revealAround(0, 0);
}

function revealAround(x, y) {
  for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
    var nx = x + dx, ny = y + dy;
    if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7) dungeon.grid[ny][nx].revealed = true;
  }
}

/* ============================================================
   BOARD RENDERING
   ============================================================ */
function renderBoard() {
  var board = document.getElementById('board');
  board.className = 'board ' + dungeon.region;
  board.innerHTML = '';
  var px = dungeon.playerPos.x, py = dungeon.playerPos.y;
  for (var y = 0; y < 7; y++) for (var x = 0; x < 7; x++) {
    var cell = dungeon.grid[y][x];
    var tile = document.createElement('div');
    tile.className = 'tile';
    if (!cell.revealed) {
      tile.classList.add('fog');
      tile.innerHTML = icon('fog', 20);
    } else {
      tile.classList.add('revealed');
      if (cell.type === 'wall') { tile.classList.add('wall'); tile.innerHTML = icon('wall', 22); }
      else if (x === px && y === py) { tile.classList.add('player'); tile.innerHTML = playerSVGSmall(); }
      else if (cell.type === 'exit') { tile.classList.add('exit'); tile.innerHTML = icon('door', 22); }
      else if (cell.content) {
        if (cell.content.kind === 'monster') { tile.classList.add('monster'); tile.innerHTML = icon('monster', 22); }
        else if (cell.content.kind === 'treasure' || cell.content.kind === 'mimic') { tile.classList.add('treasure'); tile.innerHTML = icon('treasure', 22); }
        else if (cell.content.kind === 'shrine') { tile.classList.add('event'); tile.innerHTML = icon('shrine', 22); }
        else if (cell.content.kind === 'trap') { tile.classList.add('event'); tile.innerHTML = icon('trap', 22); }
        else { tile.classList.add('empty'); }
      } else { tile.classList.add('empty'); }
      // Highlight adjacent movable tiles
      if (cell.type !== 'wall' && !(x === px && y === py) && Math.abs(x - px) + Math.abs(y - py) === 1) {
        tile.classList.add('adjacent');
        (function(tx, ty) {
          tile.onclick = function() { movePlayer(tx, ty); };
        })(x, y);
      }
    }
    board.appendChild(tile);
  }
  updateDungeonStats();
  document.getElementById('dungeon-info').textContent = 'Region: ' + dungeon.region.charAt(0).toUpperCase() + dungeon.region.slice(1) + ' | Steps: ' + dungeon.steps;
}

function playerSVGSmall() {
  if (P.cls === 'Warrior') return '<svg viewBox="0 0 64 64"><rect x="26" y="4" width="12" height="28" rx="2" fill="#b0b0b0"/><circle cx="32" cy="48" r="14" fill="#c23152"/></svg>';
  if (P.cls === 'Mage') return '<svg viewBox="0 0 64 64"><polygon points="32,2 40,22 24,22" fill="#7ec8e3"/><rect x="30" y="22" width="4" height="30" rx="1" fill="#8b7355"/><circle cx="32" cy="48" r="14" fill="#4a1a6b"/></svg>';
  if (P.cls === 'Assassin') return '<svg viewBox="0 0 64 64"><path d="M32 4L38 20H26Z" fill="#555"/><circle cx="32" cy="48" r="14" fill="#1a3a1a"/></svg>';
  return '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="18" fill="#e94560" opacity=".7"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="16">C</text></svg>';
}

/* ============================================================
   PLAYER MOVEMENT & EVENTS
   ============================================================ */
function movePlayer(x, y) {
  dungeon.playerPos = { x: x, y: y };
  dungeon.steps++;
  revealAround(x, y);
  tickBuffs();
  var cell = dungeon.grid[y][x];
  if (cell.type === 'exit') {
    P.dungeonsCleared++;
    addLog('You found the exit! Returning to Veridia.', 'info');
    AudioSystem.sfxDoor();
    showScreen('city');
    return;
  }
  if (cell.content) {
    var c = cell.content;
    if (c.kind === 'monster') { startCombat(c.monster); cell.content = null; return; }
    if (c.kind === 'mimic') { addLog('It\'s a Mimic!', 'dmg'); startCombat(c.monster); cell.content = null; return; }
    if (c.kind === 'treasure') { handleTreasure(); cell.content = null; }
    if (c.kind === 'shrine') { handleShrine(); cell.content = null; }
    if (c.kind === 'trap') { handleTrap(); cell.content = null; }
  }
  renderBoard();
}

function handleTreasure() {
  var gold = 10 + Math.floor(Math.random() * 30);
  P.gold += gold;
  addLog('Found treasure! +' + gold + ' gold', 'info');
  AudioSystem.sfxTreasure();
  if (Math.random() < 0.3) {
    var item = Object.assign({}, SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)]);
    P.inventory.push(item);
    addLog('Found ' + item.name + '!', 'info');
  }
}

function handleShrine() {
  var stats = ['atk', 'def', 'hp'];
  var stat = stats[Math.floor(Math.random() * 3)];
  var val = stat === 'hp' ? 15 : 4;
  P.buffs.push({ stat: stat, val: val, steps: 10 });
  if (stat === 'hp') { P.maxHp += val; P.hp = Math.min(P.maxHp, P.hp + val); }
  addLog('Shrine blessing! +' + val + ' ' + stat.toUpperCase() + ' for 10 steps', 'heal');
  AudioSystem.sfxHeal();
}

function handleTrap() {
  var dmg = Math.max(1, 10 - Math.floor(getTotalStat('def') / 3));
  P.hp -= dmg;
  addLog('Trap! Took ' + dmg + ' damage', 'dmg');
  AudioSystem.sfxTrap();
  if (P.hp <= 0) { gameOver(); }
}

function tickBuffs() {
  P.buffs = P.buffs.filter(function(b) {
    b.steps--;
    if (b.steps <= 0) {
      if (b.stat === 'hp') P.maxHp -= b.val;
      addLog(b.stat.toUpperCase() + ' buff expired', 'info');
      return false;
    }
    return true;
  });
}

function fleeDungeon() {
  addLog('You flee the dungeon!', 'info');
  showScreen('city');
}
