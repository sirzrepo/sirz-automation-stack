import { FiTarget, FiSearch, FiTrendingUp, FiRefreshCw, FiBell, FiBarChart2, FiUsers } from 'react-icons/fi';

const SmartAutomations = () => {
  const features = [
    {
      icon: <FiSearch className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered SEO & Copywriting",
      description: "Leverage AI to create optimized content that ranks higher and engages your audience."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-green-500" />,
      title: "Traffic Campaign Orchestration",
      description: "Coordinate and manage all your traffic campaigns from a single, intuitive platform."
    },
    {
      icon: <FiTarget className="w-8 h-8 text-purple-500" />,
      title: "AI-Predictive Ad Optimization",
      description: "Maximize your ad performance with AI-driven predictions and optimizations."
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-orange-500" />,
      title: "Organic Content Automation",
      description: "Automate your content creation and distribution for consistent, high-quality output."
    },
    {
      icon: <FiBell className="w-8 h-8 text-red-500" />,
      title: "Automated Reminders & Nurture Flows",
      description: "Keep your audience engaged with timely, personalized communication."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8 text-cyan-500" />,
      title: "Campaign Analytics Sync",
      description: "Real-time analytics that automatically sync with your campaign workflows."
    },
    {
      icon: <FiUsers className="w-8 h-8 text-yellow-500" />,
      title: "Multi-Agent Collaboration",
      description: "Seamless collaboration between SEO, Ads, and Content agents with shared objectives."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Smart Automation
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Drive targeted awareness and engagement through AI-powered campaigns.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-opacity-20 bg-gray-100">
                    {feature.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{feature.title}</h3>
                </div>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            Harness the power of AI-driven automation to supercharge your marketing efforts and achieve unprecedented results.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors duration-300">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartAutomations;