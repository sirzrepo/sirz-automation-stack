import { FiMessageSquare, FiBarChart2, FiLayers, FiFilter, FiTrendingUp, FiZap, FiActivity } from 'react-icons/fi';

const ConversionIntelligence = () => {
  const features = [
    {
      icon: <FiMessageSquare className="w-8 h-8 text-blue-500" />,
      title: "AI Chatbot Agent",
      description: "Engage visitors in real-time conversations to capture leads and answer questions 24/7."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8 text-green-500" />,
      title: "AI Lead Scoring",
      description: "Automatically score and prioritize leads based on their engagement and conversion potential."
    },
    {
      icon: <FiLayers className="w-8 h-8 text-purple-500" />,
      title: "Dynamic Landing Page Generator",
      description: "Create high-converting landing pages in minutes with AI-powered design suggestions."
    },
    {
      icon: <FiFilter className="w-8 h-8 text-orange-500" />,
      title: "Lead Magnet Funnels",
      description: "Build and optimize funnels that convert visitors into leads with targeted offers."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-red-500" />,
      title: "Conversion Dashboard",
      description: "Track and analyze your conversion metrics in real-time with actionable insights."
    },
    {
      icon: <FiZap className="w-8 h-8 text-cyan-500" />,
      title: "Workflow Builder",
      description: "Create and test different funnel variations with our intuitive workflow builder."
    },
    {
      icon: <FiActivity className="w-8 h-8 text-yellow-500" />,
      title: "Closed-Loop Integration",
      description: "Seamlessly connect your ads and landing pages for complete conversion tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Conversion Intelligence
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Maximize lead-to-customer conversions with dynamic, AI-driven funnels.
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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Conversions?</h2>
          <p className="mb-6 text-indigo-100 max-w-2xl mx-auto">
            Transform your lead generation and conversion rates with our AI-powered conversion intelligence platform.
          </p>
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-medium hover:bg-indigo-50 transition-colors duration-300">
            Start Converting More Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionIntelligence;