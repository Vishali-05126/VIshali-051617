"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { situationalAIReasoning, type SituationalAIReasoningOutput } from "@/ai/flows/situational-ai-reasoning";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, Terminal } from "lucide-react";

const formSchema = z.object({
  userInput: z.string().min(1, "Please enter what's happening."),
  time: z.enum(['day', 'night']),
  motion: z.enum(['running', 'falling', 'still', 'walking']),
  noise: z.enum(['panic', 'quiet', 'crowded']),
  battery: z.enum(['low', 'medium', 'high']),
});

export default function SituationalAIReasoning() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SituationalAIReasoningOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "I feel unsafe",
      time: "night",
      motion: "walking",
      noise: "quiet",
      battery: "medium",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await situationalAIReasoning(values);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-xl">Situational AI Reasoning</CardTitle>
            <Bot className="h-6 w-6 text-accent" />
        </div>
        <CardDescription>
          Context-aware emergency responses. The same input can yield different guidance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's happening?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'I feel unsafe' or 'I am lost'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="day">Day</SelectItem><SelectItem value="night">Night</SelectItem></SelectContent>
                      </Select>
                  </FormItem>
              )}/>
              <FormField control={form.control} name="motion" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Motion</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                          <SelectContent>
                              <SelectItem value="running">Running</SelectItem>
                              <SelectItem value="falling">Falling</SelectItem>
                              <SelectItem value="still">Still</SelectItem>
                              <SelectItem value="walking">Walking</SelectItem>
                          </SelectContent>
                      </Select>
                  </FormItem>
              )}/>
              <FormField control={form.control} name="noise" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Noise</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                          <SelectContent>
                              <SelectItem value="panic">Panic</SelectItem>
                              <SelectItem value="quiet">Quiet</SelectItem>
                              <SelectItem value="crowded">Crowded</SelectItem>
                          </SelectContent>
                      </Select>
                  </FormItem>
              )}/>
              <FormField control={form.control} name="battery" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Battery</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                          <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                      </Select>
                  </FormItem>
              )}/>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Instant Guidance
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 rounded-lg border bg-card p-4 space-y-2">
            <h4 className="font-semibold text-lg flex items-center gap-2">
                <Terminal className="h-5 w-5"/>
                AI Response
            </h4>
            <p className="text-sm text-muted-foreground">{result.response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
