export interface Document {
  id: string;
  name: string;
  pdf: string | null;
}

export interface Application {
  id: string;
  name: string;
  documents: Document[];
}

export interface AppState {
  applications: Application[];
}

export interface  SEOProps{
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
};
