export const Agent = () => {
    return (
        <div id="agent-section" className="w-full h-full flex flex-col items-center py-8 px-4 space-y-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
                    Create Your Website In Minutes
                </h2>
                <p className="text-lg text-gray-900 mb-6">
                    Create a stunning, engaging website in seconds with our powerful AI landing page builder. 
                    Just describe what you need and let our technology do the rest!
                </p>
            </div>
            <div className="w-full max-w-5xl">
                <iframe 
                    src="https://app.vectorshift.ai/forms/embedded/68542d16454f64d911488680" 
                    className="w-full h-[890px] border-0 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
                    allow="clipboard-read; clipboard-write; microphone"
                    title="AI Content Generator"
                />
            </div>
        </div>
    )
}