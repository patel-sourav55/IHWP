// Pure Wellness - Main JavaScript

// DOM Elements
const navbar = document.getElementById('navbar');
const navbarMenu = document.getElementById('navbar-menu');
const navbarToggle = document.getElementById('navbar-toggle');
const toastContainer = document.getElementById('toast-container');

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Navigation Functions
const initNavigation = () => {
    // Mobile menu toggle
    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });

    // Navbar scroll effect
    const handleScroll = debounce(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
};

// Smooth Scrolling
const initSmoothScrolling = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Toast Notification System
const showToast = (message, type = 'success', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
};

// Form Validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const errorElement = input.parentNode.querySelector('.form-error');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        
        // Validate input
        if (!input.value.trim()) {
            isValid = false;
            showFieldError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showFieldError(input, 'Please enter a valid email address');
        } else if (input.type === 'tel' && !isValidPhone(input.value)) {
            isValid = false;
            showFieldError(input, 'Please enter a valid phone number');
        }
    });
    
    return isValid;
};

const showFieldError = (input, message) => {
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = 'var(--accent-color)';
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Loading Button
const setButtonLoading = (button, isLoading) => {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> Loading...';
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || 'Submit';
    }
};

// Local Storage Utilities
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage not available');
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Local storage not available');
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Local storage not available');
        }
    }
};

// Intersection Observer for Animations
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .section > .container > h2, .section > .container > p');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Dark Mode Toggle
const initDarkMode = () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved theme preference
        const savedTheme = storage.get('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            darkModeToggle.checked = savedTheme === 'dark';
        }
        
        darkModeToggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            storage.set('theme', theme);
        });
    }
};

// Search Functionality
const initSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        const debouncedSearch = debounce((query) => {
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            // Simulate search results
            const mockResults = [
                { title: 'Meditation Techniques', url: 'practices.html', type: 'Practice' },
                { title: 'Nutrition Guide', url: 'resources.html', type: 'Resource' },
                { title: 'Wellness Assessment', url: 'quiz.html', type: 'Assessment' },
                { title: 'About Our Philosophy', url: 'about.html', type: 'About' }
            ];
            
            const filteredResults = mockResults.filter(result => 
                result.title.toLowerCase().includes(query.toLowerCase())
            );
            
            displaySearchResults(filteredResults);
        }, 300);
        
        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }
};

const displaySearchResults = (results) => {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found</p>';
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result">
            <h4><a href="${result.url}">${result.title}</a></h4>
            <p>${result.type}</p>
        </div>
    `).join('');
};

// Newsletter Signup
const initNewsletterSignup = () => {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            const button = newsletterForm.querySelector('button[type="submit"]');
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            setButtonLoading(button, true);
            
            // Simulate API call
            setTimeout(() => {
                setButtonLoading(button, false);
                showToast('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
            }, 2000);
        });
    }
};

// Initialize all functionality
const init = () => {
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initDarkMode();
    initSearch();
    initNewsletterSignup();
    
    // Show welcome message for first-time visitors
    if (!storage.get('visited')) {
        setTimeout(() => {
            showToast('Welcome to Pure Wellness! Start your journey to better health today.', 'success', 5000);
            storage.set('visited', true);
        }, 1000);
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for use in other scripts
window.PureWellness = {
    showToast,
    validateForm,
    setButtonLoading,
    storage,
    debounce
};
