// components/DataDrivenSection.jsx

function DataDrivenSection() {
  // Placeholder images for charts - replace with actual chart components if dynamic
  const chartImages = [
    "/path/to/chart1.png",
    "/path/to/chart2.png",
    "/path/to/chart3.png",
    "/path/to/chart4.png",
    "/path/to/chart5.png",
    "/path/to/chart6.png",
  ];

  return (
    <div className="mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Data-Driven Decisions, Powered by AI Insights
        </h2>
        <p className="text-gray-600">
          Our AI provides in-depth analytics, reporting, and visualizations, allowing you to track your KPIs, identify trends, and make informed decisions. Optimize your marketing strategies with actionable insights, ensuring maximum ROI and business growth.
        </p>
        {/* Example of a small chart/dashboard image at the bottom of this section */}
        <div className="mt-6 border rounded-lg overflow-hidden">
          <img src="/path/to/small-dashboard-example.png" alt="Dashboard Example" className="w-full h-auto object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chartImages.map((src, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
            {/* Replace with actual chart component if dynamic, otherwise use img */}
            <img src={src} alt={`Chart ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataDrivenSection;