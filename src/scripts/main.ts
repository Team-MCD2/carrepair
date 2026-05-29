import { setupYouTubeLoops } from './youtube-loop';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  requestAnimationFrame(() => document.body.classList.add('hero-ready'));

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].setAttribute('style', 'transform: rotate(45deg) translate(6px, 6px)');
        spans[1].setAttribute('style', 'opacity: 0');
        spans[2].setAttribute('style', 'transform: rotate(-45deg) translate(6px, -6px)');
      } else {
        spans.forEach((s) => s.removeAttribute('style'));
      }
    });
  }

  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.parentElement!;
      const answer = item.querySelector<HTMLElement>('.faq-answer')!;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('active');
        const a = other.querySelector<HTMLElement>('.faq-answer');
        if (a) a.style.maxHeight = '';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[new Date().getDay()];
  document.querySelectorAll('.footer-hours-list li').forEach((item) => {
    if (item.getAttribute('data-day') === currentDayName) {
      item.classList.add('today');
      const label = item.querySelector('.day-label');
      if (label) label.innerHTML += " <span>(Aujourd'hui)</span>";
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt((entry.target as HTMLElement).dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el));

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('animate-fade-in');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(
      '.service-card, .feature-item, .review-card, .prestation-row, .engagement-card, .info-block'
    )
    .forEach((el, index) => {
      if (el.classList.contains('reveal-on-scroll')) return;
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      htmlEl.style.transition = `opacity 0.65s ease ${(index % 3) * 0.08}s, transform 0.65s ease ${(index % 3) * 0.08}s`;
      cardObserver.observe(el);
    });

  const animateCounter = (el: HTMLElement) => {
    const target = parseFloat(el.dataset.count || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = !Number.isInteger(target);
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  if (!prefersReducedMotion) {
    document.querySelectorAll('.trust-number[data-count]').forEach((el) => counterObserver.observe(el));
    setupYouTubeLoops();
  }

  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (form) {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const select = document.getElementById('service-select') as HTMLSelectElement | null;
    if (serviceParam && select) {
      for (const option of select.options) {
        if (option.value === serviceParam) {
          select.value = serviceParam;
          break;
        }
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const first = (document.getElementById('firstname') as HTMLInputElement).value;
      const last = (document.getElementById('lastname') as HTMLInputElement).value;
      const service = select?.options[select.selectedIndex]?.text || '';
      alert(
        `Merci ${first} ${last} !\nVotre demande concernant "${service}" a bien �t� enregistr�e (simulation).\nNous vous recontacterons sous 24h.`
      );
      form.reset();
    });
  }
});
