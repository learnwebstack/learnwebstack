"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Download, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

const languageLabels: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  bash: "Bash",
  json: "JSON",
  text: "Text",
};

const languageColors: Record<string, string> = {
  html: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  css: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  javascript: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  js: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  jsx: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  ts: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  tsx: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  bash: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
  json: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  text: "bg-muted text-muted-foreground",
};

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const handleDownload = () => {
    const ext =
      language === "javascript" || language === "js"
        ? "js"
        : language === "typescript" || language === "ts"
        ? "ts"
        : language === "bash"
        ? "sh"
        : language === "json"
        ? "json"
        : language;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `snippet.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lang = language === "text" || language === "bash" ? "bash" : language;
  const label = languageLabels[language] || language.toUpperCase();
  const badgeColor = languageColors[language] || languageColors.text;
  const isTerminal = language === "bash" || language === "text";

  // Custom style: no per-line background, no text shadow (the "light effect")
  const customStyle = {
    margin: 0,
    padding: "1.125rem 1.25rem",
    background: "transparent",
    fontSize: "0.8125rem",
    lineHeight: "1.75",
    textShadow: "none",
  };

  // Theme override: keep syntax token colors but remove line backgrounds and text shadows
  const baseTheme = resolvedTheme === "dark" ? oneDark : oneLight;
  const themeOverride = {
    ...baseTheme,
    // Remove the pre background and text shadow (the "light effect on each line")
    'pre[class*="language-"]': {
      ...baseTheme['pre[class*="language-"]'],
      background: "transparent",
      textShadow: "none",
    },
    // Remove the code text shadow too
    'code[class*="language-"]': {
      ...baseTheme['code[class*="language-"]'],
      background: "transparent",
      textShadow: "none",
      color: resolvedTheme === "dark" ? "#e2e8f0" : "#1e293b",
      fontFamily: "var(--font-geist-mono), monospace",
    },
    // Selection background kept subtle
    'pre[class*="language-"] *::selection': {
      background: resolvedTheme === "dark" ? "hsl(220, 13%, 28%)" : "hsl(220, 13%, 80%)",
      color: "inherit",
      textShadow: "none",
    },
    'code[class*="language-"]::selection': {
      background: resolvedTheme === "dark" ? "hsl(220, 13%, 28%)" : "hsl(220, 13%, 80%)",
      color: "inherit",
      textShadow: "none",
    },
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          {isTerminal ? (
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
            </div>
          )}
          {filename && (
            <span className="ml-1 font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          )}
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              badgeColor
            )}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleDownload}
            aria-label="Download snippet"
          >
            <Download className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 px-2 text-xs opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>
      {/* Code — with syntax highlighting colors, but NO line background / text shadow */}
      <div className="overflow-x-auto scrollbar-thin">
        <SyntaxHighlighter
          language={lang}
          style={themeOverride}
          customStyle={customStyle}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), monospace",
              background: "transparent",
              textShadow: "none",
            },
          }}
          showLineNumbers={code.split("\n").length > 4}
          lineNumberStyle={{
            color: "var(--muted-foreground)",
            opacity: 0.4,
            paddingRight: "1.25em",
            minWidth: "2.5em",
            userSelect: "none",
            background: "transparent",
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
