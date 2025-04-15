import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in environment variables');
}

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function getResponse(prompt) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are JARVIS, a helpful AI assistant. Respond concisely in 1-2 sentences unless more detail is specifically requested."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            stream: false
        });

        if (!chatCompletion?.choices?.[0]?.message?.content) {
            throw new Error('No content received from API');
        }

        return chatCompletion.choices[0].message.content;

    } catch (error) {
        console.error('Groq API Error:', error);
        return "I encountered an error processing your request. Please try again.";
    }
}

export default getResponse;