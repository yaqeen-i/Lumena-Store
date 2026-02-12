import { GoogleGenAI, Chat } from "@google/genai";
import { getProducts } from "./api";

let chatSession: Chat | null = null;

const initializeChat = async () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    
    // Fetch products to give context to the AI
    const products = await getProducts();
    const productContext = JSON.stringify(products.map(p => ({
        id: p.id,
        name: p.title,
        price: p.price,
        category: p.category,
        description: p.description
    })));

    const systemInstruction = `
    You are a helpful and enthusiastic AI shopping assistant for 'Lumena Store'.
    Your goal is to help customers find products from our catalog.
    
    Here is our current product catalog in JSON format:
    ${productContext}

    Rules:
    1. Only recommend products from this catalog.
    2. If a user asks for something we don't have, politely suggest a similar item from the catalog or say we don't carry it.
    3. Keep responses concise and friendly.
    4. When recommending a product, mention its price and why it fits their request.
    5. Do not invent products not in the list.
    6. Format prices with a $ sign.
    `;

    chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction,
            temperature: 0.7,
        }
    });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!chatSession) {
        await initializeChat();
    }
    
    if (!chatSession) {
        return "Sorry, I'm having trouble connecting right now.";
    }

    try {
        const response = await chatSession.sendMessage({ message });
        return response.text || "I didn't catch that. Could you rephrase?";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm currently experiencing high traffic. Please try again later.";
    }
};
