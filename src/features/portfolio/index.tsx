'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Card, FadeIn, SectionTitle } from '@/common/components/atoms';
import { siteConfig } from '@/common/configs/site';
import {
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  GraduationCap,
  Code2,
  Server,
  Layout,
  Cloud,
  Database,
  TestTube,
  Terminal,
  Zap,
  Globe,
  Shield,
  PackageOpenIcon,
  MailIcon,
} from 'lucide-react';
import { TypingTextStyled } from '@/features/portfolio/components/atoms';
import { GithubIcon } from '@/assets/icons';
import { PortfolioLayout } from '@/features/portfolio/components/templates';

const serviceIcons = [
  <Globe key="service-icon-0" size={22} />,
  <Terminal key="service-icon-1" size={22} />,
  <Zap key="service-icon-2" size={22} />,
  <Shield key="service-icon-3" size={22} />,
];

const skillIcons = [
  <Code2 key="skill-icon-0" size={16} />,
  <Layout key="skill-icon-1" size={16} />,
  <Server key="skill-icon-2" size={16} />,
  <Database key="skill-icon-3" size={16} />,
  <Cloud key="skill-icon-4" size={16} />,
  <TestTube key="skill-icon-5" size={16} />,
];

type ServiceItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  featured?: boolean;
  href?: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  achievements: string[];
};

type SkillGroup = {
  category: string;
  skills: string[];
  icon: ReactNode;
};

type EducationItem = {
  school: string;
  degree: string;
  period: string;
  details: string[];
};

function useServices(): ServiceItem[] {
  const t = useTranslations('home.services.items');

  return [
    {
      icon: serviceIcons[0],
      title: t('fullstack.title'),
      description: t('fullstack.description'),
    },
    {
      icon: serviceIcons[1],
      title: t('backend.title'),
      description: t('backend.description'),
    },
    {
      icon: serviceIcons[2],
      title: t('observability.title'),
      description: t('observability.description'),
    },
    {
      icon: serviceIcons[3],
      title: t('devops.title'),
      description: t('devops.description'),
    },
  ];
}

function useProjects(): ProjectItem[] {
  const t = useTranslations('home.projects.items');

  return [
    {
      title: t('aiLogMonitoring.title'),
      description: t('aiLogMonitoring.description'),
      tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prometheus', 'Grafana', 'Docker'],
      featured: true,
    },
    {
      title: t('networkMonitoring.title'),
      description: t('networkMonitoring.description'),
      tech: ['React', 'Node.js', 'Prometheus', 'Node Exporter', 'Recharts'],
      featured: true,
    },
    {
      title: t('librenmsDashboard.title'),
      description: t('librenmsDashboard.description'),
      tech: ['PHP', 'Laravel', 'Alpine.js', 'MySQL'],
    },
    {
      title: t('mqttAlarm.title'),
      description: t('mqttAlarm.description'),
      tech: ['Node.js', 'MQTT', 'Redis', 'PostgreSQL'],
    },
    {
      title: t('reusableUi.title'),
      description: t('reusableUi.description'),
      tech: ['React', 'TypeScript', 'Tailwind', 'shadcn/ui'],
    },
    {
      title: t('authSystem.title'),
      description: t('authSystem.description'),
      tech: ['.NET Core', 'PostgreSQL', 'JWT'],
    },
    {
      title: t('metricsDashboard.title'),
      description: t('metricsDashboard.description'),
      tech: ['React', 'Recharts', 'REST API'],
    },
  ];
}

function useExperience(): ExperienceItem[] {
  const t = useTranslations('home.experience.items');

  return [
    {
      company: t('selfProject.company'),
      role: t('selfProject.role'),
      period: t('selfProject.period'),
      achievements: [
        t('selfProject.achievement1'),
        t('selfProject.achievement2'),
        t('selfProject.achievement3'),
      ],
    },
    {
      company: t('upcomingBackend.company'),
      role: t('upcomingBackend.role'),
      period: t('upcomingBackend.period'),
      achievements: [t('upcomingBackend.achievement1'), t('upcomingBackend.achievement2')],
    },
    {
      company: t('upcomingFrontend.company'),
      role: t('upcomingFrontend.role'),
      period: t('upcomingFrontend.period'),
      achievements: [t('upcomingFrontend.achievement1'), t('upcomingFrontend.achievement2')],
    },
  ];
}

function useSkillGroups(): SkillGroup[] {
  const t = useTranslations('home.skills.groups');

  return [
    {
      category: t('languages.category'),
      skills: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'SQL'],
      icon: skillIcons[0],
    },
    {
      category: t('frontend.category'),
      skills: [
        'React',
        'Next.js',
        'Antd',
        'Material UI',
        'TailwindCSS',
        'Recharts',
        'TanStack',
        'Redux',
        'Zustand',
      ],
      icon: skillIcons[1],
    },
    {
      category: t('backend.category'),
      skills: ['Node.js', 'NestJS', '.NET Core', 'REST API', 'Laravel'],
      icon: skillIcons[2],
    },
    {
      category: t('databases.category'),
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'],
      icon: skillIcons[3],
    },
    {
      category: t('devops.category'),
      skills: ['Docker', 'GitLab CI', 'CI/CD', 'AWS', 'Linux'],
      icon: skillIcons[4],
    },
    {
      category: t('testing.category'),
      skills: ['Unit Testing', 'Integration Testing', 'E2E Testing'],
      icon: skillIcons[5],
    },
  ];
}

