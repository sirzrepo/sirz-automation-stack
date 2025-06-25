// const { OpenAI } = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// module.exports = async (domain, businessName, websiteType) => {
//   const systemPrompt = "## 🧠 Logo Generator Agent — Model-Optimized System Prompt";
//   const userPrompt = `Business Name: ${businessName}\nDomain: ${domain}\nStyle: ${websiteType}`;

//   // Step 1: Generate logo concept from GPT
//   const chat = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: userPrompt }
//     ]
//   });

//   const logoPrompt = chat.choices[0].message.content?.trim() || "";

//   const safePrompt = logoPrompt.slice(0, 1000);

//   // Step 2: Generate logo image from GPT description
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

const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0 && err.status === 429) {
      console.warn(`Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2); // exponential backoff
    }
    throw err;
  }
};

module.exports = async (domain, businessName, websiteType) => {
  const systemPrompt = "## 🧠 Logo Generator Agent — Model-Optimized System Prompt";
  const userPrompt = `Business Name: ${businessName}\nDomain: ${domain}\nStyle: ${websiteType}`;

  // Step 1: Retry GPT chat
  const chat = await retry(() =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  );

  const logoPrompt = chat.choices[0].message.content?.trim() || "";
  const safePrompt = logoPrompt.slice(0, 1000); // DALLE prompt limit

  // Step 2: Retry image generation
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
