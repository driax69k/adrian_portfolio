import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'layout',
    description: 'Interfaces that feel fast, clear, and considered.',
    skills: [
      { name: 'HTML', icon: 'html', color: '#f97316' },
      { name: 'CSS', icon: 'css', color: '#38bdf8' },
      { name: 'JavaScript', icon: 'javascript', color: '#facc15' },
      { name: 'TypeScript', icon: 'typescript', color: '#60a5fa' },
      { name: 'React', icon: 'react', color: '#22d3ee' },
      { name: 'Next.js', icon: 'next', color: '#e2e8f0' },
      { name: 'Tailwind CSS', icon: 'tailwind', color: '#2dd4bf' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'server',
    description: 'Practical services, APIs, and application logic.',
    skills: [
      { name: 'Python', icon: 'python', color: '#facc15' },
      { name: 'Node.js', icon: 'node', color: '#86efac' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: 'mobile',
    description: 'Cross-platform experiences designed for real use.',
    skills: [
      { name: 'Flutter', icon: 'flutter', color: '#38bdf8' },
      { name: 'Dart', icon: 'dart', color: '#60a5fa' },
    ],
  },
  {
    id: 'database-cloud',
    name: 'Databases & Cloud',
    icon: 'database',
    description: 'Data layers and cloud tools for connected products.',
    skills: [
      { name: 'Supabase', icon: 'supabase', color: '#34d399' },
      { name: 'Firebase', icon: 'firebase', color: '#fbbf24' },
      { name: 'PostgreSQL', icon: 'postgresql', color: '#60a5fa' },
      { name: 'MySQL', icon: 'mysql', color: '#38bdf8' },
    ],
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    icon: 'ai',
    description: 'AI assistants for coding, research, and creative work.',
    skills: [
      { name: 'Codex', icon: 'codex', color: '#e2e8f0' },
      { name: 'Claude', icon: 'claude', color: '#d97757' },
      { name: 'Gemini', icon: 'gemini', color: '#8ab4f8' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'tools',
    description: 'Daily tools for designing, building, and shipping.',
    skills: [
      { name: 'Git', icon: 'git', color: '#fb7185' },
      { name: 'GitHub', icon: 'github', color: '#e2e8f0' },
      { name: 'VS Code', icon: 'vscode', color: '#38bdf8' },
      { name: 'Figma', icon: 'figma', color: '#c084fc' },
      { name: 'Vercel', icon: 'vercel', color: '#e2e8f0' },
      { name: 'Antigravity', icon: 'antigravity', color: '#c084fc' },
      { name: 'Cursor', icon: 'cursor', color: '#e2e8f0' },
    ],
  },
];
