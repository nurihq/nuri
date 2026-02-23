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

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formAction = form.getAttribute('action');

        // If Formspree ID not yet set, alert the user
        if (formAction.includes('YOUR_FORM_ID')) {
            alert('Please configure the Formspree Form ID in index.html to enable email sending without an email app.');
            return;
        }

        // Formspree submission
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';

        try {
            const data = new FormData(form);
            const response = await fetch(formAction, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                formSuccess.classList.add('show');
                submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                    submitBtn.classList.remove('loading');
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            submitBtn.querySelector('.btn-text').textContent = 'Send Message';
            submitBtn.classList.remove('loading');
            alert('Something went wrong. Please email us directly at leidenfrostconsulting@gmail.com');
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

    portfolioPrev.addEventListener('click', () => {
        portfolioGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    portfolioNext.addEventListener('click', () => {
        portfolioGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
}
