export interface PhotoSample {
  id: string;
  src: string;
  category: "animals" | "landscapes" | "still-life" | "portraits" | string;
}

export const photographySamples: PhotoSample[] = [
  { id: "p1", src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1000&h=700&fit=crop", category: "animals" },
  { id: "p2", src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&h=700&fit=crop", category: "landscapes" },
  { id: "p3", src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&h=700&fit=crop", category: "still-life" },
  { id: "p4", src: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=1000&h=700&fit=crop", category: "portraits" },
];
