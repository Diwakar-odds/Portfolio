/* ====================================
   ADVANCED ANIMATIONS & INTERACTIONS
   ==================================== */

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initCustomCursor();
    initParticleSystem();
    initStatsCounters();
    init3DTilt();
    initMagneticButtons();
    initRippleEffect();
    initScrollEffects();
    initNavbarAutoHide();
    addShimmerEffects();
});

// ====================================
// PAGE LOADER
// ====================================

function initPageLoader() {
    // Generate floating stars
    const starsContainer = document.querySelector('.loader-stars');
    if (starsContainer) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Minimum display time + smooth exit
    const startTime = Date.now();
    const minimumDisplayTime = 2000; // 2 seconds

    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, minimumDisplayTime - elapsed);

            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 800); // Wait for fade-out animation
            }, remainingTime);
        }
    });
}

// ====================================
// CUSTOM CURSOR
// ====================================

function initCustomCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .btn, input, textarea');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });

    let lastParticleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastParticleTime > 50) {
            createCursorParticle(e.clientX, e.clientY);
            lastParticleTime = now;
        }
    });
}

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('cursor-particle');
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Increased drift distance for more visible movement
    const tx = (Math.random() - 0.5) * 100;
    const ty = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
}

// ====================================
// PARTICLE SYSTEM
// ====================================

function initParticleSystem() {
    const container = document.getElementById('particleContainer');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 30 : 60;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 5;

    particle.style.setProperty('--duration', duration + 's');
    particle.style.setProperty('--delay', delay + 's');

    const tx = (Math.random() - 0.5) * 400;
    const ty = (Math.random() - 0.5) * 400;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    container.appendChild(particle);

    particle.addEventListener('animationiteration', () => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
}

// ====================================
// STATS COUNTER ANIMATION
// ====================================

function initStatsCounters() {
    const stats = document.querySelectorAll('.stat-value, .stat-number, .journey-stat .stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/\D/g, ''));

    if (isNaN(number)) return;

    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    let step = 0;

    element.classList.add('counting');

    const timer = setInterval(() => {
        current += increment;
        step++;

        if (step >= steps) {
            element.textContent = number + (hasPlus ? '+' : '');
            clearInterval(timer);
            element.classList.remove('counting');
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, duration / steps);
}

// ====================================
// 3D TILT EFFECT
// ====================================

function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .journey-card, .education-card, .passion-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// ====================================
// MAGNETIC BUTTON EFFECT
// ====================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .filter-btn');

    buttons.forEach(button => {
        button.classList.add('magnetic');

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;

            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ====================================
// RIPPLE EFFECT
// ====================================

function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .filter-btn, .project-card, .badge-pill, .tech-badge');

    rippleElements.forEach(el => {
        el.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ====================================
// ENHANCED SCROLL EFFECTS
// ====================================

function initScrollEffects() {
    const profilePhoto = document.querySelector('.profile-photo-container');
    const floatingIcons = document.querySelectorAll('.floating-icon');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (profilePhoto) {
            profilePhoto.style.transform = `translateY(${scrolled * 0.1}px)`;
        }

        floatingIcons.forEach((icon, index) => {
            const speed = 0.05 + (index * 0.02);
            icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ====================================
// NAVBAR AUTO-HIDE
// ====================================

function initNavbarAutoHide() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    }
}

// ====================================
// ADD SHIMMER EFFECTS
// ====================================

function addShimmerEffects() {
    const cards = document.querySelectorAll('.project-card, .journey-card, .education-card, .passion-card, .tech-stack-card');

    cards.forEach(card => {
        card.classList.add('shimmer-effect');
    });
}

// ====================================
// FORM VALIDATION SHAKE
// ====================================

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

if (typeof window !== 'undefined') {
    window.shakeElement = shakeElement;
}

// ====================================
// ENHANCED REVEAL ANIMATION
// ====================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ====================================
// LOGO PULSE ANIMATION
// ====================================

const logo = document.querySelector('.nav-logo a');
if (logo) {
    setInterval(() => {
        logo.style.animation = 'none';
        setTimeout(() => {
            logo.style.animation = 'scalePulse 0.5s ease';
        }, 10);
    }, 5000);
}

// ====================================
// BADGE STAGGER ANIMATION
// ====================================

const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.05}s`;
});

const passionBadges = document.querySelectorAll('.badge-pill');
passionBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${0.3 + index * 0.1}s`;
});

// ====================================
// SCROLL TO EXPLORE CLICK
// ====================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

console.log('��� Advanced animations loaded successfully!');
