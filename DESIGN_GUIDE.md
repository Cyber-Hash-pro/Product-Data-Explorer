# 🎨 UI/UX Design Guide

## Color Palette

### Primary Colors
```
Blue:    #2563eb (rgb(37, 99, 235))
Purple:  #9333ea (rgb(147, 51, 234))
```

### Gradient Combinations
```css
/* Main Gradient (Blue to Purple) */
background: linear-gradient(to right, #2563eb, #9333ea);

/* Light Gradient */
background: linear-gradient(to right, #dbeafe, #f3e8ff);

/* Background Gradient */
background: linear-gradient(to bottom right, #eff6ff, #ffffff, #faf5ff);
```

### Neutral Colors
```
White:       #ffffff
Light Gray:  #f9fafb, #f3f4f6, #e5e7eb
Medium Gray: #9ca3af, #6b7280
Dark Gray:   #374151, #1f2937
Black:       #111827
```

### Status Colors
```
Success: #10b981 (green)
Error:   #ef4444 (red)
Warning: #f59e0b (amber)
Info:    #3b82f6 (blue)
```

---

## Typography Scale

### Font Family
```css
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Font Sizes
```
text-xs:    0.75rem  (12px)
text-sm:    0.875rem (14px)
text-base:  1rem     (16px)
text-lg:    1.125rem (18px)
text-xl:    1.25rem  (20px)
text-2xl:   1.5rem   (24px)
text-3xl:   1.875rem (30px)
text-4xl:   2.25rem  (36px)
```

### Font Weights
```
font-normal:   400
font-medium:   500
font-semibold: 600
font-bold:     700
```

---

## Spacing System

### Padding/Margin Scale
```
p-1:  0.25rem (4px)
p-2:  0.5rem  (8px)
p-3:  0.75rem (12px)
p-4:  1rem    (16px)
p-5:  1.25rem (20px)
p-6:  1.5rem  (24px)
p-8:  2rem    (32px)
```

### Gap Scale (Grid/Flex)
```
gap-2: 0.5rem  (8px)
gap-3: 0.75rem (12px)
gap-4: 1rem    (16px)
gap-6: 1.5rem  (24px)
```

---

## Border Radius

### Roundedness
```
rounded-lg:   0.5rem   (8px)   - Small elements
rounded-xl:   0.75rem  (12px)  - Cards, buttons
rounded-2xl:  1rem     (16px)  - Large cards
rounded-3xl:  1.5rem   (24px)  - Modals
rounded-full: 9999px           - Circles, badges
```

---

## Shadows

### Shadow Levels
```css
/* Light Shadow */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Medium Shadow (Default) */
shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Large Shadow */
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Extra Large Shadow */
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

