export const Agent = () => {
    return (
        <div id="agent-section" className="flex flex-col items-center space-y-8">
            {/* <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
                    Try Our AI Content Generator
                </h2>
                <p className="text-lg text-gray-900 mb-6">
                    Create stunning, engaging content in seconds with our powerful AI assistant. 
                    Just describe what you need and let our technology do the rest!
                </p>
            </div> */}
            <div className="w-full ">
                <iframe 
                    src="https://app.vectorshift.ai/forms/embedded/67f3d302fdd9c0f8b2efb290" 
                    className="w-full  min-h-[750px] h-auto border-0 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
                    allow="clipboard-read; clipboard-write; microphone"
                    title="AI Content Generator"
                />
            </div>
        </div>
    )
}