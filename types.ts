export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  stack: string[];
  image: string; // URL for the workflow screenshot
  isFeatured: boolean;
  technicalSheet: {
    objective: string;
    architecture: string[]; // List of steps
    keyCompetencies: string[];
    technicalChallenges?: {
      problem: string;
      solution: string;
    }[];
    results: string;
  };
}

export interface Skill {
  category: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  tools: string;
  businessImpact: string;
}

export interface SoftSkill {
  title: string;
  context: string;
  value: string;
  hobbyConnection?: string;
}