/* 2XL Shadow (Modals) */
shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
```

---

## Component Styles

### Button Primary
```css
.btn-primary {
  background: linear-gradient(to right, #2563eb, #9333ea);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, #1d4ed8, #7e22ce);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

### Card
```css
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  transform: translateY(-8px);
  border-color: #dbeafe;
}
```

### Input Field
```css
.input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #2563eb;
  ring: 2px solid rgba(37, 99, 235, 0.2);
}
```

---

## Layout Patterns

### Container Sizes
```css
/* Maximum widths */
max-w-7xl:  80rem  (1280px) - Main content
max-w-4xl:  56rem  (896px)  - Modals
max-w-md:   28rem  (448px)  - Forms
```

### Grid Layouts
```css
/* Product Grid */
grid-cols-1              /* Mobile */
sm:grid-cols-2           /* Tablet */
lg:grid-cols-3           /* Desktop */
xl:grid-cols-4           /* Large Desktop */
gap-6                    /* Space between items */
```

### Flex Layouts
```css
/* Header Layout */
flex justify-between items-center

/* Card Content */
flex flex-col gap-4
```

---

## Animations

### Custom Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Transition Durations
```css
transition-all duration-300  /* Standard: 300ms */
transition-all duration-500  /* Slow: 500ms */
transition-all duration-200  /* Fast: 200ms */
```

### Hover Transforms
```css
/* Card Hover */
transform: translateY(-8px);

/* Button Hover */
transform: scale(1.05);

/* Image Hover */
transform: scale(1.1);
```

---

## Icon System

### Icons Used (SVG)
```
Search:      magnifying glass
Filter:      funnel
Sort:        arrows up/down
User:        person silhouette
Book:        open book
Star:        star (filled/outline)
Close:       X mark
Plus:        plus sign
Check:       checkmark
Alert:       exclamation
Info:        information circle
Spinner:     rotating circle
```

### Icon Sizes
```
w-4 h-4:  16px  - Inline with text
w-5 h-5:  20px  - Buttons, labels
w-6 h-6:  24px  - Headers
w-8 h-8:  32px  - Large features
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```css
/* Mobile First */
default:    0px      (all devices)
sm:         640px    (small tablets)
md:         768px    (tablets)
lg:         1024px   (laptops)
xl:         1280px   (desktops)
2xl:        1536px   (large desktops)
```

### Usage Example
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Adapts column count based on screen size */}
</div>
```

---

## UI Component Specifications

### Product Card
```
Dimensions:
- Width: Flexible (grid-based)
- Height: Auto
- Image Height: 256px (h-64)
- Padding: 20px (p-5)
- Border Radius: 16px (rounded-2xl)
- Shadow: Large (shadow-lg)
- Hover: Extra Large shadow (shadow-2xl)
- Transform: translateY(-8px) on hover
```

### Product Modal
```
Dimensions:
- Max Width: 896px (max-w-4xl)
- Max Height: 90vh
- Border Radius: 24px (rounded-3xl)
- Shadow: 2XL (shadow-2xl)
- Backdrop: Black 50% opacity + blur
- Animation: slideUp 0.4s
```

### Scraper Form
```
Dimensions:
- Width: Full container
- Padding: 32px (p-8)
- Border Radius: 16px (rounded-2xl)
- Shadow: Large (shadow-lg)
- Border: 1px solid gray-100
```

### Input Fields
```
Height: 48px
Padding: 12px 16px
Border: 1px solid
Border Radius: 12px (rounded-xl)
Focus Ring: 2px blue
```

### Buttons
```
Primary Button:
- Padding: 12px 32px (py-3 px-8)
- Border Radius: 12px (rounded-xl)
- Font Weight: 600 (font-semibold)
- Shadow: Large (shadow-lg)
- Gradient: Blue to Purple

Secondary Button:
- Padding: 12px 24px
- Background: Gray-100
- Color: Gray-700
- Border Radius: 12px
```

---

## Status & Feedback

### Loading Spinner
```css
.spinner {
  width: 64px;
  height: 64px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Success Message
```css
.success {
  background: #d1fae5;
  border-left: 4px solid #10b981;
  color: #065f46;
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}
```

### Error Message
```css
.error {
  background: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #991b1b;
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}
```

---

## Accessibility

### Focus States
```css
/* All interactive elements */
.focusable:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Form inputs */
input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Color Contrast
```
- Text on white: #1f2937 (gray-800) - AAA rated
- White on gradient: WCAG AA+ compliant
- Links: Underlined or clearly styled
```

### Keyboard Navigation
```
- Tab order follows visual flow
- All interactive elements focusable
- Esc closes modal
- Enter submits forms
```

---

## Performance Optimizations

### Image Optimization
```tsx
<Image
  src={imageUrl}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-contain"
/>
```

### Lazy Loading
```tsx
// Next.js automatically lazy loads images
// Components load only when in viewport
```

### CSS Optimization
```css
/* Use transform instead of position for animations */
transform: translateY(-8px);  /* GPU accelerated */

/* Will-change for smooth animations */
will-change: transform;
```

---

## Best Practices

### 1. **Consistent Spacing**
Use multiples of 4px (Tailwind scale)

### 2. **Visual Hierarchy**
- Primary actions: Gradient buttons
- Secondary actions: Gray buttons
- Tertiary actions: Text links

### 3. **Feedback**
- Hover states on all interactive elements
- Loading states for async operations
- Success/error messages for user actions

### 4. **Responsive**
- Mobile first approach
- Touch-friendly tap targets (min 44px)
- Readable text sizes (min 16px)

### 5. **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Color contrast

---

## Component Checklist

When creating a new component, ensure:

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Hover states
- [ ] Focus states
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Accessibility (ARIA, keyboard)
- [ ] Smooth transitions
- [ ] Consistent spacing
- [ ] Type safety (TypeScript)

---

**This design system ensures a consistent, beautiful, and accessible user experience throughout the application! 🎨**
