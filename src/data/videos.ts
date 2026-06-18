import videosJson from "./videos.json";

export interface Video {
  id: string;
  /** Real YouTube video ID used for the embed/player (paste from a youtu.be link). */
  youtubeId?: string;
  title: string;
  thumbnail: string;
  description?: string;
  views: string;
  date: string;
  group?: "gaming" | "guitar" | string;
  subcategory?: string;
}

// Sourced from videos.json so the /studio editor can update it without code changes.
export const videos: Video[] = videosJson as Video[];
