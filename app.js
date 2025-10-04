// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const typingText = document.getElementById('typingText');
const particles = document.getElementById('particles');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initCursor();
        initNavigation();
        initTypingAnimation();
        initParticles();
        initScrollAnimations();
        initCounters();
        initFormHandling();
        initMobileMenu();
        initSmoothScrolling();
        initAdvancedEffects();
    }, 100);
});

// Custom Cursor
function initCursor() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            if (cursor && cursorFollower) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 10);
            }
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .skill-item, .contact-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (cursor && cursorFollower) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorFollower.style.opacity = '1';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                if (cursor && cursorFollower) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorFollower.style.opacity = '0.5';
                }
            });
        });
    }
}

// Navigation
function initNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Animation - Fixed
function initTypingAnimation() {
    if (!typingText) return;
    
    const text = "SHIVAM SHARMA";
    const speed = 150;
    const deleteSpeed = 100;
    const pauseTime = 2000;
    
    let i = 0;
    let isDeleting = false;
    
    function typeWriter() {
        if (!typingText) return;
        
        if (!isDeleting && i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else if (isDeleting && i > 0) {
            typingText.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(typeWriter, deleteSpeed);
        } else if (!isDeleting && i === text.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Clear existing content and start typing
    typingText.textContent = '';
    setTimeout(typeWriter, 2000);
}

// Particle Background
function initParticles() {
    if (!particles) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particles.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle();
            }
        }, 6000);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('service-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .skill-item, .timeline-item, .contact-item, .about-description');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.float-element');
        
        floatingElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrolled * speed * 0.1);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}
// Form Handling - Real Email Sending
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
            const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
            const subject = formData.get('subject') || contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = formData.get('message') || contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_zba6712', 'template_nxpinvm', {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'shivamsharma4c@gmail.com'
            }).then(function() {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }).catch(function(error) {
                console.error('Error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            }).finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}


// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#cc0000' : '#ff4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Mobile Menu
function initMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close mobile menu when link is clicked
        const mobileNavLinks = document.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
}

// Smooth Scrolling - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Advanced Effects
function initAdvancedEffects() {
    // Service cards advanced hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
            this.style.boxShadow = '0 25px 80px rgba(204, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = 'none';
        });
    });

    // Skill items hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(204, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn, .social-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent animations
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
}, 16));

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activation
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('🎉 Easter egg activated! You found the secret!', 'success');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        
        konamiCode = [];
    }
});

// Preload animations
function preloadAnimations() {
    // Create invisible elements to trigger CSS loading
    const preloadDiv = document.createElement('div');
    preloadDiv.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        opacity: 0;
        pointer-events: none;
    `;
    
    preloadDiv.innerHTML = `
        <div class="particle"></div>
        <div class="service-card"></div>
        <div class="btn btn-primary"></div>
    `;
    
    document.body.appendChild(preloadDiv);
    
    setTimeout(() => {
        if (preloadDiv.parentNode) {
            preloadDiv.remove();
        }
    }, 100);
}

// Initialize preloading
preloadAnimations();