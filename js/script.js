document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('header').classList.add('scrolled');
        } else {
            document.querySelector('header').classList.remove('scrolled');
        }
    });
    
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.hash !== '') {
                    e.preventDefault();
                    const hash = this.hash;
                    
                    document.querySelector(hash).scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    nav.classList.remove('active');
                }
            });
        });
    });
    
