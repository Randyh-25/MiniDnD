/* ============================================================
   SCREENS & UI MANAGEMENT
   ============================================================ */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(id+'-screen').classList.add('active');
  if (id==='city') {
    updateCityStats();
    AudioSystem.changeScene('city');
  }
  if (id==='dungeon') {
    renderBoard();
    AudioSystem.changeScene('dungeon');
  }
  if (id==='combat') {
    AudioSystem.changeScene('combat');
  }
}

function updateCityStats() {
  var el = document.getElementById('city-stats');
  el.innerHTML = statsBarHTML();
}

function updateDungeonStats() {
  document.getElementById('dungeon-stats').innerHTML = statsBarHTML();
}

function statsBarHTML() {
  var hpPct = Math.max(0, P.hp / P.maxHp * 100);
  var xpPct = P.xp / P.xpNext * 100;
  var potCount = P.inventory.filter(function(i) { return i.type==='consumable'; }).length;
  return '<span class="stat"><b>' + P.name + '</b> Lv.' + P.level + ' ' + P.cls + '</span>' +
    '<span class="stat">' + icon('heart',16) + ' ' + P.hp + '/' + P.maxHp + ' <span class="hp-bar-wrap"><span class="hp-bar" style="width:' + hpPct + '%"></span></span></span>' +
    '<span class="stat">' + icon('sword',16) + ' <b>' + getTotalStat('atk') + '</b></span>' +
    '<span class="stat">' + icon('shield',16) + ' <b>' + getTotalStat('def') + '</b></span>' +
    '<span class="stat">' + icon('crosshair',16) + ' <b>' + getTotalStat('crit') + '%</b></span>' +
    '<span class="stat">' + icon('coin',16) + ' <b>' + P.gold + '</b></span>' +
    '<span class="stat">' + icon('xpStar',16) + ' ' + P.xp + '/' + P.xpNext + ' <span class="xp-bar-wrap"><span class="xp-bar" style="width:' + xpPct + '%"></span></span></span>' +
    '<span class="stat">' + icon('flask',16) + ' ' + potCount + '</span>';
}

function getTotalStat(stat) {
  var val = P[stat];
  var slots = ['weapon','armor','accessory'];
  for (var i = 0; i < slots.length; i++) {
    var eq = P.equipment[slots[i]];
    if (eq && eq[stat]) val += eq[stat];
  }
  for (var j = 0; j < P.buffs.length; j++) {
    if (P.buffs[j].stat === stat) val += P.buffs[j].val;
  }
  return val;
}
