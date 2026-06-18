import photographyJson from "./photography.json";

export interface PhotoSample {
  id: string;
  src: string;
  category: "animals" | "landscapes" | "still-life" | "portraits" | string;
}

// Sourced from photography.json so the /studio editor can update it without code changes.
export const photographySamples: PhotoSample[] = photographyJson as PhotoSample[];
