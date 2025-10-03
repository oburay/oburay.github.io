/**
 * FABRISK - Enterprise AI Attack Surface Management
 * Interactive JavaScript Features
 * Phase 6: Production-Ready with Performance & Error Handling
 */

// ============================================
// PERFORMANCE & ERROR HANDLING
// ============================================

// Performance monitoring
const performanceMonitor = {
    marks: {},
    
    mark(name) {
        this.marks[name] = performance.now();
    },
    
    measure(name, startMark) {
        if (this.marks[startMark]) {
            const duration = performance.now() - this.marks[startMark];
            if (duration > 100) {
                console.warn(`⚠️ ${name}: ${duration.toFixed(2)}ms (slow)`);
            }
            return duration;
        }
    }
};

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Error caught:', event.error);
    // In production, send to error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Loading state manager
class LoadingManager {
    constructor() {
        this.createLoadingOverlay();
    }
    
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        
        // Get current theme
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const bgColor = theme === 'dark' ? '#0A2540' : '#FFFFFF';
        const spinnerColor = '#2EC7A6';
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${bgColor};
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;
        
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid ${spinnerColor};
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        
        overlay.appendChild(spinner);
        document.body.appendChild(overlay);
        this.overlay = overlay;
        
        console.log('📦 Loading overlay created');
    }
    
    hide() {
        if (this.overlay) {
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                this.overlay.remove();
            }, 500);
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Throttle function to limit execution rate
 */
function throttle(func, wait) {
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

/**
 * Debounce function to delay execution
 */
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

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
    );
}

/**
 * Ease out cubic function
 */
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// ============================================
// PARTICLE SYSTEM
// ============================================

class ParticleSystem {
    constructor(canvas) {
        if (!canvas) {
            console.error('ParticleSystem: Canvas element not provided');
            return;
        }
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        if (!this.ctx) {
            console.error('ParticleSystem: Could not get canvas context');
            return;
        }
        
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 30 : 60;
        this.mouse = { x: null, y: null, radius: 150 };
        this.animationFrame = null;
        this.currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        console.log('✨ Particle system initialized:', this.particleCount, 'particles');
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
        // Activate canvas after creation
        setTimeout(() => this.canvas.classList.add('active'), 100);
        
        // Listen for theme changes
        this.setupThemeListener();
    }
    
