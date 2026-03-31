'use client';

import { ChatWidget } from '@/common/components/atoms/widget/chat-widget';
import ScrollToTop from '@/common/components/atoms/widget/scroll-to-top';
import { cn } from '@/lib/cn';
import { useAppSelector } from '@/redux/store/hooks';

export const WidgetGroup = () => {
  const isScrollTopVisible = useAppSelector((state) => state.layout.isScrollTopVisible);

  return (
    <div
      className={cn(
        'fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 transition-all duration-300 ease-in-out',
        isScrollTopVisible ? 'translate-y-0' : 'translate-y-14',
      )}
    >
      <ChatWidget />
      <ScrollToTop />
    </div>
  );
};

