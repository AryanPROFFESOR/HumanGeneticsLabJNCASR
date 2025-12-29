# HMG Lab Website

Professional research laboratory website featuring modern design, smooth animations, and responsive layout.

## 📁 Project Structure

```
hmg-lab-website/
│
├── index.html                          # Main HTML file
│
├── assets/
│   ├── css/
│   │   ├── base.css                   # Variables, resets, typography
│   │   ├── layout.css                 # Grid systems, responsive design
│   │   ├── animations.css             # Keyframes, transitions, motion
│   │   └── components.css             # Cards, buttons, forms, navbar
│   │
│   ├── js/
│   │   ├── main.js                    # Core functionality, DOM init
│   │   ├── animations.js              # Scroll effects, reveal logic
│   │   └── interactions.js            # Forms, user interactions
│   │
│   ├── images/                        # Images and graphics (add your files here)
│   └── fonts/                         # Custom fonts (add your files here)
│
├── README.md                           # Project documentation
└── .gitignore                         # Git ignore rules
```

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#1a1a1a`
- **Primary Light**: `#ffffff`
- **Accent Color**: `#8B4513` (Brown)
- **Accent Light**: `#D4A574` (Tan)
- **Text Dark**: `#333333`
- **Text Gray**: `#666666`
- **Border Color**: `#e0e0e0`

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Heading Weight**: 700 (Bold)
- **Body Weight**: 400 (Regular)
- **Line Height**: 1.6 (Body), 1.2 (Headings)

### Transitions
- **Default**: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- **Fast**: `all 0.3s ease`
- **Smooth**: `all 0.6s ease-out`

## 📖 CSS Files Guide

### base.css
Contains global styles, CSS variables, resets, and typography:
- CSS custom properties (variables)
- HTML/Body resets
- Typography scales (h1-h6, p, etc.)
- Global utility classes

### layout.css
Manages grid systems, containers, and responsive design:
- Grid layouts for sections
- Container widths
- Responsive breakpoints (@media queries)
- Section spacing

### animations.css
All visual motion and animations:
- @keyframes definitions
- Hover effects
- Scroll animations
- Transition utilities

### components.css
Reusable UI components:
- Navigation bar and menus
- Cards (content, research, member, gallery)
- Forms and inputs
- Buttons
- Footer

## 🚀 JavaScript Files Guide

### main.js
Core application functionality:
- DOM initialization on page load
- Navigation smooth scrolling
- Section toggling
- Form initialization
- Utility functions exposed to global scope

### animations.js
Visual effects and animations:
- Scroll reveal animations
- Parallax effects
- Gallery lightbox
- Smooth scroll enhancements
- Sticky header behavior
- Card tilt effects
- Counter animations

### interactions.js
User interaction handlers:
- Form validation
- Form submission handling
- Notification system
- Dropdown toggles
- Modal/popup management
- Button ripple effects
- Clipboard functionality
- Keyboard shortcuts

## 🛠️ Installation

1. **Add Images**: Place your images in `assets/images/`
2. **Add Fonts**: Place custom fonts in `assets/fonts/`
3. **Update HTML**: Edit `index.html` with your content
4. **Customize Colors**: Modify CSS variables in `base.css`
5. **Deploy**: Upload to your web server

## 📝 Adding Content

### Images
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

### Custom Fonts
```css
@font-face {
  font-family: 'CustomFont';
  src: url('../fonts/your-font.woff2') format('woff2');
}
```

### New Sections
1. Add HTML section with unique ID
2. Create navigation link pointing to section ID
3. Add styling to appropriate CSS file
4. JavaScript will handle smooth scrolling automatically

## 🔧 Configuration

### Update Navbar
Edit the navigation menu in `index.html` to add/remove links:
```html
<li class="nav-item">
  <a href="#section-id" class="nav-link">Section Name</a>
</li>
```

### Modify Colors
Update CSS variables in `assets/css/base.css`:
```css
:root {
  --accent: #8B4513;  /* Change to your color */
}
```

### Add Animations
Edit timing in `base.css`:
```css
--transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);  /* Adjust timing */
```

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+ (full width)
- **Tablet**: 768px - 1399px
- **Mobile**: < 768px

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy (h1-h6)
- ARIA labels where applicable
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast compliance

## 🚀 Performance Tips

1. **Optimize Images**: Compress and use modern formats (WebP)
2. **Lazy Loading**: Add `loading="lazy"` to off-screen images
3. **Minify CSS/JS**: For production deployment
4. **Cache Headers**: Set proper cache headers on server
5. **CDN**: Use CDN for static assets

## 🐛 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is available for use. Please respect copyright and intellectual property rights.

## 📞 Support

For questions or issues, contact the development team or refer to the project documentation.

---

**Last Updated**: December 2025
**Version**: 1.0.0
