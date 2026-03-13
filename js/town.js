/* ============================================================
   TOWN MAP - Illustrated SVG town with clickable buildings
   ============================================================ */

function renderTownMap() {
  var container = document.getElementById('town-map-container');
  container.innerHTML = getTownMapSVG();
}

function getTownMapSVG() {
  return '<svg class="town-map-svg" viewBox="0 0 700 450" xmlns="http://www.w3.org/2000/svg">' +
    // Background - grass/ground
    '<defs>' +
      '<radialGradient id="tg" cx="50%" cy="50%"><stop offset="0%" stop-color="#2a4a3a"/><stop offset="100%" stop-color="#1a3a2a"/></radialGradient>' +
      '<pattern id="cobble" width="20" height="20" patternUnits="userSpaceOnUse">' +
        '<rect width="20" height="20" fill="#3a3a30"/>' +
        '<circle cx="5" cy="5" r="4" fill="#4a4a3a"/>' +
        '<circle cx="15" cy="15" r="4" fill="#444438"/>' +
      '</pattern>' +
    '</defs>' +
    '<rect width="700" height="450" fill="url(#tg)"/>' +

    // Outer walls
    '<rect x="30" y="30" width="640" height="390" rx="8" fill="none" stroke="#5a4a3a" stroke-width="8"/>' +
    '<rect x="34" y="34" width="632" height="382" rx="6" fill="none" stroke="#4a3a2a" stroke-width="2"/>' +

    // Wall towers (corners)
    '<circle cx="30" cy="30" r="14" fill="#5a4a3a"/>' +
    '<circle cx="670" cy="30" r="14" fill="#5a4a3a"/>' +
    '<circle cx="30" cy="420" r="14" fill="#5a4a3a"/>' +
    '<circle cx="670" cy="420" r="14" fill="#5a4a3a"/>' +

    // Gate at bottom
    '<rect x="310" y="412" width="80" height="16" fill="#5a4a3a"/>' +
    '<rect x="330" y="414" width="40" height="14" rx="20" fill="#2a2a1e"/>' +

    // Cobblestone paths
    '<rect x="330" y="200" width="40" height="216" fill="url(#cobble)"/>' +
    '<rect x="140" y="210" width="420" height="30" fill="url(#cobble)"/>' +
    '<rect x="140" y="210" width="30" height="100" fill="url(#cobble)"/>' +
    '<rect x="530" y="210" width="30" height="100" fill="url(#cobble)"/>' +

    // Central fountain/plaza
    '<circle cx="350" cy="225" r="35" fill="#2a3a4a" stroke="#5a6a7a" stroke-width="3"/>' +
    '<circle cx="350" cy="225" r="20" fill="#3a5a7a"/>' +
    '<circle cx="350" cy="225" r="8" fill="#5a8aaa"/>' +

    // Decorative trees
    '<circle cx="80" cy="380" r="18" fill="#2d5a3f" opacity=".8"/>' +
    '<circle cx="80" cy="374" r="14" fill="#3a7a5a" opacity=".7"/>' +
    '<circle cx="620" cy="380" r="18" fill="#2d5a3f" opacity=".8"/>' +
    '<circle cx="620" cy="374" r="14" fill="#3a7a5a" opacity=".7"/>' +
    '<circle cx="260" cy="370" r="14" fill="#2d5a3f" opacity=".7"/>' +
    '<circle cx="440" cy="370" r="14" fill="#2d5a3f" opacity=".7"/>' +
    '<circle cx="100" cy="120" r="16" fill="#2d5a3f" opacity=".8"/>' +
    '<circle cx="600" cy="120" r="16" fill="#2d5a3f" opacity=".8"/>' +

    // === INN (top-left) ===
    '<g class="town-hotspot" onclick="openModal(\'inn\')" style="cursor:pointer">' +
      // Building
      '<rect x="80" y="60" width="140" height="100" rx="4" fill="#4a3a2a"/>' +
      '<polygon points="80,60 150,20 220,60" fill="#6a3a2a"/>' +  // roof
      '<rect x="120" y="110" width="30" height="50" rx="2" fill="#3a2a1a"/>' + // door
      '<rect x="95" y="80" width="20" height="20" rx="2" fill="#5a7a9a" opacity=".5"/>' + // window
      '<rect x="170" y="80" width="20" height="20" rx="2" fill="#5a7a9a" opacity=".5"/>' + // window
      '<circle cx="135" cy="130" r="2" fill="#c2a83e"/>' + // doorknob
      // Sign
      '<rect x="105" y="48" width="60" height="18" rx="3" fill="#1a1a2e" opacity=".8"/>' +
      '<text x="135" y="61" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="serif">Inn</text>' +
      // Icon - bed
      '<g transform="translate(140,28) scale(0.7)">' +
        '<rect x="2" y="12" width="20" height="4" rx="1" fill="#c2a83e"/>' +
        '<rect x="2" y="8" width="8" height="6" rx="2" fill="#c2a83e"/>' +
        '<rect x="1" y="6" width="3" height="12" rx="1" fill="#c2a83e"/>' +
        '<rect x="20" y="6" width="3" height="12" rx="1" fill="#c2a83e"/>' +
      '</g>' +
      // Hover glow
      '<rect x="76" y="16" width="148" height="148" rx="6" fill="none" stroke="#e94560" stroke-width="2" opacity="0" class="hotspot-glow"><animate attributeName="opacity" values="0;0" dur="1s"/></rect>' +
    '</g>' +

    // === MARKET (top-right) ===
    '<g class="town-hotspot" onclick="openModal(\'market\')" style="cursor:pointer">' +
      '<rect x="480" y="60" width="150" height="100" rx="4" fill="#3a4a3a"/>' +
      '<polygon points="480,60 555,25 630,60" fill="#4a6a4a"/>' +
      // Market stall awning
      '<rect x="490" y="100" width="130" height="8" fill="#c23152" opacity=".7"/>' +
      '<rect x="500" y="108" width="20" height="40" fill="#8b6914"/>' + // crate
      '<rect x="525" y="118" width="20" height="30" fill="#8b6914"/>' + // crate
      '<rect x="555" y="108" width="15" height="40" fill="#6a8a4a"/>' + // barrel
      '<ellipse cx="562" cy="108" rx="8" ry="3" fill="#5a7a3a"/>' + // barrel top
      '<rect x="500" y="110" width="30" height="20" rx="2" fill="#3a2a1a"/>' + // door
      '<circle cx="515" cy="120" r="2" fill="#c2a83e"/>' +
      '<rect x="508" y="48" width="60" height="18" rx="3" fill="#1a1a2e" opacity=".8"/>' +
      '<text x="538" y="61" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="serif">Market</text>' +
    '</g>' +

    // === BLACKSMITH (bottom-left) ===
    '<g class="town-hotspot" onclick="openModal(\'blacksmith\')" style="cursor:pointer">' +
      '<rect x="80" y="260" width="130" height="90" rx="4" fill="#4a3a3a"/>' +
      '<polygon points="80,260 145,230 210,260" fill="#5a3a3a"/>' +
      // Chimney with smoke
      '<rect x="180" y="220" width="16" height="40" fill="#5a4a4a"/>' +
      '<circle cx="188" cy="215" r="6" fill="#666" opacity=".3"/>' +
      '<circle cx="192" cy="205" r="8" fill="#555" opacity=".2"/>' +
      // Anvil
      '<rect x="95" y="315" width="30" height="10" fill="#708090"/>' +
      '<rect x="100" y="305" width="20" height="12" fill="#808890"/>' +
      '<rect x="130" y="310" width="20" height="20" fill="#3a2a1a"/>' + // door
      '<circle cx="140" cy="320" r="2" fill="#c2a83e"/>' +
      '<rect x="103" y="247" width="60" height="18" rx="3" fill="#1a1a2e" opacity=".8"/>' +
      '<text x="133" y="260" text-anchor="middle" fill="#e0e0e0" font-size="10" font-family="serif">Blacksmith</text>' +
    '</g>' +

    // === LIBRARY (bottom-right) ===
    '<g class="town-hotspot" onclick="openModal(\'library\')" style="cursor:pointer">' +
      '<rect x="490" y="260" width="130" height="90" rx="4" fill="#3a3a4a"/>' +
      // Dome roof
      '<path d="M490,260 Q555,210 620,260" fill="#4a4a6a"/>' +
      // Columns
      '<rect x="500" y="280" width="8" height="70" fill="#5a5a6a"/>' +
      '<rect x="602" y="280" width="8" height="70" fill="#5a5a6a"/>' +
      // Door
      '<rect x="535" y="300" width="30" height="50" rx="15" fill="#2a2a3a"/>' +
      '<circle cx="555" cy="330" r="2" fill="#c2a83e"/>' +
      // Windows (stained glass look)
      '<circle cx="520" cy="290" r="8" fill="#7ec8e3" opacity=".4"/>' +
      '<circle cx="590" cy="290" r="8" fill="#7ec8e3" opacity=".4"/>' +
      '<rect x="510" y="247" width="60" height="18" rx="3" fill="#1a1a2e" opacity=".8"/>' +
      '<text x="540" y="260" text-anchor="middle" fill="#e0e0e0" font-size="11" font-family="serif">Library</text>' +
    '</g>' +

    // Title banner
    '<rect x="250" y="5" width="200" height="24" rx="4" fill="#1a1a2e" opacity=".8"/>' +
    '<text x="350" y="21" text-anchor="middle" fill="#e94560" font-size="13" font-weight="bold" font-family="serif">City of Veridia</text>' +

  '</svg>';
}
