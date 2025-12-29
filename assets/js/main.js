// ============================================
// HMG LAB WEBSITE - MAIN.JS (MULTI-PAGE VERSION)
// DOM Initialization and Core Functions
// ============================================

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

// Initialization on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('HMG Lab Website Initializing...');
  
  // Close mobile menu when clicking nav links
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', function() {
      const nav = document.getElementById('mainNav');
      if (window.innerWidth <= 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });
  
  // Initialize scroll behavior for sticky header
  initializeScrollBehavior();
  
  // Initialize header particles (subtle background effect)
  initializeHeaderParticles();
  
  console.log('HMG Lab Website Initialized Successfully!');
});

// ===== SCROLL BEHAVIOR FOR STICKY HEADER =====
function initializeScrollBehavior() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'white';
      header.style.backdropFilter = 'none';
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
}

// ===== HEADER PARTICLES (SUBTLE BACKGROUND) =====
function initializeHeaderParticles() {
  // Check if tsParticles is loaded and we're not on a page that already has particles
  if (typeof tsParticles === 'undefined') return;
  
  const header = document.querySelector('header');
  if (!header) return;
  
  // Don't add particles if the hero section already has them
  if (document.getElementById('tsparticles')) return;
  
  // Create a container for header particles
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'header-particles';
  particlesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.3;
  `;
  
  // Insert as first child of header
  header.style.position = 'relative';
  header.insertBefore(particlesContainer, header.firstChild);
  
  // Make sure header content is above particles
  const headerContainer = header.querySelector('.header-container');
  if (headerContainer) {
    headerContainer.style.position = 'relative';
    headerContainer.style.zIndex = '1';
  }
  
  // Initialize very subtle particles
  tsParticles.load("header-particles", {
    background: {
      color: {
        value: "transparent"
      }
    },
    fpsLimit: 30,
    particles: {
      color: {
        value: ["#8B4513", "#D4A574"]
      },
      links: {
        color: "#8B4513",
        distance: 100,
        enable: true,
        opacity: 0.08,
        width: 0.5
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce"
        }
      },
      number: {
        density: {
          enable: true,
          area: 1200
        },
        value: 20
      },
      opacity: {
        value: 0.15
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 2 }
      }
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: {
          enable: false
        },
        onClick: {
          enable: false
        }
      }
    }
  }).catch(error => {
    console.log('Header particles not loaded (optional feature)');
  });
}

// ===== FORM SUBMISSION HANDLER =====
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Log form data (replace with actual API call)
  console.log('Form submitted:', data);

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  
  // Reset form
  setTimeout(() => {
    e.target.reset();
  }, 1000);
}

// ===== PUBLICATION ABSTRACT TOGGLE =====
function toggleAbstract(abstractId, button) {
  const abstract = document.getElementById(abstractId);
  if (!abstract) return;
  
  const isCollapsed = abstract.classList.contains('collapsed');
  
  if (isCollapsed) {
    abstract.classList.remove('collapsed');
    button.textContent = 'Read Less';
    
    // Smooth scroll to show full abstract if needed
    setTimeout(() => {
      const rect = abstract.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        abstract.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  } else {
    abstract.classList.add('collapsed');
    button.textContent = 'Read More';
  }
}

// Expose functions to global scope for HTML onclick attributes
window.toggleMobileMenu = toggleMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.toggleAbstract = toggleAbstract;