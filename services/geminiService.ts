import { GoogleGenAI } from "@google/genai";
import { DreamType } from '../types';

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const streamMathExplanation = async function* (
  type: DreamType,
  query: string
) {
  const client = getAiClient();
  
  const identityName = type === DreamType.FIRST 
    ? "The First Sophomore's Dream (integral of x^-x)" 
    : "The Second Sophomore's Dream (integral of x^x)";

  const systemPrompt = `
    You are a world-class mathematics professor explaining the "Sophomore's Dream" identities.
    Current Context: ${identityName}.
    
    Rules:
    1. Be concise but intuitive.
    2. Use plain text or standard unicode for math where possible.
    3. If the user asks for a proof, explain the substitution method x = exp(-u) clearly.
    4. Keep the tone inspiring and educational.
    5. Structure your response with clear paragraphs.
  `;

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt,
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response
      },
    });

    const result = await chat.sendMessageStream({ message: query });

    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I apologize, but I encountered an error connecting to the mathematical archives (API Error).";
  }
};
