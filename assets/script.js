class Boid {
    constructor(x, y) {
        this.position = { x: x, y: y };
        this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
        this.acceleration = { x: 0, y: 0 };
        this.maxSpeed = 2;
        this.maxForce = 0.03;
    }

    update() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity = this.limit(this.velocity, this.maxSpeed);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }

    applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    limit(vector, max) {
        const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        if (mag > max) {
            vector.x = (vector.x / mag) * max;
            vector.y = (vector.y / mag) * max;
        }
        return vector;
    }

    align(boids) {
        const perceptionRadius = 50;
        const steering = { x: 0, y: 0 };
        let total = 0;

        for (const other of boids) {
            const d = this.distance(other.position, this.position);
            if (other !== this && d < perceptionRadius) {
                steering.x += other.velocity.x;
                steering.y += other.velocity.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;
            steering = this.limit(steering, this.maxSpeed);
            steering.x -= this.velocity.x;
            steering.y -= this.velocity.y;
            steering = this.limit(steering, this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        const perceptionRadius = 50;
        const steering = { x: 0, y: 0 };
        let total = 0;

        for (const other of boids) {
            const d = this.distance(other.position, this.position);
            if (other !== this && d < perceptionRadius) {
                steering.x += other.position.x;
                steering.y += other.position.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;
            steering.x -= this.position.x;
            steering.y -= this.position.y;
            steering = this.limit(steering, this.maxSpeed);
            steering.x -= this.velocity.x;
            steering.y -= this.velocity.y;
            steering = this.limit(steering, this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        const perceptionRadius = 24;
        const steering = { x: 0, y: 0 };
        let total = 0;

        for (const other of boids) {
            const d = this.distance(other.position, this.position);
            if (other !== this && d < perceptionRadius) {
                const diff = { x: this.position.x - other.position.x, y: this.position.y - other.position.y };
                diff.x /= d;
                diff.y /= d;
                steering.x += diff.x;
                steering.y += diff.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;
            steering = this.limit(steering, this.maxSpeed);
            steering.x -= this.velocity.x;
            steering.y -= this.velocity.y;
            steering = this.limit(steering, this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        const alignment = this.align(boids);
        const cohesion = this.cohesion(boids);
        const separation = this.separation(boids);

        this.applyForce(alignment);
        this.applyForce(cohesion);
        this.applyForce(separation);
    }

    distance(v1, v2) {
        return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
    }

    edges(width, height) {
        if (this.position.x > width) this.position.x = 0;
        else if (this.position.x < 0) this.position.x = width;

        if (this.position.y > height) this.position.y = 0;
        else if (this.position.y < 0) this.position.y = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#FF4500";
        ctx.fill();
    }
}


// Canvas and animation setup
const canvas = document.getElementById('boidsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const boids = [];
for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    boids.push(new Boid(x, y));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const boid of boids) {
        boid.edges(canvas.width, canvas.height);
        boid.flock(boids);
        boid.update();
        boid.draw(ctx);
        console.log(boids); 
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
