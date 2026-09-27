"use client";

import * as React from "react";
import { Search, Menu, BookOpen, Github, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { courseStats } from "@/data/days";

interface HeaderProps {
  onSearchOpen: () => void;
  onMenuToggle: () => void;
  onHomeClick: () => void;
  showMenuButton: boolean;
}

export function Header({
  onSearchOpen,
  onMenuToggle,
  onHomeClick,
  showMenuButton,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Logo */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold leading-tight">
              Full Stack Notes
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              {courseStats.totalDays}-Day Course
            </p>
          </div>
        </button>

        {/* Search trigger */}
        <button
          onClick={onSearchOpen}
          className="group ml-2 flex h-9 flex-1 items-center gap-2 rounded-lg border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:max-w-md sm:ml-4"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search the course...</span>
          <span className="sm:hidden">Search...</span>
          <kbd className="ml-auto hidden rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline-flex">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={onHomeClick}
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
