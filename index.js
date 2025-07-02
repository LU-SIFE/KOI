const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let caughtThisPress = false; // Prevent multiple alerts per space press
const trail = [];
const maxTrailLength = 30; // length of the streamer

let menu_state = false;
let currentTargetFish = null;


const diamond = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,             // radians
  size: 25,
  speed: 0,
  maxSpeed: 1.25,
  acceleration: 0.015,
  friction: 0.0175,
  turnSpeed: 0.02,
};

const autofishers = [];

function createAutofisher() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    angle: 0,
    size: 20,
    speed: 0,
    maxSpeed: 1.25,
    acceleration: 0.015,
    friction: 0.0175,
    turnSpeed: 0.02,
    holding: false,
    holdTime: 0,
    target: null,
  };
}

function updateAutofishers() {
  const usedFish = new Set();

  for (const autofisher of autofishers) {
    // If no valid target or someone else claimed it, find a new one
    if (!autofisher.target || usedFish.has(autofisher.target)) {
      let nearest = null;
      let minDist = Infinity;

      for (const spot of fishSpots) {
        if (usedFish.has(spot)) continue;

        const dx = spot.x - autofisher.x;
        const dy = spot.y - autofisher.y;
        const dist = Math.hypot(dx, dy);

        if (dist < minDist) {
          minDist = dist;
          nearest = spot;
        }
      }

      autofisher.target = nearest;
    }

    const target = autofisher.target;
    if (!target) continue;

    usedFish.add(target); // Claim this ripple so others don't use it

    const dx = target.x - autofisher.x;
    const dy = target.y - autofisher.y;
    const angleToTarget = Math.atan2(dy, dx);
    let dist = Math.hypot(dx, dy);

    // Rotate toward target
    const angleDiff = ((angleToTarget - autofisher.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    if (angleDiff < -0.01) autofisher.angle -= autofisher.turnSpeed;
    else if (angleDiff > 0.01) autofisher.angle += autofisher.turnSpeed;

    // Clamp angle
    if (autofisher.angle > Math.PI) autofisher.angle -= Math.PI * 2;
    if (autofisher.angle < -Math.PI) autofisher.angle += Math.PI * 2;

    // Accelerate
    if (Math.abs(angleDiff) < 0.3) {
      autofisher.speed = Math.min(autofisher.speed + autofisher.acceleration, autofisher.maxSpeed);
    } else {
      autofisher.speed = Math.max(0, autofisher.speed - autofisher.friction);
    }

    // Move
    autofisher.x += Math.cos(autofisher.angle) * autofisher.speed;
    autofisher.y += Math.sin(autofisher.angle) * autofisher.speed;

    // Wrap around screen
    if (autofisher.x < 0) autofisher.x = canvas.width;
    if (autofisher.x > canvas.width) autofisher.x = 0;
    if (autofisher.y < 0) autofisher.y = canvas.height;
    if (autofisher.y > canvas.height) autofisher.y = 0;

    // Ripple fishing logic
    if (dist < rippleRadius) {
      autofisher.holding = true;
      autofisher.holdTime += 16.67;

      if (autofisher.holdTime >= timeToCatch) {
        rollFish();

        // Replace caught fish
        let newFish;
        let attempts = 0;
        do {
          newFish = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            rippleSize: 0,
          };
          attempts++;
        } while (
          fishSpots.some(f => Math.hypot(f.x - newFish.x, f.y - newFish.y) < minDistanceBetweenFish)
          && attempts < 100
        );

        const index = fishSpots.indexOf(target);
        fishSpots[index] = newFish;
        autofisher.holding = false;
        autofisher.holdTime = 0;
        autofisher.target = null; // reset target after catch
      }
    } else {
      autofisher.holding = false;
      autofisher.holdTime = 0;
    }
  }
}

const rippleRadius = 50;
const minDistanceBetweenFish = rippleRadius * 2.5;

function generateFishSpots(count) {
  const spots = [];
  const padding = 75;
  while (spots.length < count) {
    const candidate = {
      x: padding + Math.random() * (canvas.width - 2 * padding),
      y: padding + Math.random() * (canvas.height - 2 * padding),
      rippleSize: 0,

    };


    const tooClose = spots.some(fish =>
      Math.hypot(fish.x - candidate.x, fish.y - candidate.y) < minDistanceBetweenFish
    );

    if (!tooClose) spots.push(candidate);
  }

  return spots;
}


let fishMax = 1;
let fishSpots = generateFishSpots(fishMax);

const keys = {};

let isHolding = false;
let holdTime = 0;
let timeToCatch = 10000;

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function update() {
  updateAutofishers();

  const speedMultiplier = keys["shift"] ? 2 : 1;

  // Accelerate / decelerate
  if (keys["w"]) {
    diamond.speed = Math.min(diamond.speed + diamond.acceleration * speedMultiplier, diamond.maxSpeed * speedMultiplier);
  } else if (keys["s"]) {
    diamond.speed = Math.max(diamond.speed - diamond.acceleration * speedMultiplier, -diamond.maxSpeed * speedMultiplier);
  } else {
    // Friction slows down speed toward 0
    if (diamond.speed > 0) diamond.speed = Math.max(0, diamond.speed - diamond.friction);
    else if (diamond.speed < 0) diamond.speed = Math.min(0, diamond.speed + diamond.friction);
  }

  // Turn only when moving
  if (diamond.speed !== 0) {
    if (keys["a"]) diamond.angle -= diamond.turnSpeed;
    if (keys["d"]) diamond.angle += diamond.turnSpeed;
  }

  // Update position
  diamond.x += Math.cos(diamond.angle) * diamond.speed;
  diamond.y += Math.sin(diamond.angle) * diamond.speed;

  // Screen wrap
  if (diamond.x < 0) diamond.x = canvas.width;
  else if (diamond.x > canvas.width) diamond.x = 0;
  if (diamond.y < 0) diamond.y = canvas.height;
  else if (diamond.y > canvas.height) diamond.y = 0;

  // Record position for trail
  trail.push({ x: diamond.x, y: diamond.y, angle: diamond.angle });
  if (trail.length > maxTrailLength) trail.shift();

if (keys[" "]) {
  // Only try to fish if space is held
  let inRipple = false;

  for (const fish of fishSpots) {
    const dx = diamond.x - fish.x;
    const dy = diamond.y - fish.y;
    const distance = Math.hypot(dx, dy);

    if (distance < rippleRadius) {
      inRipple = true;

      if (!isHolding) {
        isHolding = true;
        holdTime = 0;
      }

      holdTime += 16.67; // ~60fps

      if (holdTime >= timeToCatch) {
        rollFish();

        // Replace caught fish
        let newFish;
        let attempts = 0;
        const padding = 50;

        do {
          newFish = {
            x: padding + Math.random() * (canvas.width - 2 * padding),
            y: padding + Math.random() * (canvas.height - 2 * padding),
            rippleSize: 0,
          };
          attempts++;
        } while (
          fishSpots.some(f => Math.hypot(f.x - newFish.x, f.y - newFish.y) < minDistanceBetweenFish) &&
          attempts < 100
        );

        fishSpots[fishSpots.indexOf(fish)] = newFish;

        isHolding = false;
        holdTime = 0;
      }

      break; // Found a ripple, stop checking
    }
  }

  if (!inRipple) {
    isHolding = false;
    holdTime = 0;
  }
} else {
  isHolding = false;
  holdTime = 0;
}


  if (keys["e"]) {
    if (menu_state === false) {
      document.getElementById("menu").classList.remove("hide");
      document.getElementById("menu").classList.add("show");
      setTimeout(function () { menu_state = true; }, 300);
    } else {
      document.getElementById("menu").classList.remove("show");
      document.getElementById("menu").classList.add("hide");
      setTimeout(function () { menu_state = false; }, 300);
    }
  }
}

const holdBarContainer = document.getElementById("holdBarContainer");
const holdBar = document.getElementById("holdBar");

function updateHoldBar() {
  if (isHolding) {
    holdBarContainer.style.display = "block";
    const percent = Math.min((holdTime / timeToCatch) * 100, 100);
    holdBar.style.width = `${percent}%`;
  } else {
    holdBarContainer.style.display = "none";
    holdBar.style.width = `0%`;
  }
}


function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    const { x, y, angle } = trail[i];
    const opacity = ((i + 1) / trail.length) * 0.5;

    const width = diamond.size * 0.5;
    const height = diamond.size * 0.2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-width, 0);
    ctx.lineTo(0, height * 0.5);
    ctx.lineTo(0, -height * 0.5);
    ctx.closePath();

    ctx.fillStyle = `rgba(243, 146, 131, ${opacity})`;
    ctx.fill();
    ctx.restore();
  }
}

