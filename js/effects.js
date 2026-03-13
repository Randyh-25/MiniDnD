/* ============================================================
   VISUAL EFFECTS, LOGGING, GAME OVER
   ============================================================ */

function addLog(msg, cls) {
  cls = cls || '';
  var log = document.getElementById('game-log');
  var div = document.createElement('div');
  div.className = 'log-entry log-' + cls;
  div.textContent = msg;
  log.prepend(div);
  if (log.children.length > 50) log.lastChild.remove();
}

function combatLog(msg, cls) {
  cls = cls || '';
  var log = document.getElementById('combat-log');
  var div = document.createElement('div');
  div.className = 'log-entry log-' + cls;
  div.textContent = msg;
  log.prepend(div);
  if (log.children.length > 30) log.lastChild.remove();
}

function floatDmg(el, val, isCrit, isHeal) {
  var d = document.createElement('div');
  d.className = 'float-dmg' + (isCrit ? ' crit' : '') + (isHeal ? ' heal' : '');
  d.textContent = (isHeal ? '+' : '-') + val;
  d.style.left = '40%'; d.style.top = '10%';
  el.appendChild(d);
  setTimeout(function() { d.remove(); }, 1000);
}

function spawnParticle(el, color) {
  for (var i = 0; i < 5; i++) {
    var p = document.createElement('div');
    p.style.cssText = 'position:absolute;width:6px;height:6px;border-radius:50%;background:' + color + ';pointer-events:none;z-index:50;';
    p.className = 'float-dmg';
    p.style.left = Math.random() * 80 + '%'; p.style.top = Math.random() * 80 + '%';
    el.style.position = 'relative';
    el.appendChild(p);
    setTimeout(function() { p.remove(); }, 1000);
  }
}

function gameOver() {
  document.getElementById('go-stats').textContent = 'Level ' + P.level + ' | Monsters Killed: ' + P.monstersKilled + ' | Dungeons Cleared: ' + P.dungeonsCleared + ' | Gold: ' + P.gold;
  showScreen('gameover');
  AudioSystem.sfxGameOver();
}
