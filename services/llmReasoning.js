import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

export async function generateAIInsights(primaryDriver) {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `
You are a financial analyst.

Explain WHY the portfolio performed this way.

STRICT RULES:
- Respond ONLY in valid JSON
- DO NOT include anything outside JSON
- Be concise
- Highlight ONE clear primary cause

Format:
{
  "summary": "short explanation",
  "main_reason": "primary cause"
}

Data:
${JSON.stringify(primaryDriver, null, 2)}
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

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        return {
          summary: parsed.summary || "No summary generated",
          main_reason: parsed.main_reason || "No main reason identified",
        };
      }

      throw new Error("No JSON found");
    } catch {
      return {
        summary: "AI response could not be parsed cleanly.",
        main_reason: content.slice(0, 200),
      };
    }
  } catch (error) {
    console.error("Groq AI Error:", error.message);

    return {
      summary: "AI failed",
      main_reason: "LLM error",
    };
  }
}
