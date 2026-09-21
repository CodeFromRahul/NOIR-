import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = "chat", systemPrompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on server." },
        { status: 500 }
      );
    }

    const defaultSystemInstruction =
      "You are the Maison NOIRÉ Master Chocolatier, Cacao Sommelier & Confectionery Scientist. You respond with dark luxury elegance, deep culinary expertise, and precise temperature/flavor insights. Keep responses polished, sensual, and engaging.";

    const instructions = systemPrompt || defaultSystemInstruction;

    // Try primary specified model, fallback to gemini-1.5-flash if model name differs
    let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      systemInstruction: {
        parts: [{ text: instructions }],
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    };

    let response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // Fallback try with gemini-1.5-flash if 2.5-flash alias requires v1beta
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      response = await fetch(fallbackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error Response:", errText);
      return NextResponse.json(
        { error: "Gemini API request failed", details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const candidateText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Our master chocolatiers are preparing your answer with care.";

    return NextResponse.json({
      text: candidateText,
      mode,
    });
  } catch (err: any) {
    console.error("Server API Route Error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
