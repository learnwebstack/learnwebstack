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

  // Custom style overrides for better contrast
  const customStyle = {
    margin: 0,
    padding: "1.125rem 1.25rem",
    background: "transparent",
    fontSize: "0.8125rem",
    lineHeight: "1.75",
  };

  // Override syntax highlighter colors for better contrast (comments, strings, etc.)
  const themeOverride = {
    ...(resolvedTheme === "dark" ? oneDark : oneLight),
    'code[class*="language-"]': {
      ...(resolvedTheme === "dark" ? oneDark : oneLight)['code[class*="language-"]'],
      color: resolvedTheme === "dark" ? "#e2e8f0" : "#1e293b",
    },
    'pre[class*="language-"]': {
      ...(resolvedTheme === "dark" ? oneDark : oneLight)['pre[class*="language-"]'],
      background: "transparent",
    },
    comment: {
      color: resolvedTheme === "dark" ? "#94a3b8" : "#64748b",
      fontStyle: "italic" as const,
    },
    prolog: {
      color: resolvedTheme === "dark" ? "#94a3b8" : "#64748b",
      fontStyle: "italic" as const,
    },
    doctype: {
      color: resolvedTheme === "dark" ? "#94a3b8" : "#64748b",
      fontStyle: "italic" as const,
    },
    cdata: {
      color: resolvedTheme === "dark" ? "#94a3b8" : "#64748b",
      fontStyle: "italic" as const,
    },
    punctuation: {
      color: resolvedTheme === "dark" ? "#cbd5e1" : "#475569",
    },
    property: {
      color: resolvedTheme === "dark" ? "#7dd3fc" : "#0284c7",
    },
    tag: {
      color: resolvedTheme === "dark" ? "#fca5a5" : "#dc2626",
    },
    boolean: {
      color: resolvedTheme === "dark" ? "#fbbf24" : "#d97706",
    },
    number: {
      color: resolvedTheme === "dark" ? "#fbbf24" : "#d97706",
    },
    constant: {
      color: resolvedTheme === "dark" ? "#fbbf24" : "#d97706",
    },
    symbol: {
      color: resolvedTheme === "dark" ? "#fbbf24" : "#d97706",
    },
    selector: {
      color: resolvedTheme === "dark" ? "#86efac" : "#16a34a",
    },
    "attr-name": {
      color: resolvedTheme === "dark" ? "#7dd3fc" : "#0284c7",
    },
    string: {
      color: resolvedTheme === "dark" ? "#86efac" : "#16a34a",
    },
    char: {
      color: resolvedTheme === "dark" ? "#86efac" : "#16a34a",
    },
    builtin: {
      color: resolvedTheme === "dark" ? "#fde68a" : "#b45309",
    },
    inserted: {
      color: resolvedTheme === "dark" ? "#86efac" : "#16a34a",
    },
    operator: {
      color: resolvedTheme === "dark" ? "#e2e8f0" : "#1e293b",
    },
    entity: {
      color: resolvedTheme === "dark" ? "#f0abfc" : "#c026d3",
    },
    url: {
      color: resolvedTheme === "dark" ? "#7dd3fc" : "#0284c7",
    },
    variable: {
      color: resolvedTheme === "dark" ? "#fda4af" : "#be123c",
    },
    "function-variable": {
      color: resolvedTheme === "dark" ? "#fde68a" : "#b45309",
    },
    function: {
      color: resolvedTheme === "dark" ? "#fde68a" : "#b45309",
    },
    keyword: {
      color: resolvedTheme === "dark" ? "#f0abfc" : "#c026d3",
    },
    atrule: {
      color: resolvedTheme === "dark" ? "#f0abfc" : "#c026d3",
    },
    "attr-value": {
      color: resolvedTheme === "dark" ? "#86efac" : "#16a34a",
    },
    class: {
      color: resolvedTheme === "dark" ? "#fde68a" : "#b45309",
    },
    regex: {
      color: resolvedTheme === "dark" ? "#fbbf24" : "#d97706",
    },
    important: {
      color: resolvedTheme === "dark" ? "#fca5a5" : "#dc2626",
      fontWeight: "bold" as const,
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
      {/* Code */}
      <div className="overflow-x-auto scrollbar-thin">
        <SyntaxHighlighter
          language={lang}
          style={themeOverride}
          customStyle={customStyle}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), monospace",
            },
          }}
          showLineNumbers={code.split("\n").length > 4}
          lineNumberStyle={{
            color: "var(--muted-foreground)",
            opacity: 0.4,
            paddingRight: "1.25em",
            minWidth: "2.5em",
            userSelect: "none",
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
