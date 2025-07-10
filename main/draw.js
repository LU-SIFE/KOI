const trail = [];
const maxTrailLength = 30; // length of the streamer

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

function drawDiamond(x, y, size, angle, color = "rgba(243, 146, 131, 1)", borderColor = "rgba(243, 146, 131, 0.4)", borderWidth = 4) {
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

  // Fill the shape
  ctx.fillStyle = color;
  ctx.fill();

  // Outline the shape
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

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
