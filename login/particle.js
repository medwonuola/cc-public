const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  generateParticles(mouseX, mouseY);
});

function generateParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    const particle = {
      x,
      y,
      velocityX: (Math.random() - 0.5) * 5,
      velocityY: (Math.random() - 0.5) * 5,
      color: `rgba(255, 255, 255, 1)`,
      size: Math.random() * 1 + 1,
      createdAt: Date.now(),
    };
    particles.push(particle);
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const timeElapsed = Date.now() - particle.createdAt;
    const alpha = 1 - timeElapsed / 5000;

    if (alpha <= 0) {
      particles.splice(i, 1);
      i--;
      continue;
    }

    // particle.color = `rgba(255, 255, 255, ${alpha})`;
    particle.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    }, ${alpha})`;

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();
