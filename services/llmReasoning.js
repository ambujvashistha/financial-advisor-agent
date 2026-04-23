import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

export async function generateAIInsights(impacts) {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `
You are a financial analyst.

Explain WHY the portfolio performed this way using causal reasoning.

Focus on:
- Which sector impacted the portfolio the MOST
- Why that sector moved (based on sentiment/change)
- Make it sound like a financial advisor explanation

STRICT RULES:
- Respond ONLY in valid JSON
- DO NOT include any explanation outside JSON
- Be specific (mention % change or exposure if possible)
- Highlight ONE primary cause clearly
- Keep it concise

Format:
{
  "summary": "short summary",
  "main_reason": "primary cause"
}

Data:
${JSON.stringify(impacts, null, 2)}
`;

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a financial analyst." },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices[0].message.content;

    // 🔥 Robust JSON extraction (handles messy model output)
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // extra safety: ensure keys exist
        return {
          summary: parsed.summary || "No summary generated",
          main_reason: parsed.main_reason || "No main reason identified",
        };
      }

      throw new Error("No JSON found");
    } catch (parseError) {
      return {
        summary: "AI response could not be parsed cleanly.",
        main_reason: content.slice(0, 200),
      };
    }
  } catch (error) {
    console.error("Groq AI Error:", error.message);

    return {
      summary: parsed.summary || "No summary generated",
      main_reason:
        typeof parsed.main_reason === "string"
          ? parsed.main_reason
          : parsed.main_reason?.reason || "No main reason identified",
    };
  }
}
