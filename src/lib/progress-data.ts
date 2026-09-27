"use client";

// Keys that represent user progress/data in localStorage
const PROGRESS_KEYS = [
  "completed-days",
  "recent-days",
  "recent-days-timestamps",
  "visit-dates",
  "last-visit-date",
  "font-size",
] as const;

// Bookmark keys follow the pattern `bookmark-day-{N}`
const BOOKMARK_PREFIX = "bookmark-day-";
const TOTAL_DAYS = 17;

export interface ProgressData {
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
}

export function exportProgress(): ProgressData {
  const data: Record<string, string> = {};
  for (const key of PROGRESS_KEYS) {
    const val = localStorage.getItem(key);
    if (val !== null) {
      data[key] = val;
    }
  }
  // Collect all bookmark entries
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const val = localStorage.getItem(`${BOOKMARK_PREFIX}${d}`);
    if (val !== null) {
      data[`${BOOKMARK_PREFIX}${d}`] = val;
    }
  }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadProgressJSON() {
  const exportData = exportProgress();
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const date = new Date().toISOString().slice(0, 10);
  a.download = `fullstack-progress-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProgress(json: string): { success: boolean; error?: string; count: number } {
  try {
    const parsed = JSON.parse(json) as ProgressData;
    if (!parsed.data || typeof parsed.data !== "object") {
      return { success: false, error: "Invalid file format: missing data object", count: 0 };
    }
    let count = 0;
    for (const [key, value] of Object.entries(parsed.data)) {
      // Only restore known keys to prevent pollution
      const isKnown =
        PROGRESS_KEYS.includes(key as (typeof PROGRESS_KEYS)[number]) ||
        key.startsWith(BOOKMARK_PREFIX);
      if (isKnown && typeof value === "string") {
        localStorage.setItem(key, value);
        count++;
      }
    }
    return { success: true, count };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to parse JSON",
      count: 0,
    };
  }
}
