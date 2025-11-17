import { FiGlobe, FiTrendingUp, FiTarget, FiUsers, FiRefreshCw, FiActivity, FiBarChart2 } from 'react-icons/fi';

const RetentionOps = () => {
  const features = [
    {
      icon: <FiGlobe className="w-8 h-8 text-teal-500" />,
      title: "Cross-Border Sales Automation",
      description: "Automate and optimize your international sales processes with AI-driven localization and compliance."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-blue-500" />,
      title: "Revenue Ops Workflows",
      description: "Streamline your revenue operations with automated workflows that connect sales, marketing, and customer success."
    },
    {
      icon: <FiTarget className="w-8 h-8 text-purple-500" />,
      title: "Behavioral Retargeting",
      description: "Re-engage users based on their behavior with personalized retargeting campaigns."
    },
    {
      icon: <FiUsers className="w-8 h-8 text-orange-500" />,
      title: "Competitor Ads Intelligence",
      description: "Gain insights into competitor ad strategies and optimize your campaigns accordingly."
    },
    {
      icon: <FiRefreshCw className="w-8 h-8 text-red-500" />,
      title: "Retention Sequence",
      description: "Automated sequences that adjust based on customer behavior to maximize retention."
    },
    {
      icon: <FiActivity className="w-8 h-8 text-cyan-500" />,
      title: "AI-Powered Retention Agents",
      description: "Intelligent agents that optimize email frequency, offers, and reactivation flows in real-time."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8 text-yellow-500" />,
      title: "Journey Monitoring",
      description: "End-to-end visibility into customer journeys across all touchpoints and channels."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Retention & Operations
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Retain customers and scale operations with AI-driven engagement.
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
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Retention Strategy?</h2>
          <p className="mb-6 text-teal-100 max-w-2xl mx-auto">
            Leverage AI to boost customer loyalty and operational efficiency like never before.
          </p>
          <button className="bg-white text-teal-700 px-8 py-3 rounded-full font-medium hover:bg-teal-50 transition-colors duration-300">
            Optimize Retention Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetentionOps;