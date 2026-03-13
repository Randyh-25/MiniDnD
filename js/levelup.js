/* ============================================================
   LEVEL UP SYSTEM
   ============================================================ */

function showLevelUp() {
  P.level++;
  P.xp -= P.xpNext;
  P.xpNext = Math.floor(P.xpNext * 1.4);
  luStats = { hp: 0, atk: 0, def: 0, crit: 0 };
  luPts = 3;
  document.getElementById('lu-pts').textContent = 'Points: 3';
  ['hp', 'atk', 'def', 'crit'].forEach(function(s) { document.getElementById('lu-' + s).textContent = '0'; });
  document.getElementById('lu-confirm').disabled = true;
  document.getElementById('levelup-overlay').classList.add('open');
  AudioSystem.sfxLevelUp();
}

function luAlloc(stat, dir) {
  if (dir > 0 && luPts <= 0) return;
  if (dir < 0 && luStats[stat] <= 0) return;
  luStats[stat] += dir; luPts -= dir;
  document.getElementById('lu-' + stat).textContent = luStats[stat];
  document.getElementById('lu-pts').textContent = 'Points: ' + luPts;
  document.getElementById('lu-confirm').disabled = luPts > 0;
  AudioSystem.sfxClick();
}

function confirmLevelUp() {
  P.atk += luStats.atk * 2;
  P.def += luStats.def * 2;
  P.maxHp += luStats.hp * 8;
  P.hp = Math.min(P.maxHp, P.hp + luStats.hp * 8);
  P.crit += luStats.crit * 3;
  document.getElementById('levelup-overlay').classList.remove('open');
  addLog('Level up! Now Lv.' + P.level, 'heal');
  showScreen('dungeon');
  renderBoard();
}
