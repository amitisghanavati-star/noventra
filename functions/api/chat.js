const KNOWLEDGE_URL = "https://raw.githubusercontent.com/amitisghanavati-star/noventra/main/knowledge/noventra-library.json";

export async function onRequestPost({ request, env }) {
  try {
    const { message } = await request.json();

    if (typeof message !== "string" || !message.trim() || message.length > 5000) {
      return Response.json({ error: "پیام نامعتبر است یا بیش از حد طولانی است." }, { status: 400 });
    }

    if (!env.GEMINI_API_KEY) {
      return Response.json({ error: "کلید Gemini در تنظیمات سرور پیدا نشد." }, { status: 500 });
    }

    // Read the public NOVENTRA knowledge catalog from this repository.
    const knowledgeResponse = await fetch(KNOWLEDGE_URL, {
      headers: { "Accept": "application/json" },
      cf: { cacheTtl: 300, cacheEverything: true }
    });

    if (!knowledgeResponse.ok) {
      throw new Error("NOVENTRA knowledge catalog could not be loaded.");
    }

    const knowledge = await knowledgeResponse.json();

    const systemInstruction = `
You are NOVENTRA AI, the educational assistant for the NOVENTRA learning community.
Answer in the same language as the learner, usually Persian. Be clear, helpful, respectful, and step-by-step.

Use the NOVENTRA knowledge catalog below as the source of truth for site-specific facts:
${JSON.stringify(knowledge)}

Rules:
- Do not invent course availability, lesson contents, policies, URLs, or features.
- Distinguish published lessons from lessons listed as not yet published.
- If the catalog does not contain enough detail, say so and direct the learner to the relevant lesson file or instructor.
- You may answer general educational questions, but do not present general knowledge as an official NOVENTRA policy.
- Do not claim you opened private files or performed actions you did not perform.
- Never reveal API keys, secrets, or server configuration.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + encodeURIComponent(env.GEMINI_API_KEY),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts: [{ text: message.trim() }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 1536 }
        })
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return Response.json({
        error: data?.error?.message || `Gemini HTTP ${response.status}`
      }, { status: response.status });
    }

    const reply = (data?.candidates?.[0]?.content?.parts || [])
      .map(part => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      return Response.json({ error: "پاسخی از هوش مصنوعی دریافت نشد." }, { status: 502 });
    }

    return Response.json({ reply, engine: "gemini", knowledge: "noventra-repository" });
  } catch (error) {
    console.error("NOVENTRA AI request failed:", error?.message || error);
    return Response.json({ error: "ارتباط با دستیار هوشمند برقرار نشد." }, { status: 502 });
  }
}
