'use client';
import Link from 'next/link';
import { SocialIcons } from '@/components/icons/social';

import { Card, FadeIn, SectionTitle } from '../components/ui';
import { siteConfig } from '@/config/site';
import { education } from '@/data/education';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
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
} from 'lucide-react';
import { TypingTextStyled } from '@/components/typing-text';

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6">
      <Hero />
      <WhatIDo />
      <Projects />
      <Experience />
      <TechStack />
      <Education />
      <Contact />
    </main>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <div className="relative w-full h-auto">
      <section className="flex min-h-[85vh] flex-col justify-center py-32">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Available for new opportunities
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <TypingTextStyled text={`Software Engineer\n& Fullstack Developer`} />
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m <span className="font-semibold text-foreground">Huy Hoang</span> — a software
            engineer building scalable, high-performance web applications across frontend and
            backend, focused on clean architecture and modern technologies.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={`mailto:${siteConfig.links.email}`} className="button-primary">
              Get in touch <ArrowRight size={16} />
            </Link>
            <Link
              href={siteConfig.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              Resume <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex items-center gap-5">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Find me on
            </span>
            <div className="h-px w-8 bg-border" />
            <div className="flex items-center gap-4">
              {[
                {
                  href: siteConfig.links.github,
                  icon: <SocialIcons.Github size={18} />,
                  label: 'GitHub',
                },
                {
                  href: siteConfig.links.npm,
                  icon: <SocialIcons.PackageOpen size={18} />,
                  label: 'NPM',
                },
                {
                  href: `mailto:${siteConfig.links.email}`,
                  icon: <SocialIcons.Mail size={18} />,
                  label: 'Email',
                },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button h-10 w-10"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   WHAT I DO
   ═══════════════════════════════════════════ */
function WhatIDo() {
  const services = [
    {
      icon: <Globe size={22} />,
      title: 'Full-stack Web Development',
      desc: 'Building modern web applications with React, Next.js, and .NET / Node.js, focusing on performance and clean architecture.',
    },
    {
      icon: <Terminal size={22} />,
      title: 'Backend & System Design',
      desc: 'Designing scalable APIs, handling real-time data, and building reliable backend systems with PostgreSQL and message-driven architecture.',
    },
    {
      icon: <Zap size={22} />,
      title: 'Monitoring & Observability',
      desc: 'Developing monitoring systems using Prometheus, Grafana, and custom dashboards for real-time system insights and alerting.',
    },
    {
      icon: <Shield size={22} />,
      title: 'DevOps & Infrastructure',
      desc: 'Deploying and managing applications with Docker, CI/CD pipelines, and cloud-based environments.',
    },
  ];

  return (
    <section className="py-24">
      <SectionTitle sub="What I focus on and how I build systems">What I Do</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.06}>
            <div className="panel panel-hover flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {s.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS — Bento grid
   ═══════════════════════════════════════════ */
function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24">
      <SectionTitle sub="A selection of things I've built and shipped">Projects</SectionTitle>

      {/* Featured — full width hero cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        {featured.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.06}>
            <Card className="relative h-full border-primary/15 p-7 hover:border-primary/30">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Featured
              </span>
              <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
              </div>
              {p.href && (
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  View project <ExternalLink size={13} />
                </Link>
              )}
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Others — compact 3-col */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.04}>
            <Card className="h-full p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                {p.href && (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted-foreground transition hover:text-primary"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <TechBadge key={t} small>
                    {t}
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

/* ═══════════════════════════════════════════
   EXPERIENCE — Clean timeline
   ═══════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="py-24">
      <SectionTitle sub="My professional journey so far">Experience</SectionTitle>

      <div className="relative ml-4">
        {experience.map((job, i) => (
          <FadeIn key={i} delay={i * 0.05}>
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
                  {job.achievements.map((a) => (
                    <li
                      key={a}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/70" />
                      {a}
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

/* ═══════════════════════════════════════════
   TECH STACK — Horizontal rows
   ═══════════════════════════════════════════ */
const skillIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 size={16} />,
  Backend: <Server size={16} />,
  Frontend: <Layout size={16} />,
  DevOps: <Cloud size={16} />,
  Databases: <Database size={16} />,
  Testing: <TestTube size={16} />,
};

function TechStack() {
  return (
    <section id="skills" className="py-24">
      <SectionTitle sub="Technologies and tools I work with daily">Tech Stack</SectionTitle>

      <div className="space-y-4">
        {skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.04}>
            <div className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
              {/* Category label */}
              <div className="flex items-center gap-2.5 sm:w-36 sm:flex-shrink-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {skillIcons[group.category] || <Code2 size={16} />}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {group.category}
                </span>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-border bg-surface-strong px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    {s}
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

/* ═══════════════════════════════════════════
   EDUCATION
   ═══════════════════════════════════════════ */
function Education() {
  return (
    <section id="education" className="py-24">
      <SectionTitle>Education</SectionTitle>
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
                  {item.details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/70" />
                      {d}
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

/* ═══════════════════════════════════════════
   CONTACT CTA
   ═══════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="py-24">
      <FadeIn>
        <div className="panel relative overflow-hidden rounded-3xl px-8 py-20 text-center">
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <h2 className="relative text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Let&apos;s build something
            <br />
            <span className="text-primary">together</span>
          </h2>
          <p className="relative mt-4 text-sm text-muted-foreground">
            Open for full-time, contracting, or open source collaboration.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`mailto:${siteConfig.links.email}`} className="button-primary px-8">
              Say hello <ArrowRight size={16} />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary px-8"
            >
              GitHub <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */
function TechBadge({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span
      className={`rounded-md border border-primary/15 bg-primary/10 font-medium text-primary ${
        small ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
      } uppercase tracking-wide`}
    >
      {children}
    </span>
  );
}
