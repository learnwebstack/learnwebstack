import type { DayContent } from "../types";

export const day13: DayContent = {
  day: 13,
  slug: "day-13",
  title: "Introduction to React & Components",
  subtitle: "Building modern user interfaces with components, JSX, and the virtual DOM",
  date: "Day 13",
  duration: "3.5 hours",
  category: "React Fundamentals",
  tags: ["React", "JSX", "Components", "Vite", "Frontend"],
  description:
    "Step into the world of React, the most popular JavaScript library for building user interfaces. Learn how the virtual DOM makes updates fast, write your first JSX, break UIs into reusable components, and scaffold a new project with Vite.",
  learningObjectives: [
    "Explain what React is and how the virtual DOM improves rendering performance",
    "Write valid JSX and understand how it compiles to JavaScript",
    "Create functional components and pass data with props",
    "Compose small components into larger UIs",
    "Scaffold a new React project with Vite and navigate its file structure",
  ],
  prerequisites: [
    "Solid understanding of HTML, CSS, and modern JavaScript (ES6+)",
    "Familiarity with the DOM and browser dev tools",
    "Node.js 18+ installed with npm or pnpm",
  ],
  topics: [
    "What is React",
    "The Virtual DOM",
    "JSX Syntax",
    "Functional Components",
    "Props",
    "Component Composition",
    "Project Setup with Vite",
    "Project Structure & Rendering Elements",
  ],
  sections: [
    {
      id: "what-is-react",
      heading: "What is React?",
      level: 2,
      paragraphs: [
        "React is an open-source JavaScript library created by Facebook (now Meta) in 2013 for building user interfaces — particularly single-page applications where the UI needs to stay fast and responsive as data changes. Unlike full frameworks such as Angular, React focuses on just the view layer, leaving routing, state management, and data fetching to complementary libraries you can pick based on your needs.",
        "React's core philosophy is declarative and component-based: you describe what the UI should look like for any given state, and React figures out how to update the DOM efficiently. This is a shift from the imperative approach of vanilla JavaScript, where you manually query and modify DOM elements. The result is code that is easier to reason about, test, and scale as your application grows.",
      ],
      callout: {
        type: "info",
        title: "React vs. React Native",
        content:
          "React builds web UIs that run in the browser. React Native uses the same component model and hooks to build native mobile apps for iOS and Android. Once you know React, picking up React Native is mostly about learning platform-specific components.",
      },
      list: {
        items: [
          "Declarative — You describe the UI for each state; React handles the DOM",
          "Component-based — UIs are built from small, reusable, isolated pieces",
          "Learn once, write anywhere — Web, mobile, desktop (Electron), and even VR",
          "Unopinionated — Choose your own router, state library, and styling solution",
        ],
      },
    },
    {
      id: "virtual-dom",
      heading: "The Virtual DOM",
      level: 2,
      paragraphs: [
        "Direct DOM manipulation is slow because every change triggers reflows and repaints. React solves this with the virtual DOM — a lightweight, in-memory JavaScript representation of the actual DOM. When your component's state changes, React builds a new virtual DOM tree and compares it to the previous one using a process called reconciliation.",
        "React then computes the minimal set of changes (a 'diff') and applies only those to the real DOM in a single batched update. This is far cheaper than re-rendering entire sections of the page. The algorithm uses heuristics — such as assuming list items are identified by keys — to keep diffing O(n) in most cases.",
      ],
      image: {
        src: "/images/days/react-component-tree.svg",
        alt: "Diagram showing the virtual DOM reconciliation process",
        caption: "React diffs the new virtual DOM against the previous one and patches only what changed.",
        description:
          "A component tree on the left, a 'previous' virtual DOM and a 'next' virtual DOM in the middle, and an arrow showing the diff being applied to the real DOM on the right.",
      },
      callout: {
        type: "note",
        title: "Reconciliation in short",
        content:
          "Reconciliation is the algorithm React uses to diff one tree against another. Keys on list items give React stable identities so it can match elements across renders and avoid unnecessary DOM operations.",
      },
    },
    {
      id: "jsx-syntax",
      heading: "JSX Syntax",
      level: 2,
      paragraphs: [
        "JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript. Under the hood, a tool such as Babel or the SWC compiler (used by Vite) transforms every JSX element into a React.createElement() call. The compiled output is plain JavaScript that returns an object describing what should appear on screen.",
        "JSX is not required to use React, but almost every team adopts it because it makes component code more readable. You can embed any JavaScript expression inside JSX by wrapping it in curly braces, and JSX itself can be assigned to variables, passed as arguments, or returned from functions.",
      ],
      code: [
        {
          language: "jsx",
          filename: "Greeting.jsx",
          code: `// JSX looks like HTML but is JavaScript.
function Greeting({ name }) {
  const hour = new Date().getHours();
  const isMorning = hour < 12;

  return (
    <section className="greeting">
      <h1>{isMorning ? "Good morning" : "Good evening"}, {name}!</h1>
      <p>Today is {new Date().toLocaleDateString()}</p>
    </section>
  );
}

// The code above compiles to:
// React.createElement('section', { className: 'greeting' },
//   React.createElement('h1', null, isMorning ? 'Good morning' : 'Good evening', ', ', name, '!'),
//   React.createElement('p', null, 'Today is ', new Date().toLocaleDateString()));`,
        },
      ],
      callout: {
        type: "warning",
        title: "JSX gotchas",
        content:
          "Use className instead of class, htmlFor instead of for, and style={{ color: 'red' }} (an object) instead of a CSS string. Self-closing tags must have a slash: <img src=\"logo.svg\" />.",
      },
    },
    {
      id: "functional-components-props",
      heading: "Functional Components & Props",
      level: 2,
      paragraphs: [
        "A functional component is a plain JavaScript function that accepts a single 'props' object and returns JSX. Since React 16.8 introduced hooks, function components can hold state and side effects, making class components largely unnecessary for new code. Components should be pure: given the same props, they should return the same JSX without modifying anything outside their scope.",
        "Props are the primary way data flows down the component tree. They are read-only — a component must never modify its own props. To make props self-documenting and catch bugs early, you can type them with TypeScript or validate them at runtime with PropTypes.",
      ],
      code: [
        {
          language: "tsx",
          filename: "UserCard.tsx",
          code: `type UserCardProps = {
  name: string;
  role: string;
  avatarUrl: string;
  isOnline?: boolean; // optional prop
};

export default function UserCard({
  name,
  role,
  avatarUrl,
  isOnline = false,
}: UserCardProps) {
  return (
    <article className="user-card">
      <img src={avatarUrl} alt={\`\${name}'s avatar\`} width={64} height={64} />
      <div>
        <h2>{name}</h2>
        <p>{role}</p>
        <span className={isOnline ? "online" : "offline"}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </article>
  );
}`,
        },
      ],
      callout: {
        type: "tip",
        title: "One component per file",
        content:
          "Keep one component per file, name the file the same as the component (PascalCase), and export it as default. This makes components easy to find and lets IDEs auto-import them.",
      },
    },
    {
      id: "component-composition",
      heading: "Component Composition",
      level: 2,
      paragraphs: [
        "Composition is the act of combining small, focused components into larger UIs. Instead of building one giant component with hundreds of lines, you break the interface into pieces — a Button, a Card, a Header — and assemble them. This keeps each piece simple, testable, and reusable across the app.",
        "React supports composition through the special children prop, which lets a parent component render the JSX placed between its opening and closing tags. You can also pass JSX through named props to slot content into specific positions, much like template inheritance in other frameworks.",
      ],
      code: [
        {
          language: "jsx",
          filename: "Card.jsx",
          code: `function Card({ title, children, footer }) {
  return (
    <section className="card">
      <header className="card__header">
        <h2>{title}</h2>
      </header>
      <div className="card__body">{children}</div>
      {footer && <footer className="card__footer">{footer}</footer>}
    </section>
  );
}

// Usage — children fills the body, footer is a named slot
function App() {
  return (
    <Card
      title="Welcome back"
      footer={<button>Continue</button>}
    >
      <p>Pick up where you left off.</p>
      <ul>
        <li>3 unfinished lessons</li>
        <li>1 new message</li>
      </ul>
    </Card>
  );
}`,
        },
      ],
    },
    {
      id: "vite-setup-project-structure",
      heading: "Project Setup with Vite & Project Structure",
      level: 2,
      paragraphs: [
        "Vite (French for 'fast') is the modern build tool of choice for new React apps. It uses esbuild and native ES modules during development for instant server startup and hot module replacement (HMR), then rolls up a production build with Rollup. The older Create React App is now deprecated, so Vite is recommended for all new projects.",
        "After scaffolding, a typical Vite + React project contains an index.html entry point, a src/ folder for your code, and a public/ folder for static assets. The src/main.tsx file mounts the root component into the DOM, and src/App.tsx is the top-level component you start building from.",
      ],
      code: [
        {
          language: "bash",
          filename: "Terminal",
          code: `# Scaffold a new React + TypeScript project
npm create vite@latest my-app -- --template react-ts

cd my-app
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # create production build in /dist
npm run preview  # serve the production build locally`,
        },
        {
          language: "text",
          filename: "Project structure",
          code: `my-app/
├── index.html          # HTML entry point
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── logo.svg        # served as-is at /logo.svg
└── src/
    ├── main.tsx        # mounts <App /> into #root
    ├── App.tsx         # root component
    ├── App.css
    ├── index.css       # global styles
    ├── components/     # reusable UI components
    │   ├── Button.tsx
    │   └── Card.tsx
    ├── features/       # feature-based folders
    │   └── auth/
    │       ├── LoginForm.tsx
    │       └── useAuth.ts
    ├── hooks/          # custom hooks
    ├── lib/            # third-party wrappers
    └── types/          # shared TypeScript types`,
        },
      ],
      callout: {
        type: "success",
        title: "Rendering the root element",
        content:
          "main.tsx calls ReactDOM.createRoot(document.getElementById('root')!).render(<App />). Everything else is composed from the App component downward — there is exactly one root render call per app.",
      },
    },
  ],
  keyTakeaways: [
    "React is a declarative, component-based library for building user interfaces",
    "The virtual DOM lets React diff trees and apply only the minimal set of DOM updates",
    "JSX is syntactic sugar over React.createElement and is compiled to plain JavaScript",
    "Functional components take a props object and return JSX; props are read-only",
    "Vite is the recommended build tool for new React apps — fast dev server and optimized production builds",
  ],
  exercises: [
    "Scaffold a new React + TypeScript app with Vite and render a custom <Hero /> component on the home page",
    "Build a reusable <Button> component that accepts variant, size, and children props, and render three buttons with different variants",
    "Create a <ProfileCard> component that composes an <Avatar>, <UserName>, and <Bio> sub-component, all in separate files",
    "Convert a small HTML page you built earlier into a React component tree with at least three components",
  ],
  resources: [
    { label: "React Official Docs", url: "https://react.dev/learn" },
    { label: "Vite Getting Started", url: "https://vitejs.dev/guide/" },
    { label: "JSX in Depth — React", url: "https://react.dev/learn/writing-markup-with-jsx" },
  ],
};
