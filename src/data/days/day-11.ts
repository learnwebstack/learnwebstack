import type { DayContent } from "../types";

export const day11: DayContent = {
  day: 11,
  slug: "day-11",
  title: "JavaScript Arrays & Objects Deep Dive",
  subtitle: "Mastering the data structures that power every JavaScript application",
  date: "Day 11",
  duration: "3 hours",
  category: "JavaScript Fundamentals",
  tags: ["JavaScript", "Arrays", "Objects", "Array Methods", "JSON"],
  description:
    "Arrays and objects are the workhorses of JavaScript. Go beyond the basics with array methods like map, filter, and reduce; learn to iterate and transform objects with Object.keys, values, and entries; distinguish shallow from deep copies; and use JSON to serialize data for storage and network transmission.",
  learningObjectives: [
    "Use map, filter, reduce, and other array methods to transform data functionally",
    "Find, test, and sort arrays with find, some, every, and sort",
    "Iterate object properties using Object.keys, values, and entries",
    "Tell shallow copies from deep copies and choose the right cloning strategy",
    "Serialize and parse data with JSON.stringify and JSON.parse",
  ],
  prerequisites: [
    "Completed Days 7–10 (JavaScript Basics through ES6+ Features)",
    "Comfort with arrow functions and destructuring",
    "Familiarity with objects, arrays, and loops",
  ],
  topics: [
    "Array Methods (map, filter, reduce)",
    "Find, Some, Every, and Sort",
    "Array Destructuring Revisited",
    "Object Methods (keys, values, entries)",
    "Shallow vs Deep Copy",
    "JSON Parse and Stringify",
  ],
  sections: [
    {
      id: "map-filter-reduce",
      heading: "Array Methods: map, filter, reduce",
      level: 2,
      paragraphs: [
        "Three array methods form the backbone of functional data transformation in JavaScript. map produces a new array by applying a function to each element — same length, transformed values. filter produces a new array containing only the elements that pass a test — same or shorter length. reduce folds the entire array into a single accumulated value, which can be a number, string, object, or even another array.",
        "These methods are pure and immutable: they don't change the original array. Chaining them together lets you express complex data pipelines in a declarative, readable way. Mastering this trio is one of the highest-leverage skills in modern JavaScript — they appear constantly in React, Node.js, and data-processing code.",
      ],
      code: [
        {
          language: "javascript",
          filename: "array-methods.js",
          code: `const products = [
  { id: 1, name: "Laptop", price: 999, inStock: true },
  { id: 2, name: "Phone",  price: 699, inStock: false },
  { id: 3, name: "Tablet", price: 449, inStock: true },
  { id: 4, name: "Monitor", price: 299, inStock: true },
];

// map — transform each element, return new array of same length
const names = products.map(p => p.name);
// ["Laptop", "Phone", "Tablet", "Monitor"]

const withDiscount = products.map(p => ({
  ...p,
  salePrice: Math.round(p.price * 0.9),
}));

// filter — keep elements that pass the test
const available = products.filter(p => p.inStock);
// [Laptop, Tablet, Monitor]

const affordable = products.filter(p => p.price < 500);
// [Tablet, Monitor]

// reduce — fold the array into a single value
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
// 2446

const byStock = products.reduce((acc, p) => {
  p.inStock ? acc.inStock.push(p) : acc.outOfStock.push(p);
  return acc;
}, { inStock: [], outOfStock: [] });

// Chaining — readable pipelines
const totalInStockValue = products
  .filter(p => p.inStock)
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);
// 999 + 449 + 299 = 1747`,
        },
      ],
      callout: {
        type: "tip",
        title: "Think in Pipelines",
        content:
          "When you see a for loop building an array, ask whether map, filter, or reduce would express it better. Pure method chains are easier to read, test, and parallelize than imperative loops with mutable accumulators.",
      },
    },
    {
      id: "find-some-every-sort",
      heading: "Find, Some, Every, and Sort",
      level: 2,
      paragraphs: [
        "Beyond map/filter/reduce, JavaScript offers a handful of array methods for searching and testing. find returns the first matching element (or undefined). findIndex returns its position. some tests whether at least one element passes. every tests whether all elements pass. forEach runs a function for each element but returns nothing — useful for side effects.",
        "sort mutates the array in place. By default it sorts as strings (so [10, 2, 1] becomes [1, 10, 2]!), which is rarely what you want for numbers. Always pass a comparator: (a, b) => a - b for ascending numbers, or b - a for descending. For objects, compare a specific property.",
      ],
      code: [
        {
          language: "javascript",
          code: `const users = [
  { id: 1, name: "Ada",    age: 36, active: true },
  { id: 2, name: "Grace",  age: 85, active: false },
  { id: 3, name: "Linus",  age: 54, active: true },
];

// find — first match or undefined
const firstActive = users.find(u => u.active);
// { id: 1, name: "Ada", age: 36, active: true }

// findIndex — position or -1
const graceIndex = users.findIndex(u => u.name === "Grace"); // 1

// some — does ANY element pass? (boolean)
const hasMinor = users.some(u => u.age < 18); // false

// every — do ALL elements pass? (boolean)
const allNamed = users.every(u => u.name.length > 0); // true

// forEach — side-effect only, returns undefined
users.forEach(u => console.log(u.name));

// sort — MUTATES the array, default is string sort (broken for numbers!)
const nums = [10, 2, 1, 30, 4];
nums.sort();                      // [1, 10, 2, 30, 4]  WRONG
nums.sort((a, b) => a - b);       // [1, 2, 4, 10, 30]  CORRECT
nums.sort((a, b) => b - a);       // descending: [30, 10, 4, 2, 1]

// sort objects by a property
const byAgeAsc = [...users].sort((a, b) => a.age - b.age);
const byNameDesc = [...users].sort((a, b) => b.name.localeCompare(a.name));
console.log(byAgeAsc.map(u => u.name)); // ["Ada","Linus","Grace"]`,
        },
      ],
      callout: {
        type: "warning",
        title: "sort Mutates!",
        content:
          "Array.prototype.sort sorts in place — it changes the original array. To avoid surprises, sort a copy: [...arr].sort(...) or arr.toSorted(...) (modern browsers). The same is true of reverse, splice, and sort.",
      },
    },
    {
      id: "array-destructuring-revisited",
      heading: "Array Destructuring Revisited",
      level: 2,
      paragraphs: [
        "Array destructuring is the cleanest way to pull values out of arrays — especially when combined with array methods that return arrays. Use it to swap variables, skip elements, capture the head and rest of an array, or extract multiple return values from a function.",
        "Combined with the spread operator, destructuring lets you write elegant one-liners like const [first, ...others] = arr. In function returns, returning an array and destructuring it at the call site is a common pattern for returning multiple values.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Basic destructuring
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements with empty slots
const [first, , third] = ["x", "y", "z"];
console.log(first, third); // "x" "z"

// Rest captures the remaining items
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail); // 1 [2, 3, 4]

// Default values
const [x = 10, y = 20] = [5];
console.log(x, y); // 5 20

// Swap variables without a temp
let left = "A", right = "B";
[left, right] = [right, left];
console.log(left, right); // "B" "A"

// Returning multiple values from a function
function stats(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = sum / nums.length;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  return [sum, avg, min, max];
}

const [sum, avg, min, max] = stats([3, 7, 2, 9]);
console.log({ sum, avg, min, max });

// Destructure with array methods
const [firstUser] = users;        // get first item
const [, secondUser] = users;     // get second item
const [oldest] = [...users].sort((a, b) => b.age - a.age);`,
        },
      ],
      list: {
        items: [
          "Skip array elements by leaving an empty slot: [a, , c]",
          "Capture the rest with [first, ...others]",
          "Provide defaults with [a = 10] = arr",
          "Swap without a temp: [a, b] = [b, a]",
          "Use with array methods: const [first] = arr",
        ],
      },
    },
    {
      id: "object-methods",
      heading: "Object Methods: keys, values, entries",
      level: 2,
      paragraphs: [
        "Unlike arrays, plain objects aren't iterable by default. The Object.keys, Object.values, and Object.entries methods bridge this gap by returning arrays of an object's keys, values, or key-value pairs. These are the standard way to loop over an object's properties — pair them with forEach, map, or for...of to transform object data.",
        "Each method returns an array, so you can immediately chain array methods. Remember that the order of keys follows integer-like keys first (in ascending order) followed by string keys in insertion order — a useful guarantee when building ordered maps.",
      ],
      code: [
        {
          language: "javascript",
          code: `const user = {
  name: "Ada",
  age: 36,
  role: "admin",
  active: true,
};

// Object.keys — array of property names
const keys = Object.keys(user);
// ["name", "age", "role", "active"]

// Object.values — array of property values
const values = Object.values(user);
// ["Ada", 36, "admin", true]

// Object.entries — array of [key, value] pairs
const entries = Object.entries(user);
// [["name","Ada"], ["age",36], ["role","admin"], ["active",true]]

// Iterate with forEach
Object.entries(user).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// Transform to a new object (Object.fromEntries)
const upper = Object.fromEntries(
  Object.entries(user).map(([k, v]) => [k, typeof v === "string" ? v.toUpperCase() : v])
);

// Count properties
console.log(Object.keys(user).length); // 4

// Check if an object has a property
console.log("name" in user);            // true
console.log(user.hasOwnProperty("age")); // true

// Practical example: build a query string
const params = { page: 2, limit: 20, sort: "desc" };
const query = Object.entries(params)
  .map(([k, v]) => \`\${encodeURIComponent(k)}=\${encodeURIComponent(v)}\`)
  .join("&");
// "page=2&limit=20&sort=desc"`,
        },
      ],
      callout: {
        type: "info",
        title: "Object.fromEntries",
        content:
          "Object.fromEntries is the inverse of Object.entries — it turns an array of [key, value] pairs back into an object. Combined, they let you map, filter, and transform objects as easily as arrays.",
      },
    },
    {
      id: "shallow-vs-deep-copy",
      heading: "Shallow vs Deep Copy",
      level: 2,
      paragraphs: [
        "Copying data in JavaScript comes in two flavors. A shallow copy duplicates the top-level container but nested objects are still shared by reference. A deep copy recursively duplicates every level, producing a fully independent clone. Spread (…), Object.assign, and Array.from all produce shallow copies.",
        "Choose the right strategy based on data shape. For flat objects, spread is fine. For nested structures you need a deep copy — use structuredClone (built into modern browsers and Node 17+), JSON parse/stringify (works for plain JSON-safe data only), or a library like lodash.cloneDeep. Be aware that JSON round-trips drop functions, Dates become strings, and undefined values disappear.",
      ],
      code: [
        {
          language: "javascript",
          code: `// SHALLOW copy — top level only, nested objects shared
const original = { name: "Ada", scores: [10, 20, 30] };
const shallow = { ...original };
shallow.name = "Grace";          // independent — original unchanged
shallow.scores.push(40);         // SHARED — original.scores also changes!
console.log(original.scores);    // [10, 20, 30, 40]

// Object.assign is also shallow
const assigned = Object.assign({}, original);

// DEEP copy — fully independent at every level

// Option 1: structuredClone (modern, recommended)
const obj = { user: { name: "Ada" }, tags: ["a", "b"], date: new Date() };
const deep1 = structuredClone(obj);
deep1.user.name = "Grace";
console.log(obj.user.name); // "Ada" — fully independent

// Option 2: JSON round-trip (works for plain JSON data only)
const deep2 = JSON.parse(JSON.stringify(obj));
// CAVEATS: drops functions, Dates become strings, undefined values vanish

// Option 3: manual deep clone for arrays of primitives
const nums = [1, 2, 3];
const numsCopy = [...nums]; // safe — primitives are copied by value

// Comparing copy methods
const data = {
  count: 5,
  items: [{ id: 1 }, { id: 2 }],
  createdAt: new Date(),
  greet() { return "hi"; },
};

const a = { ...data };                 // shallow — items shared
const b = structuredClone(data);       // deep — keeps Date, drops function
const c = JSON.parse(JSON.stringify(data)); // deep — Date becomes string, drops function`,
        },
      ],
      table: {
        headers: ["Method", "Depth", "Notes"],
        rows: [
          ["Spread {...obj}", "Shallow", "Nested objects shared by reference"],
          ["Object.assign", "Shallow", "Same as spread, older syntax"],
          ["JSON parse/stringify", "Deep", "Loses Dates, functions, undefined"],
          ["structuredClone", "Deep", "Modern, preserves Dates and most types"],
          ["lodash.cloneDeep", "Deep", "Library, handles edge cases thoroughly"],
        ],
      },
    },
    {
      id: "json-parse-stringify",
      heading: "JSON: parse and stringify",
      level: 2,
      paragraphs: [
        "JSON (JavaScript Object Notation) is the lingua franca of the web — a text-based data format that every major language can read and write. JavaScript provides two methods for working with it: JSON.stringify converts a JavaScript value to a JSON string, and JSON.parse converts a JSON string back into a JavaScript value. Every fetch response, localStorage entry, and API request body uses these methods.",
        "JSON supports strings, numbers, booleans, null, arrays, and plain objects. It does NOT support undefined, functions, Dates (become strings), Maps, Sets, or circular references. The stringify method accepts optional replacer and space arguments for filtering and pretty-printing.",
      ],
      code: [
        {
          language: "javascript",
          code: `// Stringify — convert JavaScript value to JSON string
const user = {
  name: "Ada",
  age: 36,
  roles: ["admin", "editor"],
  active: true,
  lastLogin: null,
};
const json = JSON.stringify(user);
// '{"name":"Ada","age":36,"roles":["admin","editor"],"active":true,"lastLogin":null}'

// Pretty-print with 2-space indentation
const pretty = JSON.stringify(user, null, 2);

// Replacer — filter or transform specific keys
const minimal = JSON.stringify(user, ["name", "age"], 2);
// {
//   "name": "Ada",
//   "age": 36
// }

// Custom replacer function
const safe = JSON.stringify(user, (key, value) => {
  if (key === "age") return undefined; // omit
  return value;
});

// Parse — convert JSON string back to JavaScript value
const parsed = JSON.parse(json);
console.log(parsed.name);      // "Ada"
console.log(parsed.roles[0]);  // "admin"

// Practical: save to localStorage
localStorage.setItem("user", JSON.stringify(user));
const stored = JSON.parse(localStorage.getItem("user"));

// Practical: send to an API
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(user),
});

// Gotchas
console.log(JSON.stringify({ x: undefined, y: function() {} }));
// '{}' — undefined and functions are silently dropped

console.log(JSON.stringify({ date: new Date() }));
// '{"date":"2024-01-15T00:00:00.000Z"}' — Date becomes a string

try {
  JSON.parse("{invalid json}");
} catch (err) {
  console.error("Parse error:", err.message);
}`,
        },
      ],
      callout: {
        type: "warning",
        title: "Always Wrap JSON.parse in try/catch",
        content:
          "JSON.parse throws on invalid input. When parsing data from localStorage, URLs, or external APIs, always wrap it in try/catch to prevent your whole app from crashing on malformed data.",
      },
    },
  ],
  keyTakeaways: [
    "map, filter, and reduce form the foundation of functional data transformation in JavaScript",
    "sort mutates in place — always pass a comparator and consider sorting a copy",
    "Object.keys, values, and entries let you iterate and transform objects like arrays",
    "Spread and Object.assign produce shallow copies; use structuredClone for deep copies",
    "JSON.stringify and JSON.parse are the standard ways to serialize data for storage and networks",
  ],
  exercises: [
    "Given an array of products, use filter and map to produce a list of in-stock product names",
    "Use reduce to group an array of users by their role into an object like { admin: [...], member: [...] }",
    "Write a deep-clone utility that handles nested objects using structuredClone and falls back to JSON for unsupported types",
    "Build a function that saves a user object to localStorage as JSON and reads it back with proper try/catch error handling",
  ],
  resources: [
    { label: "MDN — Array Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
    { label: "MDN — Object Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" },
    { label: "MDN — JSON", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" },
  ],
};
