import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { allDays, courseStats } from "@/data/days";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://fullstack-docs.example.com";
const siteName = "Full Stack Web Development — Complete Course Notes";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${courseStats.totalDays} Days`,
    template: `%s | Full Stack Course Notes`,
  },
  description: `A comprehensive ${courseStats.totalDays}-day full stack web development course covering HTML, CSS, JavaScript, React, and Node.js. Structured day-wise notes with code examples, exercises, and resources.`,
  keywords: [
    "web development",
    "full stack",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "programming course",
    "web development tutorial",
    "coding bootcamp",
    "frontend development",
    "backend development",
  ],
  authors: [{ name: "Course Notes" }],
  creator: "Course Notes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: `Comprehensive ${courseStats.totalDays}-day full stack web development course with ${courseStats.totalSections}+ sections of structured notes.`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: `Comprehensive ${courseStats.totalDays}-day full stack web development course notes.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
