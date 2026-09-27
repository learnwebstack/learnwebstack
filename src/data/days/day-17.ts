import type { DayContent } from "../types";

export const day17: DayContent = {
  day: 17,
  slug: "day-17",
  title: "Node.js, Express & Full Stack Deployment",
  subtitle: "Building a REST API with Node and Express, then shipping it to the web",
  date: "Day 17",
  duration: "4 hours",
  category: "Backend & Deployment",
  tags: ["Node.js", "Express", "REST API", "MongoDB", "Deployment"],
  description:
    "Cross over to the server side. Learn what Node.js is and why JavaScript on the backend is powerful, build a REST API with Express, connect it to a database, secure secrets with environment variables, and deploy the whole stack to Vercel or Netlify.",
  learningObjectives: [
    "Explain what Node.js is and how the npm ecosystem works",
    "Create an Express server with routes for a REST API",
    "Apply middleware for parsing, logging, CORS, and error handling",
    "Implement full CRUD operations backed by MongoDB or SQLite",
    "Use environment variables and deploy a full-stack app to the web",
  ],
  prerequisites: [
    "Strong JavaScript: async/await, Promises, ES modules",
    "Understanding of HTTP verbs (GET, POST, PUT, DELETE) and status codes",
    "Familiarity with REST and JSON — covered on Days 16 & 11",
  ],
  topics: [
    "What is Node.js",
    "npm Basics",
    "Express.js Server Setup",
    "REST API Routes",
    "Middleware",
    "CRUD Operations",
    "Connecting to a Database (MongoDB/SQLite)",
    "Environment Variables",
    "Deployment Overview (Vercel, Netlify)",
  ],
  sections: [
    {
      id: "what-is-node",
      heading: "What is Node.js?",
      level: 2,
      paragraphs: [
        "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript outside the browser — on servers, in CLIs, in build tools, and even on embedded devices. Released in 2009, it removed the boundary between front-end and back-end JavaScript and let teams use a single language across the whole stack.",
        "Node's defining feature is its event-driven, non-blocking I/O model. Instead of waiting for a database query or HTTP request to finish, Node fires off the operation and registers a callback, then moves on to serve other requests. This makes Node exceptionally efficient for I/O-heavy workloads such as APIs, real-time apps, and streaming — though it is less suited for CPU-bound tasks like video encoding, which block the single main thread.",
      ],
      callout: {
        type: "info",
        title: "Node vs. the browser",
        content:
          "Both run JavaScript, but Node has no DOM, no window, and no fetch (until Node 18+) built in. Instead it gives you the file system, network, child processes, and a rich standard library. The global object is `global`, not `window`.",
      },
      list: {
        items: [
          "Single-threaded event loop — handles thousands of concurrent connections with one thread",
          "Non-blocking I/O — async by default, ideal for APIs and real-time apps",
          "npm — the largest package registry in the world, with over 2 million packages",
          "Same language on front and back — share types, validation, and even code between client and server",
        ],
      },
    },
    {
      id: "npm-basics",
      heading: "npm Basics",
      level: 2,
      paragraphs: [
        "npm (Node Package Manager) is the default package manager bundled with Node. It lets you install third-party packages from the npm registry, manage project metadata in package.json, and run scripts. A package.json file lists your dependencies, dev dependencies, and scripts — it is the single source of truth for what your project needs to run.",
        "Install dependencies with `npm install <package>` (saves to dependencies), `npm install -D <package>` (saves to devDependencies), or `npm install -g <package>` (global CLI tool). The lockfile (package-lock.json) pins exact versions so installs are reproducible across machines and CI. Run scripts defined in package.json with `npm run <script>` — `npm start`, `npm test`, and `npm run dev` are common conventions.",
      ],
      code: [
        {
          language: "bash",
          filename: "Terminal",
          code: `# Initialise a new Node project
npm init -y

# Install runtime dependencies
npm install express mongoose cors dotenv

# Install dev-only dependencies (not shipped to production)
npm install -D nodemon typescript @types/express @types/node

# Run the dev script (e.g. nodemon with auto-reload)
npm run dev

# Add a script to package.json:
# "scripts": { "dev": "nodemon src/index.ts", "start": "node dist/index.js" }`,
        },
        {
          language: "json",
          filename: "package.json",
          code: `{
  "name": "notes-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.5.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.0",
    "nodemon": "^3.1.4",
    "tsx": "^4.16.0",
    "typescript": "^5.5.0"
  }
}`,
        },
      ],
      callout: {
        type: "tip",
        title: "Use a fast runtime too",
        content:
          "Beyond Node, modern alternatives like Bun and Deno run the same JavaScript/TypeScript with faster startup, built-in tooling, and native TypeScript support. The Express API below works the same on all three.",
      },
    },
    {
      id: "express-server-setup",
      heading: "Express.js Server Setup",
      level: 2,
      paragraphs: [
        "Express is the most popular minimalist web framework for Node. It provides a thin layer of routing and middleware on top of Node's built-in http module without imposing an architecture, which is why it's used everywhere from tiny APIs to huge platforms. An Express app is essentially a chain of middleware functions that each see the request and decide whether to handle it or pass it on.",
        "Setting up an Express server takes just a few lines: import express, create an app, register middleware and routes, then call app.listen on a port. In production the port comes from the environment so the host (Vercel, Render, Railway) can assign one dynamically.",
      ],
      code: [
        {
          language: "ts",
          filename: "src/index.ts",
          code: `import express from "express";
import cors from "cors";
import "dotenv/config";

import notesRouter from "./routes/notes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Built-in + third-party middleware
app.use(cors());                       // allow cross-origin requests
app.use(express.json());               // parse JSON bodies into req.body
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Routes
app.use("/api/notes", notesRouter);

// 404 handler for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        },
      ],
      callout: {
        type: "warning",
        title: "Order matters",
        content:
          "Express runs middleware in the order they are registered. Put express.json() before your routes, route handlers before the 404 fallback, and the error handler last. Mis-ordering is the #1 source of 'my route returns 404' bugs.",
      },
    },
    {
      id: "rest-routes-middleware-crud",
      heading: "REST Routes, Middleware & CRUD",
      level: 2,
      paragraphs: [
        "A REST API maps HTTP verbs to operations on resources: GET to read, POST to create, PUT/PATCH to update, DELETE to remove. Express's app.get/post/put/delete (and the router equivalents) bind a handler to a method+path combination. Route parameters (/:id) capture values from the URL into req.params.",
        "Middleware is a function with the signature (req, res, next). It can read and modify the request and response, end the cycle by sending a response, or call next() to pass control to the next handler. Middleware is how you parse bodies, log requests, authenticate users, validate input, and handle errors — all without cluttering your route handlers.",
      ],
      code: [
        {
          language: "ts",
          filename: "src/routes/notes.ts",
          code: `import { Router } from "express";
import { Note } from "../models/Note.js";

const router = Router();

// GET /api/notes — list all notes
router.get("/", async (_req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// GET /api/notes/:id — fetch one
router.get("/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// POST /api/notes — create
router.post("/", async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title) return res.status(400).json({ error: "title is required" });
    const note = await Note.create({ title, body });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// PUT /api/notes/:id — update
router.put("/:id", async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/notes/:id — remove
router.delete("/:id", async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;`,
        },
        {
          language: "ts",
          filename: "src/middleware/errorHandler.ts",
          code: `import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  res.status(500).json({
    error: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
  });
}`,
        },
      ],
      table: {
        headers: ["HTTP Verb", "Route", "Purpose", "Status on success"],
        rows: [
          ["GET", "/api/notes", "List all notes", "200"],
          ["GET", "/api/notes/:id", "Fetch one note", "200 / 404"],
          ["POST", "/api/notes", "Create a new note", "201"],
          ["PUT", "/api/notes/:id", "Replace a note", "200 / 404"],
          ["DELETE", "/api/notes/:id", "Remove a note", "204 / 404"],
        ],
      },
    },
    {
      id: "connecting-to-database",
      heading: "Connecting to a Database (MongoDB / SQLite)",
      level: 2,
      paragraphs: [
        "Most APIs need to persist data between requests. MongoDB — a NoSQL document database — pairs naturally with Node because documents are JSON-like objects. Mongoose is the most popular ODM (Object-Document Mapper) for MongoDB in the Node world; it gives you schemas, validation, and a promise-based query API.",
        "For smaller projects or serverless functions where a hosted Mongo cluster is overkill, SQLite is an excellent choice. It's a single-file, zero-config, transactional SQL database that runs anywhere Node runs. The better-sqlite3 driver is synchronous, fast, and perfect for low-traffic sites and local development.",
      ],
      code: [
        {
          language: "ts",
          filename: "src/models/Note.ts (MongoDB + Mongoose)",
          code: `import mongoose, { Schema, type InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body:  { type: String, default: "" },
    tags:  { type: [String], default: [] },
  },
  { timestamps: true }
);

export type Note = InferSchemaType<typeof noteSchema>;
export const Note = mongoose.model("Note", noteSchema);

// Connect once at startup — put this in src/db.ts and import it from index.ts
import "dotenv/config";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}`,
        },
        {
          language: "ts",
          filename: "src/db.ts (SQLite + better-sqlite3)",
          code: `import Database from "better-sqlite3";

const db = new Database(process.env.DB_PATH ?? "data.db");

// Create the table on startup if it doesn't exist
db.exec(\`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
\`);

export default db;

// Usage in a route:
// const notes = db.prepare("SELECT * FROM notes ORDER BY created_at DESC").all();
// const note = db.prepare("INSERT INTO notes (title, body) VALUES (?, ?)").get(title, body);`,
        },
      ],
      callout: {
        type: "note",
        title: "Pick the right database",
        content:
          "Use SQLite for prototypes, tutorials, and low-traffic apps — it's a single file and needs no server. Use MongoDB (or Postgres) when you expect scale, concurrent writes, or a managed cloud database. The Express routes above don't care which one you pick.",
      },
    },
    {
      id: "env-vars-deployment",
      heading: "Environment Variables & Deployment",
      level: 2,
      paragraphs: [
        "Configuration that differs between environments — database URLs, API keys, JWT secrets, the port the server listens on — must never be hardcoded or committed to git. The standard solution is environment variables, read in Node via process.env. The dotenv package loads a local .env file into process.env during development so you can keep secrets out of code.",
        "Once your API runs locally, deployment is about getting it onto a server that's always reachable. Vercel and Netlify are popular for full-stack JavaScript apps because they handle builds, HTTPS, custom domains, and global CDN distribution for free on small projects. Both support serverless functions (each route becomes a function) and integrate with Git so every push deploys automatically.",
      ],
      code: [
        {
          language: "bash",
          filename: ".env.example",
          code: `# Copy to .env and fill in real values. NEVER commit the real .env.
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/notes
# or, for SQLite:
DB_PATH=./data.db

# Auth
JWT_SECRET=replace-with-a-long-random-string
CLIENT_ORIGIN=http://localhost:5173`,
        },
      ],
      list: {
        ordered: true,
        items: [
          "Push your code to GitHub with .env in .gitignore and a .env.example committed for reference",
          "On Vercel: import the repo, set framework preset to 'Next.js' or 'Other', and add each env var in the project settings",
          "On Netlify: connect the repo, set the build command (npm run build) and publish directory, then add env vars under Site settings → Environment variables",
          "Configure a managed database — MongoDB Atlas (free tier), Neon, or Supabase — and copy its connection string into the env vars",
          "Deploy, watch the build logs, then hit https://your-app.vercel.app/health to verify",
        ],
      },
      callout: {
        type: "warning",
        title: "Serverless caveats",
        content:
          "On Vercel/Netlify functions, each request may run in a fresh instance — long-lived connections (websockets, in-memory caches) and persistent background jobs don't work. Connect to the database inside each handler and use external queues (e.g. Inngest, Upstash QStash) for scheduled work. After deployment you have a real, public, HTTPS-secured full-stack app — add a custom domain and error monitoring (Sentry) to go fully production-ready.",
      },
    },
  ],
  keyTakeaways: [
    "Node.js runs JavaScript on the server with a non-blocking, event-driven I/O model — ideal for APIs and real-time apps",
    "npm manages dependencies via package.json; devDependencies stay out of production, and the lockfile keeps installs reproducible",
    "Express is a chain of middleware; order matters — body parsers first, routes next, 404 fallback after, error handler last",
    "REST maps HTTP verbs to CRUD operations; route parameters capture URL values and next() passes control along the chain",
    "Pick the database that fits the workload — SQLite for small/serverless, MongoDB or Postgres for scale — and abstract access behind models",
    "Never hardcode secrets — use environment variables loaded by dotenv, and never commit .env to git",
    "Vercel and Netlify turn a Git repo into a deployed, HTTPS-secured full-stack app in minutes via serverless functions",
  ],
  exercises: [
    "Create a new Node project, install Express and cors, and serve a JSON health-check endpoint on port 4000",
    "Build a full CRUD API for a 'tasks' resource with title, completed, and createdAt fields, including 404 and error handlers",
    "Connect your API to MongoDB Atlas (or SQLite) and verify that create/read/update/delete survive a server restart",
    "Deploy the API to Vercel or Render with all secrets in environment variables, then call it from your React app built on Day 16",
  ],
  resources: [
    { label: "Node.js Official Docs", url: "https://nodejs.org/docs/latest/api/" },
    { label: "Express.js", url: "https://expressjs.com/" },
    { label: "Mongoose", url: "https://mongoosejs.com/docs/" },
    { label: "Vercel Deployment Guide", url: "https://vercel.com/docs/getting-started" },
  ],
};
