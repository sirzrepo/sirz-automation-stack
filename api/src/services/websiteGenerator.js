const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (businessDescription, domain, websiteDesc) => {
    console.log('********************* Received request for website generation ************************', businessDescription, domain, websiteDesc, openai);
  const systemPrompt = "## 🖼 Website Designer Agent — System Prompt (Ultra-Compact & Visually Accurate)";
  const userPrompt = `${businessDescription}\nDomain: ${domain}\nWebsite Description: ${websiteDesc}`;

  // Step 1: Generate website concept from GPT
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  });

//   const websiteDescription = chat.choices[0].message.content;
const websiteDescription = chat.choices[0].message.content?.trim() || "";
console.log('Website description generated:', websiteDescription);

  // Step 2: Generate image from GPT description
  const safePrompt = websiteDescription.slice(0, 1000);
  if (websiteDescription.length > 1000) {
    console.warn("⚠️ DALL·E prompt exceeded 1000 characters. It was trimmed.");
  }

  const image = await openai.images.generate({
    model: "dall-e-2",
    prompt: safePrompt,
    size: "1024x1024",
    n: 1
  });

  console.log('Website image generated:', image.data[0].url);

  return image.data[0].url;
};