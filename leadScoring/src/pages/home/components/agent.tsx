export const Agent = () => {
    return (
        <div id="agent-section" className="w-full h-full flex flex-col items-center py-12 px-4 space-y-8 bg-gray-50">
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
                    AI-Powered Lead Classifier
                </h2>
                <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                    Automatically classify and prioritize your leads with our intelligent scoring system. 
                    Our AI analyzes lead data to help you focus on the most promising opportunities.
                </p>
            </div>
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600">
                    <div className="bg-white p-1">
                        <iframe 
                            src="https://app.vectorshift.ai/forms/embedded/67fab916e217c237cc9133bd" 
                            className="w-full h-[700px] border-0"
                            allow="clipboard-read; clipboard-write; microphone"
                            title="AI Lead Classifier"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}