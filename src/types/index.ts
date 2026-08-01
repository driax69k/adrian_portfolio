export type ProjectCategory = 'all' | 'web' | 'mobile' | 'desktop' | 'ai';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  year: string;
  features: string[];
  impact: string[];
  category: Exclude<ProjectCategory, 'all'>;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: Skill[];
}

export type ExperienceType =
  | 'education'
  | 'project'
  | 'hackathon'
  | 'organization'
  | 'work';

export interface Experience {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  description?: string;
  type: ExperienceType;
  tags?: string[];
}

export type SocialIconName = 'github' | 'instagram' | 'facebook' | 'mail';

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIconName;
}

export interface QuickInfo {
  label: string;
  value: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  shortBio: string;
  longBio: string[];
  location: string;
  email: string;
  availability: string;
  resumeUrl: string;
  profileImage: string;
}
