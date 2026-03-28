export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Self-initiated Project',
    role: 'Full-stack Engineer',
    period: '2025 – Present',
    achievements: [
      'Building a real-time monitoring system with alerting and visualization dashboard',
      'Designing scalable backend services and API architecture',
      'Implementing frontend dashboard with modern UI components',
    ],
  },
  {
    company: 'Upcoming Project',
    role: 'Backend Engineer',
    period: '2025',
    achievements: [
      'Designing a system for processing real-time data streams and event-driven architecture',
      'Planning integration with messaging protocols and caching strategies',
    ],
  },
  {
    company: 'Upcoming Project',
    role: 'Frontend Engineer',
    period: '2025',
    achievements: [
      'Developing reusable UI components and dashboard interfaces',
      'Focusing on performance optimization and user experience improvements',
    ],
  },
];
