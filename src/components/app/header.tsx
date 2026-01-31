import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-4 border-b border-primary/10 bg-background/80 px-4 backdrop-blur-lg md:px-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
            <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter text-foreground">
          TripGuardian <span className="text-primary">AI</span>
        </h1>
      </div>
      <div className="ml-auto hidden md:block">
        <p className="text-sm text-muted-foreground">The first fully offline, self-aware tourist safety intelligence.</p>
      </div>
    </header>
  );
}
