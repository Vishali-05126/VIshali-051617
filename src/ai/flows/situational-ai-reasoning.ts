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
  prompt: `You are an AI safety assistant that provides context-aware emergency responses based on the user's situation.\
\
  Analyze the following information to determine the most appropriate response:\
  - Time: {{{time}}}\
  - Motion: {{{motion}}}\
  - Noise: {{{noise}}}\
  - Battery Level: {{{battery}}}\
  - User Input: {{{userInput}}}\
\
  Provide a concise and helpful response tailored to the user's specific circumstances. Consider the severity of the situation and offer guidance or assistance accordingly. \
\
  If the battery level is low, suggest actions to conserve battery. If the noise is 'panic', suggest ways to get to safety. If the motion is 'falling', call for help. \
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
