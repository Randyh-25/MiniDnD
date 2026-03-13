/* ============================================================
   MAIN - Initialization & Event Binding
   ============================================================ */

(function() {
  // Name input triggers start button check
  document.getElementById('player-name').addEventListener('input', checkStartReady);

  // Audio controls
  var muteBtn = document.getElementById('mute-btn');
  var volSlider = document.getElementById('vol-slider');

  if (muteBtn) {
    muteBtn.addEventListener('click', function() {
      var muted = AudioSystem.toggleMute();
      muteBtn.innerHTML = muted ? icon('volumeOff', 22) : icon('volumeOn', 22);
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', function() {
      AudioSystem.setVolume(parseFloat(volSlider.value));
    });
  }

  // Init audio on first user interaction
  document.addEventListener('click', function initAudio() {
    AudioSystem.ensureInit();
    document.removeEventListener('click', initAudio);
  }, { once: true });

  // Render town and region maps when city screen is shown
  var origShowScreen = showScreen;
  showScreen = function(id) {
    origShowScreen(id);
    if (id === 'city') {
      renderTownMap();
      renderRegionMap();
    }
  };
})();
