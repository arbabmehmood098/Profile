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
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Show loading state
                const submitBtn = form.querySelector('.ai-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="ai-loading"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = 'linear-gradient(45deg, var(--ai-primary), var(--ai-accent))';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 2000);
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
        initAINavigation();
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

// ===== FIREBASE INTEGRATION =====
// Wait for Firebase to be initialized
function waitForFirebase() {
    return new Promise((resolve) => {
        if (window.FirebaseApp) {
            resolve(window.FirebaseApp);
        } else {
            const checkFirebase = setInterval(() => {
                if (window.FirebaseApp) {
                    clearInterval(checkFirebase);
                    resolve(window.FirebaseApp);
                }
            }, 100);
        }
    });
}

// ===== AI IMAGE SLIDER FUNCTIONALITY =====
let currentSlide = 1;
const totalSlides = 3;
let autoPlayInterval;

function initSlider() {
    showSlide(currentSlide);
    startAutoPlay();
    
    // Track slider initialization
    waitForFirebase().then(firebase => {
        firebase.trackEvent('slider_initialized', { total_slides: totalSlides });
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide > totalSlides) currentSlide = 1;
    if (currentSlide < 1) currentSlide = totalSlides;
    showSlide(currentSlide);
    resetAutoPlay();
    
    // Track slide change
    waitForFirebase().then(firebase => {
        firebase.trackEvent('slider_navigation', { 
            direction: direction > 0 ? 'next' : 'previous',
            current_slide: currentSlide 
        });
    });
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
    resetAutoPlay();
    
    // Track direct slide navigation
    waitForFirebase().then(firebase => {
        firebase.trackEvent('slider_direct_navigation', { 
            target_slide: slideNumber 
        });
    });
}

function showSlide(slideNumber) {
    // Hide all slides
    document.querySelectorAll('.ai-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    const currentSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
    
    // Update indicators
    updateIndicators(slideNumber);
}

function updateIndicators(activeSlide) {
    document.querySelectorAll('.ai-indicator').forEach((indicator, index) => {
        if (index + 1 === activeSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentSlide++;
        if (currentSlide > totalSlides) currentSlide = 1;
        showSlide(currentSlide);
    }, 2000); // 2 seconds interval
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
    
    // Track auto-play pause
    waitForFirebase().then(firebase => {
        firebase.trackEvent('slider_autoplay_pause');
    });
}

function resumeAutoPlay() {
    startAutoPlay();
    
    // Track auto-play resume
    waitForFirebase().then(firebase => {
        firebase.trackEvent('slider_autoplay_resume');
    });
}

// ===== PORTFOLIO FILTERING =====
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Track filter usage
            waitForFirebase().then(firebase => {
                firebase.trackEvent('portfolio_filter', { filter: filter });
            });
        });
    });
}

// ===== PORTFOLIO PROJECT TRACKING =====
function trackPortfolioProject(projectName, projectCategory) {
    waitForFirebase().then(firebase => {
        firebase.trackPortfolioView(projectName, projectCategory);
        firebase.savePortfolioView(projectName, projectCategory);
    });
}

// ===== CONTACT FORM INTEGRATION =====
function initContactForm() {
    const contactForm = document.querySelector('.ai-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                projectType: document.getElementById('project_type').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.ai-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Wait for Firebase to be ready
                const firebase = await waitForFirebase();
                
                // Track form submission attempt
                firebase.trackEvent('contact_form_submit_attempt', {
                    project_type: formData.projectType,
                    timestamp: new Date().toISOString()
                });
                
                // Save to Firebase
                const result = await firebase.saveContactForm(formData);
                
                if (result.success) {
                    // Show success message
                    showNotification('🎉 Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                    
                    // Track successful submission
                    firebase.trackEvent('contact_form_success', {
                        project_type: formData.projectType,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset submit button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Optional: Scroll to top or show thank you message
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 1000);
                    
                } else {
                    throw new Error(result.error || 'Unknown error occurred');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Show error message
                let errorMessage = 'Sorry, there was an error sending your message. ';
                if (error.message.includes('permission-denied')) {
                    errorMessage += 'Please check your internet connection and try again.';
                } else if (error.message.includes('unavailable')) {
                    errorMessage += 'Service temporarily unavailable. Please try again later.';
                } else {
                    errorMessage += 'Please try again.';
                }
                
                showNotification(errorMessage, 'error');
                
                // Track form error
                try {
                    const firebase = await waitForFirebase();
                    firebase.trackEvent('contact_form_error', {
                        error: error.message,
                        project_type: formData.projectType,
                        timestamp: new Date().toISOString()
                    });
                } catch (trackError) {
                    console.error('Error tracking form error:', trackError);
                }
                
                // Reset submit button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Add real-time validation feedback
        const inputs = contactForm.querySelectorAll('.ai-input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.id;
    
    clearFieldError(field);
    
    if (!value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required.`);
        return false;
    }
    
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    if (fieldName === 'message' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long.');
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease-in;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('is-invalid');
}

// Clear field error
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('is-invalid');
}

// Get field label
function getFieldLabel(fieldId) {
    const labels = {
        'name': 'Name',
        'email': 'Email',
        'project_type': 'Project Type',
        'message': 'Message'
    };
    return labels[fieldId] || fieldId;
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
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
        
        // Track section navigation
        waitForFirebase().then(firebase => {
            firebase.trackEvent('section_navigation', { 
                target_section: sectionId 
            });
        });
    }
}

// ===== PORTFOLIO MODAL FUNCTIONS =====
function openProjectModal(projectId) {
    // Track project modal open
    waitForFirebase().then(firebase => {
        firebase.trackEvent('project_modal_open', { project_id: projectId });
    });
    
    // For now, just scroll to contact section
    // You can implement a full modal system here
    scrollToSection('contact');
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    initSlider();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize contact form
    initContactForm();
    
    // Pause auto-play on hover
    const slider = document.querySelector('.ai-image-slider-container');
    if (slider) {
        slider.addEventListener('mouseenter', pauseAutoPlay);
        slider.addEventListener('mouseleave', resumeAutoPlay);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            changeSlide(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
    
    // Track portfolio project interactions
    document.querySelectorAll('.ai-project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-title').textContent;
            const projectCategory = this.querySelector('.project-category-badge').textContent;
            trackPortfolioProject(projectTitle, projectCategory);
        });
    });
    
    // Track CTA button clicks
    document.querySelectorAll('[onclick*="scrollToSection"]').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            waitForFirebase().then(firebase => {
                firebase.trackEvent('cta_button_click', { 
                    action: action,
                    button_text: this.textContent.trim()
                });
            });
        });
    });
    
    console.log('Main JavaScript initialized with Firebase integration');
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.AIWebsite = {
    smoothScrollTo,
    createGlitchEffect
};
