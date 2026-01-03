// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingAnimation();
    initSmoothScroll();
    initScrollReveal();
    initProjectFiltering();
    initContactForm();
    initNavHighlight();
    loadProjects();
});

// ====================================
// THEME TOGGLE
// ====================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ====================================
// TYPING ANIMATION
// ====================================

function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    const roles = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Tech Enthusiast',
        'Creative Coder'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // When word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        }
        // When word is deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ====================================
// SMOOTH SCROLL
// ====================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// NAVIGATION HIGHLIGHT
// ====================================

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ====================================
// PROJECT FILTERING
// ====================================

function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ====================================
// LOAD PROJECTS
// ====================================

function loadProjects() {
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'webdev',
            description: 'A full-featured online shopping platform with cart, payment integration, and admin dashboard.',
            image: 'https://via.placeholder.com/400x200/a855f7/ffffff?text=E-Commerce+Platform',
            featured: true,
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            id: 2,
            title: 'Task Automation Bot',
            category: 'automation',
            description: 'Python bot that automates repetitive tasks, saving hours of manual work daily.',
            image: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Automation+Bot',
            featured: true,
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            id: 3,
            title: 'Portfolio Website',
            category: 'webdev',
            description: 'Modern, responsive portfolio with glassmorphism design and smooth animations.',
            image: 'https://via.placeholder.com/400x200/a855f7/ffffff?text=Portfolio+Website',
            featured: false,
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            id: 4,
            title: 'Weather Dashboard',
            category: 'webdev',
            description: 'Real-time weather data visualization with beautiful UI and forecast predictions.',
            image: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Weather+Dashboard',
            featured: false,
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            id: 5,
            title: 'Data Scraper',
            category: 'automation',
            description: 'Automated web scraper for gathering and organizing data from multiple sources.',
            image: 'https://via.placeholder.com/400x200/a855f7/ffffff?text=Data+Scraper',
            featured: false,
            liveUrl: '#',
            githubUrl: '#'
        },
        {
            id: 6,
            title: 'Social Media Manager',
            category: 'automation',
            description: 'Schedule and auto-post content across multiple social media platforms.',
            image: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Social+Manager',
            featured: false,
            liveUrl: '#',
            githubUrl: '#'
        }
    ];
    
    const projectsGrid = document.getElementById('projectsGrid');
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    // Re-initialize scroll reveal for new elements
    const newRevealElements = projectsGrid.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    newRevealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.setAttribute('data-category', project.category);
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-links">
                <a href="${project.liveUrl}" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="${project.githubUrl}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// ====================================
// CONTACT FORM
// ====================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate
        if (!validateForm(formData)) {
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

function validateForm(data) {
    // Basic validation
    if (!data.name || data.name.trim() === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!data.subject || data.subject.trim() === '') {
        alert('Please enter a subject');
        return false;
    }
    
    if (!data.message || data.message.trim() === '') {
        alert('Please enter your message');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ====================================
// FLOATING TECH ICONS ENHANCEMENT
// ====================================

// Add random floating variations to tech icons
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach((icon, index) => {
    const randomDelay = Math.random() * 3;
    const randomDuration = 3 + Math.random() * 2;
    
    icon.style.animationDelay = `${randomDelay}s`;
    icon.style.animationDuration = `${randomDuration}s`;
});

// ====================================
// NAVBAR BACKGROUND ON SCROLL
// ====================================

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 36, 0.9)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 36, 0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// ====================================
// UTILITY: Debounce Function
// ====================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events if needed
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);
