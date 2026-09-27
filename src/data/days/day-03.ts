import type { DayContent } from "../types";

export const day03: DayContent = {
  day: 3,
  slug: "day-03",
  title: "CSS Fundamentals: Selectors, Box Model & Colors",
  subtitle: "Style web pages with selectors, master the box model, and wield color systems",
  date: "Day 03",
  duration: "3 hours",
  category: "CSS Fundamentals",
  tags: ["CSS", "Selectors", "Box Model", "Colors", "Specificity"],
  description:
    "Learn how CSS works from the ground up: how to add styles to a page, every major selector type, the box model that governs element sizing, the color systems available in CSS, text styling techniques, and how specificity decides which rules win.",
  learningObjectives: [
    "Apply CSS to HTML using inline, internal, and external stylesheets",
    "Target elements with element, class, ID, attribute, and pseudo-class selectors",
    "Understand and control the CSS box model: content, padding, border, and margin",
    "Use hex, rgb, and hsl color systems and choose the right one for the job",
    "Calculate CSS specificity and predict which conflicting rules apply",
  ],
  prerequisites: [
    "Completion of Days 1–2 — HTML Basics and HTML Advanced",
    "A basic HTML page to experiment with",
    "A modern browser with devtools (Chrome or Firefox recommended)",
  ],
  topics: [
    "Adding CSS to HTML",
    "CSS Selectors",
    "The Box Model",
    "Colors in CSS",
    "Text Styling",
    "CSS Specificity and the Cascade",
  ],
  sections: [
    {
      id: "adding-css",
      heading: "Adding CSS to HTML",
      level: 2,
      paragraphs: [
        "There are three ways to apply CSS to an HTML document. Inline styles use the style attribute on a single element. Internal styles live inside a <style> tag in the document <head>. External stylesheets are separate .css files linked from the HTML using the <link> element.",
        "External stylesheets are almost always the best choice. They keep presentation separate from structure, are cached by the browser for faster repeat visits, and let you share styles across many pages. The other two approaches are useful for quick experiments or one-off overrides but should not be used for real projects.",
      ],
      code: [
        {
          language: "html",
          filename: "index.html",
          code: `<!-- External stylesheet (preferred) -->
<link rel="stylesheet" href="styles.css">

<!-- Internal stylesheet -->
<style>
  body {
    background-color: #f8f9fa;
    font-family: system-ui, sans-serif;
  }
</style>

<!-- Inline style (avoid in real projects) -->
<p style="color: red; font-weight: bold;">Hello, CSS!</p>`,
        },
      ],
      callout: {
        type: "info",
        title: "Three Ways, One Winner",
        content:
          "External stylesheets win for real projects because they separate concerns, allow browser caching, and keep your HTML clean. Inline styles are fine for quick tests but quickly become unmaintainable.",
      },
    },
    {
      id: "css-selectors",
      heading: "CSS Selectors",
      level: 2,
      paragraphs: [
        "Selectors are patterns that tell CSS which elements to style. The basic types are element selectors (e.g. p), class selectors (e.g. .button), ID selectors (e.g. #header), attribute selectors (e.g. [type=\"email\"]), and pseudo-class selectors (e.g. a:hover). You can combine them to target elements with precision.",
        "Pseudo-classes like :hover, :focus, and :nth-child() let you style elements based on their state or position. Pseudo-elements like ::before and ::after let you insert generated content, which is handy for icons, badges, or decorative effects.",
      ],
      code: [
        {
          language: "css",
          filename: "styles.css",
          code: `/* Element selector */
p {
  line-height: 1.6;
}

/* Class selector */
.card {
  padding: 1rem;
  border-radius: 8px;
}

/* ID selector (use sparingly) */
#main-header {
  background-color: #1a1a2e;
}

/* Attribute selector */
input[type="email"] {
  border: 2px solid #4a90e2;
}

/* Descendant selector */
.card p {
  color: #333;
}

/* Pseudo-classes */
a:hover {
  text-decoration: underline;
}

input:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}

li:nth-child(odd) {
  background-color: #f0f4f8;
}

/* Pseudo-element */
.quote::before {
  content: "\\201C"; /* left double quotation mark */
  font-size: 2rem;
  color: #888;
}

/* Grouping selectors */
h1, h2, h3 {
  font-family: Georgia, serif;
}`,
        },
      ],
      table: {
        headers: ["Selector", "Example", "Matches"],
        rows: [
          ["Element", "p", "All <p> elements"],
          ["Class", ".button", "Elements with class=\"button\""],
          ["ID", "#header", "The element with id=\"header\""],
          ["Attribute", "[type=\"email\"]", "Inputs with that attribute value"],
          ["Descendant", ".card p", "<p> anywhere inside .card"],
          ["Child", "ul > li", "<li> that are direct children of <ul>"],
          ["Pseudo-class", "a:hover", "<a> when the cursor is over it"],
          ["Pseudo-element", "p::first-line", "The first line of every <p>"],
        ],
      },
    },
    {
      id: "box-model",
      heading: "The Box Model",
      level: 2,
      paragraphs: [
        "Every HTML element is drawn as a rectangular box. The CSS box model describes the four layers of that box, from inside out: the content area, padding (space inside the border), border, and margin (space outside the border). Understanding this model is essential because it determines the actual size of every element on the page.",
        "By default, the width and height you set apply only to the content area. That means padding and border add to the rendered size, often surprising beginners. Setting box-sizing: border-box changes this so the width and height you specify include padding and border — almost always the behavior you want.",
      ],
      code: [
        {
          language: "css",
          filename: "box-model.css",
          code: `/* Apply border-box to every element (recommended baseline) */
*,
*::before,
*::after {
  box-sizing: border-box;
}

.box {
  width: 300px;
  padding: 20px;
  border: 5px solid #333;
  margin: 16px;

  /* With border-box, the total width stays 300px.
     Without it, total width would be 300 + 40 + 10 = 350px. */
  background-color: #eef;
}`,
        },
      ],
      image: {
        src: "/images/days/box-model.svg",
        alt: "Diagram of the CSS box model showing content, padding, border, and margin layers",
        caption: "The CSS box model: every element is a series of nested rectangles.",
        description:
          "From the inside out: content (text/images), padding (transparent space inside the border), border (a visible line), and margin (transparent space pushing other elements away).",
      },
      callout: {
        type: "tip",
        title: "Reset to border-box",
        content:
          "Add `*, *::before, *::after { box-sizing: border-box; }` to the top of every CSS file. It makes width calculations predictable and matches how most designers think about element sizing.",
      },
    },
    {
      id: "colors-in-css",
      heading: "Colors in CSS",
      level: 2,
      paragraphs: [
        "CSS offers several ways to describe colors. Hex codes like #1a73e8 are compact and widely used. The rgb() and rgba() functions take red, green, and blue values from 0–255, with an optional alpha for transparency. The hsl() model — hue, saturation, lightness — is often more intuitive because you can darken or lighten a color by changing one number.",
        "Modern CSS also supports the newer space-separated rgb() and hsl() syntax, plus the lab(), lch(), and color() functions for wider-gamut color spaces. For most projects, hex for solid colors and hsl() for themed palettes is a sensible combination.",
      ],
      code: [
        {
          language: "css",
          code: `/* Hex */
.primary { color: #1a73e8; }
.shadow  { color: #1a73e888; } /* 8-digit hex includes alpha */

/* rgb / rgba */
.button { background-color: rgba(26, 115, 232, 0.85); }

/* hsl — easy to make tints and shades */
:root {
  --brand-hue: 217;
  --brand: hsl(var(--brand-hue), 80%, 52%);
  --brand-dark: hsl(var(--brand-hue), 80%, 38%);
  --brand-light: hsl(var(--brand-hue), 80%, 72%);
}

/* Modern space-separated syntax (no comma) */
.box {
  background-color: hsl(217 80% 52% / 0.5);
}

/* Named colors and special keywords */
.text-muted { color: gray; }
.transparent-bg { background-color: transparent; }
.inherit-color { color: inherit; }`,
        },
      ],
      table: {
        headers: ["Format", "Example", "Best For"],
        rows: [
          ["Hex (#rrggbb)", "#1a73e8", "Solid colors in design handoffs"],
          ["Hex with alpha", "#1a73e8aa", "Translucent solid colors"],
          ["rgb()/rgba()", "rgba(26,115,232,0.5)", "Older browsers, simple alpha"],
          ["hsl()", "hsl(217, 80%, 52%)", "Themeable palettes and tints"],
          ["modern rgb/hsl", "rgb(26 115 232 / 50%)", "Newer codebases"],
          ["lch()/lab()", "lch(60% 70 250)", "Wide-gamut, perceptually uniform"],
        ],
      },
    },
    {
      id: "text-styling",
      heading: "Text Styling",
      level: 2,
      paragraphs: [
        "Good typography is the foundation of a readable web page. CSS gives you control over font family, size, weight, line height, letter spacing, text alignment, and decoration. Always provide a font stack with fallbacks so the page still looks good if the user's system lacks your preferred font.",
        "Use relative units like rem for font sizes so text scales with the user's browser settings. Line height (line-height) around 1.5–1.7 makes body text comfortable to read, especially on mobile.",
      ],
      code: [
        {
          language: "css",
          filename: "typography.css",
          code: `body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI",
               Roboto, sans-serif;
  font-size: 1rem;       /* 16px at default root size */
  line-height: 1.6;
  color: #222;
}

h1, h2, h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }

.lead {
  font-size: 1.25rem;
  font-weight: 300;
  color: #555;
}

.muted { color: #6c757d; }

.text-center { text-align: center; }

.link {
  color: #1a73e8;
  text-decoration: none;
  transition: color 0.2s;
}

.link:hover { text-decoration: underline; }

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
        },
      ],
      callout: {
        type: "note",
        content:
          "Avoid setting fixed pixel font sizes on body text. Use rem instead — it scales with the user's root font size, respecting their accessibility preferences.",
      },
    },
    {
      id: "css-specificity",
      heading: "CSS Specificity and the Cascade",
      level: 2,
      paragraphs: [
        "When multiple rules target the same element, CSS needs a way to decide which one wins. That system is called specificity. Each selector earns a score: inline styles are worth 1000 points, IDs are worth 100, classes/attributes/pseudo-classes are worth 10, and elements/pseudo-elements are worth 1. The rule with the highest score applies; ties are broken by source order — the later rule wins.",
        "The !important flag overrides normal specificity, but it creates maintenance headaches and should be a last resort. A cleaner approach is to write selectors that are specific enough to win without resorting to !important, and to keep your selector depth shallow.",
      ],
      table: {
        headers: ["Selector", "Inline", "IDs", "Classes", "Elements", "Score"],
        rows: [
          ["#nav .item", "0", "1", "1", "0", "110"],
          [".button.warning", "0", "0", "2", "0", "20"],
          ["ul li a", "0", "0", "0", "3", "3"],
          ["#header", "0", "1", "0", "0", "100"],
          ["style=\"...\"", "1", "0", "0", "0", "1000"],
          ["p::first-line", "0", "0", "0", "2", "2"],
        ],
      },
      code: [
        {
          language: "css",
          code: `/* Score: 100 + 10 + 1 = 111 — wins over .nav a (011) */
#header .nav a {
  color: white;
}

/* Score: 010 + 001 = 011 */
.nav a {
  color: blue;
}

/* !important overrides everything (avoid if possible) */
.broken-link {
  color: red !important;
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Avoid !important",
        content:
          "!important breaks the cascade and makes future changes painful. If you reach for it, treat that as a signal that your selectors are too weak or your stylesheet organization needs improvement.",
      },
    },
  ],
  keyTakeaways: [
    "Use external stylesheets for real projects — they separate concerns and enable caching",
    "Selectors let you target elements by type, class, ID, attribute, state (pseudo-class), or position (pseudo-element)",
    "Every element is a box made of content, padding, border, and margin — set box-sizing: border-box to make sizing predictable",
    "Choose the color format that fits the task: hex for solid colors, hsl() for themeable palettes with tints and shades",
    "Specificity decides which conflicting rule wins; keep selectors shallow and avoid !important",
  ],
  exercises: [
    "Create an external stylesheet and use it to style a personal profile page from Day 1 — change fonts, colors, and spacing",
    "Build a card component with padding, border, and margin visible, and experiment with both content-box and border-box sizing",
    "Create a color palette for a fictional brand using hsl(), with at least five shades derived from one hue",
    "Write four CSS rules that all target the same element but have different specificity scores, then predict which one wins before checking in the browser",
  ],
  resources: [
    { label: "MDN: CSS Selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors" },
    { label: "MDN: The Box Model", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" },
    { label: "CSS Specificity Calculator", url: "https://specificity.keegan.st/" },
  ],
};
