// Modern Futuristic Particles Animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match parent container
    function resizeCanvas() {
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (heroImage) {
            canvas.width = heroImage.offsetWidth;
            canvas.height = heroImage.offsetHeight;
        }
    }
    
    // Call resize on load and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class with enhanced properties for futuristic look
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.5; // Smaller particles for modern look
            this.baseSize = this.size;
            this.speedX = Math.random() * 0.7 - 0.35;
            this.speedY = Math.random() * 0.7 - 0.35;
            this.opacity = Math.random() * 0.7 + 0.3;
            // Random particle type for variety
            this.type = Math.random() > 0.7 ? 'circle' : (Math.random() > 0.5 ? 'square' : 'triangle');
            // Pulse effect
            this.pulse = Math.random() * 0.04 + 0.02;
            this.pulseDirection = 1;
            this.pulseCount = 0;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges with slight randomization for more natural movement
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
                this.speedX += (Math.random() * 0.2 - 0.1);
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
                this.speedY += (Math.random() * 0.2 - 0.1);
            }
            
            // Pulsing size effect
            this.pulseCount += this.pulse * this.pulseDirection;
            if (this.pulseCount > 1 || this.pulseCount < 0) {
                this.pulseDirection *= -1;
            }
            
            this.size = this.baseSize * (1 + this.pulseCount * 0.3);
        }
        
        draw() {
            // White particles with slight glow effect
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            
            if (this.type === 'circle') {
                // Circle particles
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.type === 'square') {
                // Square particles for variety
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            } else {
                // Triangle particles
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.size);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.lineTo(this.x - this.size, this.y + this.size);
                ctx.closePath();
                ctx.fill();
            }
            
            // Reset shadow for performance
            ctx.shadowBlur = 0;
        }
    }
    
    // Create particles array
    const particles = [];
    const particleCount = 60; // More particles for richer effect
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connect particles with lines if they're close enough
    function connectParticles() {
        const maxDistance = 120; // Increased connection distance
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Create gradient line for more futuristic look
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y, 
                        particles[j].x, particles[j].y
                    );
                    
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 * (1 - distance/maxDistance)})`);
                    gradient.addColorStop(1, `rgba(201, 168, 122, ${0.5 * (1 - distance/maxDistance)})`);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Add floating geometric shapes for futuristic effect
    const geometricShapes = [];
    const shapeCount = 5;
    
    class GeometricShape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 30 + 20;
            this.opacity = Math.random() * 0.1 + 0.05;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            this.rotation = 0;
            this.rotationSpeed = Math.random() * 0.01 - 0.005;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Gold hexagon
            ctx.strokeStyle = `rgba(201, 168, 122, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const x = this.size * Math.cos(angle);
                const y = this.size * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    for (let i = 0; i < shapeCount; i++) {
        geometricShapes.push(new GeometricShape());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update geometric shapes first (background layer)
        for (let i = 0; i < geometricShapes.length; i++) {
            geometricShapes[i].update();
            geometricShapes[i].draw();
        }
        
        // Connect particles
        connectParticles();
        
        // Update and draw particles (foreground layer)
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
