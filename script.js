        // Initialize AOS
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-in-out'
        });

        // DOM Elements
        const header = document.getElementById('header');
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        const themeToggle = document.getElementById('theme-toggle');
        const backToTop = document.getElementById('backToTop');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const modalBtns = document.querySelectorAll('.portfolio-btn');
        const modals = document.querySelectorAll('.modal');
        const modalCloses = document.querySelectorAll('.modal-close');
        const contactForm = document.getElementById('contactForm');

        // Check for saved theme preference or prefer-color-scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }

        // Toggle Theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.querySelector('i').classList.remove('fa-moon');
                themeToggle.querySelector('i').classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.querySelector('i').classList.remove('fa-sun');
                themeToggle.querySelector('i').classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Sticky Header
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }

            // Back to Top Button
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Mobile Menu Toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Portfolio Filter
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Modal functionality
        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal');
                document.getElementById(`modal-${modalId}`).classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = 'auto';
            });
        });

        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Back to Top Button
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form Validation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form submission success (in real implementation, you would send data to server)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
        
        // Email validation helper function
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // Lazy load portfolio images
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const image = entry.target;
                            const src = image.getAttribute('data-src');
                            if (src) {
                                image.src = src;
                                image.removeAttribute('data-src');
                            }
                            imageObserver.unobserve(image);
                        }
                    });
                });
                
                images.forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback for browsers that don't support Intersection Observer
                images.forEach(img => {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                    }
                });
            }
        });