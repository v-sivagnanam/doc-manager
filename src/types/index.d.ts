interface Document {
  id: string;
  name: string;
  pdf?: string;
}

interface Application {
  id: string;
  name: string;
  documents: Document[];
}

interface ApplicationsState {
  applications: Application[];
  selectedAppId: string | null;
  selectedDocIndex: number;
  currentPage: number;
  docsPerPage: number;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
}

export interface ApplicationsState {
  applications: Application[];
  selectedAppId: string | null;
  selectedDocIndex: number;
}

export interface RootState {
  applications: ApplicationsState;
}
