const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

// The file currently has something like this around line 344:
//         {
//             id: 8,
//             title: 'Task Automation',
//             category: 'automation',
//             description: 'Advanced automation system with intelligent task scheduling and workflow management.',
//         submitBtn.disabled = true;

const searchStr = `        {
            id: 8,
            title: 'Task Automation',
            category: 'automation',
            description: 'Advanced automation system with intelligent task scheduling and workflow management.',
        submitBtn.disabled = true;`;

const fixStr = `        {
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

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
        items.push(projectCard);
    });

    // Position in circle and rotate
    const total = items.length;
    items.forEach((item, index) => {
        const angle = (index / total) * 360; // in degrees
        item.dataset.angle = angle;
    });

    let currentRotation = 0;
    const rotationSpeed = 0.05; // Adjust as needed
    let isHovering = false;

    // Optional: Pause rotation on hover
    projectsGrid.addEventListener('mouseenter', () => isHovering = true);
    projectsGrid.addEventListener('mouseleave', () => isHovering = false);

    function rotateBowl() {
        if (!document.body.classList.contains('modal-open') && !isHovering) {
            currentRotation = (currentRotation + rotationSpeed) % 360;
        }
        
        items.forEach((item) => {
            const baseAngle = parseFloat(item.dataset.angle);
            let totalAngle = baseAngle + currentRotation;
            item.style.transform = \`translate(-50%, -50%) rotate(\${totalAngle}deg) translate(var(--bowl-radius, 42vw)) rotate(-\${totalAngle}deg)\`;
        });
        
        requestAnimationFrame(rotateBowl);
    }
    
    rotateBowl();
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-circle-item';
    card.setAttribute('data-category', project.category);

    card.innerHTML = \`
        <div class="project-image">
            <img src="\${project.image}" alt="\${project.title}">
            \${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
        </div>
        <div class="project-circle-title">\${project.title}</div>
    \`;

    card.addEventListener('click', (e) => {
        openProjectModal(project);
    });

    return card;
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
            submitBtn.disabled = true;`;

// A more robust regex to find the broken block:
const regex = /        \{\s*id: 8,\s*title: 'Task Automation',\s*category: 'automation',\s*description: 'Advanced automation system with intelligent task scheduling and workflow management.',\s*submitBtn\.disabled = true;/;

if (regex.test(content)) {
    content = content.replace(regex, fixStr);
    fs.writeFileSync('script.js', content, 'utf8');
    console.log('Fixed script.js successfully.');
} else {
    console.log('Could not find the broken pattern.');
}
