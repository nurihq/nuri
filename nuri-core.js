/* ===========================
   NURI ぬり — Script
   =========================== */

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    body.classList.add('light-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const newTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
    });
}

// ===== Navigation scroll effect =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    navLinks.classList.contains('open')
        ? spans.forEach((s, i) => {
            if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (i === 1) s.style.opacity = '0';
            if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        })
        : spans.forEach(s => {
            s.style.transform = '';
            s.style.opacity = '';
        });
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity = '';
        });
    });
});

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings in the same parent
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Contact form =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
// Check for success fragment in URL
if (window.location.hash === '#success') {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Remove hash from URL to prevent popping up again on refresh
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
}

// Close modal logic
const closeModalBtn = document.getElementById('closeModal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        document.getElementById('successModal').classList.add('hidden');
    });
}

// Close modal on outside click
const modalOverlay = document.getElementById('successModal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });
}

// ===== Subtle parallax on hero orbs =====
window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    if (orb1) orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    if (orb2) orb2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
}, { passive: true });

// ===== Portfolio Carousel =====
const portfolioGrid = document.getElementById('portfolioGrid');
const portfolioPrev = document.getElementById('portfolioPrev');
const portfolioNext = document.getElementById('portfolioNext');

if (portfolioGrid && portfolioPrev && portfolioNext) {
    const getScrollAmount = () => {
        // Scroll by the width of one card plus its gap
        const firstCard = portfolioGrid.querySelector('.portfolio-card');
        if (!firstCard) return 300;
        const style = window.getComputedStyle(portfolioGrid);
        const gap = parseFloat(style.gap) || 28;
        return firstCard.offsetWidth + gap;
    };

    const updateArrowVisibility = () => {
        const { scrollLeft, scrollWidth, clientWidth } = portfolioGrid;

        // Hide prev arrow if at the very beginning
        if (scrollLeft <= 5) { // 5px buffer
            portfolioPrev.style.opacity = '0';
            portfolioPrev.style.pointerEvents = 'none';
        } else {
            portfolioPrev.style.opacity = '1';
            portfolioPrev.style.pointerEvents = 'auto';
        }

        // Hide next arrow if at the very end
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
            portfolioNext.style.opacity = '0';
            portfolioNext.style.pointerEvents = 'none';
        } else {
            portfolioNext.style.opacity = '1';
            portfolioNext.style.pointerEvents = 'auto';
        }
    };

    portfolioPrev.addEventListener('click', () => {
        portfolioGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    portfolioNext.addEventListener('click', () => {
        portfolioGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Listen to scroll events to update arrows dynamically
    portfolioGrid.addEventListener('scroll', updateArrowVisibility, { passive: true });

    // Also update on window resize in case of layout changes
    window.addEventListener('resize', updateArrowVisibility, { passive: true });

    // Initial check
    updateArrowVisibility();
}
const nuriTranslations = {
    ge: {
        "Nuri ぬり": "Nuri ぬり",
        "Web Development Studio": "ვებ დეველოპმენტის სტუდია",
        "We paint the web with purpose.": "ჩვენ ვქმნით ვებს მიზანმიმართულად.",
        "Premium websites crafted for businesses that demand excellence — beautiful design, flawless performance, and results that matter.": "პრემიუმ ვებსაიტები, შექმნილი ბიზნესებისთვის, რომლებიც ითხოვენ სრულყოფილებას — ლამაზი დიზაინი, უზადო წარმადობა და მნიშვნელოვანი შედეგები.",
        "View Our Work": "ნახეთ ჩვენი ნამუშევრები",
        "Start a Project": "დაიწყეთ პროექტი",
        "About": "ჩვენ შესახებ",
        "Portfolio": "პორტფოლიო",
        "Services": "სერვისები",
        "Pricing": "ფასები",
        "Get in Touch": "დაგვიკავშირდით",
        "Crafting digital experiences that leave a mark.": "ვქმნით ციფრულ გამოცდილებას, რომელიც ტოვებს კვალს.",
        "From local restaurants to growing businesses, we deliver bespoke web solutions with meticulous attention to detail, fast load times, and designs that convert visitors into customers.": "ადგილობრივი რესტორნებიდან დაწყებული, მზარდი ბიზნესებით დამთავრებული, ჩვენ ვქმნით მორგებულ ვებ-გადაწყვეტილებებს დეტალებზე ზედმიწევნითი ყურადღებით, სწრაფი ჩატვირთვის დროით და დიზაინით, რომელიც ვიზიტორებს მომხმარებლებად აქცევს.",
        "Custom Design": "მორგებული დიზაინი",
        "Performance First": "პირველ რიგში წარმადობა",
        "Passion for Craft": "საქმისადმი ვნება",
        "Sites we've brought to life.": "საიტები, რომლებიც ჩვენ გავაცოცხლეთ.",
        "Each project is built from scratch — no templates, no shortcuts. Just clean code and thoughtful design.": "თითოეული პროექტი იქმნება ნულიდან — არანაირი შაბლონები. მხოლოდ სუფთა კოდი და გააზრებული დიზაინი.",
        "Your Project Here": "თქვენი პროექტი აქ",
        "Ready to build something exceptional? Let's talk.": "დაელაპარაკეთ ჩვენს გუნდს და დავიწყოთ ახალი პროექტი.",
        "Get Started": "დაწყება",
        "Everything you need to succeed online.": "ყველაფერი, რაც გჭირდებათ ონლაინ წარმატებისთვის.",
        "Web Development": "ვებ დეველოპმენტი",
        "Responsive & Mobile": "მორგებული და მობილური",
        "Hosting & Deployment": "ჰოსტინგი და დეპლოიმენტი",
        "SEO Optimisation": "SEO ოპტიმიზაცია",
        "Ongoing Support": "მუდმივი მხარდაჭერა",
        "Bespoke visual identities and interfaces tailored to your brand — no templates, no compromises.": "თქვენს ბრენდზე მორგებული ვიზუალური იდენტობა — არანაირი კომპრომისი.",
        "Clean, modern code built for speed, accessibility, and long-term maintainability.": "სუფთა, თანამედროვე კოდი შექმნილია სისწრაფის, ხელმისაწვდომობისა და გრძელვადიანი შენარჩუნებისთვის.",
        "Pixel-perfect experiences across every device — from desktop to the smallest screen.": "იდეალური გამოცდილება ნებისმიერ მოწყობილობაზე.",
        "Fast, reliable hosting setup with continuous deployment — your site is always live and up to date.": "სწრაფი, საიმედო ჰოსტინგის დაყენება მუდმივი განახლებით — თქვენი საიტი ყოველთვის ცოცხალია.",
        "Built-in best practices to help your business get found by the right people at the right time.": "შექმნილია საუკეთესო პრაქტიკით, რათა დაეხმაროს თქვენს ბიზნესს სწორ დროს სწორმა ადამიანებმა იპოვონ.",
        "Updates, improvements, and peace of mind — we're here long after launch day.": "განახლებები, გაუმჯობესებები და სიმშვიდე — ჩვენ აქ ვართ თქვენი საიტის გაშვების შემდეგაც.",
        "Simple, transparent investment.": "მარტივი, გამჭვირვალე ინვესტიცია.",
        "Professional web development shouldn't be complicated. We offer a clear path to getting online and staying there.": "პროფესიონალური ვებ დეველოპმენტი არ უნდა იყოს რთული.",
        "Design & Build": "დიზაინი და შექმნა",
        "/one-time": "/ერთჯერადი",
        "Custom Design & Development": "მორგებული დიზაინი და დეველოპმენტი",
        "Responsive Mobile Layout": "მობილური ლეიაუტი",
        "SEO Optimization": "SEO ოპტიმიზაცია",
        "Domain Configuration": "დომენის კონფიგურაცია",
        "Launch Support": "გაშვების მხარდაჭერა",
        "Care & Hosting": "მხარდაჭერა და ჰოსტინგი",
        "/month": "/თვეში",
        "Secure Hosting": "უსაფრთხო ჰოსტინგი",
        "Monthly Content Updates": "ყოველთვიური განახლებები",
        "24/7 Uptime Monitoring": "24/7 უწყვეტი მონიტორინგი",
        "Technical Support": "ტექნიკური მხარდაჭერა",
        "Peace of Mind": "სიმშვიდე",
        "Ready to get started? It's that simple.": "მზად ხართ დასაწყებად? ეს ძალიან მარტივია.",
        "Start Your Project": "დაიწყეთ თქვენი პროექტი",
        "Let's build something together.": "მოდით, ერთად შევქმნათ რაღაც ახალი.",
        "Have a project in mind? We'd love to hear about it. Fill in the form below and we'll get back to you within 24 hours.": "გაქვთ პროექტი მხედველობაში? შეავსეთ ქვემოთ მოცემული ფორმა და 24 საათში დაგიბრუნდებით.",
        "We respond to every enquiry personally. No bots, no templates — just a real conversation about your vision.": "ჩვენ პასუხს ვცემთ ყველა მოთხოვნას პირადად. არანაირი ბოტები, მხოლოდ რეალური საუბარი თქვენს ხედვაზე.",
        "Your Name": "თქვენი სახელი",
        "Email Address": "ელ-ფოსტა",
        "Project Type": "პროექტის ტიპი",
        "New Website": "ახალი ვებსაიტი",
        "Website Redesign": "ვებსაიტის რედიზაინი",
        "E-Commerce": "ელ-კომერცია",
        "Other": "სხვა",
        "Select a service...": "აირჩიეთ სერვისი...",
        "Tell Us About Your Project": "მოგვიყევით თქვენი პროექტის შესახებ",
        "Send Message": "შეტყობინების გაგზავნა",
        "Message Sent!": "შეტყობინება გაიგზავნა!",
        "Thanks for reaching out! We'll be in touch with you shortly.": "მადლობა დაკავშირებისთვის! მალე დაგიბრუნდებით.",
        "Continue": "გაგრძელება"
    },
    es: {
        "Nuri ぬり": "Nuri ぬり",
        "Web Development Studio": "Estudio de Desarrollo Web",
        "We paint the web with purpose.": "Pintamos la web con propósito.",
        "Premium websites crafted for businesses that demand excellence — beautiful design, flawless performance, and results that matter.": "Sitios web premium creados para empresas que exigen excelencia: un gran diseño, rendimiento impecable y resultados que importan.",
        "View Our Work": "Ver Nuestro Trabajo",
        "Start a Project": "Iniciar un Proyecto",
        "About": "Sobre Nosotros",
        "Portfolio": "Portafolio",
        "Services": "Servicios",
        "Pricing": "Precios",
        "Get in Touch": "Contactar",
        "Crafting digital experiences that leave a mark.": "Creando experiencias digitales que dejan huella.",
        "From local restaurants to growing businesses, we deliver bespoke web solutions with meticulous attention to detail, fast load times, and designs that convert visitors into customers.": "Desde restaurantes locales hasta empresas en crecimiento, ofrecemos soluciones web a medida con una atención meticulosa a los detalles, tiempos de carga rápidos y diseños que convierten a los visitantes en clientes.",
        "Custom Design": "Diseño a Medida",
        "Performance First": "Rendimiento Ante Todo",
        "Passion for Craft": "Pasión por el Arte",
        "Sites we've brought to life.": "Sitios que hemos hecho realidad.",
        "Each project is built from scratch — no templates, no shortcuts. Just clean code and thoughtful design.": "Cada proyecto se construye desde cero: sin plantillas, sin atajos. Solo código limpio y diseño bien pensado.",
        "Your Project Here": "Tu Proyecto Aquí",
        "Ready to build something exceptional? Let's talk.": "¿Listo para construir algo excepcional? Hablemos.",
        "Get Started": "Comenzar",
        "Everything you need to succeed online.": "Todo lo que necesitas para triunfar en internet.",
        "Web Development": "Desarrollo Web",
        "Responsive & Mobile": "Adaptable y Móvil",
        "Hosting & Deployment": "Alojamiento y Despliegue",
        "SEO Optimisation": "Optimización SEO",
        "Ongoing Support": "Soporte Continuo",
        "Bespoke visual identities and interfaces tailored to your brand — no templates, no compromises.": "Identidades visuales e interfaces a medida adaptadas a tu marca: sin plantillas, ni compromisos.",
        "Clean, modern code built for speed, accessibility, and long-term maintainability.": "Código limpio y moderno, diseñado para ser rápido, accesible y fácil de mantener a largo plazo.",
        "Pixel-perfect experiences across every device — from desktop to the smallest screen.": "Experiencias perfectas en todos los dispositivos, desde la computadora de escritorio hasta la pantalla más pequeña.",
        "Fast, reliable hosting setup with continuous deployment — your site is always live and up to date.": "Configuración de alojamiento rápida y confiable con despliegue continuo: tu sitio web siempre en línea y actualizado.",
        "Built-in best practices to help your business get found by the right people at the right time.": "Mejores prácticas integradas para ayudar a tu negocio a ser encontrado por las personas adecuadas en el momento adecuado.",
        "Updates, improvements, and peace of mind — we're here long after launch day.": "Actualizaciones, mejoras y tranquilidad: estamos aquí mucho después del día del lanzamiento.",
        "Simple, transparent investment.": "Inversión simple y transparente.",
        "Professional web development shouldn't be complicated. We offer a clear path to getting online and staying there.": "El desarrollo web profesional no tiene por qué ser complicado. Te ofrecemos una perspectiva clara para estar en línea.",
        "Design & Build": "Diseño y Desarrollo",
        "/one-time": "/una vez",
        "Custom Design & Development": "Diseño y Desarrollo a Medida",
        "Responsive Mobile Layout": "Diseño Adaptable para Móviles",
        "SEO Optimization": "Optimización SEO",
        "Domain Configuration": "Configuración de Dominio",
        "Launch Support": "Soporte de Lanzamiento",
        "Care & Hosting": "Mantenimiento y Alojamiento",
        "/month": "/mes",
        "Secure Hosting": "Alojamiento Seguro",
        "Monthly Content Updates": "Actualizaciones de Contenido Menusales",
        "24/7 Uptime Monitoring": "Monitoreo de Disponibilidad 24/7",
        "Technical Support": "Soporte Técnico",
        "Peace of Mind": "Tranquilidad",
        "Ready to get started? It's that simple.": "¿Listo para empezar? Es así de simple.",
        "Start Your Project": "Inicia Tu Proyecto",
        "Let's build something together.": "Construyamos algo juntos.",
        "Have a project in mind? We'd love to hear about it. Fill in the form below and we'll get back to you within 24 hours.": "¿Tienes un proyecto en mente? Nos encantaría escucharlo. Completa el formulario y nos contactaremos dentro de 24 horas.",
        "We respond to every enquiry personally. No bots, no templates — just a real conversation about your vision.": "Respondemos cada consulta de forma personal. Cero bots, cero plantillas — una verdadera conversación sobre tu visión.",
        "Your Name": "Tu Nombre",
        "Email Address": "Correo Electrónico",
        "Project Type": "Tipo de Proyecto",
        "New Website": "Nuevo Sitio Web",
        "Website Redesign": "Rediseño de Sitio Web",
        "E-Commerce": "Tienda en Línea",
        "Other": "Otro",
        "Select a service...": "Selecciona un servicio...",
        "Tell Us About Your Project": "Cuéntanos Sobre Tu Proyecto",
        "Send Message": "Enviar Mensaje",
        "Message Sent!": "¡Mensaje Enviado!",
        "Thanks for reaching out! We'll be in touch with you shortly.": "¡Gracias por contactarnos! Estaremos en comunicación en breve.",
        "Continue": "Continuar"
    }
};


// --- Auto-injected localized missing strings ---
const geAdditions = {
    "PWA": "PWA",
    "A companion app to Hiragana.site for mastering katakana — with the\n                                    same\n                                    polished practice experience and cloud-synced progress.": "Hiragana.site-ის დამხმარე აპლიკაცია კატაკანას სასწავლად — იგივე დახვეწილი პრაქტიკის გამოცდილებითა და ღრუბელში სინქრონიზებული პროგრესით.",
    "Warren Cafe & Brunch": "ბრანჩი",
    "Cafe": "კაფე",
    "From local restaurants to growing businesses, we deliver bespoke web solutions\n                            with meticulous attention to detail, fast load times, and designs that convert visitors into\n                            customers.": "ადგილობრივი რესტორნებიდან დაწყებული, მზარდი ბიზნესებით დამთავრებული, ჩვენ ვქმნით მორგებულ ვებ-გადაწყვეტილებებს დეტალებზე ზედმიწევნითი ყურადღებით, სწრაფი ჩატვირთვის დროით და დიზაინით, რომელიც ვიზიტორებს მომხმარებლებად აქცევს.",
    "Cheese Bar": "ყველის ბარი",
    "Pixel-perfect experiences across every device — from desktop to the smallest screen.": "იდეალური გამოცდილება ნებისმიერ მოწყობილობაზე.",
    "A funky, animated dark-mode website for Tbilisi's beloved Honey\n                                    Boba bubble tea shop — featuring floating boba animations, bilingual\n                                    Georgian/English support, and delivery integrations.": "ანიმირებული, მუქი თემის ვებსაიტი თბილისში საყვარელი Honey Boba-სთვის — მცურავი ბობის ანიმაციებით, ქართულ-ინგლისური მხარდაჭერით და მიტანის სერვისების ინტეგრაციით.",
    "Lebanese": "ლიბანური",
    "Restaurant": "რესტორანი",
    "Bespoke visual identities and interfaces tailored to your brand — no templates, no\n                            compromises.": "თქვენს ბრენდზე მორგებული ვიზუალური იდენტობა — არანაირი კომპრომისი.",
    "Bubble Tea": "ბაბლ თი",
    "Brunch": "ბრანჩი",
    "A premium bilingual website for a beloved Buenos Aires brunch café\n                                    —\n                                    featuring the menu, delivery links, and two locations in Palermo & Recoleta.": "პრემიუმ ორენოვანი ვებსაიტი ბუენოს-აირესის საყვარელი კაფესთვის — მენიუთი, მიტანის ბმულებით და ორი ლოკაციით.",
    "Education": "განათლება",
    "Mao Bubble Tea": "ბაბლ თი",
    "Each project is built from scratch — no templates, no shortcuts. Just\n                    clean\n                    code and thoughtful design.": "თითოეული პროექტი იქმნება ნულიდან — არანაირი შაბლონები. მხოლოდ სუფთა კოდი და გააზრებული დიზაინი.",
    "A premium bilingual website for Tbilisi's specialty\n                                    bean-to-bar cacao bar — featuring signature cacao drinks, playful cat\n                                    mascot branding, and a warm chocolate aesthetic.": "პრემიუმ ორენოვანი ვებსაიტი თბილისის კაკაო ბარისთვის — საფირმო კაკაოს სასმელებით, კატის მასკოტით და მყუდრო შოკოლადის ესთეტიკით.",
    "Cacao Bar": "კაკაო ბარი",
    "Updates, improvements, and peace of mind — we're here long after launch day.": "განახლებები, გაუმჯობესებები და სიმშვიდე — ჩვენ აქ ვართ თქვენი საიტის გაშვების შემდეგაც.",
    "Premium websites crafted for businesses that demand excellence — beautiful\n                    design, flawless performance, and results that matter.": "პრემიუმ ვებსაიტები, შექმნილი ბიზნესებისთვის, რომლებიც ითხოვენ სრულყოფილებას — ლამაზი დიზაინი, უზადო წარმადობა და მნიშვნელოვანი შედეგები.",
    "Fast, reliable hosting setup with continuous deployment — your site is always live and up to\n                            date.": "სწრაფი, საიმედო ჰოსტინგის დაყენება მუდმივი განახლებით — თქვენი საიტი ყოველთვის ცოცხალია.",
    "Thanks! We'll be in touch within 24 hours.": "მადლობა! ჩვენ დაგიკავშირდებით 24 საათის განმავლობაში.",
    "A premium, highly aesthetic bilingual webapp for Berytus — bringing\n                                    authentic Lebanese taste to Tbilisi.": "პრემიუმ, მაღალი ესთეტიკის ორენოვანი ვებაპლიკაცია Berytus-სთვის — ლიბანური გემოების თბილისში მოსატანად.",
    "An interactive Japanese hiragana practice app — featuring\n                                    stroke-order\n                                    drawing, progress tracking, and full offline PWA support.": "იაპონური ჰირაგანას პრაქტიკის ინტერაქტიული აპლიკაცია — ხაზვის თანმიმდევრობით, პროგრესის თრექინგით და სრული ოფლაინ PWA უზრუნველყოფით.",
    "A fun, vibrant, light-themed bilingual website for a popular\n                                    Mexican restaurant in Tbilisi — featuring a seamless Wolt menu integration.": "მხიარული, ნათელი თემის ორენოვანი ვებსაიტი პოპულარული მექსიკური რესტორნისთვის თბილისში — Wolt-ის მენიუს სრული ინტეგრაციით.",
    "Nuri — Japanese for": "Nuri — იაპონურად",
    "Animations": "ანიმაციები",
    "Mexican": "მექსიკური",
    "Built-in best practices to help your business get found by the right people at the right\n                            time.": "შექმნილია საუკეთესო პრაქტიკით, რათა დაეხმაროს თქვენს ბიზნესს სწორ დროს სწორმა ადამიანებმა იპოვონ.",
    "Tbilisi": "თბილისი",
    "— embodies our philosophy: every website is\n                            a\n                            canvas. We blend artistry with engineering to build sites that are as beautiful as they are\n                            powerful.": "— განასახიერებს ჩვენს ფილოსოფიას: ყველა ვებსაიტი არის ტილო. ჩვენ ვაერთიანებთ ხელოვნებასა და ინჟინერიას.",
    "Professional web development shouldn't be complicated. We offer a clear\n                    path\n                    to\n                    getting online and staying there.": "პროფესიონალური ვებ დეველოპმენტი არ უნდა იყოს რთული.",
    "We respond to every enquiry personally. No bots, no templates — just a real conversation\n                                about your vision.": "ჩვენ პასუხს ვცემთ ყველა მოთხოვნას პირადად. არანაირი ბოტები, მხოლოდ რეალური საუბარი თქვენს ხედვაზე.",
    "Firebase": "Firebase",
    "Visit Site ↗": "ნახეთ საიტი ↗",
    "A premium bilingual website for Tbilisi's boutique Cheese Bar &\n                                    More\n                                    — featuring artisan cheeses, delivery links, and a rich editorial design.": "პრემიუმ ორენოვანი ვებსაიტი თბილისის ყველის ბარისთვის — ხელნაკეთი ველებით, მიტანის ბმულებითა და დახვეწილი დიზაინით.",
    "Have a project in mind? We'd love to hear about it. Fill in the form below\n                    and\n                    we'll get back to you within 24 hours.": "გაქვთ პროექტი მხედველობაში? შეავსეთ ქვემოთ მოცემული ფორმა და 24 საათში დაგიბრუნდებით.",
    "Cute": "საყვარელი",
    "Your complete website, built from scratch to perfectly match your\n                            vision.": "თქვენი სრულყოფილი ვებსაიტი, აგებული ნულიდან, რათა იდეალურად მოერგოს თქვენს ხედვას.",
    "A super cute, fun, and funky website for Tbilisi's premier bubble\n                                    tea\n                                    shop\n                                    — featuring playful animations and vibrant design.": "მხიარული და ფერადი ვებსაიტი თბილისის გამორჩეული ბაბლ თი მაღაზიისთვის — სათამაშო ანიმაციებითა და ნათელი დიზაინით.",
    "Bilingual": "ორენოვანი"
};
const esAdditions = {
    "PWA": "PWA",
    "A companion app to Hiragana.site for mastering katakana — with the\n                                    same\n                                    polished practice experience and cloud-synced progress.": "Una aplicación complementaria a Hiragana.site para dominar katakana — con la misma experiencia y progreso sincronizado en la nube.",
    "Warren Cafe & Brunch": "Desayuno Tardío",
    "Cafe": "Cafetería",
    "From local restaurants to growing businesses, we deliver bespoke web solutions\n                            with meticulous attention to detail, fast load times, and designs that convert visitors into\n                            customers.": "Desde restaurantes locales hasta empresas en crecimiento, ofrecemos soluciones web a medida con minuciosa atención al detalle, tiempos de carga rápidos y diseños que convierten a los visitantes en clientes.",
    "Cheese Bar": "Bar de Quesos",
    "Pixel-perfect experiences across every device — from desktop to the smallest screen.": "Experiencias perfectas en todos los dispositivos.",
    "A funky, animated dark-mode website for Tbilisi's beloved Honey\n                                    Boba bubble tea shop — featuring floating boba animations, bilingual\n                                    Georgian/English support, and delivery integrations.": "Un sitio web animado en modo oscuro para la querida tienda de Bubble Tea Honey Boba en Tiflis — con animaciones fluidas, soporte bilingüe (georgiano/inglés) e integraciones de entrega.",
    "Lebanese": "Libanés",
    "Restaurant": "Restaurante",
    "Bespoke visual identities and interfaces tailored to your brand — no templates, no\n                            compromises.": "Identidades visuales a medida centradas en tu marca: sin compromisos.",
    "Bubble Tea": "Té de Burbujas",
    "Brunch": "Desayuno Tardío",
    "A premium bilingual website for a beloved Buenos Aires brunch café\n                                    —\n                                    featuring the menu, delivery links, and two locations in Palermo & Recoleta.": "Un sitio web premium bilingüe para un querido café de Buenos Aires — menú integrado, entregas y dos ubicaciones en Palermo y Recoleta.",
    "Education": "Educación",
    "Mao Bubble Tea": "Té de Burbujas",
    "Each project is built from scratch — no templates, no shortcuts. Just\n                    clean\n                    code and thoughtful design.": "Cada proyecto se construye desde cero: sin plantillas ni atajos. Solo código limpio y diseño inteligente.",
    "A premium bilingual website for Tbilisi's specialty\n                                    bean-to-bar cacao bar — featuring signature cacao drinks, playful cat\n                                    mascot branding, and a warm chocolate aesthetic.": "Un sitio web premium bilingüe para el bar de cacao de Tiflis — con bebidas exclusivas, mascota de gato y estética cálida de chocolate.",
    "Cacao Bar": "Bar de Cacao",
    "Updates, improvements, and peace of mind — we're here long after launch day.": "Actualizaciones, mejoras y tranquilidad.",
    "Premium websites crafted for businesses that demand excellence — beautiful\n                    design, flawless performance, and results that matter.": "Sitios web premium creados para empresas que exigen excelencia: hermosos diseños, rendimiento impecable y resultados que importan.",
    "Fast, reliable hosting setup with continuous deployment — your site is always live and up to\n                            date.": "Alojamiento ultrarrápido con implementación continua: tu sitio siempre está en línea y actualizado.",
    "Thanks! We'll be in touch within 24 hours.": "¡Gracias! Nos pondremos en contacto en 24 horas.",
    "A premium, highly aesthetic bilingual webapp for Berytus — bringing\n                                    authentic Lebanese taste to Tbilisi.": "Una aplicación web premium y de alta estética bilingüe para Berytus — trayendo el sabor auténtico libanés a Tiflis.",
    "An interactive Japanese hiragana practice app — featuring\n                                    stroke-order\n                                    drawing, progress tracking, and full offline PWA support.": "Una aplicación interactiva para practicar hiragana japonés — de orden de trazos, seguimiento de progreso y soporte PWA sin conexión.",
    "A fun, vibrant, light-themed bilingual website for a popular\n                                    Mexican restaurant in Tbilisi — featuring a seamless Wolt menu integration.": "Un sitio web bilingüe vibrante y divertido de tema claro para un popular restaurante mexicano en Tiflis — con integración de menú de Wolt.",
    "Nuri — Japanese for": "Nuri — en japonés significa",
    "Animations": "Animaciones",
    "Mexican": "Mexicano",
    "Built-in best practices to help your business get found by the right people at the right\n                            time.": "Las mejores prácticas para que tu negocio sea encontrado por las personas adecuadas en el momento adecuado.",
    "Tbilisi": "Tiflis",
    "— embodies our philosophy: every website is\n                            a\n                            canvas. We blend artistry with engineering to build sites that are as beautiful as they are\n                            powerful.": "— encarna nuestra filosofía: cada sitio web es un lienzo. Combinamos el arte con la ingeniería para construir sitios hermosos y potentes.",
    "Professional web development shouldn't be complicated. We offer a clear\n                    path\n                    to\n                    getting online and staying there.": "El desarrollo web profesional no debería ser complicado.",
    "We respond to every enquiry personally. No bots, no templates — just a real conversation\n                                about your vision.": "Respondemos cada solicitud de manera personal. Sin bots ni plantillas.",
    "Firebase": "Firebase",
    "Visit Site ↗": "Visitar Sitio ↗",
    "A premium bilingual website for Tbilisi's boutique Cheese Bar &\n                                    More\n                                    — featuring artisan cheeses, delivery links, and a rich editorial design.": "Un sitio web premium bilingüe para el Cheese Bar boutique de Tiflis — con quesos artesanales, entregas y diseño editorial rico.",
    "Have a project in mind? We'd love to hear about it. Fill in the form below\n                    and\n                    we'll get back to you within 24 hours.": "¿Tienes un proyecto en mente? Nos encantaría escucharlo. Rellene el siguiente formulario.",
    "Cute": "Lindo",
    "Your complete website, built from scratch to perfectly match your\n                            vision.": "Tu sitio web completo, construido desde cero para que coincida perfectamente con tu visión.",
    "A super cute, fun, and funky website for Tbilisi's premier bubble\n                                    tea\n                                    shop\n                                    — featuring playful animations and vibrant design.": "Un sitio web súper lindo y divertido para la principal tienda de Bubble Tea en Tiflis — con animaciones divertidas y diseño vibrante.",
    "Bilingual": "Bilingüe"
};
Object.assign(nuriTranslations.ge, geAdditions);
Object.assign(nuriTranslations.es, esAdditions);

document.addEventListener("DOMContentLoaded", () => {
    let activeLang = 'en';
    if (window.siteLang === 'ge' || window.location.pathname.startsWith('/ge')) activeLang = 'ge';
    else if (window.siteLang === 'es' || window.location.pathname.startsWith('/es')) activeLang = 'es';

    // Dropdown UI logic
    const currentLangFlag = document.getElementById("currentLangFlag");
    if (currentLangFlag) {
        if (activeLang === 'ge') currentLangFlag.textContent = "🇬🇪";
        else if (activeLang === 'es') currentLangFlag.textContent = "🇪🇸";
        else currentLangFlag.textContent = "🇺🇸";
    }

    // Close click-away for dropdown
    document.addEventListener('click', (e) => {
        const langDropdown = document.getElementById('langDropdownContainer');
        const langMenu = document.getElementById('langMenu');
        if (langDropdown && langMenu && !langDropdown.contains(e.target)) {
            langMenu.style.display = 'none';
        }
    });

    // Translation engine
    if (activeLang !== 'en' && nuriTranslations[activeLang]) {
        const translations = nuriTranslations[activeLang];

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            const originalText = node.nodeValue.trim();
            if (originalText && translations[originalText]) {
                node.nodeValue = node.nodeValue.replace(originalText, translations[originalText]);
            }
        }

        document.querySelectorAll('input, textarea').forEach(el => {
            if (el.placeholder && translations[el.placeholder.trim()]) {
                el.placeholder = translations[el.placeholder.trim()];
            }
        });

        document.querySelectorAll('option').forEach(el => {
            const text = el.textContent.trim();
            if (translations[text]) {
                el.textContent = translations[text];
            }
        });
    }
});
