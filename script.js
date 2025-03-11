/// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements on scroll
  const fadeElements = document.querySelectorAll('.project-card, .skill-item, #about p, #hero h2, #hero p, .profile-img');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
  });
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
  
  // Contact form validation and submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Basic validation
      if (!name || !email || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return;
      }
      
      // In a real scenario, you would send the form data to a server here
      // For demo purposes, we'll just show a success message
      showFormStatus('Your message has been sent successfully!', 'success');
      contactForm.reset();
      
      // AJAX form submission would go here in a real implementation
    });
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function showFormStatus(message, type) {
    let statusDiv = document.querySelector('.form-status');
    
    if (!statusDiv) {
      statusDiv = document.createElement('div');
      statusDiv.className = 'form-status';
      contactForm.insertAdjacentElement('afterend', statusDiv);
    }
    
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 4000);
  }
  
  // Create and initialize theme toggle
  const body = document.body;
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  themeToggle.setAttribute('role', 'button');
  themeToggle.setAttribute('tabindex', '0');
  document.body.appendChild(themeToggle);
  
  // Check for saved theme preference or respect OS preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
  
  // Keyboard accessibility for theme toggle
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });
  
  // Back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.setAttribute('role', 'button');
  backToTop.setAttribute('tabindex', '0');
  document.body.appendChild(backToTop);
  
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Back to top functionality
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Keyboard accessibility for back to top button
  backToTop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      backToTop.click();
    }
  });
  
  // Project filtering functionality
  const projectTags = document.querySelectorAll('.project-tag');
  if (projectTags.length > 0) {
    projectTags.forEach(tag => {
      tag.addEventListener('click', function() {
        const category = this.dataset.category;
        const projectCards = document.querySelectorAll('.project-card');
        
        projectTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        if (category === 'all') {
          projectCards.forEach(card => {
            card.style.display = 'block';
          });
        } else {
          projectCards.forEach(card => {
            if (card.dataset.category === category) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  }
  
  // Skill progress bars animation
  const progressBars = document.querySelectorAll('.progress-bar');
  if (progressBars.length > 0) {
    const animateProgressBars = () => {
      progressBars.forEach(bar => {
        const value = bar.dataset.progress;
        bar.style.width = `${value}%`;
      });
    };
    
    // Use Intersection Observer to trigger animation when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateProgressBars, 200);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(document.querySelector('#skills'));
  }
});