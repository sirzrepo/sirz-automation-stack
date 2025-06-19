import { MessageCircle, Sparkles, Download, ArrowRight, Users, MessageCircleMore } from "lucide-react"
import Button from "../../../components/common/ui/Button"
import { PageInMinutesImg } from "../../../assets"
import { scrollToElement } from "../../../utils";

const steps = [
  {
    icon: <Users />,
    title: "Tell Us About Your Business",
    description:
      "Give us the basics — your business name, website (if you have one), and a brief description of what you do.",
  },
  {
    icon: <MessageCircleMore />,
    title: "Active discussions",
    description:
      "Drag and drop your logo, choose your brand colors, and optionally upload images or references.",
  },
  {
    icon: <Sparkles />,
    title: "Let Our AI Work Its Magic",
    description:
      "Our AI instantly combines smart layout design and your branding to generate a professional, conversion-optimized landing page",
  },
  {
    icon: <Download />,
    title: "Publish or Download",
    description:
      "Review your landing page, make quick edits, and go live. You can host it instantly or export the code to embed or use on your platform of choice.",
  },
];


export default function PageInMinutes() {
  return (
    <div className="min-h-screen bg-[#001f3e] text-white">
      {/* Header */}
      <div className="container mx-auto px-6 pt-24">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-blue-400" />
          <span className="text-sm font-bold tracking-wider text-blue-300">SIRZ LANDING PAGE AGENT</span>
        </div>

        {/* Main Content */}
        <div className="text-center mb-24">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-6 leading-tight">
            How Sirz Builds Your Page in Minutes
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From idea to impact — Sirz simplifies your landing page creation into four seamless steps. No coding, no
            design stress, just results.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Side - Steps */}
          <div className="space-y-8 sm:w-[80%] w-[95%]">
            {/* Step 1 */}
            {
              steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 p-[7px] rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Right Side - Website Mockup */}
          <div className="relative">
            <img src={PageInMinutesImg} alt="" />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pb-16">
          <Button onClick={() => scrollToElement('agent-section')} style={{ color: '#001f3e' }} size="lg" className=" bg-white hover:bg-gray-100 font-semibold px-8 py-3 rounded-full">
            Create your first website
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
