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
    
    // Define API base URL based on environment
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8888/.netlify/functions'
        : 'https://violetahasani.netlify.app/.netlify/functions';

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
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Create error display element if it doesn't exist
            let errorDisplay = document.getElementById('contact-error-message');
            if (!errorDisplay) {
                errorDisplay = document.createElement('div');
                errorDisplay.id = 'contact-error-message';
                errorDisplay.style.color = 'red';
                errorDisplay.style.marginTop = '15px';
                errorDisplay.style.padding = '10px';
                errorDisplay.style.borderRadius = '5px';
                errorDisplay.style.backgroundColor = 'rgba(255,0,0,0.1)';
                errorDisplay.style.display = 'none';
                contactForm.appendChild(errorDisplay);
            }
            
            // Clear previous error
            errorDisplay.style.display = 'none';
            
            // Send data to server
            fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    contactForm.reset();
                } else {
                    errorDisplay.textContent = data.message || 'An error occurred. Please try again later.';
                    errorDisplay.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorDisplay.textContent = `Error: ${error.message}`;
                errorDisplay.style.display = 'block';
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
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
            
            // Show loading state
            const submitButton = this.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Create error display element if it doesn't exist
            let errorDisplay = document.getElementById('newsletter-error-message');
            if (!errorDisplay) {
                errorDisplay = document.createElement('div');
                errorDisplay.id = 'newsletter-error-message';
                errorDisplay.style.color = 'red';
                errorDisplay.style.marginTop = '15px';
                errorDisplay.style.padding = '10px';
                errorDisplay.style.borderRadius = '5px';
                errorDisplay.style.backgroundColor = 'rgba(255,0,0,0.1)';
                errorDisplay.style.display = 'none';
                this.appendChild(errorDisplay);
            }
            
            // Clear previous error
            errorDisplay.style.display = 'none';
            
            // Send data to server
            fetch(`${API_BASE_URL}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    this.reset();
                } else {
                    errorDisplay.textContent = data.message || 'An error occurred. Please try again later.';
                    errorDisplay.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorDisplay.textContent = `Error: ${error.message}`;
                errorDisplay.style.display = 'block';
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

    // Fjalor për përkthime
    const translations = {
        en: {
            // Navbar
            nav_home: "Home",
            nav_research: "Research",
            nav_academic: "Academic Background",
            nav_contact: "Contact",
            
            // Hero section
            hero_title: "Violeta Hasani",
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
            request_research: "Request Full Research",

            // Academic Background section
            academic_title: "Academic Background",
            academic1_title: "Master of Laws in Criminal Law",
            academic1_date: "2016 - 2018",
            academic1_location: "University of Prishtina, Kosovo",
            academic1_description: "Completed master's thesis on smuggling offenses under the mentorship of Prof. Dr. Azem Hajdari.",
            academic2_title: "Bachelor of Laws",
            academic2_date: "2012 - 2016",
            academic2_location: "University of Prishtina, Kosovo",
            academic2_description: "Focused on criminal law and international law courses. Graduated with honors.",
            academic3_title: "Legal Research Training",
            academic3_date: "Summer 2017",
            academic3_location: "European University Institute, Florence, Italy",
            academic3_description: "Intensive summer program on legal research methodologies and comparative criminal law.",
            
            // Contact section
            contact_title: "Contact Me",
            contact_get_in_touch: "Get in Touch",
            contact_paragraph: "If you're interested in my research, academic collaborations, or have inquiries about my work, please feel free to contact me using the form or through the following contact details:",
            contact_email: "violeta.hasani@dogana-rks.gov",
            contact_phone: "+383 45 198 420",
            contact_address: "Faculty of Law, University of Prishtina, Kosovo",
            contact_form_name: "Name",
            contact_form_email: "Email",
            contact_form_subject: "Subject",
            contact_form_message: "Message",
            contact_form_submit: "Send Message",
            
            // Footer section
            footer_logo_title: "Violeta Hasani",
            footer_logo_subtitle: "Legal Researcher & Academic",
            footer_links_title: "Quick Links",
            footer_link_home: "Home",
            footer_link_research: "Research",
            footer_link_publications: "Publications",
            footer_link_academic: "Academic Background",
            footer_link_contact: "Contact",
            footer_newsletter_title: "Stay Updated",
            footer_newsletter_paragraph: "Subscribe to receive updates on my latest research and publications",
            footer_newsletter_submit: "Subscribe",
            footer_bottom: "© 2025 Violeta Hasani. All rights reserved."
        },
        sq: {
            // Navbar
            nav_home: "Ballina",
            nav_research: "Hulumtimi",
            nav_academic: "Edukimi Akademik",
            nav_contact: "Kontakti",
            
            // Hero section
            hero_title: "Violeta Hasani",
            hero_subtitle: "Hulumtuese Ligjore & Akademike",
            hero_paragraph: "E specializuar në Ligjin Penal me fokus në veprat e kontrabandës",
            view_research: "Shiko Hulumtimin",
            contact_me: "Më kontakto",
            
            // About section
            about_title: "Rreth meje",
            about_paragraph1: "Unë jam hulumtuese ligjore dhe akademike e fokusuar në ligjin penal, me theks të veçantë në veprat e kontrabandës në Kosovë. Hulumtimi im shqyrton trajtimin gjyqësor të krimeve të kontrabandës në Gjykatën Themelore të Mitrovicës nga 2008-2011.",
            about_paragraph2: "Kjo punë është pjesë e studimeve të mia akademike nën mentorimin e Prof. Dr. Azem Hajdari në Universitetin e Prishtinës, ku e përfundova hulumtimin tim në vitin 2018.",
            about_paragraph3: "Interesat e mia akademike përfshijnë ligjin penal, rregulloret ndërkombëtare të tregtisë, ligjin doganor dhe praktikën gjyqësore në sistemin zhvillues juridik të Kosovës.",
            years_research: "Vite hulumtimi",
            published_papers: "Punime të publikuara",
            academic_degrees: "Diploma akademike",
            
            // Research section
            research_title: "Hulumtimi i spikatur",
            research_spotlight_title: "Kontrabanda si vepër penale me fokus të veçantë në territorin e Gjykatës Themelore të Mitrovicës 2008-2011",
            research_mentor: "Mentor: Prof. Dr. Azem Hajdari",
            research_completed: "Përfunduar: 2018",
            research_location: "Prishtinë, Kosovë",
            research_description: "Ky studim gjithëpërfshirës shqyrton veprën penale të kontrabandës së mallrave në Kosovë, me fokus të veçantë në rastet e procesuara nga Gjykata Themelore e Mitrovicës midis viteve 2008-2011. Hulumtimi analizon aspektet ligjore, kriminologjike dhe praktike të veprave të kontrabandës në kontekstin e sistemit zhvillues juridik të Kosovës.",
            key_research_areas: "Fushat kryesore të hulumtimit:",
            research_area1: "Përkufizimi ligjor i kontrabandës sipas Kodit Penal të Kosovës",
            research_area2: "Llojet e veprave doganore sipas Kodit Doganor dhe të Akcizave të Kosovës",
            research_area3: "Manifestimet e kontrabandës dhe format e saj të ndryshme",
            research_area4: "Kryerësit e veprave të kontrabandës dhe përgjegjësia penale",
            research_area5: "Analizë krahasuese me legjislacionin e kontrabandës në Slloveni, Shqipëri, Mal të Zi, Serbi dhe Kroaci",
            research_area6: "Aspektet kriminologjike përfshirë fenomenologjinë dhe etiologjinë e veprave të kontrabandës",
            research_area7: "Masat parandaluese dhe represive për luftimin e krimeve të kontrabandës",
            request_research: "Kërko hulumtimin e plotë",

            // Academic Background section
            academic_title: "Edukimi Akademik",
            academic1_title: "Master në Ligjin Penal",
            academic1_date: "2016 - 2018",
            academic1_location: "Universiteti i Prishtinës, Kosovë",
            academic1_description: "Përfundova tezën e masterit mbi krimet e kontrabandës nën mentorimin e Prof. Dr. Azem Hajdari.",
            academic2_title: "Bachelor në Ligje",
            academic2_date: "2012 - 2016",
            academic2_location: "Universiteti i Prishtinës, Kosovë",
            academic2_description: "Fokus në ligjin penal dhe ligjin ndërkombëtar. U diplomova me lavdërime.",
            academic3_title: "Trajnim në Hulumtimin Ligjor",
            academic3_date: "Veri 2017",
            academic3_location: "Instituti Evropian i Universitetit, Florence, Itali",
            academic3_description: "Program intensiv veror mbi metodologjitë e hulumtimit ligjor dhe ligjin krahasues penal.",
            
            // Contact section
            contact_title: "Kontakti",
            contact_get_in_touch: "Më kontaktoni",
            contact_paragraph: "Nëse jeni të interesuar për hulumtimin tim, bashkëpunime akademike, ose keni pyetje rreth punës sime, ju lutem kontaktoni me mua përmes formularit ose me anë të detajeve të mëposhtme:",
            contact_email: "violeta.hasani@dogana-rks.gov",
            contact_phone: "+383 45 198 420",
            contact_address: "Fakulteti i Drejtësisë, Universiteti i Prishtinës, Kosovë",
            contact_form_name: "Emri",
            contact_form_email: "Email",
            contact_form_subject: "Subjekti",
            contact_form_message: "Mesazhi",
            contact_form_submit: "Dërgo mesazhin",
            
            // Footer section
            footer_logo_title: "Violeta Hasani",
            footer_logo_subtitle: "Hulumtuese Ligjore & Akademike",
            footer_links_title: "Lidhje të shpejta",
            footer_link_home: "Ballina",
            footer_link_research: "Hulumtimi",
            footer_link_publications: "Publikimet",
            footer_link_academic: "Edukimi Akademik",
            footer_link_contact: "Kontakti",
            footer_newsletter_title: "Qëndro i informuar",
            footer_newsletter_paragraph: "Abonohu për të marrë lajmet e fundit mbi hulumtimin dhe publikimet e mia",
            footer_newsletter_submit: "Abonohu",
            footer_bottom: "© 2025 Violeta Hasani. Të gjitha të drejtat janë të rezervuara."
        }
    };

    window.setLanguage = function(lang) {
        console.log("Setting language to:", lang); // For debugging
        
        // Ruaj gjuhën e zgjedhur në local storage
        localStorage.setItem('selectedLanguage', lang);
        
        // Përditëso elementet me atributin data-i18n
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