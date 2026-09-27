import type { DayContent } from "../types";
import { day01 } from "./day-01";
import { day02 } from "./day-02";
import { day03 } from "./day-03";
import { day04 } from "./day-04";
import { day05 } from "./day-05";
import { day06 } from "./day-06";
import { day07 } from "./day-07";
import { day08 } from "./day-08";
import { day09 } from "./day-09";
import { day10 } from "./day-10";
import { day11 } from "./day-11";
import { day12 } from "./day-12";
import { day13 } from "./day-13";
import { day14 } from "./day-14";
import { day15 } from "./day-15";
import { day16 } from "./day-16";
import { day17 } from "./day-17";

export const allDays: DayContent[] = [
  day01, day02, day03, day04, day05, day06, day07, day08, day09, day10,
  day11, day12, day13, day14, day15, day16, day17,
];

export { day01, day02, day03, day04, day05, day06, day07, day08, day09, day10,
  day11, day12, day13, day14, day15, day16, day17 };

export function getDayBySlug(slug: string): DayContent | undefined {
  return allDays.find((d) => d.slug === slug);
}

export function getDayByNumber(day: number): DayContent | undefined {
  return allDays.find((d) => d.day === day);
}

export function getAdjacentDays(day: number): {
  previous: DayContent | undefined;
  next: DayContent | undefined;
} {
  const index = allDays.findIndex((d) => d.day === day);
  return {
    previous: index > 0 ? allDays[index - 1] : undefined,
    next: index < allDays.length - 1 ? allDays[index + 1] : undefined,
  };
}

export const courseStats = {
  totalDays: allDays.length,
  totalSections: allDays.reduce((sum, d) => sum + d.sections.length, 0),
  totalTopics: allDays.reduce((sum, d) => sum + d.topics.length, 0),
  totalExercises: allDays.reduce((sum, d) => sum + d.exercises.length, 0),
  categories: [...new Set(allDays.map((d) => d.category))],
};
