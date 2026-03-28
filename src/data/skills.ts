export interface SkillGroup {
  category: string;
  skills: string[];
}
export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'SQL'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Antd', 'Material UI', 'TailwindCSS', 'Recharts', 'TanStack', 'Redux', 'Zustand'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'NestJS', '.NET Core', 'REST API', 'Laravel'],
  },
  {
    category: 'Databases & Cache',
    skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'],
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'GitLab CI', 'CI/CD', 'AWS', 'Linux'],
  },
];
