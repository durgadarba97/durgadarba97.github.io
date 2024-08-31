class Boid {
    // (Boid class definition remains the same)
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
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
