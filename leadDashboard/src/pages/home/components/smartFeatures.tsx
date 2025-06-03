import { LeadCardAdaptive, LeadCardAutomations, LeadCardExplainable, LeadCardIntelligence } from "../../../assets";
import { SmartFeatureCard } from "../../../components/layout/card";
import { motion } from 'framer-motion';

export default function SmartFeatures() {

    const features = [
        {
            title: "Instant Lead Intelligence",
            description: "Website click, email open, webinar attend—whatever the signal, the dashboard refreshes in real time and pushes the score straight into your CRM",
            img: LeadCardIntelligence
        },
        {
            title: "Adaptive AI Scoring",
            description: "As patterns shift—new ICPs, fresh campaigns—it retrains in the background, so scores stay razor-accurate without a single line of code from you.",
            img: LeadCardAdaptive
        },
        {
            title: "Explainable Insights",
            description: " Transparent factors turn skepticism into confidence, letting reps tailor outreach instead of questioning the algorithm",
            img: LeadCardExplainable
        },
        {
            title: "Automation Hooks",
            description: "Set a threshold once, and our native connectors fire off perfectly timed workflows: add “90+” leads to a Slack #hot-deals channel, enroll them in a personalized email cadence, or create an immediate",
            img: LeadCardAutomations
        }
    ]
    return (
        <div className="py-24">
            <div className="flex flex-col pb-16 items-center max-sm:px-4">
                <h1 className="text-4xl lg:text-5xl font-semibold text-center text-colorBlueDeep max-w-6xl mb-6">
                    Smart Features. Real <span className="text-colorGreen">Sales</span> Impact.
                </h1>

                <div className="text-center max-w-3xl text-xl text-gray-500 ">
                Every feature is designed to help your team move faster, prioritize better, and close more deals—with zero guesswork.
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 sm:w-[80%] w-[95%] mx-auto">
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
                            />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}