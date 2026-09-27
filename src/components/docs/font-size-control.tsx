"use client";

import * as React from "react";
import { Type } from "lucide-react";
import { Button } from "@/components/ui/button";

type FontSize = "small" | "normal" | "large";

const FONT_SIZES: Record<FontSize, { label: string }> = {
  small: { label: "A−" },
  normal: { label: "A" },
  large: { label: "A+" },
};

const ORDER: FontSize[] = ["small", "normal", "large"];

function applyFontClass(newSize: FontSize) {
  document.body.classList.toggle("font-large", newSize === "large");
  document.body.classList.toggle("font-small", newSize === "small");
}

export function FontSizeControl() {
  const [size, setSize] = React.useState<FontSize>("normal");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("font-size") as FontSize | null;
    if (stored && FONT_SIZES[stored]) {
      setSize(stored);
      applyFontClass(stored);
    }
  }, []);

  const cycle = () => {
    setSize((prev) => {
      const currentIdx = ORDER.indexOf(prev);
      const next = ORDER[(currentIdx + 1) % ORDER.length];
      applyFontClass(next);
      localStorage.setItem("font-size", next);
      return next;
    });
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Type className="h-4 w-4" />
      </Button>
    );
  }

  const config = FONT_SIZES[size];

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 gap-1.5 px-2 text-xs font-medium"
      onClick={cycle}
      aria-label={`Font size: ${size}. Click to change.`}
      title={`Font size: ${size} (click to cycle)`}
    >
      <Type className="h-4 w-4" />
      <span className="hidden sm:inline">{config.label}</span>
    </Button>
  );
}
