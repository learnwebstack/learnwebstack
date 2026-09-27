import type { DayContent } from "../types";

export const day05: DayContent = {
  day: 5,
  slug: "day-05",
  title: "Responsive Design & CSS Animations",
  subtitle: "Make sites that adapt to any screen and feel alive with transitions and animations",
  date: "Day 05",
  duration: "3 hours",
  category: "Responsive & Animation",
  tags: ["CSS", "Responsive", "Media Queries", "Animations", "Transitions"],
  description:
    "Learn how to design websites that look great on phones, tablets, and desktops using media queries and mobile-first thinking, then bring them to life with smooth transitions, transforms, and keyframe animations — all with native CSS, no libraries required.",
  learningObjectives: [
    "Write mobile-first media queries and choose a sensible breakpoint strategy",
    "Use viewport units and modern functions like clamp() for fluid typography",
    "Serve the right image for each device with responsive image techniques",
    "Add smooth CSS transitions for hover, focus, and state changes",
    "Build keyframe animations and use transforms without hurting performance",
  ],
  prerequisites: [
    "Completion of Days 3–4 — CSS Fundamentals and Layout",
    "Familiarity with Flexbox and CSS Grid",
    "A browser with devtools for testing responsive designs",
  ],
  topics: [
    "Media Queries & Breakpoints",
    "Mobile-First Design",
    "Viewport Units & Fluid Typography",
    "Responsive Images",
    "CSS Transitions",
    "CSS Transforms & Keyframe Animations",
  ],
  sections: [
    {
      id: "media-queries-breakpoints",
      heading: "Media Queries & Breakpoints",
      level: 2,
      paragraphs: [
        "Media queries are the backbone of responsive design. They let you apply CSS only when certain conditions are true — most commonly, when the viewport is at least or at most a particular width. A breakpoint is the width at which your layout changes; choosing good breakpoints is more art than science, and the best approach is to let your content drive the choice rather than specific device sizes.",
        "Common breakpoints are 640px (phones → tablets), 768px (tablets → small laptops), 1024px (laptops → desktops), and 1280px (large desktops). But treat these as starting points, not rules. Resize the window and add breakpoints where the layout starts to break, not where a popular device happens to sit.",
      ],
      code: [
        {
          language: "css",
          filename: "media-queries.css",
          code: `/* Default styles = mobile (mobile-first) */
.container {
  padding: 1rem;
  grid-template-columns: 1fr;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Print styles */
@media print {
  .no-print { display: none; }
  body { color: black; background: white; }
}

/* Dark mode via user preference */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}`,
        },
      ],
      callout: {
        type: "info",
        title: "Let Content Drive Breakpoints",
        content:
          "Don't target specific devices — new phones ship constantly. Resize the browser, watch where the layout breaks, and add a breakpoint there. This approach ages far better than chasing device sizes.",
      },
    },
    {
      id: "mobile-first-design",
      heading: "Mobile-First Design",
      level: 2,
      paragraphs: [
        "Mobile-first means writing your base styles for the smallest screens, then progressively enhancing them for larger viewports using min-width media queries. This forces you to focus on essential content first and produces smaller, faster CSS for mobile users — who often have slower connections.",
        "The alternative — desktop-first with max-width queries — tends to ship unnecessary overrides to mobile users, since every desktop style must be 'undone' on smaller screens. Mobile-first keeps the default lean and only adds complexity when there's room to do so.",
      ],
      code: [
        {
          language: "css",
          filename: "mobile-first.css",
          code: `/* Base = mobile. Single column, minimal chrome. */
.layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

/* Tablet: add a sidebar */
@media (min-width: 768px) {
  .layout {
    grid-template-columns: 240px 1fr;
  }
}

/* Desktop: more breathing room, larger fonts */
@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 260px 1fr 200px;
    gap: 2rem;
  }
  body { font-size: 1.125rem; }
}`,
        },
      ],
      list: {
        ordered: true,
        items: [
          "Start with the mobile layout — what's the absolute minimum the user needs?",
          "Add min-width media queries to enhance the layout as space becomes available",
          "Test on real devices or browser devtools' device emulation at every step",
          "Verify touch targets are at least 44×44px on mobile for accessibility",
          "Optimize images and lazy-load below-the-fold media for faster mobile loads",
        ],
      },
      callout: {
        type: "success",
        title: "Why Mobile-First Wins",
        content:
          "Mobile-first produces smaller CSS for phones (no overrides to download), forces you to prioritize content, and matches Google's mobile-first indexing. It's the industry-standard approach for new projects.",
      },
    },
    {
      id: "viewport-units-fluid-typography",
      heading: "Viewport Units & Fluid Typography",
      level: 2,
      paragraphs: [
        "Viewport units — vw (1% of viewport width), vh (1% of viewport height), vmin, and vmax — let sizes scale with the screen. They're perfect for hero sections, full-screen layouts, and fluid typography. Combined with the clamp() function, you can make text that scales smoothly between a minimum and maximum size without any media queries.",
        "Avoid using pure vw for body text — it can become unreadable on very wide or very narrow screens. Instead, prefer rem for body text and use clamp() for headings and hero copy where you want a fluid effect.",
      ],
      code: [
        {
          language: "css",
          code: `/* Hero section that fills the viewport */
.hero {
  min-height: 100vh;       /* full viewport height */
  display: grid;
  place-items: center;
  padding: 2rem;
}

/* Fluid heading: scales between 2rem and 4rem
   based on viewport width, no media queries needed */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

/* Fluid body text */
p {
  font-size: clamp(1rem, 1.1vw + 0.9rem, 1.25rem);
  line-height: 1.6;
}

/* vmin = the smaller of vw/vh, great for square elements */
.avatar {
  width: 20vmin;
  height: 20vmin;
  border-radius: 50%;
}

/* Use dvh for mobile browsers that hide the URL bar */
.full-height {
  height: 100dvh;  /* dynamic viewport height */
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Watch Out for vh on Mobile",
        content:
          "On mobile browsers, 100vh includes the area behind the URL bar, which can cause content to be cut off. Use 100dvh (dynamic viewport height) or 100svh (small viewport height) instead — they account for browser chrome changes.",
      },
    },
    {
      id: "responsive-images",
      heading: "Responsive Images",
      level: 2,
      paragraphs: [
        "Serving a 3000px-wide image to a phone wastes bandwidth and slows the page. The <img> element's srcset and sizes attributes let the browser choose the best image for the current device. The <picture> element goes further, letting you swap images entirely — useful for art direction (cropping differently on mobile) or serving modern formats like WebP with JPEG fallbacks.",
        "Always set width and height attributes (or aspect-ratio in CSS) on images. This reserves space before the image loads, preventing layout shift — a key metric for both user experience and SEO.",
      ],
      code: [
        {
          language: "html",
          code: `<!-- srcset: browser picks the best size -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1200.jpg 1200w,
          photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  width="800" height="600"
  alt="A mountain lake at sunrise"
  loading="lazy"
  decoding="async">

<!-- picture: art direction + modern formats -->
<picture>
  <source type="image/avif" srcset="hero.avif">
  <source type="image/webp" srcset="hero.webp">
  <source media="(max-width: 600px)" srcset="hero-mobile.jpg">
  <img src="hero.jpg" width="1600" height="900"
       alt="Hero banner showing the product" decoding="async">
</picture>`,
        },
      ],
      list: {
        items: [
          "srcset — list of image candidates with their widths (400w, 800w, ...)",
          "sizes — hint to the browser about how wide the image will be displayed",
          "<picture> — wraps multiple <source> elements for format or art-direction switching",
          "loading=\"lazy\" — defer loading until the image is near the viewport",
          "decoding=\"async\" — let the browser decode the image off the main thread",
          "width and height — reserve space to prevent layout shift",
        ],
      },
      callout: {
        type: "tip",
        title: "Lazy-Load Below the Fold",
        content:
          "Add loading=\"lazy\" to images that aren't visible on initial load. The browser will fetch them only when the user scrolls near them, dramatically speeding up the initial page render.",
      },
    },
    {
      id: "css-transitions",
      heading: "CSS Transitions",
      level: 2,
      paragraphs: [
        "Transitions smoothly interpolate a property from one value to another over a duration. They're perfect for hover states, focus effects, and any property change you want to feel smooth rather than instant. The transition property is a shorthand for transition-property, transition-duration, transition-timing-function, and transition-delay.",
        "Not every property can be transitioned efficiently. Transform and opacity are GPU-accelerated and stay smooth even on mobile. Animating width, top, or margin triggers layout recalculation on every frame and can stutter. Stick to transform and opacity for performance-critical animations.",
      ],
      code: [
        {
          language: "css",
          filename: "transitions.css",
          code: `.button {
  background-color: #1a73e8;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  /* Transition multiple properties with one declaration */
  transition: background-color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
}

.button:hover {
  background-color: #1557b0;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(26, 115, 232, 0.3);
}

.button:active {
  transform: translateY(0);
}

/* Smooth color theme switch */
:root {
  --bg: white;
  --text: #222;
  transition: background-color 0.4s, color 0.4s;
}

:root.dark {
  --bg: #1a1a1a;
  --text: #f0f0f0;
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Animate Transform, Not Position",
        content:
          "Animating top/left/width/margin forces the browser to recalculate layout every frame. Animating transform and opacity only triggers compositing, which is GPU-accelerated and stays buttery smooth.",
      },
    },
    {
      id: "transforms-and-animations",
      heading: "CSS Transforms & Keyframe Animations",
      level: 2,
      paragraphs: [
        "The transform property lets you move, scale, rotate, and skew elements without affecting surrounding layout — perfect for hover effects and entrance animations. Combine transform with @keyframes and the animation property to create reusable, looping, or one-shot animations entirely in CSS.",
        "Use animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, and animation-fill-mode — or the animation shorthand — to control your keyframe animations. For accessibility, respect the prefers-reduced-motion media query and disable non-essential animation for users who request it.",
      ],
      code: [
        {
          language: "css",
          filename: "animations.css",
          code: `/* Transform on hover — no layout shift */
.card {
  transition: transform 0.25s ease;
}
.card:hover {
  transform: scale(1.03) translateY(-4px);
}

/* Keyframe animation: a gentle pulse */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.08); opacity: 0.8; }
}

.badge-live {
  animation: pulse 1.6s ease-in-out infinite;
}

/* One-shot entrance animation */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.intro {
  animation: fade-up 0.6s ease both;
}

/* Respect users who prefer less motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
        },
      ],
      table: {
        headers: ["Animation Property", "Purpose", "Example"],
        rows: [
          ["animation-name", "Which @keyframes to use", "fade-up"],
          ["animation-duration", "How long one cycle takes", "0.6s"],
          ["animation-timing-function", "Easing curve", "ease, linear, ease-in-out"],
          ["animation-delay", "Wait before starting", "0.2s"],
          ["animation-iteration-count", "How many times to run", "1, infinite"],
          ["animation-direction", "Play forward/reverse/alternate", "alternate"],
          ["animation-fill-mode", "Styles applied before/after", "both, forwards"],
        ],
      },
      callout: {
        type: "success",
        title: "Honor prefers-reduced-motion",
        content:
          "Some users experience motion sickness or have vestibular disorders. Wrap non-essential animations in a prefers-reduced-motion: reduce media query and disable them. It's a small change that makes your site dramatically more accessible.",
      },
    },
  ],
  keyTakeaways: [
    "Use min-width media queries and write base styles for mobile first — smaller CSS, better performance",
    "Let content drive breakpoint choices, not specific device sizes",
    "clamp() and viewport units enable fluid typography that adapts without media queries",
    "Use srcset, sizes, and <picture> to serve appropriately sized images and modern formats",
    "Animate transform and opacity for smooth 60fps effects, and always respect prefers-reduced-motion",
  ],
  exercises: [
    "Take a fixed-width layout from Day 4 and make it fully responsive using mobile-first media queries",
    "Build a hero section with fluid typography using clamp() and full viewport height using dvh",
    "Add srcset and sizes to a gallery of images so phones download smaller versions, and add loading=\"lazy\" to all below-the-fold images",
    "Create a button with a smooth hover transition (transform + box-shadow), then build a fade-up keyframe animation that runs once on page load — and disable both under prefers-reduced-motion",
  ],
  resources: [
    { label: "MDN: Using Media Queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries" },
    { label: "MDN: Using CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations" },
    { label: "web.dev: Responsive Images", url: "https://web.dev/learn/images" },
  ],
};
