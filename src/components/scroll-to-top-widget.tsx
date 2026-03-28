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
                'flex h-12 w-12 items-center justify-center  rounded-xl bg-blue-500/50 border border-blue-600 text-white shadow-lg shadow-blue-500/20transition-all duration-300 ease-in-out hover:bg-blue-600/75 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                isScrollTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
            )}
        >
            <ChevronUp size={20} />
        </button>
    );
}
