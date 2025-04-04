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
            // Navbar
            nav_home: "Home",
            nav_research: "Research",
            nav_publications: "Publications",
            nav_academic: "Academic Background",
            nav_contact: "Contact",
            
            // Hero section
            hero_title: "Violeta Hasani Behluli",
            hero_subtitle: "Legal Researcher & Academic",
            hero_paragraph: "Specializing in Criminal Law with focus on Smuggling Offenses",
            view_research: "View Research",
            contact_me: "Contact Me",
            
            // About section
            about_title: "About Me",
            about_paragraph1: "I am a legal researcher and academic focused on criminal law, with special emphasis on smuggling offenses in Kosovo. My research examines the judicial handling of smuggling crimes in the Basic Court of Mitrovica from 2008-2011.",
            about_paragraph2: "This work forms part of my academic studies under the mentorship of Prof. Dr. Azem Hajdari at the University of Prishtina, where I completed my research in 2018.",
            about_paragraph3: "My academic interests include criminal law, international trade regulations, customs law, and judicial practice in Kosovo's developing legal system.",
            years_research: "Years of Research",
            published_papers: "Published Papers",
            academic_degrees: "Academic Degrees",
            
            // Research section
            research_title: "Featured Research",
            research_spotlight_title: "Smuggling as a Criminal Offense with Special Focus on the Territory of the Basic Court of Mitrovica 2008-2011",
            research_mentor: "Mentor: Prof. Dr. Azem Hajdari",
            research_completed: "Completed: 2018",
            research_location: "Prishtina, Kosovo",
            research_description: "This comprehensive study examines the criminal offense of smuggling goods in Kosovo, with a particular focus on cases processed by the Basic Court of Mitrovica between 2008-2011. The research analyzes legal, criminological, and practical aspects of smuggling offenses in the context of Kosovo's developing legal system.",
            key_research_areas: "Key Research Areas:",
            research_area1: "Legal definition of smuggling under Kosovo's Criminal Code",
            research_area2: "Types of customs offenses according to Kosovo's Customs and Excise Code",
            research_area3: "Manifestations of smuggling and its various forms",
            research_area4: "Perpetrators of smuggling offenses and criminal liability",
            research_area5: "Comparative analysis with smuggling legislation in Slovenia, Albania, Montenegro, Serbia, and Croatia",
            research_area6: "Criminological aspects including phenomenology and etiology of smuggling offenses",
            research_area7: "Preventive and repressive measures for combating smuggling crimes",
            request_research: "Request Full Research"
        },
        sq: {
            // Navbar
            nav_home: "Ballina",
            nav_research: "Hulumtimi",
            nav_publications: "Publikimet",
            nav_academic: "Edukimi Akademik",
            nav_contact: "Kontakti",
            
            // Hero section
            hero_title: "Violeta Hasani Behluli",
            hero_subtitle: "Hulumtuese Ligjore & Akademike",
            hero_paragraph: "E specializuar në Ligjin Penal me fokus në Veprat e Kontrabandës",
            view_research: "Shiko Hulumtimin",
            contact_me: "Më Kontakto",
            
            // About section
            about_title: "Rreth Meje",
            about_paragraph1: "Unë jam hulumtuese ligjore dhe akademike e fokusuar në ligjin penal, me theks të veçantë në veprat e kontrabandës në Kosovë. Hulumtimi im shqyrton trajtimin gjyqësor të krimeve të kontrabandës në Gjykatën Themelore të Mitrovicës nga 2008-2011.",
            about_paragraph2: "Kjo punë është pjesë e studimeve të mia akademike nën mentorimin e Prof. Dr. Azem Hajdari në Universitetin e Prishtinës, ku e përfundova hulumtimin tim në vitin 2018.",
            about_paragraph3: "Interesat e mia akademike përfshijnë ligjin penal, rregulloret ndërkombëtare të tregtisë, ligjin doganor dhe praktikën gjyqësore në sistemin zhvillues juridik të Kosovës.",
            years_research: "Vite Hulumtimi",
            published_papers: "Punime të Publikuara",
            academic_degrees: "Diploma Akademike",
            
            // Research section
            research_title: "Hulumtimi i Spikatur",
            research_spotlight_title: "Kontrabanda si Vepër Penale me Fokus të Veçantë në Territorin e Gjykatës Themelore të Mitrovicës 2008-2011",
            research_mentor: "Mentor: Prof. Dr. Azem Hajdari",
            research_completed: "Përfunduar: 2018",
            research_location: "Prishtinë, Kosovë",
            research_description: "Ky studim gjithëpërfshirës shqyrton veprën penale të kontrabandës së mallrave në Kosovë, me fokus të veçantë në rastet e procesuara nga Gjykata Themelore e Mitrovicës midis viteve 2008-2011. Hulumtimi analizon aspektet ligjore, kriminologjike dhe praktike të veprave të kontrabandës në kontekstin e sistemit zhvillues juridik të Kosovës.",
            key_research_areas: "Fushat Kryesore të Hulumtimit:",
            research_area1: "Përkufizimi ligjor i kontrabandës sipas Kodit Penal të Kosovës",
            research_area2: "Llojet e veprave doganore sipas Kodit Doganor dhe të Akcizave të Kosovës",
            research_area3: "Manifestimet e kontrabandës dhe format e saj të ndryshme",
            research_area4: "Kryerësit e veprave të kontrabandës dhe përgjegjësia penale",
            research_area5: "Analizë krahasuese me legjislacionin e kontrabandës në Slloveni, Shqipëri, Mal të Zi, Serbi dhe Kroaci",
            research_area6: "Aspektet kriminologjike përfshirë fenomenologjinë dhe etiologjinë e veprave të kontrabandës",
            research_area7: "Masat parandaluese dhe represive për luftimin e krimeve të kontrabandës",
            request_research: "Kërko Hulumtimin e Plotë"
        }
    };

    window.setLanguage = function(lang) {
        console.log("Setting language to:", lang); // For debugging
        
        // Store the selected language in local storage
        localStorage.setItem('selectedLanguage', lang);
        
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    };

    // Initialize with the saved language or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);
});