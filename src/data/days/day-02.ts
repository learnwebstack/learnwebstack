import type { DayContent } from "../types";

export const day02: DayContent = {
  day: 2,
  slug: "day-02",
  title: "HTML Advanced: Forms, Tables & Semantic HTML",
  subtitle: "Master forms, advanced tables, semantic elements, SEO meta tags, and HTML5 media",
  date: "Day 02",
  duration: "3 hours",
  category: "HTML Fundamentals",
  tags: ["HTML", "Forms", "Semantic HTML", "SEO", "Media"],
  description:
    "Take your HTML skills further by building accessible forms with validation, structuring complex data tables, using semantic HTML5 elements properly, optimizing pages with meta tags for SEO, and embedding media such as audio and video.",
  learningObjectives: [
    "Build accessible, validated HTML forms using the right input types and labels",
    "Structure complex tables with captions, headers, and cell spanning",
    "Use semantic HTML5 elements (article, section, nav, aside, figure) correctly",
    "Optimize web pages for search engines with proper meta tags",
    "Embed and control audio and video using native HTML5 media elements",
  ],
  prerequisites: [
    "Completion of Day 1 — HTML Basics, or equivalent knowledge",
    "Familiarity with HTML document structure and common elements",
    "A text editor and a modern web browser",
  ],
  topics: [
    "HTML Forms and Input Types",
    "Form Validation and Accessibility",
    "Advanced Data Tables",
    "Semantic HTML5 Elements",
    "Meta Tags for SEO",
    "HTML5 Audio and Video",
  ],
  sections: [
    {
      id: "html-forms",
      heading: "HTML Forms and Input Types",
      level: 2,
      paragraphs: [
        "Forms are the primary way users send data to a website — logins, registrations, search boxes, and checkouts all rely on them. The <form> element wraps one or more inputs and sends their data to a server using the action and method attributes. Each input should have an associated <label>, which improves both accessibility and usability, since clicking the label focuses the input.",
        "HTML5 introduced many specialized input types that provide built-in validation and tailored on-screen keyboards on mobile devices. Choosing the correct type — such as email, tel, date, or number — improves the user experience without any extra JavaScript.",
      ],
      code: [
        {
          language: "html",
          filename: "form.html",
          code: `<form action="/submit" method="POST">
  <div class="field">
    <label for="name">Full Name</label>
    <input type="text" id="name" name="name"
           placeholder="Jane Doe" required>
  </div>

  <div class="field">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email"
           placeholder="jane@example.com" required>
  </div>

  <div class="field">
    <label for="password">Password</label>
    <input type="password" id="password" name="password"
           minlength="8" required>
  </div>

  <div class="field">
    <label for="age">Age</label>
    <input type="number" id="age" name="age"
           min="13" max="120">
  </div>

  <div class="field">
    <label for="bio">Short Bio</label>
    <textarea id="bio" name="bio" rows="4"
              maxlength="200"></textarea>
  </div>

  <button type="submit">Create Account</button>
</form>`,
        },
      ],
      table: {
        headers: ["Input Type", "Purpose", "Common Attributes"],
        rows: [
          ["text", "Single-line text input", "placeholder, maxlength, pattern"],
          ["email", "Email with built-in validation", "multiple, required"],
          ["password", "Masked text input", "minlength, maxlength"],
          ["number", "Numeric input with stepper", "min, max, step"],
          ["date", "Date picker", "min, max"],
          ["tel", "Telephone number", "pattern"],
          ["checkbox", "Boolean or multi-select option", "checked, value"],
          ["radio", "Single choice from a group", "name, value, checked"],
        ],
      },
      callout: {
        type: "tip",
        title: "Always Use Labels",
        content:
          "Never rely on placeholder text alone — it disappears when the user starts typing and is poorly read by screen readers. Always pair a visible <label> with each input using the for and id attributes.",
      },
    },
    {
      id: "form-validation",
      heading: "Form Validation and Accessibility",
      level: 2,
      paragraphs: [
        "Browsers can validate form fields natively using attributes like required, pattern, min, max, and type. Native validation is fast, accessible, and requires no JavaScript. The pattern attribute accepts a regular expression that the input value must match before the form can be submitted.",
        "For more complex rules, you can combine native validation with the Constraint Validation API in JavaScript. The key is to validate on the client first for instant feedback, then always re-validate on the server — never trust data sent from the browser.",
      ],
      code: [
        {
          language: "html",
          code: `<form>
  <label for="username">Username (letters and numbers only)</label>
  <input type="text" id="username" name="username"
         pattern="[A-Za-z0-9_]{4,20}"
         title="4-20 characters: letters, numbers, underscores"
         required>

  <label for="website">Personal Website</label>
  <input type="url" id="website" name="website"
         placeholder="https://example.com">

  <label for="quantity">Quantity (1-99)</label>
  <input type="number" id="quantity" name="quantity"
         min="1" max="99" value="1">

  <fieldset>
    <legend>Select a plan</legend>
    <label><input type="radio" name="plan" value="free" checked> Free</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>
    <label><input type="radio" name="plan" value="team"> Team</label>
  </fieldset>

  <label>
    <input type="checkbox" name="terms" required>
    I agree to the Terms of Service
  </label>

  <button type="submit">Sign Up</button>
</form>`,
        },
      ],
      callout: {
        type: "warning",
        title: "Client-Side Validation Is Not Enough",
        content:
          "Malicious users can bypass HTML validation using browser devtools or by sending a custom HTTP request directly. Always validate and sanitize input on the server as well, even when client-side validation appears strict.",
      },
    },
    {
      id: "advanced-tables",
      heading: "Advanced Data Tables",
      level: 2,
      paragraphs: [
        "Tables shine when presenting tabular data — schedules, pricing comparisons, financial reports. Advanced tables use <caption> for a title, <thead>, <tbody>, and <tfoot> to group rows logically, and the colspan and rowspan attributes to merge cells across columns or rows.",
        "Use the scope attribute on <th> cells (scope=\"col\" or scope=\"row\") so screen readers can associate data cells with their headers. This is essential for accessibility on tables that have multiple header rows or columns.",
      ],
      code: [
        {
          language: "html",
          filename: "schedule.html",
          code: `<table>
  <caption>Weekly Class Schedule</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Monday</th>
      <th scope="col">Wednesday</th>
      <th scope="col">Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00</th>
      <td>HTML</td>
      <td rowspan="2">Workshop</td>
      <td>CSS</td>
    </tr>
    <tr>
      <th scope="row">11:00</th>
      <td>Forms</td>
      <td>Flexbox</td>
    </tr>
    <tr>
      <th scope="row">14:00</th>
      <td colspan="3">Project Lab — Open Session</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Total: 9 hours per week</td>
    </tr>
  </tfoot>
</table>`,
        },
      ],
      callout: {
        type: "note",
        content:
          "Tables are for data, not layout. If you find yourself using tables to position elements visually, switch to CSS Flexbox or Grid instead — those tools are more flexible and accessible.",
      },
    },
    {
      id: "semantic-html5",
      heading: "Semantic HTML5 Elements",
      level: 2,
      paragraphs: [
        "Semantic HTML5 introduced a set of elements that describe the meaning of content rather than just its appearance. Using <article>, <section>, <nav>, <aside>, <header>, <footer>, and <figure> instead of generic <div> tags gives your document structure that browsers, search engines, and assistive technologies can understand.",
        "Each semantic element has a specific role. An <article> is self-contained content that could be syndicated independently (a blog post, news story). A <section> groups thematically related content with a heading. <aside> holds tangentially related content like a sidebar or pull quote. <figure> and <figcaption> wrap images, diagrams, or code samples that are referenced from the main text.",
      ],
      code: [
        {
          language: "html",
          filename: "article.html",
          code: `<article>
  <header>
    <h1>Getting Started with Semantic HTML</h1>
    <p>Published on <time datetime="2024-11-15">Nov 15, 2024</time> by Ada</p>
  </header>

  <p>Semantic elements describe the <em>meaning</em> of content,
     not just how it looks.</p>

  <section>
    <h2>Why It Matters</h2>
    <p>Screen readers can navigate by landmarks, and search engines
       better understand your page structure.</p>
  </section>

  <figure>
    <img src="/images/semantic-layout.svg"
         alt="Diagram showing header, nav, main, aside, and footer regions">
    <figcaption>The typical landmarks of a semantic HTML5 layout.</figcaption>
  </figure>

  <aside>
    <h3>Related</h3>
    <p>Learn about ARIA roles for even finer accessibility control.</p>
  </aside>

  <footer>
    <p>&copy; 2024 Ada Lovelace. Tagged under
       <a href="/tags/html">HTML</a>.</p>
  </footer>
</article>`,
        },
      ],
      image: {
        src: "/images/days/semantic-layout.svg",
        alt: "Layout diagram showing semantic HTML5 regions: header, nav, main with article and aside, and footer",
        caption: "Semantic HTML5 provides clear landmarks for page structure.",
        description:
          "A wireframe showing how header, nav, main (containing article and aside), and footer map to visual regions of a typical web page layout.",
      },
    },
    {
      id: "meta-tags-seo",
      heading: "Meta Tags for SEO",
      level: 2,
      paragraphs: [
        "Meta tags live inside the <head> element and provide metadata about the document — its character encoding, viewport, description, author, and social-sharing previews. Search engines use the title and description to display your page in results, while Open Graph (og:) and Twitter Card tags control how links look when shared on social platforms.",
        "A well-crafted meta description (around 150–160 characters) can significantly improve click-through rates from search results. Always include a unique title and description for every page on your site.",
      ],
      code: [
        {
          language: "html",
          filename: "head.html",
          code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Full Stack Web Development Course | Learn HTML, CSS, JS</title>
  <meta name="description"
        content="A free, hands-on course covering HTML, CSS, JavaScript, and modern frameworks. Start building real websites today.">

  <meta name="author" content="Ada Lovelace">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com/course">

  <!-- Open Graph (Facebook, LinkedIn, etc.) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Full Stack Web Development Course">
  <meta property="og:description" content="Learn HTML, CSS, JS, and beyond.">
  <meta property="og:image" content="https://example.com/cover.png">
  <meta property="og:url" content="https://example.com/course">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Full Stack Web Development Course">
  <meta name="twitter:description" content="Learn HTML, CSS, JS, and beyond.">
  <meta name="twitter:image" content="https://example.com/cover.png">
</head>`,
        },
      ],
      callout: {
        type: "success",
        title: "SEO Best Practice",
        content:
          "Keep titles under 60 characters and descriptions under 160 characters so they don't get truncated in search results. Write for humans first — compelling, accurate copy outperforms keyword-stuffed text.",
      },
    },
    {
      id: "html5-media",
      heading: "HTML5 Audio and Video",
      level: 2,
      paragraphs: [
        "Before HTML5, embedding media required third-party plugins like Flash. Today, the native <audio> and <video> elements make media playback a first-class part of the web. Both elements accept the controls attribute to show a default play/pause bar, and you can provide multiple <source> children so the browser can pick a format it supports.",
        "Always include a fallback message inside the element for browsers that don't support the format, and add subtitles or captions with the <track> element to make media accessible to a wider audience.",
      ],
      code: [
        {
          language: "html",
          code: `<!-- Audio player -->
<audio controls>
  <source src="lecture.mp3" type="audio/mpeg">
  <source src="lecture.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>

<!-- Video player with captions -->
<video controls width="640" poster="cover.jpg" preload="metadata">
  <source src="intro.mp4" type="video/mp4">
  <source src="intro.webm" type="video/webm">
  <track kind="subtitles" src="intro-en.vtt"
         srclang="en" label="English" default>
  <track kind="subtitles" src="intro-es.vtt"
         srclang="es" label="Spanish">
  Your browser does not support the video element.
</video>

<!-- Autoplay muted (allowed by most browsers) -->
<video autoplay muted loop playsinline width="1280">
  <source src="background.mp4" type="video/mp4">
</video>`,
        },
      ],
      list: {
        items: [
          "controls — Show the browser's default playback controls",
          "autoplay — Start playing automatically (often blocked unless muted)",
          "muted — Start with audio muted",
          "loop — Restart playback when it ends",
          "poster — Image shown before the video plays",
          "preload — Hint for buffering: none, metadata, or auto",
          "<track> — Add subtitles, captions, or chapters via WebVTT files",
        ],
      },
      callout: {
        type: "warning",
        title: "Autoplay Can Hurt UX",
        content:
          "Most browsers block autoplay with sound because it's disruptive. If you must autoplay, set muted and playsinline so it works on iOS. Always let users opt in to sound when possible.",
      },
    },
  ],
  keyTakeaways: [
    "Forms collect user input — always pair inputs with <label> elements and choose the right input type",
    "Native HTML5 validation with required, pattern, min, and max gives free client-side checks, but always re-validate on the server",
    "Use semantic HTML5 elements (article, section, nav, aside, figure) to convey meaning, not just appearance",
    "Well-written meta tags — including Open Graph and Twitter Cards — improve SEO and social sharing",
    "HTML5 audio and video elements provide native media playback; add <track> subtitles for accessibility",
  ],
  exercises: [
    "Build a registration form with name, email, password, date of birth, country select, and a terms checkbox — all with proper labels and native validation",
    "Create a pricing comparison table with a caption, merged header cells using colspan, and a footer row showing the total cost",
    "Rewrite a div-only blog template using semantic elements: header, nav, main, article, section, aside, figure, and footer",
    "Add a complete <head> section to a page with title, description, Open Graph, and Twitter Card tags, then test it with the Meta Tags preview tool",
  ],
  resources: [
    { label: "MDN: HTML Forms Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms" },
    { label: "MDN: Semantic HTML", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics" },
    { label: "web.dev: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  ],
};
