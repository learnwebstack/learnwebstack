"use client";

import * as React from "react";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyTimerProps {
  day: number;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function StudyTimer({ day }: StudyTimerProps) {
  const [elapsed, setElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const storageKey = `study-time-day-${day}`;

  // Load saved time on mount, start ticking
  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = parseInt(localStorage.getItem(storageKey) || "0", 10);
      setElapsed(saved);
    } catch {
      /* noop */
    }
    setRunning(true);
  }, [storageKey]);

  // Tick every second when running
  React.useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem(storageKey, String(next));
        } catch {
          /* noop */
        }
        return next;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, storageKey]);

  // Pause when tab is hidden, resume when visible
  React.useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        setRunning(false);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleRunning = () => setRunning((r) => !r);
  const reset = () => {
    setElapsed(0);
    try {
      localStorage.setItem(storageKey, "0");
    } catch {
      /* noop */
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
      <Timer className={cn("h-3 w-3", running && "text-primary")} />
      <span className="font-mono font-medium tabular-nums">
        {formatTime(elapsed)}
      </span>
      <button
        onClick={toggleRunning}
        className="ml-0.5 rounded p-0.5 transition-colors hover:bg-muted hover:text-foreground"
        aria-label={running ? "Pause timer" : "Resume timer"}
        title={running ? "Pause" : "Resume"}
      >
        {running ? (
          <Pause className="h-3 w-3" />
        ) : (
          <Play className="h-3 w-3" />
        )}
      </button>
      <button
        onClick={reset}
        className="rounded p-0.5 transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Reset timer"
        title="Reset timer"
      >
        <RotateCcw className="h-3 w-3" />
      </button>
    </div>
  );
}
