import photographyJson from "./photography.json";

export interface PhotoSample {
  id: string;
  src: string;
  category: "animals" | "landscapes" | "still-life" | "portraits" | string;
  /** Optional caption shown on hover and in the lightbox. */
  caption?: string;
}

// Sourced from photography.json so the /studio editor can update it without code changes.
export const photographySamples: PhotoSample[] = photographyJson as PhotoSample[];
