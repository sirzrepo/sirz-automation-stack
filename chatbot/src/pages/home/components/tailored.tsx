import { TailoredImg1, TailoredImg2, TailoredImg3, TailoredImg4 } from "../../../assets";

const cards = [
    {
        title: "Customizable Workflows – Conversations That Sound Like You",
        description: "Craft chatbot interactions that align perfectly with your brand tone and business goals. With drag-and-drop conversation builders and flexible triggers, you’re in control of how the chatbot speaks, acts, and responds.",
        img: TailoredImg1
    },
    {
        title: "Multilingual Support – Speak Your Customers’ Language",
        description: "Break language barriers and build trust with audiences around the world. Your chatbot can communicate fluently in multiple languages, automatically detecting the user’s preferred language for a seamless experience.",
        img: TailoredImg2
    },
    {
        title: "Analytics Dashboard – Data That Drives Better Decisions",
        description: "Get a complete view of your chatbot’s performance with real-time metrics like engagement rate, conversion rate, user feedback, and more. Use these insights to refine messaging, optimize flows, and maximize ROI.",
        img: TailoredImg3
    },
    {
        title: "CRM Integration – Keep Your Customer Data in Sync",
        description: "Effortlessly connect with your favorite CRM tools like HubSpot, Salesforce, or Zoho. Automatically capture leads, update customer records, and trigger follow-up actions without switching between platforms.",
        img: TailoredImg4
    },
]

export default function Tailored() {
  return (
    <div className="md:w-[80%] w-[95%] mx-auto px-4 mt-20">
        <div className="text-center mb-8 lg:mb-14">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Features Tailored for You</h1>
          <h2 className="text-2xl lg:text-2xl font-semibold mb-3">
          Built to fit your business — no matter the size, industry, or audience.
          </h2>
          <p className="text-lg lg:text-lg max-w-3xl mx-auto leading-relaxed">
          Whether you run an online store, manage a service-based business, or lead a global brand, our AI chatbot adapts to your workflow and grows with you.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {
              cards.map((card, index) => (
                <div key={index}>
                  <img src={card.img} alt="" />
                  <h2 className="text-xl lg:text-xl font-bold mb-4">{card.title}</h2>
                  <p className="text-gray-500 mb-12 text-md">{card.description}</p>
                </div>
              ))
            }
          </div>
        </div>
    </div>

  )
}
