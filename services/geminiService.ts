import { GoogleGenAI } from "@google/genai";
import { PROJECTS, BIO_DATA, SKILLS, SOFT_SKILLS, CREATIVE_SPOT } from "../constants";

// Construct a rich system prompt with all CV data
const SYSTEM_INSTRUCTION = `
Sei l'assistente virtuale del portfolio di Sabrina Detommaso, AI Automation Architect.
Il tuo compito è spiegare chi è Sabrina, le sue competenze e i suoi progetti ai visitatori del sito.
Usa un tono professionale, empatico ("Soft & Raffinato") ma tecnicamente preciso.

DATI DI SABRINA:
${JSON.stringify(BIO_DATA)}

COMPETENZE TECNICHE:
${JSON.stringify(SKILLS)}

SOFT SKILLS:
${JSON.stringify(SOFT_SKILLS)}

PROGETTI DI AUTOMAZIONE (n8n, Agents):
${JSON.stringify(PROJECTS)}

PROGETTO CREATIVO (Spot Pubblicitario):
${JSON.stringify(CREATIVE_SPOT)}

LINEE GUIDA:
1. Se ti chiedono un progetto specifico, riassumilo in modo semplice.
2. Se chiedono del "Video" o dello "Spot", spiega che Sabrina ha gestito l'intero ciclo creativo (Idea, Visual con Flow/Gemini, Audio con ElevenLabs, Editing) per un prodotto futuristico.
3. Enfatizza che Sabrina usa n8n, JavaScript (per i fix complessi) e AI Agents.
4. Se chiedono delle soft skills, cita come le ha sviluppate.
5. Sii conciso ma esaustivo.
6. Rispondi sempre in Italiano.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const client = getClient();
    
    // Convert history to format expected by the SDK
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Mi dispiace, non ho potuto generare una risposta.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Si è verificato un errore temporaneo con l'assistente AI. Riprova tra poco.";
  }
};