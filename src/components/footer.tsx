import { siteConfig } from '../config/site';

export function Footer() {
  return (
    <footer className="border-t border-border/80 py-10 text-center text-xs text-muted-foreground">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js 14, Tailwind, Framer
        Motion.
      </p>
    </footer>
  );
}
