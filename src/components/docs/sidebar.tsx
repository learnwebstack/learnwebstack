"use client";

import * as React from "react";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  RotateCcw,
  Trophy,
  Flame,
  Download,
  Upload,
  Star,
} from "lucide-react";
import { allDays } from "@/data/days";
import type { DayContent } from "@/data/types";
import { cn } from "@/lib/utils";
import { downloadProgressJSON, importProgress } from "@/lib/progress-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

// Build a lookup of section ID → {day, heading} for favorite section display
const sectionLookup = new Map<string, { day: number; dayTitle: string; heading: string }>();
for (const day of allDays) {
  for (const section of day.sections) {
    sectionLookup.set(section.id, {
      day: day.day,
      dayTitle: day.title,
      heading: section.heading,
    });
  }
}

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
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  // Favorite sections
  const [favoriteSectionIds, setFavoriteSectionIds] = React.useState<string[]>([]);
  React.useEffect(() => {
    try {
      const favorites = JSON.parse(
        localStorage.getItem("favorite-sections") || "[]"
      ) as string[];
      setFavoriteSectionIds(favorites);
    } catch {
      /* noop */
    }
    const handler = () => {
      try {
        const favorites = JSON.parse(
          localStorage.getItem("favorite-sections") || "[]"
        ) as string[];
        setFavoriteSectionIds(favorites);
      } catch {
        /* noop */
      }
    };
    window.addEventListener("favorite-sections-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("favorite-sections-changed", handler);
      window.removeEventListener("storage", handler);
    };
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
        {/* Favorite sections panel */}
        {favoriteSectionIds.length > 0 && (
          <div className="mb-3 mt-2 rounded-lg border bg-amber-500/5 p-2.5">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Favorites
              </span>
              <span className="ml-auto rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                {favoriteSectionIds.length}
              </span>
            </div>
            <div className="space-y-0.5">
              {favoriteSectionIds.slice(0, 6).map((secId) => {
                const info = sectionLookup.get(secId);
                if (!info) return null;
                return (
                  <button
                    key={secId}
                    onClick={() => onSelectDay(info.day)}
                    className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-amber-500/10"
                  >
                    <Star className="h-3 w-3 shrink-0 fill-amber-500 text-amber-500" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium group-hover:text-primary">
                        {info.heading}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        Day {String(info.day).padStart(2, "0")} · {info.dayTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

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

      <div className="border-t p-3 space-y-2">
        {/* Export / Import buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground"
            onClick={() => {
              downloadProgressJSON();
              toast({
                title: "Progress exported!",
                description: "Your progress data has been downloaded as a JSON file.",
                duration: 3000,
              });
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3.5 w-3.5" />
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const text = await file.text();
                const result = importProgress(text);
                if (result.success) {
                  toast({
                    title: "Progress imported!",
                    description: `Restored ${result.count} data entries successfully.`,
                    duration: 4000,
                  });
                  // Dispatch all change events to refresh UI
                  window.dispatchEvent(new Event("completed-days-changed"));
                  window.dispatchEvent(new Event("bookmark-changed"));
                  window.dispatchEvent(new Event("recent-days-changed"));
                  window.dispatchEvent(new Event("favorite-sections-changed"));
                  // Reload streak
                  const allDates = JSON.parse(
                    localStorage.getItem("visit-dates") || "[]"
                  ) as string[];
                  const dateSet = new Set(allDates);
                  let streakCount = 0;
                  const checkDate = new Date();
                  while (dateSet.has(checkDate.toDateString())) {
                    streakCount++;
                    checkDate.setDate(checkDate.getDate() - 1);
                  }
                  setStreak(streakCount);
                } else {
                  toast({
                    title: "Import failed",
                    description: result.error || "Could not parse the file.",
                    duration: 4000,
                  });
                }
              } catch {
                toast({
                  title: "Import failed",
                  description: "Could not read the file.",
                  duration: 4000,
                });
              }
              // Reset input so the same file can be re-selected
              e.target.value = "";
            }}
          />
        </div>

        {/* Reset button */}
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
            // Remove all study-time entries
            for (let d = 1; d <= allDays.length; d++) {
              localStorage.removeItem(`study-time-day-${d}`);
            }
            localStorage.removeItem("recent-days");
            localStorage.removeItem("recent-days-timestamps");
            localStorage.removeItem("visit-dates");
            localStorage.removeItem("last-visit-date");
            localStorage.removeItem("favorite-sections");
            // Dispatch all change events so UI updates reactively
            window.dispatchEvent(new Event("completed-days-changed"));
            window.dispatchEvent(new Event("bookmark-changed"));
            window.dispatchEvent(new Event("recent-days-changed"));
            window.dispatchEvent(new Event("favorite-sections-changed"));
            setStreak(0);
            toast({
              title: "All data reset",
              description: "Your progress, bookmarks, and history have been cleared.",
              duration: 3000,
            });
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All Data
        </Button>
      </div>
    </div>
  );
}
