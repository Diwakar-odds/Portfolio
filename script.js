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
    initMobileMenu();
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
// MOBILE MENU
// ====================================

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Open mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Close the menu
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';

            // Scroll to section
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                setTimeout(() => {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 300); // Wait for menu to close
            }
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
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
            title: 'YourDaddy AI Assistant',
            category: 'automation',
            description: 'Voice-activated AI assistant with Google Gemini 2.0 & OpenAI GPT. Features multilingual support, system automation, and multimodal capabilities.',
            image: './assets/images/yourdaddy-ai.jpg',
            featured: true,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Ai_Assistant'
        },
        {
            id: 2,
            title: 'Brain Buddy',
            category: 'automation',
            description: 'AI-powered neuroplasticity trainer with brainwave training. Closed-loop neuro-cybernetic system combining neuroscience with continual learning AI.',
            image: './assets/images/brain-buddy.jpg',
            featured: true,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Brain_Buddy'
        },
        {
            id: 3,
            title: 'Smiley Food App',
            category: 'webdev',
            description: 'Full-stack food ordering platform with OTP authentication, cart management, admin dashboard, and real-time order tracking. Built with React and PostgreSQL.',
            image: './assets/images/smiley-food.jpg',
            featured: true,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Smiley'
        },
        {
            id: 4,
            title: 'PDF Editor',
            category: 'webdev',
            description: 'Full-featured PDF annotation tool with drawing, text annotations, and multi-page support. Built with React, Vite, and Tailwind CSS.',
            image: './assets/images/pdf-editor.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Pdf_editor'
        },
        {
            id: 5,
            title: 'Finance Track',
            category: 'webdev',
            description: 'Expense tracker with budget management, interactive charts, and user authentication. Full-stack app with React, Node.js, and MongoDB.',
            image: './assets/images/finance-track.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Finance_track'
        },
        {
            id: 6,
            title: 'Chatflow',
            category: 'webdev',
            description: 'Real-time chat application with modern UI and seamless messaging experience.',
            image: './assets/images/chatflow.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Chatflow'
        },
        {
            id: 7,
            title: 'Tune-FLow',
            category: 'webdev',
            description: 'Music streaming application with playlist management and seamless playback experience.',
            image: './assets/images/tune-flow.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Tune-FLow'
        },
        {
            id: 8,
            title: 'Task Automation',
            category: 'automation',
            description: 'Advanced automation system with intelligent task scheduling and workflow management.',
            image: './assets/images/task-automation.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds'
        },
        {
            id: 9,
            title: 'Portfolio Website',
            category: 'webdev',
            description: 'Modern, responsive portfolio with glassmorphism design, smooth animations, and dynamic project filtering.',
            image: './assets/images/portfolio.jpg',
            featured: false,
            liveUrl: 'https://github.com/Diwakar-odds/Portfolio',
            githubUrl: 'https://github.com/Diwakar-odds/Portfolio'
        },
        {
            id: 10,
            title: 'AI Job Hunter',
            category: 'automation',
            description: 'An AI-powered application designed to streamline the job hunting process.',
            image: './assets/images/ai-job-hunter.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Ai_Job_Hunter'
        },
        {
            id: 11,
            title: 'Etherdesk',
            category: 'webdev',
            description: 'Your desktop, accessible through the ether.',
            image: './assets/images/etherdesk.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Etherdesk'
        },
        {
            id: 12,
            title: 'Tea Spill',
            category: 'webdev',
            description: 'Anonymous campus gossip platform for Indian college students',
            image: './assets/images/tea-spill.jpg',
            featured: false,
            liveUrl: '#',
            githubUrl: 'https://github.com/Diwakar-odds/Tea_Spill'
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    const items = [];
    let currentIndex = 0;

    projects.forEach((project, index) => {
        const projectCard = createCoverflowCard(project, index);
        projectsGrid.appendChild(projectCard);
        items.push(projectCard);
    });

    function updateCoverflow() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'hidden');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === currentIndex - 1 || (currentIndex === 0 && index === items.length - 1)) {
                item.classList.add('prev-1');
            } else if (index === currentIndex + 1 || (currentIndex === items.length - 1 && index === 0)) {
                item.classList.add('next-1');
            } else if (index === currentIndex - 2 || (currentIndex === 0 && index === items.length - 2) || (currentIndex === 1 && index === items.length - 1)) {
                item.classList.add('prev-2');
            } else if (index === currentIndex + 2 || (currentIndex === items.length - 1 && index === 1) || (currentIndex === items.length - 2 && index === 0)) {
                item.classList.add('next-2');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Initialize
    updateCoverflow();

    // Navigation Buttons
    const prevBtn = document.getElementById('coverflowPrev');
    const nextBtn = document.getElementById('coverflowNext');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCoverflow();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCoverflow();
        });
    }

    // Swipe/Drag Logic
    let startX = 0;
    let isDragging = false;
    const coverflowContainer = document.querySelector('.coverflow-container');

    if (coverflowContainer) {
        const handleDragStart = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        };

        const handleDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].pageX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                } else {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
                }
                updateCoverflow();
            }
        };

        coverflowContainer.addEventListener('mousedown', handleDragStart);
        window.addEventListener('mouseup', handleDragEnd);
        coverflowContainer.addEventListener('touchstart', handleDragStart, { passive: true });
        window.addEventListener('touchend', handleDragEnd);
    }

    // Make createCoverflowCard scoped inside or pass dependencies
    function createCoverflowCard(project, index) {
        const card = document.createElement('div');
        card.className = 'coverflow-item';
        card.setAttribute('data-index', index);
        card.setAttribute('data-category', project.category);

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
            <div class="coverflow-item-details">
                <div class="coverflow-item-title">${project.title}</div>
                <div class="coverflow-item-category">${project.category.replace('-', ' ')}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            if (index === currentIndex) {
                openProjectModal(project);
            } else {
                currentIndex = index;
                updateCoverflow();
            }
        });

        return card;
    }
}

