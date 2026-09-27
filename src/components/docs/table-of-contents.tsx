"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import type { ContentSection } from "@/data/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface TocProps {
  sections: ContentSection[];
}

export function TableOfContents({ sections }: TocProps) {
  const [activeId, setActiveId] = React.useState<string>("");
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections.filter((s) => s.heading.toLowerCase().includes(q));
  }, [sections, query]);

  return (
    <nav className="space-y-3" aria-label="Table of contents">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <span className="text-[10px] text-muted-foreground">
          {filtered.length}/{sections.length}
        </span>
      </div>

      {/* Search/filter input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter sections..."
          className="h-8 pl-8 pr-7 text-xs"
          aria-label="Filter table of contents"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
            aria-label="Clear filter"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <ul className="space-y-0.5 border-l">
        {filtered.length === 0 ? (
          <li className="py-2 pl-3 text-xs text-muted-foreground italic">
            No sections match "{query}"
          </li>
        ) : (
          filtered.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "block border-l-2 -ml-px py-1.5 text-sm transition-colors",
                  section.level === 3 ? "pl-6" : "pl-3",
                  activeId === section.id
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {section.heading}
              </a>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
}
