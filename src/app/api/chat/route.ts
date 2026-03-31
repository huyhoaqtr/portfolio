import { NextRequest } from 'next/server';
import { hasLocale } from 'next-intl';
import { siteConfig } from '@/common/configs/site';
import { routing } from '@/i18n/routing';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  href?: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

interface EducationItem {
  school: string;
  degree: string;
  details?: string[];
}

interface SkillGroup {
  category: string;
  skills: string[];
}

interface LocaleMessages {
  home: {
    projects: { items: Record<string, ProjectItem> };
    experience: {
      items: Record<
        string,
        ExperienceItem & { achievement1?: string; achievement2?: string; achievement3?: string }
      >;
    };
    education: { items: { university: EducationItem & { detail1?: string } } };
    skills: { groups: Record<string, SkillGroup> };
  };
}

function getValue(obj: any, path: string) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function createTranslator(messages: any) {
  return (key: string, vars?: Record<string, string>) => {
    let text = getValue(messages, key) || key;

    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }

    return text;
  };
}

async function loadMessages(locale: string): Promise<LocaleMessages> {
  return (await import(`@/i18n/locales/${locale}.json`)).default as LocaleMessages;
}

function normalizeExperienceItem(
  item: ExperienceItem & { achievement1?: string; achievement2?: string; achievement3?: string },
): ExperienceItem {
  if (item.achievements) {
    return item;
  }

  return {
    company: item.company,
    role: item.role,
    period: item.period,
    achievements: [item.achievement1, item.achievement2, item.achievement3].filter(
      Boolean,
    ) as string[],
  };
}

async function buildContextSummary(locale: string) {
  const messages = await loadMessages(locale);
  const t = createTranslator(messages);
  const projects = Object.values(messages.home.projects.items);
  const experience = Object.values(messages.home.experience.items).map(normalizeExperienceItem);
  const education = [
    {
      ...messages.home.education.items.university,
      details:
        messages.home.education.items.university.details ??
        [messages.home.education.items.university.detail1].filter(Boolean),
    },
  ];
  const skills = Object.values(messages.home.skills.groups);
  console.log({ projects });

  const proj = projects
    .map(
      (p) =>
        `Title: ${p.title}\nDescription: ${p.description}\nTech: ${(p.tech || []).join(', ')}` +
        (p.href ? `\nLink: ${p.href}` : ''),
    )
    .join('\n---\n');

  const exp = experience
    .map(
      (e) =>
        `Company: ${e.company}\nRole: ${e.role}\nPeriod: ${e.period}\nHighlights: ${(e.achievements || []).join(' | ')}`,
    )
    .join('\n---\n');

  const edu = education
    .map(
      (e) => `School: ${e.school}\nDegree: ${e.degree}\nDetails: ${(e.details || []).join(' | ')}`,
    )
    .join('\n');

  const skillStr = skills.map((g) => `${g.category}: ${(g.skills || []).join(', ')}`).join(' | ');

  return [
    t('chat.system.intro', { name: siteConfig.name }),
    t('chat.system.siteDescription', { description: siteConfig.description }),
    t('chat.system.contact', { email: siteConfig.links.email }),
    t('chat.system.instructions'),
    t('chat.system.redirect'),
    t('chat.system.respondLanguage', { language: t('common.responseLanguage') }),
    `${t('chat.system.sections.projects')}:\n${proj}`,
    `${t('chat.system.sections.experience')}:\n${exp}`,
    `${t('chat.system.sections.education')}:\n${edu}`,
    `${t('chat.system.sections.skills')}:\n${skillStr}`,
  ].join('\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body?.messages || [];
    const locale = hasLocale(routing.locales, body?.locale) ? body.locale : routing.defaultLocale;
    const messagesData = await loadMessages(locale);
    const t = createTranslator(messagesData);

    const requestedProvider: string | undefined = body?.provider; // optional override from client
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // Provider resolution priority: explicit body.provider -> Gemini (if key) -> OpenAI (if key) -> fallback
    let provider: 'gemini' | 'openai' | 'fallback';
    if (requestedProvider === 'gemini' && geminiKey) provider = 'gemini';
    else if (requestedProvider === 'openai' && openaiKey) provider = 'openai';
    else if (geminiKey) provider = 'gemini';
    else if (openaiKey) provider = 'openai';
    else provider = 'fallback';

    if (provider === 'fallback') {
      const lastUser = [...messages].reverse().find((m) => m.role === 'user');
      const fallback = t('chat.fallbackReply', {
        summary: t('chat.fallbackSummary'),
        questionSuffix: lastUser ? t('chat.questionSuffix', { question: lastUser.content }) : '',
      });
      return new Response(JSON.stringify({ reply: fallback, fallback: true, provider }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = await buildContextSummary(locale);
    console.log(systemPrompt);

    const recent = messages.slice(-10);

    if (provider === 'openai') {
      const openAiMessages = [
        { role: 'system', content: systemPrompt },
        ...recent.map((m) => ({ role: m.role, content: m.content })),
      ];
      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: openAiMessages,
          temperature: 0.3,
        }),
      });
      if (!openAiRes.ok) {
        const errorText = await openAiRes.text();
        return new Response(
          JSON.stringify({ error: t('chat.openAiUpstreamError'), details: errorText, provider }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
      const data = await openAiRes.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || t('chat.noResponseGenerated');
      return new Response(JSON.stringify({ reply, provider, model: 'gpt-3.5-turbo' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Gemini provider path
    // Gemini does not support a system role the same way; include systemPrompt as an initial user instruction
    const geminiModel = body?.model || 'gemini-2.5-flash';
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;
    const geminiContents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      ...recent
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
    ];

    const geminiRes = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: geminiContents, generationConfig: { temperature: 0.3 } }),
    });
    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: t('chat.geminiUpstreamError'), details: errorText, provider }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
    const geminiData = await geminiRes.json();
    const reply =
      geminiData?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join('\n')
        .trim() || t('chat.noResponseGenerated');
    return new Response(JSON.stringify({ reply, provider, model: geminiModel }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    const fallbackTranslator = createTranslator(await loadMessages(routing.defaultLocale));
    return new Response(
      JSON.stringify({ error: e?.message || fallbackTranslator('chat.unexpectedError') }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export const runtime = 'nodejs';
