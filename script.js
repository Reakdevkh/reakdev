
        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use system preference
        const currentTheme = localStorage.getItem('theme') || 
                            (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Set initial theme
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Theme toggle event
        themeToggle.addEventListener('click', () => {
            let theme = 'dark';
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                theme = 'dark';
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                theme = 'light';
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            localStorage.setItem('theme', theme);
        });

        // Page navigation functionality
        const pages = document.querySelectorAll('.page');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function switchPage(pageId) {
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(`page-${pageId}`).classList.add('active');
            
            // Scroll to top of page
            window.scrollTo(0, 0);
            
            // Update active navigation link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Update URL hash
            window.location.hash = pageId;
        }
        
        // Navigation click events
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                switchPage(pageId);
            });
        });
        
        // Check URL hash on load
        window.addEventListener('DOMContentLoaded', () => {
            const hash = window.location.hash.substring(1);
            if (hash && ['profile', 'skills', 'projects', 'contact'].includes(hash)) {
                switchPage(hash);
            } else {
                // Default to profile page
                switchPage('profile');
            }
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message (in a real app, you'd send this to a server)
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });

        // Navbar background opacity on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'var(--nav-bg)';
            } else {
                navbar.style.background = 'var(--nav-bg)';
            }
        });

        // Contact icons click handlers
        document.querySelectorAll('.contact-icon').forEach((icon, index) => {
            icon.addEventListener('click', () => {
                const messages = [
                    'Email: sopheareak.me@gmail.com',
                    'Phone: +855 (86) 926 628 '
                ];
                alert(messages[index]);
            });
        });

        // Initialize animations when elements come into view
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.visibility = 'visible';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.visibility = 'hidden';
            observer.observe(el);
        });


