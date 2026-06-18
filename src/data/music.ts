import musicJson from "./music.json";

export interface Track {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: string;
  genre: string;
  coverArt: string;
  audioUrl: string;
}

// Sourced from music.json so the /studio editor can update it without code changes.
export const tracks: Track[] = musicJson as Track[];
