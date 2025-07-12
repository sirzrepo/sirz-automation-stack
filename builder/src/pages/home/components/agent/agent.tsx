export const Agent = () => {
    return (
        <div id="agent-section" className="w-full h-full flex flex-col items-center space-y-8">
            <div className="w-full max-w-5xl">
                <iframe 
                    src="https://app.vectorshift.ai/forms/embedded/685527bbc06fbab08c1bb40a" 
                    className="w-full h-[800px] border-0 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
                    allow="clipboard-read; clipboard-write; microphone"
                    title="AI Content Generator"
                />
            </div>
        </div>
    )
}