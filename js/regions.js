/* ============================================================
   REGION / WORLD MAP - Illustrated SVG map with clickable regions
   ============================================================ */

function renderRegionMap() {
  var container = document.getElementById('region-map-container');
  container.innerHTML = getRegionMapSVG();
}

function getRegionMapSVG() {
  return '<svg class="region-map-svg" viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '</defs>' +

    // Ocean background
    '<rect width="700" height="400" fill="#0a1628"/>' +
    // Water texture
    '<path d="M0 350Q100 340 200 355Q300 370 400 350Q500 330 600 345Q700 360 700 400H0Z" fill="#0d1e3a" opacity=".5"/>' +
    '<path d="M0 360Q150 350 300 365Q450 380 600 360Q700 345 700 400H0Z" fill="#0a1628" opacity=".3"/>' +

    // === FOREST (top-left) ===
    '<g class="region-area" onclick="enterDungeon(\'forest\')" onmouseenter="showRegionTip(evt,\'forest\')" onmouseleave="hideRegionTip()" style="cursor:pointer">' +
      '<path d="M40,40 Q80,20 160,35 Q200,30 220,60 Q240,100 230,150 Q220,180 180,190 Q140,200 100,185 Q60,170 45,130 Q30,90 40,40Z" fill="#1a4a2e"/>' +
      '<path d="M40,40 Q80,20 160,35 Q200,30 220,60 Q240,100 230,150 Q220,180 180,190 Q140,200 100,185 Q60,170 45,130 Q30,90 40,40Z" fill="none" stroke="#2d6a4f" stroke-width="2"/>' +
      // Trees
      '<polygon points="90,70 100,40 110,70" fill="#2d6a4f"/>' +
      '<polygon points="85,85 100,55 115,85" fill="#3a8a5f"/>' +
      '<polygon points="140,80 150,50 160,80" fill="#2d6a4f"/>' +
      '<polygon points="135,95 150,65 165,95" fill="#3a8a5f"/>' +
      '<polygon points="110,130 120,100 130,130" fill="#2d6a4f"/>' +
      '<polygon points="170,140 180,115 190,140" fill="#3a8a5f"/>' +
      '<polygon points="70,120 80,95 90,120" fill="#2d6a4f"/>' +
      '<rect x="97" y="70" width="6" height="15" fill="#5a3a1a"/>' +
      '<rect x="147" y="80" width="6" height="15" fill="#5a3a1a"/>' +
      '<rect x="117" y="130" width="6" height="12" fill="#5a3a1a"/>' +
      // Label
      '<text x="130" y="170" text-anchor="middle" fill="#7ec8e3" font-size="12" font-weight="bold" font-family="serif" filter="url(#glow)">Forest</text>' +
    '</g>' +

    // === MOUNTAINS (top-center) ===
    '<g class="region-area" onclick="enterDungeon(\'mountains\')" onmouseenter="showRegionTip(evt,\'mountains\')" onmouseleave="hideRegionTip()" style="cursor:pointer">' +
      '<path d="M260,30 Q300,15 370,25 Q420,20 440,50 Q450,90 440,140 Q420,170 380,175 Q330,180 290,170 Q260,155 250,120 Q240,80 260,30Z" fill="#3a4a5a"/>' +
      '<path d="M260,30 Q300,15 370,25 Q420,20 440,50 Q450,90 440,140 Q420,170 380,175 Q330,180 290,170 Q260,155 250,120 Q240,80 260,30Z" fill="none" stroke="#6a7a8a" stroke-width="2"/>' +
      // Mountain peaks
      '<polygon points="300,60 320,20 340,60" fill="#5a6a7a"/>' +
      '<polygon points="295,65 320,30 345,65" fill="#6a7a8a"/>' +
      '<polygon points="320,30 325,22 330,30" fill="#ddd"/>' + // snow cap
      '<polygon points="360,80 380,40 400,80" fill="#5a6a7a"/>' +
      '<polygon points="355,85 380,50 405,85" fill="#6a7a8a"/>' +
      '<polygon points="380,50 385,42 390,50" fill="#ddd"/>' + // snow cap
      '<polygon points="280,100 300,65 320,100" fill="#4a5a6a"/>' +
      '<polygon points="300,65 305,58 310,65" fill="#ccc"/>' +
      '<text x="350" y="160" text-anchor="middle" fill="#87ceeb" font-size="12" font-weight="bold" font-family="serif" filter="url(#glow)">Mountains</text>' +
    '</g>' +

    // === DESERT (top-right) ===
    '<g class="region-area" onclick="enterDungeon(\'desert\')" onmouseenter="showRegionTip(evt,\'desert\')" onmouseleave="hideRegionTip()" style="cursor:pointer">' +
      '<path d="M490,40 Q530,20 600,35 Q650,40 670,80 Q680,130 660,170 Q640,195 590,200 Q540,205 510,185 Q480,160 475,120 Q470,80 490,40Z" fill="#5a4a1e"/>' +
      '<path d="M490,40 Q530,20 600,35 Q650,40 670,80 Q680,130 660,170 Q640,195 590,200 Q540,205 510,185 Q480,160 475,120 Q470,80 490,40Z" fill="none" stroke="#8b6914" stroke-width="2"/>' +
      // Sand dunes
      '<path d="M500,120 Q530,100 560,115 Q590,130 620,110" fill="none" stroke="#8b6914" stroke-width="2"/>' +
      '<path d="M510,145 Q540,130 570,145 Q600,160 630,140" fill="none" stroke="#c2a83e" stroke-width="1.5"/>' +
      // Pyramid
      '<polygon points="560,70 580,40 600,70" fill="#c2a83e"/>' +
      '<polygon points="565,70 580,45 595,70" fill="#dab844"/>' +
      // Cactus
      '<rect x="520" y="80" width="4" height="20" fill="#4a6a2a"/>' +
      '<rect x="516" y="85" width="4" height="10" fill="#4a6a2a"/>' +
      '<rect x="524" y="82" width="4" height="12" fill="#4a6a2a"/>' +
      '<text x="575" y="185" text-anchor="middle" fill="#ffd700" font-size="12" font-weight="bold" font-family="serif" filter="url(#glow)">Desert</text>' +
    '</g>' +

    // === SWAMP (bottom-left) ===
    '<g class="region-area" onclick="enterDungeon(\'swamp\')" onmouseenter="showRegionTip(evt,\'swamp\')" onmouseleave="hideRegionTip()" style="cursor:pointer">' +
      '<path d="M40,230 Q80,210 150,220 Q200,215 215,250 Q230,290 220,330 Q200,360 160,370 Q110,375 70,355 Q40,335 35,290 Q30,260 40,230Z" fill="#2a3a1a"/>' +
      '<path d="M40,230 Q80,210 150,220 Q200,215 215,250 Q230,290 220,330 Q200,360 160,370 Q110,375 70,355 Q40,335 35,290 Q30,260 40,230Z" fill="none" stroke="#4a6a3a" stroke-width="2"/>' +
      // Murky water
      '<ellipse cx="120" cy="290" rx="50" ry="25" fill="#1a3a1a" opacity=".6"/>' +
      '<ellipse cx="120" cy="290" rx="30" ry="15" fill="#2a4a2a" opacity=".4"/>' +
      // Dead trees
      '<line x1="80" y1="260" x2="80" y2="230" stroke="#5a4a3a" stroke-width="3"/>' +
      '<line x1="80" y1="240" x2="70" y2="228" stroke="#5a4a3a" stroke-width="2"/>' +
      '<line x1="80" y1="245" x2="92" y2="232" stroke="#5a4a3a" stroke-width="2"/>' +
      '<line x1="160" y1="270" x2="160" y2="240" stroke="#5a4a3a" stroke-width="3"/>' +
      '<line x1="160" y1="250" x2="150" y2="238" stroke="#5a4a3a" stroke-width="2"/>' +
      '<line x1="160" y1="255" x2="172" y2="242" stroke="#5a4a3a" stroke-width="2"/>' +
      // Lily pads
      '<ellipse cx="100" cy="300" rx="8" ry="5" fill="#4a8a4a" opacity=".6"/>' +
      '<ellipse cx="140" cy="305" rx="6" ry="4" fill="#3a7a3a" opacity=".5"/>' +
      '<text x="125" y="355" text-anchor="middle" fill="#4ecca3" font-size="12" font-weight="bold" font-family="serif" filter="url(#glow)">Swamp</text>' +
    '</g>' +

    // === CAVES (bottom-center) ===
    '<g class="region-area" onclick="enterDungeon(\'caves\')" onmouseenter="showRegionTip(evt,\'caves\')" onmouseleave="hideRegionTip()" style="cursor:pointer">' +
      '<path d="M270,230 Q310,210 380,220 Q430,225 445,260 Q455,300 440,340 Q420,370 370,375 Q320,380 290,360 Q265,340 258,300 Q255,265 270,230Z" fill="#2a2a3e"/>' +
      '<path d="M270,230 Q310,210 380,220 Q430,225 445,260 Q455,300 440,340 Q420,370 370,375 Q320,380 290,360 Q265,340 258,300 Q255,265 270,230Z" fill="none" stroke="#5a4a6a" stroke-width="2"/>' +
      // Cave entrance
      '<ellipse cx="350" cy="280" rx="30" ry="22" fill="#111"/>' +
      '<ellipse cx="350" cy="280" rx="25" ry="18" fill="#1a1a2e"/>' +
      // Stalactites
      '<polygon points="330,260 333,275 328,275" fill="#4a3a5a"/>' +
      '<polygon points="350,258 353,270 347,270" fill="#5a4a6a"/>' +
      '<polygon points="370,261 373,274 367,274" fill="#4a3a5a"/>' +
      // Crystals
      '<polygon points="310,310 315,290 320,310" fill="#7b68ee" opacity=".6"/>' +
      '<polygon points="380,320 384,302 388,320" fill="#9370db" opacity=".5"/>' +
      '<polygon points="300,280 303,268 306,280" fill="#7b68ee" opacity=".4"/>' +
      '<text x="355" y="360" text-anchor="middle" fill="#b39ddb" font-size="12" font-weight="bold" font-family="serif" filter="url(#glow)">Caves</text>' +
    '</g>' +

    // === HELL (bottom-right) ===
    '<g class="region-area" onclick="enterDungeon(\'hell\')" onmouseenter="showRegionTip(evt,\'hell\')" onmouseleave="hideRegionTip()" style="cursor:pointer">' +
      '<path d="M490,230 Q530,215 600,225 Q650,230 665,270 Q675,310 660,350 Q640,375 590,380 Q540,385 510,365 Q480,340 475,300 Q470,260 490,230Z" fill="#3a1a1a"/>' +
      '<path d="M490,230 Q530,215 600,225 Q650,230 665,270 Q675,310 660,350 Q640,375 590,380 Q540,385 510,365 Q480,340 475,300 Q470,260 490,230Z" fill="none" stroke="#6a040f" stroke-width="2"/>' +
      // Lava
      '<ellipse cx="575" cy="300" rx="40" ry="20" fill="#e94560" opacity=".3"/>' +
      '<ellipse cx="575" cy="300" rx="25" ry="12" fill="#ff6b35" opacity=".3"/>' +
      // Volcanic rocks
      '<polygon points="530,260 540,235 550,260" fill="#4a1a1a"/>' +
      '<polygon points="600,270 610,245 620,270" fill="#5a1a1a"/>' +
      '<polygon points="560,250 565,240 570,250" fill="#3a0a0a"/>' +
      // Fire particles
      '<circle cx="550" cy="290" r="3" fill="#ff6b35" opacity=".5"/>' +
      '<circle cx="590" cy="285" r="2" fill="#ffd700" opacity=".4"/>' +
      '<circle cx="570" cy="275" r="2.5" fill="#e94560" opacity=".5"/>' +
      '<text x="575" y="365" text-anchor="middle" fill="#e94560" font-size="12" font-weight="bold" font-family="serif" filter="url(#glow)">Hell</text>' +
    '</g>' +

    // Map title
    '<rect x="250" y="5" width="200" height="22" rx="4" fill="#0a1628" opacity=".8" stroke="#333" stroke-width="1"/>' +
    '<text x="350" y="20" text-anchor="middle" fill="#ffd700" font-size="12" font-weight="bold" font-family="serif">World Map — Choose Region</text>' +

    // Compass rose (top-right corner)
    '<g transform="translate(660,30)">' +
      '<circle r="12" fill="#0a1628" stroke="#555" stroke-width="1"/>' +
      '<text y="4" text-anchor="middle" fill="#999" font-size="8" font-weight="bold">N</text>' +
    '</g>' +
  '</svg>';
}

// Region tooltip
function showRegionTip(evt, region) {
  var info = REGION_INFO[region];
  var tip = document.getElementById('region-tooltip');
  if (!tip || !info) return;
  tip.innerHTML = '<span class="tip-name">' + info.label + '</span><span class="tip-diff">Difficulty: ' + info.difficulty + '</span>';
  tip.classList.add('visible');

  var wrap = document.getElementById('region-map-container');
  var rect = wrap.getBoundingClientRect();
  var svgEl = wrap.querySelector('svg');
  if (!svgEl) return;
  var svgRect = svgEl.getBoundingClientRect();
  var x = evt.clientX - svgRect.left;
  var y = evt.clientY - svgRect.top;
  tip.style.left = x + 'px';
  tip.style.top = (y - 40) + 'px';
}

function hideRegionTip() {
  var tip = document.getElementById('region-tooltip');
  if (tip) tip.classList.remove('visible');
}
