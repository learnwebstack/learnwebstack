import type { MetadataRoute } from "next";
import { allDays } from "@/data/days";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://learnwebstack.vercel.app";

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  allDays.forEach((day) => {
    entries.push({
      url: `${baseUrl}/?day=${day.day}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return entries;
}
