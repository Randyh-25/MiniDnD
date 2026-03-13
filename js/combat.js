/* ============================================================
   COMBAT SYSTEM
   ============================================================ */

function startCombat(monster) {
  combat = { enemy: Object.assign({}, monster, { maxHp: monster.hp }), turn: 'player', log: [] };
  encounteredMonsters.add(monster.name);
  showScreen('combat');
  renderCombat();
  combatLog('A wild ' + monster.name + ' appears!');
}

function renderCombat() {
  var e = combat.enemy;
  var eHpPct = Math.max(0, e.hp / e.maxHp * 100);
  var pHpPct = Math.max(0, P.hp / P.maxHp * 100);
  document.getElementById('player-combatant').innerHTML =
    playerSVGSmall() + '<h3>' + P.name + '</h3>' +
    '<div class="hp-text">HP: ' + P.hp + '/' + P.maxHp + '</div>' +
    '<div class="hp-bar-wrap" style="width:100%"><div class="hp-bar" style="width:' + pHpPct + '%"></div></div>';
  document.getElementById('enemy-combatant').innerHTML =
    '<svg viewBox="0 0 64 64" width="80" height="80">' + (e.svg || '') + '</svg>' +
    '<h3>' + e.name + '</h3>' +
    '<div class="hp-text">HP: ' + e.hp + '/' + e.maxHp + '</div>' +
    '<div class="hp-bar-wrap" style="width:100%"><div class="hp-bar" style="width:' + eHpPct + '%"></div></div>';
  // Skill button
  var sb = document.getElementById('skill-btn');
  sb.disabled = P.skillCooldown > 0;
  sb.innerHTML = icon('sparkle', 18) + ' ' + (P.skillCooldown > 0 ? (P.skill || 'Skill') + ' (' + P.skillCooldown + ')' : (P.skill || 'Skill'));
  // Potion button
  var potions = P.inventory.filter(function(i) { return i.type === 'consumable'; });
  var pb = document.getElementById('potion-btn');
  pb.disabled = potions.length === 0;
  pb.innerHTML = icon('flask', 18) + ' Potion (' + potions.length + ')';
  // Attack button
  document.getElementById('atk-btn').innerHTML = icon('sword', 18) + ' Attack';
  // Disable if not player turn
  var btns = document.getElementById('combat-actions');
  btns.style.pointerEvents = combat.turn === 'player' ? 'auto' : 'none';
}

function rollD20() { return Math.floor(Math.random() * 20) + 1; }

function combatAttack() {
  if (combat.turn !== 'player') return;
  var roll = rollD20();
  var diceEl = document.getElementById('dice-result');
  diceEl.innerHTML = icon('dice', 32) + ' ' + roll;
  var dmg = 0;
  var atk = getTotalStat('atk');
  var crit = getTotalStat('crit');
  if (roll === 1) {
    var selfDmg = Math.max(1, Math.floor(atk / 4));
    P.hp -= selfDmg;
    combatLog('Critical fail! You hurt yourself for ' + selfDmg, 'dmg');
    floatDmg(document.getElementById('player-combatant'), selfDmg, false);
    AudioSystem.sfxHit();
  } else {
    var isCrit = roll === 20 || P.shadowStep || Math.random() * 100 < crit;
    if (P.shadowStep) { P.shadowStep = false; isCrit = true; }
    dmg = Math.max(1, atk + roll - combat.enemy.def);
    if (isCrit) { dmg = Math.floor(dmg * 2); combatLog('CRITICAL HIT! ' + dmg + ' damage!', 'crit'); AudioSystem.sfxCrit(); }
    else { combatLog('You deal ' + dmg + ' damage (roll: ' + roll + ')'); AudioSystem.sfxAttack(); }
    combat.enemy.hp -= dmg;
    floatDmg(document.getElementById('enemy-combatant'), dmg, isCrit);
    document.getElementById('enemy-combatant').classList.add('shake');
    setTimeout(function() { document.getElementById('enemy-combatant').classList.remove('shake'); }, 300);
  }
  if (P.skillCooldown > 0) P.skillCooldown--;
  if (combat.enemy.hp <= 0) { enemyDefeated(); return; }
  if (P.hp <= 0) { gameOver(); return; }
  combat.turn = 'enemy';
  renderCombat();
  setTimeout(enemyTurn, 800);
}

function combatSkill() {
  if (combat.turn !== 'player' || P.skillCooldown > 0) return;
  var cls = P.cls;
  if (cls === 'Warrior') {
    P.shieldBash = true;
    P.skillCooldown = 4;
    combatLog('Shield Bash! You will block the next attack.', 'info');
    AudioSystem.sfxClick();
  } else if (cls === 'Mage') {
    var dmg = Math.max(1, getTotalStat('atk') * 2 - combat.enemy.def);
    combat.enemy.hp -= dmg;
    P.skillCooldown = 3;
    combatLog('Mana Blast! ' + dmg + ' massive damage!', 'crit');
    AudioSystem.sfxCrit();
    floatDmg(document.getElementById('enemy-combatant'), dmg, true);
    document.getElementById('enemy-combatant').classList.add('shake');
    setTimeout(function() { document.getElementById('enemy-combatant').classList.remove('shake'); }, 300);
    if (combat.enemy.hp <= 0) { enemyDefeated(); return; }
  } else if (cls === 'Assassin') {
    P.shadowStep = true;
    P.skillCooldown = 3;
    combatLog('Shadow Step! Next attack is guaranteed critical.', 'info');
    AudioSystem.sfxClick();
  } else {
    var dmg2 = Math.max(1, Math.floor(getTotalStat('atk') * 1.5) - combat.enemy.def);
    combat.enemy.hp -= dmg2;
    P.skillCooldown = 3;
    combatLog('Power Strike! ' + dmg2 + ' damage!', 'crit');
    AudioSystem.sfxCrit();
    floatDmg(document.getElementById('enemy-combatant'), dmg2, true);
    if (combat.enemy.hp <= 0) { enemyDefeated(); return; }
  }
  if (cls === 'Warrior' || cls === 'Assassin') {
    renderCombat();
    return;
  }
  combat.turn = 'enemy';
  renderCombat();
  setTimeout(enemyTurn, 800);
}

function combatPotion() {
  if (combat.turn !== 'player') return;
  var idx = P.inventory.findIndex(function(i) { return i.type === 'consumable'; });
  if (idx === -1) return;
  var item = P.inventory[idx];
  P.hp = Math.min(P.maxHp, P.hp + item.heal);
  P.inventory.splice(idx, 1);
  combatLog('Used ' + item.name + '! +' + item.heal + ' HP', 'heal');
  AudioSystem.sfxHeal();
  floatDmg(document.getElementById('player-combatant'), item.heal, false, true);
  combat.turn = 'enemy';
  renderCombat();
  setTimeout(enemyTurn, 800);
}

function enemyTurn() {
  var e = combat.enemy;
  var roll = rollD20();
  document.getElementById('dice-result').innerHTML = icon('dice', 32) + ' ' + roll;
  if (P.shieldBash) {
    P.shieldBash = false;
    combatLog(e.name + ' attacks but Shield Bash blocks it!', 'info');
    AudioSystem.sfxClick();
  } else if (roll === 1) {
    combatLog(e.name + ' fumbles!', 'info');
  } else {
    var dmg = Math.max(1, e.atk + roll - getTotalStat('def'));
    if (roll === 20) { dmg = Math.floor(dmg * 1.5); combatLog(e.name + ' CRITICAL! ' + dmg + ' damage!', 'dmg'); AudioSystem.sfxCrit(); }
    else { combatLog(e.name + ' deals ' + dmg + ' damage (roll: ' + roll + ')', 'dmg'); AudioSystem.sfxHit(); }
    P.hp -= dmg;
    floatDmg(document.getElementById('player-combatant'), dmg, roll === 20);
    document.getElementById('player-combatant').classList.add('shake');
    setTimeout(function() { document.getElementById('player-combatant').classList.remove('shake'); }, 300);
  }
  if (P.hp <= 0) { gameOver(); return; }
  combat.turn = 'player';
  renderCombat();
}

function enemyDefeated() {
  var e = combat.enemy;
  document.getElementById('enemy-combatant').classList.add('flash');
  P.gold += e.gold;
  P.xp += e.xp;
  P.monstersKilled++;
  combatLog(e.name + ' defeated! +' + e.xp + ' XP, +' + e.gold + ' gold', 'info');
  AudioSystem.sfxTreasure();
  // Loot drop
  if (Math.random() < 0.25) {
    var item = Object.assign({}, SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)]);
    P.inventory.push(item);
    combatLog('Loot: ' + item.name + '!', 'info');
  }
  setTimeout(function() {
    if (P.xp >= P.xpNext) { showLevelUp(); }
    else { showScreen('dungeon'); renderBoard(); }
  }, 1000);
}
