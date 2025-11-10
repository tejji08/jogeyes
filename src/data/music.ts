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

export const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    description: "An ambient journey through nocturnal soundscapes",
    releaseDate: "2024-01-15",
    duration: "4:32",
    genre: "Ambient",
    coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Electric Pulse",
    description: "High-energy electronic beats with synth layers",
    releaseDate: "2024-02-20",
    duration: "3:45",
    genre: "Electronic",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Ocean Whispers",
    description: "Calm, meditative sounds inspired by coastal waves",
    releaseDate: "2024-03-10",
    duration: "5:18",
    genre: "Ambient",
    coverArt: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Urban Symphony",
    description: "City sounds blended with orchestral elements",
    releaseDate: "2024-04-05",
    duration: "4:55",
    genre: "Orchestral",
    coverArt: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Neon Nights",
    description: "Retrowave vibes with modern production",
    releaseDate: "2024-05-12",
    duration: "3:58",
    genre: "Electronic",
    coverArt: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "6",
    title: "Forest Awakening",
    description: "Natural sounds meet acoustic guitar instrumentation",
    releaseDate: "2024-06-18",
    duration: "6:12",
    genre: "Acoustic",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
];
