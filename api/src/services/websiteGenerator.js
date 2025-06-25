// const { OpenAI } = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// module.exports = async (businessDescription, domain, websiteDesc) => {
//   const systemPrompt = "## 🖼 Website Designer Agent — System Prompt (Ultra-Compact & Visually Accurate)";
//   const userPrompt = `${businessDescription}\nDomain: ${domain}\nWebsite Description: ${websiteDesc}`;

//   // Step 1: Generate website concept from GPT
//   const chat = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: userPrompt }
//     ]
//   });

// //   const websiteDescription = chat.choices[0].message.content;
// const websiteDescription = chat.choices[0].message.content?.trim() || "";

//   // Step 2: Generate image from GPT description
//   const safePrompt = websiteDescription.slice(0, 1000);

//   const image = await openai.images.generate({
//     model: "dall-e-2",
//     prompt: safePrompt,
//     size: "1024x1024",
//     n: 1
//   });

//   return image.data[0].url;
// };


// Generic exponential retry helper
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generic retry function with exponential backoff
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

module.exports = async (businessDescription, domain, websiteDesc) => {
  const systemPrompt = "## 🖼 Website Designer Agent — System Prompt (Ultra-Compact & Visually Accurate)";
  const userPrompt = `${businessDescription}\nDomain: ${domain}\nWebsite Description: ${websiteDesc}`;

  // Step 1: Generate website concept from GPT
  const chat = await retry(() =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  );

  const websiteDescriptionGenerated = chat.choices[0].message.content?.trim() || "";
  const safePrompt = websiteDescriptionGenerated.slice(0, 1000);

  // Step 2: Generate website image from DALL·E
  const image = await retry(() =>
    openai.images.generate({
      model: "dall-e-2",
      prompt: safePrompt,
      size: "1024x1024",
      n: 1
    })
  );

  return image.data[0].url;
};
