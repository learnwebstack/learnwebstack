# Full Stack Web Development — Complete Course Notes

A comprehensive, production-ready documentation website covering a 17-day full stack web development course. Built with Next.js 16, TypeScript, and Tailwind CSS.

![Course](https://img.shields.io/badge/Days-17-emerald)
![Sections](https://img.shields.io/badge/Sections-100+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

This is a structured, day-by-day documentation site for learning full stack web development — from HTML basics to deploying a full-stack application. Each day includes learning objectives, prerequisites, detailed content sections with code examples, key takeaways, practice exercises, and additional resources.

### Course Curriculum

| Track | Days | Topics |
|-------|------|--------|
| **Beginner** | 01–06 | HTML fundamentals, forms, CSS selectors, Flexbox, Grid, responsive design |
| **Intermediate** | 07–12 | JavaScript basics, control flow, DOM, ES6+, arrays/objects, async/await |
| **Advanced** | 13–17 | React components, state & props, hooks, routing, Node.js/Express deployment |

## Features

- **17 days of structured content** with 100+ sections
- **Full-text search** across all days, topics, and sections (⌘K)
- **Dark/Light mode** with system preference detection
- **Progress tracking** — mark days as complete, see your progress
- **Bookmarks** — save days for quick access
- **Favorite sections** — star individual sections for quick re-access
- **Reading time estimates** per day and per track
- **Study timer** — tracks time spent reading each day
- **Reading streak** — gamification for consecutive days visited
- **Table of contents** with section filter (press `/` to filter)
- **Copy link to section** — share direct links to any section
- **Syntax-highlighted code blocks** with copy & download
- **Print-friendly** day pages
- **SEO optimized** — JSON-LD structured data, sitemap, Open Graph image
- **Fully responsive** — mobile-first design with mobile floating navigation
- **Keyboard shortcuts** — ⌘K search, G+H home, G+←/→ prev/next day, J jump-to-day
- **Export/Import progress** — backup your progress as JSON
- **Custom SVG diagrams** for key concepts (client-server, box model, DOM tree, etc.)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State**: React hooks + localStorage
- **Fonts**: [Geist](https://vercel.com/font) (Sans + Mono)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17+ or [Bun](https://bun.sh/)
- A modern browser

### Installation

```bash
# Clone the repository
git clone https://github.com/akram6t/learnwebstack.git
cd learnwebstack

# Install dependencies
bun install
# or npm install

# Start the development server
bun run dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
bun run build
bun run start
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Home page (server component)
│   │   ├── globals.css         # Global styles + theme
│   │   └── sitemap.ts          # Dynamic sitemap
│   ├── components/
│   │   ├── docs/               # Documentation components
│   │   │   ├── home-page.tsx       # Landing page
│   │   │   ├── day-view.tsx        # Day detail view
│   │   │   ├── sidebar.tsx         # Course navigation sidebar
│   │   │   ├── code-block.tsx      # Syntax-highlighted code
│   │   │   ├── search-dialog.tsx   # Full-text search
│   │   │   ├── table-of-contents.tsx
│   │   │   ├── section-renderer.tsx
│   │   │   └── ...              # Other doc components
│   │   └── ui/                 # shadcn/ui components
│   ├── data/
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── days/               # 17 day content files
│   │       ├── day-01.ts ... day-17.ts
│   │       └── index.ts        # Aggregator + helpers
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities
├── public/
│   ├── images/days/            # SVG diagrams
│   ├── og-image.png            # Open Graph preview
│   └── robots.txt
└── prisma/                     # Prisma schema (if needed)
```

## Content Structure

Each day's content is defined in `src/data/days/day-XX.ts` as a typed `DayContent` object:

```typescript
interface DayContent {
  day: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  topics: string[];
  sections: ContentSection[];   // The main content
  keyTakeaways: string[];
  exercises: string[];
  resources: { label: string; url: string }[];
}
```

To add or modify content, edit the corresponding day file in `src/data/days/`.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open search |
| `⌘B` / `Ctrl+B` | Toggle dark/light theme |
| `J` | Jump to day (home page) |
| `/` | Filter table of contents (day pages) |
| `G` then `H` | Go to home page |
| `G` then `←` | Previous day |
| `G` then `→` | Next day |
| `Esc` | Close dialogs |

## Deployment

This site is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. The framework preset will auto-detect as Next.js
4. Deploy — no environment variables required

## License

MIT — free to use for learning and teaching.

## Links

- **Repository**: [github.com/akram6t/learnwebstack](https://github.com/akram6t/learnwebstack)
- **Live site**: [learnwebstack.vercel.app](https://learnwebstack.vercel.app)
