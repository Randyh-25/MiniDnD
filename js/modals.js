/* ============================================================
   MODAL SYSTEM
   ============================================================ */

function openModal(type) {
  var ov = document.getElementById('modal-overlay');
  var mc = document.getElementById('modal-content');
  var html = '<button class="modal-close" onclick="closeModal()">&#x2715;</button>';
  AudioSystem.sfxClick();

  if (type === 'inn') {
    var cost = 10;
    var canHeal = P.hp < P.maxHp && P.gold >= cost;
    html += '<h2>' + icon('inn',22) + ' Inn</h2><p style="margin-bottom:12px;color:#999">Rest and recover your strength.</p>';
    html += '<p>HP: ' + P.hp + '/' + P.maxHp + '</p>';
    html += '<button onclick="innHeal()" ' + (canHeal ? '' : 'disabled') + ' style="background:#4ecca3;color:#111;margin-top:12px;padding:10px 24px">Rest (' + cost + ' gold) — Full Heal</button>';
  }

  else if (type === 'market') {
    html += '<h2>' + icon('market',22) + ' Market</h2><p style="color:#999;margin-bottom:12px">Gold: ' + P.gold + '</p>';
    html += '<h3 style="color:#7ec8e3;margin-bottom:8px">Buy</h3>';
    for (var i = 0; i < SHOP_ITEMS.length; i++) {
      var item = SHOP_ITEMS[i];
      html += '<div class="modal-item"><span class="item-name">' + item.name + '</span><span class="item-cost">' + item.cost + 'g</span>' +
        '<button onclick="buyItem(\'' + item.id + '\')" ' + (P.gold >= item.cost ? '' : 'disabled') + '>Buy</button>' +
        '<div class="tooltip">' + item.desc + '</div></div>';
    }
    html += '<h3 style="color:#7ec8e3;margin:12px 0 8px">Sell</h3>';
    if (P.inventory.length === 0) html += '<p style="color:#666">No items to sell.</p>';
    for (var j = 0; j < P.inventory.length; j++) {
      var sItem = P.inventory[j];
      var sell = Math.floor(sItem.cost / 2);
      html += '<div class="modal-item"><span class="item-name">' + sItem.name + '</span><span class="item-cost">' + sell + 'g</span>' +
        '<button onclick="sellItem(' + j + ')">Sell</button></div>';
    }
  }

  else if (type === 'blacksmith') {
    html += '<h2>' + icon('blacksmith',22) + ' Blacksmith</h2><p style="color:#999;margin-bottom:12px">Upgrade your equipment. Gold: ' + P.gold + '</p>';
    var slots = ['weapon','armor','accessory'];
    for (var k = 0; k < slots.length; k++) {
      var slot = slots[k];
      var eq = P.equipment[slot];
      if (eq) {
        var bCost = Math.floor(eq.cost * 0.6);
        html += '<div class="modal-item"><span class="item-name">' + eq.name + ' (' + slot + ')</span><span class="item-cost">Upgrade: ' + bCost + 'g</span>' +
          '<button onclick="upgradeEquip(\'' + slot + '\')" ' + (P.gold >= bCost ? '' : 'disabled') + '>Upgrade</button></div>';
      } else {
        html += '<div class="modal-item"><span style="color:#666">' + slot + ': empty</span></div>';
      }
    }
  }

  else if (type === 'library') {
    html += '<h2>' + icon('library',22) + ' Monster Library</h2>';
    if (encounteredMonsters.size === 0) html += '<p style="color:#666">No monsters encountered yet.</p>';
    encounteredMonsters.forEach(function(mName) {
      var m = null;
      var regions = ['forest','desert','hell','mountains','swamp','caves'];
      for (var r = 0; r < regions.length; r++) {
        m = MONSTERS[regions[r]].find(function(x) { return x.name === mName; });
        if (m) break;
      }
      if (m) {
        html += '<div class="modal-item"><svg viewBox="0 0 64 64" width="40" height="40">' + m.svg + '</svg>' +
          '<span class="item-name">' + m.name + '</span><span style="color:#999;font-size:.8rem">HP:' + m.hp + ' ATK:' + m.atk + ' DEF:' + m.def + ' XP:' + m.xp + '</span></div>';
      }
    });
  }

  else if (type === 'inventory') {
    html += '<h2>' + icon('backpack',22) + ' Inventory</h2>';
    if (P.inventory.length === 0) html += '<p style="color:#666">Empty.</p>';
    for (var p = 0; p < P.inventory.length; p++) {
      var invItem = P.inventory[p];
      var actions = '';
      if (invItem.type === 'consumable') actions = '<button onclick="useItem(' + p + ')">Use</button>';
      else actions = '<button onclick="equipItem(' + p + ')">Equip</button>';
      html += '<div class="modal-item"><span class="item-name">' + invItem.name + '</span>' + actions +
        '<div class="tooltip">' + invItem.desc + '</div></div>';
    }
  }

  else if (type === 'equipment') {
    html += '<h2>' + icon('shield',22) + ' Equipment</h2>';
    var eqSlots = ['weapon','armor','accessory'];
    for (var q = 0; q < eqSlots.length; q++) {
      var eSlot = eqSlots[q];
      var eqItem = P.equipment[eSlot];
      html += '<div class="modal-item"><span style="color:#7ec8e3;text-transform:capitalize">' + eSlot + ':</span>' +
        '<span class="item-name">' + (eqItem ? eqItem.name : '(empty)') + '</span>' +
        (eqItem ? '<button onclick="unequipItem(\'' + eSlot + '\')">Remove</button><div class="tooltip">' + eqItem.desc + '</div>' : '') +
      '</div>';
    }
  }

  mc.innerHTML = html;
  ov.classList.add('open');
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function closeModalOverlay(e) { if (e.target === e.currentTarget) closeModal(); }

function innHeal() {
  if (P.gold < 10) return;
  P.gold -= 10; P.hp = P.maxHp;
  AudioSystem.sfxHeal();
  openModal('inn');
  updateCityStats();
}

function buyItem(id) {
  var item = SHOP_ITEMS.find(function(x) { return x.id === id; });
  if (!item || P.gold < item.cost) return;
  P.gold -= item.cost;
  P.inventory.push(Object.assign({}, item));
  AudioSystem.sfxClick();
  openModal('market');
  updateCityStats();
}

function sellItem(idx) {
  var item = P.inventory[idx];
  P.gold += Math.floor(item.cost / 2);
  P.inventory.splice(idx, 1);
  AudioSystem.sfxTreasure();
  openModal('market');
  updateCityStats();
}

function equipItem(idx) {
  var item = P.inventory[idx];
  var slot = item.type === 'weapon' ? 'weapon' : item.type === 'armor' ? 'armor' : 'accessory';
  if (P.equipment[slot]) P.inventory.push(P.equipment[slot]);
  P.equipment[slot] = item;
  P.inventory.splice(idx, 1);
  AudioSystem.sfxClick();
  openModal('inventory');
  updateCityStats();
}

function unequipItem(slot) {
  if (P.equipment[slot]) { P.inventory.push(P.equipment[slot]); P.equipment[slot] = null; }
  AudioSystem.sfxClick();
  openModal('equipment');
  updateCityStats();
}

function useItem(idx) {
  var item = P.inventory[idx];
  if (item.heal) { P.hp = Math.min(P.maxHp, P.hp + item.heal); }
  P.inventory.splice(idx, 1);
  AudioSystem.sfxHeal();
  openModal('inventory');
  updateCityStats();
}

function upgradeEquip(slot) {
  var eq = P.equipment[slot];
  if (!eq) return;
  var cost = Math.floor(eq.cost * 0.6);
  if (P.gold < cost) return;
  P.gold -= cost;
  if (eq.atk) eq.atk = Math.floor(eq.atk * 1.4);
  if (eq.def) eq.def = Math.floor(eq.def * 1.4);
  if (eq.crit) eq.crit = Math.floor(eq.crit * 1.3);
  if (eq.hp) eq.hp = Math.floor(eq.hp * 1.3);
  eq.cost = Math.floor(eq.cost * 1.3);
  eq.name = '\u2605' + eq.name.replace(/^\u2605+/, '');
  eq.desc = (eq.atk ? '+' + eq.atk + ' ATK ' : '') + (eq.def ? '+' + eq.def + ' DEF ' : '') + (eq.crit ? '+' + eq.crit + '% CRIT ' : '') + (eq.hp ? '+' + eq.hp + ' HP ' : '');
  AudioSystem.sfxClick();
  openModal('blacksmith');
  updateCityStats();
}
