const ambientAudios = [
  [document.getElementById('sea-ambience'), 0.05],
  [document.getElementById('rain-ambience'), 0.25],
  [document.getElementById('park-ambience'), 0.15],
  // You can add more audio elements here later!
];

let ambientStarted = false;
let ambientPaused = false;
let currentAmbient = null;

function startAmbient(ambientAudio, volume) {
  if (!ambientStarted) {
    ambientAudio.play()
      .then(() => {
        ambientAudio.volume = volume;
        ambientStarted = true;
        ambientPaused = false;
        currentAmbient = ambientAudio;
      })
      .catch(e => {
        console.log("Autoplay blocked — will try again on user input.");
      });
  }
}

function toggleAmbientPause() {
  if (!ambientStarted || !currentAmbient) return;

  if (ambientPaused) {
    currentAmbient.play();
    ambientPaused = false;
  } else {
    currentAmbient.pause();
    ambientPaused = true;
  }
}

function randomAmbient() {
  const randomIndex = Math.floor(Math.random() * ambientAudios.length);
  startAmbient(ambientAudios[randomIndex][0], ambientAudios[randomIndex][1]);
}

function handleFirstInteraction() {
  randomAmbient();
  window.removeEventListener('click', handleFirstInteraction);
  window.removeEventListener('keydown', handleFirstInteraction);
}

window.addEventListener('click', handleFirstInteraction);
window.addEventListener('keydown', handleFirstInteraction);


// Fish-up audio
const fishUp = document.getElementById('fishUp');
function fishSfx() {
  fishUp.play();
}
