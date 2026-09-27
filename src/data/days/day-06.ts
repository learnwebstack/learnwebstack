import type { DayContent } from "../types";

export const day06: DayContent = {
  day: 6,
  slug: "day-06",
  title: "CSS Advanced: Variables, Functions & Modern CSS",
  subtitle: "Write maintainable CSS with custom properties, modern functions, nesting, and BEM",
  date: "Day 06",
  duration: "3 hours",
  category: "Advanced CSS",
  tags: ["CSS", "Custom Properties", "CSS Nesting", "Container Queries", "BEM"],
  description:
    "Level up your CSS with custom properties (variables), powerful functions like calc() and clamp(), native CSS nesting, container queries, and the BEM methodology. These modern features let you write less code, theme entire sites from a single source of truth, and keep large stylesheets maintainable.",
  learningObjectives: [
    "Define and use CSS custom properties for theming and dynamic values",
    "Apply CSS functions: calc(), var(), clamp(), min(), and max()",
    "Write nested CSS natively in stylesheets without preprocessors",
    "Build truly component-scoped responsive layouts with container queries",
    "Structure maintainable stylesheets using the BEM naming convention",
  ],
  prerequisites: [
    "Completion of Days 3–5 — CSS Fundamentals, Layout, and Responsive",
    "Comfort with selectors, the box model, and media queries",
    "A small project to refactor with modern CSS",
  ],
  topics: [
    "CSS Custom Properties (Variables)",
    "CSS Functions: calc, var, clamp, min, max",
    "Native CSS Nesting",
    "Container Queries",
    "Modern CSS Features",
    "CSS Architecture with BEM",
  ],
  sections: [
    {
      id: "css-custom-properties",
      heading: "CSS Custom Properties (Variables)",
      level: 2,
      paragraphs: [
        "CSS custom properties — also called CSS variables — let you store values in a name and reuse them throughout a stylesheet. Unlike preprocessor variables (Sass, Less), they live in the DOM, can be scoped to any element, can be overridden at runtime, and can be read or changed from JavaScript. This makes them perfect for theming, design tokens, and dynamic UI.",
        "Custom properties are declared with a leading double dash (--) and accessed with the var() function. They follow normal cascade rules: a property declared on :root is global, while one declared on .card is scoped to that element and its descendants.",
      ],
      code: [
        {
          language: "css",
          filename: "variables.css",
          code: `:root {
  /* Color tokens */
  --color-primary: #1a73e8;
  --color-primary-dark: #1557b0;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 2rem;

  /* Typography */
  --font-body: "Inter", system-ui, sans-serif;
  --radius: 8px;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  padding: var(--space-4);
}

.button {
  background: var(--color-primary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius);
  transition: background-color 0.2s;
}

.button:hover {
  background: var(--color-primary-dark);
}

/* Dark theme — override only the tokens, everything else updates */
[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #f0f0f0;
  --color-primary: #5b9bf5;
  --color-primary-dark: #4a8be0;
}`,
        },
      ],
      callout: {
        type: "success",
        title: "Theme an Entire Site by Changing a Few Variables",
        content:
          "Custom properties enable real theming. Define color, spacing, and radius tokens on :root, then override just those tokens under [data-theme=\"dark\"] or a modifier class. Every component that uses var() updates automatically.",
      },
    },
    {
      id: "css-functions",
      heading: "CSS Functions: calc, var, clamp, min, max",
      level: 2,
      paragraphs: [
        "Modern CSS ships with several powerful functions. calc() performs math at runtime — useful for mixing units like 100% - 2rem. var() reads a custom property with an optional fallback. clamp() takes a minimum, preferred, and maximum value, perfect for fluid typography that scales between bounds. min() and max() pick the smaller or larger of two values, which is great for responsive sizing without media queries.",
        "These functions compose: you can nest var() inside calc() inside clamp(). That flexibility replaces much of what used to require preprocessors or JavaScript.",
      ],
      code: [
        {
          language: "css",
          filename: "functions.css",
          code: `/* calc: mix units in a single calculation */
.sidebar {
  width: calc(100% - 240px);     /* full width minus fixed sidebar */
  padding: calc(var(--space-3) + 0.5rem);
}

/* clamp: fluid typography with bounds */
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);
}

/* min: pick the smaller — caps an element's width on huge screens */
.hero {
  width: min(100%, 1200px);
  margin-inline: auto;
}

/* max: pick the larger — ensures a minimum size */
.icon {
  width: max(48px, 4vmin);
}

/* Composed: var with fallback, inside calc, inside clamp */
:root { --max-card-width: 360px; }

.card {
  width: clamp(280px,
               calc(100% - 2rem),
               var(--max-card-width, 360px));
}`,
        },
      ],
      table: {
        headers: ["Function", "Purpose", "Example"],
        rows: [
          ["calc()", "Math with mixed units", "calc(100% - 2rem)"],
          ["var()", "Read a custom property", "var(--color, #000)"],
          ["clamp()", "Bound a value between min and max", "clamp(1rem, 2vw, 2rem)"],
          ["min()", "Smallest of several values", "min(100%, 1200px)"],
          ["max()", "Largest of several values", "max(48px, 4vmin)"],
          ["minmax()", "Range for grid tracks", "minmax(200px, 1fr)"],
        ],
      },
      callout: {
        type: "tip",
        title: "clamp() Replaces Many Media Queries",
        content:
          "Before clamp(), fluid typography required several breakpoints. With clamp(min, preferred, max), one line gives you a smooth-scaling value that never goes below min or above max — no media queries needed.",
      },
    },
    {
      id: "css-nesting",
      heading: "Native CSS Nesting",
      level: 2,
      paragraphs: [
        "CSS nesting — long available in Sass and other preprocessors — is now part of native CSS. You can write a parent selector and nest child rules inside it using curly braces, mirroring the structure of your HTML. This keeps related styles together and reduces repetition, with no build step required.",
        "Nesting works for any selector, including pseudo-classes and pseudo-elements. Use the & symbol to explicitly reference the parent selector, which is especially useful for modifiers like &:hover or &.is-active. Nesting is supported in all modern browsers as of 2023.",
      ],
      code: [
        {
          language: "css",
          filename: "nesting.css",
          code: `.card {
  background: var(--color-bg);
  border-radius: var(--radius);
  padding: var(--space-3);
  transition: transform 0.2s, box-shadow 0.2s;

  /* Nested descendant selector */
  h2 {
    margin-top: 0;
    color: var(--color-text);
  }

  p {
    line-height: 1.6;
    color: #555;
  }

  /* & refers to the parent (.card) */
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  /* Modifier class on the parent */
  &.featured {
    border: 2px solid var(--color-primary);
  }

  /* Nested compound selector — needs & */
  &__badge {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
  }
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Don't Over-Nest",
        content:
          "Deeply nested rules create high-specificity selectors that are hard to override. Aim for at most two or three levels. If you find yourself nesting deeper, it's often a sign that you should split the component into smaller pieces.",
      },
    },
    {
      id: "container-queries",
      heading: "Container Queries",
      level: 2,
      paragraphs: [
        "Media queries respond to the viewport — the whole browser window. Container queries respond to a parent container's size, letting a component adapt based on where it's placed rather than the screen size. This is a game-changer for truly reusable components: the same card can render in three columns on a wide page or one column in a sidebar, all from one stylesheet.",
        "To use container queries, mark an element as a containment context with container-type: inline-size (or use the container shorthand). Then write @container rules inside child components. The component's layout now responds to its container's width, not the viewport.",
      ],
      code: [
        {
          language: "css",
          filename: "container-queries.css",
          code: `/* Define a containment context on the parent */
.sidebar,
.main {
  container-type: inline-size;
  container-name: layout;
}

/* Card adapts based on its container, not the viewport */
.card {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: 1fr;
}

/* When the container is at least 400px wide, go side-by-side */
@container layout (min-width: 400px) {
  .card {
    grid-template-columns: 120px 1fr;
    align-items: center;
  }

  .card__image {
    aspect-ratio: 1;
  }
}

/* Style container queries — adapt to the container's inline size */
@container (min-width: 600px) {
  .card {
    grid-template-columns: 1fr 2fr 1fr;
  }
}`,
        },
      ],
      callout: {
        type: "info",
        title: "Component-First Responsive",
        content:
          "Container queries let you build components that look right wherever they're dropped — in a sidebar, a hero, a grid. No more overriding styles based on context. The component owns its responsive behavior.",
      },
    },
    {
      id: "modern-css-features",
      heading: "Modern CSS Features",
      level: 2,
      paragraphs: [
        "Beyond variables, functions, nesting, and container queries, modern CSS has many features that reduce the need for JavaScript or workarounds. The :has() selector — 'the parent selector' — lets you style an element based on its descendants. Logical properties like margin-inline and padding-block make RTL and writing-mode support automatic. CSS layers (@layer) give you explicit control over cascade ordering.",
        "Other useful additions include aspect-ratio for reserving media space, accent-color for native form control theming, text-wrap: balance for headlines, and the color-mix() function for blending colors at runtime.",
      ],
      code: [
        {
          language: "css",
          code: `/* :has() — style a parent based on its children */
form:has(input[type="checkbox"]:checked) {
  outline: 2px solid var(--color-primary);
}

.card:has(img) {
  padding-top: 0; /* drop top padding when there's a banner image */
}

/* Logical properties — direction-aware, work in LTR and RTL */
.button {
  padding-inline: var(--space-3);   /* horizontal padding */
  padding-block: var(--space-2);    /* vertical padding */
  margin-inline-start: var(--space-2);
}

/* aspect-ratio — reserve space, prevent layout shift */
.video-embed {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* accent-color — theme native form controls */
input[type="checkbox"],
input[type="radio"] {
  accent-color: var(--color-primary);
}

/* color-mix — blend colors at runtime */
.muted {
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}

/* text-wrap: balance — nicer headline wrapping */
h1, h2 {
  text-wrap: balance;
}

/* @layer — explicit cascade control */
@layer base, components, utilities;

@layer base {
  body { font-family: var(--font-body); }
}

@layer components {
  .button { /* ... */ }
}

@layer utilities {
  .text-center { text-align: center; }
}`,
        },
      ],
      list: {
        items: [
          ":has() — style a parent based on what it contains",
          "Logical properties — margin-inline, padding-block for direction-aware layouts",
          "aspect-ratio — reserve space for media without padding hacks",
          "accent-color — theme checkboxes, radios, and range inputs natively",
          "color-mix() — blend two colors at runtime",
          "text-wrap: balance — balance multi-line headlines",
          "@layer — explicit cascade ordering for predictable overrides",
        ],
      },
    },
    {
      id: "css-architecture-bem",
      heading: "CSS Architecture with BEM",
      level: 2,
      paragraphs: [
        "BEM (Block, Element, Modifier) is a naming convention that makes CSS classes self-documenting and prevents specificity wars. A Block is a standalone component (.card). An Element is a part of a block, named with two underscores (.card__title). A Modifier is a variant or state, named with two dashes (.card--featured).",
        "BEM keeps specificity flat — every selector is a single class — which means overrides are predictable and !important is rarely needed. Combined with custom properties and CSS nesting, BEM scales from small components to large design systems without falling apart.",
      ],
      code: [
        {
          language: "html",
          filename: "bem.html",
          code: `<article class="card card--featured">
  <img class="card__image" src="photo.jpg" alt="...">
  <div class="card__body">
    <h2 class="card__title">Card Title</h2>
    <p class="card__text">Description goes here.</p>
    <button class="card__action card__action--primary">
      Learn More
    </button>
  </div>
</article>`,
        },
        {
          language: "css",
          filename: "bem.css",
          code: `/* Block */
.card {
  background: var(--color-bg);
  border-radius: var(--radius);
  padding: var(--space-3);
}

/* Element */
.card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius);
}

.card__title {
  margin: var(--space-2) 0;
}

.card__action {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius);
  border: 1px solid currentColor;
  background: transparent;
  cursor: pointer;
}

/* Modifier on the block */
.card--featured {
  border: 2px solid var(--color-primary);
  box-shadow: 0 8px 24px rgba(26, 115, 232, 0.15);
}

/* Modifier on the element */
.card__action--primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}`,
        },
      ],
      table: {
        headers: ["Concept", "Naming", "Example", "Purpose"],
        rows: [
          ["Block", ".block", ".card, .nav, .button", "Standalone component"],
          ["Element", ".block__element", ".card__title", "Part of a block, no standalone meaning"],
          ["Modifier", ".block--modifier", ".card--featured", "Variant or state of a block or element"],
        ],
      },
      callout: {
        type: "tip",
        title: "Flat Specificity, Clear Intent",
        content:
          "BEM's biggest win is flat specificity — every selector is a single class. No more fighting specificity wars. Read the class name and you instantly know what component it belongs to and what variant it represents.",
      },
    },
  ],
  keyTakeaways: [
    "CSS custom properties enable real theming — define tokens on :root and override them per-context",
    "calc(), clamp(), min(), and max() handle responsive math without media queries or JavaScript",
    "Native CSS nesting keeps related styles together and works in all modern browsers without a build step",
    "Container queries make components responsive based on their container, not the viewport — true reusability",
    "BEM's block__element--modifier naming keeps specificity flat and makes large stylesheets maintainable",
  ],
  exercises: [
    "Refactor a previous project's hardcoded colors and spacing into CSS custom properties on :root, then add a dark theme by overriding those variables under [data-theme=\"dark\"]",
    "Replace a media-query-based fluid heading with a single clamp() declaration that scales between 1.5rem and 3rem",
    "Take a component with deeply nested descendant selectors and rewrite it using native CSS nesting, keeping the maximum nesting depth to three levels",
    "Build a card component using BEM naming (block, element, modifier), then drop it into both a sidebar and a main grid and use a container query to make it adapt to each placement",
  ],
  resources: [
    { label: "MDN: Using CSS Custom Properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" },
    { label: "MDN: CSS Container Queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries" },
    { label: "Get BEM: Introduction", url: "https://getbem.com/introduction/" },
  ],
};
