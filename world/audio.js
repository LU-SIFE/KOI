const ambientAudio = document.getElementById('ambient');
let ambientStarted = false;
let ambientPaused = false;

function startAmbient() {
  if (!ambientStarted) {
    ambientAudio.play()
      .then(() => {
        ambientAudio.volume = 0.05;
        ambientStarted = true;
        ambientPaused = false;
      })
      .catch(e => {
        console.log("Autoplay blocked — will try again on user input.");
      });
  }
}

function toggleAmbientPause() {
  if (!ambientStarted) return; // can't pause what hasn't started

  if (ambientPaused) {
    ambientAudio.play();
    ambientPaused = false;
  } else {
    ambientAudio.pause();
    ambientPaused = true;
  }
}

window.addEventListener('click', startAmbient, { once: true });
window.addEventListener('keydown', startAmbient, { once: true });