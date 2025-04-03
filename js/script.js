document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    nav.classList.remove('active');
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Scroll spy for active nav links
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would normally send the data to a server
            // For now, let's just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would normally send the data to a server
            alert('Thank you for subscribing to my newsletter!');
            
            // Reset the form
            this.reset();
        });
    }

    // Fjalor për përkthime
    const translations = {
        en: {
            hero_title: "Violeta Hasani Behluli",
            hero_subtitle: "Legal Researcher & Academic",
            hero_paragraph: "Specializing in Criminal Law with focus on Smuggling Offenses",
            // shto më shumë çelësa dhe përkthime për secilin tekst...
        },
        sq: {
            hero_title: "Violeta Hasani Behluli",
            hero_subtitle: "Hulumtuese Ligjore & Akademike",
            hero_paragraph: "Specializohem në Ligjin Penal me fokus në Krimet e Pirave",
            // përkthe çdo tekst sipas nevojës...
        }
    };

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    // Shto një ekzecutim fillestar, p.sh. në gjuhën angleze
    setLanguage('en');
});