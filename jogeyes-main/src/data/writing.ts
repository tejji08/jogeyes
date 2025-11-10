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

// Exported posts data so it's easy to add new entries without touching the page component.
export const posts: Post[] = [
  {
    id: "1",
    title: "Whispers in the Dark",
    excerpt: "A journey through the shadows of midnight thoughts...",
    content: "In the silence of the night, when stars align and dreams take flight...",
    tag: "poetry",
    views: 1247,
    likes: 89,
    comments: 12,
    date: "2024-01-15",
  },
  {
    id: "4",
    title: "Autumn Reflections",
    excerpt: "Poetry inspired by the changing seasons...",
    content: "Golden leaves dance in the autumn breeze, whispering secrets of the trees...",
    tag: "poetry",
    views: 1543,
    likes: 134,
    comments: 22,
    date: "2024-03-10",
  },
  {
    id: "2",
    title: "Loss of Power",
    excerpt: "A short story about finding yourself in unexpected places...",
    content: "The platform was empty except for an old man feeding pigeons...",
    tag: "story",
    views: 2341,
    likes: 156,
    comments: 28,
    date: "2024-02-03",
  },
  {
    id: "5",
    title: "Creatures",
    excerpt: "Asteroids crash onto earth as something foreign establishes itself onto our planet. Jay struggles to find himself, and find out what has come into his home.",
    content: "Jay was playing in pools filled with caramel, surrounded by cities made of chocolate and marshmallows. Diving into his pool he slurps up as much Caramel as he can fill into his mouth. He slowly swallows all of it, as he begins to sink deeper and deeper in the confectionary filled pool.  He continues to sink, eating candy after candy, only consuming more as he descends. Through the endless abyss of sugary delight, floating glittery unicorns made of marshmallows, and many hundreds of chocolate bunnies all floating along with him. As he keeps on consuming these sweets, his eyes grow heavy, and he struggles to see in the caramel around him. He was able to breathe somehow, which came to his attention rather late, as he found that nothing made any sense. He was somehow swimming in a pool filled with caramel and had zero problems breathing or swimming in the otherwise viscous liquid. As he keeps sinking, his chest tightens as the pressure of the caramel begins to weigh down upon him. He coughs, and gasps for air as his lungs are filled with heavy syrup. His eyes jolt open as he begins to struggle and flail around, but his efforts were to no avail as he continued to sink, until he hit the bottom, where he promptly woke up from this interesting dream of his. He sat upright in his bed, looking around the room wildly. ",
    tag: "story",
    views: 62,
    likes: 6,
    comments: 0,
    date: "2024-03-25",
  },
  {
    id: "3",
    title: "Fragments of Tomorrow",
    excerpt: "An experimental piece exploring time and memory...",
    content: "Time folds. Memory splinters. Tomorrow bleeds into yesterday...",
    tag: "experimental",
    views: 876,
    likes: 67,
    comments: 15,
    date: "2024-02-20",
  },
  {
    id: "6",
    title: "Syntax Error: Soul",
    excerpt: "Where code meets consciousness...",
    content: "if (soul.exists()) { return meaning; } else { throw new ExistentialException(); }",
    tag: "experimental",
    views: 1089,
    likes: 92,
    comments: 18,
    date: "2024-04-08",
  },
  {
    id: "7",
    title: "The Need to Sleep",
    excerpt: "A short story about coffee, trains, and small miracles.",
    content: "He missed the first train, but the second one brought everything into focus...",
    tag: "story",
    views: 0,
    likes: 0,
    comments: 0,
    date: "2025-11-02",
  }
];
