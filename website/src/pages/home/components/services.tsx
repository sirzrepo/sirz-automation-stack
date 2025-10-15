import { Settings, CheckCheck } from "lucide-react"

export default function DashboardServices() {

    const services = [
        {
            title: "Automation Engine",
            description: "Goal: Save time and reduce operational inefficiency by automating repetitive workflows.",
            features: [
                "Workflow automation for routine tasks",
                "Trigger-based processes (emails, notifications, updates)",
                "Integration with existing tools",
                "Error reduction through standardized processes",
            ]
        },
        {
            title: " CRM & Client Hub",
            description: "Centralize customer management and improve collaboration across teams.",
            features: [
                "Unified database for leads, clients, and interactions",
                "Sales pipeline tracking and management",
                "Integrated customer support tools",
                "Collaboration space for sales, marketing, and service teams",
            ]
        },
        {
            title: "Analytics & Insights",
            description: "Goal: Provide visibility into performance and enable data-driven decision-making.",
            features: [
                "Real-time dashboards",
                "Customizable reporting tools",
                "KPI and performance tracking",
                "Predictive insights for smarter planning",
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
