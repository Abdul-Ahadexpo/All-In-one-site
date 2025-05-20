export interface Website {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  githubUrl?: string;
  dateAdded: string;
  visitCount: number;
}

export type SortOption = 'recent' | 'alphabetical' | 'mostVisited';

export interface WebsiteFormData {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  githubUrl?: string;
}