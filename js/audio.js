/* ============================================================
   AUDIO SYSTEM - Web Audio API procedural sounds & music
   ============================================================ */

const AudioSystem = (function() {
  let ctx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let currentMusic = null;
  let muted = false;
  let volume = 0.4;
  let initialized = false;
  let currentScene = 'city';

  function init() {
    if (initialized) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);

      musicGain = ctx.createGain();
      musicGain.gain.value = 0.25;
      musicGain.connect(masterGain);

      sfxGain = ctx.createGain();
      sfxGain.gain.value = 0.6;
      sfxGain.connect(masterGain);

      initialized = true;
    } catch(e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  function ensureInit() {
    if (!initialized) init();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }

  // --- Sound Effects ---

  function playNote(freq, duration, type, gainNode, vol) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(gainNode || sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  function playNoise(duration, gainNode, vol) {
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol || 0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(g);
    g.connect(gainNode || sfxGain);
    source.start(ctx.currentTime);
  }

  function sfxClick() {
    ensureInit();
    playNote(800, 0.08, 'square', sfxGain, 0.1);
  }

  function sfxAttack() {
    ensureInit();
    playNoise(0.15, sfxGain, 0.2);
    playNote(200, 0.15, 'sawtooth', sfxGain, 0.15);
  }

  function sfxCrit() {
    ensureInit();
    playNote(600, 0.1, 'square', sfxGain, 0.2);
    setTimeout(function(){ playNote(900, 0.15, 'square', sfxGain, 0.25); }, 80);
    setTimeout(function(){ playNote(1200, 0.2, 'square', sfxGain, 0.2); }, 160);
  }

  function sfxHit() {
    ensureInit();
    playNoise(0.12, sfxGain, 0.25);
    playNote(150, 0.12, 'sawtooth', sfxGain, 0.15);
  }

  function sfxHeal() {
    ensureInit();
    playNote(400, 0.15, 'sine', sfxGain, 0.2);
    setTimeout(function(){ playNote(500, 0.15, 'sine', sfxGain, 0.2); }, 100);
    setTimeout(function(){ playNote(650, 0.2, 'sine', sfxGain, 0.15); }, 200);
  }

  function sfxLevelUp() {
    ensureInit();
    const notes = [523, 659, 784, 1047];
    notes.forEach(function(n, i) {
      setTimeout(function(){ playNote(n, 0.25, 'sine', sfxGain, 0.2); }, i * 120);
    });
  }

  function sfxTreasure() {
    ensureInit();
    playNote(800, 0.12, 'sine', sfxGain, 0.2);
    setTimeout(function(){ playNote(1000, 0.12, 'sine', sfxGain, 0.2); }, 80);
    setTimeout(function(){ playNote(1200, 0.15, 'sine', sfxGain, 0.15); }, 160);
  }

  function sfxDoor() {
    ensureInit();
    playNote(300, 0.2, 'sine', sfxGain, 0.15);
    setTimeout(function(){ playNote(400, 0.3, 'sine', sfxGain, 0.1); }, 150);
  }

  function sfxTrap() {
    ensureInit();
    playNote(200, 0.1, 'sawtooth', sfxGain, 0.2);
    setTimeout(function(){ playNote(100, 0.2, 'sawtooth', sfxGain, 0.25); }, 80);
    playNoise(0.2, sfxGain, 0.15);
  }

  function sfxGameOver() {
    ensureInit();
    var notes = [400, 350, 300, 200];
    notes.forEach(function(n, i) {
      setTimeout(function(){ playNote(n, 0.4, 'sine', sfxGain, 0.2); }, i * 200);
    });
  }

  // --- Background Music (simple ambient loops) ---

  function stopMusic() {
    if (currentMusic) {
      try {
        currentMusic.forEach(function(node) {
          if (node && node.stop) node.stop();
        });
      } catch(e) {}
      currentMusic = null;
    }
  }

  function playMusicLoop(scene) {
    if (!ctx) return;
    stopMusic();
    currentScene = scene;
    if (muted) return;

    var nodes = [];
    var now = ctx.currentTime;

    if (scene === 'city') {
      // Peaceful ambient - soft pads
      function cityLoop() {
        if (currentScene !== 'city' || muted) return;
        var chords = [[261,329,392],[293,349,440],[329,392,494],[261,329,392]];
        chords.forEach(function(chord, ci) {
          chord.forEach(function(freq) {
            var osc = ctx.createOscillator();
            var g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            var t = ctx.currentTime + ci * 2;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.06, t + 0.3);
            g.gain.linearRampToValueAtTime(0.04, t + 1.5);
            g.gain.linearRampToValueAtTime(0, t + 2);
            osc.connect(g);
            g.connect(musicGain);
            osc.start(t);
            osc.stop(t + 2);
            nodes.push(osc);
          });
        });
        setTimeout(cityLoop, 8000);
      }
      cityLoop();
    }
    else if (scene === 'dungeon') {
      // Tense ambient - low drones
      function dungeonLoop() {
        if (currentScene !== 'dungeon' || muted) return;
        var freqs = [65, 82, 73, 65];
        freqs.forEach(function(freq, i) {
          var osc = ctx.createOscillator();
          var g = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          var t = ctx.currentTime + i * 1.5;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.08, t + 0.4);
          g.gain.linearRampToValueAtTime(0.05, t + 1);
          g.gain.linearRampToValueAtTime(0, t + 1.5);
          osc.connect(g);
          g.connect(musicGain);
          osc.start(t);
          osc.stop(t + 1.5);
          nodes.push(osc);
        });
        setTimeout(dungeonLoop, 6000);
      }
      dungeonLoop();
    }
    else if (scene === 'combat') {
      // Intense - rhythmic pulse
      function combatLoop() {
        if (currentScene !== 'combat' || muted) return;
        for (var i = 0; i < 8; i++) {
          var osc = ctx.createOscillator();
          var g = ctx.createGain();
          osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
          osc.frequency.value = i % 2 === 0 ? 110 : 82;
          var t = ctx.currentTime + i * 0.4;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(i % 2 === 0 ? 0.07 : 0.04, t + 0.05);
          g.gain.linearRampToValueAtTime(0, t + 0.35);
          osc.connect(g);
          g.connect(musicGain);
          osc.start(t);
          osc.stop(t + 0.4);
          nodes.push(osc);
        }
        setTimeout(combatLoop, 3200);
      }
      combatLoop();
    }

    currentMusic = nodes;
  }

  // --- Controls ---

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    if (masterGain) masterGain.gain.value = volume;
  }

  function toggleMute() {
    muted = !muted;
    if (masterGain) masterGain.gain.value = muted ? 0 : volume;
    if (muted) stopMusic();
    else playMusicLoop(currentScene);
    return muted;
  }

  function isMuted() { return muted; }
  function getVolume() { return volume; }

  function changeScene(scene) {
    ensureInit();
    currentScene = scene;
    playMusicLoop(scene);
  }

  return {
    init: init,
    ensureInit: ensureInit,
    sfxClick: sfxClick,
    sfxAttack: sfxAttack,
    sfxCrit: sfxCrit,
    sfxHit: sfxHit,
    sfxHeal: sfxHeal,
    sfxLevelUp: sfxLevelUp,
    sfxTreasure: sfxTreasure,
    sfxDoor: sfxDoor,
    sfxTrap: sfxTrap,
    sfxGameOver: sfxGameOver,
    changeScene: changeScene,
    stopMusic: stopMusic,
    setVolume: setVolume,
    toggleMute: toggleMute,
    isMuted: isMuted,
    getVolume: getVolume
  };
})();
