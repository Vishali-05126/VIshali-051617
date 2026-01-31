import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-accent" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
          TripGuardian AI
        </h1>
      </div>
      <div className="ml-auto hidden md:block">
        <p className="text-sm text-muted-foreground">The first fully offline, self-aware tourist safety intelligence.</p>
      </div>
    </header>
  );
}
