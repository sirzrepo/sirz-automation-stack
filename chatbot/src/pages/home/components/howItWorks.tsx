import { Settings, Check, FileText, DollarSign } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Settings,
      title: "Engage – Start Conversations That Convert",
      description:
        "The moment a visitor lands on your website or social page, your AI chatbot jumps into action. With warm, friendly greetings and smart triggers based on visitor behaviour, it sparks engagement immediately — turning passive browsers into active participants.",
    },
    {
      number: "02",
      icon: Check,
      title: "Understand – Ask Smart Questions.",
      description:
        "Your chatbot doesn't just talk — it listens. Using contextual cues and smart questioning, it gathers key information about customer needs, preferences, and intent. This builds trust and ensures every response is relevant.",
    },
    {
      number: "03",
      icon: FileText,
      title: "Recommend – Smart Suggestions",
      description:
        "Based on each visitor's behaviour and preferences, the chatbot recommends the most relevant products or services — boosting engagement and increasing your average order value.",
    },
    {
      number: "04",
      icon: DollarSign,
      title: "Convert – Close Sales Without the Pitch",
      description:
        "The chatbot smoothly guides users through your sales funnel — from adding items to cart, handling objections, applying discounts, and finalizing the purchase. It's like having a top-performing sales rep on autopilot.",
    },
  ]

  return (
    <div className="min-h-screen bg-[linear-gradient(to_top,_#313563_0%,_#1B1C21_6%,_#1B1C21_94%,_#1B1C21_94%,_#1B1C21_9%,_#313563_100%)] text-white">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-14">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">How It Works??</h1>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-gray-200">
            Smarter Conversations. Simpler Sales. Bigger Growth.
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From first hello to final sale, our AI chatbot handles the entire customer journey — with intelligence,
            empathy, and zero pressure.
          </p>
        </div>

        {/* Steps Section */}
        <div className="md:w-[85%] w-[95%] mx-auto ">

            <hr className=" rounded-3xl max-sm:hidden bg-red-600" />
            
          <div className="grid sm:grid-cols-12 grid-cols-1 gap-12 lg:gap-0">
            {/* Left Column - Step Numbers and Icons */}
            <div className="space-y-12 max-sm:hidden col-span-5 lg:space-y-28 py-20 md:px-32">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-end gap-10">
                  <div className="text-xl lg:text-2xl font-bold text-white ">{step.number}</div>
                  <div className="bg-[#463085] p-4 rounded-lg">
                    <step.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>

            {/* center line */}
            <div className="col-span-1 max-sm:hidden lg:col-span-1 relative">
              <div className="h-full w-0.5 bg-gradient-to-b from-gray-400 via-gray-600 to-gray-400"></div>

              {/* Bottom Accent */}
                <div className="w-8 h-8 bg-gray-500 absolute bottom-0  left-[-15px] right-0 rounded-full"></div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-12 col-span-6 lg:space-y-16 py-20">
              {steps.map((step, index) => (
                <div key={index} className="max-sm:text-center">

                  <div className="hidden max-sm:block py-4">
                      <div className="bg-purple-600 w-12 h-12 mx-auto p-2 flex items-center justify-center rounded-lg">
                        <step.icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                  </div>
                  
                  <h3 className="text-xl lg:text-xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-base lg:text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
