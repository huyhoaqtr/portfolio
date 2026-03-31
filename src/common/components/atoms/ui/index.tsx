import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay }}
  >
    {children}
  </motion.div>
);

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('panel card-hover group relative overflow-hidden p-5', className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{children}</h2>
    {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
  </div>
);
