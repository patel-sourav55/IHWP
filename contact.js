// Pure Wellness - Contact Form Functionality

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.setupFormValidation();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    setupFormValidation() {
        // Add custom validation messages
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(input, this.getValidationMessage(input));
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Name validation
        if (field.name === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }

        // Message validation
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = 'var(--accent-color)';
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    getValidationMessage(field) {
        const messages = {
            name: 'Please enter your full name',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            message: 'Please enter your message'
        };
        
        return messages[field.name] || 'This field is required';
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            window.PureWellness.showToast('Please correct the errors in the form', 'error');
            return;
        }

        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        window.PureWellness.setButtonLoading(submitButton, true);

        try {
            // Simulate form submission
            const formData = this.getFormData();
            
            // In a real application, you would send this data to your server
            await this.submitFormData(formData);
            
            // Success
            window.PureWellness.showToast('Thank you for your message! We\'ll get back to you within 24 hours.', 'success', 5000);
            this.form.reset();
            
            // Track form submission
            this.trackFormSubmission(formData);
            
        } catch (error) {
            console.error('Form submission error:', error);
            window.PureWellness.showToast('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            window.PureWellness.setButtonLoading(submitButton, false);
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    async submitFormData(data) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional failures for demo purposes
                if (Math.random() < 0.1) {
                    reject(new Error('Network error'));
                } else {
                    resolve(data);
                }
            }, 2000);
        });
    }

    trackFormSubmission(data) {
        // Track form submission for analytics
        const submissionData = {
            timestamp: new Date().toISOString(),
            service: data.service || 'general',
            hasNewsletter: data.newsletter === 'on',
            formType: 'contact'
        };
        
        // Store in local storage for demo purposes
        const submissions = window.PureWellness.storage.get('form_submissions') || [];
        submissions.push(submissionData);
        window.PureWellness.storage.set('form_submissions', submissions);
        
        // In a real application, you would send this to your analytics service
        console.log('Form submission tracked:', submissionData);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    initSmoothScrolling();
});
