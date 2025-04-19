/**
 * Timeless Elegant Portfolio - Main JavaScript
 * A sophisticated approach to interactive web design
 */

// DOM Elements
const body = document.body;
const preloader = document.querySelector('.preloader');
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const backToTop = document.querySelector('.back-to-top');
const skillCategories = document.querySelectorAll('.skill-category');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioLinks = document.querySelectorAll('.portfolio-link[data-project]');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');
const contactForm = document.getElementById('contactForm');

// Check if element exists before adding event listeners
const elementExists = (element) => element !== null && element !== undefined;

// Preloader
window.addEventListener('load', () => {
    if (elementExists(preloader)) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Animate elements after preloader
                animateOnScroll();
            }, 500);
        }, 800);
    }
});

// Theme Toggle
if (elementExists(themeToggle)) {
    // Check for system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or system preference
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Save theme preference
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) {
            if (e.matches) {
                body.classList.add('dark-theme');
            } else {
                body.classList.remove('dark-theme');
            }
        }
    });
}

// Navigation Toggle
if (elementExists(navToggle) && elementExists(navMenu)) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
}

// Close menu when clicking on a link
if (navLinks.length > 0 && elementExists(navToggle) && elementExists(navMenu)) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Active link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Activate nav links based on scroll position
    if (navLinks.length > 0) {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (elementExists(header)) {
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Scroll progress bar
    if (elementExists(scrollProgressBar)) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollPosition / scrollHeight) * 100;
        scrollProgressBar.style.width = `${scrollPercent}%`;
    }
    
    // Back to top button
    if (elementExists(backToTop)) {
        if (scrollPosition > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Back to top button click
if (elementExists(backToTop)) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Smooth scroll to top with easing
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        
        scrollToTop();
    });
}

