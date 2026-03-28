'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { BotIcon, Send } from 'lucide-react';
import { useLocale, useTranslations } from '@/context/locale-context';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  fallback?: boolean;
}

const markdownComponents: Components = {
  code(codeProps) {
    const { inline, className, children, ...rest } = codeProps as any;
    const lang = /language-(\w+)/.exec(className || '')?.[1];

    if (inline) {
      return (
        <code
          className="rounded bg-surface-muted px-1 py-0.5 text-[11px] text-foreground"
          {...rest}
        >
          {children}
        </code>
      );
    }

    return (
      <pre
        className="mt-2 max-h-52 overflow-auto rounded-md border border-border/70 bg-surface-strong p-3 text-[11px] text-foreground"
        data-lang={lang}
        {...rest}
      >
        <code>{children}</code>
      </pre>
    );
  },
  a({ children, href, ...props }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted underline-offset-2 hover:text-primary"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul({ children, ...props }) {
    return (
      <ul className="mb-2 ml-4 list-disc space-y-1" {...props}>
        {children}
      </ul>
    );
  },
  ol({ children, ...props }) {
    return (
      <ol className="mb-2 ml-4 list-decimal space-y-1" {...props}>
        {children}
      </ol>
    );
  },
  strong({ children, ...props }) {
    return (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    );
  },
  p({ children, ...props }) {
    return (
      <p className="mb-2 last:mb-0" {...props}>
        {children}
      </p>
    );
  },
};

function TypingIndicator() {
  const t = useTranslations('chat');

  return (
    <div className="mr-auto flex items-center gap-2 rounded-lg bg-surface-strong px-3 py-2 text-xs text-muted-foreground">
      <span>{t('thinking')}</span>
      <span className="inline-flex gap-1">
        <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:120ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:240ms]" />
      </span>
    </div>
  );
}

export function ChatWidget() {
  const { locale } = useLocale();
  const t = useTranslations();
  const welcomeMessage = t('chat.welcome');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: welcomeMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
    setInput('');
    setLoading(false);
  }, [welcomeMessage]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 680);
    };

    const timeout = setTimeout(handleResize, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const submit = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((current) => [...current, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], locale }),
      });
      const data = await res.json();

      if (data.reply) {
        setMessages((current) => [
          ...current,
          { role: 'assistant', content: data.reply, fallback: data.fallback },
        ]);
      } else if (data.error) {
        setMessages((current) => [
          ...current,
          { role: 'assistant', content: t('chat.apiError', { message: data.error }) },
        ]);
      }
    } catch (error: any) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: t('chat.networkError', {
            message: error?.message || t('chat.unknownError'),
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, locale, messages, t]);

  const onKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? t('chat.close') : t('chat.open')}
        className="button-primary flex h-12 w-12 items-center justify-center p-0 hover:scale-105"
      >
        <span className="relative z-10 select-none font-semibold tracking-wide">
          {open ? '✕' : <BotIcon />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-5 z-50 flex w-80 flex-col overflow-hidden rounded-xl border border-border/80 bg-background/95 shadow-[0_24px_60px_-36px_hsl(var(--foreground)/0.45)] backdrop-blur-lg"
          >
            <div className="flex items-center justify-between border-b border-border/80 px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground">
              <span>{t('chat.assistantTitle')}</span>
              <button
                onClick={() => setMessages([{ role: 'assistant', content: welcomeMessage }])}
                className="rounded px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground transition hover:bg-surface-strong hover:text-foreground"
              >
                {t('chat.reset')}
              </button>
            </div>
            <div
              ref={listRef}
              className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3 text-sm"
            >
              {messages.map((message, index) => {
                const baseUser =
                  'ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-xs whitespace-pre-wrap text-primary-foreground shadow shadow-primary/20';
                const baseAssistant =
                  'mr-auto max-w-[90%] rounded-lg bg-surface-strong px-3 py-2 text-[13px] leading-relaxed text-foreground';

                return (
                  <div
                    key={`${message.role}-${index}-${message.content.slice(0, 24)}`}
                    className={message.role === 'user' ? baseUser : baseAssistant}
                  >
                    {message.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                );
              })}
              {loading && <TypingIndicator />}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
              className="border-t border-border/80 p-2"
            >
              <div className="flex items-end gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onKey}
                  placeholder={t('chat.placeholder')}
                  className="max-h-24 flex-1 resize-none rounded-md border border-border bg-surface px-2 py-2 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring/40"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-40"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
