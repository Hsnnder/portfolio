document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once the element is visible, we can stop observing it
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  // Form group animations
  const formGroups = document.querySelectorAll('.contact-form .form-group');
  formGroups.forEach((group, index) => {
    setTimeout(() => {
      group.classList.add('visible');
    }, 100 * index);
  });

  // Set progress bar width for skills
  document.querySelectorAll('.skill-card').forEach(card => {
    const progressBar = card.querySelector('.progress-bar');
    if (progressBar) {
      const progress = progressBar.getAttribute('data-progress') || '0';
      progressBar.style.setProperty('--progress', `${progress}%`);
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add staggered children class to appropriate containers
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    skillsGrid.classList.add('stagger-children');
  }
});