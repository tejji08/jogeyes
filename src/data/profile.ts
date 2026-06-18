import profileJson from "./profile.json";

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  alias: string;
  tagline: string;
  bio: string;
  location: string;
  heroPrimary: ProfileLink;
  heroSecondary: ProfileLink;
}

// Sourced from profile.json so the /studio editor can update it without code changes.
export const profile: Profile = profileJson as Profile;
