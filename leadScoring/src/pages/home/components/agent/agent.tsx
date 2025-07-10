export const Agent = () => {
    return (
        <div id="agent-section" className="w-full h-full flex flex-col items-center space-y-8 bg-gray-50">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="">
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