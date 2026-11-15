export async function onRequestPost({ request, env }) {
  try {
    if (!env.GEMINI_API_KEY) {
      return Response.json({ error: "کلید Gemini در تنظیمات سرور پیدا نشد." }, { status: 500 });
    }

    const { message } = await request.json();
    if (typeof message !== "string" || !message.trim() || message.length > 5000) {
      return Response.json({ error: "پیام نامعتبر است یا بیش از حد طولانی است." }, { status: 400 });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + encodeURIComponent(env.GEMINI_API_KEY),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: "You are NOVENTRA AI, the helpful and welcoming assistant for the NOVENTRA learning community. Reply in the same language as the user, usually Persian. Answer questions clearly and accurately, with a warm, respectful tone. You may answer general educational questions and help users understand NOVENTRA's branches: sewing, cooking, programming, and human languages. Do not claim to have inspected files or performed actions you have not performed. Do not analyze uploaded lesson notes or grade, check, or evaluate students' homework. If you do not know something, say so plainly rather than inventing details. Do not reveal or discuss API keys or server secrets."
            }]
          },
          contents: [{ role: "user", parts: [{ text: message.trim() }] }]
        })
      }
    );

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json({ error: "ارتباط با دستیار هوشمند برقرار نشد." }, { status: 500 });
  }
}
