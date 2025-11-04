// ========================================
// DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    setActiveNav();
    initSmoothScroll();
    initLazyVideos();
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (!menuToggle || !navUl) return;

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
            }
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navUl.classList.remove('show');
        }
    });
}

// ========================================
// SET ACTIVE NAV LINK
// ========================================
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// LAZY LOAD VIDEOS
// ========================================
function initLazyVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.setAttribute('loading', 'lazy');
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });
    });
}

// ========================================
// SCROLL ANIMATIONS (OPTIONAL ENHANCEMENT)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.card, .link-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is ready
if ('IntersectionObserver' in window) {
    initScrollAnimations();
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================
if ('serviceWorker' in navigator) {
    // Register service worker for offline support (optional)
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed
        });
    });
}