import { motion } from "framer-motion";


const progress = [
    {
        title: "130%",
        description: "more qualified leads",
    },
    {
        title: "60%",
        description: "higher conversion rates",
    },
    {
        title: "45%",
        description: "faster go-to-market time",
    },
]

export default function OneYear() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden py-20 bg-[#DAF6F9]"
        >
            <div className="text-center sm:w-[80%] w-[90%] mx-auto">
                <h2 className="text-3xl font-bold leading-relaxed text-gray-900 sm:text-4xl lg:text-5xl mb-4">
                    Sirz users after just 2 months
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 sm:max-w-[40%] py-4 mx-auto">
                    Sirz customers grow faster with AI-powered branding, sales, and marketing. What could your business achieve with Sirz?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:w-[60%] sm:w-[80%] w-[85%] mx-auto">
                {progress.map((item, index) => (
                    <div key={index} className="flex flex-col items-center bg-white rounded-xl p-8">
                        <h2 className="text-3xl font-bold leading-relaxed text-gray-900 sm:text-4xl lg:text-5xl my-4">{item.title}</h2>
                        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-[60%] py-2 mx-auto">{item.description}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}