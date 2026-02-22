# 📘 Product Requirements Document (PRD)

# Cosmic Portfolio Website
**Product Name:** Nipul Pramod Rathod – Cosmic Portfolio  
**Version:** 1.0.0  
**Product Type:** Personal Portfolio Website (Frontend Application)

---

# 1. Product Overview

The Cosmic Portfolio Website is a modern, space-themed personal portfolio built using **Next.js (App Router)** and **Tailwind CSS**.

The platform showcases:

- Professional profile and background
- Technical skills
- Featured projects
- Testimonials
- Contact system with feedback storage
- Transmission Archive page (localStorage-based persistence)

The objective of this product is to demonstrate frontend development skills, UI/UX design capability, state management, routing, and client-side data persistence.

---

# 2. Target Users

## 2.1 Recruiters
- View portfolio
- Explore skills and projects
- Access contact information

## 2.2 Clients
- Review previous work
- Submit project inquiries via contact form
- View testimonials

## 2.3 Academic Evaluators
- Evaluate implementation of frontend concepts
- Review localStorage functionality
- Assess routing and state management

---

# 3. Core Features

## 3.1 Visual Design System

- Space-themed gradient background
- Glassmorphism UI components
- Canvas-based parallax star field
- Responsive layout (mobile, tablet, desktop)
- Scroll progress indicator
- Animated typography and hover effects

---

## 3.2 Hero Section

- Animated heading (name display)
- Call-to-action buttons
- Background parallax animation
- Smooth scroll navigation

---

## 3.3 About Section

- Personal introduction
- Glass-style information cards
- Animated statistics
- Responsive grid layout

---

## 3.4 Skills Section

- Categorized skill matrix (Frontend, Backend, Tools)
- Animated progress indicators
- Data-driven rendering using arrays
- Scroll-triggered animations

---

## 3.5 Projects Section

- Featured project cards
- Technology stack tags
- Hover animations and gradient effects
- Dynamic rendering using mapped data arrays

---

## 3.6 Testimonials Section

- Auto-rotating slider
- Manual navigation controls
- Smooth transition animations
- Responsive layout

---

## 3.7 Contact Section

- Controlled form inputs using React `useState`
- Field-level validation:
    - Name validation
    - Email regex validation
    - Message length validation
- Animated error messages
- Success animation on submission

---

## 3.8 Transmission Archive (Feedback Storage)

- Stores user feedback in browser `localStorage`
- Data stored under key `"spaceFeedback"`
- Each transmission includes:
    - Name
    - Email
    - Subject (optional)
    - Message
    - Date & Time
- Redirect to `/transmissions` after submission
- Dedicated page to display stored feedback
- Delete individual transmissions
- Clear all transmissions option
- Empty state message when no data exists

---

# 4. Technical Specifications

## 4.1 Application Architecture

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS 4
- State Management: React `useState`
- Lifecycle Handling: React `useEffect`
- Routing: Next.js file-based routing
- Client Storage: Web Storage API (localStorage)
- Animation: CSS animations + Canvas API

---

## 4.2 Route Structure

### Main Page
```
/ (Home – All sections combined)
```

### Transmission Page
```
/transmissions
```

---

## 4.3 Component Structure

```
components/
  Header.tsx
  HeroSection.tsx
  AboutSection.tsx
  SkillsSection.tsx
  ProjectsSection.tsx
  TestimonialsSection.tsx
  ContactSection.tsx
  ParallaxBackground.tsx
  ScrollProgress.tsx
  Footer.tsx
```

---

# 5. Data Models

## 5.1 Transmission Object Structure

```ts
{
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
}
```

---

# 6. Security Considerations

- Client-side form validation
- Email format validation using regex
- Controlled components to prevent uncontrolled input
- No sensitive data stored in localStorage
- Read-only public display of stored feedback

---

# 7. Performance Requirements

- Canvas animation optimized using `requestAnimationFrame`
- Reduced star count on mobile devices
- Passive scroll event listeners
- Code splitting via Next.js routing
- CSS-based visuals (minimal image usage)

---

# 8. Accessibility Requirements

- Semantic HTML structure
- Keyboard focus states
- Proper color contrast
- Supports `prefers-reduced-motion`
- Responsive layout for multiple screen sizes

---

# 9. Success Criteria

The project will be considered successful if:

- All sections render responsively
- Contact form validates inputs correctly
- Feedback persists after page refresh
- Transmission page dynamically displays stored data
- Delete and Clear functions update state and localStorage correctly
- No hydration or SSR errors occur
- Smooth animations without performance issues

---

# 10. Future Enhancements (Optional)

- Backend integration for permanent data storage
- Admin dashboard for transmission management
- Email notifications
- Dark/Light theme toggle
- Analytics integration
- Deployment automation (CI/CD)

---

# Conclusion

The Cosmic Portfolio Website demonstrates modern frontend development principles including:

- Component-based architecture
- Client-side routing
- State synchronization
- Data persistence
- Animation systems
- Responsive UI design

The project serves both as a professional portfolio and as a technical demonstration of frontend engineering capability.