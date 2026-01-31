'use server';

/**
 * @fileOverview A Genkit flow that proactively detects potential risks based on travel patterns and provides pre-emptive safety guidance.
 *
 * - cognitiveTravelMode - A function that initiates the cognitive travel mode and provides safety guidance.
 * - CognitiveTravelModeInput - The input type for the cognitiveTravelMode function.
 * - CognitiveTravelModeOutput - The return type for the cognitiveTravelMode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CognitiveTravelModeInputSchema = z.object({
  timeOfDay: z
    .string()
    .describe('The time of day (e.g., morning, afternoon, evening, night).'),
  routeFamiliarity: z
    .string()
    .describe('How familiar the tourist is with the current route (e.g., familiar, unfamiliar).'),
  locationIsolation: z
    .string()
    .describe('The level of isolation of the current location (e.g., crowded, isolated).'),
  recentStressLevel: z
    .string()
    .describe('The recent stress level of the tourist (e.g., calm, stressed).'),
});
export type CognitiveTravelModeInput = z.infer<typeof CognitiveTravelModeInputSchema>;

const CognitiveTravelModeOutputSchema = z.object({
  riskLevel: z
    .string()
    .describe('The assessed risk level based on the travel context (e.g., low, medium, high).'),
  safetyGuidance: z
    .string()
    .describe('Specific safety guidance based on the assessed risk level and travel context.'),
});
export type CognitiveTravelModeOutput = z.infer<typeof CognitiveTravelModeOutputSchema>;

export async function cognitiveTravelMode(
  input: CognitiveTravelModeInput
): Promise<CognitiveTravelModeOutput> {
  return cognitiveTravelModeFlow(input);
}

const cognitiveTravelModePrompt = ai.definePrompt({
  name: 'cognitiveTravelModePrompt',
  input: {schema: CognitiveTravelModeInputSchema},
  output: {schema: CognitiveTravelModeOutputSchema},
  prompt: `You are an AI safety assistant for tourists. Analyze the tourist's current travel context and provide a risk assessment and safety guidance.

  Consider the following factors:
  - Time of day: {{{timeOfDay}}}
  - Route familiarity: {{{routeFamiliarity}}}
  - Location isolation: {{{locationIsolation}}}
  - Recent stress level: {{{recentStressLevel}}}

  Based on these factors, determine the risk level (low, medium, or high) and provide specific safety guidance tailored to the situation. The guidance should be concise and actionable.

  Risk Level:
  Safety Guidance: `,
});

const cognitiveTravelModeFlow = ai.defineFlow(
  {
    name: 'cognitiveTravelModeFlow',
    inputSchema: CognitiveTravelModeInputSchema,
    outputSchema: CognitiveTravelModeOutputSchema,
  },
  async input => {
    const {output} = await cognitiveTravelModePrompt(input);
    return output!;
  }
);
