import type { DayContent } from "../types";

export const day14: DayContent = {
  day: 14,
  slug: "day-14",
  title: "React State & Props Deep Dive",
  subtitle: "Managing interactivity with useState, controlled forms, conditional and list rendering",
  date: "Day 14",
  duration: "3.5 hours",
  category: "React Fundamentals",
  tags: ["React", "useState", "Forms", "State Management", "JSX"],
  description:
    "Make your React components interactive. Master the useState hook, build controlled forms, lift state up to shared parents, render lists with keys, and conditionally show or hide UI based on application state.",
  learningObjectives: [
    "Use the useState hook to add local state to functional components",
    "Build controlled form inputs that sync with component state",
    "Lift state up to a common parent to share data between siblings",
    "Render lists of elements with proper keys and conditional UI",
    "Recognise the component lifecycle and how it relates to render phases",
  ],
  prerequisites: [
    "Completed Day 13 — comfortable with JSX, props, and functional components",
    "Solid JavaScript: array methods (map, filter), destructuring, and closures",
    "A working Vite + React project to experiment in",
  ],
  topics: [
    "The useState Hook",
    "State Management Principles",
    "Controlled Components",
    "Forms in React",
    "Lifting State Up",
    "Prop Drilling",
    "Conditional Rendering",
    "List Rendering with Keys",
    "Component Lifecycle Basics",
  ],
  sections: [
    {
      id: "usestate-hook",
      heading: "The useState Hook",
      level: 2,
      paragraphs: [
        "useState is the most fundamental React hook. It lets a functional component remember a value between renders and trigger a re-render whenever that value changes. Calling useState returns a pair: the current state value and a setter function. React keeps track of which component called which hook by the order of calls, which is why hooks must always be called at the top level — never inside conditions, loops, or nested functions.",
        "State updates are asynchronous and batched. Calling the setter does not change the variable immediately; instead, React schedules a re-render with the new value. For state that depends on the previous value, always pass an updater function to the setter so you work with the freshest state even when several updates are batched together.",
      ],
      code: [
        {
          language: "jsx",
          filename: "Counter.jsx",
          code: `import { useState } from "react";

export default function Counter() {
  // const [currentState, setterFunction] = useState(initialValue);
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function increment() {
    // Use the updater form when the next value depends on the previous one
    setCount((prev) => prev + step);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <label>
        Step:
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>
      <button onClick={increment}>+{step}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "State is not the variable",
        content:
          "Calling setCount does not modify the local `count` variable. It tells React to re-render the component with a new value. The next time the function runs, useState returns the updated value instead of the initial one.",
      },
    },
    {
      id: "state-management-principles",
      heading: "State Management Principles",
      level: 2,
      paragraphs: [
        "Good state design keeps components predictable and bug-free. As a rule of thumb, prefer fewer state variables that hold the smallest possible representation of the data, and derive everything else during render. For example, store a list of items but compute its length on the fly rather than tracking a separate count variable that could drift out of sync.",
        "State should also live as close to where it is needed as possible. If only one component uses a value, keep the state there. If multiple siblings need it, lift it to the nearest common parent. Resist the urge to put everything in one giant top-level state object — that makes every update re-render the entire tree.",
      ],
      table: {
        headers: ["Rule", "Example", "Why it matters"],
        rows: [
          ["Single source of truth", "Store `items` and compute `count = items.length`", "Avoids bugs where two pieces of state disagree"],
          ["State as low as possible", "Hover state stays on the local <Card>", "Fewer re-renders, simpler components"],
          ["Immutable updates", "`setUser({ ...user, name: 'Ada' })`", "Lets React detect changes via reference equality"],
          ["Derived values are not state", "`const total = items.reduce(...)`", "No risk of stale or duplicated data"],
        ],
      },
      callout: {
        type: "tip",
        title: "Immutability is mandatory",
        content:
          "Never mutate state in place (e.g. `items.push(newItem)`). Always create a new array or object with the changes. React compares references, so a mutation in place will not trigger a re-render.",
      },
    },
    {
      id: "controlled-components-forms",
      heading: "Controlled Components & Forms",
      level: 2,
      paragraphs: [
        "In HTML, form elements such as <input>, <textarea>, and <select> keep their own internal state. In React, we usually make React the single source of truth by binding the input's value to a state variable and updating that state on every change. Such inputs are called controlled components.",
        "Controlled inputs make validation, formatting, and conditional disabling trivial because the value always lives in React state. For large forms, libraries like React Hook Form or Formik can reduce boilerplate, but understanding the underlying pattern is essential before reaching for a library.",
      ],
      code: [
        {
          language: "tsx",
          filename: "ContactForm.tsx",
          code: `import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^[^@]+@[^@]+\\.[^@]+$/.test(form.email)) next.email = "Invalid email";
    if (form.message.length < 10) next.message = "Message is too short";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting", form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>
        Message
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </label>

      <button type="submit">Send</button>
    </form>
  );
}`,
        },
      ],
    },
    {
      id: "lifting-state-up",
      heading: "Lifting State Up & Prop Drilling",
      level: 2,
      paragraphs: [
        "When two sibling components need to share or synchronise state, the standard solution is to lift that state up to their nearest common ancestor. The parent holds the state and passes values down as props along with callbacks the children call to update it. This keeps the data flow explicit and one-directional, which is one of React's core design principles.",
        "The trade-off is prop drilling — the need to pass props through intermediate components that don't use them themselves. For shallow trees this is fine and even desirable because it keeps the data flow visible. For deeper trees, the Context API (covered on Day 15) or state libraries like Zustand and Redux can eliminate the drilling.",
      ],
      code: [
        {
          language: "jsx",
          filename: "TemperatureConverter.jsx",
          code: `import { useState } from "react";

function CelsiusInput({ temperature, onTemperatureChange }) {
  return (
    <label>
      Celsius:
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </label>
  );
}

function FahrenheitInput({ temperature, onTemperatureChange }) {
  return (
    <label>
      Fahrenheit:
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </label>
  );
}

// Parent owns the shared state and the conversion logic
export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("0");

  const fahrenheit = celsius
    ? (parseFloat(celsius) * 9) / 5 + 32 + ""
    : "";

  function handleCelsius(value) {
    setCelsius(value);
  }

  function handleFahrenheit(value) {
    setCelsius(value ? ((parseFloat(value) - 32) * 5) / 9 + "" : "");
  }

  return (
    <div>
      <CelsiusInput temperature={celsius} onTemperatureChange={handleCelsius} />
      <FahrenheitInput temperature={fahrenheit} onTemperatureChange={handleFahrenheit} />
    </div>
  );
}`,
        },
      ],
      callout: {
        type: "info",
        title: "One-directional data flow",
        content:
          "State flows down from parent to child via props; events flow up via callback props. This predictability is what makes React apps debuggable even at scale.",
      },
    },
    {
      id: "conditional-list-rendering",
      heading: "Conditional & List Rendering with Keys",
      level: 2,
      paragraphs: [
        "Conditional rendering lets a component show different UI based on state. The most common techniques are the ternary operator for either/or choices, the logical && operator for show/hide cases, and early returns for guard clauses. Each renders JSX based on a boolean expression evaluated during the component's render.",
        "To render lists, transform an array into an array of JSX elements with .map(). Every top-level element in the list must have a stable, unique key prop so React can match elements across renders. Avoid using the array index as a key when the list can be reordered, inserted, or filtered — it causes subtle bugs and performance issues.",
      ],
      code: [
        {
          language: "jsx",
          filename: "TodoList.jsx",
          code: `import { useState } from "react";

const initialTodos = [
  { id: 1, text: "Learn JSX", done: true },
  { id: 2, text: "Learn state", done: true },
  { id: 3, text: "Learn lists & keys", done: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );

  function toggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  return (
    <div>
      {/* Conditional rendering with ternary */}
      {visible.length === 0 ? (
        <p>No items match this filter.</p>
      ) : (
        <ul>
          {/* List rendering with stable keys */}
          {visible.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                />
                <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                  {todo.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Why keys matter",
        content:
          "Keys give list items stable identities. If you use the array index as a key and then reorder the list, React reuses the wrong DOM nodes, which causes state (e.g. input text) to attach to the wrong item. Use a unique ID from your data whenever possible.",
      },
    },
    {
      id: "component-lifecycle-basics",
      heading: "Component Lifecycle Basics",
      level: 2,
      paragraphs: [
        "Every React component goes through a lifecycle: it mounts (first appears in the DOM), updates (re-renders when state or props change), and unmounts (is removed from the DOM). In class components these phases had explicit methods like componentDidMount; with hooks, the same logic is expressed through useEffect, which you will learn on Day 15.",
        "Understanding the lifecycle is essential because side effects — fetching data, subscribing to events, setting timers — must run at the right time. The render phase itself must stay pure: no API calls, no event subscriptions, no mutations of external state. Side effects belong in event handlers or in useEffect, never in the body of the component.",
      ],
      table: {
        headers: ["Phase", "What happens", "Where side effects go"],
        rows: [
          ["Mount", "Component renders for the first time and is inserted into the DOM", "useEffect with empty dependency array"],
          ["Update", "State or props change and the component re-renders", "useEffect with the changed values in its dependency array"],
          ["Unmount", "Component is removed from the DOM", "Cleanup function returned from useEffect"],
        ],
      },
      callout: {
        type: "note",
        title: "Render must be pure",
        content:
          "The body of your component is the render phase. Calling setState, fetching data, or mutating external variables here leads to infinite loops and inconsistent UI. Keep render pure — compute output from props and state, nothing more.",
      },
    },
  ],
  keyTakeaways: [
    "useState returns the current value and a setter; always use the updater form when the next value depends on the previous one",
    "Keep state minimal, immutable, and as close to where it's used as possible",
    "Controlled components bind input values to state, making React the single source of truth for forms",
    "Lift shared state to a common parent to synchronise siblings; reach for Context only when prop drilling becomes painful",
    "Lists need stable keys so React can match elements across renders — never use the array index for mutable lists",
  ],
  exercises: [
    "Build a counter with increment, decrement, and reset buttons plus an input to set the step size",
    "Create a controlled registration form with name, email, password, and a checkbox for terms — validate each field on submit",
    "Build a temperature converter where Celsius and Fahrenheit inputs stay in sync via lifted state",
    "Render a filterable todo list that supports all/active/done filters and toggling items done",
  ],
  resources: [
    { label: "React — State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory" },
    { label: "React — Choosing the State Structure", url: "https://react.dev/learn/choosing-the-state-structure" },
    { label: "React — Rendering Lists", url: "https://react.dev/learn/rendering-lists" },
  ],
};