function drawDiamond(x, y, size, angle, color = "rgba(243, 146, 131, 1)") {
  const width = size;
  const height = size * 0.5;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, -height);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, height);
  ctx.lineTo(-width, 0);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}



function drawRipples() {
  for (const fish of fishSpots) {
    fish.rippleSize += 0.3;
    if (fish.rippleSize > rippleRadius * 1.75) fish.rippleSize = 0;

    ctx.beginPath();
    ctx.arc(fish.x, fish.y, fish.rippleSize, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(243, 146, 131, ${1 - fish.rippleSize / rippleRadius})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

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

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

function start() {
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("menu").classList.add("hide");

  start_state = true;
  localStorage.setItem("start_state", JSON.stringify(start_state)); // string "true"

  const savedCatchCount = localStorage.getItem("catchCount");
  catchCount = savedCatchCount ? parseInt(savedCatchCount) : 0;
  document.getElementById("catchCount").innerHTML = `Fish Caught: ${catchCount}`;

  loop();
}

let start_state = localStorage.getItem("start_state");
start_state = start_state ? JSON.parse(start_state) : false;


window.onload = function () {
  if (start_state === true) {
    start();
  } else {
    document.getElementById("menu").classList.remove("hide");
    document.getElementById("menu").classList.add("show");
    setTimeout(function () { menu_state = true; }, 300);
  }

  loadFishdex();
}

//autofishers.push(createAutofisher());