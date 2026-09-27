import { Suspense } from "react";
import { AppContent } from "@/components/docs/app-content";
import { allDays, courseStats } from "@/data/days";

// JSON-LD structured data for SEO
function CourseStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Full Stack Web Development — Complete Course Notes",
    description: `A comprehensive ${courseStats.totalDays}-day full stack web development course covering HTML, CSS, JavaScript, React, and Node.js with ${courseStats.totalSections}+ structured sections.`,
    provider: {
      "@type": "Organization",
      name: "Full Stack Course Notes",
      sameAs: "https://github.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT51H",
    },
    hasPart: allDays.map((day) => ({
      "@type": "LearningResource",
      name: `Day ${String(day.day).padStart(2, "0")}: ${day.title}`,
      description: day.description,
      learningResourceType: "Lesson",
      teaches: day.topics,
      educationalLevel: "beginner to intermediate",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function BreadcrumbStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Full Stack Web Development Course",
        item: "/",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <CourseStructuredData />
      <BreadcrumbStructuredData />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading course...</p>
            </div>
          </div>
        }
      >
        <AppContent />
      </Suspense>
    </>
  );
}
