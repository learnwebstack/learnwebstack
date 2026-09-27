import * as React from "react";
import {
  Info,
  AlertTriangle,
  Lightbulb,
  StickyNote,
  CheckCircle2,
} from "lucide-react";
import type { Callout as CalloutType } from "@/data/types";
import { cn } from "@/lib/utils";

const calloutConfig = {
  info: {
    icon: Info,
    container: "border-sky-500/30 bg-sky-50 dark:bg-sky-950/30",
    iconClass: "text-sky-600 dark:text-sky-400",
    titleClass: "text-sky-900 dark:text-sky-200",
    bodyClass: "text-sky-800/80 dark:text-sky-200/80",
  },
  warning: {
    icon: AlertTriangle,
    container: "border-amber-500/30 bg-amber-50 dark:bg-amber-950/30",
    iconClass: "text-amber-600 dark:text-amber-400",
    titleClass: "text-amber-900 dark:text-amber-200",
    bodyClass: "text-amber-800/80 dark:text-amber-200/80",
  },
  tip: {
    icon: Lightbulb,
    container: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    titleClass: "text-emerald-900 dark:text-emerald-200",
    bodyClass: "text-emerald-800/80 dark:text-emerald-200/80",
  },
  note: {
    icon: StickyNote,
    container: "border-violet-500/30 bg-violet-50 dark:bg-violet-950/30",
    iconClass: "text-violet-600 dark:text-violet-400",
    titleClass: "text-violet-900 dark:text-violet-200",
    bodyClass: "text-violet-800/80 dark:text-violet-200/80",
  },
  success: {
    icon: CheckCircle2,
    container: "border-green-500/30 bg-green-50 dark:bg-green-950/30",
    iconClass: "text-green-600 dark:text-green-400",
    titleClass: "text-green-900 dark:text-green-200",
    bodyClass: "text-green-800/80 dark:text-green-200/80",
  },
};

export function Callout({ callout }: { callout: CalloutType }) {
  const config = calloutConfig[callout.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-5 flex gap-3 rounded-xl border-l-4 p-4",
        config.container
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClass)} />
      <div className="min-w-0 flex-1">
        {callout.title && (
          <p className={cn("mb-1 font-semibold text-sm", config.titleClass)}>
            {callout.title}
          </p>
        )}
        <p className={cn("text-sm leading-relaxed", config.bodyClass)}>
          {callout.content}
        </p>
      </div>
    </div>
  );
}
