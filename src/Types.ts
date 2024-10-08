export interface ProjectType {
  type: string;
  name: string;
  title: string;
  description: string[];
  images: string[];
  webpImages: string[];
  list: {
    Date?: string;
    Cadre?: string;
    Technologies?: string;
    Client?: string;
    Durée?: string;
    date?: string;
    Outils?: string;
  };
  link?: string[];
  colors: string[];
  videos?: string[];
}

export interface LocationState {
  pathname: string;
}