    setupThemeListener() {
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    getParticleColor() {
        // Return different colors based on theme
        if (this.currentTheme === 'dark') {
            return { r: 46, g: 199, b: 166 }; // Accent color for dark theme
        } else {
            return { r: 10, g: 37, b: 64 }; // Primary dark color for light theme
        }
    }
    
    getConnectionColor() {
        // Return different connection colors based on theme
        if (this.currentTheme === 'dark') {
            return { r: 46, g: 199, b: 166 }; // Accent color for dark theme
        } else {
            return { r: 10, g: 37, b: 64 }; // Primary dark color for light theme
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', debounce(() => {
            this.resize();
            this.particleCount = window.innerWidth < 768 ? 30 : 60;
            this.createParticles();
        }, 250));
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    drawParticle(particle) {
        const color = this.getParticleColor();
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.opacity})`;
        this.ctx.fill();
    }
    
    connectParticles(particle, index) {
        const color = this.getConnectionColor();
        const baseOpacity = this.currentTheme === 'dark' ? 0.15 : 0.25;
        
        for (let j = index + 1; j < this.particles.length; j++) {
            const particle2 = this.particles[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * (1 - distance / 120)})`;
                this.ctx.lineWidth = this.currentTheme === 'dark' ? 1 : 1.5;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(particle2.x, particle2.y);
                this.ctx.stroke();
            }
        }
    }
    
    updateParticle(particle) {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                
                particle.x -= directionX * force * 2;
                particle.y -= directionY * force * 2;
            }
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            this.updateParticle(particle);
            this.drawParticle(particle);
            this.connectParticles(particle, index);
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        // Observe all scroll reveal elements
        const revealElements = document.querySelectorAll(
            '.scroll-reveal, .scroll-reveal-stagger, .scroll-scale, .scroll-slide-left, .scroll-slide-right'
        );
        
        revealElements.forEach(el => this.observer.observe(el));
        
        // Add scroll reveal classes to dashboard cards
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        dashboardCards.forEach(card => {
            card.classList.add('scroll-reveal-stagger');
            this.observer.observe(card);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stop observing once revealed
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ============================================
// ANIMATED COUNTER
// ============================================

class AnimatedCounter {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-count')) || 0;
        this.current = 0;
        this.duration = 2000;
        this.hasAnimated = false;
        
        console.log('🔢 AnimatedCounter created');
        console.log('  Element:', this.element);
        console.log('  Target:', this.target);
        console.log('  Current text:', this.element.textContent);
        
        // Just animate immediately - simplest approach
        setTimeout(() => {
            console.log('⏰ Starting animation after delay');
            this.animate();
        }, 100);
    }
    
    animate() {
        console.log('🎬 Starting counter animation to:', this.target);
        this.hasAnimated = true;
        
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            this.current = Math.floor(easeOutCubic(progress) * this.target);
            this.element.textContent = this.current;
            
            // Add pulse animation
            if (progress < 1) {
                this.element.classList.add('counting');
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
                this.element.classList.remove('counting');
                console.log('✅ Counter animation complete:', this.target);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// ============================================
// THEME TOGGLE
// ============================================

class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();
        
        // Add event listener
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateIcon();
    }
    
    updateIcon() {
        if (!this.toggle) return;
        
        const icon = this.toggle.querySelector('.theme-icon');
        if (!icon) return;
        
        if (this.currentTheme === 'dark') {
            icon.innerHTML = `
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            `;
        } else {
            icon.innerHTML = `
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            `;
        }
    }
}

// ============================================
// MOBILE MENU
// ============================================

class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.menu = document.getElementById('nav-links');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking nav links
        if (this.menu) {
            const links = this.menu.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 768) {
                        this.closeMenu();
                    }
                });
            });
        }
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.toggle) {
            this.toggle.classList.toggle('active');
        }
        
        if (this.menu) {
            if (this.isOpen) {
                this.menu.style.display = 'flex';
                this.menu.style.position = 'absolute';
                this.menu.style.top = '72px';
                this.menu.style.left = '0';
                this.menu.style.right = '0';
                this.menu.style.flexDirection = 'column';
                this.menu.style.backgroundColor = 'var(--glass-bg)';
                this.menu.style.backdropFilter = 'blur(20px)';
                this.menu.style.padding = 'var(--space-lg)';
                this.menu.style.gap = 'var(--space-md)';
                this.menu.style.borderBottom = '1px solid var(--glass-border)';
                this.menu.style.boxShadow = 'var(--shadow-lg)';
            } else {
                this.closeMenu();
            }
        }
    }
    
    closeMenu() {
        this.isOpen = false;
        
        if (this.toggle) {
            this.toggle.classList.remove('active');
        }
        
        if (this.menu && window.innerWidth < 768) {
            this.menu.style.display = 'none';
        }
    }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        this.header = document.getElementById('header');
        
        this.init();
    }
    
    init() {
        // Smooth scroll on nav link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = this.header ? this.header.offsetHeight : 72;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Update active state
                this.updateActiveLink(link);
            });
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', throttle(() => {
            this.updateActiveOnScroll();
        }, 100));
    }
    
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    updateActiveOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        this.navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                const offsetBottom = offsetTop + targetElement.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                    this.navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
}

// ============================================
// HEADER SCROLL EFFECTS
// ============================================

class HeaderScroll {
    constructor() {
        this.header = document.getElementById('header');
        this.scrollThreshold = 50;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > this.scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, 100));
    }
}

// ============================================
// DASHBOARD DATA ANIMATIONS
// ============================================

class DashboardAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Animate card values on hover
        const cardValues = document.querySelectorAll('.card-value[data-count]');
        cardValues.forEach(value => {
            new AnimatedCounter(value);
        });
        
        // Animate chart lines
        this.animateCharts();
        
        // Simulate real-time activity feed updates
        this.animateActivityFeed();
    }
    
    animateCharts() {
        const charts = document.querySelectorAll('.mini-chart');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lines = entry.target.querySelectorAll('.chart-line');
                        lines.forEach(line => {
                            line.style.animation = 'drawLine 2s ease-out forwards';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        charts.forEach(chart => observer.observe(chart));
    }
    
    animateActivityFeed() {
        const activityItems = document.querySelectorAll('.activity-item');
        
        // Add slight delay variations for natural feel
        activityItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

class ButtonRipple {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                button.appendChild(ripple);
                
                // Animate ripple
                ripple.animate([
                    { width: '0px', height: '0px', opacity: 1 },
                    { width: '300px', height: '300px', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                });
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// ============================================
// WATCH DEMO BUTTON
// ============================================

class WatchDemo {
    constructor() {
        this.button = document.getElementById('watch-demo-btn');
        this.init();
    }
    
    init() {
        if (this.button) {
            this.button.addEventListener('click', () => {
                // Placeholder for demo video modal
                alert('Demo video feature coming soon!\n\nThis would open a modal with a product demonstration video showcasing Fabrisk\'s AI Attack Surface Management platform.');
            });
        }
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (isValid) {
            field.style.borderColor = 'var(--color-success)';
        } else {
            field.style.borderColor = 'var(--color-error)';
        }
        
        return isValid;
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Submitting...</span>';
        
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Show success message
            alert(`Thank you for your interest, ${data.name}!\n\nOur team will contact you at ${data.email} within 24 hours to schedule your personalized demo.`);
            
            // Reset form
            this.form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Reset field borders
            inputs.forEach(input => {
                input.style.borderColor = 'var(--color-border)';
            });
        }, 1500);
    }
}

// ============================================
// PHASE 5: DATA VISUALIZATIONS & GRAPHICS
// ============================================

// ============================================
// INTERACTIVE CHART SYSTEM
// ============================================

class InteractiveCharts {
    constructor() {
        this.charts = [];
        this.init();
    }
    
    init() {
        // Enhance mini charts with hover effects
        this.initMiniCharts();
        
        // Animate ring progress chart
        this.initRingChart();
        
        // Add interactive tooltips
        this.initChartTooltips();
    }
    
    initMiniCharts() {
        const charts = document.querySelectorAll('.mini-chart');
        
        charts.forEach((chart, index) => {
            const line = chart.querySelector('.chart-line');
            if (!line) return;
            
            // Add hover effect
            chart.addEventListener('mouseenter', () => {
                line.style.strokeWidth = '3';
                line.style.filter = 'drop-shadow(0 0 8px var(--color-accent))';
            });
            
            chart.addEventListener('mouseleave', () => {
                line.style.strokeWidth = '2';
                line.style.filter = 'none';
            });
            
            // Simulate data updates
            this.animateChartLine(line, index);
        });
    }
    
    animateChartLine(line, index) {
        const originalPoints = line.getAttribute('points');
        
        // Create slight variation in data points
        setInterval(() => {
            if (!document.hidden) {
                const points = originalPoints.split(' ').map(point => {
                    const [x, y] = point.split(',').map(Number);
                    const variation = (Math.random() - 0.5) * 2;
                    return `${x},${Math.max(5, Math.min(25, y + variation))}`;
                });
                
                line.setAttribute('points', points.join(' '));
            }
        }, 3000 + (index * 1000));
    }
    
    initRingChart() {
        const ringProgress = document.querySelector('.ring-progress');
        if (!ringProgress) return;
        
        // Add interactive hover
        const coverageRing = document.querySelector('.coverage-ring');
        if (coverageRing) {
            coverageRing.addEventListener('mouseenter', () => {
                ringProgress.style.strokeWidth = '10';
                ringProgress.style.filter = 'drop-shadow(0 0 12px rgba(46, 199, 166, 0.6))';
            });
            
            coverageRing.addEventListener('mouseleave', () => {
                ringProgress.style.strokeWidth = '8';
                ringProgress.style.filter = 'drop-shadow(0 0 6px rgba(46, 199, 166, 0.4))';
            });
        }
    }
    
    initChartTooltips() {
        const cardValues = document.querySelectorAll('.card-value[data-count]');
        
        cardValues.forEach(value => {
            const card = value.closest('.dashboard-card');
            if (!card) return;
            
            card.addEventListener('mouseenter', () => {
                value.style.transform = 'scale(1.05)';
                value.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                value.style.transform = 'scale(1)';
            });
        });
    }
}

// ============================================
// REAL-TIME DATA SIMULATION
// ============================================

class RealTimeDataSimulator {
    constructor() {
        this.isRunning = false;
        this.intervals = [];
        this.init();
    }
    
    init() {
        // Start simulation when dashboard is visible
        const dashboard = document.querySelector('.dashboard-mockup');
        if (!dashboard) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isRunning) {
                        this.startSimulation();
                    }
                });
            },
            { threshold: 0.3 }
        );
        
        observer.observe(dashboard);
    }
    
    startSimulation() {
        this.isRunning = true;
        
        // Simulate threat counter updates
        this.simulateThreatCounter();
        
        // Simulate new activity feed items
        this.simulateActivityFeed();
        
        // Simulate progress bar updates
        this.simulateProgressBar();
    }
    
    simulateThreatCounter() {
        const threatValue = document.querySelector('.dashboard-card:nth-child(2) .card-value');
        if (!threatValue) return;
        
        const interval = setInterval(() => {
            if (document.hidden) return;
            
            const currentValue = parseInt(threatValue.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 3);
            
            // Animate the update
            threatValue.style.animation = 'countPulse 0.3s ease-in-out';
            setTimeout(() => {
                threatValue.textContent = newValue;
                threatValue.style.animation = '';
            }, 150);
            
            // Update trend
            const trend = threatValue.nextElementSibling;
            if (trend && trend.classList.contains('card-trend')) {
                const percentage = Math.floor(Math.random() * 30) + 10;
                const trendText = trend.querySelector('span');
                if (trendText) {
                    trendText.textContent = `${percentage}% this week`;
                }
            }
        }, 5000);
        
        this.intervals.push(interval);
    }
    
    simulateActivityFeed() {
        const activityFeed = document.querySelector('.activity-feed');
        if (!activityFeed) return;
        
        const activities = [
            'New Claude integration detected',
            'Unusual API call pattern blocked',
            'Model inference spike in Engineering',
            'PII exposure prevented',
            'Rate limit exceeded - Auto-throttled',
            'New Gemini model discovered',
            'Security policy updated',
            'Prompt injection attempt blocked',
            'Token usage anomaly detected'
        ];
        
        const interval = setInterval(() => {
            if (document.hidden) return;
            
            const items = activityFeed.querySelectorAll('.activity-item');
            if (items.length >= 5) {
                // Remove oldest item
                items[items.length - 1].style.animation = 'slideOutFade 0.3s ease-out forwards';
                setTimeout(() => items[items.length - 1].remove(), 300);
            }
            
            // Add new item
            const newActivity = activities[Math.floor(Math.random() * activities.length)];
            const newItem = document.createElement('div');
            newItem.className = 'activity-item';
            newItem.innerHTML = `
                <span class="activity-dot"></span>
                <span class="activity-text">${newActivity}</span>
                <span class="activity-time">Just now</span>
            `;
            newItem.style.animation = 'slideInFade 0.5s ease-out forwards';
            activityFeed.insertBefore(newItem, activityFeed.firstChild);
        }, 8000);
        
        this.intervals.push(interval);
    }
    
    simulateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        if (!progressFill) return;
        
        const interval = setInterval(() => {
            if (document.hidden) return;
            
            const currentWidth = parseInt(progressFill.style.width) || 68;
            const variation = (Math.random() - 0.5) * 5;
            const newWidth = Math.max(60, Math.min(95, currentWidth + variation));
            
            progressFill.style.width = `${newWidth}%`;
        }, 4000);
        
        this.intervals.push(interval);
    }
    
    stop() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        this.isRunning = false;
    }
}

