import type { DayContent } from "../types";

export const day12: DayContent = {
  day: 12,
  slug: "day-12",
  title: "Asynchronous JavaScript: Promises & Async/Await",
  subtitle: "Handling time, network, and concurrency without freezing the page",
  date: "Day 12",
  duration: "3 hours",
  category: "JavaScript Fundamentals",
  tags: ["JavaScript", "Asynchronous", "Promises", "Async/Await", "Fetch API"],
  description:
    "Modern web apps constantly wait on network requests, timers, and user input. Learn how JavaScript handles these operations with its event loop, why callbacks led to 'callback hell', and how Promises and async/await make asynchronous code readable. Cap it all off with the fetch API for making HTTP requests.",
  learningObjectives: [
    "Distinguish synchronous from asynchronous execution and explain the event loop",
    "Use callbacks and understand why deeply nested callbacks are hard to maintain",
    "Create and consume Promises with then, catch, and finally",
    "Compose asynchronous operations with Promise.all, Promise.race, and Promise.allSettled",
    "Write asynchronous code with async/await and handle errors using try/catch",
  ],
  prerequisites: [
    "Completed Days 7–11 (JavaScript Basics through Arrays & Objects)",
    "Comfort with arrow functions, destructuring, and the spread operator",
    "Basic understanding of HTTP requests and JSON",
  ],
  topics: [
    "Synchronous vs Asynchronous JavaScript",
    "Callbacks and Callback Hell",
    "Promises (then, catch, finally)",
    "Promise.all, Promise.race, Promise.allSettled",
    "Async/Await and try/catch",
    "The Fetch API",
  ],
  sections: [
    {
      id: "sync-vs-async",
      heading: "Synchronous vs Asynchronous JavaScript",
      level: 2,
      paragraphs: [
        "JavaScript is single-threaded — it executes one statement at a time. Synchronous code runs line by line, and each statement blocks the next until it finishes. This works fine for fast operations, but becomes a problem when code waits on something slow like a network request or timer — the entire UI freezes until the wait is over.",
        "Asynchronous code sidesteps this by handing slow operations to the browser (or runtime) and continuing with other work immediately. When the operation completes, a callback is queued to run. The event loop continuously checks the queue and runs pending callbacks once the main thread is free. This is how JavaScript achieves concurrency on a single thread.",
      ],
      callout: {
        type: "info",
        title: "The Event Loop",
        content:
          "The event loop is the mechanism that lets JavaScript appear to do many things at once. It pulls completed async callbacks from the task queue and runs them on the main thread whenever the call stack is empty. Understanding it is the key to mastering async JavaScript.",
      },
      code: [
        {
          language: "javascript",
          code: `// Synchronous — runs top to bottom, blocks
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3 (in order)

// Asynchronous — setTimeout doesn't block
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A, C, B  (B runs after the main thread is free)

// A slow synchronous operation freezes the page
function block(seconds) {
  const end = Date.now() + seconds * 1000;
  while (Date.now() < end) { /* spin */ }
}
block(3); // The entire page is frozen for 3 seconds!

// Async lets the page stay responsive
console.log("start");
fetch("/api/data")            // non-blocking — returns immediately
  .then(r => r.json())
  .then(data => console.log("got data", data));
console.log("end");           // runs before the fetch resolves`,
        },
      ],
      list: {
        items: [
          "Single-threaded: one statement runs at a time on the main thread",
          "Synchronous code blocks — each line waits for the previous one",
          "Async operations are handled by the browser, freeing the main thread",
          "The event loop runs queued callbacks when the call stack is empty",
          "Common async sources: timers, network requests, user events, file I/O",
        ],
      },
    },
    {
      id: "callbacks-callback-hell",
      heading: "Callbacks and Callback Hell",
      level: 2,
      paragraphs: [
        "Before Promises, the only way to handle async work was callbacks — functions passed as arguments to be invoked later when an operation completes. Callbacks work for simple cases, but when multiple async steps depend on each other, you end up nesting callbacks inside callbacks inside callbacks, a structure nicknamed 'callback hell' or the 'pyramid of doom'.",
        "Deeply nested callbacks are hard to read, hard to reason about, and hard to error-handle. Each step needs its own error check, control flow is buried in indentation, and there's no clean way to return values or compose operations. Promises were created specifically to solve these problems.",
      ],
      code: [
        {
          language: "javascript",
          filename: "callbacks.js",
          code: `// Simple callback — fine for one step
setTimeout(() => {
  console.log("Runs after 1 second");
}, 1000);

// Callback with error-first convention (Node.js style)
function loadUser(id, callback) {
  setTimeout(() => {
    if (id < 0) return callback(new Error("Invalid id"));
    callback(null, { id, name: "Ada" });
  }, 500);
}

loadUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log(user);
});

// CALLBACK HELL — nested dependent operations
loadUser(1, (err, user) => {
  if (err) return handleError(err);
  loadPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    loadComments(posts[0].id, (err, comments) => {
      if (err) return handleError(err);
      loadReplies(comments[0].id, (err, replies) => {
        if (err) return handleError(err);
        // Keep nesting...
        console.log(replies);
      });
    });
  });
});

// The pyramid grows rightward — hard to read, hard to debug`,
        },
      ],
      callout: {
        type: "warning",
        title: "Why Callbacks Fail at Scale",
        content:
          "Nested callbacks invert control flow, scatter error handling, and make refactoring dangerous. Promises and async/await restore linear, top-to-bottom readability while preserving the same async behavior underneath.",
      },
    },
    {
      id: "promises-then-catch-finally",
      heading: "Promises: then, catch, and finally",
      level: 2,
      paragraphs: [
        "A Promise is an object representing the eventual result of an async operation. It can be in one of three states: pending (still running), fulfilled (succeeded with a value), or rejected (failed with a reason). Once settled, a promise cannot change state. You react to settlement by chaining .then, .catch, and .finally handlers.",
        "then takes two optional callbacks — onFulfilled and onRejected — but most code uses .then for success and .catch for errors. Each handler can return a value (which becomes the next promise's resolution) or another promise (which chains). This chaining is what makes Promises so much cleaner than callbacks — each step is a flat method call, not a deeper nest.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Creating a Promise
function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) return reject(new Error("ms must be >= 0"));
    setTimeout(() => resolve(\`waited \${ms}ms\`), ms);
  });
}

// Consuming with then / catch / finally
delay(500)
  .then(result => {
    console.log("Success:", result);
    return "next value";        // passed to the next .then
  })
  .then(value => {
    console.log("Chained:", value);
  })
  .catch(err => {
    console.error("Failed:", err.message);
  })
  .finally(() => {
    console.log("Cleanup — runs no matter what");
  });

// Returning a Promise from then chains async operations
function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}

fetchUser(1)
  .then(user => fetch(\`/api/posts?userId=\${user.id}\`))
  .then(r => r.json())
  .then(posts => console.log(posts))
  .catch(err => console.error("Something failed:", err))
  .finally(() => console.log("Done"));

// Promise.resolve and Promise.reject — quick promises
const quick = Promise.resolve(42);
const failed = Promise.reject(new Error("boom"));

quick.then(v => console.log(v)); // 42`,
        },
      ],
      callout: {
        type: "tip",
        title: "Always End Chains with catch",
        content:
          "An unhandled promise rejection in modern JavaScript will crash your Node.js process or surface as a console warning in browsers. Always terminate promise chains with .catch, or wrap them in async/await with try/catch.",
      },
    },
    {
      id: "promise-combinators",
      heading: "Promise.all, Promise.race, and Promise.allSettled",
      level: 2,
      paragraphs: [
        "When you have multiple promises, JavaScript provides combinator methods to coordinate them. Promise.all waits for every promise to fulfill and resolves with an array of results — but rejects immediately if any one fails (fast-fail). Promise.race resolves or rejects as soon as the first promise settles. Promise.allSettled waits for all of them regardless of outcome and returns an array of status descriptors.",
        "Choosing the right combinator matters. Use Promise.all for parallel operations where every result is required (e.g., loading multiple resources). Use Promise.race for timeouts or first-wins patterns. Use Promise.allSettled when you want to know which succeeded and which failed without short-circuiting.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Promise.all — wait for ALL, fail fast on ANY rejection
const p1 = fetch("/api/users").then(r => r.json());
const p2 = fetch("/api/posts").then(r => r.json());
const p3 = fetch("/api/comments").then(r => r.json());

Promise.all([p1, p2, p3])
  .then(([users, posts, comments]) => {
    console.log("All loaded:", users, posts, comments);
  })
  .catch(err => {
    // Runs if ANY of the three rejects
    console.error("At least one failed:", err);
  });

// Promise.race — first to settle wins (resolve OR reject)
const fastTimeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("timeout")), 5000)
);
const fetchPromise = fetch("/api/slow");

Promise.race([fetchPromise, fastTimeout])
  .then(r => console.log("Got response in time"))
  .catch(err => console.error("Timed out or failed:", err));

// Promise.allSettled — wait for all, never reject, report status
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === "fulfilled") {
        console.log(\`[\${i}] OK\`, result.value);
      } else {
        console.error(\`[\${i}] FAIL\`, result.reason);
      }
    });
  });

// Promise.any — resolve with first FULFILLED, ignore rejections
// (Rejects only if ALL promises reject)
Promise.any([
  Promise.reject("first fails"),
  Promise.resolve("second wins"),
  Promise.resolve("third")
]).then(v => console.log(v)); // "second wins"`,
        },
      ],
      table: {
        headers: ["Method", "Resolves When", "Rejects When"],
        rows: [
          ["Promise.all", "All promises fulfill", "Any promise rejects (fast-fail)"],
          ["Promise.allSettled", "All promises settle (never rejects)", "Never"],
          ["Promise.race", "First promise settles (resolve or reject)", "First promise rejects"],
          ["Promise.any", "First promise fulfills", "All promises reject"],
        ],
      },
    },
    {
      id: "async-await",
      heading: "Async/Await and try/catch",
      level: 2,
      paragraphs: [
        "Async/await, introduced in ES2017, is syntactic sugar over Promises that lets you write asynchronous code that looks synchronous. Mark a function with the async keyword and you can use await before any Promise — the function pauses at that line until the Promise settles, then resumes with the resolved value (or throws on rejection). Behind the scenes, async functions always return a Promise.",
        "The big win is readability. Chains of .then calls become top-to-bottom statements, and try/catch handles errors just like synchronous code. Async/await also makes loops much cleaner — you can await inside a for loop (just not inside forEach, which doesn't await its callback).",
      ],
      code: [
        {
          language: "javascript",
          filename: "async-await.js",
          code: `// Equivalent: Promise chain vs async/await
// Promise chain
function loadChain(id) {
  return fetchUser(id)
    .then(user => fetchPosts(user.id))
    .then(posts => posts[0])
    .then(post => fetchComments(post.id));
}

// async/await — same logic, easier to read
async function loadAsync(id) {
  const user = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  const post = posts[0];
  const comments = await fetchComments(post.id);
  return comments;
}

// Error handling with try/catch
async function safeLoad(id) {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (err) {
    console.error("Failed to load user:", err.message);
    return null;
  } finally {
    console.log("Attempt complete");
  }
}

// Awaiting Promise.all for parallel operations
async function loadDashboard() {
  // These run in parallel — faster than awaiting sequentially
  const [user, posts, notifications] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/notifications").then(r => r.json()),
  ]);
  return { user, posts, notifications };
}

// Sequential awaits inside a loop (use for...of, NOT forEach)
async function processUsers(ids) {
  for (const id of ids) {
    const user = await fetchUser(id);
    console.log(user.name);
  }
}

// await only pauses the async function — it doesn't block the page
async function demo() {
  console.log("before");
  await delay(1000);
  console.log("after — 1 second later");
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "forEach Doesn't Await",
        content:
          "Array.forEach ignores the Promise returned by your async callback — your awaits run in parallel and the loop returns before any of them finish. Use a for...of loop when you need sequential awaits, or Promise.all(arr.map(asyncFn)) for parallel.",
      },
    },
    {
      id: "fetch-api",
      heading: "The Fetch API and HTTP Requests",
      level: 2,
      paragraphs: [
        "The fetch API is the modern, Promise-based way to make HTTP requests from the browser. It replaces the older XMLHttpRequest with a clean interface: fetch(url, options) returns a Promise that resolves to a Response object. You then call response.json(), .text(), or .blob() to read the body — each of those returns another Promise.",
        "fetch only rejects on network errors — HTTP status codes like 404 or 500 still count as a successful response. You must check response.ok (true for 2xx) yourself and throw if you want to handle non-2xx as errors. Always include proper headers, especially Content-Type: application/json when sending JSON bodies.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Basic GET request
fetch("/api/users")
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    return response.json();
  })
  .then(users => console.log(users))
  .catch(err => console.error("Fetch failed:", err));

// POST with JSON body
async function createUser(data) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${token}\`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }
    return await response.json();
  } catch (err) {
    console.error("createUser failed:", err);
    throw err;
  }
}

createUser({ name: "Ada", email: "ada@example.com" })
  .then(user => console.log("Created:", user));

// PUT / PATCH / DELETE
await fetch(\`/api/users/\${id}\`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Updated" }),
});

await fetch(\`/api/users/\${id}\`, { method: "DELETE" });

// Reading different response body types
const textResp  = await fetch("/text").then(r => r.text());
const jsonResp  = await fetch("/json").then(r => r.json());
const blobResp  = await fetch("/image").then(r => r.blob());

// Request with query parameters
const params = new URLSearchParams({ page: 1, limit: 20 });
const url = \`/api/users?\${params}\`;
const resp = await fetch(url);`,
        },
      ],
      callout: {
        type: "tip",
        title: "Always Check response.ok",
        content:
          "fetch resolves for any response that the server returns — even 404 or 500. Always check response.ok (or response.status) and throw manually if you want non-2xx responses to enter your catch block.",
      },
    },
  ],
  keyTakeaways: [
    "JavaScript is single-threaded; async operations are handled by the browser and run via the event loop",
    "Callbacks work but create 'callback hell' when chained — Promises solve this with then/catch/finally",
    "Promise.all waits for all promises, Promise.race waits for the first, Promise.allSettled never rejects",
    "async/await is syntactic sugar over Promises that makes async code look synchronous and uses try/catch",
    "The fetch API returns Promises — always check response.ok and convert the body with .json() or .text()",
  ],
  exercises: [
    "Convert a nested callback chain into a clean Promise chain using then and catch",
    "Use Promise.all to load three API endpoints in parallel and combine the results into a single object",
    "Rewrite a Promise chain as an async/await function with try/catch error handling",
    "Build a fetch wrapper that sends a POST request with JSON, checks response.ok, and throws a descriptive error on failure",
  ],
  resources: [
    { label: "MDN — Using Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
    { label: "MDN — async/await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" },
    { label: "MDN — Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
  ],
};
