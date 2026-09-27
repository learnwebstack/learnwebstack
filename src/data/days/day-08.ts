import type { DayContent } from "../types";

export const day08: DayContent = {
  day: 8,
  slug: "day-08",
  title: "JavaScript Control Flow & Functions",
  subtitle: "Making decisions, repeating work, and packaging logic into reusable functions",
  date: "Day 08",
  duration: "3 hours",
  category: "JavaScript Fundamentals",
  tags: ["JavaScript", "Control Flow", "Functions", "Scope", "Hoisting"],
  description:
    "Learn how to direct the flow of your programs with conditionals and loops, then organize logic into reusable functions. Understand the differences between function declarations, expressions, and arrow functions, plus scope rules and hoisting behavior that every JavaScript developer must know.",
  learningObjectives: [
    "Use if/else, switch, and ternary operators to make decisions in code",
    "Iterate with for, while, for...of, and for...in loops and know when to use each",
    "Declare functions three ways and pick the right one for the situation",
    "Work with parameters, arguments, default values, and return values",
    "Explain global, function, and block scope along with hoisting behavior",
  ],
  prerequisites: [
    "Completed Day 7 (JavaScript Basics: Variables, Data Types & Operators)",
    "Comfort with declaring variables and using basic operators",
    "A browser DevTools console for experimentation",
  ],
  topics: [
    "Conditionals: if/else, switch, ternary",
    "Loops: for, while, for...of, for...in",
    "Function Declarations vs Expressions",
    "Arrow Functions",
    "Parameters, Arguments, and Return Values",
    "Scope (Global, Function, Block)",
    "Hoisting",
  ],
  sections: [
    {
      id: "conditionals",
      heading: "Conditionals: if/else, switch, and Ternary",
      level: 2,
      paragraphs: [
        "Conditionals let your program make decisions. The if/else statement is the workhorse: it evaluates an expression and runs a block of code if the expression is truthy. Multiple branches can be chained with else if. For multi-way branching on a single value, switch is often cleaner, and for simple either/or expressions the ternary operator (? :) packs the logic into one line.",
        "Switch statements compare a value against cases using strict equality (===). Don't forget the break keyword at the end of each case, otherwise execution 'falls through' to the next case — which is sometimes intentional, but usually a bug. The default case runs when no other case matches.",
      ],
      code: [
        {
          language: "javascript",
          filename: "conditionals.js",
          code: `// if / else if / else
const score = 82;
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}
console.log(\`Grade: \${grade}\`); // "Grade: B"

// switch statement
const day = "Monday";
switch (day) {
  case "Saturday":
  case "Sunday":            // fall-through — both weekend days
    console.log("Weekend!");
    break;
  case "Monday":
    console.log("Start of the work week");
    break;
  default:
    console.log("Midweek day");
}

// Ternary operator — concise if/else expression
const age = 17;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "minor"

// Nested ternary (use sparingly — readability suffers)
const message = age >= 18
  ? "Welcome aboard"
  : age >= 13
    ? "Teen access"
    : "Kids only";`,
        },
      ],
      callout: {
        type: "tip",
        title: "When to Use What",
        content:
          "Use if/else for ranges and complex conditions, switch for equality checks against many discrete values, and the ternary operator only for simple value selection — never for running side effects.",
      },
    },
    {
      id: "loops",
      heading: "Loops: for, while, for...of, and for...in",
      level: 2,
      paragraphs: [
        "Loops repeat a block of code. The classic for loop is best when you know how many times to iterate — it bundles initialization, condition, and increment into one line. The while loop runs as long as a condition is true and is ideal when the iteration count depends on runtime state.",
        "Modern JavaScript adds two specialized loops: for...of iterates over the values of any iterable (arrays, strings, sets, maps), and for...in iterates over the keys of an object. Use for...of for arrays — never for...in, which also enumerates inherited properties and can produce unexpected order.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Classic for loop
for (let i = 0; i < 5; i++) {
  console.log(\`Iteration \${i}\`);
}

// while loop — condition checked before each iteration
let count = 3;
while (count > 0) {
  console.log(\`Countdown: \${count}\`);
  count--;
}

// do...while — body runs at least once
let n = 0;
do {
  console.log("Runs at least once");
  n++;
} while (n < 0);

// for...of — iterate values (arrays, strings, etc.)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// for...in — iterate object keys
const user = { name: "Ada", role: "admin", active: true };
for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}

// break and continue
for (let i = 0; i < 10; i++) {
  if (i === 5) break;       // exit the loop entirely
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i);            // 1, 3
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Don't Use for...in on Arrays",
        content:
          "for...in iterates over enumerable keys, including inherited ones, and does not guarantee numeric order for arrays. Use for...of, forEach, or a classic for loop when iterating over array values.",
      },
    },
    {
      id: "function-declarations-vs-expressions",
      heading: "Function Declarations vs Expressions",
      level: 2,
      paragraphs: [
        "A function is a reusable block of code that can take inputs (parameters), perform work, and return a result. JavaScript lets you define functions two main ways: as a declaration (a statement starting with the function keyword) or as an expression (assigning an anonymous function to a variable). The difference matters because of hoisting — declarations are hoisted to the top of their scope and can be called before they appear in the code, while expressions are not.",
        "Function declarations are useful when you want a top-level utility that can be referenced anywhere in its scope. Function expressions shine when you want to pass a function as an argument, store it in a data structure, or limit it to a single variable binding.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Function declaration — hoisted, callable before definition
console.log(greet("Ada")); // "Hello, Ada!"
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function expression — not hoisted
const sayGoodbye = function (name) {
  return \`Goodbye, \${name}!\`;
};
console.log(sayGoodbye("Grace"));

// Named function expression (useful for stack traces)
const factorial = function compute(n) {
  return n <= 1 ? 1 : n * compute(n - 1);
};
console.log(factorial(5)); // 120

// Passing functions as arguments (callbacks)
const numbers = [1, 2, 3];
numbers.forEach(function (num) {
  console.log(num * 2);
});`,
        },
      ],
      callout: {
        type: "note",
        title: "Hoisting Difference",
        content:
          "Function declarations are fully hoisted — both name and body. Function expressions are hoisted only as the variable (let/const) they're assigned to, which stays in the temporal dead zone until the line of assignment runs.",
      },
    },
    {
      id: "arrow-functions",
      heading: "Arrow Functions",
      level: 2,
      paragraphs: [
        "Arrow functions, introduced in ES6, provide a concise syntax for writing function expressions. Beyond being shorter, they have one critical behavioral difference: they don't bind their own this. Instead, they inherit this from the surrounding lexical scope. This makes them perfect for callbacks and array methods, but problematic for object methods or constructors that rely on dynamic this binding.",
        "Arrow functions have several syntax shortcuts. With a single parameter you can omit the parentheses; with an expression body you can omit the return keyword and braces; with no parameters you must use empty parentheses.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Traditional function expression
const add = function (a, b) {
  return a + b;
};

// Arrow function — equivalent
const addArrow = (a, b) => {
  return a + b;
};

// Concise body — implicit return
const addShort = (a, b) => a + b;

// Single parameter — parens optional
const square = x => x * x;

// No parameters — parens required
const greet = () => "Hello!";

// Returning an object literal needs parentheses
const makeUser = (name, age) => ({ name, age });

// Arrow functions shine with array methods
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
const evens = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(doubled, evens, sum); // [2,4,6,8] [2,4] 10

// this is inherited from the surrounding scope
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++; // 'this' refers to the Timer instance
    console.log(this.seconds);
  }, 1000);
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Arrow Functions and this",
        content:
          "Arrow functions don't have their own this. Avoid using them as object methods or constructor functions when you need this to refer to the object being created or called.",
      },
    },
    {
      id: "parameters-arguments-returns",
      heading: "Parameters, Arguments, and Return Values",
      level: 2,
      paragraphs: [
        "Parameters are the named variables declared in a function's signature; arguments are the actual values passed when the function is called. JavaScript is flexible: you can pass fewer or more arguments than declared, and missing ones become undefined. Default parameters let you specify fallback values, while the rest parameter (...args) collects any extra arguments into a real array.",
        "Every function call returns a value — either the value after a return statement, or undefined if the function ends without one. Functions that always return a value (and avoid side effects) are easier to test and reason about, a style favored in functional programming.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Default parameters
function greet(name = "guest", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}
console.log(greet());                 // "Hello, guest!"
console.log(greet("Ada"));            // "Hello, Ada!"
console.log(greet("Ada", "Welcome")); // "Welcome, Ada!"

// Rest parameters — collect remaining arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mixing named and rest parameters
function introduce(title, ...names) {
  return \`\${title}: \${names.join(", ")}\`;
}
console.log(introduce("Team", "Ada", "Grace", "Linus"));

// Early return pattern — cleaner than nested if/else
function classifyAge(age) {
  if (age < 0) return "invalid";
  if (age < 13) return "child";
  if (age < 20) return "teen";
  if (age < 65) return "adult";
  return "senior";
}`,
        },
      ],
      list: {
        items: [
          "Parameters are declared in the function signature",
          "Arguments are the values actually passed at call time",
          "Extra arguments are ignored; missing ones become undefined",
          "Default parameters provide fallbacks when an argument is omitted or undefined",
          "Rest parameters (...args) gather all remaining arguments into a true array",
        ],
      },
    },
    {
      id: "scope-and-hoisting",
      heading: "Scope and Hoisting",
      level: 2,
      paragraphs: [
        "Scope determines where a variable is visible in your code. JavaScript has three scopes: global (visible everywhere), function (visible inside a function), and block (visible inside a { } pair). Variables declared with let and const are block-scoped, while var is function-scoped — meaning it leaks out of if blocks and loops.",
        "Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code executes. var declarations are hoisted and initialized as undefined, which is why accessing them before the declaration line returns undefined instead of an error. let and const are also hoisted but kept in the 'temporal dead zone' — accessing them before the declaration throws a ReferenceError.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Global scope
const globalVar = "I am global";

function demo() {
  // Function scope
  var functionVar = "I am function-scoped";
  if (true) {
    // Block scope
    let blockVar = "I am block-scoped";
    var leaksOut = "I escape the block (var ignores blocks)";
    console.log(globalVar, blockVar); // both visible
  }
  console.log(leaksOut); // visible — var ignores block
  // console.log(blockVar); // ReferenceError — block-scoped
}

// Hoisting with var
console.log(hoisted); // undefined (not an error!)
var hoisted = "now I have a value";

// Temporal dead zone with let/const
// console.log(notYet); // ReferenceError: Cannot access 'notYet' before initialization
let notYet = "safe";

// Function declarations are hoisted with their body
console.log(callEarly()); // "I work!"
function callEarly() { return "I work!"; }

// Function expressions are NOT hoisted with their body
// console.log(callLate()); // TypeError: callLate is not a function
const callLate = function () { return "I don't work"; };`,
        },
      ],
      callout: {
        type: "info",
        title: "Temporal Dead Zone",
        content:
          "let and const variables exist in the temporal dead zone (TDZ) from the start of their block until the declaration line is reached. Accessing them in this window throws a ReferenceError, which is safer than var's silent undefined behavior.",
      },
    },
  ],
  keyTakeaways: [
    "Use if/else for ranges, switch for discrete values, and ternary only for simple value selection",
    "Prefer for...of for arrays and for...in for object keys — never use for...in on arrays",
    "Function declarations are hoisted with their body; function expressions are not",
    "Arrow functions inherit this from their surrounding scope, making them ideal for callbacks",
    "let and const are block-scoped and live in the temporal dead zone until their declaration line",
  ],
  exercises: [
    "Write a function that classifies a number as positive, negative, or zero using if/else, then rewrite it using a ternary",
    "Build a switch statement that returns the day name (full and abbreviated) for a number 0–6",
    "Create a rest-parameter function that accepts any number of prices and returns the total with 8% tax",
    "Demonstrate hoisting by writing a function that calls another function defined later in the file — make it work both with a declaration and break it with an expression",
  ],
  resources: [
    { label: "MDN — Control Flow", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" },
    { label: "MDN — Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
    { label: "JavaScript.info — Hoisting", url: "https://javascript.info/closure" },
  ],
};
