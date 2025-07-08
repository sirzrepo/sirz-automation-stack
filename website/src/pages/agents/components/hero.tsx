import { motion } from "framer-motion";
import heroFrame from "../images/eD9xiLPIRkSttX97w92h1Q-removebg-preview 1.svg";

export default function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            // 
            className="overflow-hidden bg-gradient-to-b from-[#CFD7FE] to-[#A3EAEA00]"
        >
              <div className="relative min-h-screen py-16 md:py-24 overflow-hidden">
              <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20">
                <div className="md:w-1/2 text-center md:text-left">
                <p className="font-medium pb-2 text-xl">Meet the Sirz AI Suite</p>
                  <h2 className="text-4xl font-extrabold leading-relaxed text-gray-900 dark:text-white sm:text-5xl mb-4">
                  Smart tools. Real growth. One <span className=" italic text-colorBlueDeep">intelligent</span> platform.
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  Sirz brings you a powerful lineup of AI-driven agents designed to help you launch, grow, and scale your business—smarter and faster.
                  No guesswork. No coding. Just real results.
                  </p>
                    <button
                      onClick={() => {}}
                      className="bg-colorBlueDeep max-sm:w-[100%] mx-auto text-white hover:bg-gray-100 border border-indigo-600 text-indigo-600 font-semibold py-4 px-10 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Schedule a demo
                    </button>
              </div>
              
                <motion.div 
                  className="md:w-1/2 relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div 
                    className="rounded-2xl overflow-hidden"
                    // whileHover={{ 
                    //   scale: 1.02,
                    //   boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)'
                    // }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.img
                      src={heroFrame}
                      alt="Website Builder Mockup"
                      className=" object-cover mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-4 right-4 rounded-full bg-indigo-600 text-white w-16 h-16 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.943 12.97 3 11.43 3 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9h6v2H7V9z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </motion.div>
                </div>
              </div>
        </motion.div>
    )
}