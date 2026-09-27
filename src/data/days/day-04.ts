import type { DayContent } from "../types";

export const day04: DayContent = {
  day: 4,
  slug: "day-04",
  title: "CSS Layout: Flexbox & CSS Grid",
  subtitle: "Build modern, responsive layouts with the two most powerful CSS layout systems",
  date: "Day 04",
  duration: "3 hours",
  category: "CSS Layout",
  tags: ["CSS", "Flexbox", "CSS Grid", "Responsive", "Layout"],
  description:
    "Move beyond basic CSS and learn the two layout engines that power modern web design: Flexbox for one-dimensional alignment and CSS Grid for two-dimensional page layouts. Master their properties, understand when to use each, and practice with real layout patterns.",
  learningObjectives: [
    "Use Flexbox properties to align and distribute items along a single axis",
    "Define CSS Grid templates for rows and columns and place items precisely",
    "Choose between Flexbox and Grid based on the layout's dimensionality",
    "Build responsive layouts that adapt to different screen sizes",
    "Apply practical layout patterns like centering, sticky headers, and card grids",
  ],
  prerequisites: [
    "Completion of Day 3 — CSS Fundamentals",
    "Comfort with the box model and basic selectors",
    "A test HTML page with several elements to arrange",
  ],
  topics: [
    "Introduction to Flexbox",
    "Flexbox Properties in Depth",
    "Introduction to CSS Grid",
    "Grid Properties and Areas",
    "Flex vs Grid: Choosing the Right Tool",
    "Practical Layout Patterns",
  ],
  sections: [
    {
      id: "introduction-to-flexbox",
      heading: "Introduction to Flexbox",
      level: 2,
      paragraphs: [
        "Flexbox (the Flexible Box Module) is a one-dimensional layout system designed for arranging items in a row or a column and distributing space between them. It solves problems that were painful for years — vertical centering, equal-height columns, and reordering items without changing the HTML.",
        "To use Flexbox, set display: flex on a container element. Its direct children become flex items and participate in flex layout. The container is called the flex container; the children are flex items. Most layout work is then a matter of choosing the right flex container properties.",
      ],
      code: [
        {
          language: "css",
          filename: "flexbox-intro.css",
          code: `.toolbar {
  display: flex;          /* enables flex layout */
  gap: 0.5rem;            /* spacing between items */
  align-items: center;    /* center items vertically */
  padding: 0.75rem 1rem;
  background: #1a1a2e;
  color: white;
}

.toolbar .logo {
  margin-right: auto;     /* pushes everything else to the right */
}

.toolbar a {
  color: white;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
}`,
        },
        {
          language: "html",
          code: `<nav class="toolbar">
  <span class="logo">MyApp</span>
  <a href="/dashboard">Dashboard</a>
  <a href="/settings">Settings</a>
  <a href="/logout">Logout</a>
</nav>`,
        },
      ],
      callout: {
        type: "info",
        title: "One Dimension at a Time",
        content:
          "Flexbox is one-dimensional — you align items along a single row OR a single column. When you need to control both rows and columns together, reach for CSS Grid instead.",
      },
    },
    {
      id: "flexbox-properties",
      heading: "Flexbox Properties in Depth",
      level: 2,
      paragraphs: [
        "The most important flex container properties are flex-direction (row or column), justify-content (alignment along the main axis), align-items (alignment along the cross axis), flex-wrap (allow items to wrap to new lines), and gap (space between items). The flex item properties — flex-grow, flex-shrink, and flex-basis, often set together via the flex shorthand — control how items grow or shrink to fill space.",
        "A common pattern is flex: 1 on items so they share available space equally. Another is margin: auto on a single item to push it (and everything after it) to the opposite end — handy for separating a logo from menu links.",
      ],
      code: [
        {
          language: "css",
          code: `.row {
  display: flex;
  flex-direction: row;       /* default */
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;           /* allow wrapping on small screens */
}

.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Equal-width cards that grow to fill the row */
.cards {
  display: flex;
  gap: 1rem;
}
.cards > * {
  flex: 1 1 200px;           /* grow, shrink, basis */
}

/* Sticky footer pattern */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page main { flex: 1; }       /* main grows to fill */

/* Centering anything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
        },
      ],
      table: {
        headers: ["Property", "Applies To", "What It Controls"],
        rows: [
          ["flex-direction", "container", "row (default), row-reverse, column, column-reverse"],
          ["justify-content", "container", "Alignment along main axis (start, center, end, space-between, space-around)"],
          ["align-items", "container", "Alignment along cross axis (stretch, center, start, end)"],
          ["flex-wrap", "container", "Whether items wrap to new lines (nowrap, wrap, wrap-reverse)"],
          ["gap", "container", "Spacing between items, without needing margins"],
          ["flex", "item", "Shorthand for grow, shrink, and basis"],
          ["align-self", "item", "Override align-items for a single item"],
          ["order", "item", "Change visual order without changing DOM order"],
        ],
      },
      callout: {
        type: "tip",
        title: "Use gap Instead of Margins",
        content:
          "The gap property replaces the old trick of adding right/bottom margins to every flex item. It only applies between items — never on the outside edges — which means no margin-collapse surprises and no :last-child overrides.",
      },
    },
    {
      id: "introduction-to-css-grid",
      heading: "Introduction to CSS Grid",
      level: 2,
      paragraphs: [
        "CSS Grid is a two-dimensional layout system. It lets you define rows and columns at the same time and place items precisely into the resulting cells, or span them across multiple rows and columns. Grid excels at full-page layouts, dashboards, photo galleries, and anything that needs both axes controlled at once.",
        "Set display: grid on a container, then define your columns and rows with grid-template-columns and grid-template-rows. Children automatically flow into the cells in order, but you can override placement with grid-column, grid-row, and grid-area.",
      ],
      code: [
        {
          language: "css",
          filename: "grid-intro.css",
          code: `.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  gap: 1rem;
}

.featured {
  grid-column: span 2;   /* takes up two columns */
  grid-row: span 2;      /* takes up two rows */
}`,
        },
        {
          language: "html",
          code: `<div class="photo-grid">
  <img class="featured" src="/images/hero.jpg" alt="Featured">
  <img src="/images/1.jpg" alt="Photo 1">
  <img src="/images/2.jpg" alt="Photo 2">
  <img src="/images/3.jpg" alt="Photo 3">
  <img src="/images/4.jpg" alt="Photo 4">
</div>`,
        },
      ],
      image: {
        src: "/images/days/grid-layout.svg",
        alt: "CSS Grid layout showing a 3-column grid with one item spanning two rows and two columns",
        caption: "CSS Grid lets items span multiple cells with a single declaration.",
        description:
          "A wireframe of a 3×3 grid where the top-left item spans 2 columns and 2 rows, demonstrating how grid-area placement works visually.",
      },
    },
    {
      id: "grid-properties-and-areas",
      heading: "Grid Properties and Areas",
      level: 2,
      paragraphs: [
        "Beyond rows and columns, Grid lets you name regions of your layout with grid-template-areas. This makes complex page templates read like a diagram — you can see at a glance where the header, sidebar, main, and footer live. Each named area can span multiple cells by repeating the name.",
        "The fr unit (fraction) divides remaining space proportionally. Use it with the minmax() function to create responsive grids that don't need media queries — for example, repeat(auto-fit, minmax(250px, 1fr)) creates as many columns as fit, each at least 250px wide.",
      ],
      code: [
        {
          language: "css",
          filename: "grid-areas.css",
          code: `.page {
  display: grid;
  min-height: 100vh;
  gap: 1rem;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsive auto-fit grid — no media queries needed */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}`,
        },
        {
          language: "html",
          code: `<div class="page">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main content</main>
  <footer class="footer">Footer</footer>
</div>`,
        },
      ],
      callout: {
        type: "success",
        title: "auto-fit Is Magic",
        content:
          "repeat(auto-fit, minmax(250px, 1fr)) creates a responsive card grid that reflows automatically. Add or remove items and the layout adjusts itself — no media queries required.",
      },
    },
    {
      id: "flex-vs-grid",
      heading: "Flex vs Grid: Choosing the Right Tool",
      level: 2,
      paragraphs: [
        "Flexbox and Grid are complementary, not competing. Use Flexbox when you're laying items out in a single direction — a nav bar, a row of buttons, a column of cards, or a form field with its label. Use Grid when you need to control rows AND columns together — full-page templates, image galleries, or any layout where precise two-dimensional placement matters.",
        "A practical rule of thumb: start with Flexbox because it's simpler, and reach for Grid when you find yourself needing to align items on the cross axis too, or when content needs to span multiple rows or columns. Many real layouts combine both — Grid for the page skeleton, Flexbox inside each region.",
      ],
      table: {
        headers: ["Use Case", "Recommended Tool", "Why"],
        rows: [
          ["Navigation bar", "Flexbox", "Single row, items aligned on one axis"],
          ["Vertical centering", "Flexbox", "Trivial with justify + align center"],
          ["Equal-height card row", "Flexbox", "Flex items stretch by default"],
          ["Page template (header/sidebar/main/footer)", "Grid", "Two-dimensional regions"],
          ["Photo gallery with spanning items", "Grid", "Items span multiple cells"],
          ["Form with label + input pairs", "Flexbox", "One-direction pairs"],
          ["Responsive card grid", "Grid", "auto-fit handles reflow cleanly"],
          ["Sticky footer", "Flexbox", "Column with main: flex 1"],
        ],
      },
      callout: {
        type: "note",
        content:
          "It's perfectly normal to combine both in one layout. A common pattern: use Grid for the overall page (header, sidebar, main, footer), then Flexbox inside each region for smaller arrangements.",
      },
    },
    {
      id: "practical-layout-patterns",
      heading: "Practical Layout Patterns",
      level: 2,
      paragraphs: [
        "Most real-world layouts are variations on a handful of patterns. Mastering these building blocks lets you assemble complex pages quickly. The most common are: horizontal centering, sticky footer, holy grail page template, responsive card grid, and the sidebar layout with a fluid main area.",
        "Below is a complete holy grail layout — header, footer, three columns (nav, main, aside) — implemented with CSS Grid and named template areas. On narrow screens, a single media query reflows everything into a single column.",
      ],
      code: [
        {
          language: "css",
          filename: "holy-grail.css",
          code: `.holy-grail {
  display: grid;
  min-height: 100vh;
  gap: 1rem;
  grid-template:
    "header header header" auto
    "nav    main   aside" 1fr
    "footer footer footer" auto
    / 200px 1fr 220px;
}

.holy-grail > header { grid-area: header; }
.holy-grail > nav    { grid-area: nav; }
.holy-grail > main   { grid-area: main; }
.holy-grail > aside  { grid-area: aside; }
.holy-grail > footer { grid-area: footer; }

/* Responsive: stack on small screens */
@media (max-width: 768px) {
  .holy-grail {
    grid-template:
      "header" auto
      "nav"    auto
      "main"   1fr
      "aside"  auto
      "footer" auto
      / 1fr;
  }
}

/* Classic flexbox centering helper */
.center-xy {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
        },
      ],
      callout: {
        type: "tip",
        title: "Name Your Areas",
        content:
          "grid-template-areas with named regions makes layouts self-documenting. Reading the CSS tells you exactly what the page looks like — far clearer than counting column tracks.",
      },
    },
  ],
  keyTakeaways: [
    "Flexbox is one-dimensional (row or column); CSS Grid is two-dimensional (rows and columns together)",
    "Use flex-direction, justify-content, align-items, flex-wrap, and gap to control flex layouts",
    "Grid template areas let you describe complex page layouts as readable ASCII diagrams",
    "repeat(auto-fit, minmax(250px, 1fr)) creates responsive card grids without media queries",
    "Combine Grid and Flexbox: Grid for the page skeleton, Flexbox for arranging items inside each region",
  ],
  exercises: [
    "Build a horizontal navigation bar with a logo on the left, links on the right, and equal spacing between them — using only Flexbox",
    "Create a photo gallery with CSS Grid where one image is featured and spans two rows and two columns",
    "Build the holy grail layout (header, footer, nav, main, aside) using named grid-template-areas, and stack it on mobile",
    "Design a responsive card grid using auto-fit and minmax that shows one card on mobile, two on tablet, and three on desktop — without media queries",
  ],
  resources: [
    { label: "MDN: Flexbox", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox" },
    { label: "MDN: CSS Grid", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids" },
    { label: "CSS Tricks: A Complete Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
  ],
};
