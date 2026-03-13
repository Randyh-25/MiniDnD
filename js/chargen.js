/* ============================================================
   CHARACTER CREATION
   ============================================================ */

function selectClass(cls) {
  selectedClass = cls;
  document.querySelectorAll('.class-card').forEach(function(c, i) {
    var classes = ['warrior','mage','assassin','custom'];
    c.classList.toggle('selected', classes[i] === cls);
  });
  document.getElementById('custom-panel').style.display = cls === 'custom' ? 'block' : 'none';
  checkStartReady();
  AudioSystem.sfxClick();
}

function allocStat(stat, dir) {
  if (dir > 0 && customPts <= 0) return;
  if (dir < 0 && customStats[stat] <= 0) return;
  customStats[stat] += dir;
  customPts -= dir;
  document.getElementById('cs-' + stat).textContent = customStats[stat];
  document.getElementById('points-left').textContent = 'Points: ' + customPts;
  checkStartReady();
  AudioSystem.sfxClick();
}

function checkStartReady() {
  var name = document.getElementById('player-name').value.trim();
  var ready = name.length > 0 && selectedClass && (selectedClass !== 'custom' || customPts === 0);
  document.getElementById('start-btn').disabled = !ready;
}

function startGame() {
  var name = document.getElementById('player-name').value.trim();
  if (selectedClass === 'custom') {
    var base = { hp: 60 + customStats.hp * 6, atk: 6 + customStats.atk * 2, def: 4 + customStats.def * 2, crit: 5 + customStats.crit * 3 };
    P = { name: name, cls: 'Custom', hp: base.hp, maxHp: base.hp, atk: base.atk, def: base.def, crit: base.crit, skill: 'Power Strike', skillCD: 3 };
  } else {
    var pr = CLASS_PRESETS[selectedClass];
    P = { name: name, cls: selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1), hp: pr.hp, maxHp: pr.maxHp, atk: pr.atk, def: pr.def, crit: pr.crit, skill: pr.skill, skillCD: pr.skillCD };
  }
  P.level = 1; P.xp = 0; P.xpNext = 50;
  P.gold = 30; P.inventory = []; P.equipment = { weapon: null, armor: null, accessory: null };
  P.buffs = []; P.skillCooldown = 0; P.shieldBash = false; P.shadowStep = false;
  P.potions = 2; P.monstersKilled = 0; P.dungeonsCleared = 0;
  P.inventory.push(Object.assign({}, SHOP_ITEMS[0]), Object.assign({}, SHOP_ITEMS[0]));
  AudioSystem.ensureInit();
  showScreen('city');
}
