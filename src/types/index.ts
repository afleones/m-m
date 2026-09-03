export interface LoveStoryMilestone {
  id: string;
  title: string;
  date: string;
  text: string;
  photoLabel: string;
  image: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  date: string;
  time: string;
  mapsQuery: string;
  note?: string;
}

export interface FianceInfo {
  name: string;
  role: "novia" | "novio";
  phone: string;
  message: string;
}
