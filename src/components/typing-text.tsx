'use client';
import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

export function TypingTextStyled({ text = '' }: { text: string }) {
  const splitIndex = text.indexOf('&');

  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && index <= text.length) {
      // typing
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, index));
        setIndex((prev) => prev + 1);
      }, 120);
    } else if (!isDeleting && index > text.length) {
      // pause sau khi gõ xong
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIndex(text.length - 1);
      }, 2000);
    } else if (isDeleting && index >= 0) {
      // deleting
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, index));
        setIndex((prev) => prev - 1);
      }, 60);
    } else if (isDeleting && index < 0) {
      // pause trước khi gõ lại
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex(0);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text]);

  return (
    <span>
      {displayed.split('').map((char, i) => {
        if (char === '\n') return <br key={i} />;
        return (
          <span key={i} className={cn(i >= splitIndex ? 'text-primary' : 'text-foreground')}>
            {char}
          </span>
        );
      })}
      <span className="animate-blink">|</span>
      {displayed.split('\n').length < 2 && <div>&nbsp;</div>}
    </span>
  );
}
