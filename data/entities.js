// 🌈 Holds all live entities
let entities = {
	player: null,
	autofishers: [],
	ripples: []
};

// 🧠 Entity Blueprints (Factories)
const entityTypes = {
	player(data = {}) {
		return {
			x: data.x ?? canvas.width / 2,
			y: data.y ?? canvas.height / 2,
			angle: 0,
			size: 25,
			speed: 0,
			maxSpeed: 1.25,
			acceleration: 0.015,
			friction: 0.0175,
			turnSpeed: 0.025,
			speedMult: 1,
			holding: false,
			holdTime: 0,
			timeToCatch: (5 - (upgradeStats[states.ponds.currentPond].values.speed / 2)) * 1000,
			catchCount: 0,
			target: null,
			trailMax: 40,
			trail: [],

			update(deltaTime) {
				this.speedMult = keys["shift"] ? 2 : 1;

				const accel = this.acceleration * this.speedMult;
				const max = this.maxSpeed * this.speedMult;

				// Speed
				if (keys["w"]) { this.speed = Math.min(this.speed + accel, max); } //forward
				else if (keys["s"]) { this.speed = Math.max(this.speed - accel, -max); } //backward

				else {
					const friction = Math.min(Math.abs(this.speed), this.friction);
					this.speed -= Math.sign(this.speed) * friction;
				}

				// Turning
				if (this.speed !== 0) {
					if (keys["a"]) this.angle -= this.turnSpeed;
					if (keys["d"]) this.angle += this.turnSpeed;
				}

				// Movement
				const cos = Math.cos(this.angle);
				const sin = Math.sin(this.angle);
				this.x = (this.x + cos * this.speed + canvas.width) % canvas.width;
				this.y = (this.y + sin * this.speed + canvas.height) % canvas.height;

				// Trail
				this.trail.push({ x: this.x, y: this.y, angle: this.angle });
				if (this.trail.length > this.trailMax) this.trail.shift();

				// --- Fishing Catch Logic --- //
				if (keys[" "]) {
					let inRipple = false;
					let caughtRippleIndex = -1;

					for (let i = 0; i < entities.ripples.length; i++) {
						const ripple = entities.ripples[i];
						const dx = this.x - ripple.x;
						const dy = this.y - ripple.y;
						const distance = Math.hypot(dx, dy);

						if (distance < ripple.radius) {
							inRipple = true;

							if (!this.holding) {
								this.holding = true;
								this.holdTime = 0;
							}

							this.holdTime += deltaTime;

							if (this.holdTime >= this.timeToCatch) {
								catchLogic(ripple.fish);
								SoundManager.playFishSfx();
								save('inventory', inventory);

								caughtRippleIndex = i; // mark ripple to be replaced after loop

								this.holding = false;
								this.holdTime = 0;

								break; // stop checking after catch
							}

							break; // stop after first valid ripple found (even if not caught yet)
						}
					}

					// Replace the caught ripple safely outside the loop
					if (caughtRippleIndex !== -1) {
						const newRipple = entityTypes.ripple({ fish: getRandomFish() });
						entities.ripples.splice(caughtRippleIndex, 1, newRipple);
					}

					if (!inRipple) {
						this.holding = false;
						this.holdTime = 0;
					}
				} else {
					this.holding = false;
					this.holdTime = 0;
				}

				// inside player.update:
				if (keys["f"]) {
					if (!fKeyPressed) {
						fKeyPressed = true;

						const docked = entities.autofishers.filter(a => a.mode === "docked");
						const last = docked[docked.length - 1];
						if (last) {
							const untargetedRipples = entities.ripples.filter(r =>
								!entities.autofishers.some(a => a.targetRipple === r)
							);

							let closest = null;
							let minDist = Infinity;

							for (const ripple of untargetedRipples) {
								const dist = Math.hypot(ripple.x - last.x, ripple.y - last.y);
								if (dist < minDist) {
									closest = ripple;
									minDist = dist;
								}
							}

							if (closest) {
								last.targetRipple = closest;
								last.mode = "fishing";
							}
						}
					}
				} else {
					fKeyPressed = false;
				}
			},

			draw() {

				const rgb = pondColors[states.ponds.currentPond];
				// Draw trail
				for (let i = 0; i < this.trail.length; i++) {
					const { x, y, angle } = this.trail[i];
					const opacity = ((i + 1) / this.trail.length) * 0.5;

					const width = this.size * 0.5;
					const height = this.size * 0.2;

					ctx.save();
					ctx.translate(x, y);
					ctx.rotate(angle);

					ctx.beginPath();
					ctx.moveTo(-width, 0);
					ctx.lineTo(0, height * 0.5);
					ctx.lineTo(0, -height * 0.5);
					ctx.closePath();


					ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
					ctx.fill();
					ctx.restore();
				}

				// Draw diamond
				const width = this.size;
				const height = this.size * 0.5;

				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.angle);
				ctx.beginPath();
				ctx.moveTo(0, -height);
				ctx.lineTo(width, 0);
				ctx.lineTo(0, height);
				ctx.lineTo(-width, 0);
				ctx.closePath();

				ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
				ctx.fill();
				ctx.restore();
			}
		};
	},

	ripple(data = {}) {
		const padding = 80;
		const radius = 50;

		const x = data.x ?? (padding + Math.random() * (canvas.width - 2 * padding));
		const y = data.y ?? (padding + Math.random() * (canvas.height - 2 * padding));
		const fish = data.fish ?? { rarity: "common" };

		return {
			x,
			y,
			radius,
			size: Math.random() * (radius * 1.75),
			padding,
			fish,

			update(deltaTime) {
				this.size += 0.3;
				if (this.size > this.radius * 1.75) this.size = 0;
			},

			draw() {
				const alpha = 1 - (this.size / this.radius);
				const [r, g, b] = rarityInfo[this.fish.rarity]?.color || [160, 216, 239];

				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}
		};
	},

	autofisher(data = {}) {
		return {
			x: data.x ?? Math.random() * canvas.width,
			y: data.y ?? Math.random() * canvas.height,
			angle: 0,
			size: 25,
			speed: 0,
			maxSpeed: 1.25,
			acceleration: 0.015,
			friction: 0.0175,
			turnSpeed: 0.02,
			holding: false,
			holdTime: 0,
			targetRipple: null,
			trail: [],
			trailMax: 20,
			timeToCatch: (10 - upgradeStats[states.ponds.currentPond].values.speed) * 1000,

			update(deltaTime) {
				// Find closest untargeted ripple if no target or target invalid
				if (
					!this.targetRipple ||
					!entities.ripples.includes(this.targetRipple)
				) {
					let closest = null;
					let minDist = Infinity;

					// To avoid multiple autofishers targeting same ripple,
					// find ripples not currently targeted by others
					const targetedRipples = new Set(
						entities.autofishers
							.filter(f => f !== this && f.targetRipple)
							.map(f => f.targetRipple)
					);

					for (const ripple of entities.ripples) {
						if (targetedRipples.has(ripple)) continue;

						const dx = ripple.x - this.x;
						const dy = ripple.y - this.y;
						const dist = Math.hypot(dx, dy);

						if (dist < minDist) {
							minDist = dist;
							closest = ripple;
						}
					}

					this.targetRipple = closest;
					this.holdTime = 0;
					this.holding = false;
				}

				// If no ripples to target, just slow to stop
				if (!this.targetRipple) {
					this.speed = Math.max(this.speed - this.friction, 0);
					this.x = (this.x + Math.cos(this.angle) * this.speed + canvas.width) % canvas.width;
					this.y = (this.y + Math.sin(this.angle) * this.speed + canvas.height) % canvas.height;
					return;
				}

				// Move smoothly toward targetRipple
				const dxWrapped = (this.targetRipple.x - this.x + canvas.width) % canvas.width;
				const dyWrapped = (this.targetRipple.y - this.y + canvas.height) % canvas.height;

				// Adjust for wraparound
				const dx = dxWrapped > canvas.width / 2 ? dxWrapped - canvas.width : dxWrapped;
				const dy = dyWrapped > canvas.height / 2 ? dyWrapped - canvas.height : dyWrapped;

				const distance = Math.hypot(dx, dy);
				const desiredAngle = Math.atan2(dy, dx);

				let angleDiff = desiredAngle - this.angle;
				angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

				if (angleDiff < -0.01) this.angle -= this.turnSpeed;
				else if (angleDiff > 0.01) this.angle += this.turnSpeed;

				// Wrap angle between -PI and PI
				if (this.angle > Math.PI) this.angle -= Math.PI * 2;
				if (this.angle < -Math.PI) this.angle += Math.PI * 2;

				// Accelerate if roughly facing target, else slow down
				if (Math.abs(angleDiff) < 0.3) {
					this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
				} else {
					this.speed = Math.max(this.speed - this.friction, 0);
				}

				// Move position
				this.x = (this.x + Math.cos(this.angle) * this.speed + canvas.width) % canvas.width;
				this.y = (this.y + Math.sin(this.angle) * this.speed + canvas.height) % canvas.height;

				// Trail logic
				this.trail.push({ x: this.x, y: this.y, angle: this.angle });
				if (this.trail.length > this.trailMax) this.trail.shift();

				// Fishing logic when inside ripple radius
				if (distance < this.targetRipple.radius) {
					if (!this.holding) {
						this.holding = true;
						this.holdTime = 0;
					}
					this.holdTime += deltaTime;

					if (this.holdTime >= this.timeToCatch) {
						const caughtFish = this.targetRipple.fish;
						if (caughtFish.rarity !== "Item") {
							caughtFish.caught = (caughtFish.caught || 0) + 1;
							// Optional: Update global catch count, if you want
						}

						catchLogic(caughtFish);
						save('inventory', inventory);

						const rippleIndex = entities.ripples.indexOf(this.targetRipple);
						if (rippleIndex !== -1) {
							entities.ripples.splice(rippleIndex, 1, entityTypes.ripple({ fish: getRandomFish() }));
						}

						// Reset target to find new ripple next update
						this.targetRipple = null;
						this.holding = false;
						this.holdTime = 0;
					}
				} else {
					this.holding = false;
					this.holdTime = 0;
				}
			},

			draw() {
				const rgb = fisherColors[states.ponds.currentPond];
				// Draw trail
				for (let i = 0; i < this.trail.length; i++) {
					const { x, y, angle } = this.trail[i];
					const opacity = ((i + 1) / this.trail.length) * 0.35;

					const width = this.size * 0.4;
					const height = this.size * 0.15;

					ctx.save();
					ctx.translate(x, y);
					ctx.rotate(angle);

					ctx.beginPath();
					ctx.moveTo(-width, 0);
					ctx.lineTo(0, height * 0.5);
					ctx.lineTo(0, -height * 0.5);
					ctx.closePath();

					ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
					ctx.fill();
					ctx.restore();
				}

				// Draw diamond
				const width = this.size * 0.8;
				const height = this.size * 0.4;

				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.angle);

				ctx.beginPath();
				ctx.moveTo(0, -height);
				ctx.lineTo(width, 0);
				ctx.lineTo(0, height);
				ctx.lineTo(-width, 0);
				ctx.closePath();

				ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;

				ctx.fill();
				ctx.restore();
			}
		};
	}
};

