let stars = [];
let particles = [];
let dustRing = [];
const STAR_COUNT = 30;
const PARTICLE_COUNT = 600;
const DUST_COUNT = 600;
const RING_OPACITY = 120;
const RING_WEIGHT = 0.6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Gera estrelas sutis com leve cor
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5 * (windowWidth / 800), 1.5 * (windowWidth / 800)),
      brightness: random(200, 255),
      twinkleSpeed: random(0.03, 0.08),
      color: color(240, 240, 255, 150)
    });
  }

  // Gera partículas quase invisíveis para o efeito interno
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  // Gera partículas para o anel de poeira (estilo Interstellar)
  for (let i = 0; i < DUST_COUNT; i++) {
    dustRing.push(createDustParticle());
  }

  // Optional: Request full-screen mode (user may need to confirm)
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
}

function createParticle() {
  const angle = random(TWO_PI);
  const distance = random(150 * (windowWidth / 800), 200 * (windowWidth / 800));
  return {
    x: distance * cos(angle),
    y: distance * sin(angle),
    size: random(0.3 * (windowWidth / 800), 0.8 * (windowWidth / 800)),
    angle: angle,
    speed: random(0.3, 0.8),
    spiralFactor: random(0.003, 0.01),
    opacity: random(10, 30)
  };
}

function createDustParticle() {
  const angle = random(TWO_PI);
  const distance = random(250 * (windowWidth / 800), 350 * (windowWidth / 800));
  return {
    x: distance * cos(angle),
    y: distance * sin(angle),
    size: random(0.5 * (windowWidth / 800), 2 * (windowWidth / 800)),
    angle: angle,
    speed: random(0.2, 0.6),
    opacity: random(20, 60),
    color: color(200, 200, 220, random(10, 30))
  };
}

function draw() {
  background(0);
  for (let y = 0; y < height; y += 10 * (windowHeight / 600)) {
    let alpha = map(y, 0, height, 0, 10);
    stroke(0, 0, 20, alpha);
    line(0, y, width, y);
  }

  drawStars();

  translate(width / 2, height / 2);

  noStroke();
  fill(0);
  ellipse(0, 0, 200 * (windowWidth / 800), 200 * (windowWidth / 800));

  stroke(10, 10, 20, 30);
  strokeWeight(0.5 * (windowWidth / 800));
  noFill();
  ellipse(0, 0, 200 * (windowWidth / 800), 200 * (windowWidth / 800));

  noFill();
  stroke(255, RING_OPACITY);
  strokeWeight(RING_WEIGHT * (windowWidth / 800));
  rotate(frameCount * 0.6);
  arc(0, 0, 220 * (windowWidth / 800), 220 * (windowWidth / 800), 0, 180, OPEN);

  stroke(255, RING_OPACITY / 2);
  strokeWeight((RING_WEIGHT + 2) * (windowWidth / 800));
  arc(0, 0, 222 * (windowWidth / 800), 222 * (windowWidth / 800), 0, 180, OPEN);

  drawDustRing();
  updateAndDrawParticles();
}

function drawStars() {
  noStroke();
  for (let star of stars) {
    let twinkle = sin(frameCount * star.twinkleSpeed) * 15 + star.brightness;
    fill(star.color, twinkle);
    ellipse(star.x, star.y, star.size, star.size);
  }
}

function updateAndDrawParticles() {
  noStroke();
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.angle += p.speed * 0.01;
    let distance = 200 * (windowWidth / 800) + sin(frameCount * 0.03 + p.angle) * 5 * (windowWidth / 800);
    p.x = distance * cos(p.angle + frameCount * p.spiralFactor);
    p.y = distance * sin(p.angle + frameCount * p.spiralFactor);

    let particlePulse = sin(frameCount * 0.1 + i) * 5 + p.opacity;
    fill(255, particlePulse);
    ellipse(p.x, p.y, p.size, p.size);
  }
}

function drawDustRing() {
  noStroke();
  for (let dust of dustRing) {
    dust.angle += dust.speed * 0.01;
    let distance = 300 * (windowWidth / 800) + sin(frameCount * 0.02 + dust.angle) * 20 * (windowWidth / 800);
    dust.x = distance * cos(dust.angle);
    dust.y = distance * sin(dust.angle);

    fill(dust.color);
    ellipse(dust.x, dust.y, dust.size, dust.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}