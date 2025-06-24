const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (domain, businessName, websiteType) => {
    console.log('Received request for logo generation', domain, businessName, websiteType, openai);
  const systemPrompt = "## 🧠 Logo Generator Agent — Model-Optimized System Prompt";
  const userPrompt = `Business Name: ${businessName}\nDomain: ${domain}\nStyle: ${websiteType}`;

  // Step 1: Generate logo concept from GPT
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  });

  const logoPrompt = chat.choices[0].message.content?.trim() || "";

  const safePrompt = logoPrompt.slice(0, 1000);
  if (logoPrompt.length > 1000) {
    console.warn("⚠️ DALL·E prompt exceeded 1000 characters. It was trimmed.");
  }

  // Step 2: Generate logo image from GPT description
  const image = await openai.images.generate({
    model: "dall-e-2",
    prompt: safePrompt,
    size: "1024x1024",
    n: 1
  });

  return image.data[0].url;
};