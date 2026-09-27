"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAdjacentDays } from "@/data/days";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  currentDay: number;
  onNavigate: (day: number) => void;
}

export function MobileDayNav({ currentDay, onNavigate }: MobileNavProps) {
  const { previous, next } = getAdjacentDays(currentDay);
  const [visible, setVisible] = React.useState(false);

  // Show the floating nav only on mobile and only after scrolling down a bit
  React.useEffect(() => {
    const handler = () => {
      const isMobile = window.innerWidth < 768;
      setVisible(isMobile && window.scrollY > 400);
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-30 flex items-center justify-between px-4 md:hidden">
      <button
        onClick={() => previous && onNavigate(previous.day)}
        disabled={!previous}
        aria-label={`Previous: ${previous?.title || ""}`}
        className={cn(
          "flex h-12 items-center gap-1.5 rounded-full bg-primary px-4 text-primary-foreground shadow-lg transition-all",
          !previous && "pointer-events-none opacity-40",
          previous && "hover:scale-105 hover:shadow-xl"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="max-w-[100px] truncate text-sm font-medium">
          {previous ? `Day ${String(previous.day).padStart(2, "0")}` : "Start"}
        </span>
      </button>
      <button
        onClick={() => next && onNavigate(next.day)}
        disabled={!next}
        aria-label={`Next: ${next?.title || ""}`}
        className={cn(
          "flex h-12 items-center gap-1.5 rounded-full bg-primary px-4 text-primary-foreground shadow-lg transition-all",
          !next && "pointer-events-none opacity-40",
          next && "hover:scale-105 hover:shadow-xl"
        )}
      >
        <span className="max-w-[100px] truncate text-sm font-medium">
          {next ? `Day ${String(next.day).padStart(2, "0")}` : "End"}
        </span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
