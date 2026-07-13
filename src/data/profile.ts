import profileJson from "./profile.json";

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  alias: string;
  role: string;
  tagline: string;
  pitch: string;
  bio: string;
  about: string;
  penName: string;
  ao3Url: string;
  wattpadUrl: string;
  location: string;
  available: boolean;
  email: string;
  youtubeUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  githubUrl: string;
  heroPrimary: ProfileLink;
  heroSecondary: ProfileLink;
}

// Sourced from profile.json so the /studio editor can update it without code changes.
export const profile: Profile = profileJson as Profile;
