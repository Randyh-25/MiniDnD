/* ============================================================
   SVG ICONS - Clean, proper SVG icons (not emoji, not AI)
   All icons are simple geometric SVG paths.
   ============================================================ */

const ICONS = {
  // Buildings
  inn: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M2 20h20v-2H2v2zm2-4h4v-3H4v3zm0-5h4V8H4v3zm6 5h4v-3h-4v3zm0-5h4V8h-4v3zm6 5h4v-3h-4v3zm0-5h4V8h-4v3zM2 4v2h20V4H2z" fill="currentColor"/></svg>',
  market: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2h2V8h4v2h2V8h2v12z" fill="currentColor"/></svg>',
  blacksmith: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-2.93 0-5.3-2.37-5.3-5.3S9.07 6.7 12 6.7s5.3 2.37 5.3 5.3-2.37 5.3-5.3 5.3zm0-8.6c-1.82 0-3.3 1.48-3.3 3.3s1.48 3.3 3.3 3.3 3.3-1.48 3.3-3.3-1.48-3.3-3.3-3.3z" fill="currentColor"/></svg>',
  library: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" fill="currentColor"/></svg>',

  // UI actions
  backpack: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 16H4V8h16v12z" fill="currentColor"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor"/></svg>',
  sword: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M6.92 5L5 7l6 6-5 5 1.41 1.41L12 14.82l4.59 4.59L18 18l-5-5 6-6-2-2-6 6-4.08-6z" fill="currentColor"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" fill="currentColor"/></svg>',
  flask: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M7 2v2h1v7.15L4.76 16.5A3 3 0 007.36 21h9.28a3 3 0 002.6-4.5L16 11.15V4h1V2H7zm7 9.85l3.5 6A1 1 0 0116.64 19H7.36a1 1 0 01-.86-1.5L10 11.85V4h4v7.85z" fill="currentColor"/></svg>',

  // Stats
  heart: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>',
  crosshair: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93h2c0 2.76 2.24 5 5 5v2.93zm5-5.93h2c0 4.08-3.05 7.44-7 7.93V19c2.76 0 5-2.24 5-5zm-5-8.93V2.07c3.95.49 7 3.85 7 7.93h-2c0-2.76-2.24-5-5-5zm-7 5c0-4.08 3.05-7.44 7-7.93V5c-2.76 0-5 2.24-5 5H6z" fill="currentColor"/></svg>',
  coin: '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">$</text></svg>',
  xpStar: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 5.2L8 14 2 9.2h7.6L12 2z" fill="currentColor"/></svg>',

  // Dungeon tiles
  wall: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 3h8v6H3V3zm10 0h8v6h-8V3zM3 11h5v5H3v-5zm7 0h4v5h-4v-5zm6 0h5v5h-5v-5zM3 18h8v3H3v-3zm10 0h8v3h-8v-3z" fill="#666"/></svg>',
  monster: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#e94560"/><circle cx="9" cy="10" r="1.5" fill="#ffd700"/><circle cx="15" cy="10" r="1.5" fill="#ffd700"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#ffd700" stroke-width="1.5" fill="none"/></svg>',
  treasure: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M4 10h16v10H4V10z" fill="#8b6914"/><path d="M2 8h20v4H2V8z" fill="#c2a83e"/><rect x="10" y="6" width="4" height="6" rx="2" fill="#ffd700"/><line x1="12" y1="12" x2="12" y2="18" stroke="#c2a83e" stroke-width="2"/></svg>',
  shrine: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2L4 8v2h16V8L12 2zM6 12v8h3v-6h6v6h3v-8H6z" fill="#4ecca3"/></svg>',
  trap: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#ff6b35"/></svg>',
  door: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M6 2h12v20H6V2zm2 2v16h8V4H8zm5 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#4ecca3"/></svg>',
  fog: '<svg viewBox="0 0 24 24" width="24" height="24"><text x="12" y="17" text-anchor="middle" font-size="16" fill="#555">?</text></svg>',

  // Audio
  volumeOn: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/></svg>',
  volumeOff: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/></svg>',

  // Misc
  flee: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" fill="currentColor"/></svg>',
  dice: '<svg viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="17" cy="17" r="1.5" fill="currentColor"/><circle cx="7" cy="17" r="1.5" fill="currentColor"/><circle cx="17" cy="7" r="1.5" fill="currentColor"/></svg>',
  skull: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12v4c0 1.1.9 2 2 2h1v3c0 .55.45 1 1 1h2v-4h8v4h2c.55 0 1-.45 1-1v-3h1c1.1 0 2-.9 2-2v-4c0-5.52-4.48-10-10-10zm-3 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/></svg>',
  restart: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/></svg>',
  levelup: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fill="currentColor"/></svg>'
};

/** Returns an inline SVG icon by name */
function icon(name, size) {
  size = size || 24;
  const raw = ICONS[name] || '';
  return raw.replace(/width="\d+"/, 'width="'+size+'"').replace(/height="\d+"/, 'height="'+size+'"');
}

/** Returns just the inner SVG content (for embedding in larger SVGs) */
function iconPath(name) {
  const raw = ICONS[name] || '';
  // Extract just the inner content (between > and </svg>)
  const match = raw.match(/>(.+)<\/svg>/s);
  return match ? match[1] : '';
}
