let particles = [];

function setup() {
    let n=2000;
    
    createCanvas(windowWidth, windowHeight);
    if(windowWidth<768) n=600;
    for (let i = 0; i < n; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0); // Set the background color (black)

    let attractor = createVector(mouseX, mouseY);
    for (let particle of particles) {
        let force = p5.Vector.sub(attractor, particle.pos);
        let distance = force.mag();
        // Adjusted minimum and maximum distance
        distance = constrain(distance, 5, 200); // Increase the maximum distance

        let strength = 0.05; // (1 / (distance * distance) )*10; // Increased attraction strength

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
        this.vel = createVector(); // p5.Vector.random2D().mult(random(2, 5)); // Random initial velocities
        this.acc = createVector();
        this.size = random(2, 10);
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(5); // Limit the particle's speed
        this.pos.add(this.vel);
        this.acc.mult(0);
        // if (this.pos.x < 0 || this.pos.x > width) {
        //     this.vel.x *= -1;
        // }
        // if (this.pos.y < 0 || this.pos.y > height) {
        //     this.vel.y *= -1;
        // }

        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.y < 0) this.pos.y = height;
        if(this.pos.y > height) this.pos.y = 0;
    }

    display() {
        noStroke();
        fill(this.r, this.g, this.b); // Particle color (white)
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
