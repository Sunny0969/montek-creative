document.addEventListener('DOMContentLoaded', function() {
    const serviceIcons = document.querySelectorAll('.service-block_one-icon');

    serviceIcons.forEach(icon => {
        icon.addEventListener('mousemove', function(e) {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            icon.querySelector('img').style.transform = 
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });

        icon.addEventListener('mouseleave', function() {
            icon.querySelector('img').style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});
