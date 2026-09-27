"use client";

import * as React from "react";
import {
  Clock,
  Tag,
  Target,
  CheckCircle2,
  ListChecks,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ListTodo,
  Printer,
} from "lucide-react";
import type { DayContent } from "@/data/types";
import { getAdjacentDays } from "@/data/days";
import { SectionRenderer } from "./section-renderer";
import { TableOfContents } from "./table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DayViewProps {
  day: DayContent;
  completedDays: Set<number>;
  onToggleComplete: (day: number) => void;
  onNavigate: (day: number) => void;
  onBackHome: () => void;
}

export function DayView({
  day,
  completedDays,
  onToggleComplete,
  onNavigate,
  onBackHome,
}: DayViewProps) {
  const { previous, next } = getAdjacentDays(day.day);
  const isCompleted = completedDays.has(day.day);
  const [bookmarked, setBookmarked] = React.useState(false);

  // Estimate reading time from content word count (~200 wpm)
  const readingTime = React.useMemo(() => {
    let wordCount = day.description.split(/\s+/).length;
    for (const section of day.sections) {
      for (const p of section.paragraphs || []) {
        wordCount += p.split(/\s+/).length;
      }
      for (const c of section.code || []) {
        wordCount += c.code.split(/\s+/).length * 0.5; // code reads slower
      }
    }
    const minutes = Math.max(1, Math.round(wordCount / 200));
    return minutes;
  }, [day]);

  const difficulty =
    day.day <= 6 ? "Beginner" : day.day <= 12 ? "Intermediate" : "Advanced";
  const difficultyColor =
    difficulty === "Beginner"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : difficulty === "Intermediate"
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";

  React.useEffect(() => {
    const stored = localStorage.getItem(`bookmark-day-${day.day}`);
    setBookmarked(stored === "true");
  }, [day.day]);

  const toggleBookmark = () => {
    const newVal = !bookmarked;
    setBookmarked(newVal);
    localStorage.setItem(`bookmark-day-${day.day}`, String(newVal));
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [day.day]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={onBackHome}
          className="hover:text-foreground transition-colors"
        >
          Course
        </button>
        <span>/</span>
        <span className="font-mono text-xs">{day.date}</span>
        <span>/</span>
        <span className="text-foreground truncate">{day.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px] xl:grid-cols-[1fr_260px]">
        {/* Main content */}
        <div className="min-w-0">
          {/* Day header */}
          <header className="mb-8 border-b pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary" className="font-mono text-xs">
                {day.date}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {day.category}
              </Badge>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  difficultyColor
                )}
              >
                {difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {day.duration}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                {readingTime} min read
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {day.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{day.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {day.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={isCompleted ? "default" : "outline"}
                onClick={() => onToggleComplete(day.day)}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isCompleted ? "Completed" : "Mark as Complete"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleBookmark}
              >
                {bookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => window.print()}
                data-print-hidden
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </header>

          {/* Description */}
          <div className="mb-8 rounded-xl bg-muted/40 p-5">
            <p className="text-base leading-relaxed text-foreground">
              {day.description}
            </p>
          </div>

          {/* Learning objectives & Prerequisites */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Learning Objectives</h3>
              </div>
              <ul className="space-y-2">
                {day.learningObjectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                    {obj}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Prerequisites</h3>
              </div>
              <ul className="space-y-2">
                {day.prerequisites.map((pre, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    {pre}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Topics overview */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Topics Covered</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {day.topics.map((topic, i) => (
                <span
                  key={i}
                  className="rounded-lg border bg-card px-3 py-1.5 text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Content sections */}
          <div className="prose-doc max-w-none">
            {day.sections.map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
          </div>

          {/* Key takeaways */}
          <div className="my-10 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Key Takeaways</h3>
            </div>
            <ul className="space-y-2">
              {day.keyTakeaways.map((takeaway, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

          {/* Exercises */}
          <div className="my-10">
            <div className="mb-4 flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Practice Exercises</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {day.exercises.map((exercise, i) => (
                <Card key={i} className="p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exercise}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="my-10">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Additional Resources</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {day.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-primary hover:shadow-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                  {resource.label}
                </a>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation */}
          <nav className="mt-12 grid gap-4 border-t pt-6 sm:grid-cols-2">
            {previous ? (
              <button
                onClick={() => onNavigate(previous.day)}
                className="group flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {previous.date}
                </span>
                <span className="font-medium group-hover:text-primary">
                  {previous.title}
                </span>
              </button>
            ) : (
              <div />
            )}
            {next ? (
              <button
                onClick={() => onNavigate(next.day)}
                className="group flex flex-col items-end gap-1 rounded-xl border p-4 text-right transition-all hover:border-primary hover:shadow-sm"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {next.date}
                </span>
                <span className="font-medium group-hover:text-primary">
                  {next.title}
                </span>
              </button>
            ) : (
              <div />
            )}
          </nav>
        </div>

        {/* Table of contents sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents sections={day.sections} />
          </div>
        </aside>
      </div>
    </div>
  );
}
