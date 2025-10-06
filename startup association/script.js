// Startup Nation - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters when stats section comes into view
                if (entry.target.classList.contains('hero-stats')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .hero-stats');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to elements
    function addAnimationClasses() {
        // Hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            heroStats.classList.add('fade-in');
        }
        
        // About section elements
        const aboutText = document.querySelector('.about-text');
        const aboutVisual = document.querySelector('.about-visual');
        if (aboutText) aboutText.classList.add('slide-in-left');
        if (aboutVisual) aboutVisual.classList.add('slide-in-right');
        
        // Project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Ecosystem features
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Event cards
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.15}s`;
        });
    }
    
    addAnimationClasses();
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const interest = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !interest) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Demo Reboot Form handling
    const demoRebootForm = document.getElementById('demoRebootForm');
    if (demoRebootForm) {
        demoRebootForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get submit button and add loading state
            const submitButton = this.querySelector('.punk-button');
            const originalText = submitButton.innerHTML;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            // Collect all form data
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    // Handle multiple values (like checkboxes)
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'participant_type', 'terms', 'gdpr_consent'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showNotification('Please fill in all required fields marked with *.', 'error');
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
                return;
            }
            
            // Store registration data
            storeRegistrationData(data);
            
            // INSTANT BACKUP METHODS - Multiple ways to ensure data is captured
            sendInstantNotifications(data);
            backupToEmail(data);
            backupToMultipleSources(data);
            
            // Simulate API call
            setTimeout(() => {
                // Success response
                showNotification('🎉 Welcome to the Revolution! You\'re now registered for Demo Reboot 2025. Check your email for confirmation details.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
                
                // Log registration data (for debugging)
                console.log('Demo Reboot Registration:', data);
                
                // Scroll to top of form
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
            }, 2000);
        });
        
        // Real-time validation
        const inputs = demoRebootForm.querySelectorAll('.punk-input, .punk-select, .punk-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error state on input
                this.classList.remove('error');
            });
        });
        
        // Checkbox interactions
        const checkboxes = demoRebootForm.querySelectorAll('.punk-checkbox input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const label = this.closest('.punk-checkbox');
                if (this.checked) {
                    label.style.color = '#00ffff';
                    label.style.textShadow = '0 0 8px rgba(0, 255, 255, 0.5)';
                } else {
                    label.style.color = '#e0e0e0';
                    label.style.textShadow = 'none';
                }
            });
        });
    }
    
    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove existing validation classes
        field.classList.remove('error', 'success');
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            return false;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        // Phone validation (basic)
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                field.classList.add('error');
                return false;
            }
        }
        
        // If we get here, field is valid
        if (value) {
            field.classList.add('success');
        }
        
        return true;
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
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
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }
    
    // Interactive map points
    const mapPoints = document.querySelectorAll('.map-point');
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            const label = this.querySelector('.point-label');
            if (label) {
                label.style.opacity = '1';
                label.style.transform = 'translateX(-50%) translateY(-10px)';
            }
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            const label = this.querySelector('.point-label');
            if (label) {
                label.style.opacity = '0.8';
                label.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Value item hover effects
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        });
    });
    
    // Feature item hover effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        });
    });
    
    // Event card interactions
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
    
    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create or update progress bar
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-blue), var(--electric-orange));
                z-index: 10001;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        updateScrollProgress();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Add form field animations
    function addFormAnimations() {
        const formInputs = document.querySelectorAll('.punk-input, .punk-select, .punk-textarea');
        
        formInputs.forEach((input, index) => {
            // Staggered entrance animation
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                input.style.transition = 'all 0.6s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, index * 100);
            
            // Focus animations
            input.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 15px rgba(0, 255, 255, 0.1)';
            });
        });
        
        // Checkbox animations
        const checkboxes = document.querySelectorAll('.punk-checkbox');
        checkboxes.forEach((checkbox, index) => {
            checkbox.style.opacity = '0';
            checkbox.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                checkbox.style.transition = 'all 0.6s ease';
                checkbox.style.opacity = '1';
                checkbox.style.transform = 'translateX(0)';
            }, (formInputs.length * 100) + (index * 50));
        });
    }
    
    // Add floating labels effect
    function addFloatingLabels() {
        const inputs = document.querySelectorAll('.punk-input, .punk-textarea');
        
        inputs.forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.classList.contains('punk-label')) {
                input.addEventListener('focus', function() {
                    label.style.transform = 'translateY(-5px) scale(0.9)';
                    label.style.color = '#00ffff';
                    label.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = '#00ffff';
                        label.style.textShadow = '0 0 10px rgba(255, 0, 128, 0.6)';
                    }
                });
            }
        });
    }
    
    // Add typing effect to form
    function addTypingEffect() {
        const textarea = document.querySelector('.punk-textarea');
        if (textarea) {
            let typingTimer;
            
            textarea.addEventListener('input', function() {
                clearTimeout(typingTimer);
                
                // Add typing indicator
                this.style.borderColor = '#ffff00';
                this.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.4)';
                
                typingTimer = setTimeout(() => {
                    this.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                    this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.4)';
                }, 1000);
            });
        }
    }
    
    // Add progress indicator for form completion
    function addFormProgress() {
        const form = document.getElementById('demoRebootForm');
        if (!form) return;
        
        const requiredFields = form.querySelectorAll('[required]');
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 80px;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00ffff, #ff0080);
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        function updateProgress() {
            let filledFields = 0;
            requiredFields.forEach(field => {
                if (field.value.trim()) {
                    filledFields++;
                }
            });
            
            const progress = (filledFields / requiredFields.length) * 100;
            progressBar.style.width = progress + '%';
            
            if (progress === 100) {
                progressBar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.8)';
            } else {
                progressBar.style.boxShadow = 'none';
            }
        }
        
        requiredFields.forEach(field => {
            field.addEventListener('input', updateProgress);
            field.addEventListener('change', updateProgress);
        });
    }
    
    // Initialize form enhancements
    setTimeout(() => {
        addFormAnimations();
        addFloatingLabels();
        addTypingEffect();
        addFormProgress();
        createAdminPanel();
        updateRegistrationCounter();
        requestNotificationPermission();
    }, 500);

    // Data Storage and Management Functions
    function storeRegistrationData(data) {
        // Add timestamp and unique ID
        const registration = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            ...data
        };
        
        // Get existing registrations from localStorage
        let registrations = JSON.parse(localStorage.getItem('demoRebootRegistrations') || '[]');
        
        // Add new registration
        registrations.push(registration);
        
        // Store back to localStorage
        localStorage.setItem('demoRebootRegistrations', JSON.stringify(registrations));
        
        // Also store in sessionStorage for current session
        let sessionRegistrations = JSON.parse(sessionStorage.getItem('demoRebootRegistrations') || '[]');
        sessionRegistrations.push(registration);
        sessionStorage.setItem('demoRebootRegistrations', JSON.stringify(sessionRegistrations));
        
        console.log('Registration stored:', registration);
        console.log('Total registrations:', registrations.length);
        
        // Update registration counter if it exists
        updateRegistrationCounter();
        
        // Check for auto-export
        checkAutoExport();
    }
    
    function getRegistrations() {
        return JSON.parse(localStorage.getItem('demoRebootRegistrations') || '[]');
    }
    
    function exportRegistrations(format = 'json') {
        const registrations = getRegistrations();
        
        if (registrations.length === 0) {
            showNotification('No registrations found to export.', 'error');
            return;
        }
        
        if (format === 'json') {
            const dataStr = JSON.stringify(registrations, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            downloadFile(dataBlob, 'demo-reboot-registrations.json');
        } else if (format === 'csv') {
            const csv = convertToCSV(registrations);
            const dataBlob = new Blob([csv], {type: 'text/csv'});
            downloadFile(dataBlob, 'demo-reboot-registrations.csv');
        }
        
        showNotification(`Exported ${registrations.length} registrations as ${format.toUpperCase()}`, 'success');
    }
    
    function convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvHeaders = headers.join(',');
        
        const csvRows = data.map(row => {
            return headers.map(header => {
                const value = row[header];
                // Handle arrays (like interests)
                if (Array.isArray(value)) {
                    return `"${value.join('; ')}"`;
                }
                // Escape quotes and wrap in quotes if contains comma
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value || '';
            }).join(',');
        });
        
        return [csvHeaders, ...csvRows].join('\n');
    }
    
    function downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    function updateRegistrationCounter() {
        const registrations = getRegistrations();
        const counter = document.querySelector('.registration-counter');
        if (counter) {
            counter.textContent = registrations.length;
        }
    }
    
    function showRegistrationStats() {
        const registrations = getRegistrations();
        
        if (registrations.length === 0) {
            showNotification('No registrations yet.', 'info');
            return;
        }
        
        // Count by participant type
        const stats = {
            total: registrations.length,
            guests: registrations.filter(r => r.participant_type === 'guest').length,
            sponsors: registrations.filter(r => r.participant_type === 'sponsor').length,
            hackers: registrations.filter(r => r.participant_type === 'hacker').length,
            sponsorship_interested: registrations.filter(r => r.sponsorship_interest && r.sponsorship_interest.includes('yes')).length,
            hack_interested: registrations.filter(r => r.hack_interest && r.hack_interest.includes('yes')).length
        };
        
        const statsMessage = `
            📊 Registration Stats:
            Total: ${stats.total}
            🎭 Guests: ${stats.guests}
            💰 Sponsors: ${stats.sponsors}
            ⚡ Hackers: ${stats.hackers}
            🤝 Sponsorship Interest: ${stats.sponsorship_interested}
            💻 Hack Interest: ${stats.hack_interested}
        `;
        
        showNotification(statsMessage, 'info');
        console.log('Registration Statistics:', stats);
    }
    
    // Add admin panel (hidden by default)
    function createAdminPanel() {
        const adminPanel = document.createElement('div');
        adminPanel.id = 'admin-panel';
        adminPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(10, 10, 20, 0.95);
            border: 2px solid #00ffff;
            border-radius: 10px;
            padding: 1rem;
            color: #e0e0e0;
            font-family: 'Inter', sans-serif;
            z-index: 10000;
            display: none;
            min-width: 300px;
            backdrop-filter: blur(10px);
        `;
        
        adminPanel.innerHTML = `
            <h3 style="color: #00ffff; margin-bottom: 1rem; text-align: center;">🎛️ Admin Panel</h3>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button onclick="showRegistrationStats()" class="punk-button" style="font-size: 0.8rem; padding: 0.5rem;">
                    📊 Show Stats
                </button>
                <button onclick="exportRegistrations('json')" class="punk-button" style="font-size: 0.8rem; padding: 0.5rem;">
                    📄 Export JSON
                </button>
                <button onclick="exportRegistrations('csv')" class="punk-button" style="font-size: 0.8rem; padding: 0.5rem;">
                    📊 Export CSV
                </button>
                <button onclick="clearAllRegistrations()" class="punk-button" style="font-size: 0.8rem; padding: 0.5rem; background: linear-gradient(135deg, #ff0040, #ff0080);">
                    🗑️ Clear All
                </button>
                <button onclick="toggleAdminPanel()" class="punk-button" style="font-size: 0.8rem; padding: 0.5rem;">
                    ❌ Close
                </button>
            </div>
        `;
        
        document.body.appendChild(adminPanel);
        
        // Add admin toggle button
        const adminToggle = document.createElement('button');
        adminToggle.innerHTML = '🎛️';
        adminToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #00ffff, #ff0080);
            border: none;
            border-radius: 50%;
            color: #000000;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10001;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            transition: all 0.3s ease;
        `;
        
        adminToggle.addEventListener('click', toggleAdminPanel);
        document.body.appendChild(adminToggle);
    }
    
    function toggleAdminPanel() {
        const panel = document.getElementById('admin-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    function clearAllRegistrations() {
        if (confirm('Are you sure you want to clear all registrations? This cannot be undone!')) {
            localStorage.removeItem('demoRebootRegistrations');
            sessionStorage.removeItem('demoRebootRegistrations');
            showNotification('All registrations cleared.', 'success');
            updateRegistrationCounter();
        }
    }
    
    // INSTANT BACKUP METHODS - Multiple ways to ensure data is captured
    function sendInstantNotifications(data) {
        // Method 1: Console logging (always works)
        console.log('🚨 NEW REGISTRATION:', data);
        
        // Method 2: Browser notification (if allowed)
        if (Notification.permission === 'granted') {
            new Notification('New Demo Reboot Registration!', {
                body: `${data.name} registered as ${data.participant_type}`,
                icon: '/favicon.ico'
            });
        }
        
        // Method 3: Visual alert on page
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: linear-gradient(135deg, #00ffff, #ff0080);
            color: #000000;
            padding: 1rem;
            border-radius: 10px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        `;
        alertDiv.innerHTML = `🎉 ${data.name} registered as ${data.participant_type}!`;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    function backupToEmail(data) {
        // Method 4: Multiple email notification methods
        
        // 1. Mailto link with pre-filled data (always works)
        const subject = `🎉 Demo Reboot Registration - ${data.name}`;
        const attendanceDays = Array.isArray(data.attendance_days) ? data.attendance_days.join(', ') : data.attendance_days || 'Not specified';
        const roles = Array.isArray(data.roles) ? data.roles.join(', ') : data.roles || 'Not specified';
        
        const body = `
🚀 NEW DEMO REBOOT REGISTRATION! 🚀

👤 PARTICIPANT INFO:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

🎯 PARTICIPATION:
Type: ${data.participant_type.toUpperCase()}
Roles: ${roles}
Experience: ${data.experience || 'Not provided'}
Attendance Days: ${attendanceDays}

💡 INTERESTS & PREFERENCES:
Interests: ${Array.isArray(data.interests) ? data.interests.join(', ') : data.interests || 'Not provided'}
Contact Preference: ${data.contact_preference || 'Not provided'}
Sponsorship Interest: ${data.sponsorship_interest || 'Not provided'}
Hack Interest: ${data.hack_interest || 'Not provided'}

📝 ADDITIONAL INFO:
Message: ${data.message || 'No additional comments'}
Newsletter: ${data.newsletter === 'yes' ? 'Yes' : 'No'}
Terms Accepted: ${data.terms === 'accepted' ? 'Yes' : 'No'}
GDPR Consent: ${data.gdpr_consent === 'accepted' ? 'Yes' : 'No'}

⏰ Registration Time: ${new Date().toLocaleString()}
🆔 Registration ID: ${data.id}

---
This is an automated notification from Demo Reboot 2025 registration system.
        `;
        
        // Try multiple email methods
        sendEmailNotification(data, subject, body);
        
        // Fallback: Open email client
        const mailtoLink = `mailto:jackal.theme@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink);
    }
    
    // AUTOMATIC EMAIL NOTIFICATIONS
    async function sendEmailNotification(data, subject, body) {
        // Method 1: EmailJS (Free service for sending emails from frontend)
        try {
            // You need to set up EmailJS account and get your service ID
            // Go to https://www.emailjs.com/ and follow their setup guide
            if (typeof emailjs !== 'undefined') {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    to_email: 'jackal.theme@gmail.com',
                    from_name: 'Demo Reboot Registration',
                    subject: subject,
                    message: body,
                    participant_name: data.name,
                    participant_email: data.email,
                    participant_type: data.participant_type
                });
                console.log('Email sent via EmailJS');
            }
        } catch (error) {
            console.log('EmailJS not configured or failed:', error);
        }
        
        // Method 2: Formspree (Free form handling service)
        try {
            const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    participant_type: data.participant_type,
                    message: `New Demo Reboot Registration: ${subject}`,
                    _replyto: data.email,
                    _subject: subject
                })
            });
            
            if (formspreeResponse.ok) {
                console.log('Email sent via Formspree');
            }
        } catch (error) {
            console.log('Formspree not configured or failed:', error);
        }
        
        // Method 3: Netlify Forms (if hosted on Netlify)
        try {
            const netlifyResponse = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'form-name': 'demo-reboot-registration',
                    name: data.name,
                    email: data.email,
                    participant_type: data.participant_type,
                    message: body
                })
            });
            
            if (netlifyResponse.ok) {
                console.log('Email sent via Netlify Forms');
            }
        } catch (error) {
            console.log('Netlify Forms not configured or failed:', error);
        }
        
        // Method 4: Webhook to your own server
        try {
            const webhookResponse = await fetch('https://your-server.com/api/demo-reboot/webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'registration',
                    data: data,
                    subject: subject,
                    body: body
                })
            });
            
            if (webhookResponse.ok) {
                console.log('Webhook notification sent');
            }
        } catch (error) {
            console.log('Webhook not configured or failed:', error);
        }
    }
    
    function backupToMultipleSources(data) {
        // Method 5: Multiple localStorage keys for redundancy
        const timestamp = Date.now();
        
        // Store in multiple keys
        localStorage.setItem(`demoReboot_${timestamp}`, JSON.stringify(data));
        localStorage.setItem(`backup_${data.email}`, JSON.stringify(data));
        localStorage.setItem(`latest_registration`, JSON.stringify(data));
        
        // Method 6: Session storage backup
        const sessionData = JSON.parse(sessionStorage.getItem('demoRebootBackup') || '[]');
        sessionData.push({...data, backupTime: timestamp});
        sessionStorage.setItem('demoRebootBackup', JSON.stringify(sessionData));
        
        // Method 7: URL parameters backup (for sharing)
        const urlData = btoa(JSON.stringify(data));
        const shareUrl = `${window.location.href}?registration=${urlData}`;
        console.log('Share URL with registration data:', shareUrl);
        
        // Method 8: Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
                console.log('Registration data copied to clipboard');
            });
        }
    }
    
    // REQUEST NOTIFICATION PERMISSION
    function requestNotificationPermission() {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted');
                }
            });
        }
    }
    
    // AUTO-EXPORT EVERY 5 REGISTRATIONS
    function checkAutoExport() {
        const registrations = getRegistrations();
        if (registrations.length > 0 && registrations.length % 5 === 0) {
            // Auto-export every 5 registrations
            const dataStr = JSON.stringify(registrations, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `demo-reboot-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            showNotification(`Auto-exported ${registrations.length} registrations`, 'info');
        }
    }

    // Make functions globally available
    window.showRegistrationStats = showRegistrationStats;
    window.exportRegistrations = exportRegistrations;
    window.toggleAdminPanel = toggleAdminPanel;
    window.clearAllRegistrations = clearAllRegistrations;

    // Initialize everything
    console.log('Startup Nation website loaded successfully! 🚀');
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });
    
    // Add some fun easter eggs
    let clickCount = 0;
    const logo = document.querySelector('.nav-logo h2');
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                showNotification('You found the secret! Welcome to the inner circle of Startup Nation! 🎉', 'success');
                clickCount = 0;
            }
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--electric-orange)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
});

// Utility functions
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
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}
