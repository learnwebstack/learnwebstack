"use client";

import * as React from "react";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Target,
  Zap,
  Search,
  Moon,
  Bookmark,
  GraduationCap,
  Layers,
  FileCode,
  CheckCircle2,
  Clock,
  Tag,
  Sparkles,
} from "lucide-react";
import { allDays, courseStats } from "@/data/days";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HomePageProps {
  completedDays: Set<number>;
  onSelectDay: (day: number) => void;
  onSearchOpen: () => void;
}

const categoryColors: Record<string, string> = {
  "HTML Fundamentals": "from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400",
  "HTML Advanced": "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400",
  "CSS Fundamentals": "from-sky-500/20 to-blue-500/20 text-sky-600 dark:text-sky-400",
  "CSS Layout": "from-cyan-500/20 to-teal-500/20 text-cyan-600 dark:text-cyan-400",
  "Responsive Design": "from-teal-500/20 to-emerald-500/20 text-teal-600 dark:text-teal-400",
  "CSS Advanced": "from-emerald-500/20 to-green-500/20 text-emerald-600 dark:text-emerald-400",
  "JavaScript Basics": "from-yellow-500/20 to-amber-500/20 text-yellow-600 dark:text-yellow-400",
  "JavaScript Control Flow": "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400",
  "JavaScript DOM": "from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400",
  "JavaScript ES6+": "from-lime-500/20 to-green-500/20 text-lime-600 dark:text-lime-400",
  "JavaScript Arrays & Objects": "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400",
  "Async JavaScript": "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400",
  "React Fundamentals": "from-cyan-500/20 to-sky-500/20 text-cyan-600 dark:text-cyan-400",
  "React State": "from-sky-500/20 to-blue-500/20 text-sky-600 dark:text-sky-400",
  "React Hooks": "from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400",
  "React Routing": "from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400",
  "Full Stack": "from-purple-500/20 to-fuchsia-500/20 text-purple-600 dark:text-purple-400",
};

export function HomePage({
  completedDays,
  onSelectDay,
  onSearchOpen,
}: HomePageProps) {
  const progress = Math.round((completedDays.size / allDays.length) * 100);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        {/* Background pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              {courseStats.totalDays}-Day Complete Course
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Full Stack Web
              <br />
              <span className="gradient-text">Development Notes</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A structured, day-by-day journey through modern web development.
              From your first HTML tag to deploying a full-stack application —
              {" "}{courseStats.totalSections}+ sections of curated notes, code
              examples, and hands-on exercises.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 px-6 text-base"
                onClick={() => onSelectDay(completedDays.size > 0 ? Math.min(...Array.from(completedDays).map(d => d + 1)) : 1)}
              >
                {completedDays.size > 0 ? "Continue Learning" : "Start Learning"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 px-6 text-base"
                onClick={onSearchOpen}
              >
                <Search className="h-4 w-4" />
                Search Content
              </Button>
            </div>

            {/* Progress bar (if started) */}
            {completedDays.size > 0 && (
              <div className="mx-auto mt-10 max-w-md">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">
                    {completedDays.size}/{allDays.length} days ({progress}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stats grid */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: BookOpen, label: "Days", value: courseStats.totalDays },
              { icon: Layers, label: "Sections", value: courseStats.totalSections },
              { icon: Target, label: "Topics", value: courseStats.totalTopics },
              { icon: FileCode, label: "Exercises", value: courseStats.totalExercises },
            ].map((stat, i) => (
              <Card key={i} className="p-5 text-center">
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Search,
                title: "Instant Search",
                desc: "Find any topic across all days",
              },
              {
                icon: Moon,
                title: "Dark Mode",
                desc: "Easy on the eyes, day or night",
              },
              {
                icon: Bookmark,
                title: "Bookmarks",
                desc: "Save days for quick access",
              },
              {
                icon: CheckCircle2,
                title: "Progress Tracking",
                desc: "Mark days as complete",
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-3 gap-1.5">
            <GraduationCap className="h-3 w-3" />
            Curriculum
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Day-by-Day Learning Path
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Each day builds on the previous one. Follow the path sequentially or
            jump to any topic you need.
          </p>
        </div>

        {/* Day cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allDays.map((day) => {
            const isCompleted = completedDays.has(day.day);
            const colorClass =
              categoryColors[day.category] ||
              "from-primary/20 to-chart-2/20 text-primary";
            // Derive a difficulty from the day number
            const difficulty =
              day.day <= 6 ? "Beginner" : day.day <= 12 ? "Intermediate" : "Advanced";
            const difficultyColor =
              difficulty === "Beginner"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : difficulty === "Intermediate"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400";

            return (
              <Card
                key={day.day}
                className="group relative flex cursor-pointer flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                onClick={() => onSelectDay(day.day)}
              >
                {/* Category color strip */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                    colorClass.split(" ")[0],
                    colorClass.split(" ")[1]
                  )}
                />

                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-mono text-base font-bold shadow-sm",
                      colorClass
                    )}
                  >
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        difficultyColor
                      )}
                    >
                      {difficulty}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>

                <h3 className="mt-4 font-semibold leading-snug transition-colors group-hover:text-primary">
                  {day.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {day.description}
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {day.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    {day.sections.length} sections
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {day.topics.length} topics
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {day.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1 border-t pt-3 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Read notes
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Categories overview */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3 gap-1.5">
              <Layers className="h-3 w-3" />
              Learning Tracks
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Four Core Areas
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              The course is organized into four progressive tracks that take you
              from beginner to job-ready full-stack developer.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Code2,
                title: "HTML & CSS",
                days: "Days 01–06",
                desc: "Structure and style modern web pages with semantic HTML, Flexbox, Grid, and responsive design.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Zap,
                title: "JavaScript",
                days: "Days 07–12",
                desc: "Master the language of the web — from basics to DOM manipulation, ES6+, and async programming.",
                color: "from-yellow-500 to-amber-500",
              },
              {
                icon: Layers,
                title: "React",
                days: "Days 13–16",
                desc: "Build dynamic UIs with components, hooks, state management, routing, and API integration.",
                color: "from-cyan-500 to-sky-500",
              },
              {
                icon: GraduationCap,
                title: "Full Stack",
                days: "Day 17",
                desc: "Deploy your first full-stack app with Node.js, Express, databases, and cloud hosting.",
                color: "from-purple-500 to-fuchsia-500",
              },
            ].map((track, i) => (
              <Card key={i} className="group relative overflow-hidden p-6">
                <div
                  className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                    track.color
                  )}
                >
                  <track.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  {track.days}
                </p>
                <h3 className="mt-1 text-lg font-bold">{track.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {track.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start building?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Dive into Day 01 and begin your journey to becoming a full-stack web
            developer. Every expert was once a beginner.
          </p>
          <Button
            size="lg"
            className="mt-6 h-12 gap-2 px-6 text-base"
            onClick={() => onSelectDay(1)}
          >
            Start with Day 01
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
