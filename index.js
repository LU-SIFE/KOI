//canvas init
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//canvas resive
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

//game states
let caughtThisPress = false; // Prevent multiple alerts per space press
let menu_state = false;
let isHolding = false;
let holdTime = 0;
let timeToCatch = 10000;

//
// !! Main Loop
//
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  update();
  updateHoldBar();
  drawRipples();
  drawTrail();
  drawDiamond(diamond.x, diamond.y, diamond.size, diamond.angle);

  for (const autofisher of autofishers) {
    drawDiamond(autofisher.x, autofisher.y, autofisher.size, autofisher.angle, "rgba(146, 191, 137, 1)");
  }

  requestAnimationFrame(loop);
}

let start_state = localStorage.getItem("start_state");
start_state = start_state ? JSON.parse(start_state) : false;

function start() {
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("menu").classList.add("hide");
    document.getElementById("upgrades").style.display = "block";

  start_state = true;
  localStorage.setItem("start_state", JSON.stringify(start_state)); // string "true"

  const savedCatchCount = localStorage.getItem("catchCount");
  catchCount = savedCatchCount ? parseInt(savedCatchCount) : 0;
  document.getElementById("catchCount").innerHTML = `Fish Caught: ${catchCount}`;

  loop();
}

window.onload = function () {
  if (start_state === true) {
    start();
  } else {
    document.getElementById("menu").classList.remove("hide");
    document.getElementById("menu").classList.add("show");
    document.getElementById("upgrades").style.display = "none";
    setTimeout(function () { menu_state = true; }, 300);
  }

  loadFishdex();
}