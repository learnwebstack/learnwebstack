import type { DayContent } from "../types";

export const day01: DayContent = {
  day: 1,
  slug: "day-01",
  title: "Introduction to Web Development & HTML Basics",
  subtitle: "Understanding how the web works and building your first web page",
  date: "Day 01",
  duration: "3 hours",
  category: "HTML Fundamentals",
  tags: ["HTML", "Web Basics", "Browser", "HTTP"],
  description:
    "Start your web development journey by understanding how the web works, the role of browsers and servers, and writing your first HTML page with proper structure and semantic elements.",
  learningObjectives: [
    "Understand the client-server model and how websites are delivered",
    "Set up a development environment with a code editor and browser",
    "Write well-structured HTML5 documents",
    "Use headings, paragraphs, links, images, and lists correctly",
    "Validate HTML and understand the Document Object Model basics",
  ],
  prerequisites: [
    "Basic computer literacy",
    "A text editor (VS Code recommended)",
    "A modern web browser (Chrome or Firefox)",
  ],
  topics: [
    "How the Web Works",
    "Client-Server Architecture",
    "HTTP Request/Response Cycle",
    "HTML Document Structure",
    "Text Content Elements",
    "Links and Images",
    "Lists and Tables",
  ],
  sections: [
    {
      id: "how-web-works",
      heading: "How the Web Works",
      level: 2,
      paragraphs: [
        "The World Wide Web operates on a client-server model. When you type a URL into your browser (the client), it sends an HTTP request to a remote server. The server processes the request and sends back an HTTP response containing HTML, CSS, JavaScript, images, and other resources that the browser then renders into the visual page you see.",
        "Every website is ultimately just files stored on a server — a computer always connected to the internet. The browser's job is to fetch those files and interpret them. Understanding this flow is essential because everything you build — from a simple landing page to a complex web application — follows this same request-response pattern.",
      ],
      image: {
        src: "/images/days/client-server.svg",
        alt: "Diagram showing client-server architecture with HTTP request and response",
        caption: "The client-server model: browsers request resources, servers respond with them.",
        description:
          "When a user enters a URL, the browser resolves the domain via DNS, opens a TCP connection, sends an HTTP request, and the server responds with the requested resource along with a status code.",
      },
      callout: {
        type: "info",
        title: "Key Concept",
        content:
          "A URL (Uniform Resource Locator) is the address of a resource on the web. It consists of a protocol (https://), domain (example.com), and path (/page).",
      },
    },
    {
      id: "html-structure",
      heading: "HTML Document Structure",
      level: 2,
      paragraphs: [
        "HTML (HyperText Markup Language) is the skeleton of every web page. It uses tags enclosed in angle brackets to define the structure and meaning of content. Every HTML5 document follows a standard boilerplate that tells the browser how to interpret the page.",
      ],
      code: [
        {
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
  <meta name="description" content="A beginner-friendly HTML page">
</head>
<body>
  <header>
    <h1>Welcome to Web Development</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About This Page</h2>
      <p>This is my very first web page built with HTML5.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>
</html>`,
        },
      ],
      callout: {
        type: "tip",
        title: "Pro Tip",
        content:
          "Always include the viewport meta tag. Without it, mobile browsers render the page at desktop width and zoom out, making text tiny and unreadable on phones.",
      },
    },
    {
      id: "text-elements",
      heading: "Text Content Elements",
      level: 2,
      paragraphs: [
        "HTML provides a rich set of elements for structuring text. Headings (h1–h6) create a document outline, paragraphs hold blocks of text, and semantic elements like <strong>, <em>, and <mark> add meaning beyond visual styling.",
      ],
      list: {
        items: [
          "<h1> to <h6> — Headings, h1 being the most important (use only one per page)",
          "<p> — Paragraphs of text",
          "<strong> — Important text (rendered bold)",
          "<em> — Emphasized text (rendered italic)",
          "<br> — Line break (use sparingly)",
          "<hr> — Thematic break / horizontal rule",
          "<blockquote> — Quoted content from another source",
          "<code> — Inline code snippets",
        ],
      },
      code: [
        {
          language: "html",
          code: `<article>
  <h2>Understanding Semantic HTML</h2>
  <p>Semantic HTML means using the <strong>correct tag</strong>
     for the <em>right purpose</em>.</p>
  <blockquote>
    "Good semantics improve accessibility and SEO."
  </blockquote>
  <p>Use the <code>&lt;article&gt;</code> tag for self-contained content.</p>
</article>`,
        },
      ],
    },
    {
      id: "links-images",
      heading: "Links and Images",
      level: 2,
      paragraphs: [
        "Hyperlinks are what make the web a web — they connect pages together. The anchor tag <a> uses the href attribute to specify the destination. Images use the <img> tag with src and alt attributes; the alt text is critical for accessibility and SEO.",
      ],
      code: [
        {
          language: "html",
          code: `<!-- External link -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener">
  MDN Web Docs
</a>

<!-- Internal link (same page) -->
<a href="#section-2">Jump to Section 2</a>

<!-- Image with accessibility text -->
<img src="logo.png"
     alt="Company logo showing a blue mountain"
     width="200" height="60">

<!-- Image as a link -->
<a href="/about">
  <img src="about-icon.png" alt="About us">
</a>`,
        },
      ],
      callout: {
        type: "warning",
        title: "Accessibility Warning",
        content:
          "Never leave the alt attribute empty for informative images. Screen readers rely on alt text to describe images to visually impaired users. Use alt=\"\" only for purely decorative images.",
      },
    },
    {
      id: "lists-tables",
      heading: "Lists and Tables",
      level: 2,
      paragraphs: [
        "Lists organize related items. Unordered lists (<ul>) use bullet points, ordered lists (<ol>) use numbers, and definition lists (<dl>) pair terms with descriptions. Tables display tabular data using rows and columns.",
      ],
      code: [
        {
          language: "html",
          code: `<!-- Unordered list -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>Learn HTML</li>
  <li>Learn CSS</li>
  <li>Learn JavaScript</li>
</ol>

<!-- Data table -->
<table>
  <thead>
    <tr>
      <th>Technology</th>
      <th>Purpose</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Structure</td>
      <td>1993</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>Styling</td>
      <td>1996</td>
    </tr>
  </tbody>
</table>`,
        },
      ],
      callout: {
        type: "note",
        content:
          "Tables should only be used for tabular data, not for page layout. Use CSS Flexbox or Grid (covered in Day 4) for layout instead.",
      },
    },
  ],
  keyTakeaways: [
    "The web uses a client-server model where browsers request and servers respond",
    "HTML provides the structure and meaning (semantics) of web content",
    "Every HTML document needs a DOCTYPE, html, head, and body",
    "Semantic elements improve accessibility, SEO, and code maintainability",
    "The alt attribute on images is mandatory for accessibility",
  ],
  exercises: [
    "Create a personal profile page with a heading, photo, bio paragraph, and a list of skills",
    "Build a simple blog post layout with a header, article, and footer",
    "Create a table comparing three programming languages with columns for name, paradigm, and year",
    "Add internal navigation links that jump to different sections of your page",
  ],
  resources: [
    { label: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { label: "W3C Validator", url: "https://validator.w3.org/" },
    { label: "HTML Living Standard", url: "https://html.spec.whatwg.org/" },
  ],
};
