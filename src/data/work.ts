import workJson from "./work.json";

export interface WorkItem {
  id: string;
  org: string;
  role: string;
  location: string;
  blurb: string;
  link: string;
  linkLabel: string;
}

// Sourced from work.json so the /studio editor can update it without code changes.
export const work: WorkItem[] = workJson as WorkItem[];
