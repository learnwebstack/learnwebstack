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
  Share2,
  Check,
  PartyPopper,
  Trophy,
} from "lucide-react";
import type { DayContent } from "@/data/types";
import { getAdjacentDays, allDays } from "@/data/days";
import { SectionRenderer } from "./section-renderer";
import { TableOfContents } from "./table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
  const [shared, setShared] = React.useState(false);
  const { toast } = useToast();

  const handleToggleComplete = () => {
    const willComplete = !isCompleted;
    onToggleComplete(day.day);
    if (willComplete) {
      const completedCount = completedDays.size + 1;
      const isAllDone = completedCount === allDays.length;
      toast({
        title: isAllDone ? "Course Complete! 🎉" : "Day marked complete!",
        description: isAllDone
          ? `Congratulations! You've completed all ${allDays.length} days of the Full Stack Web Development course.`
          : `Great progress! ${completedCount} of ${allDays.length} days completed (${Math.round(
              (completedCount / allDays.length) * 100
            )}%).`,
        duration: 5000,
      });
    }
  };

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
    window.dispatchEvent(new Event("bookmark-changed"));
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `${day.date} — ${day.title}`,
      text: day.subtitle,
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // User cancelled or clipboard failed — try clipboard fallback
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        /* noop */
      }
    }
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
            <h1 className="day-title text-3xl font-bold tracking-tight sm:text-4xl">
              {day.title}
            </h1>
            <p className="day-description mt-3 text-lg text-muted-foreground">{day.subtitle}</p>
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
                onClick={handleToggleComplete}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <PartyPopper className="h-4 w-4" />
                )}
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
              <Button
                size="sm"
                variant="ghost"
                onClick={handleShare}
                data-print-hidden
              >
                {shared ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share
                  </>
                )}
              </Button>
            </div>
          </header>

          {/* Description */}
          <div className="mb-8 rounded-xl border-l-4 border-primary/40 bg-muted/30 p-5">
            <p className="text-base leading-relaxed text-foreground">
              {day.description}
            </p>
          </div>

          {/* Learning objectives & Prerequisites */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-5 transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-3.5 w-3.5 text-primary" />
                </div>
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
            <Card className="p-5 transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </div>
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
          <div className="my-10 overflow-hidden rounded-xl border-l-4 border-primary bg-gradient-to-br from-primary/5 to-chart-2/5 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Key Takeaways</h3>
            </div>
            <ul className="space-y-3">
              {day.keyTakeaways.map((takeaway, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 text-xs font-bold text-primary-foreground shadow-sm">
                    {i + 1}
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exercises */}
          <div className="my-10">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <ListTodo className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Practice Exercises</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {day.exercises.map((exercise, i) => (
                <Card
                  key={i}
                  className="group p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Additional Resources</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {day.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ExternalLink className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <span className="min-w-0 flex-1 truncate group-hover:text-primary">
                    {resource.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation */}
          <nav className="mt-12 grid gap-4 border-t pt-6 sm:grid-cols-2">
            {previous ? (
              <button
                onClick={() => onNavigate(previous.day)}
                className="group flex flex-col items-start gap-1 rounded-xl border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" /> Previous Day
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {previous.date}
                </span>
                <span className="font-medium group-hover:text-primary line-clamp-2">
                  {previous.title}
                </span>
              </button>
            ) : (
              <div />
            )}
            {next ? (
              <button
                onClick={() => onNavigate(next.day)}
                className="group flex flex-col items-end gap-1 rounded-xl border bg-card p-5 text-right transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  Next Day <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
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
