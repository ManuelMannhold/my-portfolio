export type ProjectType = 'javascript' | 'angular' | 'other';

export interface Project {
  id: string;
  title: string;
  tech: string;
  descriptionKey?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  type: ProjectType;
}
