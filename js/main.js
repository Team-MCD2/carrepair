document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Header scrolled state
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hero entrance
    requestAnimationFrame(() => {
        document.body.classList.add('hero-ready');
    });

    // Hero video parallax (subtle)
    const heroVideo = document.querySelector('.hero--video .hero-video');
    if (heroVideo && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const scroll = Math.min(window.scrollY, 600);
            const scale = 1.08 + scroll * 0.00015;
            const y = scroll * 0.12;
            heroVideo.style.transform = `scale(${scale}) translateY(${y}px)`;
        }, { passive: true });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Active Navigation Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Accordion FAQ Mechanic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Footer highlight current day of opening hours
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = daysOfWeek[new Date().getDay()];
    const hoursItems = document.querySelectorAll('.footer-hours-list li');

    hoursItems.forEach(item => {
        const dayAttr = item.getAttribute('data-day');
        if (dayAttr === currentDayName) {
            item.classList.add('today');
            const labelSpan = item.querySelector('.day-label');
            if (labelSpan) {
                labelSpan.innerHTML = labelSpan.innerHTML + " <span>(Aujourd'hui)</span>";
            }
        }
    });

    // Scroll reveal with stagger
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, parseInt(delay, 10));
            observer.unobserve(entry.target);
        });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // Card fade-in (legacy + enhanced)
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    const fadeElements = document.querySelectorAll(
        '.service-card, .feature-item, .review-card, .prestation-row, .engagement-card, .info-block, .video-card'
    );
    fadeElements.forEach((el, index) => {
        if (el.classList.contains('reveal-on-scroll')) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.65s ease ${index % 3 * 0.08}s, transform 0.65s ease ${index % 3 * 0.08}s`;
        cardObserver.observe(el);
    });

    // Trust counter animation
    const animateCounter = (el) => {
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const isDecimal = !Number.isInteger(target);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.trust-number[data-count]').forEach(el => {
        if (prefersReducedMotion) return;
        counterObserver.observe(el);
    });

    // Video cards: play when visible, pause when off-screen
    const videoCards = document.querySelectorAll('.video-card');
    if (videoCards.length && !prefersReducedMotion) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                const video = card.querySelector('video');
                if (!video) return;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                    card.classList.add('is-playing');
                } else {
                    video.pause();
                    card.classList.remove('is-playing');
                }
            });
        }, { threshold: 0.35 });

        videoCards.forEach(card => {
            videoObserver.observe(card);
            card.addEventListener('mouseenter', () => {
                const video = card.querySelector('video');
                if (video) video.play().catch(() => {});
            });
        });
    }

    // Autoplay background videos
    document.querySelectorAll('.hero-video, .why-video, .prestation-video').forEach(video => {
        if (prefersReducedMotion) return;
        video.play().catch(() => {});
    });
});
