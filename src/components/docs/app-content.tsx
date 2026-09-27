"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allDays, getDayByNumber } from "@/data/days";
import { Header } from "@/components/docs/header";
import { Footer } from "@/components/docs/footer";
import { HomePage } from "@/components/docs/home-page";
import { DayView } from "@/components/docs/day-view";
import { DocsSidebar } from "@/components/docs/sidebar";
import { SearchDialog } from "@/components/docs/search-dialog";
import { ReadingProgress } from "@/components/docs/reading-progress";
import { BackToTop } from "@/components/docs/back-to-top";
import { ShortcutsHelp } from "@/components/docs/shortcuts-help";
import { MobileDayNav } from "@/components/docs/mobile-day-nav";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

export function AppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dayParam = searchParams.get("day");
  const currentDay = dayParam ? parseInt(dayParam, 10) : null;
  const selectedDay = currentDay ? getDayByNumber(currentDay) : null;

  const [completedDays, setCompletedDays] = React.useState<Set<number>>(
    new Set()
  );
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);
  const { setTheme } = useTheme();

  // Load completed days from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("completed-days");
    if (stored) {
      try {
        const arr = JSON.parse(stored) as number[];
        setCompletedDays(new Set(arr));
      } catch {
        /* noop */
      }
    }

    const handleStorageChange = () => {
      const s = localStorage.getItem("completed-days");
      if (s) {
        try {
          setCompletedDays(new Set(JSON.parse(s) as number[]));
        } catch {
          /* noop */
        }
      } else {
        setCompletedDays(new Set());
      }
    };

    window.addEventListener("completed-days-changed", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("completed-days-changed", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Keyboard shortcuts — uses refs defined below
  const goHomeRef = React.useRef<() => void>(() => {});
  const navigateToDayRef = React.useRef<(day: number, sectionId?: string) => void>(() => {});
  const gPressed = React.useRef(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Cmd/Ctrl + K → search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        return;
      }
      // Cmd/Ctrl + B → toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        const isDark =
          document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
        return;
      }
      // ? → shortcuts help (only when not typing)
      if (e.key === "?" && !isTyping && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }
      // J → focus the Jump to Day dropdown (home page only)
      if (
        e.key === "j" &&
        !isTyping &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !currentDay
      ) {
        e.preventDefault();
        const trigger = document.getElementById(
          "jump-to-day"
        ) as HTMLButtonElement | null;
        if (trigger) {
          trigger.focus();
          trigger.click();
        }
        return;
      }
      // g then h → home; g then ←/→ → prev/next day
      if (!isTyping && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === "g" || e.key === "G") {
          gPressed.current = true;
          setTimeout(() => (gPressed.current = false), 800);
          return;
        }
        if (gPressed.current) {
          if (e.key === "h" || e.key === "H") {
            e.preventDefault();
            gPressed.current = false;
            goHomeRef.current();
            return;
          }
          if (e.key === "ArrowLeft" && currentDay && currentDay > 1) {
            e.preventDefault();
            gPressed.current = false;
            navigateToDayRef.current(currentDay - 1);
            return;
          }
          if (
            e.key === "ArrowRight" &&
            currentDay &&
            currentDay < allDays.length
          ) {
            e.preventDefault();
            gPressed.current = false;
            navigateToDayRef.current(currentDay + 1);
            return;
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setTheme, currentDay]);

  const navigateToDay = React.useCallback(
    (day: number, sectionId?: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("day", String(day));
      router.push(`?${params.toString()}`, { scroll: true });
      setSidebarOpen(false);

      // Record recently viewed day (most recent first, unique, max 8)
      try {
        const stored = JSON.parse(
          localStorage.getItem("recent-days") || "[]"
        ) as number[];
        const updated = [day, ...stored.filter((d) => d !== day)].slice(0, 8);
        localStorage.setItem("recent-days", JSON.stringify(updated));
        window.dispatchEvent(new Event("recent-days-changed"));
      } catch {
        /* noop */
      }

      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    },
    [router, searchParams]
  );

  const goHome = React.useCallback(() => {
    router.push("/", { scroll: true });
  }, [router]);

  // Keep refs in sync so keyboard handler always calls latest callbacks
  React.useEffect(() => {
    goHomeRef.current = goHome;
    navigateToDayRef.current = navigateToDay;
  }, [goHome, navigateToDay]);

  const toggleComplete = React.useCallback((day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      localStorage.setItem("completed-days", JSON.stringify([...next]));
      return next;
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgress />
      <Header
        onSearchOpen={() => setSearchOpen(true)}
        onMenuToggle={() => setSidebarOpen(true)}
        onHomeClick={goHome}
        onShortcutsOpen={() => setShortcutsOpen(true)}
        showMenuButton={!!selectedDay}
      />

      {selectedDay ? (
        <div className="flex flex-1">
          {/* Desktop sidebar */}
          <aside className="hidden w-72 shrink-0 border-r lg:block">
            <div className="sticky top-16 h-[calc(100vh-4rem)]">
              <DocsSidebar
                currentDay={currentDay}
                completedDays={completedDays}
                onSelectDay={(d) => navigateToDay(d)}
              />
            </div>
          </aside>

          {/* Mobile sidebar */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="sr-only">Course navigation</SheetTitle>
              <DocsSidebar
                currentDay={currentDay}
                completedDays={completedDays}
                onSelectDay={(d) => navigateToDay(d)}
              />
            </SheetContent>
          </Sheet>

          {/* Day content */}
          <main className="min-w-0 flex-1">
            <DayView
              day={selectedDay}
              completedDays={completedDays}
              onToggleComplete={toggleComplete}
              onNavigate={navigateToDay}
              onBackHome={goHome}
            />
          </main>
        </div>
      ) : (
        <main className="flex-1">
          <HomePage
            completedDays={completedDays}
            onSelectDay={(d) => navigateToDay(d)}
            onSearchOpen={() => setSearchOpen(true)}
          />
        </main>
      )}

      <Footer />

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectDay={(day, sectionId) => navigateToDay(day, sectionId)}
      />

      <ShortcutsHelp open={shortcutsOpen} onOpenChange={setShortcutsOpen} />

      <BackToTop />

      {selectedDay && (
        <MobileDayNav currentDay={selectedDay.day} onNavigate={navigateToDay} />
      )}
    </div>
  );
}
