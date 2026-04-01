if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          heading: ['Space Grotesk', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
        },
        colors: {
          base: '#0E0F11',
          surface: '#15171B',
          accent: '#D6FF4F',
          border: '#23252B',
          txt: '#F5F5F5',
          muted: '#A1A1A6',
          faint: '#52525B',
        },
      },
    },
  };
}

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
menuClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileLinks.forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function downloadResume() {
  const link = document.createElement('a');
  link.href = 'resume.pdf';
  link.download = 'resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function viewResume() {
  window.open('resume.pdf', '_blank', 'noopener');
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const name = formData.get('name');
  showToast(`Thanks ${name}! Your message has been received.`);
  this.reset();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => {
  el.querySelectorAll('.skill-bar-fill').forEach(bar => {
    bar.style.width = '0%';
  });
  observer.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('text-accent');
    link.classList.add('text-muted');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.remove('text-muted');
      link.classList.add('text-accent');
    }
  });
});
