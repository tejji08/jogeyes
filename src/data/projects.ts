import projectsJson from "./projects.json";

export interface Project {
  id: string;
  title: string;
  blurb: string;
  stack: string;
  status: string;
  link: string;
  linkLabel: string;
}

// Sourced from projects.json so the /studio editor can update it without code changes.
export const projects: Project[] = projectsJson as Project[];