// Animate elements on scroll
function animateOnScroll() {
    // Animate skill progress bars
    if (skillCategories.length > 0) {
        skillCategories.forEach(category => {
            const categoryPosition = category.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (categoryPosition < screenPosition) {
                category.classList.add('animate');
                
                const progressBars = category.querySelectorAll('.skill-progress-bar');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = `${progress}%`;
                });
            }
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (elementExists(heroSection)) {
        const scrollPosition = window.scrollY;
        const heroImage = document.querySelector('.hero-image-wrapper');
        
        if (elementExists(heroImage)) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    }
}

// Portfolio Filtering
if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            portfolioFilters.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter portfolio items with smooth transitions
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95) translateY(10px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Modal
if (portfolioLinks.length > 0 && elementExists(projectModal) && elementExists(modalBody)) {
    // Project data
    const projects = {
        project1: {
            title: 'PayNext Payment System',
            category: 'Cloud & DevOps',
            client: 'FinTech Startup',
            date: 'January 2025',
            description: 'PayNext is a cloud-native, scalable, and automated FinTech payment platform designed to handle high-volume transactions with robust security measures. The system leverages Kubernetes for orchestration, Docker for containerization, and implements CI/CD pipelines for continuous deployment.',
            technologies: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'PostgreSQL'],
            features: [
                'Microservices architecture for scalability and resilience',
                'Real-time payment processing with low latency',
                'Advanced fraud detection using machine learning',
                'Multi-currency support with automatic exchange rate updates',
                'Comprehensive API documentation and developer portal',
                'End-to-end encryption for all transactions'
            ],
            images: ['assets/projects/paynext.jpg']
        },
        project2: {
            title: 'FinovaBank Platform',
            category: 'Cloud & DevOps',
            client: 'FinovaBank',
            date: 'December 2024',
            description: 'FinovaBank Platform is a secure and scalable digital banking platform designed for modern financial services with comprehensive banking functionalities. The platform provides a seamless experience for customers while ensuring the highest levels of security and compliance with financial regulations.',
            technologies: ['Java', 'JavaScript', 'React', 'Terraform', 'AWS', 'Docker', 'MongoDB'],
            features: [
                'Secure authentication with multi-factor authentication',
                'Real-time transaction monitoring and alerts',
                'Personalized financial insights and recommendations',
                'Automated compliance checks and reporting',
                'Integration with third-party financial services',
                'Mobile-first responsive design'
            ],
            images: ['assets/projects/finovabank.jpg']
        },
        project3: {
            title: 'BlockGuardian Fraud Detection',
            category: 'Blockchain & Web',
            client: 'DeFi Protocol',
            date: 'November 2024',
            description: 'BlockGuardian is a blockchain-based fraud detection system for DeFi transactions using smart contracts and machine learning algorithms. The system analyzes transaction patterns and identifies potential fraudulent activities in real-time, providing alerts and preventive measures.',
            technologies: ['Solidity', 'React.js', 'TensorFlow', 'Ethereum', 'Web3.js', 'Python', 'Node.js'],
            features: [
                'Real-time transaction monitoring on blockchain',
                'Machine learning models for anomaly detection',
                'Smart contract integration for automated responses',
                'Decentralized alert system for stakeholders',
                'Historical transaction analysis and reporting',
                'User-friendly dashboard for monitoring'
            ],
            images: ['assets/projects/blockguardian.jpg']
        },
        project4: {
            title: 'BlockScore Credit Scoring',
            category: 'Blockchain & Web',
            client: 'Credit Bureau',
            date: 'October 2024',
            description: 'BlockScore is an AI-driven credit scoring platform that analyzes on-chain financial behavior to provide decentralized credit scores. The platform leverages blockchain data to create a more inclusive and transparent credit scoring system that can be used by traditional and decentralized financial institutions.',
            technologies: ['Solidity', 'Node.js', 'MongoDB', 'Ethereum', 'Machine Learning', 'Express.js', 'React'],
            features: [
                'On-chain data analysis for credit scoring',
                'Privacy-preserving data collection and processing',
                'Integration with traditional credit scoring systems',
                'User-controlled data sharing and permissions',
                'Transparent scoring methodology and appeals process',
                'Cross-chain compatibility for comprehensive scoring'
            ],
            images: ['assets/projects/blockscore.jpg']
        },
        project5: {
            title: 'CarbonXchange Marketplace',
            category: 'Blockchain & Web',
            client: 'Environmental NGO',
            date: 'September 2024',
            description: 'CarbonXchange is a blockchain-based carbon credit trading platform that enables fractional ownership of carbon credits with transparent verification. The marketplace connects carbon credit producers with buyers, providing a transparent and efficient way to trade carbon offsets.',
            technologies: ['Solidity', 'Flask', 'PostgreSQL', 'Ethereum', 'IPFS', 'Python', 'JavaScript'],
            features: [
                'Tokenized carbon credits with fractional ownership',
                'Transparent verification of carbon offset projects',
                'Automated matching of buyers and sellers',
                'Real-time pricing based on market demand',
                'Integration with carbon offset verification standards',
                'Impact tracking and reporting for buyers'
            ],
            images: ['assets/projects/carbonxchange.jpg']
        },
        project6: {
            title: 'LendSmart Micro Lending',
            category: 'Blockchain',
            client: 'Microfinance Institution',
            date: 'August 2024',
            description: 'LendSmart is a decentralized micro-lending protocol designed for emerging markets, enabling peer-to-peer lending without traditional intermediaries. The platform uses blockchain technology to create a transparent and efficient lending ecosystem that can operate in regions with limited banking infrastructure.',
            technologies: ['Solidity', 'Flask', 'MongoDB', 'Ethereum', 'React', 'Python', 'Web3.js'],
            features: [
                'Peer-to-peer lending without intermediaries',
                'Risk assessment based on alternative data sources',
                'Automated loan disbursement and repayment',
                'Community-based lending pools and risk sharing',
                'Integration with local payment systems',
                'Transparent interest rates and terms'
            ],
            images: ['assets/projects/lendsmart.jpg']
        }
    };
    
    // Open modal with project details
    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectId = link.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                // Create modal content with elegant styling
                let modalContent = `
                    <div class="project-details">
                        <h2 class="project-title">${project.title}</h2>
                        <div class="project-meta">
                            <div class="project-meta-item">
                                <h4>Category</h4>
                                <p>${project.category}</p>
                            </div>
                            <div class="project-meta-item">
                                <h4>Client</h4>
                                <p>${project.client}</p>
                            </div>
                            <div class="project-meta-item">
                                <h4>Date</h4>
                                <p>${project.date}</p>
                            </div>
                        </div>
                        <div class="project-image">
                            <img src="${project.images[0]}" alt="${project.title}">
                        </div>
                        <div class="project-description">
                            <h4>Project Overview</h4>
                            <p>${project.description}</p>
                        </div>
                        <div class="project-technologies">
                            <h4>Technologies Used</h4>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        <div class="project-features">
                            <h4>Key Features</h4>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                
                // Set modal content
                modalBody.innerHTML = modalContent;
                
                // Show modal
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    if (elementExists(modalClose)) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Form validation
if (elementExists(contactForm)) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Validate form
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Please enter a subject');
            isValid = false;
        } else {
            showSuccess(subjectInput);
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else {
            showSuccess(messageInput);
        }
        
        // If form is valid, submit it
        if (isValid) {
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            const formSuccess = document.createElement('div');
            formSuccess.className = 'form-success';
            formSuccess.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Your message has been sent successfully!</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(formSuccess);
        }
    });
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerText = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorMessage);
    }
}

// Show success
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        formGroup.removeChild(errorMessage);
    }
}

// Check if email is valid
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Initialize AOS (if available)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}
