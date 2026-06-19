import servicesJson from "./services.json";

export interface Service {
  id: string;
  area: "photography" | "writing" | "youtube" | "other" | string;
  title: string;
  blurb: string;
}

// Sourced from services.json so the /studio editor can update it without code changes.
export const services: Service[] = servicesJson as Service[];
