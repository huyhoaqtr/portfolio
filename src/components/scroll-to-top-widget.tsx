import { ChevronUp } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { cn } from '@/lib/cn';

export default function ScrollToTop() {
  const { isScrollTopVisible } = useApp();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'button-primary h-12 w-12 p-0 flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105',
        isScrollTopVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12 pointer-events-none',
      )}
    >
      <ChevronUp size={20} />
    </button>
  );
}
