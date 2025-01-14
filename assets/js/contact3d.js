// Initialize Three.js Scene
let scene, camera, renderer, particles;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('contact3DBackground'),
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#ff3366',
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 3;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse movement effect
    document.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    gsap.to(particles.rotation, {
        x: mouseY * 0.5,
        y: mouseX * 0.5,
        duration: 2
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Form animations
function initFormAnimations() {
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
    initFormAnimations();
});
