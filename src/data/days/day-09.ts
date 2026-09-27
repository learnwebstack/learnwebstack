import type { DayContent } from "../types";

export const day09: DayContent = {
  day: 9,
  slug: "day-09",
  title: "JavaScript DOM Manipulation & Events",
  subtitle: "Selecting, modifying, and reacting to the page — turning static HTML into an interactive app",
  date: "Day 09",
  duration: "3 hours",
  category: "JavaScript Fundamentals",
  tags: ["JavaScript", "DOM", "Events", "Event Delegation", "Browser APIs"],
  description:
    "Bridge the gap between HTML and JavaScript by mastering the Document Object Model. Learn to select elements, modify their content and styles, create new nodes, and respond to user actions through event listeners — including the powerful pattern of event delegation.",
  learningObjectives: [
    "Explain what the DOM is and how the browser builds it from HTML",
    "Select elements using getElementById, querySelector, and querySelectorAll",
    "Modify element content, attributes, classes, and inline styles",
    "Create, append, and remove DOM nodes dynamically",
    "Add event listeners, understand event types, and apply event delegation",
  ],
  prerequisites: [
    "Completed Days 7–8 (JavaScript Basics, Control Flow & Functions)",
    "Solid understanding of HTML structure and CSS selectors",
    "A browser with DevTools for live experimentation",
  ],
  topics: [
    "What is the DOM?",
    "Selecting Elements",
    "Modifying Elements",
    "Creating and Appending Nodes",
    "Event Listeners and Event Types",
    "Event Delegation and Bubbling",
  ],
  sections: [
    {
      id: "what-is-the-dom",
      heading: "What is the DOM?",
      level: 2,
      paragraphs: [
        "The Document Object Model (DOM) is a tree-like representation of an HTML document that the browser creates when a page loads. Every HTML element, attribute, and piece of text becomes a node in this tree, and JavaScript can read and modify those nodes in real time. The DOM is what makes web pages interactive rather than static.",
        "The top of the tree is the document object, which exposes methods like getElementById and querySelector. Below it sit the html, head, and body elements, each branching into their children. When you 'manipulate the DOM', you're calling methods on these node objects to change what the user sees — and the browser re-renders the affected parts automatically.",
      ],
      image: {
        src: "/images/days/dom-tree.svg",
        alt: "Diagram of an HTML document represented as a tree of nodes",
        caption: "The DOM is a tree of nodes, with document at the root and every HTML element as a branch.",
        description:
          "The document object sits at the top, branching into html, which branches into head and body. Each element can have child elements and text nodes, forming a hierarchy that mirrors the HTML structure.",
      },
      callout: {
        type: "info",
        title: "DOM vs HTML Source",
        content:
          "The DOM is the live, in-memory representation of the page. It can differ from the HTML source — JavaScript can add, remove, or change nodes after load, and the DOM reflects those changes immediately. View Source shows the original file; DevTools Elements panel shows the current DOM.",
      },
    },
    {
      id: "selecting-elements",
      heading: "Selecting Elements",
      level: 2,
      paragraphs: [
        "Before you can modify an element, you need a reference to it. The DOM provides several methods for finding elements. The classic ones — getElementById, getElementsByTagName, getElementsByClassName — return live collections. The modern ones — querySelector and querySelectorAll — accept any CSS selector and return static results, making them far more flexible.",
        "querySelector returns the first matching element (or null), while querySelectorAll returns a static NodeList of all matches. You can iterate a NodeList with forEach or convert it to a real array with Array.from() if you need full array methods.",
      ],
      code: [
        {
          language: "javascript",
          filename: "selectors.js",
          code: `// By ID — returns a single element (or null)
const header = document.getElementById("main-header");

// By CSS selector — modern and flexible
const button = document.querySelector(".btn-primary");
const firstItem = document.querySelector("ul li:first-child");
const nested = document.querySelector("#sidebar .widget h3");

// All matches — returns a static NodeList
const allButtons = document.querySelectorAll("button");
allButtons.forEach(btn => {
  console.log(btn.textContent);
});

// Convert NodeList to Array if you need full array methods
const items = Array.from(document.querySelectorAll(".item"));
const filtered = items.filter(item => item.dataset.active === "true");

// Classic methods (return live HTMLCollections)
const paragraphs = document.getElementsByTagName("p");
const errors = document.getElementsByClassName("error");`,
        },
      ],
      callout: {
        type: "tip",
        title: "Always Null-Check",
        content:
          "querySelector returns null if no element matches. Calling methods on null throws a TypeError, so always check your result before using it: if (const el = document.querySelector(\"#x\")) { ... }.",
      },
    },
    {
      id: "modifying-elements",
      heading: "Modifying Elements",
      level: 2,
      paragraphs: [
        "Once you have a reference to an element, you can change almost anything about it. The most common modifications are updating text content (textContent), HTML content (innerHTML), attributes (setAttribute / getAttribute), classes (classList), and inline styles (the style property). Each has trade-offs in safety and performance.",
        "Prefer textContent over innerHTML when inserting plain text — innerHTML parses HTML and is vulnerable to cross-site scripting (XSS) if you insert untrusted data. Use classList.add/remove/toggle for classes rather than manipulating the className string. The style property only affects inline styles; for broader styling, toggle classes that are defined in your CSS.",
      ],
      code: [
        {
          language: "javascript",
          code: `const el = document.querySelector("#status");

// Text and HTML content
el.textContent = "Loading complete";        // safe — escapes HTML
el.innerHTML = "<strong>Done!</strong>";    // parses HTML (XSS risk with user data)

// Attributes
el.setAttribute("data-state", "ready");
const id = el.getAttribute("data-id");
el.removeAttribute("disabled");
console.log(el.hasAttribute("hidden"));

// Classes — classList is the modern API
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("dark-mode");
if (el.classList.contains("active")) {
  console.log("Element is active");
}

// Inline styles — use camelCase for CSS properties
el.style.color = "#ffffff";
el.style.backgroundColor = "#0066cc";
el.style.fontSize = "18px";
el.style.display = "none";

// Data attributes — accessible via dataset
// <div id="user" data-user-id="42" data-role="admin"></div>
console.log(el.dataset.userId); // "42"
console.log(el.dataset.role);   // "admin"
el.dataset.lastLogin = "2024-01-15";`,
        },
      ],
      callout: {
        type: "warning",
        title: "XSS Warning",
        content:
          "Never use innerHTML to insert untrusted user input. It will execute any embedded <script> tags or event handlers. Use textContent for plain text, or set attributes individually with the DOM API for structured content.",
      },
    },
    {
      id: "creating-appending-nodes",
      heading: "Creating and Appending Nodes",
      level: 2,
      paragraphs: [
        "JavaScript can build entire UIs from scratch using document.createElement. You create a new element, configure its properties and content, then attach it to the DOM with methods like appendChild, append, prepend, or insertBefore. Each insertion triggers a reflow, so batch operations when adding many nodes — for example, by using a DocumentFragment.",
        "To remove elements, call parent.removeChild(child) or the more modern child.remove(). Replacing is done with parent.replaceChild(newChild, oldChild) or the replaceWith method. After modifying the DOM, the browser automatically recalculates layout and repaints — keep an eye on performance when manipulating many nodes in a loop.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Create a new list item
const li = document.createElement("li");
li.textContent = "Buy groceries";
li.classList.add("todo-item");

// Append it to an existing list
const list = document.querySelector("#todo-list");
list.appendChild(li);

// append / prepend accept multiple nodes and even text
const header = document.querySelector("header");
header.prepend("Welcome — ");
header.append(document.createElement("hr"));

// Insert before a specific sibling
const referenceNode = list.children[0];
list.insertBefore(li, referenceNode);

// Remove and replace
const oldItem = list.children[1];
oldItem.remove();                  // modern
// list.removeChild(oldItem);      // legacy equivalent

const newItem = document.createElement("li");
newItem.textContent = "Replaced item";
oldItem.replaceWith(newItem);

// Performance: build with DocumentFragment, append once
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const item = document.createElement("li");
  item.textContent = \`Item \${i}\`;
  fragment.appendChild(item);
}
list.appendChild(fragment); // single reflow instead of 100`,
        },
      ],
      list: {
        items: [
          "document.createElement(tag) creates a new element node",
          "appendChild / append add a node as the last child",
          "prepend adds a node as the first child",
          "insertBefore(newNode, reference) inserts before a specific sibling",
          "remove() detaches an element from its parent",
          "DocumentFragment batches insertions for better performance",
        ],
      },
    },
    {
      id: "event-listeners",
      heading: "Event Listeners and Event Types",
      level: 2,
      paragraphs: [
        "Events are how the browser tells your code that something happened — a click, a key press, a form submission, a page load. You register a function (an event listener) that runs when the event fires. The modern way is addEventListener, which accepts an event type, a callback, and an optional options object. Unlike the older on-event properties (onclick, onload), addEventListener lets you attach multiple handlers to the same element.",
        "The callback receives an Event object with details about what happened. For mouse and keyboard events, this includes the target element, coordinates, key codes, modifier keys, and methods to control propagation and default behavior.",
      ],
      code: [
        {
          language: "javascript",
          code: `const button = document.querySelector("#submit-btn");

// Add a click listener
button.addEventListener("click", function (event) {
  console.log("Button clicked!");
  console.log("Target element:", event.target);
  console.log("Mouse coords:", event.clientX, event.clientY);
});

// Multiple listeners on the same element
button.addEventListener("click", () => console.log("Handler 1"));
button.addEventListener("click", () => console.log("Handler 2"));

// Common event types
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully parsed");
});

window.addEventListener("resize", () => {
  console.log("Window resized to", window.innerWidth);
});

document.querySelector("#email").addEventListener("input", (e) => {
  console.log("User typed:", e.target.value);
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page reload
  console.log("Form submitted");
});

// Remove a listener (must reference the same function)
function handleClick() { console.log("Once"); }
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Once option — auto-remove after first fire
button.addEventListener("click", () => {
  console.log("This runs only once");
}, { once: true });`,
        },
      ],
      table: {
        headers: ["Event Category", "Examples", "When It Fires"],
        rows: [
          ["Mouse", "click, dblclick, mousedown, mouseup", "Mouse button activity on an element"],
          ["Keyboard", "keydown, keyup, keypress", "User presses or releases a key"],
          ["Form", "submit, change, input, focus, blur", "Form interaction and value changes"],
          ["Window", "load, resize, scroll, beforeunload", "Browser window lifecycle events"],
          ["Touch", "touchstart, touchmove, touchend", "Touchscreen interactions"],
        ],
      },
    },
    {
      id: "event-delegation-bubbling",
      heading: "Event Delegation and Bubbling",
      level: 2,
      paragraphs: [
        "When an event fires on an element, it first runs the handler on that element, then 'bubbles' up to its parent, grandparent, and so on up to document. This bubbling behavior lets you set up a single listener on a parent element that handles events from all of its children — a pattern called event delegation. It's perfect for lists, tables, or any container with many similar children, especially when children are added or removed dynamically.",
        "Event delegation has two big benefits: it uses less memory (one listener instead of many), and it automatically handles dynamically added children. To find out which child actually triggered the event, use event.target. If you need to stop bubbling, call event.stopPropagation() — but use this sparingly, as it can break other handlers.",
      ],
      code: [
        {
          language: "javascript",
          code: `<!-- HTML structure -->
<ul id="task-list">
  <li data-id="1">Task A <button class="delete">x</button></li>
  <li data-id="2">Task B <button class="delete">x</button></li>
  <li data-id="3">Task C <button class="delete">x</button></li>
</ul>`,
        },
        {
          language: "javascript",
          code: `// Instead of adding a listener to each <li> and <button>,
// add ONE listener to the parent <ul>
const list = document.getElementById("task-list");

list.addEventListener("click", (event) => {
  // event.target is the actual element that was clicked
  if (event.target.matches(".delete")) {
    const li = event.target.closest("li");
    const id = li.dataset.id;
    console.log(\`Deleting task \${id}\`);
    li.remove();
  } else if (event.target.tagName === "LI") {
    console.log("Clicked on task:", event.target.dataset.id);
  }
});

// Works for dynamically added items too!
const newTask = document.createElement("li");
newTask.dataset.id = "4";
newTask.innerHTML = 'Task D <button class="delete">x</button>';
list.appendChild(newTask);
// The new delete button is handled automatically.

// Stop bubbling when you really need to
document.querySelector("#inner").addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Only the inner handler runs");
});`,
        },
      ],
      callout: {
        type: "success",
        title: "Why Event Delegation Wins",
        content:
          "One listener on a parent handles all current and future children. It uses less memory, simplifies setup, and survives dynamic DOM changes. Use event.target.matches(selector) or event.target.closest(selector) to decide how to respond.",
      },
    },
  ],
  keyTakeaways: [
    "The DOM is a live tree of nodes that JavaScript can read and modify in real time",
    "querySelector and querySelectorAll accept any CSS selector and return static results",
    "Prefer textContent over innerHTML to avoid XSS vulnerabilities with user data",
    "addEventListener lets you attach multiple handlers — pass { once: true } to auto-remove",
    "Event delegation uses a single parent listener to handle events from many children, including future ones",
  ],
  exercises: [
    "Select all paragraph elements on a page and log their text content to the console",
    "Build a counter with + and - buttons that updates a number displayed on the page",
    "Create a dynamic list where the user can type an item into an input and add it via a button",
    "Implement event delegation on a list so clicking any item toggles a 'completed' class without adding listeners to each item",
  ],
  resources: [
    { label: "MDN — DOM Introduction", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" },
    { label: "MDN — Event Reference", url: "https://developer.mozilla.org/en-US/docs/Web/Events" },
    { label: "JavaScript.info — DOM Manipulation", url: "https://javascript.info/document" },
  ],
};
