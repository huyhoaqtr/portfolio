export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
      <a className="font-medium text-primary hover:underline" href="/">
        Return home
      </a>
    </main>
  );
}
