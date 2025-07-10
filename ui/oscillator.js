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
function updateToneBasedOnSpeed(speed, maxSpeed) {
  const minFreq = 0;
  const maxFreq = 75;
  const normalizedSpeed = Math.min(Math.abs(speed) / maxSpeed, 1);

  oscillator.frequency.value = minFreq + normalizedSpeed * (maxFreq - minFreq);

  gainNode.gain.linearRampToValueAtTime(normalizedSpeed * 0.05, audioCtx.currentTime + 0.1);
}

window.addEventListener('click', () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
});