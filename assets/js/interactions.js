// ============================================
// HMG LAB WEBSITE - INTERACTIONS.JS
// Form Handling, User Interactions, Events
// ============================================

// ===== FORM VALIDATION =====
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = 'var(--accent)';
      input.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.2)';
    } else {
      input.style.borderColor = 'var(--border-color)';
      input.style.boxShadow = 'none';
    }
  });

  return isValid;
}

// ===== DROPDOWN TOGGLE =====
function initializeDropdownHandlers() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown');

    if (dropdown) {
      // For desktop - mouse events
      if (window.innerWidth > 768) {
        item.addEventListener('mouseenter', function() {
          dropdown.style.opacity = '1';
          dropdown.style.visibility = 'visible';
          dropdown.style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', function() {
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
          dropdown.style.transform = 'translateY(-10px)';
        });
      } else {
        // For mobile - click events
        const navLink = item.querySelector('.nav-link');
        navLink.addEventListener('click', function(e) {
          if (dropdown) {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          }
        });
      }
    }
  });
}

// ===== BUTTON RIPPLE EFFECT =====
function initializeRippleEffect() {
  const buttons = document.querySelectorAll('.submit-btn, .pub-btn, .alumni-link-btn, .hero-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;

      if (!this.style.position || this.style.position === 'static') {
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
      }

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
      console.error('Failed to copy:', err);
      showNotification('Failed to copy', 'error');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showNotification('Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      showNotification('Failed to copy', 'error');
    }
    document.body.removeChild(textArea);
  }
}

// ===== EXPORT TO CLIPBOARD HANDLER =====
function initializeClipboardHandlers() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const text = this.getAttribute('data-copy');
      copyToClipboard(text);
    });
  });
}

// ===== KEYBOARD SHORTCUTS =====
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Escape to close mobile menu
    if (e.key === 'Escape') {
      const nav = document.getElementById('mainNav');
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }

    // Ctrl/Cmd + K to focus search (if search exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="search"]');
      if (searchInput) searchInput.focus();
    }
  });
}

// ===== MODAL/POPUP HANDLERS =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    animation: slideInRight 0.4s ease-out;
    font-weight: 500;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// ===== HANDLE WINDOW RESIZE =====
function handleResize() {
  const nav = document.getElementById('mainNav');
  
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
    nav.classList.remove('active');
  }
  
  // Re-initialize dropdown handlers
  initializeDropdownHandlers();
}

// Debounced resize handler
const debouncedResize = debounce(handleResize, 250);

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== FORM INPUT ENHANCEMENT =====
function initializeFormEnhancements() {
  const formInputs = document.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    // Add focus/blur animations
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      if (!this.value) {
        this.parentElement.classList.remove('filled');
      } else {
        this.parentElement.classList.add('filled');
      }
    });
    
    // Check if already filled on load
    if (input.value) {
      input.parentElement.classList.add('filled');
    }
  });
}

// ===== SCROLL PROGRESS INDICATOR (Optional) =====
function initializeScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

// ===== INITIALIZE ALL ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing interactions...');
  
  initializeDropdownHandlers();
  initializeRippleEffect();
  initializeClipboardHandlers();
  initializeKeyboardShortcuts();
  initializeFormEnhancements();
  initializeScrollProgress();
  
  // Add resize listener
  window.addEventListener('resize', debouncedResize);
  
  console.log('Interactions initialized successfully!');
});

// Expose functions to global scope
window.openModal = openModal;
window.closeModal = closeModal;
window.copyToClipboard = copyToClipboard;
window.showNotification = showNotification;