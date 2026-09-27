"use client";

import * as React from "react";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SectionHeadingProps {
  id: string;
  heading: string;
  level?: 2 | 3;
}

export function SectionHeading({ id, heading, level = 2 }: SectionHeadingProps) {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = typeof window !== "undefined" ? window.location.href : "";
    const hashUrl = url.split("#")[0] + `#${id}`;
    try {
      await navigator.clipboard.writeText(hashUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Link copied!",
        description: `Section link copied to clipboard`,
        duration: 2000,
      });
      // Also update the URL hash without scrolling
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
    } catch {
      /* noop */
    }
  };

  const HeadingTag = level === 3 ? "h3" : "h2";

  return (
    <HeadingTag
      id={id}
      className={cn(
        "group flex scroll-mt-24 items-center gap-2 font-bold tracking-tight",
        level === 3
          ? "mt-8 mb-3 text-xl font-semibold"
          : "mt-12 mb-4 border-b pb-2 text-2xl"
      )}
    >
      {level === 3 && (
        <span className="h-4 w-1 rounded-full bg-primary/50" />
      )}
      <span className="flex-1">{heading}</span>
      <button
        onClick={handleCopyLink}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-primary group-hover:opacity-100 focus:opacity-100"
        aria-label={`Copy link to section: ${heading}`}
        title="Copy link to this section"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </HeadingTag>
  );
}
