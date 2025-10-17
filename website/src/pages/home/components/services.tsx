import { Settings, CheckCheck } from "lucide-react"

export default function DashboardServices() {

    const services = [
        {
            title: "Smart Automation",
            description: "Goal: Drive targeted awareness and engagement through AI-powered campaigns.",
            features: [
                "AI-Powered SEO & Copywriting",
                "Traffic Campaign Orchestration",
                "AI-Predictive Ad Optimization",
                "Organic Content Automation",
                "Automated reminders and nurture flows.",
                "Campaign workflows auto-sync with analytics agents.",
                "Multi-agent collaboration (SEO agent, Ads agent, Content agent) with shared goals.",
            ]
        },
        {
            title: "Conversion Intelligence",
            description: "Goal: Maximize lead-to-customer conversions with dynamic, AI-driven funnels.",
            features: [
                "AI Chatbot Agent",
                "AI Lead Scoring",
                "Dynamic Landing Page Generator",
                "Lead Magnet Funnels",
                "Conversion Dashboard",
                "Workflow builder for funnel experiments.",
                "Conversion agent integrates with ads + landing pages for closed-loop feedback",
            ]
        },
        {
            title: "Retention & Ops",
            description: "Goal: Retain customers and scale operations with AI-driven engagement.",
            features: [
                "Cross-Border Sales Automation",
                "Revenue Ops Workflows",
                "Behavioral Retargeting",
                "Competitor Ads Intelligence",
                "Retention Sequence",
                "Retention agents that auto-adjust email frequency, offers, and reactivation flows.",
                "Workflow-level monitoring of customer journeys across multiple channels.",
            ]
        }
    ]
  return (
    <div className=" bg-slate-900 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Smart Automation Card */}
          {
            services.map((service, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg">
                    <div className="p-0 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Settings className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {service.description}
                        </p>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Core Features</h3>
                            <div className="space-y-3">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 py-2">
                                        <CheckCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3">Learn more</button>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