// ============================================
// ADVANCED SVG ANIMATIONS
// ============================================

class AdvancedSVGAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.animateStatusDot();
        this.animateActivityDots();
        this.pulseBadgeDot();
    }
    
    animateStatusDot() {
        const statusDot = document.querySelector('.status-dot');
        if (!statusDot) return;
        
        // Add glow effect
        setInterval(() => {
            if (document.hidden) return;
            
            statusDot.style.animation = 'none';
            setTimeout(() => {
                statusDot.style.animation = 'pulse 2s ease-in-out infinite';
            }, 10);
        }, 2000);
    }
    
    animateActivityDots() {
        const updateDots = () => {
            const dots = document.querySelectorAll('.activity-dot');
            dots.forEach((dot, index) => {
                dot.style.animationDelay = `${index * 0.2}s`;
            });
        };
        
        updateDots();
        
        // Update when new items are added
        const activityFeed = document.querySelector('.activity-feed');
        if (activityFeed) {
            const observer = new MutationObserver(updateDots);
            observer.observe(activityFeed, { childList: true });
        }
    }
    
    pulseBadgeDot() {
        const badgeDot = document.querySelector('.badge-dot');
        if (!badgeDot) return;
        
        // Enhance pulse with color variation
        let hue = 0;
        setInterval(() => {
            if (document.hidden) return;
            
            hue = (hue + 1) % 360;
            const color = `hsl(${160 + (Math.sin(hue * 0.1) * 10)}, 70%, 55%)`;
            badgeDot.style.background = color;
        }, 100);
    }
}

