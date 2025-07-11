const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.type = "triangle";
oscillator.frequency.value = 440;

gainNode.gain.value = 0;

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.start();

// Your function that uses audioCtx:
let lastRampTime = 0;

function updateToneBasedOnSpeed(speed, maxSpeed) {
  const now = audioCtx.currentTime;
  if (now - lastRampTime < 0.1) return; // throttle to avoid overlap
  lastRampTime = now;

  const minFreq = 0;
  let maxFreq = 75;
  if (speedMultiplier === 2) {
    maxFreq = 100;
  }

  const normalizedSpeed = Math.min(Math.abs(speed) / maxSpeed, 1);
  const targetFreq = minFreq + normalizedSpeed * (maxFreq - minFreq);
  const targetGain = normalizedSpeed * 0.05;

  oscillator.frequency.cancelScheduledValues(now);
  oscillator.frequency.linearRampToValueAtTime(targetFreq, now + 0.1);

  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.1);
}


window.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});