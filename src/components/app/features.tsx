"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints, Sparkles, Theater } from "lucide-react";

const features = [
  {
    icon: <Footprints className="h-8 w-8 text-primary" />,
    title: "Predictive Danger Shadow",
    description: "Our AI doesn’t just react to danger; it forecasts it. By running local forward-simulations, it visualizes a 'danger shadow' map of potential risks.",
  },
  {
    icon: <Theater className="h-8 w-8 text-primary" />,
    title: "Consent-Locked Emergency Persona",
    description: "During an emergency, the AI instantly changes its persona—from a calm medical professional to a firm authority—based on real-time sensor data, not just prompts.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Self-Evolving Safety Intelligence",
    description: "Every TripGuardian becomes better and more personalized for its user over time. It learns user comfort thresholds and alert sensitivity locally, without ever uploading data.",
  },
];

export default function Features() {
  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-xl">System-Level Innovations</CardTitle>
        <CardDescription>Novel, local-AI-only features that are impossible on the cloud.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-start text-left gap-4 p-6 rounded-lg border border-primary/10 bg-card hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300">
            {feature.icon}
            <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
