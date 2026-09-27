export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface ImageBlock {
  src: string;
  alt: string;
  caption: string;
  description?: string;
}

export interface Callout {
  type: "info" | "warning" | "tip" | "note" | "success";
  title?: string;
  content: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  level?: 2 | 3;
  paragraphs?: string[];
  code?: CodeSnippet[];
  image?: ImageBlock;
  callout?: Callout;
  list?: {
    ordered?: boolean;
    items: string[];
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface DayContent {
  day: number;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  duration: string;
  category: string;
  tags: string[];
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  topics: string[];
  sections: ContentSection[];
  keyTakeaways: string[];
  exercises: string[];
  resources: { label: string; url: string }[];
}
