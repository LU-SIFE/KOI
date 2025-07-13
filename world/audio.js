// === Audio Context Setup ===
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// === Gain Nodes for Separate Categories ===
const oscillatorGain = audioCtx.createGain();  // Oscillator tone control
const ambienceGain = audioCtx.createGain();    // Ambient audio control
const sfxGain = audioCtx.createGain();         // Sound effects control

// === Oscillator Setup ===
const oscillator = audioCtx.createOscillator();
const filterNode = audioCtx.createBiquadFilter();

// Create a custom waveform for richer sound
const real = new Float32Array([0, 0, 0, 0, 0, 0]);
const imag = new Float32Array([0, 1, 0.5, 0.33, 0.25, 0.2]);
const customWave = audioCtx.createPeriodicWave(real, imag);
oscillator.setPeriodicWave(customWave);

// Low-pass filter to soften the brightness
filterNode.type = 'lowpass';
filterNode.frequency.value = 0;  // Start soft and warm
filterNode.Q.value = 1;

// Start oscillator muted
oscillatorGain.gain.value = 0;

// Connect oscillator chain: oscillator → filter → gain → destination
oscillator.connect(filterNode);
filterNode.connect(oscillatorGain);
oscillatorGain.connect(audioCtx.destination);

// Connect ambience and SFX gains directly to destination
ambienceGain.connect(audioCtx.destination);
sfxGain.connect(audioCtx.destination);

// Start oscillator immediately, silent by default
oscillator.frequency.value = 0;
oscillator.start();

// === Ambient audio elements and volumes ===
const ambientAudios = [
  [document.getElementById('sea-ambience'), 0.05],
  [document.getElementById('rain-ambience'), 0.25],
  [document.getElementById('park-ambience'), 0.15],
];

// Connect ambient audio elements to ambienceGain for centralized volume control
ambientAudios.forEach(([audio]) => {
  if (audio) {
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(ambienceGain);
  }
});

// === Fish sound effect connected to sfxGain ===
const fishUp = document.getElementById('fishUp');
let fishSfxSource;
if (fishUp) {
  fishSfxSource = audioCtx.createMediaElementSource(fishUp);
  fishSfxSource.connect(sfxGain);
}

// === SoundManager Object ===
const SoundManager = {
  sfxMuted: false,
  ambienceMuted: false,
  oscillatorMuted: false,

  lastRampTime: 0,

  currentAmbientIndex: -1,
  ambientStarted: false,
  ambientPaused: false,
  currentAmbient: null,

  // Helper for smooth gain changes
  _setGainSmoothly(gainNode, targetValue, rampTime = 0.1) {
    const now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.linearRampToValueAtTime(targetValue, now + rampTime);
  },

  // === Oscillator Controls ===
  muteOscillatorToggle() {
    this.oscillatorMuted = !this.oscillatorMuted;
    this._setGainSmoothly(oscillatorGain, this.oscillatorMuted ? 0 : 0.1);
  },

  // === SFX Controls ===
  muteSfxToggle() {
    this.sfxMuted = !this.sfxMuted;
    // Keep oscillator muted in sync with sfx mute state
    this.oscillatorMuted = this.sfxMuted;

    const now = audioCtx.currentTime;

    if (this.sfxMuted) {
      oscillatorGain.gain.cancelScheduledValues(now);
      oscillatorGain.gain.setValueAtTime(0, now);
      sfxGain.gain.cancelScheduledValues(now);
      sfxGain.gain.setValueAtTime(0, now);
    } else {
      oscillatorGain.gain.cancelScheduledValues(now);
      oscillatorGain.gain.setValueAtTime(0.1, now);
      sfxGain.gain.cancelScheduledValues(now);
      sfxGain.gain.setValueAtTime(1, now);
    }
  },

  // === Ambience Controls ===
  muteAmbienceToggle() {
    this.ambienceMuted = !this.ambienceMuted;
    const now = audioCtx.currentTime;
    ambienceGain.gain.cancelScheduledValues(now);
    ambienceGain.gain.setValueAtTime(this.ambienceMuted ? 0 : 1, now);

    if (this.ambienceMuted) {
      this.pauseCurrentAmbient();
    } else {
      SoundManager.cycleAmbientTrack();
      this.resumeOrStartAmbient();
    }
  },

  pauseCurrentAmbient() {
    if (this.currentAmbient) {
      this.currentAmbient.pause();
      this.ambientPaused = true;
    }
  },

  resumeOrStartAmbient() {
    if (!this.ambientStarted) {
      this.currentAmbientIndex = 0;
      this.startAmbientTrack(this.currentAmbientIndex);
    } else if (this.ambientPaused && this.currentAmbient) {
      this.currentAmbient.play().catch(() => {
        console.log("Autoplay blocked — will try again on user input.");
      });
      this.ambientPaused = false;
    }
  },

  startAmbientTrack(index) {
    if (this.currentAmbient) {
      this.currentAmbient.pause();
      this.currentAmbient.currentTime = 0;
    }

    this.currentAmbientIndex = index;
    const [audio, volume] = ambientAudios[index];

    if (audio) {
      audio.volume = volume;
      audio.play()
        .then(() => {
          this.currentAmbient = audio;
          this.ambientStarted = true;
          this.ambientPaused = false;
        })
        .catch(() => {
          console.log("Autoplay blocked — will try again on user input.");
        });
    }
  },

  cycleAmbientTrack() {
    if (ambientAudios.length === 0) return;

    const nextIndex = (this.currentAmbientIndex + 1) % ambientAudios.length;
    this.startAmbientTrack(nextIndex);

    this.ambienceMuted = false;
    ambienceGain.gain.setValueAtTime(1, audioCtx.currentTime);
  },

  // === Oscillator frequency and gain update based on speed ===
  updateToneBasedOnSpeed(speed, maxSpeed) {
    if (this.oscillatorMuted || this.sfxMuted) return;

    const now = audioCtx.currentTime;
    if (now - this.lastRampTime < 0.1) return;
    this.lastRampTime = now;

    const minFreq = 0;
    let maxFreq = 70;
    if (typeof speedMultiplier !== 'undefined' && speedMultiplier === 2) {
      maxFreq = 80;
    }

    const normalizedSpeed = Math.min(Math.abs(speed) / maxSpeed, 1);
    const targetFreq = minFreq + normalizedSpeed * (maxFreq - minFreq);
    const baseGain = normalizedSpeed * 0.125;
    const filterFreq = normalizedSpeed * 1000;

    oscillator.frequency.cancelScheduledValues(now);
    oscillator.frequency.linearRampToValueAtTime(targetFreq, now + 0.1);

    oscillatorGain.gain.cancelScheduledValues(now);
    oscillatorGain.gain.linearRampToValueAtTime(baseGain, now + 0.1);

    filterNode.frequency.cancelScheduledValues(now);
    filterNode.frequency.linearRampToValueAtTime(filterFreq, now + 0.1);
  },

  // === Play Fish Sound Effect ===
  playFishSfx() {
    if (this.sfxMuted) return;

    fishUp.play().catch(() => {
      console.log("Fish SFX play blocked.");
    });
  },
};

// === Handle user interaction for autoplay policies ===
function handleFirstInteraction() {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  SoundManager.resumeOrStartAmbient();

  window.removeEventListener('click', handleFirstInteraction);
  window.removeEventListener('keydown', handleFirstInteraction);
}

window.addEventListener('click', handleFirstInteraction);
window.addEventListener('keydown', handleFirstInteraction);
