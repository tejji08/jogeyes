import writingJson from "./writing.json";

export type PostTag = "poetry" | "story" | "experimental";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: PostTag;
  views: number;
  likes: number;
  comments: number;
  date: string;
}

// Sourced from writing.json so the /studio editor can update it without code changes.
export const posts: Post[] = writingJson as Post[];
