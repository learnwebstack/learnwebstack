import type { DayContent } from "../types";

export const day10: DayContent = {
  day: 10,
  slug: "day-10",
  title: "JavaScript ES6+ Features",
  subtitle: "Modern syntax that makes JavaScript cleaner, safer, and more expressive",
  date: "Day 10",
  duration: "3 hours",
  category: "JavaScript Fundamentals",
  tags: ["JavaScript", "ES6", "Modern JavaScript", "Destructuring", "Spread Operator"],
  description:
    "Explore the modern JavaScript features introduced since ES6 that have transformed how developers write code. Master let and const, template literals, destructuring, spread and rest operators, default parameters, Map and Set, optional chaining, and nullish coalescing — the building blocks of every contemporary JavaScript codebase.",
  learningObjectives: [
    "Use let, const, and template literals to write cleaner variable handling and string interpolation",
    "Destructure arrays and objects to extract values concisely",
    "Apply spread and rest operators to merge, copy, and collect values",
    "Use default parameters and enhanced object literals for terser function and object definitions",
    "Work with Map and Set, and leverage optional chaining and nullish coalescing for safer access",
  ],
  prerequisites: [
    "Completed Days 7–9 (JavaScript Basics, Control Flow, DOM Manipulation)",
    "Comfort with objects, arrays, and function syntax",
    "A modern browser or Node.js that supports ES6+",
  ],
  topics: [
    "let and const Revisited",
    "Template Literals",
    "Destructuring (Arrays & Objects)",
    "Spread and Rest Operators",
    "Default Parameters & Enhanced Object Literals",
    "Map and Set",
    "Optional Chaining & Nullish Coalescing",
  ],
  sections: [
    {
      id: "let-const-template-literals",
      heading: "let, const, and Template Literals",
      level: 2,
      paragraphs: [
        "ES6 introduced let and const as block-scoped alternatives to var. Default to const for values that won't be reassigned and use let only when reassignment is needed — this contract communicates intent and prevents accidental mutation. Both let and const respect block scope and the temporal dead zone, eliminating a whole class of bugs that var introduced.",
        "Template literals replace awkward string concatenation with backtick-delimited strings that support interpolation with ${}, multiline text without escape characters, and even tagged templates for advanced DSLs. They are now the default way most developers write strings that combine text and values.",
      ],
      code: [
        {
          language: "javascript",
          filename: "modern-strings.js",
          code: `// Template literals — backticks, interpolation, multiline
const name = "Ada";
const role = "admin";
const greeting = \`Hello, \${name}! You are an \${role}.\`;
console.log(greeting); // "Hello, Ada! You are an admin."

// Multiline strings — no \\n needed
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Role: \${role}</p>
  </div>
\`;

// Expressions inside \${}
const price = 19.99;
const tax = 0.08;
console.log(\`Total: $\${(price * (1 + tax)).toFixed(2)}\`);

// Tagged templates — function called with the literal
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? \`**\${values[i]}**\` : ""), "");
}
console.log(highlight\`User \${name} has role \${role}\`);
// "User **Ada** has role **admin**"`,
        },
      ],
      callout: {
        type: "tip",
        title: "Always Use Template Literals",
        content:
          "Reach for template literals whenever you need to combine strings and variables. They're more readable than + concatenation, support multiline, and the interpolation syntax ${...} makes intent obvious.",
      },
    },
    {
      id: "destructuring",
      heading: "Destructuring Arrays and Objects",
      level: 2,
      paragraphs: [
        "Destructuring is a shorthand syntax for unpacking values from arrays and properties from objects into distinct variables. It eliminates verbose manual assignments like const name = user.name; const age = user.age;. With a single line you can extract multiple values, rename them, and provide defaults — a feature used everywhere in modern codebases.",
        "Destructuring shines in function parameters: instead of accepting a config object and accessing its properties one by one, you destructure directly in the parameter list. This documents expected inputs at a glance and lets you set defaults per field.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Array destructuring
const [first, second, third] = [10, 20, 30];
console.log(first, second, third); // 10 20 30

// Skip elements
const [a, , c] = [1, 2, 3];
console.log(a, c); // 1 3

// Swap variables without a temp
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y); // 10 5

// Rest in destructuring
const [head, ...rest] = [1, 2, 3, 4];
console.log(head, rest); // 1 [2,3,4]

// Object destructuring
const user = { name: "Ada", age: 36, role: "admin" };
const { name, age } = user;
console.log(name, age); // "Ada" 36

// Rename while destructuring
const { name: fullName, role: accessLevel } = user;
console.log(fullName, accessLevel);

// Default values
const { theme = "light", fontSize = 16 } = { theme: "dark" };
console.log(theme, fontSize); // "dark" 16

// Destructure in function parameters
function createUser({ name, email, role = "member" }) {
  return { name, email, role };
}
const newUser = createUser({ name: "Grace", email: "grace@x.com" });
console.log(newUser); // { name: "Grace", email: "grace@x.com", role: "member" }

// Nested destructuring
const response = { data: { user: { name: "Linus" } } };
const { data: { user: { name: nestedName } } } = response;
console.log(nestedName); // "Linus"`,
        },
      ],
      callout: {
        type: "info",
        title: "Where Destructuring Shines",
        content:
          "Destructuring is the standard way to handle function parameters, API responses, and React component props. Mastering it dramatically reduces the amount of boilerplate in modern JavaScript code.",
      },
    },
    {
      id: "spread-rest-operators",
      heading: "Spread and Rest Operators",
      level: 2,
      paragraphs: [
        "The three-dot syntax (...) does two opposite things depending on context. When used in a call or array literal, it 'spreads' an iterable into individual elements. When used in a function parameter or destructuring pattern, it 'gathers' multiple elements into a single array. Together, spread and rest let you merge, copy, and collect values without writing loops.",
        "Spread is the canonical way to shallow-copy arrays and objects. Note the word 'shallow' — nested objects are still shared by reference. For deep copies you'll need structuredClone (modern) or a JSON round-trip (legacy).",
      ],
      code: [
        {
          language: "javascript",
          code: `// Spread in array literals
const nums = [1, 2, 3];
const more = [0, ...nums, 4]; // [0, 1, 2, 3, 4]

// Merge arrays
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b]; // [1, 2, 3, 4]

// Copy an array (shallow)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — unaffected

// Spread in function calls
const args = [3, 4];
Math.max(1, 2, ...args, 5); // 5

// Spread with objects — later props win
const defaults = { theme: "light", fontSize: 16, lang: "en" };
const userPrefs = { theme: "dark", fontSize: 20 };
const settings = { ...defaults, ...userPrefs };
// { theme: "dark", fontSize: 20, lang: "en" }

// Rest parameter — gather remaining args into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));      // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Combine named and rest
function log(tag, ...messages) {
  console.log(\`[\${tag}]\`, ...messages);
}
log("INFO", "Server started", "on port 3000");

// Rest in destructuring
const { name, ...rest } = { name: "Ada", age: 36, role: "admin" };
console.log(name, rest); // "Ada" { age: 36, role: "admin" }`,
        },
      ],
      callout: {
        type: "warning",
        title: "Spread Copies Are Shallow",
        content:
          "Spreading an object or array copies only the top-level values. Nested objects and arrays are still shared by reference. To truly clone nested data, use structuredClone(obj) or a library like lodash's cloneDeep.",
      },
    },
    {
      id: "default-params-enhanced-literals",
      heading: "Default Parameters & Enhanced Object Literals",
      level: 2,
      paragraphs: [
        "ES6 added default parameter values directly in function signatures, removing the need for verbose || fallbacks. Defaults are evaluated at call time, only when the argument is undefined — which means null and other falsy values are NOT replaced.",
        "Object literals were also enhanced with shorthand property names (omit the value when the key matches a local variable), method shorthand (omit the function keyword), and computed property names (use [expression] as a key). These tiny conveniences add up to noticeably cleaner code.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Default parameters
function createUser(name, role = "member", active = true) {
  return { name, role, active };
}
console.log(createUser("Ada"));
// { name: "Ada", role: "member", active: true }
console.log(createUser("Grace", "admin", false));

// Defaults only apply when argument is undefined — not null or false
function log(message = "No message") {
  console.log(message);
}
log(null);      // null (not "No message"!)
log(undefined); // "No message"

// Shorthand property names
const name = "Ada";
const age = 36;
const user = { name, age }; // equivalent to { name: name, age: age }

// Method shorthand
const counter = {
  count: 0,
  increment() { this.count++; },     // shorthand
  reset() { this.count = 0; },
};

// Computed property names
const fieldName = "score";
const player = {
  name: "Ada",
  [fieldName]: 100,         // dynamic key
  [\`latest_\${fieldName}\`]: 105,
};`,
        },
      ],
      list: {
        items: [
          "Default parameters apply only when the argument is undefined",
          "Shorthand properties omit the value when key matches a local variable",
          "Method shorthand drops the function keyword: { run() {} }",
          "Computed property names use [expression] for dynamic keys",
          "Defaults can reference earlier parameters: (a, b = a * 2) => ...",
        ],
      },
    },
    {
      id: "map-and-set",
      heading: "Map and Set",
      level: 2,
      paragraphs: [
        "Map and Set are specialized collections introduced to address limitations of plain objects and arrays. A Map is a key-value collection that allows any type of key (not just strings), remembers insertion order, and provides a clean API for adding, reading, and removing entries. A Set is a collection of unique values — perfect for deduplication and membership checks.",
        "Use a Map when you need ordered key-value pairs with non-string keys or frequent size checks. Use a Set when you need to track unique items. For most simple key-value cases where keys are strings, plain objects remain perfectly fine — don't reach for Map unless you actually need its features.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Set — collection of unique values
const uniqueTags = new Set();
uniqueTags.add("javascript");
uniqueTags.add("css");
uniqueTags.add("javascript"); // ignored — already present
console.log(uniqueTags.size); // 2
console.log(uniqueTags.has("css")); // true
uniqueTags.delete("css");
uniqueTags.forEach(tag => console.log(tag));

// Deduplicate an array
const nums = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(nums)]; // [1, 2, 3, 4]

// Map — key-value pairs with any key type
const userMap = new Map();
const objKey = { id: 1 };
userMap.set("name", "Ada");
userMap.set(objKey, { profile: "admin" });
userMap.set(42, "the answer");

console.log(userMap.get("name"));  // "Ada"
console.log(userMap.get(objKey));  // { profile: "admin" }
console.log(userMap.size);         // 3
console.log(userMap.has(42));      // true

// Iterate a Map (preserves insertion order)
for (const [key, value] of userMap) {
  console.log(key, "=>", value);
}

// Map from entries
const settings = new Map([
  ["theme", "dark"],
  ["fontSize", 18],
]);`,
        },
      ],
      table: {
        headers: ["Collection", "Keys / Values", "Use Case"],
        rows: [
          ["Object", "String / Symbol keys", "Simple string-keyed lookups, config"],
          ["Map", "Any key type, ordered", "Frequent add/remove, non-string keys"],
          ["Array", "Indexed 0..n", "Ordered list of values"],
          ["Set", "Unique values", "Deduplication, membership checks"],
          ["WeakMap", "Object keys, GC-friendly", "Private data attached to objects"],
        ],
      },
    },
    {
      id: "optional-chaining-nullish-coalescing",
      heading: "Optional Chaining & Nullish Coalescing",
      level: 2,
      paragraphs: [
        "Two of the most loved modern features are optional chaining (?.) and nullish coalescing (??). Optional chaining lets you safely access deeply nested properties without writing a chain of && checks — if any link in the chain is null or undefined, the whole expression short-circuits to undefined. Nullish coalescing provides a fallback only when the left side is null or undefined, unlike || which replaces any falsy value.",
        "Together these two operators eliminate huge amounts of defensive boilerplate. They are especially useful when consuming API responses whose shape may vary, or when working with configuration objects where optional fields are common.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Optional chaining — short-circuits to undefined
const user = {
  profile: {
    address: {
      city: "London"
    }
  }
};

// Old way — verbose, error-prone
const oldCity = user && user.profile && user.profile.address && user.profile.address.city;

// New way — concise, safe
const city = user?.profile?.address?.city;  // "London"
const zip = user?.profile?.address?.zip;    // undefined (no error!)

// Optional method call — only runs if method exists
const result = user.logout?.(); // safe even if logout is undefined

// Optional indexing
const arr = null;
const first = arr?.[0]; // undefined

// Nullish coalescing — fallback only for null/undefined
const fontSize = 0;
console.log(fontSize || 16);  // 16 (0 is falsy — wrong!)
console.log(fontSize ?? 16);  // 0  (0 is not nullish — correct!)

// Combining both for safe defaults
const response = {};
const displayName = response?.user?.name ?? "Anonymous";
console.log(displayName); // "Anonymous"

// Comparison of ?? vs ||
const count = "";
console.log(count || "default"); // "default" — empty string is falsy
console.log(count ?? "default"); // "" — empty string is not nullish`,
        },
      ],
      callout: {
        type: "success",
        title: "Why These Operators Matter",
        content:
          "Optional chaining and nullish coalescing are arguably the most impactful features added to JavaScript in years. They make code safer, more concise, and more honest about intent. Use them everywhere you read potentially-missing data.",
      },
    },
  ],
  keyTakeaways: [
    "Use template literals (backticks) for any string that combines text and expressions",
    "Destructuring unpacks values from arrays and objects — perfect for function parameters and API responses",
    "Spread (...) expands iterables; rest (...) collects arguments — same syntax, opposite roles",
    "Map and Set fill gaps that plain objects and arrays can't: ordered non-string keys and unique values",
    "Optional chaining (?.) and nullish coalescing (??) make safe data access terse and predictable",
  ],
  exercises: [
    "Rewrite a string concatenation using template literals, including a multiline HTML snippet",
    "Write a function that takes an object { name, age, role } using destructured parameters with defaults, then return an enhanced object literal",
    "Use spread to merge two config objects and rest to write a function that accepts any number of tags and dedupes them with a Set",
    "Safely access a nested API response like data?.user?.profile?.avatar using optional chaining, with a default placeholder via nullish coalescing",
  ],
  resources: [
    { label: "MDN — ES6 Features Overview", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources" },
    { label: "ES6 Features (GitHub)", url: "https://github.com/lukehoban/es6features" },
    { label: "JavaScript.info — Optional Chaining", url: "https://javascript.info/optional-chaining" },
  ],
};
