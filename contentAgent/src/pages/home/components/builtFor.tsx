import { motion } from "framer-motion"
import { Avatar_1, Avatar_2, Avatar_3, Avatar_4 } from "../../../assets"

export default function BuiltFor() {
        const features = [
            {
                title: "Solo Creators & Influencers",
                description: "Effortlessly generate reels, carousels, and captions without spending hours on content planning.",
                img: Avatar_1,
                color: "#E00BEB"
            },
            {
                title: "Social Media Managers",
                description: "Streamline your workflow by turning client briefs into ready-to-post assets in minutes.",
                img: Avatar_2,
                color: "#4EA8FA"
            },
            {
                title: "Coaches, Experts & Educators",
                description: "Transform your knowledge into bite-sized, scroll-stopping content that drives engagement and leads.",
                img: Avatar_3,
                color: "#1AA47B"
            },
            {
                title: "Startup Founders & Marketers",
                description: "Say goodbye to content blocks — stay consistent on LinkedIn, Instagram & TikTok with AI-powered posts.",
                img: Avatar_4,
                color: "#722FFE"
            },
        ]
    return (
        <div className="py-24 sm:w-[80%] w-[95%] mx-auto">
            <h1
                className="text-3xl md:text-4xl uppercase lg:text-5xl font-bold mx-auto text-center max-w-3xl mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#001F3E] via-[#203DA3] to-[#3752E9]">
                This AI-powered content agent is built for:
            </h1>
            <div className="grid md:grid-cols-2 gap-14 sm:w-[80%] w-[95%] mx-auto">
                {
                    features.map((feature, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            key={index}
                        >
                            <div className="">
                                <div className="bg-[#FAFAFA] sm:px-8 px-6 sm:py-10 py-8 rounded-lg text-left">
                                    <img 
                                        src={feature.img} 
                                        alt="" 
                                        className="w-14 h-14 mb-12 rounded-md pt-1" 
                                        style={{ backgroundColor: feature.color }}
                                    />
                                    <h2 className="sm:text-2xl text-xl font-semibold text-gray-800 mb-4">
                                    {feature.title}
                                    </h2>
                                    <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                                    {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}