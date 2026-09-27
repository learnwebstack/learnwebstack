import type { DayContent } from "../types";

export const day16: DayContent = {
  day: 16,
  slug: "day-16",
  title: "React Routing & API Integration",
  subtitle: "Multi-page navigation with React Router and reliable data fetching patterns",
  date: "Day 16",
  duration: "3.5 hours",
  category: "React Intermediate",
  tags: ["React Router", "API", "Axios", "Data Fetching", "Error Boundaries"],
  description:
    "Turn your single-page React app into a multi-page experience with React Router, then connect it to a backend. Learn nested routing, URL parameters, data fetching with both fetch and Axios, loading and error states, and how to guard your UI with error boundaries.",
  learningObjectives: [
    "Configure React Router with Routes, Route, and Link for client-side navigation",
    "Use useParams and useNavigate for dynamic routes and programmatic redirects",
    "Nest routes for shared layouts and child pages",
    "Fetch data with both the fetch API and Axios, including loading and error states",
    "Wrap components in error boundaries to gracefully handle render-time failures",
  ],
  prerequisites: [
    "Completed Days 13–15 — solid with hooks, state, and the Context API",
    "Familiarity with Promises, async/await, and the fetch API",
    "Understanding of REST API basics (HTTP verbs, status codes, JSON)",
  ],
  topics: [
    "React Router Basics",
    "Routes, Route, Link",
    "useParams & useNavigate",
    "Nested Routing",
    "Data Fetching Patterns",
    "Loading & Error States",
    "Axios vs. fetch",
    "useEffect for Data Fetching",
    "Error Boundaries",
  ],
  sections: [
    {
      id: "react-router-basics",
      heading: "React Router Basics",
      level: 2,
      paragraphs: [
        "React Router is the de-facto routing library for React. It synchronises your UI with the browser URL so that users can bookmark, share, and use the back button naturally. The current version (v6.4+) exposes both a component-based API (Routes/Route) and a data API built around loaders and actions; we'll focus on the component-based approach which works everywhere.",
        "Routing starts at the top of the app. You wrap the application in <BrowserRouter>, then declare a tree of <Routes> containing <Route> elements. Each route maps a URL path to a component. The <Link> component renders an <a> tag that updates the URL without a full page reload, giving users the speed of a SPA with the familiarity of normal links.",
      ],
      code: [
        {
          language: "tsx",
          filename: "main.tsx",
          code: `import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        {/* Fallback for unknown URLs */}
        <Route path="*" element={<h1>404 — Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}`,
        },
      ],
      callout: {
        type: "info",
        title: "BrowserRouter vs. HashRouter",
        content:
          "BrowserRouter uses the HTML5 history API and clean URLs (example.com/about) but requires server-side configuration so every route serves index.html. HashRouter uses #/about and works without server config, at the cost of uglier URLs.",
      },
    },
    {
      id: "useparams-usenavigate",
      heading: "Dynamic Routes with useParams & useNavigate",
      level: 2,
      paragraphs: [
        "Many pages need to display data for a specific resource — a user profile, a blog post, a product. React Router supports this with dynamic segments in the path, written with a colon: path=\"/users/:id\". The matched value is read inside the component with the useParams hook.",
        "Sometimes you need to navigate in code rather than via a <Link> — for example, after submitting a form or after an API call succeeds. The useNavigate hook returns a function you can call with a path string or a numeric delta (like navigate(-1) to go back).",
      ],
      code: [
        {
          language: "tsx",
          filename: "UserDetail.tsx",
          code: `import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

type User = { id: number; name: string; email: string };

export default function UserDetail() {
  const { id } = useParams();              // reads the :id segment
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${id}\`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link to="/users">Back to list</Link>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(\`/users/\${user.id}/edit\`)}>
        Edit
      </button>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: "nested-routing",
      heading: "Nested Routing & Shared Layouts",
      level: 2,
      paragraphs: [
        "Real apps have layouts — a sidebar that stays put while the main panel changes, or a dashboard shell with tabs. Nested routing models this cleanly: a parent route renders shared UI plus an <Outlet /> placeholder, and child routes render inside that outlet. The parent stays mounted across child navigation, preserving its state.",
        "Define nested routes by placing <Route> elements inside another <Route>. Each level can read its own params and even relative paths. The <Outlet> component in the parent marks where the matching child should appear.",
      ],
      code: [
        {
          language: "tsx",
          filename: "DashboardRoutes.tsx",
          code: `import { Routes, Route, NavLink, Outlet, useParams } from "react-router-dom";
import ProjectOverview from "./ProjectOverview";
import ProjectTasks from "./ProjectTasks";
import ProjectSettings from "./ProjectSettings";

function ProjectLayout() {
  const { projectId } = useParams();
  return (
    <div className="project">
      <aside>
        <h2>Project {projectId}</h2>
        <nav>
          <NavLink to="" end>Overview</NavLink>
          <NavLink to="tasks">Tasks</NavLink>
          <NavLink to="settings">Settings</NavLink>
        </nav>
      </aside>
      <main>
        {/* Child route renders here */}
        <Outlet />
      </main>
    </div>
  );
}

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/projects/:projectId" element={<ProjectLayout />}>
        <Route index element={<ProjectOverview />} />
        <Route path="tasks" element={<ProjectTasks />} />
        <Route path="settings" element={<ProjectSettings />} />
      </Route>
    </Routes>
  );
}`,
        },
      ],
      callout: {
        type: "tip",
        title: "index route vs. relative path",
        content:
          "Use <Route index> to render a component when the parent's path matches exactly (no extra segment). Use relative paths like 'tasks' (no leading slash) so the child URL is built from the parent's path automatically.",
      },
    },
    {
      id: "data-fetching-patterns",
      heading: "Data Fetching Patterns",
      level: 2,
      paragraphs: [
        "There are two popular patterns for fetching data in React. The classic approach wraps a fetch call in useEffect and stores the result in state — straightforward, but you must manually handle loading flags, error handling, and race conditions when the URL changes. The modern approach uses a data library such as TanStack Query (React Query) or SWR, which handle caching, refetching, and deduping for you.",
        "Regardless of which you choose, always handle three UI states: loading (show a spinner or skeleton), error (show a friendly message and a retry button), and success (render the data). Skipping any of them leads to broken UX and unhandled promise rejections.",
      ],
      code: [
        {
          language: "tsx",
          filename: "useFetch.ts",
          code: `import { useEffect, useState } from "react";

type Status<T> =
  | { state: "loading" }
  | { state: "error"; error: Error }
  | { state: "success"; data: T };

export function useFetch<T>(url: string): Status<T> {
  const [status, setStatus] = useState<Status<T>>({ state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setStatus({ state: "loading" });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then((data) => setStatus({ state: "success", data }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setStatus({ state: "error", error });
        }
      });

    return () => controller.abort();
  }, [url]);

  return status;
}`,
        },
      ],
      table: {
        headers: ["Pattern", "Pros", "Cons"],
        rows: [
          ["useEffect + useState", "No dependencies, full control", "Manual caching, dedup, refetch, race handling"],
          ["TanStack Query", "Caching, refetch on focus, retries, devtools", "Extra dependency and learning curve"],
          ["React Router loaders", "Co-located with routes, runs before render", "Tighter coupling to router, less reusable"],
        ],
      },
    },
    {
      id: "axios-vs-fetch",
      heading: "Axios vs. fetch",
      level: 2,
      paragraphs: [
        "fetch is the browser's built-in API for making HTTP requests. It's promise-based and works without installing anything, but its ergonomics are bare: non-2xx responses do not throw, you must manually parse JSON, and there's no built-in request/response interception or timeout. Axios is a popular third-party library that wraps XMLHttpRequest (or the Node http module) and provides a friendlier API.",
        "Axios automatically transforms JSON, throws on any non-2xx status, supports request and response interceptors (great for attaching auth tokens), has built-in timeout, and works identically in Node and the browser. Most production React apps reach for Axios or a similar wrapper; for simple one-off requests, fetch is perfectly fine.",
      ],
      code: [
        {
          language: "ts",
          filename: "api.ts",
          code: `import axios from "axios";

// Create a configured instance to share base URL and interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 10_000,
});

