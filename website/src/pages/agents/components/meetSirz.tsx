import { motion } from "framer-motion";

export default function MeetSirz() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden py-28 md:flex justify-between items-center md:w-[80%] w-[90%] mx-auto"
        >
            <div className=" md:w-[75%]">
                <h2 className="text-3xl font-bold leading-relaxed text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-4">
                    Meet Sirz — The complete AI suite for smart business growth.
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 py-4 ">
                    Use Sirz Agents to automate branding, marketing, and sales. Let Sirz Intelligence uncover deep market insights. Explore powerful tools like the Landing Page Builder, Lead Scoring, and Content Agent—all designed to help you launch faster, sell smarter, and grow effortlessly.
                </p>
            </div>
            <div className="md:w-[20%] ">
                <button
                    onClick={() => {}}
                    className="bg-colorBlueDeep max-sm:w-[100%] mx-auto text-white hover:bg-gray-100 hover:text-colorBlueDeep border border-indigo-600 text-indigo-600 font-semibold py-4 px-10 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Schedule a demo
                </button>
            </div>
        </motion.div>
    )
}