// ===== AI DEVELOPER PORTFOLIO - INTERACTIVE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== AI NAVIGATION EFFECTS =====
    const navLinks = document.querySelectorAll('.ai-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== AI PARTICLE SYSTEM =====
    function createParticles() {
        const particlesContainer = document.querySelector('.ai-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'ai-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: aiParticleFloat ${Math.random() * 10 + 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // ===== AI SKILL BARS ANIMATION =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width;
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // ===== AI PORTFOLIO FILTER =====
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ===== PORTFOLIO FILTER ANIMATIONS =====
    function initPortfolioAnimations() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });
        
        portfolioItems.forEach(item => observer.observe(item));
    }
    
    // ===== AI FORM ENHANCEMENTS =====
    function enhanceContactForm() {
        const form = document.querySelector('.ai-contact-form');
        const inputs = document.querySelectorAll('.ai-input');
        
        if (form) {
            // Form submission
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    project_type: document.getElementById('project_type').value,
                    message: document.getElementById('message').value
                };
                
                // Validate form data
                if (!formData.name || !formData.email || !formData.phone || !formData.project_type || !formData.message) {
                    showNotification('Please fill in all fields.', 'error');
                    return;
                }
                
                // Phone number validation
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
                    showNotification('Please enter a valid phone number.', 'error');
                    return;
                }
                
                // Show loading state
                const submitBtn = form.querySelector('.ai-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                try {
                    // Create WhatsApp message with form details
                    const whatsappMessage = createWhatsAppMessage(formData);
                    
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Form Submitted!';
                    submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
                    
                    // Show success notification with WhatsApp instructions
                    showNotification('Form submitted! Please send me a WhatsApp message with these details.', 'success');
                    
                    // Show WhatsApp message details
                    showWhatsAppDetails(whatsappMessage);
                    
                    // Reset form after delay
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = 'linear-gradient(45deg, var(--ai-primary), var(--ai-accent))';
                        submitBtn.disabled = false;
                    }, 5000);
                    
                    console.log('Form submitted successfully!');
                    
                } catch (error) {
                    console.error('Error processing form:', error);
                    
                    // Show error message
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                    submitBtn.style.background = 'linear-gradient(45deg, #ff4757, #ff3742)';
                    
                    // Show error notification
                    showNotification('Error processing form. Please try again.', 'error');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = 'linear-gradient(45deg, var(--ai-primary), var(--ai-accent))';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        }
        
        // Input focus effects
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // ===== CREATE WHATSAPP MESSAGE =====
    function createWhatsAppMessage(formData) {
        const message = `🚀 *NEW PORTFOLIO CONTACT!*
        
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
🎯 *Project Type:* ${formData.project_type}
💬 *Message:* ${formData.message}

⏰ *Time:* ${new Date().toLocaleString()}
🌐 *Source:* Portfolio Website

Please send me a WhatsApp message with these details to continue the conversation!`;
        
        return message;
    }
    
    // ===== SHOW WHATSAPP DETAILS =====
    function showWhatsAppDetails(message) {
        // Create WhatsApp details modal
        const modal = document.createElement('div');
        modal.className = 'whatsapp-details-modal';
        modal.innerHTML = `
            <div class="whatsapp-modal-content">
                <div class="whatsapp-modal-header">
                    <h3>📱 Send WhatsApp Message</h3>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="whatsapp-modal-body">
                    <p>Please send me a WhatsApp message with these details:</p>
                    <div class="form-details">
                        <div class="detail-item">
                            <strong>Name:</strong> ${document.getElementById('name').value}
                        </div>
                        <div class="detail-item">
                            <strong>Email:</strong> ${document.getElementById('email').value}
                        </div>
                        <div class="detail-item">
                            <strong>Phone:</strong> ${document.getElementById('phone').value}
                        </div>
                        <div class="detail-item">
                            <strong>Project Type:</strong> ${document.getElementById('project_type').value}
                        </div>
                        <div class="detail-item">
                            <strong>Message:</strong> ${document.getElementById('message').value}
                        </div>
                    </div>
                    <div class="whatsapp-actions">
                        <a href="https://wa.me/923255661708?text=${encodeURIComponent(message)}" 
                           class="whatsapp-btn" target="_blank">
                            <i class="fab fa-whatsapp"></i> Send WhatsApp Message
                        </a>
                        <p class="whatsapp-note">
                            📱 <strong>WhatsApp Number:</strong> +92 325 566 1708
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }
    
    // ===== AI SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.ai-service-card, .ai-project-item, .ai-skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // ===== AI TYPING EFFECT =====
    function initTypingEffect() {
        const typingElement = document.querySelector('.ai-glitch');
        if (!typingElement) return;
        
        const text = typingElement.getAttribute('data-text');
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                typingElement.textContent = text.substring(0, index + 1);
                index++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing effect when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeText, 1000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(typingElement);
    }
    
    // ===== AI NEURAL NETWORK ANIMATION =====
    function animateNeuralNetwork() {
        const neuralNodes = document.querySelectorAll('.neural-node');
        const neuralConnection = document.querySelector('.neural-connection');
        
        if (neuralNodes.length > 0) {
            neuralNodes.forEach((node, index) => {
                node.style.animationDelay = `${index * 0.5}s`;
            });
        }
        
        if (neuralConnection) {
            neuralConnection.style.animationDelay = '1s';
        }
    }
    
    // ===== AI FLOATING ELEMENTS =====
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.ai-floating-elements::before, .ai-floating-elements::after');
        
        floatingElements.forEach((element, index) => {
            if (element) {
                element.style.animationDelay = `${index * 2}s`;
            }
        });
    }
    
    // ===== AI SCROLL INDICATOR =====
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.ai-scroll-indicator');
        if (!scrollIndicator) return;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 10) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // ===== AI PERFORMANCE OPTIMIZATION =====
    function optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        
        function updateOnScroll() {
            updateActiveNav();
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // ===== AI INTERACTIVE EFFECTS =====
    function initInteractiveEffects() {
        // Hover effects for tech badges
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Service card interactions
        const serviceCards = document.querySelectorAll('.ai-service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // ===== AI BACKGROUND PATTERNS =====
    function initBackgroundPatterns() {
        const patterns = document.querySelectorAll('.ai-background-pattern, .ai-matrix-background, .ai-contact-pattern');
        
        patterns.forEach(pattern => {
            if (pattern) {
                pattern.style.animationPlayState = 'running';
            }
        });
    }
    
    // ===== AI WEBSITE INITIALIZATION =====
    function initAIWebsite() {
        createParticles();
        animateSkillBars();
        initPortfolioFilter();
        initPortfolioAnimations();
        enhanceContactForm();
        initScrollAnimations();
        initTypingEffect();
        animateNeuralNetwork();
        initFloatingElements();
        initScrollIndicator();
        initBackgroundPatterns();
        initInteractiveEffects();
        optimizePerformance();
    }
    
    // ===== START THE AI WEBSITE =====
    initAIWebsite();
    
    // ===== AI WEBSITE STATUS INDICATOR =====
    function showAIStatus() {
        const statusIndicator = document.querySelector('.ai-status-indicator');
        if (statusIndicator) {
            statusIndicator.style.animation = 'aiStatusPulse 2s infinite';
        }
    }
    
    // Show AI status after initialization
    setTimeout(showAIStatus, 1000);
    
    // ===== AI PERFORMANCE MONITORING =====
    function monitorPerformance() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Website loaded in ${loadTime}ms`);
        }
    }
    
    // Monitor performance after page load
    window.addEventListener('load', monitorPerformance);
    
    // ===== RESPONSIVE FUNCTIONALITY =====
    
    // Handle mobile navigation
    function initMobileNavigation() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.ai-nav-link');
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
    
    // Handle touch gestures for mobile
    function initTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Swipe left/right for portfolio navigation
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - could be used for next project
                    console.log('Swipe left detected');
                } else {
                    // Swipe right - could be used for previous project
                    console.log('Swipe right detected');
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        });
    }
    
    // Handle responsive image loading
    function initResponsiveImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize responsive features
    initMobileNavigation();
    initTouchGestures();
    initResponsiveImages();
});

// ===== AI UTILITY FUNCTIONS =====

// Smooth scroll utility
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// AI Glitch effect utility
function createGlitchEffect(element, duration = 2000) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    function glitch() {
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iterations += 1 / 3;
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }
        }, 30);
    }
    
    glitch();
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.ai-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `ai-notification ai-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== SCROLL TO SECTION FUNCTION =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== PORTFOLIO MODAL FUNCTIONS =====
function openProjectModal(projectId) {
    // For now, just scroll to contact section
    // You can implement a full modal system here
    scrollToSection('contact');
}

// Export functions for global use
window.AIWebsite = {
    smoothScrollTo,
    createGlitchEffect,
    scrollToSection,
    openProjectModal
};