// ============================================
// DASHBOARD METRICS UPDATER
// ============================================

class DashboardMetricsUpdater {
    constructor() {
        this.metrics = {
            modelsTracked: 247,
            threatsBlocked: 1847,
            hiddenSpending: 127000,
            securityCoverage: 92
        };
        
        this.init();
    }
    
    init() {
        const dashboard = document.querySelector('.dashboard-mockup');
        if (!dashboard) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startMetricsUpdate();
                        observer.unobserve(dashboard);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        observer.observe(dashboard);
    }
    
    startMetricsUpdate() {
        // Update models tracked
        setInterval(() => {
            if (document.hidden) return;
            
            const modelsElement = document.querySelector('.dashboard-card:nth-child(1) .card-value');
            if (modelsElement) {
                this.metrics.modelsTracked += Math.floor(Math.random() * 2);
                modelsElement.textContent = this.metrics.modelsTracked;
                modelsElement.style.animation = 'countPulse 0.3s ease-in-out';
                setTimeout(() => modelsElement.style.animation = '', 300);
            }
        }, 10000);
        
        // Update spending
        setInterval(() => {
            if (document.hidden) return;
            
            const spendingElement = document.querySelector('.dashboard-card:nth-child(3) .card-value');
            if (spendingElement) {
                this.metrics.hiddenSpending += Math.floor(Math.random() * 1000);
                const formatted = `$${Math.floor(this.metrics.hiddenSpending / 1000)}K`;
                spendingElement.textContent = formatted;
            }
        }, 7000);
        
        // Update coverage (subtle changes)
        setInterval(() => {
            if (document.hidden) return;
            
            const coverageElement = document.querySelector('.ring-value');
            if (coverageElement) {
                this.metrics.securityCoverage = Math.min(99, this.metrics.securityCoverage + (Math.random() > 0.5 ? 1 : 0));
                coverageElement.textContent = `${this.metrics.securityCoverage}%`;
                
                // Update ring progress
                const ringProgress = document.querySelector('.ring-progress');
                if (ringProgress) {
                    const circumference = 251.2;
                    const offset = circumference - (this.metrics.securityCoverage / 100) * circumference;
                    ringProgress.style.strokeDashoffset = offset;
                }
            }
        }, 15000);
    }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

class PerformanceMonitor {
    constructor() {
        this.checkPerformance();
    }
    
