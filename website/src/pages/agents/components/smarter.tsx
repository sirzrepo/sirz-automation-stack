import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";

export default function Smarter() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden py-20 "
        >
            <div className="text-center sm:w-[60%] w-[90%] mx-auto">
                <h2 className="text-3xl font-bold leading-relaxed text-gray-900 sm:text-4xl dark:text-white lg:text-5xl mb-4">
                    Work <span className=" italic text-colorBlueDeep">Smarter</span> . Launch faster.
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:max-w-[60%] py-4 mx-auto">
                Get a demo to discover how Sirz AI Agent can transform your brand and business.
                </p>

                <div
                    onClick={() => {}}
                    className="text-colorBlueDeep flex items-center justify-center font-semibold hover:text-blue-800 hover:tracking-wider underline"
                >
                    Request a Demo of Sirz AI Agent <IoArrowForward className="ml-1"/>
                </div>
            </div>
        </motion.div>
    )
}