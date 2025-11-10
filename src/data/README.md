This folder contains the content data used by the site pages. Add or update entries here to change the site without editing page components.

Files:

- `writing.ts` — exports `posts: Post[]`, `Post` and `PostTag` types. Add new writing entries to the `posts` array. Keep `tag` set to `"poetry"` or `"story"` (experimental entries are preserved but hidden by default).
- `videos.ts` — exports `videos: Video[]` and `Video` type. Add new YouTube items here. `id` should be the YouTube video id.
- `music.ts` — exports `tracks: Track[]` and `Track` type. Add new music tracks and their metadata here.
- `photography.ts` — exports `photographySamples: string[]`. Add new image URLs to this array.
- `index.ts` — re-exports all the above for convenience: `import { posts, videos, tracks } from '@/data'`

Guidelines:

- Use unique `id` values for items.
- Dates should be ISO strings (YYYY-MM-DD) for consistent display.
- For images, prefer CDN or external image hosts that allow hotlinking (or store locally under `/public`).
- If you prefer content in Markdown/MDX later, we can migrate these arrays to a `content/` folder and use MDX for rich content.

If you'd like, I can add a small script to validate entries or a simple admin UI to add/remove entries.