    checkPerformance() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            console.log('Reduced motion preference detected - animations minimized');
        }
        
        // Log page load performance
        window.addEventListener('load', () => {
            if (window.performance && window.performance.timing) {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            }
        });
    }
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add skip to main content
        this.handleSkipLinks();
        
        // Keyboard navigation improvements
        this.improveKeyboardNav();
        
        // Focus management
        this.manageFocus();
        
        // Check for reduced motion
        this.checkReducedMotion();
    }
    
    handleSkipLinks() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
                }
            });
        }
    }
    
    improveKeyboardNav() {
        // Add visible focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }
    
    manageFocus() {
        // Trap focus in mobile menu when open
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && menuToggle) {
            menuToggle.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.contains('active');
                if (isOpen) {
                    const focusableElements = mobileMenu.querySelectorAll('a, button');
                    if (focusableElements.length > 0) {
                        setTimeout(() => focusableElements[0].focus(), 100);
                    }
                }
            });
        }
    }
    
    checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduce-motion');
        }
        
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.documentElement.classList.add('reduce-motion');
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

class FabriskApp {
    constructor() {
        this.components = {};
        this.loadingManager = new LoadingManager();
        this.init();
    }
    
    init() {
        performanceMonitor.mark('appInit');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        try {
            performanceMonitor.mark('componentsStart');
            
            // Initialize all components with error handling
            this.safeInitialize('accessibility', AccessibilityManager);
            this.safeInitialize('lazyLoader', LazyLoader);
            
            // Initialize particle system with canvas element
            const canvas = document.getElementById('particle-canvas');
            if (canvas) {
                this.components.particles = new ParticleSystem(canvas);
            }
            
            this.safeInitialize('scrollAnimations', ScrollAnimations);
            this.safeInitialize('themeToggle', ThemeToggle);
            this.safeInitialize('mobileMenu', MobileMenu);
            this.safeInitialize('smoothScroll', SmoothScroll);
            this.safeInitialize('performanceMonitor', PerformanceMonitor);
            this.safeInitialize('interactiveCharts', InteractiveCharts);
            this.safeInitialize('dataSimulator', RealTimeDataSimulator);
            this.safeInitialize('contactForm', ContactForm);
            
            // Initialize animated counters for dashboard
            this.initializeCounters();
            
            performanceMonitor.measure('Components initialized', 'componentsStart');
            performanceMonitor.measure('Total app initialization', 'appInit');
            
            // Hide loading overlay
            setTimeout(() => {
                this.loadingManager.hide();
            }, 500);
            
            console.log('🚀 Fabrisk initialized successfully');
            
            // Log accessibility features
            console.log('♿ Accessibility features enabled');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.loadingManager.hide();
        }
    }
    
    safeInitialize(name, ComponentClass) {
        try {
            this.components[name] = new ComponentClass();
        } catch (error) {
            console.error(`Failed to initialize ${name}:`, error);
        }
    }
    
    initializeCounters() {
        // Initialize counters for both hero stats and dashboard cards with data-count attribute
        const counterElements = document.querySelectorAll('.stat-value[data-count], .card-value[data-count]');
        
        console.log('🔍 Looking for counter elements...');
        console.log('Found elements:', counterElements.length);
        
        if (counterElements.length > 0) {
            console.log(`✅ Initializing ${counterElements.length} animated counters`);
            counterElements.forEach((element, index) => {
                console.log(`Counter ${index + 1}:`, element, 'data-count:', element.getAttribute('data-count'));
                
                // Force immediate animation after small delay
                setTimeout(() => {
                    new AnimatedCounter(element);
                }, 500 + (index * 100)); // Stagger the animations
            });
        } else {
            console.error('❌ No counter elements found with [data-count] attribute');
            console.log('Checking if .stat-value or .card-value exists:', 
                        document.querySelectorAll('.stat-value, .card-value').length);
        }
    }
}

// Initialize the application
const app = new FabriskApp();