// ====================================
// CONTACT FORM
// ====================================

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
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

// ====================================
// PROJECT DETAIL MODAL
// ====================================

// Project data with extended details
const projectDetails = {
    1: {
        features: [
            'Multi-language text and voice chat interface',
            'Context-aware conversation memory',
            'Real-time voice synthesis and recognition',
            'System automation and task execution',
            'Integration with various APIs and services'
        ],
        techStack: ['Python', 'FastAPI', 'OpenAI API', 'React', 'WebSocket', 'SQLite']
    },
    2: {
        features: [
            'EEG-based brain signal processing',
            'Real-time neurofeedback visualization',
            'Personalized meditation and focus training',
            'Progress tracking and analytics',
            'Gamified learning experience'
        ],
        techStack: ['Python', 'TensorFlow', 'React', 'Chart.js', 'WebSocket', 'MongoDB']
    },
    3: {
        features: [
            'OTP-based authentication system',
            'Real-time cart management',
            'Admin dashboard for order tracking',
            'Payment gateway integration',
            'Restaurant menu management'
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Twilio API', 'Stripe']
    },
    4: {
        features: [
            'PDF annotation and drawing tools',
            'Multi-page document support',
            'Text and shape annotations',
            'Export and save functionality',
            'Responsive design for all devices'
        ],
        techStack: ['React', 'Vite', 'PDF.js', 'Tailwind CSS', 'Fabric.js']
    },
    5: {
        features: [
            'Budget tracking and management',
            'Interactive expense charts',
            'Category-based expense organization',
            'Monthly/yearly financial reports',
            'User authentication and data security'
        ],
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'JWT']
    },
    6: {
        features: [
            'Real-time messaging with WebSocket',
            'User authentication and profiles',
            'Message read receipts',
            'Typing indicators',
            'Modern and responsive UI'
        ],
        techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'JWT']
    },
    7: {
        features: [
            'Audio streaming and playback',
            'Playlist creation and management',
            'Search and filter functionality',
            'User favorites and history',
            'Responsive music player interface'
        ],
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Audio API']
    },
    8: {
        features: [
            'Voice command recognition',
            'Intelligent task automation',
            'System control and monitoring',
            'Natural language processing',
            'Multi-platform support'
        ],
        techStack: ['Python', 'Speech Recognition', 'NLP', 'Automation', 'TensorFlow']
    },
    9: {
        features: [
            'Modern glassmorphism design',
            'Smooth scroll animations',
            'Dynamic project filtering',
            'Responsive across all devices',
            '3D card tilt effects'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Font Awesome', 'Vanilla JS']
    }
};

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const body = document.body;
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    
    // Featured badge
    const featuredBadge = document.getElementById('modalFeatured');
    featuredBadge.style.display = project.featured ? 'block' : 'none';
    
    // Tech stack
    const techStackContainer = document.getElementById('modalTechStack');
    const details = projectDetails[project.id] || { techStack: [], features: [] };
    
    techStackContainer.innerHTML = details.techStack.map(tech => 
        `<span class="modal-tech-badge">${tech}</span>`
    ).join('');
    
    // Features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = details.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    // Links
    document.getElementById('modalLiveLink').href = project.liveUrl;
    document.getElementById('modalGithubLink').href = project.githubUrl;
    
    // Show modal
    modal.classList.add('active');
    body.classList.add('modal-open');
    
    // ESC key handler
    document.addEventListener('keydown', handleEscapeKey);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const body = document.body;
    
    modal.classList.remove('active');
    body.classList.remove('modal-open');
    
    // Remove ESC key handler
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
}

// Make functions globally accessible
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

console.log('��� Project modal system loaded!');

// Add click handler to modal backdrop (alternative method)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Close if clicking directly on the modal container (backdrop)
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }
});
