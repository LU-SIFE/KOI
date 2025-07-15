//canvas resive
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

//
// !! Main Loop
//
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  update();
  updateHoldBar();
  drawRipples();
  drawTrail();
  drawAutofisherTrails();
  drawDiamond(diamond.x, diamond.y, diamond.size, diamond.angle);

  for (const autofisher of autofishers) {
    drawDiamond(autofisher.x, autofisher.y, autofisher.size, autofisher.angle, "rgba(173, 235, 177, 1)");
  }

  requestAnimationFrame(loop);
}

function start() {
  console.log(fishdex.length + " fish loaded!");
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("menu").classList.add("hide");
  document.getElementById("upgrades").style.display = "block";

  localStorage.setItem("start_state", JSON.stringify(true));
  start_state = true;
  upgrade_state = true;

  buildWeights(currentPond);

  const savedCatchCount = localStorage.getItem("catchCount");
  catchCount = savedCatchCount ? parseInt(savedCatchCount) : 0;
  catchUpdate(catchCount);

  loadInventory();
  renderInventory();
  loadUpgrades();
  updateUpgradeUI();
  loadPondStates();
  updatePondButtons();

  const savedPond = localStorage.getItem("currentPond");
  if (savedPond) {
    currentPond = savedPond;
  } else {
    currentPond = "Base";
  }
  

  switchPond(currentPond);
  

  quote_cycle();
  quoteInterval = setInterval(quote_cycle, 15000);
  fishSpots = generateFishSpots(fishMax);
  loop();
}

window.onload = function () {

  start_state = localStorage.getItem("start_state") ? JSON.parse(localStorage.getItem("start_state")) : false;

  if (start_state === true) {
    start();
  } else {
    document.getElementById("menu").classList.remove("hide");
    document.getElementById("menu").classList.add("show");
    document.getElementById("upgrades").style.display = "none";
  }

  loadFishdex();
}