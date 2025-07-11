const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
const filterNode = audioCtx.createBiquadFilter();
const tremoloGain = audioCtx.createGain();
const tremoloOsc = audioCtx.createOscillator();

// Custom wave: dreamy shimmering sawtooth-ish
const real = new Float32Array([0, 0, 0, 0, 0, 0]);
const imag = new Float32Array([0, 1, 0.5, 0.33, 0.25, 0.2]);
const customWave = audioCtx.createPeriodicWave(real, imag);
oscillator.setPeriodicWave(customWave);

// Filter: gentle low-pass to soften brightness
filterNode.type = 'lowpass';
filterNode.frequency.value = 0;  // start warm and soft
filterNode.Q.value = 1;

// Tremolo: subtle amplitude modulation to add magic "wobble"
tremoloOsc.frequency.value = 1; // 5 Hz tremolo speed, gentle rocking
tremoloGain.gain.value = 0.05;
gainNode.gain.value = 0;         // start muted

// Connect oscillator through filter, then to gainNode (for volume control)
oscillator.connect(filterNode);
filterNode.connect(gainNode);

// Setup tremolo: oscillator modulates gainNode.gain
tremoloOsc.connect(tremoloGain);
tremoloGain.connect(gainNode.gain);

// Output to speakers
gainNode.connect(audioCtx.destination);

oscillator.frequency.value = 0;  // start lower freq for more warmth
oscillator.start();
tremoloOsc.start();

let lastRampTime = 0;

function updateToneBasedOnSpeed(speed, maxSpeed) {
  const now = audioCtx.currentTime;
  if (now - lastRampTime < 0.1) return; // throttle
  lastRampTime = now;

  const minFreq = 0;   // shifted min freq up for warmth
  let maxFreq = 60;    // wider frequency range for shimmer

  if (typeof speedMultiplier !== 'undefined' && speedMultiplier === 2) {
    maxFreq = 70;
  }

  const normalizedSpeed = Math.min(Math.abs(speed) / maxSpeed, 1);
  const targetFreq = minFreq + normalizedSpeed * (maxFreq - minFreq);
  const baseGain = normalizedSpeed * 0.125;  // a bit louder to hear tremolo clearly
  const filterFreq = normalizedSpeed * 1000; // filter opens more with speed

  oscillator.frequency.cancelScheduledValues(now);
  oscillator.frequency.linearRampToValueAtTime(targetFreq, now + 0.1);

  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.linearRampToValueAtTime(baseGain, now + 0.1);

  filterNode.frequency.cancelScheduledValues(now);
  filterNode.frequency.linearRampToValueAtTime(filterFreq, now + 0.1);
}

window.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});
