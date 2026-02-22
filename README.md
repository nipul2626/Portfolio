# Nipul Pramod Rathod - Cosmic Portfolio

An immersive, space-themed portfolio website showcasing Nipul Pramod Rathod's journey as a full-stack developer through the metaphor of space exploration.

## Features

### Visual Design
- **Deep Space Aesthetic**: Gradient backgrounds with cosmic purple, blue, and black color palette
- **Glassmorphism UI**: Frosted glass effects with backdrop blur for modern aesthetics
- **Parallax Scrolling**: Multi-layered background with star fields that move at different speeds
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens

### Interactive Elements
- **Animated Typography**: Letter-by-letter particle animations on text elements
- **Skill Progress Bars**: Smooth animated progress indicators for technical proficiency
- **Project Carousel**: Interactive cards with hover effects and gradients
- **Testimonials Slider**: Auto-rotating carousel with manual navigation controls
- **Scroll Progress Indicator**: Visual progress bar at the top of the page
- **Navigation Header**: Sticky header with smooth transitions and mobile menu

### Sections
1. **Hero Section**: Eye-catching introduction with animated title and CTA buttons
2. **About Section**: Personal story with glassmorphic cards and orbital statistics
3. **Skills Section**: Comprehensive skill matrix organized by categories (Frontend, Backend, Tools)
4. **Projects Section**: Featured projects displayed as planetary cards with tags
5. **Testimonials Section**: Client testimonials in an auto-rotating carousel
6. **Contact Section**: Contact form with email/social links and validation
7. **Footer**: Navigation, social links, and newsletter signup

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with custom theme
- **Typography**: 
  - Orbitron (headings - futuristic)
  - Rajdhani (body text - clean, readable)
  - Space Mono (code/tech - monospace)
- **Animations**: Native CSS animations and Canvas-based particle effects

### Performance
- Canvas rendering for parallax stars (60fps target)
- Lazy loading components
- Optimized for reduced-motion preferences
- Mobile-optimized: 200 stars instead of 400 on small screens

## Color Palette

### Primary Colors
- **Deep Space Black**: #000000 to #0a0a1a
- **Cosmic Purple**: #a855f7 (primary accent)
- **Stellar Blue**: #3b82f6 (secondary accent)
- **Pulsar Pink**: #ec4899 (tertiary accent)
- **Nova Orange**: #f97316 (rare accent)

### Effects
- **Star Glow**: 0 0 20px rgba(255, 255, 255, 0.8)
- **Nebula Glow**: 0 0 40px rgba(168, 85, 247, 0.6)
- **Supernova Flash**: 0 0 60px rgba(255, 255, 255, 1)

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nipul-portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with font configuration
│   ├── globals.css         # Global styles and design tokens
│   ├── page.tsx            # Main page combining all sections
│   └── favicon.ico
├── components/
│   ├── ParallaxBackground.tsx   # Canvas-based star field
│   ├── ScrollProgress.tsx        # Progress bar at top
│   ├── Header.tsx                # Navigation header
│   ├── HeroSection.tsx           # Hero with animated title
│   ├── AboutSection.tsx          # About with stats
│   ├── SkillsSection.tsx         # Skills matrix
│   ├── ProjectsSection.tsx       # Featured projects
│   ├── TestimonialsSection.tsx   # Testimonials carousel
│   ├── ContactSection.tsx        # Contact form
│   └── Footer.tsx                # Footer navigation
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
└── package.json             # Dependencies
```

## Customization

### Updating Portfolio Content

1. **Hero Title**: Edit `components/HeroSection.tsx` line with "NIPUL PRAMOD RATHOD"
2. **About Content**: Modify `components/AboutSection.tsx` paragraph text
3. **Skills**: Add/edit skills array in `components/SkillsSection.tsx`
4. **Projects**: Update `projects` array in `components/ProjectsSection.tsx`
5. **Testimonials**: Modify `testimonials` array in `components/TestimonialsSection.tsx`
6. **Contact Links**: Update links in `components/ContactSection.tsx` and `components/Footer.tsx`

### Color Customization

Edit color variables in `/app/globals.css`:
- CSS custom properties define all colors
- Update the `:root` section to change the color scheme
- Animations reference these variables (e.g., `var(--primary)`)

### Typography

Fonts are configured in `app/layout.tsx`:
- Modify font imports from `next/font/google`
- Update font weights or add new weights
- Tailwind config in `tailwind.config.ts` references these fonts

## Performance Optimization

- **Parallax Background**: Canvas rendering with request animation frame throttling
- **Scroll Events**: Passive event listeners to prevent blocking
- **Mobile Optimization**: Reduced particle count on small screens
- **Image Handling**: All visual elements are CSS/Canvas-based (no external images)
- **Code Splitting**: Next.js automatic code splitting per route

## Accessibility

- Semantic HTML elements throughout
- ARIA labels on interactive controls
- Focus states on all buttons and inputs
- Color contrast meets WCAG AA standards
- Respects `prefers-reduced-motion` for animations

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Blog section with cosmic-themed articles
- [ ] Interactive 3D space scene (Three.js)
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Backend form submission
- [ ] Analytics integration
- [ ] Dynamic project loading from CMS

## Deployment

Deploy to Vercel with one click:

```bash
vercel deploy
```

Or connect your GitHub repository for automatic deployments on push.

## License

This project is open source and available under the MIT License.

## Contact

- **Email**: hello@nipul.dev
- **LinkedIn**: [linkedin.com/in/nipulpramod](https://linkedin.com/in/nipulpramod)
- **GitHub**: [github.com/nipul](https://github.com/nipul)

---

Built with passion and cosmic inspiration by Nipul Pramod Rathod
