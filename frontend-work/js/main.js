// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.5s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.problem-card, .role-card, .feature-card, .step, .story-card, .impact-card').forEach(card => {
    observer.observe(card);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 50);
}

// Trigger counter animation when impact section is in view
const impactSection = document.querySelector('.impact');
const impactStats = document.querySelectorAll('.impact-card h3');
let hasAnimated = false;

const impactObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            const stats = [
                { element: impactStats[0], target: 51000 },
                { element: impactStats[1], target: 500 },
                { element: impactStats[2], target: 320 },
                { element: impactStats[3], target: 9990 }
            ];
            
            stats.forEach(stat => {
                animateCounter(stat.element, stat.target);
            });
            
            hasAnimated = true;
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (impactSection) {
    impactObserver.observe(impactSection);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add keyboard accessibility for FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFAQ(this);
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Form validation helper (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add to cart or similar functionality
function addToCart(productId) {
    console.log('Product ' + productId + ' added to cart');
    // Add actual functionality here
}

// Smooth page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
});

// Add some accessibility features
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #2ecc71';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Mobile responsiveness - hide/show elements as needed
const isMobile = window.matchMedia('(max-width: 768px)').matches;

function handleMediaChange(e) {
    if (e.matches) {
        // Mobile view
        console.log('Mobile view');
    } else {
        // Desktop view
        navMenu.classList.remove('active');
    }
}

window.matchMedia('(max-width: 768px)').addListener(handleMediaChange);

// Prevent layout shift
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.dataset.loading === 'false' || !this.dataset.loading) {
            // Could add loading state here
            // this.textContent = 'Loading...';
            // this.disabled = true;
        }
    });
});

// Print functionality (optional)
function printPage() {
    window.print();
}

// Download functionality (optional)
function downloadPDF() {
    console.log('Starting PDF download...');
    // Implement PDF generation here using libraries like jsPDF or html2pdf
}

// Export functions for external use
window.scrollToSection = scrollToSection;
window.toggleFAQ = toggleFAQ;
window.validateEmail = validateEmail;
window.addToCart = addToCart;
window.printPage = printPage;
window.downloadPDF = downloadPDF;

// Initialize on page load
console.log('KrishiRakshak Platform loaded successfully!');
