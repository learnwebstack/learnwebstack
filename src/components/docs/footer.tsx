import { BookOpen, Heart } from "lucide-react";
import { courseStats, allDays } from "@/data/days";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Full Stack Web Development</p>
                <p className="text-xs text-muted-foreground">
                  Complete Course Notes
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A comprehensive {courseStats.totalDays}-day journey through modern
              web development — from HTML basics to full-stack deployment.
              Structured, searchable, and built for learning.
            </p>
          </div>

          {/* Stats */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Course Stats
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Days</span>
                <span className="font-medium">{courseStats.totalDays}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Sections</span>
                <span className="font-medium">{courseStats.totalSections}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Topics</span>
                <span className="font-medium">{courseStats.totalTopics}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Exercises</span>
                <span className="font-medium">{courseStats.totalExercises}</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="?day=1"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Day 01 — HTML Basics
                </a>
              </li>
              <li>
                <a
                  href="?day=7"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Day 07 — JavaScript
                </a>
              </li>
              <li>
                <a
                  href="?day=13"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Day 13 — React Intro
                </a>
              </li>
              <li>
                <a
                  href="?day=17"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Day 17 — Deployment
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Full Stack Course Notes. Built with
            Next.js & Tailwind CSS.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> for
            learners
          </p>
        </div>
      </div>
    </footer>
  );
}
