// Initialize Three.js background
const initBackground = () => {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 5000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x0088ff, size: 2, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;
        renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize 3D Journal Background
const initJournalBackground = () => {
    const canvas = document.getElementById('journal-background');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 30;

    // Create abstract geometric shapes
    const shapes = [];
    const totalShapes = 50;

    for (let i = 0; i < totalShapes; i++) {
        let geometry;
        const random = Math.random();

        if (random < 0.33) {
            geometry = new THREE.IcosahedronGeometry(Math.random() * 2 + 1);
        } else if (random < 0.66) {
            geometry = new THREE.OctahedronGeometry(Math.random() * 2 + 1);
        } else {
            geometry = new THREE.TetrahedronGeometry(Math.random() * 2 + 1);
        }

        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(
                Math.random() * 0.2 + 0.8,
                Math.random() * 0.2 + 0.8,
                Math.random() * 0.2 + 0.8
            ),
            transparent: true,
            opacity: 0.7,
            flatShading: true
        });

        const shape = new THREE.Mesh(geometry, material);

        // Random position
        shape.position.x = Math.random() * 60 - 30;
        shape.position.y = Math.random() * 60 - 30;
        shape.position.z = Math.random() * 30 - 15;

        // Random rotation
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;

        // Add animation properties
        shape.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.02,
            floatOffset: Math.random() * Math.PI * 2
        };

        shapes.push(shape);
        scene.add(shape);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x447799, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    // Animation loop
    let time = 0;
    const animate = () => {
        requestAnimationFrame(animate);

        time += 0.01;

        shapes.forEach(shape => {
            // Rotate
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Float up and down
            shape.position.y += Math.sin(time + shape.userData.floatOffset) * shape.userData.floatSpeed;
        });

        // Rotate camera slightly
        camera.position.x = Math.sin(time * 0.2) * 5;
        camera.position.y = Math.cos(time * 0.2) * 5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handle mouse movement for parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

        shapes.forEach(shape => {
            shape.position.x += mouseX * 0.01;
            shape.position.y += mouseY * 0.01;
        });
    });
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background
    initBackground();

    // Initialize journal background
    initJournalBackground();

    // 3D card effect for team members
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Enhanced award animations
    const awards = document.querySelectorAll('.award-block_one-inner');
    awards.forEach(award => {
        // Add glow element
        const glow = document.createElement('div');
        glow.className = 'award-glow';
        award.appendChild(glow);

        // Add floating animation with random delay
        award.style.animationDelay = `${Math.random() * 2}s`;
        award.classList.add('float');

        // Add 3D tilt effect
        award.addEventListener('mousemove', (e) => {
            const rect = award.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((centerX - x) / centerX) * 15;

            award.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
                scale3d(1.05, 1.05, 1.05)
            `;

            // Dynamic shadow and glow based on mouse position
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            award.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(52, 152, 219, 0.5),
                0 0 40px rgba(52, 152, 219, 0.3)
            `;

            // Update glow position
            const glowX = ((x - centerX) / rect.width) * 100;
            const glowY = ((y - centerY) / rect.height) * 100;
            glow.style.background = `
                radial-gradient(
                    circle at ${glowX}% ${glowY}%,
                    rgba(52, 152, 219, 0.4),
                    transparent 70%
                )
            `;
        });

        // Smooth reset on mouse leave
        award.addEventListener('mouseleave', () => {
            award.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
            award.style.boxShadow = 'none';
            glow.style.background = '';
        });

        // Add click animation
        award.addEventListener('click', () => {
            award.style.transform = 'perspective(1000px) scale3d(0.95, 0.95, 0.95)';
            setTimeout(() => {
                award.style.transform = 'perspective(1000px) scale3d(1, 1, 1)';
            }, 150);
        });
    });

    // Animate counters
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / duration * 10;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current = Math.min(current + step, target);
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.odometer');
                if (counter) animateCounter(counter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.animate-counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Animate titles on scroll
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.animate-title, .animate-text').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.6s ease';
        titleObserver.observe(title);
    });

    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.image-layer').forEach(bg => {
            bg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });

    // Testimonial Carousel
    const initTestimonialCarousel = () => {
        const carousel = document.querySelector('.testimonial-carousel');
        if (!carousel) return;

        const items = carousel.querySelectorAll('.testimonial-item');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.nav-prev');
        const nextBtn = carousel.querySelector('.nav-next');
        let currentIndex = 0;
        let isAnimating = false;

        const updateCarousel = (newIndex) => {
            if (isAnimating) return;
            isAnimating = true;

            // Remove active class from current item and dot
            items[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            // Update index
            currentIndex = newIndex;
            if (currentIndex >= items.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = items.length - 1;

            // Add active class to new item and dot
            items[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');

            // Reset animation flag
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        };

        // Add click handlers for navigation
        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
        });

        // Add click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentIndex) {
                    updateCarousel(index);
                }
            });
        });

        // Auto-advance carousel
        let autoplayInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000);

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                updateCarousel(currentIndex + 1);
            }, 5000);
        });

        // Add touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left
                    updateCarousel(currentIndex + 1);
                } else {
                    // Swipe right
                    updateCarousel(currentIndex - 1);
                }
            }
        };
    };

    // Initialize testimonial carousel
    initTestimonialCarousel();
});
