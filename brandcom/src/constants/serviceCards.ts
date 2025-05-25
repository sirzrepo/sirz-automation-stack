import { component5, component51, component52, component53, component54, component55, component56, component57, component58, component59, contentCreationVideo, crmVideo, leadScoringVideo, salesChatBotVideo } from "../assets";

export const serviceCards = [
    {
      key: "websiteBuilder",
      image: component5,
      title: "Website builder",
      description: "Build high-converting, responsive websites without needing to code.",
      longDescription: `Build high-converting, responsive websites without needing to code. The AI-powered builder helps streamline layout, branding, and messaging in one go.`,
      cards: {
        firstCard: {
          title: "Launch Fast",
          text: "Build and publish websites in minutes."
        },
        secondCard: {
          title: "No-Code Customization:",
          text: "Adjust design and content without writing a line of code."
        },
      },
      get url() {
        return `/services/${this.key}`;
      },
    },
    {
      key: "websiteGrader",
      image: component53,
      title: "Website grader",
      description: "Instantly analyze the performance and health of any website.",
      longDescription: `Instantly analyze the performance and health of any website. Get detailed scores on speed, SEO, mobile usability, and security.`,
      cards: {
        firstCard: {
          title: "Instant Audit",
          text: "Get a full performance breakdown in seconds."
        },
        secondCard: {
          title: "Actionable Fixes",
          text: "Understand exactly what to improve."
        },
      },
      get url() {
        return `/services/${this.key}`;
      },
    },
    {
      key: "landingPageBuilder",
      image: component52,
      title: "Landing Page builder",
      description: "Create targeted landing pages that drive conversions.",
      longDescription: `Create targeted landing pages that drive conversions. The builder uses AI to recommend layouts and content based on your goals.`,
      cards: {
        firstCard: {
          title: "Pages That Convert",
          text: "Build high-performing landing pages."
        },
        secondCard: {
          title: "AI Copy, Done Right",
          text: "Let AI write your headlines and CTAs."
        },
      },
      get url() {
        return `/services/${this.key}`;
      },
    },
    {
      key: "seoBomber",
      image: component59,
      title: "SEO Bomber",
      description: "Supercharge your website's visibility with high-impact SEO suggestions",
      longDescription: `Supercharge your website's visibility with high-impact SEO suggestions. It audits your content and recommends keywords and structure.Benefits:`,
      cards: {
        firstCard: {
          title: "Explosive Growth",
          text: " Boost your rankings and traffic."
        },
        secondCard: {
          title: "Tactical SEO",
          text: "Apply keyword and content suggestions fast."
        },
      },
      get url() {
        return `/services/${this.key}`;
      },
      
    },
    {
      key: "marketingAnalytics",
      image: component51,
      title: "Marketing Analytics",
      description: "Track user behavior and marketing performance using intelligent insights.",
      longDescription: `Track user behavior and marketing performance using intelligent insights. This tool consolidates campaign data to optimize decision-making.`,
      cards: {
        firstCard: {
          title: "Data That Matters",
          text: "See the numbers that drive results."
        },
        secondCard: {
          title: "Smarter Campaigns:",
          text: "Make better decisions with real-time insights."
        },
      },
      get url() {
        return `/services/${this.key}`;
      },
    },
    {
        key: "brandkitGenerator",
        image: component54,
        title: "Brandkit Generator",
        description: "Automatically generate a brand identity kit including logos, fonts, colors, and templates.",
        longDescription: `Automatically generate a brand identity kit including logos, fonts, colors, and templates. Perfect for early-stage brands or rebranding.`,
      cards: {
        firstCard: {
          title: "Brand in a Click:",
          text: "Generate your entire brand look instantly."
        },
        secondCard: {
          title: "Designer-Free Branding",
          text: "Save costs, keep quality."
        },
      },
        get url() {
          return `/services/${this.key}`;
        },
    },
    {
        key: "aiContentCreator",
        image: component55,
        title: "AI Content Creator",
        description: "Quickly generate long-form and short-form content for multiple platforms.",
        longDescription: `Quickly generate long-form and short-form content for multiple platforms. It aligns tone and format to your goals and brand.`,
      cards: {
        firstCard: {
          title: "Ideas to Execution",
          text: " Go from outline to publish fast."
        },
        secondCard: {
          title: "Scale Easily",
          text: "Produce more without more effort."
        },
      },
      video: contentCreationVideo,
        get url() {
          return `/services/${this.key}`;
        },
    },
    {
        key: "smartChatbot",
        image: component57,
        title: "Smart Chat Bot",
        description: "Provide 24/7 customer support and lead capture through AI chat.",
        longDescription: `Provide 24/7 customer support and lead capture through AI chat. It adapts to customer queries and improves over time.`,
      cards: {
        firstCard: {
          title: "24/7 Support",
          text: "Handle customer inquiries anytime."
        },
        secondCard: {
          title: "Lead Assistant",
          text: " Capture leads automatically."
        },
      },
      video: salesChatBotVideo,
        get url() {
          return `/services/${this.key}`;
        },
    },
    {
        key: "crmSync",
        image: component58,
        title: "CRM Sync",
        description: "Create customize CRM for better data flow",
        longDescription: `Sync your AI tools with existing CRMs for better data flow. It ensures lead and customer info is always up-to-date.`,
      cards: {
        firstCard: {
          title: "Seamless Integration",
          text: "Connect tools to your CRM automatically."
        },
        secondCard: {
          title: "One Source of Truth",
          text: " Keep your data consistent and clean."
        },
      },
      video: crmVideo,
        get url() {
          return `/services/${this.key}`;
        },
    },
    {
        key: "leadScoringAgent",
        image: component56,
        title: "Lead Scoring Agent",
        description: "Automatically prioritize leads based on behavior and readiness to buy.",
        longDescription: `Automatically prioritize leads based on behavior and readiness to buy. AI continuously learns from your CRM and user activity.`,
      cards: {
        firstCard: {
          title: "Prioritize Sales",
          text: "Focus on the most ready-to-buy leads."
        },
        secondCard: {
          title: "Smarter Pipeline",
          text: "Shorten your sales process with AI."
        },
      },
      video: leadScoringVideo,
        get url() {
          return `/services/${this.key}`;
        },
    },
  ];



  export const pageCardSelections = {
    home: [
        "websiteBuilder",
        "websiteGrader",
        "landingPageBuilder",
        "seoBomber",
        "marketingAnalytics",
        "brandkitGenerator",
        "aiContentCreator",
        "smartChatbot",
        "crmSync",
        "leadScoringAgent",
    ],
    ecommerce: [
        "websiteBuilder",
        "landingPageBuilder",
        "websiteGrader",
        "smartChatbot",
        "leadScoringAgent",
    ],
    branding: [
        "websiteBuilder",
        "landingPageBuilder",
        "brandkitGenerator",
        "aiContentCreator",
    ],
    digitalMarketing: [
        "marketingAnalytics",
        "aiContentCreator",
        "seoBomber",
        "smartChatbot",
        "crmSync",
        "leadScoringAgent",
    ],
  };

// funtion to get service specific data as object
export const getServiceCardByKey = (key: string) => {
  return serviceCards.find(card => card.key === key);
};