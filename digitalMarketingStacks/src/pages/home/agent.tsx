export const Agent = () => {
    return (
        <div id="agent-section" className="w-full h-full flex flex-col items-center py-8 px-4 space-y-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
                    Try Our AI Lead Scoring Engine
                </h2>
                <p className="text-lg text-gray-900 mb-6">
                    Create stunning, engaging content in seconds with our powerful AI assistant. 
                    Just describe what you need and let our technology do the rest!
                </p>
            </div>
            <div className="w-full max-w-5xl">
                <iframe 
                    src="https://app.vectorshift.ai/forms/embedded/67fab916e217c237cc9133bd" 
                    className="w-full h-[800px] border-0 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
                    allow="clipboard-read; clipboard-write; microphone"
                    title="AI Content Generator"
                />
            </div>
        </div>
    )
}