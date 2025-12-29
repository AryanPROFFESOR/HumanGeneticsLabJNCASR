// ============================================
// HMG LAB WEBSITE - GALLERY.JS
// Interactive Gallery with Lightbox Functionality
// ============================================

let currentImageIndex = 0;
let galleryImages = [];

// Initialize gallery on DOM load
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('lightbox')) {
    initializeGallery();
  }
});

// ===== INITIALIZE GALLERY =====
function initializeGallery() {
  console.log('Initializing gallery...');
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryImages = Array.from(galleryItems);
  
  // Add click handlers to gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      openLightbox(index);
    });
    
    // Add keyboard support for accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View image ${index + 1}`);
    
    item.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Close lightbox on background click
  const lightbox = document.getElementById('lightbox');
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Initialize lazy loading for gallery images
  initializeGalleryLazyLoading();
  
  console.log('Gallery initialized with', galleryImages.length, 'images');
}

// ===== OPEN LIGHTBOX =====
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const item = galleryImages[index];
  
  if (!item) return;
  
  currentImageIndex = index;
  
  const img = item.querySelector('img');
  const info = item.querySelector('.gallery-info');
  
  if (!img || img.parentElement.classList.contains('placeholder')) {
    console.log('Image not available');
    return;
  }
  
  // Set lightbox image
  const lightboxImage = document.getElementById('lightbox-image');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  
  // Set caption
  const title = info ? info.querySelector('h3').textContent : img.alt;
  const description = info ? info.querySelector('p').textContent : '';
  
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-description').textContent = description;
  
  // Show lightbox with animation
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management for accessibility
  lightbox.focus();
  
  console.log('Opened lightbox for image', index);
}

// ===== CLOSE LIGHTBOX =====
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  // Return focus to the gallery item that was clicked
  if (galleryImages[currentImageIndex]) {
    galleryImages[currentImageIndex].focus();
  }
  
  console.log('Closed lightbox');
}

// ===== NAVIGATE LIGHTBOX =====
function navigateLightbox(direction) {
  // Calculate new index with wrapping
  let newIndex = currentImageIndex + direction;
  
  if (newIndex < 0) {
    newIndex = galleryImages.length - 1;
  } else if (newIndex >= galleryImages.length) {
    newIndex = 0;
  }
  
  // Skip placeholder images
  let attempts = 0;
  while (attempts < galleryImages.length) {
    const img = galleryImages[newIndex].querySelector('img');
    if (img && !img.parentElement.classList.contains('placeholder')) {
      openLightbox(newIndex);
      return;
    }
    newIndex = (newIndex + direction + galleryImages.length) % galleryImages.length;
    attempts++;
  }
  
  console.log('No valid images to navigate to');
}

// ===== KEYBOARD NAVIGATION =====
function handleKeyboardNavigation(e) {
  const lightbox = document.getElementById('lightbox');
  
  if (!lightbox.classList.contains('active')) return;
  
  switch(e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      navigateLightbox(-1);
      break;
    case 'ArrowRight':
      e.preventDefault();
      navigateLightbox(1);
      break;
    case 'Home':
      e.preventDefault();
      openLightbox(0);
      break;
    case 'End':
      e.preventDefault();
      openLightbox(galleryImages.length - 1);
      break;
  }
}

// ===== TOUCH SWIPE SUPPORT (Mobile) =====
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  
  if (lightbox) {
    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
  }
});

function handleSwipe() {
  const swipeThreshold = 50;
  const horizontalDiff = touchStartX - touchEndX;
  const verticalDiff = Math.abs(touchStartY - touchEndY);
  
  // Only register as horizontal swipe if vertical movement is minimal
  if (verticalDiff < swipeThreshold && Math.abs(horizontalDiff) > swipeThreshold) {
    if (horizontalDiff > 0) {
      // Swiped left - next image
      navigateLightbox(1);
    } else {
      // Swiped right - previous image
      navigateLightbox(-1);
    }
  }
  
  // Swipe down to close
  if (touchStartY - touchEndY < -100 && Math.abs(horizontalDiff) < swipeThreshold) {
    closeLightbox();
  }
}

// ===== LAZY LOADING FOR GALLERY =====
function initializeGalleryLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    const lazyImages = document.querySelectorAll('.gallery-item img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// ===== IMAGE PRELOADING =====
function preloadAdjacentImages() {
  const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  const nextIndex = (currentImageIndex + 1) % galleryImages.length;
  
  [prevIndex, nextIndex].forEach(index => {
    const img = galleryImages[index]?.querySelector('img');
    if (img && img.src) {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    }
  });
}

// Call preload when opening lightbox
const originalOpenLightbox = openLightbox;
openLightbox = function(index) {
  originalOpenLightbox(index);
  preloadAdjacentImages();
};

// ===== ZOOM FUNCTIONALITY (Optional Enhancement) =====
let isZoomed = false;
let zoomLevel = 1;

function initializeZoomControls() {
  const lightboxImage = document.getElementById('lightbox-image');
  
  if (!lightboxImage) return;
  
  lightboxImage.addEventListener('dblclick', function() {
    if (!isZoomed) {
      this.style.transform = 'scale(2)';
      this.style.cursor = 'zoom-out';
      isZoomed = true;
    } else {
      this.style.transform = 'scale(1)';
      this.style.cursor = 'zoom-in';
      isZoomed = false;
    }
  });
  
  // Reset zoom when changing images
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      lightboxImage.style.transform = 'scale(1)';
      isZoomed = false;
    }
  });
}

// Initialize zoom controls
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initializeZoomControls, 100);
});

// Expose functions to global scope
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;