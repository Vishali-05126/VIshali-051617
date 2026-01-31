"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Rocket } from "lucide-react";

export default function Contest() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Trophy className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">Why You Can't Miss This</CardTitle>
            <CardDescription>A unique opportunity for developers and innovators.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-lg border bg-card/50">
          <Rocket className="h-8 w-8 text-primary mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Backed by Y-Combinator Founders</h3>
            <p className="text-sm text-muted-foreground">This event is supported by the team at RunAnywhere (YC W26). Top submissions don't just win cash; you get direct feedback and "Office Hours" with founders who are building the future of edge computing.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
