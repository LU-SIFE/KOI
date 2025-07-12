// === Audio Context Setup ===
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
const filterNode = audioCtx.createBiquadFilter();

// Custom waveform for richer sound
const real = new Float32Array([0, 0, 0, 0, 0, 0]);
const imag = new Float32Array([0, 1, 0.5, 0.33, 0.25, 0.2]);
const customWave = audioCtx.createPeriodicWave(real, imag);
oscillator.setPeriodicWave(customWave);

// Filter: low-pass to soften brightness
filterNode.type = 'lowpass';
filterNode.frequency.value = 0;  // start warm and soft
filterNode.Q.value = 1;

// Start muted
gainNode.gain.value = 0;

// Connect chain: oscillator → filter → gain → destination
oscillator.connect(filterNode);
filterNode.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Start oscillator immediately, but gain 0 means silent
oscillator.frequency.value = 0;
oscillator.start();

// Playback & mute state tracking
let isPlaying = true;
let muted = false;
let lastRampTime = 0;

// Throttled frequency and gain update based on speed
function updateToneBasedOnSpeed(speed, maxSpeed) {
  if (!isPlaying || muted) return;

  const now = audioCtx.currentTime;
  if (now - lastRampTime < 0.1) return; // throttle updates ~10Hz
  lastRampTime = now;

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

  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.linearRampToValueAtTime(baseGain, now + 0.1);

  filterNode.frequency.cancelScheduledValues(now);
  filterNode.frequency.linearRampToValueAtTime(filterFreq, now + 0.1);
}

// Resume audio context on first user interaction (browser autoplay policies)
window.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});

// Track mute and connection state
let oscillatorConnected = true; // track if oscillator is connected

function muteToggle() {
  muted = !muted;

  if (muted) {
    // Disconnect oscillator chain immediately
    if (oscillatorConnected) {
      try {
        filterNode.disconnect(gainNode);
      } catch (e) {}
      oscillatorConnected = false;
    }
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    isPlaying = false;
  } else {
    // Reconnect oscillator chain ONLY if not already connected
    if (!oscillatorConnected) {
      try {
        filterNode.connect(gainNode);
      } catch (e) {}
      oscillatorConnected = true;
    }
    // Smooth fade-in
    const now = audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
    isPlaying = true;
  }
}

// Optional: toggle oscillator sound on/off (fade gain in/out)
function oscToggle() {
  if (muted) return; // Don't toggle if muted

  const now = audioCtx.currentTime;
  const currentGain = gainNode.gain.value;

  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(currentGain, now);

  if (!isPlaying) {
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
    isPlaying = true;
  } else {
    gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
    isPlaying = false;
  }
}
