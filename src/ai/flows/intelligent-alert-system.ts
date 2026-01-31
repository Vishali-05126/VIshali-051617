'use server';

/**
 * @fileOverview A flow for providing intelligent, context-aware alerts to the user.
 *
 * - intelligentAlert - A function that determines and provides safety alerts based on context.
 * - IntelligentAlertInput - The input type for the intelligentAlert function.
 * - IntelligentAlertOutput - The return type for the intelligentAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentAlertInputSchema = z.object({
  time: z.string().describe('The current time (e.g., night, day).'),
  motion: z.string().describe("The user's current motion (e.g., running, walking, still, falling)."),
  noise: z.string().describe("The ambient noise level (e.g., quiet, crowded, panic)."),
  battery: z.string().describe('The device battery level (e.g., low, medium, high).'),
  locationContext: z.string().describe("Context of the user's location (e.g. known route, unfamiliar area, isolated)."),
  voiceStressLevel: z.string().describe("The user's voice stress level (e.g. normal, elevated, stressed)"),
  movementPattern: z.string().describe("The user's movement pattern (e.g. normal, erratic, sudden stop)"),
});
export type IntelligentAlertInput = z.infer<typeof IntelligentAlertInputSchema>;

const IntelligentAlertOutputSchema = z.object({
  alertType: z.string().describe('The type of alert to display (e.g., pre-risk, behavioral anomaly, medical-emergency, silent SOS, dead-zone emergency, false-alarm suppression).'),
  alertMessage: z.string().describe('The message to display to the user.'),
  urgency: z.string().describe('The urgency of the alert (e.g., low, medium, high).'),
  additionalGuidance: z.string().optional().describe('Any additional guidance for the user, based on the situation'),
});
export type IntelligentAlertOutput = z.infer<typeof IntelligentAlertOutputSchema>;

export async function intelligentAlert(input: IntelligentAlertInput): Promise<IntelligentAlertOutput> {
  return intelligentAlertFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentAlertPrompt',
  input: {schema: IntelligentAlertInputSchema},
  output: {schema: IntelligentAlertOutputSchema},
  prompt: `You are an AI safety assistant providing context-aware safety alerts to tourists.

  Based on the following context, determine the appropriate alert type, message, and urgency. Provide additional guidance if necessary.

  Time: {{{time}}}
  Motion: {{{motion}}}
  Noise: {{{noise}}}
  Battery: {{{battery}}}
  Location Context: {{{locationContext}}}
  Voice Stress Level: {{{voiceStressLevel}}}
  Movement Pattern: {{{movementPattern}}}

  Consider these alert types:
  - pre-risk: triggered by night travel + unfamiliar route, prolonged isolation, repeated wrong turns, sudden stress in voice.
  - behavioral anomaly: triggered by sudden running, long immobility, rapid direction changes, device dropped / impact detected.
  - medical-emergency: triggered by signs of a health crisis, such as a fall followed by immobility, or high voice stress combined with no movement. The AI should guide the user through initial assessment and contact emergency services if needed.
  - silent SOS: for situations where the user cannot speak or tap, activated by shake pattern, voice stress keyword, or repeated power-button press.
  - dead-zone emergency: triggered when no network is detected.
  - false-alarm suppression: triggered when the situation is determined to be safe.

  Prioritize alerts that prevent panic and provide clear, actionable guidance.

  Ensure the alert is relevant to the specific situation and provides a sense of calm reassurance rather than alarm, unless immediate action is necessary.

  Output the alert type, message, urgency and additional guidance.
`,
});

const intelligentAlertFlow = ai.defineFlow(
  {
    name: 'intelligentAlertFlow',
    inputSchema: IntelligentAlertInputSchema,
    outputSchema: IntelligentAlertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
