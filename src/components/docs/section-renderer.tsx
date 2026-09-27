"use client";

import * as React from "react";
import type { ContentSection } from "@/data/types";
import { CodeBlock } from "./code-block";
import { Callout } from "./callout";
import { cn } from "@/lib/utils";

export function SectionRenderer({ section }: { section: ContentSection }) {
  const headingId = section.id;

  return (
    <section id={headingId} className="scroll-mt-24">
      {section.level === 3 ? (
        <h3 className="group flex items-center gap-2 text-xl font-semibold tracking-tight mt-8 mb-3">
          <span className="h-4 w-1 rounded-full bg-primary/50" />
          {section.heading}
        </h3>
      ) : (
        <h2 className="group flex items-center gap-2 text-2xl font-bold tracking-tight mt-12 mb-4 border-b pb-2">
          {section.heading}
          <a
            href={`#${headingId}`}
            className="opacity-0 transition-opacity group-hover:opacity-100 text-primary"
            aria-label={`Link to ${section.heading}`}
          >
            #
          </a>
        </h2>
      )}

      {section.paragraphs?.map((para, i) => (
        <p key={i} className="mb-4 leading-7 text-muted-foreground">
          {para}
        </p>
      ))}

      {section.list && (
        <div className="my-4">
          {section.list.ordered ? (
            <ol className="ml-1 space-y-2">
              {section.list.items.map((item, i) => (
                <li key={i} className="flex gap-3 leading-7 text-muted-foreground">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span
                    className="flex-1"
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                  />
                </li>
              ))}
            </ol>
          ) : (
            <ul className="space-y-2">
              {section.list.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 leading-7 text-muted-foreground"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span
                    className="flex-1"
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {section.code?.map((snippet, i) => (
        <CodeBlock
          key={i}
          code={snippet.code}
          language={snippet.language}
          filename={snippet.filename}
        />
      ))}

      {section.table && (
        <div className="my-6 overflow-x-auto rounded-xl border shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {section.table.headers.map((header, i) => (
                  <th
                    key={i}
                    className="border-b px-5 py-3.5 text-left font-semibold tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-b last:border-0 transition-colors hover:bg-primary/5",
                    i % 2 === 1 && "bg-muted/20"
                  )}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-5 py-3.5 text-muted-foreground leading-relaxed",
                        j === 0 && "font-semibold text-foreground"
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.image && (
        <figure className="my-6">
          <div className="overflow-hidden rounded-xl border bg-card p-4 shadow-sm">
            <img
              src={section.image.src}
              alt={section.image.alt}
              className="mx-auto max-w-full h-auto"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-3 text-center">
            <p className="text-sm font-medium text-foreground">
              {section.image.caption}
            </p>
            {section.image.description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {section.image.description}
              </p>
            )}
          </figcaption>
        </figure>
      )}

      {section.callout && <Callout callout={section.callout} />}
    </section>
  );
}

// Format inline text: convert <tag> to styled spans, `code` to code styling
function formatInline(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Restore HTML-like tags as styled spans
    .replace(
      /&lt;(\/?)(strong|em|code|mark|abbr|small)&gt;/g,
      (_, closing, tag) => `<${closing}${tag}>`
    )
    // Inline code with backticks
    .replace(
      /`([^`]+)`/g,
      '<code class="font-mono text-[0.85em] bg-muted px-1.5 py-0.5 rounded">$1</code>'
    );
}
