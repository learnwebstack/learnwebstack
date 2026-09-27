"use client";

import * as React from "react";
import { Search, FileText, CornerDownLeft, Hash } from "lucide-react";
import { allDays } from "@/data/days";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDay: (day: number, sectionId?: string) => void;
}

interface SearchResult {
  day: number;
  dayTitle: string;
  sectionId?: string;
  sectionTitle: string;
  match: string;
  type: "day" | "section" | "topic";
}

export function SearchDialog({
  open,
  onOpenChange,
  onSelectDay,
}: SearchDialogProps) {
  const [query, setQuery] = React.useState("");

  const results = React.useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    for (const day of allDays) {
      // Match day title
      if (day.title.toLowerCase().includes(q) || day.description.toLowerCase().includes(q)) {
        results.push({
          day: day.day,
          dayTitle: day.title,
          sectionTitle: day.title,
          match: day.description.slice(0, 100) + "...",
          type: "day",
        });
      }

      // Match topics
      for (const topic of day.topics) {
        if (topic.toLowerCase().includes(q)) {
          results.push({
            day: day.day,
            dayTitle: day.title,
            sectionTitle: topic,
            match: `Topic in ${day.date}`,
            type: "topic",
          });
        }
      }

      // Match sections
      for (const section of day.sections) {
        if (section.heading.toLowerCase().includes(q)) {
          results.push({
            day: day.day,
            dayTitle: day.title,
            sectionId: section.id,
            sectionTitle: section.heading,
            match: `Section in ${day.date}`,
            type: "section",
          });
        }
        // Search in paragraphs
        for (const para of section.paragraphs || []) {
          if (para.toLowerCase().includes(q)) {
            const idx = para.toLowerCase().indexOf(q);
            const start = Math.max(0, idx - 30);
            const end = Math.min(para.length, idx + q.length + 50);
            results.push({
              day: day.day,
              dayTitle: day.title,
              sectionId: section.id,
              sectionTitle: section.heading,
              match: "..." + para.slice(start, end) + "...",
              type: "section",
            });
            break; // Only one match per section
          }
        }
      }
    }

    return results.slice(0, 20);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Search course content</DialogTitle>
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <CommandInput
              placeholder="Search days, topics, or content..."
              value={query}
              onValueChange={setQuery}
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[400px]">
            <CommandEmpty>
              {query ? "No results found." : "Start typing to search..."}
            </CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading={`${results.length} results`}>
                {results.map((result, i) => (
                  <CommandItem
                    key={i}
                    onSelect={() => {
                      onSelectDay(result.day, result.sectionId);
                      onOpenChange(false);
                    }}
                    className="flex flex-col items-start gap-1 py-3"
                  >
                    <div className="flex w-full items-center gap-2">
                      {result.type === "topic" ? (
                        <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className="font-mono text-xs text-muted-foreground">
                        Day {String(result.day).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {result.dayTitle}
                      </span>
                    </div>
                    <p className="font-medium text-sm">{result.sectionTitle}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {result.match}
                    </p>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <div className="flex items-center gap-2 border-t px-3 py-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
                <CornerDownLeft className="h-2.5 w-2.5" />
              </kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">
                Esc
              </kbd>
              to close
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