// Attach the auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Automatically log out on 401 responses
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function getUsers() {
  // Axios throws on non-2xx, parses JSON automatically
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function createUser(payload: NewUser) {
  const { data } = await api.post<User>("/users", payload);
  return data;
}`,
        },
      ],
      callout: {
        type: "note",
        title: "Same effect, different style",
        content:
          "Both fetch and Axios are used inside useEffect (or TanStack Query) — the hook doesn't change. The choice is mostly about ergonomics: interceptors, timeouts, and consistent error handling push teams toward Axios; zero dependencies push them toward fetch.",
      },
    },
    {
      id: "error-boundaries",
      heading: "Error Boundaries",
      level: 2,
      paragraphs: [
        "Errors thrown during render — for example, accessing a property of undefined while data is still loading — used to unmount the entire React tree and show a blank page. Error boundaries are special class components (or hooks built on top of them) that catch these errors and show a fallback UI instead, isolating the failure to a subtree.",
        "Place error boundaries strategically: one at the app root as a last line of defence, and more around risky widgets (a third-party chart, a user-generated content renderer). The boundary catches render errors in its children but not errors in event handlers or async code — those still need try/catch.",
      ],
      code: [
        {
          language: "tsx",
          filename: "ErrorBoundary.tsx",
          code: `import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // Send to Sentry, LogRocket, etc.
    console.error("Caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div role="alert">
            <h2>Something went wrong.</h2>
            <pre>{this.state.error?.message}</pre>
            <button onClick={() => this.setState({ hasError: false, error: null })}>
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// Usage
// <ErrorBoundary fallback={<p>Chart failed to load.</p>}>
//   <ExpensiveChart data={data} />
// </ErrorBoundary>`,
        },
      ],
      callout: {
        type: "warning",
        title: "Not a catch-all",
        content:
          "Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of child components. They do NOT catch errors in event handlers, async code, or setTimeout callbacks — wrap those in try/catch yourself.",
      },
    },
  ],
  keyTakeaways: [
    "React Router syncs the UI with the URL using <BrowserRouter>, <Routes>, <Route>, and <Link>",
    "Dynamic segments (path=\"/users/:id\") are read with useParams; programmatic navigation uses useNavigate",
    "Nested routes with <Outlet> let a parent layout stay mounted while child routes swap inside it",
    "Always handle loading, error, and success states when fetching data — and cancel in-flight requests on unmount or URL change",
    "Axios adds interceptors, timeouts, and automatic JSON parsing on top of fetch-like ergonomics",
    "Error boundaries catch render-time errors and show a fallback UI, isolating failures to a subtree",
  ],
  exercises: [
    "Build a small three-page app (Home, About, Users) with React Router and a shared navigation bar",
    "Create a /users/:id route that fetches user details and includes Edit and Back buttons using useNavigate",
    "Refactor an existing useEffect-based fetch into a useFetch hook with loading/error/success states, then swap fetch for Axios with an interceptor",
    "Wrap a chart or list component in an ErrorBoundary and verify a render error shows the fallback instead of crashing the app",
  ],
  resources: [
    { label: "React Router Documentation", url: "https://reactrouter.com/en/main/start/overview" },
    { label: "TanStack Query — Overview", url: "https://tanstack.com/query/latest/docs/react/overview" },
    { label: "Axios HTTP Library", url: "https://axios-http.com/docs/intro" },
  ],
};
