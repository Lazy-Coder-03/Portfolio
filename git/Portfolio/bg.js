let particles = [];
let numParticles =500;
let backgroundColor;
let maxHistory = 5;
let fadeAmount = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(0);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // Gradually fade the background to remove trails
  background(backgroundColor, fadeAmount);

  let attractor = createVector(mouseX, mouseY);
  for (let particle of particles) {
    let force = p5.Vector.sub(attractor, particle.pos);
    let distance = force.mag();
    distance = constrain(distance, 5, 200);
    let strength = 0.1;
    force.setMag(strength);
    particle.applyForce(force);
    particle.update();
    particle.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(2, 5));
    this.acc = createVector();
    this.size = random(2, 10);
    this.color = color(random(255), random(255), random(255), random(100, 150));
    this.lifespan = random(1, 1500);
    this.history = [];
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Store position in history
    this.history.push(this.pos.copy());

    // Limit history to maxHistory frames
    if (this.history.length > maxHistory) {
      this.history.splice(0, 1);
    }

    // Decrease lifespan
    this.lifespan--;
    this.wrapAround();
    // Reset the particle if it reaches its lifespan
    if (this.lifespan <= 0) {
      this.pos.set(random(width), random(height));
      this.vel = p5.Vector.random2D().mult(random(2, 5));
      this.color = color(random(255), random(255), random(255), random(100, 150));
      this.lifespan = random(1, 1500);
      this.history = [];
    }
  }

  display() {
    noStroke();
    //stroke(25)
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);

    // Display particle trail
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let alpha = map(i, 0, this.history.length, 0, 255);
      fill(red(this.color), green(this.color), blue(this.color), alpha);
      ellipse(pos.x, pos.y, this.size);
    }
  }

  wrapAround(){
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

}

