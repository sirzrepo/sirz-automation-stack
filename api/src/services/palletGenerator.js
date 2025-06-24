const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (businessName, websiteDesc) => {
    console.log('Received request for color palette generation', businessName, websiteDesc, openai);
  const systemPrompt = `## 🎨 Font & Color Palette Generator Agent — System Prompt (Ultra-Compact & Visually Accurate)\n**Style:** "Modern Design"`;
  const userPrompt = `Business Name: ${businessName}\nWebsite Description: ${websiteDesc}`;

  // Step 1: Generate color palette and font guide
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  });

  const colorPalette = chat.choices[0].message.content?.trim() || "";

  const safePrompt = colorPalette.slice(0, 1000);
  if (colorPalette.length > 1000) {
    console.warn("⚠️ DALL·E prompt exceeded 1000 characters. It was trimmed.");
  }

  return safePrompt;
};