'use server';

/**
 * @fileOverview Implements deterministic zero-latency response flow for providing near-instantaneous guidance in emergencies.
 *
 * - deterministicZeroLatencyResponse - A function that provides guidance based on user input and situational context.
 * - DeterministicZeroLatencyResponseInput - The input type for the deterministicZeroLatencyResponse function.
 * - DeterministicZeroLatencyResponseOutput - The return type for the deterministicZeroLatencyResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeterministicZeroLatencyResponseInputSchema = z.object({
  userInput: z.string().describe('The user input or query.'),
  time: z.string().describe('The current time (night/day).'),
  motion: z.string().describe('The user motion (running/falling/still).'),
  noise: z.string().describe('The ambient noise (panic/quiet).'),
  battery: z.string().describe('The battery level (low/normal/high).'),
});
export type DeterministicZeroLatencyResponseInput = z.infer<typeof DeterministicZeroLatencyResponseInputSchema>;

const DeterministicZeroLatencyResponseOutputSchema = z.object({
  guidance: z.string().describe('The immediate guidance provided to the user.'),
});
export type DeterministicZeroLatencyResponseOutput = z.infer<typeof DeterministicZeroLatencyResponseOutputSchema>;

export async function deterministicZeroLatencyResponse(input: DeterministicZeroLatencyResponseInput): Promise<DeterministicZeroLatencyResponseOutput> {
  return deterministicZeroLatencyResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'deterministicZeroLatencyResponsePrompt',
  input: {schema: DeterministicZeroLatencyResponseInputSchema},
  output: {schema: DeterministicZeroLatencyResponseOutputSchema},
  prompt: `You are TripGuardian AI, an AI safety assistant. You respond to user queries or detected emergencies with near-instantaneous speed, providing critical guidance without delay.

  Based on the user input and the current situational context, provide immediate guidance to the user. Keep the response concise and direct.

  User Input: {{{userInput}}}
  Time: {{{time}}}
  Motion: {{{motion}}}
  Noise: {{{noise}}}
  Battery: {{{battery}}}
  `,
});

const deterministicZeroLatencyResponseFlow = ai.defineFlow(
  {
    name: 'deterministicZeroLatencyResponseFlow',
    inputSchema: DeterministicZeroLatencyResponseInputSchema,
    outputSchema: DeterministicZeroLatencyResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