function useEducation(): EducationItem[] {
  const t = useTranslations('home.education.items.university');

  return [
    {
      school: t('school'),
      degree: t('degree'),
      period: t('period'),
      details: [t('detail1')],
    },
  ];
}

export default function HomePage() {
  return (
    <PortfolioLayout>
      <main className="relative mx-auto max-w-6xl px-6">
        <Hero />
        <WhatIDo />
        <Projects />
        <Experience />
        <TechStack />
        <Education />
        <Contact />
      </main>
    </PortfolioLayout>
  );
}

function Hero() {
  const t = useTranslations();

  return (
    <div className="relative h-auto w-full">
      <section className="flex min-h-[85vh] flex-col justify-center py-32">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t('home.hero.availability')}
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <TypingTextStyled text={t('home.hero.title')} />
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            {t('home.hero.intro', { name: t('common.name') })}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={`mailto:${siteConfig.links.email}`} className="button-primary">
              {t('common.actions.getInTouch')} <ArrowRight size={16} />
            </Link>
            <Link
              href={siteConfig.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              {t('common.actions.resume')} <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex items-center gap-5">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {t('common.social.findMeOn')}
            </span>
            <div className="h-px w-8 bg-border" />
            <div className="flex items-center gap-4">
              {[
                {
                  href: siteConfig.links.github,
                  icon: <GithubIcon width={18} height={18} />,
                  label: t('common.social.github'),
                },
                {
                  href: siteConfig.links.npm,
                  icon: <PackageOpenIcon size={18} />,
                  label: t('common.social.npm'),
                },
                {
                  href: `mailto:${siteConfig.links.email}`,
                  icon: <MailIcon size={18} />,
                  label: t('common.social.email'),
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-10 w-10"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

function WhatIDo() {
  const t = useTranslations('home.services');
  const services = useServices();

  return (
    <section className="py-24">
      <SectionTitle sub={t('subtitle')}>{t('title')}</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <FadeIn key={service.title} delay={index * 0.06}>
            <div className="panel panel-hover flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {service.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const t = useTranslations();
  const projectsT = useTranslations('home.projects');
  const projects = useProjects();
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-24">
      <SectionTitle sub={projectsT('subtitle')}>{projectsT('title')}</SectionTitle>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        {featured.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.06}>
            <Card className="relative h-full border-primary/15 p-7 hover:border-primary/30">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {projectsT('featuredLabel')}
              </span>
              <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
              {project.href && (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  {t('common.actions.viewProject')} <ExternalLink size={13} />
                </Link>
              )}
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((project, index) => (
          <FadeIn key={project.title} delay={index * 0.04}>
            <Card className="h-full p-5">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                {project.href && (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted-foreground transition hover:text-primary"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <TechBadge key={tech} small>
                    {tech}
                  </TechBadge>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const t = useTranslations('home.experience');
  const experience = useExperience();

  return (
    <section id="experience" className="py-24">
      <SectionTitle sub={t('subtitle')}>{t('title')}</SectionTitle>

      <div className="relative ml-4">
        {experience.map((job, index) => (
          <FadeIn key={`${job.company}-${job.role}-${index}`} delay={index * 0.05}>
            <div className="relative flex items-start justify-start">
              <div className="absolute bottom-0 left-0 top-0 w-6">
                <div className="absolute top-[1.7rem] z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="absolute bottom-0 left-3 top-0 z-10 w-px -translate-x-1/2 bg-border" />
              </div>
              <div className="ml-8 py-6 last:pb-0">
                <span className="mb-3 inline-flex rounded-lg border border-border/80 bg-surface/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {job.period}
                </span>

                <h3 className="text-base font-bold text-foreground">{job.role}</h3>
                <p className="text-sm font-medium text-primary">{job.company}</p>

                <ul className="mt-3 space-y-2">
                  {job.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/70" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function TechStack() {
  const t = useTranslations('home.skills');
  const groups = useSkillGroups();

  return (
    <section id="skills" className="py-24">
      <SectionTitle sub={t('subtitle')}>{t('title')}</SectionTitle>

      <div className="space-y-4">
        {groups.map((group, index) => (
          <FadeIn key={`${group.category}-${index}`} delay={index * 0.04}>
            <div className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5 sm:w-36 sm:flex-shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {group.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {group.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-surface-strong px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Education() {
  const t = useTranslations('home.education');
  const education = useEducation();

  return (
    <section id="education" className="py-24">
      <SectionTitle>{t('title')}</SectionTitle>
      {education.map((item) => (
        <FadeIn key={item.school}>
          <div className="panel flex items-start gap-4 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{item.degree}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin size={12} /> {item.school}
              </p>
              {item.details && (
                <ul className="mt-3 space-y-1.5">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/70" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </FadeIn>
      ))}
    </section>
  );
}

function Contact() {
  const t = useTranslations();

  return (
    <section id="contact" className="py-24">
      <FadeIn>
        <div className="panel relative overflow-hidden rounded-3xl px-8 py-20 text-center">
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <h2 className="relative text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t('home.contact.titleStart')}
            <br />
            <span className="text-primary">{t('home.contact.titleHighlight')}</span>
          </h2>
          <p className="relative mt-4 text-sm text-muted-foreground">
            {t('home.contact.description')}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`mailto:${siteConfig.links.email}`} className="button-primary px-8">
              {t('common.actions.sayHello')} <ArrowRight size={16} />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary px-8"
            >
              {t('common.actions.github')} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function TechBadge({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span
      className={`rounded-md border border-primary/15 bg-primary/10 font-medium text-primary ${small ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
        } uppercase tracking-wide`}
    >
      {children}
    </span>
  );
}
