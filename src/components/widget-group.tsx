import { ChatWidget } from '@/components/chat-widget'
import ScrollToTop from '@/components/scroll-to-top-widget'
import { useApp } from '@/context/app-context'
import { cn } from '@/lib/cn'
import React from 'react'

type Props = {}

const WidgetGroup = (props: Props) => {
    const { isScrollTopVisible } = useApp();
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
}

export default WidgetGroup