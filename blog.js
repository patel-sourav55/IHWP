// Pure Wellness - Blog Functionality

class BlogManager {
    constructor() {
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.postsPerPage = 9;
        this.allPosts = this.getAllPosts();
        this.init();
    }

    init() {
        this.bindEvents();
        this.filterPosts();
    }

    bindEvents() {
        // Category filters
        const categoryFilters = document.querySelectorAll('.blog-category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                // Remove active class from all filters
                categoryFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                e.target.classList.add('active');
                
                this.currentCategory = e.target.dataset.category;
                this.filterPosts();
            });
        });

        // Search functionality
        const searchInput = document.getElementById('blog-search-input');
        const searchBtn = document.getElementById('blog-search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput ? searchInput.value : '';
                this.searchPosts(query);
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('blog-newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(newsletterForm);
            });
        }
    }

    getAllPosts() {
        return [
            {
                id: 1,
                title: '10 Superfoods to Boost Your Immune System',
                author: 'Dr. Sarah Chen',
                date: 'March 15, 2024',
                category: 'nutrition',
                readTime: '4 min read',
                excerpt: 'Discover the power of nutrient-dense superfoods and learn how to incorporate them into your daily meals for optimal health and immunity.',
                image: '🥗',
                featured: false
            },
            {
                id: 2,
                title: 'The Complete Guide to Hydration',
                author: 'Emma Thompson',
                date: 'March 12, 2024',
                category: 'nutrition',
                readTime: '6 min read',
                excerpt: 'Learn about the importance of proper hydration, how much water you really need, and creative ways to stay hydrated throughout the day.',
                image: '💧',
                featured: false
            },
            {
                id: 3,
                title: 'Building Strength at Home: No Equipment Needed',
                author: 'James Wilson',
                date: 'March 10, 2024',
                category: 'fitness',
                readTime: '7 min read',
                excerpt: 'Discover effective bodyweight exercises and routines that can help you build strength and muscle without any equipment or gym membership.',
                image: '💪',
                featured: false
            },
            {
                id: 4,
                title: 'Yoga for Beginners: Your First Steps',
                author: 'Maria Santos',
                date: 'March 8, 2024',
                category: 'fitness',
                readTime: '5 min read',
                excerpt: 'Start your yoga journey with confidence. Learn basic poses, breathing techniques, and how to create a sustainable practice that fits your lifestyle.',
                image: '🧘‍♀️',
                featured: false
            },
            {
                id: 5,
                title: 'Managing Anxiety: Practical Strategies That Work',
                author: 'Dr. Lisa Park',
                date: 'March 5, 2024',
                category: 'mental-health',
                readTime: '8 min read',
                excerpt: 'Explore evidence-based techniques for managing anxiety, from breathing exercises to cognitive strategies that can help you regain control and find peace.',
                image: '🧠',
                featured: false
            },
            {
                id: 6,
                title: 'Sleep Hygiene: Your Path to Better Rest',
                author: 'Michael Rodriguez',
                date: 'March 3, 2024',
                category: 'mental-health',
                readTime: '6 min read',
                excerpt: 'Improve your sleep quality with proven sleep hygiene techniques. Learn about creating the perfect sleep environment and establishing healthy bedtime routines.',
                image: '😴',
                featured: false
            },
            {
                id: 7,
                title: 'Creating a Sustainable Wellness Routine',
                author: 'Dr. Sarah Chen',
                date: 'March 1, 2024',
                category: 'lifestyle',
                readTime: '9 min read',
                excerpt: 'Learn how to build a wellness routine that actually sticks. Discover the psychology of habit formation and practical strategies for long-term success.',
                image: '🌱',
                featured: false
            },
            {
                id: 8,
                title: 'Digital Wellness: Finding Balance in a Connected World',
                author: 'Emma Thompson',
                date: 'February 28, 2024',
                category: 'lifestyle',
                readTime: '7 min read',
                excerpt: 'Navigate the digital age mindfully. Learn strategies for managing screen time, reducing digital stress, and maintaining healthy relationships with technology.',
                image: '📱',
                featured: false
            },
            {
                id: 9,
                title: 'Morning Routines That Set You Up for Success',
                author: 'James Wilson',
                date: 'February 25, 2024',
                category: 'wellness-tips',
                readTime: '5 min read',
                excerpt: 'Transform your mornings with science-backed routines that boost energy, improve focus, and create a positive foundation for your entire day.',
                image: '🌅',
                featured: false
            },
            {
                id: 10,
                title: 'Goal Setting for Wellness: A Step-by-Step Guide',
                author: 'Maria Santos',
                date: 'February 22, 2024',
                category: 'wellness-tips',
                readTime: '6 min read',
                excerpt: 'Set and achieve your wellness goals with our comprehensive guide. Learn about SMART goals, tracking progress, and staying motivated throughout your journey.',
                image: '🎯',
                featured: false
            },
            {
                id: 11,
                title: 'The Science of Mindful Eating: Transform Your Relationship with Food',
                author: 'Dr. Sarah Chen',
                date: 'March 18, 2024',
                category: 'nutrition',
                readTime: '5 min read',
                excerpt: 'Discover how mindful eating can revolutionize your relationship with food, improve digestion, and help you develop a healthier approach to nutrition that goes beyond just what you eat.',
                image: '🍎',
                featured: true
            }
        ];
    }

    filterPosts() {
        const grid = document.getElementById('blog-posts-grid');
        if (!grid) return;

        let filteredPosts = this.allPosts.filter(post => {
            if (this.currentCategory === 'all') return true;
            return post.category === this.currentCategory;
        });

        // Remove featured posts from regular grid
        filteredPosts = filteredPosts.filter(post => !post.featured);

        // Clear existing posts
        grid.innerHTML = '';

        // Display posts
        filteredPosts.forEach(post => {
            const postElement = this.createPostElement(post);
            grid.appendChild(postElement);
        });

        // Update pagination
        this.updatePagination(filteredPosts.length);
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'blog-post card';
        postDiv.dataset.category = post.category;
        
        postDiv.innerHTML = `
            <div style="background: var(--bg-gradient); height: 150px; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: var(--text-white); font-size: 3rem; margin-bottom: var(--spacing-md);">
                ${post.image}
            </div>
            <h4>${post.title}</h4>
            <p style="font-size: 0.875rem; color: var(--text-light); margin-bottom: var(--spacing-sm);">
                By ${post.author} • ${post.date}
            </p>
            <p style="margin-bottom: var(--spacing-md);">
                ${post.excerpt}
            </p>
            <div style="margin-bottom: var(--spacing-md);">
                <span style="background: var(--bg-tertiary); padding: var(--spacing-xs) var(--spacing-sm); border-radius: var(--radius-sm); font-size: 0.875rem; margin-right: var(--spacing-sm);">${this.formatCategory(post.category)}</span>
                <span style="background: var(--bg-tertiary); padding: var(--spacing-xs) var(--spacing-sm); border-radius: var(--radius-sm); font-size: 0.875rem;">${post.readTime}</span>
            </div>
            <a href="#" class="btn btn-primary btn-small" data-post-id="${post.id}">Read More</a>
        `;

        // Add click handler for read more button
        const readMoreBtn = postDiv.querySelector('a[data-post-id]');
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openPost(post.id);
        });

        return postDiv;
    }

    formatCategory(category) {
        const categoryMap = {
            'nutrition': 'Nutrition',
            'fitness': 'Fitness',
            'mental-health': 'Mental Health',
            'lifestyle': 'Lifestyle',
            'wellness-tips': 'Wellness Tips'
        };
        return categoryMap[category] || category;
    }

    searchPosts(query) {
        const grid = document.getElementById('blog-posts-grid');
        if (!grid) return;

        const searchResults = document.getElementById('blog-search-results');
        
        if (!query.trim()) {
            this.filterPosts();
            if (searchResults) searchResults.innerHTML = '';
            return;
        }

        const filteredPosts = this.allPosts.filter(post => {
            const searchText = `${post.title} ${post.excerpt} ${post.author}`.toLowerCase();
            return searchText.includes(query.toLowerCase()) && !post.featured;
        });

        // Clear existing posts
        grid.innerHTML = '';

        if (filteredPosts.length === 0) {
            grid.innerHTML = `
                <div class="card text-center" style="grid-column: 1 / -1;">
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or browse our categories.</p>
                </div>
            `;
        } else {
            filteredPosts.forEach(post => {
                const postElement = this.createPostElement(post);
                grid.appendChild(postElement);
            });
        }

        // Update search results display
        if (searchResults) {
            searchResults.innerHTML = `
                <p style="font-size: 0.875rem; color: var(--text-light);">
                    Found ${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} for "${query}"
                </p>
            `;
        }
    }

    updatePagination(totalPosts) {
        const totalPages = Math.ceil(totalPosts / this.postsPerPage);
        
        // For now, we'll just show a simple pagination
        // In a real application, you'd implement proper pagination logic
        if (totalPages > 1) {
            // Update pagination buttons if they exist
            const paginationContainer = document.querySelector('.flex-center');
            if (paginationContainer && paginationContainer.querySelector('.btn')) {
                // Update pagination logic here
            }
        }
    }

    openPost(postId) {
        // In a real application, this would navigate to the full article
        // For now, we'll show a toast message
        const post = this.allPosts.find(p => p.id === postId);
        if (post) {
            window.PureWellness.showToast(`Opening article: "${post.title}"`, 'success');
        }
    }

    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button[type="submit"]');
        
        if (!window.PureWellness.validateForm(form)) {
            return;
        }

        window.PureWellness.setButtonLoading(button, true);
        
        // Simulate API call
        setTimeout(() => {
            window.PureWellness.setButtonLoading(button, false);
            window.PureWellness.showToast('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
        }, 2000);
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});
