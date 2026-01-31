'use server';
/**
 * @fileOverview Implements the Situational AI Reasoning flow for context-aware emergency responses.
 *
 * - situationalAIReasoning - A function that analyzes the current situation and provides tailored emergency responses.
 * - SituationalAIReasoningInput - The input type for the situationalAIReasoning function.
 * - SituationalAIReasoningOutput - The return type for the situationalAIReasoning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SituationalAIReasoningInputSchema = z.object({
  time: z.enum(['day', 'night']).describe('The time of day.'),
  motion: z.enum(['running', 'falling', 'still', 'walking']).describe('The current motion of the user.'),
  noise: z.enum(['panic', 'quiet', 'crowded']).describe('The ambient noise level.'),
  battery: z.enum(['low', 'medium', 'high']).describe('The current battery level of the device.'),
  userInput: z.string().describe('The user input or command.'),
});
export type SituationalAIReasoningInput = z.infer<typeof SituationalAIReasoningInputSchema>;

const SituationalAIReasoningOutputSchema = z.object({
  response: z.string().describe('The context-aware emergency response.'),
});
export type SituationalAIReasoningOutput = z.infer<typeof SituationalAIReasoningOutputSchema>;

export async function situationalAIReasoning(input: SituationalAIReasoningInput): Promise<SituationalAIReasoningOutput> {
  return situationalAIReasoningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'situationalAIReasoningPrompt',
  input: {schema: SituationalAIReasoningInputSchema},
  output: {schema: SituationalAIReasoningOutputSchema},
  prompt: `You are an AI safety assistant that adopts a specific persona based on the user's emergency situation to provide the most effective guidance. Your persona is sensor-driven and must happen offline and instantly.

  Analyze the following information:
  - Time: {{{time}}}
  - Motion: {{{motion}}}
  - Noise: {{{noise}}}
  - Battery Level: {{{battery}}}
  - User Input: {{{userInput}}}

  Based on the context, adopt one of the following personas:
  1.  **Calm Medical Professional**: If the user input suggests a health issue (e.g., 'I'm hurt', 'I can't breathe') or motion is 'falling'. Speak calmly, provide clear, step-by-step first-aid or assessment instructions. Prioritize user's stability.
  2.  **Firm Authority Voice**: If the noise level is 'panic' or 'crowded' with signs of distress (like 'help', 'unsafe'), or motion is 'running'. Your tone should be firm, clear, and directive to deter threats and guide the user to safety.
  3.  **Minimalist Instructor**: If the user seems to be panicking (e.g., incoherent input, 'panic' noise), provide very short, simple, and actionable commands. Repeat them if necessary. For example: "Breathe.", "Look for an exit.", "Call 911."

  Your response must start with the persona you've adopted in brackets, e.g., "[Calm Medical Professional]".

  Provide a concise and helpful response tailored to the user's specific circumstances from the perspective of your chosen persona.
  `,
});

const situationalAIReasoningFlow = ai.defineFlow(
  {
    name: 'situationalAIReasoningFlow',
    inputSchema: SituationalAIReasoningInputSchema,
    outputSchema: SituationalAIReasoningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
