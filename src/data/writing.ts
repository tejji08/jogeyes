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
    title: "The Hungry Man",
    excerpt: "a man with a large appetite",
    content: "he sat at the counter, ready to eat cheekbones sunken and arms thin he looked famished, devoid of life as he shifted around on the large seat a man came to his side, food in a bin he sat still, his hunger rife in a minute, the bin was cleared the man was still starved for more and yet he would still be fed bin afte bin, platter after platter the next stack of food was tiered and yet he finished that, and didn't even eye the door the owner looked around, he was out of food he had fed the man everything he had and was left with nothing to spare he thought if he filled every desire the man would leave without doing something bad the man would exit without doing something crude but the man was a bear and he ate the owner too",
    tag: "poetry",
    views: 1247,
    likes: 89,
    comments: 12,
    date: "2024-01-15",
  },
  {
    id: "4",
    title: "Closed Eyes",
    excerpt: "Poetry inspired by the changing seasons...",
    content: "we live in the same home \n but in different worlds \n i shine my flashlight so you can see \n but you close your eyes \n trying to live around you \n i need to put on a disguise\n i can try to teach a man to understand my language \n but he first must want to learn \n if i told you all about myself \n it would take you a thousand years to understand \n so why do i bother flashing my light \n if you will turn your head the other way",
    tag: "poetry",
    views: 1543,
    likes: 134,
    comments: 22,
    date: "2024-03-10",
  },
  {
    id: "2",
    title: "Loss of Power",
    excerpt: "what happens when the pillars of society itself disappear?",
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
    excerpt: "how does bob leave his own dreams? his own nightmares?",
    content: "Bob needed to leave. He needed to sleep. His head pounded, thoughts blurring together as his aching feet dragged him forward. The air was cold and sharp in his lungs. He risked a glance over his shoulder—just a blur of shadow. No. He forced his legs to move faster, panic and adrenaline twisting his insides. A doorway flashed by in the corner of his eye. He veered toward it and threw himself inside. The door slammed shut behind him, his whole body pressed against it. The sound of his ragged breathing filled the small room. Something—anything heavy.",
    tag: "story",
    views: 0,
    likes: 0,
    comments: 0,
    date: "2025-11-02",
  },
  {
    id: "8",
    title: "Continuity",
    excerpt: "everything just kept going...",
    content: "I sit idly in class. The blazing heat from the window slowly melts my chocolate bar as a sugary brown puddle forms around it. I plop my pencil into it and watch the droplets fly everywhere. The sun was now shining directly into my eyes, and I raise my hand to block the glare from the window. The teacher at the front of the classroom was half asleep, writing a jumble of words on the chalkboard. I look over at my friend, across the classroom, and he was deep asleep. He was slightly snoring, his jacket turned into a pillow as everyone around him is also siting idly. The teacher was still droning away at the front of the class, whatever she was teaching was long forgotten by everyone there. Some kids were drawing in their notebooks, and others were folding origami with their homework.",
    tag: "story",
    views: 0,
    likes: 0,
    comments: 0,
    date: "2025-11-02",
  }
];
