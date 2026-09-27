"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { allDays } from "@/data/days";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  currentDay: number | null;
  completedDays: Set<number>;
  onSelectDay: (day: number) => void;
}

export function DocsSidebar({
  currentDay,
  completedDays,
  onSelectDay,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Course Outline
          </p>
          <p className="text-sm font-medium">
            {completedDays.size} / {allDays.length} days completed
          </p>
        </div>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="py-2 space-y-0.5">
          {allDays.map((day) => {
            const isCompleted = completedDays.has(day.day);
            const isCurrent = currentDay === day.day;
            return (
              <button
                key={day.day}
                onClick={() => onSelectDay(day.day)}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                  isCurrent
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "hover:bg-muted"
                )}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle
                      className={cn(
                        "h-4 w-4 text-muted-foreground/40",
                        isCurrent && "text-primary/60"
                      )}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-mono text-[10px] font-semibold uppercase tracking-wider",
                        isCurrent ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {day.date}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-medium leading-snug",
                      isCurrent ? "text-primary" : "text-foreground"
                    )}
                  >
                    {day.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {day.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            localStorage.removeItem("completed-days");
            window.dispatchEvent(new Event("completed-days-changed"));
          }}
        >
          Reset Progress
        </Button>
      </div>
    </div>
  );
}
