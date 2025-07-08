import { motion } from "framer-motion";
import growthFrame from "../images/Gemini_Generated_Image_tfddhxtfddhxtfdd 1.svg";

export default function Growth() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden pt-20 bg-[#DAF6F9]"
        >
            <div className="text-center sm:w-[80%] w-[90%] mx-auto">
                <h2 className="text-3xl font-bold leading-relaxed text-gray-900 sm:text-4xl lg:text-5xl mb-4">
                    Your entire growth engine. One <span className=" italic text-colorBlueDeep">AI-powered</span> platform.
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-3 sm:max-w-[60%] py-4 mx-auto">
                    Sirz brings your branding, marketing, sales, and ecommerce tools together in a single intelligent platform. It&apos;s easy to use, delivers fast results, and gives your team everything they need to launch, grow, 
                    and scale—powered by smart agents that work together. Each tool is powerful on its own, but the real magic happens when you use them as a team.
                </p>
            </div>
            <img src={growthFrame} alt="" className=" object-cover mx-auto" />
        </motion.div>
    )
}