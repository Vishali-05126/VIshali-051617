"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, WifiOff, Zap } from "lucide-react";

const features = [
  {
    icon: <Lock className="h-8 w-8 text-accent" />,
    title: "True Privacy",
    description: "User data is too sensitive to ever leave the device. TripGuardian operates with on-device processing and RAM-only memory that auto-wipes.",
  },
  {
    icon: <WifiOff className="h-8 w-8 text-accent" />,
    title: "The 'Offline' Edge",
    description: "A tool for remote areas, subways, or disaster zones where the internet is dead.",
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Zero Latency",
    description: "Voice assistants and agents that react instantly because they live on the chip, not the server.",
  },
];

export default function Features() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Core Principles</CardTitle>
        <CardDescription>The technology that makes TripGuardian AI a reality.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-background/50">
            {feature.icon}
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
