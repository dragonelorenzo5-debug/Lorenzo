const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-link');
const progress = document.getElementById('scroll-progress');
const pageSections = Array.from(document.querySelectorAll('section[id]'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.55 }
);

pageSections.forEach((section) => sectionObserver.observe(section));

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
};

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
