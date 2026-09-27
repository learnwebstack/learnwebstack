import type { DayContent } from "../types";

export const day15: DayContent = {
  day: 15,
  slug: "day-15",
  title: "React Hooks & Side Effects",
  subtitle: "useEffect, useContext, useRef, custom hooks, and performance optimization",
  date: "Day 15",
  duration: "3.5 hours",
  category: "React Fundamentals",
  tags: ["React", "Hooks", "useEffect", "Context", "Performance"],
  description:
    "Go beyond useState and unlock the full power of React hooks. Handle side effects with useEffect, share global state through the Context API, persist mutable values with useRef, write your own reusable hooks, and optimise renders with useMemo and useCallback.",
  learningObjectives: [
    "Use useEffect to run side effects with the correct dependency array",
    "Share data across the component tree with the Context API and useContext",
    "Persist mutable, non-reactive values with useRef and access DOM nodes",
    "Extract reusable logic into custom hooks that follow the rules of hooks",
    "Optimise expensive renders with useMemo and useCallback",
  ],
  prerequisites: [
    "Completed Days 13–14 — comfortable with components, props, and useState",
    "Understanding of JavaScript closures and array methods",
    "Familiarity with the fetch API and Promises",
  ],
  topics: [
    "The useEffect Hook",
    "Dependency Arrays",
    "Cleanup Functions",
    "useContext & the Context API",
    "useRef Hook",
    "Custom Hooks",
    "useMemo & useCallback",
    "Rules of Hooks",
  ],
  sections: [
    {
      id: "useeffect-hook",
      heading: "The useEffect Hook",
      level: 2,
      paragraphs: [
        "useEffect lets a functional component perform side effects — anything that reaches outside the component itself, such as fetching data, subscribing to events, manipulating the DOM directly, or starting timers. By default, the effect runs after every render, but most effects need to run only when specific values change.",
        "Each useEffect call takes two arguments: a function to run and an optional dependency array. The dependency array controls when the effect re-runs. An omitted array means 'run after every render', an empty array means 'run only once after the initial mount', and an array with values means 'run on mount and whenever any of those values change'.",
      ],
      code: [
        {
          language: "jsx",
          filename: "DocumentTitle.jsx",
          code: `import { useEffect, useState } from "react";

export default function DocumentTitle() {
  const [count, setCount] = useState(0);

  // Runs once after mount — empty dependency array
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  // Runs on mount and whenever \`count\` changes
  useEffect(() => {
    document.title = \`Clicked \${count} times\`;
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}`,
        },
      ],
      table: {
        headers: ["Dependency array", "Effect runs…", "Typical use"],
        rows: [
          ["(omitted)", "after every render", "Rare — usually a bug"],
          ["[]", "once after the initial mount", "Initial data fetch, one-time setup"],
          ["[a, b]", "on mount and when a or b changes", "Re-fetching when an id changes"],
        ],
      },
      callout: {
        type: "warning",
        title: "The eslint-plugin-react-hooks rule",
        content:
          "Always include every reactive value (state, props, derived values) your effect reads inside its dependency array. The eslint-plugin-react-hooks/exhaustive-deps rule will warn you if you forget one — heed those warnings.",
      },
    },
    {
      id: "cleanup-functions",
      heading: "Cleanup Functions",
      level: 2,
      paragraphs: [
        "Side effects often create resources that need to be torn down when the component unmounts or before the effect runs again — event listeners, websockets, intervals, or subscriptions. useEffect supports this by letting your effect return a cleanup function. React calls it on every re-run (before the next effect) and on unmount.",
        "Forgetting cleanup is one of the most common sources of memory leaks and bugs in React apps. A setInterval that is never cleared keeps firing, a websocket stays open after the user navigates away, and a stale event listener keeps handling events for a component that no longer exists.",
      ],
      code: [
        {
          language: "jsx",
          filename: "useWindowWidth.jsx",
          code: `import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup runs before the next effect and on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty array: subscribe once, unsubscribe on unmount

  return width;
}`,
        },
      ],
      callout: {
        type: "tip",
        title: "Pair every subscription with its cleanup",
        content:
          "A simple rule: if you call addEventListener, setInterval, setTimeout, or any 'subscribe' method inside useEffect, return the matching remove/clear call as the cleanup. This prevents leaks and double-handling.",
      },
    },
    {
      id: "context-api",
      heading: "useContext & the Context API",
      level: 2,
      paragraphs: [
        "Prop drilling — passing the same prop through many layers of components — gets painful fast. The Context API solves this by letting a parent publish a value that any descendant can read with useContext, no matter how deep. Common uses are theme, current user, locale, and feature flags.",
        "Create context with createContext, provide it high in the tree with <MyContext.Provider value={...}>, and consume it anywhere inside with useContext(MyContext). When the provider's value changes, every consumer re-renders. To avoid unnecessary re-renders, keep the value stable (memoised) and split contexts that change at different rates.",
      ],
      code: [
        {
          language: "tsx",
          filename: "ThemeContext.tsx",
          code: `import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook gives a clean API and throws if used outside the provider
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}`,
        },
      ],
      callout: {
        type: "info",
        title: "When to reach for Context",
        content:
          "Context is best for low-frequency, global values (theme, user, locale). For high-frequency updates or complex state, consider Zustand, Redux Toolkit, or Jotai — Context can cause wide re-renders when its value changes often.",
      },
    },
    {
      id: "useref-hook",
      heading: "The useRef Hook",
      level: 2,
      paragraphs: [
        "useRef returns a mutable object whose .current property can hold any value across renders without triggering re-renders when it changes. This makes it ideal for two scenarios: storing mutable values that are not part of the UI (a timer id, a 'isMounted' flag) and accessing DOM nodes directly.",
        "When you pass a ref object to a component via the ref prop, React sets ref.current to the underlying DOM node after mount. This is the React-idiomatic way to focus an input, measure an element, or integrate a non-React library — but avoid overusing refs for things that should be state.",
      ],
      code: [
        {
          language: "jsx",
          filename: "AutoFocusInput.jsx",
          code: `import { useEffect, useRef, useState } from "react";

export default function AutoFocusInput() {
  const inputRef = useRef(null);     // holds a DOM node
  const timerIdRef = useRef(null);   // holds a non-reactive value
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Access the DOM node directly
    inputRef.current?.focus();

    // Store a timer id so we can clear it later
    timerIdRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timerIdRef.current);
  }, []);

  return (
    <div>
      <input ref={inputRef} placeholder="I auto-focus on mount" />
      <p>Seconds elapsed: {seconds}</p>
    </div>
  );
}`,
        },
      ],
      callout: {
        type: "note",
       title: "ref vs. state",
        content:
          "Use state when the value should affect what's rendered. Use ref when you need to persist a value across renders without causing a re-render (timer ids, caches, DOM nodes). Mutating ref.current during render is forbidden — only do it in effects or event handlers.",
      },
    },
    {
      id: "custom-hooks",
      heading: "Custom Hooks",
      level: 2,
      paragraphs: [
        "A custom hook is a function whose name starts with 'use' and that may call other hooks internally. Custom hooks let you extract reusable stateful logic out of a component — for example, a useFetch hook that handles loading and error states for any URL, or a useLocalStorage hook that syncs state to localStorage.",
        "Custom hooks are the primary way to share stateful logic between components without resorting to render props or higher-order components. Keep them focused, give them a clear input/output contract, and return either a value or an array of values so callers can rename them.",
      ],
      code: [
        {
          language: "ts",
          filename: "useFetch.ts",
          code: `import { useEffect, useState } from "react";

type State<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(url: string): State<T> {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setState({ data: null, loading: false, error });
        }
      });

    return () => controller.abort(); // cancel on unmount or url change
  }, [url]);

  return state;
}`,
        },
      ],
      callout: {
        type: "success",
        title: "Composable by design",
        content:
          "Custom hooks compose like Lego bricks. useFetch can be used inside useUserProfile, which can be used inside a useAuth hook. This composability is what makes React's mental model scale to large applications.",
      },
    },
    {
      id: "usememo-usecallback-rules",
      heading: "useMemo, useCallback & the Rules of Hooks",
      level: 2,
      paragraphs: [
        "useMemo caches (memoises) the result of an expensive computation so it isn't recomputed on every render unless its dependencies change. useCallback does the same for a function, returning the same function reference across renders. Both are optimisations — use them only when profiling shows they help, as over-using them adds overhead and complexity.",
        "Finally, the Rules of Hooks: (1) only call hooks at the top level of your component or custom hook — never inside loops, conditions, or nested functions; and (2) only call hooks from React functions (components or custom hooks). React relies on the order of hook calls to associate state with the right component; breaking the order corrupts state and causes crashes.",
      ],
      code: [
        {
          language: "jsx",
          filename: "SearchResults.jsx",
          code: `import { useMemo, useState, useCallback } from "react";

export default function SearchResults({ items }) {
  const [query, setQuery] = useState("");

  // Memoise an expensive filter — only recomputes when items or query change
  const results = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  // useCallback returns a stable function so memoised children don't re-render
  const handleSelect = useCallback((id) => {
    console.log("Selected", id);
  }, []);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
      />
      <ul>
        {results.map((r) => (
          <li key={r.id} onClick={() => handleSelect(r.id)}>
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Don't memoise prematurely",
        content:
          "useMemo and useCallback are not free — each call costs memory and comparison time. Reach for them only when an expensive calculation or a stable callback reference is genuinely needed (e.g. to keep a memoised child from re-rendering). Profile first.",
      },
    },
  ],
  keyTakeaways: [
    "useEffect runs side effects after render; the dependency array controls when it re-runs",
    "Return a cleanup function from useEffect to release subscriptions, timers, and listeners",
    "The Context API lets a parent publish a value that any descendant can read with useContext — ideal for low-frequency global state",
    "useRef persists mutable values and DOM nodes across renders without triggering re-renders",
    "Custom hooks (functions named use*) are the idiomatic way to extract and share stateful logic",
    "useMemo and useCallback optimise renders; use them only when profiling shows they help",
    "Always follow the Rules of Hooks: top-level calls only, from React functions only",
  ],
  exercises: [
    "Build a useFetch hook that returns { data, loading, error } and use it to load a list of users from a public API",
    "Create a ThemeProvider using the Context API with a toggle button that updates the page theme",
    "Write a useWindowWidth hook that subscribes to resize events with proper cleanup, and use it to show a 'mobile/desktop' indicator",
    "Refactor a component with an expensive computation by wrapping it in useMemo, and verify with console.log that it doesn't recompute unnecessarily",
  ],
  resources: [
    { label: "React — Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" },
    { label: "React — Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context" },
    { label: "React — You Might Not Need an Effect", url: "https://react.dev/learn/you-might-not-need-an-effect" },
  ],
};
