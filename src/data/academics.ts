import academicsJson from "./academics.json";

export interface AcademicItem {
  id: string;
  title: string;
  category: string;
  blurb: string;
  date: string;
}

// Sourced from academics.json so the /studio editor can update it without code changes.
export const academics: AcademicItem[] = academicsJson as AcademicItem[];
