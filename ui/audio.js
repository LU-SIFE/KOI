const ambientAudio = document.getElementById('ambient');

function startAmbient() {
  ambientAudio.play()
    .then(() => {
      ambientAudio.volume = 0.05;
    })
    .catch(e => {
      console.log("Autoplay blocked — will try again on user input.");
    });
}

window.addEventListener('click', startAmbient, { once: true });
window.addEventListener('keydown', startAmbient, { once: true });