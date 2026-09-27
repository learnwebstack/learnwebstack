import type { DayContent } from "../types";

export const day07: DayContent = {
  day: 7,
  slug: "day-07",
  title: "JavaScript Basics: Variables, Data Types & Operators",
  subtitle: "The language of the web — variables, types, and the operators that bring pages to life",
  date: "Day 07",
  duration: "3 hours",
  category: "JavaScript Fundamentals",
  tags: ["JavaScript", "Variables", "Data Types", "Operators", "Type Coercion"],
  description:
    "Dive into JavaScript, the programming language of the web. Learn how to store data with variables, work with primitive data types, manipulate values with operators, understand type coercion, and use the console to inspect your code as it runs.",
  learningObjectives: [
    "Understand what JavaScript is and how it runs in the browser",
    "Declare variables using var, let, and const and know when to use each",
    "Identify and work with all seven primitive data types",
    "Use arithmetic, comparison, logical, and assignment operators correctly",
    "Explain type coercion and use the console for debugging",
  ],
  prerequisites: [
    "Completed Days 1–6 (HTML, CSS foundations)",
    "A modern browser with DevTools (Chrome or Firefox)",
    "VS Code with the JavaScript language features enabled",
  ],
  topics: [
    "Introduction to JavaScript",
    "Variables: var, let, const",
    "Primitive Data Types",
    "Operators (Arithmetic, Comparison, Logical, Assignment)",
    "Type Coercion and Equality",
    "Console Methods and Debugging",
  ],
  sections: [
    {
      id: "javascript-introduction",
      heading: "Introduction to JavaScript",
      level: 2,
      paragraphs: [
        "JavaScript is a high-level, interpreted programming language that, alongside HTML and CSS, forms the foundation of the modern web. While HTML provides structure and CSS handles presentation, JavaScript adds interactivity and logic — from validating forms and animating elements to fetching data from servers and building full single-page applications.",
        "Created by Brendan Eich in 1995 in just ten days, JavaScript has grown from a simple browser scripting language into one of the most popular programming languages in the world. Today it runs not only in browsers but also on servers (via Node.js), in mobile apps, and even on embedded devices. The standardized version of the language is called ECMAScript, with yearly updates that continually add new features.",
      ],
      callout: {
        type: "info",
        title: "JavaScript vs Java",
        content:
          "Despite the similar name, JavaScript and Java are completely different languages designed for different purposes. The name was a marketing decision in 1995 to ride the popularity of Java — don't let it confuse you.",
      },
      list: {
        items: [
          "Client-side: runs in the browser to manipulate the DOM and react to user actions",
          "Server-side: runs on Node.js to handle APIs, databases, and file operations",
          "Single-threaded with an event loop, enabling non-blocking asynchronous behavior",
          "Dynamically typed — variable types are determined at runtime",
        ],
      },
    },
    {
      id: "variables-var-let-const",
      heading: "Variables: var, let, and const",
      level: 2,
      paragraphs: [
        "Variables are named containers for storing data. JavaScript offers three ways to declare them: var (the old way), let (modern, reassignable), and const (modern, cannot be reassigned). The choice between let and const is one of the most important habits you can build — default to const and only switch to let when you must reassign.",
        "The differences matter most when it comes to scope and reassignment. let and const are block-scoped, meaning they exist only within the nearest pair of curly braces. var, by contrast, is function-scoped and its declarations are hoisted to the top of the function, which can cause subtle bugs. Modern code should almost never use var.",
      ],
      code: [
        {
          language: "javascript",
          filename: "variables.js",
          code: `// const: a binding that cannot be reassigned
const PI = 3.14159;
const greeting = "Hello, world!";
// PI = 3; // TypeError: Assignment to constant variable.

// let: a reassignable block-scoped variable
let score = 0;
score = score + 10;
score += 5; // score is now 15

// var: legacy, function-scoped — avoid in modern code
var legacy = "I am hoisted";

// Block scope with let and const
{
  let blockScoped = "only visible inside this block";
  const alsoScoped = true;
}
// console.log(blockScoped); // ReferenceError

// const objects can have their contents mutated
const user = { name: "Ada" };
user.name = "Grace"; // works — we're mutating, not reassigning
// user = { name: "Grace" }; // TypeError`,
        },
      ],
      callout: {
        type: "tip",
        title: "Best Practice",
        content:
          "Always start with const. Only change to let when you genuinely need to reassign the variable (counters, accumulators, swaps). This makes your intent clear and prevents accidental reassignment bugs.",
      },
    },
    {
      id: "primitive-data-types",
      heading: "Primitive Data Types",
      level: 2,
      paragraphs: [
        "JavaScript defines seven primitive data types: string, number, boolean, null, undefined, symbol, and bigint. Primitives are immutable — when you 'change' a primitive, you're actually creating a new value. Everything that isn't a primitive is an Object (including arrays and functions).",
        "Understanding each type helps you reason about memory, comparisons, and debugging output. The typeof operator returns a string describing a value's type, though it has two famous quirks: typeof null returns \"object\" (a legacy bug), and typeof of a function returns \"function\".",
      ],
      table: {
        headers: ["Type", "Example", "Description"],
        rows: [
          ["string", "\"hello\", 'world'", "Text wrapped in quotes"],
          ["number", "42, 3.14, -7, NaN", "Integers and floats (one type)"],
          ["boolean", "true, false", "Logical true/false values"],
          ["null", "null", "Intentional absence of value"],
          ["undefined", "undefined", "Variable declared but not assigned"],
          ["symbol", "Symbol(\"id\")", "Unique, immutable identifier"],
          ["bigint", "9007199254740993n", "Arbitrarily large integers"],
        ],
      },
      code: [
        {
          language: "javascript",
          code: `const text = "JavaScript";       // string
const count = 42;              // number
const price = 19.99;           // number (no separate float type)
const isActive = true;         // boolean
const nothing = null;          // null (intentional empty)
let notAssigned;               // undefined
const id = Symbol("user-id");  // symbol
const huge = 12345678901234567890n; // bigint

console.log(typeof text);      // "string"
console.log(typeof count);     // "number"
console.log(typeof nothing);   // "object"  (historical bug, kept for compatibility)
console.log(typeof notAssigned); // "undefined"

// Numbers have special values
console.log(0 / 0);            // NaN
console.log(typeof NaN);       // "number"
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991`,
        },
      ],
    },
    {
      id: "operators",
      heading: "Operators: Arithmetic, Comparison, Logical, Assignment",
      level: 2,
      paragraphs: [
        "Operators are symbols that perform operations on values. JavaScript groups them into categories: arithmetic (+, -, *, /, %, **), comparison (==, ===, !=, !==, <, >, <=, >=), logical (&&, ||, !), and assignment (=, +=, -=, *=, /=, etc.). Mastering operators is essential because almost every line of JavaScript uses one.",
        "The single most important operator distinction in JavaScript is == versus ===. The loose equality operator == coerces operands to the same type before comparing, leading to surprising results like 0 == \"\" being true. The strict equality operator === compares both value and type with no coercion, and is the one you should almost always use.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Arithmetic operators
const sum = 7 + 3;        // 10
const diff = 7 - 3;       // 4
const product = 7 * 3;    // 21
const quotient = 7 / 2;   // 3.5 (no integer division)
const remainder = 7 % 3;  // 1
const power = 2 ** 10;    // 1024

// Comparison operators
console.log(5 === 5);     // true  (strict equality — recommended)
console.log(5 === "5");   // false (different types)
console.log(5 == "5");    // true  (loose equality — coercion!)
console.log(5 !== "5");   // true  (strict inequality)
console.log(5 > 3);       // true

// Logical operators
const isAdmin = true;
const isLoggedIn = false;
console.log(isAdmin && isLoggedIn); // false (both must be true)
console.log(isAdmin || isLoggedIn); // true  (at least one true)
console.log(!isLoggedIn);           // true  (negation)

// Assignment operators
let total = 10;
total += 5;  // 15
total -= 3;  // 12
total *= 2;  // 24
total /= 4;  // 6
total %= 4;  // 2`,
        },
      ],
      callout: {
        type: "warning",
        title: "Always Use Strict Equality",
        content:
          "Avoid == and !=. They perform type coercion, producing surprising results like 0 == false == \"\" being true. Use === and !== everywhere — they compare both value and type, making your code predictable and bug-free.",
      },
    },
    {
      id: "type-coercion",
      heading: "Type Coercion and Equality",
      level: 2,
      paragraphs: [
        "Type coercion is JavaScript's automatic conversion of values from one type to another. It can be explicit (you call Number(\"42\")) or implicit (the engine converts for you when you write \"5\" - 2). Implicit coercion is convenient but also the source of countless bugs, so it's worth understanding exactly how it works.",
        "The rules differ between arithmetic and string contexts. The + operator prefers strings — if either operand is a string, the other is converted to a string and concatenated. The other arithmetic operators (-, *, /) prefer numbers and convert both operands. When in doubt, convert explicitly with String(), Number(), or Boolean().",
      ],
      code: [
        {
          language: "javascript",
          code: `// Implicit coercion — be careful!
console.log("5" + 3);   // "53"  (string concatenation)
console.log("5" - 3);   // 2     (numeric subtraction)
console.log("5" * "2"); // 10
console.log("five" * 2); // NaN — not a number

// Truthy and falsy values
const falsy = [false, 0, "", null, undefined, NaN];
const truthy = ["hello", 1, [], {}, -1, "false"];

if ("hello") console.log("Non-empty string is truthy");
if (0) console.log("This will NOT run — 0 is falsy");

// Explicit conversion
console.log(Number("42"));     // 42
console.log(String(42));       // "42"
console.log(Boolean(0));       // false
console.log(parseInt("42px")); // 42
console.log(parseFloat("3.14")); // 3.14`,
        },
      ],
      list: {
        items: [
          "Falsy values: false, 0, \"\", null, undefined, NaN",
          "Everything else is truthy, including \"0\", \"false\", [], and {}",
          "Use Boolean(value) or !!value to convert to boolean explicitly",
          "Strict equality (===) avoids coercion entirely",
        ],
      },
    },
    {
      id: "console-methods",
      heading: "Console Methods and Debugging",
      level: 2,
      paragraphs: [
        "The console object is your window into running JavaScript. While console.log is the most famous method, the console offers many specialized tools that make debugging easier — from grouping output with console.group to measuring performance with console.time.",
        "Get in the habit of using the right console method for the job. Use console.error for errors, console.warn for warnings, console.table for arrays of objects, and console.dir to inspect an object's properties. Combined with browser DevTools, these methods turn the console into a powerful debugging environment.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Basic logging
console.log("Hello, world!");
console.log("User:", { name: "Ada", age: 36 });

// Categorize output by severity
console.info("Informational message");
console.warn("This is a warning");
console.error("Something went wrong!");

// Pretty-print tabular data
const users = [
  { id: 1, name: "Ada", role: "admin" },
  { id: 2, name: "Grace", role: "editor" },
];
console.table(users);

// Group related logs
console.group("User details");
console.log("Name: Ada");
console.log("Role: admin");
console.groupEnd();

// Time operations
console.time("loop");
for (let i = 0; i < 1000000; i++) { /* spin */ }
console.timeEnd("loop"); // loop: 2.3ms

// Inspect object properties
console.dir(document.body);`,
        },
      ],
      callout: {
        type: "success",
        title: "Pro Tip",
        content:
          "In Chrome DevTools, you can right-click any console.log output and select 'Save as global variable' to create a reference (temp1, temp2...) that you can inspect further in the console.",
      },
    },
  ],
  keyTakeaways: [
    "JavaScript is a high-level, dynamically typed language that powers interactivity on the web",
    "Use const by default and let only when reassignment is needed — avoid var entirely",
    "JavaScript has seven primitive types: string, number, boolean, null, undefined, symbol, and bigint",
    "Always prefer === over == to avoid unexpected type coercion bugs",
    "The console object offers specialized methods (warn, error, table, group) far beyond console.log",
  ],
  exercises: [
    "Declare variables for a user profile (name, age, isAdmin) using const where possible and log them to the console",
    "Write a script that calculates the area of a circle given a radius, using const PI = 3.14159",
    "Demonstrate type coercion by predicting the output of 10 + \"5\", \"10\" - 5, and true + 1 before running them",
    "Create an array of three product objects and use console.table to display them, then use console.time to measure sorting 10000 random numbers",
  ],
  resources: [
    { label: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    { label: "JavaScript.info — Variables", url: "https://javascript.info/variables" },
    { label: "You Don't Know JS Yet (book series)", url: "https://github.com/getify/You-Dont-Know-JS" },
  ],
};
