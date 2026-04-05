// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Scroll effect for nav
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.slide-up').forEach(el => {
  observer.observe(el);
});

// ========================================
// Expanding Gallery
// ========================================
(function () {
  const wrapper = document.getElementById('gallery-wrapper');
  if (!wrapper) return;

  const columns = wrapper.querySelectorAll('.gallery-column');

  columns.forEach(column => {
    column.addEventListener('click', function (e) {
      const isExpanded = this.classList.contains('expanded');

      // Remove expanded from all columns
      columns.forEach(c => c.classList.remove('expanded'));
      wrapper.classList.remove('has-expanded');

      // If this wasn't expanded, expand it
      if (!isExpanded) {
        this.classList.add('expanded');
        wrapper.classList.add('has-expanded');
        // Prevent link navigation on first click (let second click navigate)
        const link = this.querySelector('a');
        if (link) e.preventDefault();
      }
    });
  });
})();

// ========================================
// Active nav link highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.style.color = 'var(--color-text)';
        }
      });
    }
  });
});