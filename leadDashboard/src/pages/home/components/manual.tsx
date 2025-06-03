import { Cards } from "../../../assets";

export default function Manual() {
    return (
        <div className="bg-[#0f2d6c] sm:h-[calc(175vh-250px)] h-[calc(105vh-250px)] sm:px-16 px-2 py-16">
            <div className="flex flex-col items-center ">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-white max-w-6xl mb-6">
                    Manual Lead Scoring is Holding You Back
                </h1>

                <div className="text-center mb-12 text-2xl text-gray-200 italic">
                    Your sales team deserves better than spreadsheets and guesswork.
                </div>
            </div>
            <div className="flex items-center justify-center">
                <img src={Cards} alt="" className="object-cover" />
            </div>
        </div>
    )
}