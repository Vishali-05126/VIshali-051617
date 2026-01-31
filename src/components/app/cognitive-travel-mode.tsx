"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cognitiveTravelMode, type CognitiveTravelModeOutput } from "@/ai/flows/cognitive-travel-mode";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, Loader2, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  timeOfDay: z.string(),
  routeFamiliarity: z.string(),
  locationIsolation: z.string(),
  recentStressLevel: z.string(),
});

export default function CognitiveTravelMode() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CognitiveTravelModeOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeOfDay: "evening",
      routeFamiliarity: "unfamiliar",
      locationIsolation: "isolated",
      recentStressLevel: "calm",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await cognitiveTravelMode(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      // You could add a toast notification here for errors
    } finally {
      setIsLoading(false);
    }
  }

  const getRiskBadgeVariant = (riskLevel: string | undefined) => {
    switch (riskLevel?.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl">Cognitive Travel Mode™</CardTitle>
            <BrainCircuit className="h-6 w-6 text-accent" />
        </div>
        <CardDescription>
          AI thinks ahead based on your travel context to provide pre-emptive safety guidance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="timeOfDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Day</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select time..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="routeFamiliarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Familiarity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select familiarity..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="familiar">Familiar</SelectItem>
                        <SelectItem value="unfamiliar">Unfamiliar</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationIsolation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Isolation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select isolation..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="crowded">Crowded</SelectItem>
                        <SelectItem value="isolated">Isolated</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recentStressLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Stress Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select stress level..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="calm">Calm</SelectItem>
                        <SelectItem value="stressed">Stressed</SelectItem>
                        <SelectItem value="elevated">Elevated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Assess Risk
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5"/>
                    Risk Assessment
                </h4>
                <Badge variant={getRiskBadgeVariant(result.riskLevel)}>{result.riskLevel}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{result.safetyGuidance}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
