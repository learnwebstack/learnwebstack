"use client";

import * as React from "react";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  RotateCcw,
  Trophy,
  Flame,
} from "lucide-react";
import { allDays } from "@/data/days";
import type { DayContent } from "@/data/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  currentDay: number | null;
  completedDays: Set<number>;
  onSelectDay: (day: number) => void;
}

// Track grouping by broad category
function getTrack(category: string): string {
  if (category.includes("HTML")) return "HTML & CSS";
  if (category.includes("CSS") || category.includes("Responsive") || category.includes("Advanced CSS"))
    return "HTML & CSS";
  if (category.includes("JavaScript") || category.includes("Async"))
    return "JavaScript";
  if (category.includes("React")) return "React";
  return "Full Stack";
}

const trackOrder = ["HTML & CSS", "JavaScript", "React", "Full Stack"];

export function DocsSidebar({
  currentDay,
  completedDays,
  onSelectDay,
}: SidebarProps) {
  const progress = Math.round((completedDays.size / allDays.length) * 100);

  // Reading streak: consecutive days the user has visited the site
  const [streak, setStreak] = React.useState(0);
  React.useEffect(() => {
    try {
      const today = new Date();
      const todayStr = today.toDateString();
      const lastVisit = localStorage.getItem("last-visit-date");
      const visitDates: string[] = JSON.parse(
        localStorage.getItem("visit-dates") || "[]"
      );
      // Only record today if not already recorded
      if (lastVisit !== todayStr) {
        visitDates.push(todayStr);
        // Keep only last 30 days
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 30);
        const filtered = visitDates.filter(
          (d) => new Date(d) >= cutoff
        );
        localStorage.setItem("visit-dates", JSON.stringify(filtered));
        localStorage.setItem("last-visit-date", todayStr);
      }
      // Calculate streak from visit-dates
      const allDates = JSON.parse(
        localStorage.getItem("visit-dates") || "[]"
      ) as string[];
      const dateSet = new Set(allDates);
      let streakCount = 0;
      const checkDate = new Date();
      // Walk backwards from today
      while (dateSet.has(checkDate.toDateString())) {
        streakCount++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
      setStreak(streakCount);
    } catch {
      /* noop */
    }
  }, []);

  // Group days by track
  const grouped = React.useMemo(() => {
    const map = new Map<string, DayContent[]>();
    for (const day of allDays) {
      const track = getTrack(day.category);
      if (!map.has(track)) map.set(track, []);
      map.get(track)!.push(day);
    }
    return trackOrder
      .filter((t) => map.has(t))
      .map((track) => ({ track, days: map.get(track)! }));
  }, []);

  // Default: expand the group containing the current day, collapse others
  const currentTrack = currentDay
    ? getTrack(allDays.find((d) => d.day === currentDay)?.category || "")
    : null;
  const [openGroups, setOpenGroups] = React.useState<Set<string>>(
    new Set(currentTrack ? [currentTrack] : ["HTML & CSS"])
  );

  // Re-expand when current day changes
  React.useEffect(() => {
    if (currentTrack) {
      setOpenGroups((prev) => new Set([...prev, currentTrack]));
    }
  }, [currentTrack]);

  const toggleGroup = (track: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(track)) next.delete(track);
      else next.add(track);
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Progress header */}
      <div className="border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Progress
              </p>
              <p className="text-sm font-semibold">
                {completedDays.size} / {allDays.length} days
              </p>
            </div>
          </div>
          <span className="text-lg font-bold text-primary">{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Reading streak */}
        {streak > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-3 py-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-medium text-foreground">
              {streak}-day streak
            </span>
            <span className="ml-auto text-[10px] text-muted-foreground">
              {streak >= 7 ? "🔥 On fire!" : streak >= 3 ? "Keep going!" : "Nice start!"}
            </span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="py-2 space-y-1">
          {grouped.map(({ track, days }) => {
            const isOpen = openGroups.has(track);
            const completedInTrack = days.filter((d) =>
              completedDays.has(d.day)
            ).length;
            return (
              <Collapsible
                key={track}
                open={isOpen}
                onOpenChange={() => toggleGroup(track)}
              >
                <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted transition-colors">
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      !isOpen && "-rotate-90"
                    )}
                  />
                  <span className="flex-1 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                    {track}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {completedInTrack}/{days.length}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-0.5 space-y-0.5 pl-2">
                    {days.map((day) => {
                      const isCompleted = completedDays.has(day.day);
                      const isCurrent = currentDay === day.day;
                      return (
                        <button
                          key={day.day}
                          onClick={() => onSelectDay(day.day)}
                          className={cn(
                            "group flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-all",
                            isCurrent
                              ? "bg-primary/10 ring-1 ring-primary/20"
                              : "hover:bg-muted"
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            ) : (
                              <Circle
                                className={cn(
                                  "h-4 w-4 text-muted-foreground/30",
                                  isCurrent && "text-primary/50"
                                )}
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span
                              className={cn(
                                "font-mono text-[10px] font-semibold uppercase tracking-wider",
                                isCurrent
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              )}
                            >
                              {day.date}
                            </span>
                            <p
                              className={cn(
                                "mt-0.5 text-sm font-medium leading-snug",
                                isCurrent
                                  ? "text-primary"
                                  : "text-foreground"
                              )}
                            >
                              {day.title}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-muted-foreground"
          onClick={() => {
            localStorage.removeItem("completed-days");
            // Remove all bookmark entries
            for (let d = 1; d <= allDays.length; d++) {
              localStorage.removeItem(`bookmark-day-${d}`);
            }
            localStorage.removeItem("recent-days");
            localStorage.removeItem("recent-days-timestamps");
            localStorage.removeItem("visit-dates");
            localStorage.removeItem("last-visit-date");
            // Dispatch all change events so UI updates reactively
            window.dispatchEvent(new Event("completed-days-changed"));
            window.dispatchEvent(new Event("bookmark-changed"));
            window.dispatchEvent(new Event("recent-days-changed"));
            setStreak(0);
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All Data
        </Button>
      </div>
    </div>
  );
}
