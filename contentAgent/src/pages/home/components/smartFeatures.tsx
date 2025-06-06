import { FeatureFourIcon, FeatureFourImg, FeatureOneIcon, FeatureOneImg, FeatureThreeIcon, FeatureThreeImg, FeatureTwoIcon, FeatureTwoImg } from "../../../assets";
import { motion } from 'framer-motion';

export default function SmartFeatures() {

    const features = [
        {
            title: "Carousel Builder",
            description: "Turn your message into scroll-stopping carousels for Instagram, LinkedIn, or X. ",
            icon: FeatureOneIcon,
            img: FeatureOneImg,
        },
        {
            title: "10+ Content Variations Instantly",
            description: "Generate multiple posts (carousel, reel, infographic, caption) from one idea. |",
            icon: FeatureTwoIcon,
            img: FeatureTwoImg,
            invert: true
        },
        {
            title: "Infographic Designer",
            description: "Auto-generate clean, stat-driven layouts perfect for sharing facts or frameworks.",
            icon: FeatureThreeIcon,
            img: FeatureThreeImg,
        },
        {
            title: "Reel Script Generator",
            description: "Create engaging short-form video scripts with visual cues and pacing suggestions",
            icon: FeatureFourIcon,
            img: FeatureFourImg,
            invert: true
        },
    ]
    return (
        <div className="py-24">
            <div className="flex flex-col pb-16 items-center max-sm:px-4">
                <h1
                    className="text-3xl md:text-4xl uppercase lg:text-5xl font-bold mx-auto text-center max-w-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#001F3E] via-[#203DA3] to-[#3752E9]">
                    Features – Everything You Can Create from One Idea
                </h1>
            </div>

            <div className="sm:w-[80%] w-[95%] mx-auto mb-6">
            {
    features.map((feature, index) => (
        <div 
            key={index} 
            className={`bg-white sm:my-4 mb-14 max-sm:bg-[#FAFAFA] gap-10 grid md:grid-cols-2 rounded-lg text-left ${
                feature.invert ? 'md:flex-row-reverse' : ''
            }`}
        >
            <div className={`${feature.invert ? 'md:order-2' : ''} w-full md:w-[70%] flex flex-col justify-center p-8`}>
                <img src={feature.icon} alt="" className="w-16 h-16 sm:w-20 sm:h-20 mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {feature.title}
                </h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                    {feature.description}
                </p>
            </div>
                
            <motion.div
                className={`${feature.invert ? 'md:order-1' : ''}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <img 
                    src={feature.img} 
                    alt="" 
                    className="w-full h-full object-cover" 
                />
            </motion.div>
        </div>
    ))
}
            </div>
        </div>
    )
}