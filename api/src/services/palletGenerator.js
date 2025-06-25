// const { OpenAI } = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// module.exports = async (businessName, websiteDesc) => {
//   const systemPrompt = `## 🎨 Font & Color Palette Generator Agent — System Prompt (Ultra-Compact & Visually Accurate)\n**Style:** "Modern Design"`;
//   const userPrompt = `Business Name: ${businessName}\nWebsite Description: ${websiteDesc}`;

//   // Step 1: Generate color palette and font guide
//   const chat = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: userPrompt }
//     ]
//   });

//   const colorPalette = chat.choices[0].message.content?.trim() || "";

//   const safePrompt = colorPalette.slice(0, 1000);

//   return safePrompt;
// };


// exponentail retry mechanism
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generic exponential retry helper
const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0 && err.status === 429) {
      console.warn(`Rate limit hit. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2); // exponential backoff
    }
    throw err;
  }
};

module.exports = async (businessName, websiteDesc) => {
  const systemPrompt = `## 🎨 Font & Color Palette Generator Agent — System Prompt (Ultra-Compact & Visually Accurate)\n**Style:** "Modern Design"`;
  const userPrompt = `Business Name: ${businessName}\nWebsite Description: ${websiteDesc}`;

  const chat = await retry(() =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  );

  const colorPalette = chat.choices[0].message.content?.trim() || "";
  const safePrompt = colorPalette.slice(0, 1000); // Optional safety

  return safePrompt;
};
