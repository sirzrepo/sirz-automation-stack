export const Agent = () => {
    return (
        <div id="agent-section" className="w-full h-full flex flex-col items-center space-y-8">
            <div className="w-full max-w-5xl">
                <iframe 
                    src="https://app.vectorshift.ai/forms/embedded/67fab916e217c237cc9133bd" 
                    className="w-full sm:h-[700px] h-[750px] border-0 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
                    allow="clipboard-read; clipboard-write; microphone"
                    title="AI Content Generator"
                />
            </div>
        </div>
    )
}