import { NextRequest, NextResponse } from "next/server";

// Define types for the request and response
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  messages: ChatMessage[];
};

type ChatResponse = {
  id: string;
  role: "assistant";
  content: string;
};

// PharmaEco context for the AI
const PHARMAECO_CONTEXT = `
You are a helpful assistant for PharmaEco, a pharmacy service that offers medication disposal, prescription services, and health consultations. Keep all responses brief, direct, and focused on PharmaEco's services.

PharmaEco Services:
- Safe medication disposal bins for unused/expired medications
- Prescription refill and transfer services
- Medication consultation
- Health screenings (blood pressure, diabetes, cholesterol)
- Vaccination services
- Multiple locations across the country

Always be professional, concise (2-3 sentences max), and helpful. Don't use asterisks or special formatting. Focus on providing practical information about PharmaEco's services.
`;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = (await req.json()) as ChatRequest;

    // Extract the latest user message
    const latestMessage = body.messages.filter((m) => m.role === "user").pop();

    if (!latestMessage) {
      throw new Error("No user message found");
    }

    // Create prompt with context and conversation history
    const conversationHistory = body.messages
      .slice(-5) // Only use last 5 messages for context
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `${PHARMAECO_CONTEXT}\n\nConversation history:\n${conversationHistory}\n\nUser: ${latestMessage.content}\nAssistant:`;

    // Call the Gemini API
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100, // Limit response length
            topP: 0.95,
          },
        }),
      }
    );

    // Check if the fetch was successful
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    let replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    // Clean up the response (remove any leading "Assistant:" that might be included)
    replyText = replyText.replace(/^Assistant:\s*/i, "").trim();

    // Remove any asterisks or markdown formatting
    replyText = replyText.replace(/\*/g, "");

    // Format the response to match what useChat expects
    const response: ChatResponse = {
      id: Date.now().toString(),
      role: "assistant",
      content: replyText,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
