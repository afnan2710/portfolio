(function() {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  const menuToggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');

  if (menuToggle && drawer) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (drawer.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    document.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 800 && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  const typedEl = document.getElementById('typedRole');
  if (typedEl) {
    const roles = [
      'CSE undergrad @ UIU',
      'Web & Mobile app Developer',
      'HCI researcher',
      'AI/ML enthusiast',
      'UI/UX Designer',
      'Problem Solver'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeAnimation() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
          isDeleting = true;
          setTimeout(typeAnimation, 100);
        }, 2000);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeAnimation, 500);
        return;
      }

      const speed = isDeleting ? 50 : 100;
      setTimeout(typeAnimation, speed);
    }

    setTimeout(typeAnimation, 1000);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }
  
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav > a, .dropdown-menu a, .drawer-link');
  const dropdownTrigger = document.querySelector('.dropdown-trigger');

  function highlightNavigation() {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === current) {
        link.classList.add('active');
        
        if (link.closest('.dropdown-menu')) {
          if (dropdownTrigger) {
            dropdownTrigger.classList.add('active');
          }
        } else {
          if (dropdownTrigger) {
            dropdownTrigger.classList.remove('active');
          }
        }
      }
    });

    document.querySelectorAll('.desktop-nav > a:not(.dropdown-trigger)').forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation();

  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 80) {
        element.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();

  const yearElement = document.querySelector('.footer-copyright');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
  }

  document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
    }
  });
})();