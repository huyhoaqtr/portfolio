export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  stars?: number;
  featured?: boolean;
}

export const projects: ProjectItem[] = [
  {
    title: 'AI Log Monitoring System',
    description:
      'A real-time log monitoring system with anomaly detection, alerting, and visualization dashboard. Designed to process syslog data and provide insights using AI.',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prometheus', 'Grafana', 'Docker'],
    featured: true,
  },
  {
    title: 'Network Monitoring Platform',
    description:
      'A full-stack monitoring platform for tracking server health, ports, processes, and system metrics with real-time alerts and customizable thresholds.',
    tech: ['React', 'Node.js', 'Prometheus', 'Node Exporter', 'Recharts'],
    featured: true,
  },
  {
    title: 'LibreNMS Custom Dashboard',
    description:
      'Customized LibreNMS interface with improved UI/UX, advanced search features, and SSO authentication integration.',
    tech: ['PHP', 'Laravel', 'Alpine.js', 'MySQL'],
  },
  {
    title: 'MQTT Alarm Processing System',
    description:
      'A system for processing real-time MQTT alarm data, mapping error definitions, and storing structured alerts for monitoring applications.',
    tech: ['Node.js', 'MQTT', 'Redis', 'PostgreSQL'],
  },
  {
    title: 'Reusable React UI Components',
    description:
      'A collection of reusable UI components including Tree View, tables, and dashboards built with modern design systems.',
    tech: ['React', 'TypeScript', 'Tailwind', 'shadcn/ui'],
  },
  {
    title: 'Authentication System with JWT & Refresh Token',
    description:
      'Secure authentication system with access/refresh tokens, cookie-based storage, and automatic token renewal.',
    tech: ['.NET Core', 'PostgreSQL', 'JWT'],
  },
  {
    title: 'System Metrics Visualization Dashboard',
    description:
      'Interactive dashboard for visualizing CPU, memory, disk, and network metrics using modern chart libraries.',
    tech: ['React', 'Recharts', 'REST API'],
  },
];
