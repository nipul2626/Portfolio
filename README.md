# 🌌 Nipul Pramod Rathod – Cosmic Portfolio

This project is my personal portfolio website built using **Next.js (App Router)** and **Tailwind CSS**.  
The theme is inspired by space exploration, where my development journey is represented as a cosmic mission.

The goal of this project was not just to design a portfolio, but to demonstrate:

- Modern frontend architecture
- Client-side state management
- Interactive UI components
- Data persistence using localStorage
- Performance optimization
- Clean and scalable project structure

---

# 🚀 Project Overview

The website is structured into multiple sections, each representing a different part of my professional journey.

It uses:
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Canvas-based animations
- LocalStorage for feedback persistence

All sections are component-based and modular for scalability.

---

# 🧩 Website Sections Explained

## 1️⃣ Hero Section

The Hero section introduces me with an animated heading and call-to-action buttons.

**How it works:**
- Uses animated typography
- Background contains a parallax star field
- CTA buttons use hover and glow animations
- Fully responsive using Tailwind breakpoints

---

## 2️⃣ About Section

This section explains my journey as a developer.

**Features:**
- Glassmorphism card design
- Animated statistics
- Clean typography using Orbitron and Rajdhani fonts
- Responsive grid layout

---

## 3️⃣ Skills Section

Skills are grouped into:
- Frontend
- Backend
- Tools

Each skill uses animated progress bars.

**How it works:**
- Skills stored in an array
- Dynamically mapped using React
- Smooth width animation on scroll
- Tailwind utility classes for styling

---

## 4️⃣ Projects Section

Projects are displayed as planetary-style cards.

Each card includes:
- Title
- Description
- Tech stack tags
- Hover animations

**Implementation details:**
- Data-driven rendering using an array
- Gradient overlays
- Interactive hover scale effects

---

## 5️⃣ Testimonials Section

This section includes a carousel slider.

**How it works:**
- Uses React state to control index
- Auto-rotation with interval
- Manual navigation buttons
- Smooth transition animations

---

## 6️⃣ Contact Section

The contact form validates:
- Name (minimum length, no numbers)
- Email (regex validation)
- Message (minimum characters)

**Technical implementation:**
- Controlled inputs using `useState`
- Field-level validation
- Animated error messages
- Success animation after submission

---

# 📡 Transmission Archive (Feedback Storage System)

To fulfill the assignment requirement of storing feedback, I implemented a **Transmission Archive system** using the browser’s `localStorage`.

## How It Works

1. User submits the contact form.
2. Data is validated.
3. A feedback object is created containing:
  - Name
  - Email
  - Subject (optional)
  - Message
  - Date & Time (`new Date().toLocaleString()`)
4. The object is stored in `localStorage` under the key `"spaceFeedback"`.
5. The user is redirected to:

```
/transmissions
```

---

## Transmissions Page

This page:

- Is a client component (`'use client'`)
- Uses `useEffect()` to safely load localStorage data
- Stores transmissions in React state
- Dynamically renders feedback cards

### Features:
- Persistent storage (data remains after refresh)
- Individual delete button per transmission
- "Clear All Transmissions" option
- Empty state message when no data exists
- Styled using the same cosmic glass theme

This demonstrates:
- Web Storage API usage
- React state synchronization
- Client-side routing using `useRouter()`
- CRUD-style interaction (Create, Read, Delete)

---

# 🎨 Design System

## Color Theme

Primary Colors:
- Deep Space Black: #000000 – #0a0a1a
- Cosmic Purple: #a855f7
- Stellar Blue: #3b82f6
- Pulsar Pink: #ec4899
- Nova Orange: #f97316

All colors are controlled using CSS variables inside `globals.css`.

---

## Typography

Fonts configured in `app/layout.tsx`:

- Orbitron → Headings
- Rajdhani → Body
- Space Mono → Technical / Code sections

---

# 🌠 Parallax Background System

The background star field is rendered using a Canvas component.

**How it works:**
- Uses `requestAnimationFrame`
- Star objects stored in an array
- Different speed layers for depth illusion
- Reduced star count on mobile devices
- Respects `prefers-reduced-motion`

This keeps performance optimized while maintaining visual richness.

---

# ⚡ Performance Optimization

- Canvas rendering optimized for 60fps
- Lazy-loaded components where necessary
- Passive scroll listeners
- Mobile star count reduction (200 instead of 400)
- No heavy external images (CSS & Canvas-based visuals)
- Next.js automatic route-based code splitting

---

# ♿ Accessibility

- Semantic HTML structure
- Proper ARIA labels
- Visible focus states
- High color contrast (WCAG AA compliant)
- Motion reduction support

---

# 🗂 Project Structure

```
app/
  layout.tsx
  globals.css
  page.tsx
  transmissions/page.tsx

components/
  ParallaxBackground.tsx
  ScrollProgress.tsx
  Header.tsx
  HeroSection.tsx
  AboutSection.tsx
  SkillsSection.tsx
  ProjectsSection.tsx
  TestimonialsSection.tsx
  ContactSection.tsx
  Footer.tsx
```

Each section is modular and reusable.

---

# 🛠 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Canvas API
- LocalStorage API

No backend or database is used.  
All data persistence is handled on the client side.

---

# 📬 Contact

- Email: nipulrathod34@gmail.com
- LinkedIn: https://linkedin.com/in/nipulpramod
- GitHub: https://github.com/nipul

---

Built with curiosity, creativity, and a love for clean architecture.