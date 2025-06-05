import { DesignsLarge, DesignsSmall, HostLarge, HostSmall, SetUpLarge, SetUpSmall } from "../../../assets";
import { SmartFeatureCard } from "../../../components/layout/card";
import { motion } from 'framer-motion';

export default function SmartFeatures() {

    const featureOne = 
    {
        title: "Instant Setup",
        description: "Get online in seconds. Skip the developers, tech headaches, or long wait times — Sirz handles everything from start to finish.",
        icon: SetUpSmall,
        img: SetUpLarge,
        color: "#9a57f7"
    }

    const features = [
        {
            title: "Beautiful Designs",
            description: "Impress your visitors with sleek, mobile-optimized templates designed to make your brand shine. No design skills needed.",
            icon: DesignsSmall,
            img: DesignsLarge,
            color: "#0d6efd"
        },
        {
            title: "Export or Host Anywhere",
            description: "Whether you want to publish your page with Sirz or export the code to your own platform, you’re in full control.",
            icon: HostSmall,
            img: HostLarge,
            color: "#53c2c3"
        },
    ]
    return (
        <div className="py-24">
            <div className="flex flex-col pb-16 items-center max-sm:px-4">
                <h1 className="text-4xl lg:text-5xl font-semibold text-center text-[#001f3e] max-w-3xl mb-6">
                    Why Choose Sirz Landing Page Agent?
                </h1>

                <div className="text-center max-w-3xl font-medium text-xl text-gray-500 ">
                    Launch your brand online in minutes — no code, no hassle, just results.
                </div>
            </div>

            <div className="sm:w-[80%] w-[95%] mx-auto mb-6">
                <div className="bg-white sm:p-16 p-8 grid md:grid-cols-2 border rounded-lg text-left">
                    <div>
                        <img src={featureOne.icon} alt="" className="w-14 h-14 mb-12" />
                        <h2 className="sm:text-4xl text-3xl font-extrabold text-gray-800 mb-4">
                            {featureOne.title}
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {featureOne.description}
                        </p>
                        <div style={{ color: featureOne.color }} className={`font-semibold underline mb-6`}>
                            Learn more
                        </div>
                    </div>
                        
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={featureOne.img} alt="" className="w-full h-full object-cover " />
                    </motion.div>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 sm:w-[80%] w-[95%] mx-auto">
                {
                    features.map((feature, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            key={index}
                        >
                            <SmartFeatureCard 
                                title={feature.title} 
                                description={feature.description} 
                                img={feature.img}
                                icon={feature.icon}
                                color={feature.color}
                            />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}