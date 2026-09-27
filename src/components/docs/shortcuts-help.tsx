"use client";

import * as React from "react";
import {
  Search,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Home,
  Keyboard,
  X,
  ListOrdered,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Shortcut {
  keys: string[];
  description: string;
  icon: React.ElementType;
}

const shortcuts: Shortcut[] = [
  { keys: ["⌘", "K"], description: "Open search", icon: Search },
  { keys: ["⌘", "B"], description: "Toggle theme", icon: Sun },
  { keys: ["?"], description: "Show this help", icon: Keyboard },
  { keys: ["J"], description: "Jump to day (home only)", icon: ListOrdered },
  { keys: ["/"], description: "Filter sections (day pages)", icon: Search },
  { keys: ["G", "H"], description: "Go to home page", icon: Home },
  { keys: ["G", "←"], description: "Previous day", icon: ArrowLeft },
  { keys: ["G", "→"], description: "Next day", icon: ArrowRight },
  { keys: ["Esc"], description: "Close dialogs", icon: X },
];

export function ShortcutsHelp({ open, onOpenChange }: ShortcutsHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 p-0">
        <DialogTitle className="sr-only">Keyboard shortcuts</DialogTitle>
        <div className="flex items-center gap-2 border-b px-5 py-4">
          <Keyboard className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold">Keyboard Shortcuts</h2>
        </div>
        <div className="divide-y">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-3"
            >
              <div className="flex items-center gap-3">
                <sc.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {sc.description}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {sc.keys.map((key, j) => (
                  <kbd
                    key={j}
                    className="rounded border bg-muted px-2 py-1 font-mono text-xs font-medium text-muted-foreground shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t px-5 py-3 text-center text-xs text-muted-foreground">
          Press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">Esc</kbd> to close
        </div>
      </DialogContent>
    </Dialog>
  );
}
