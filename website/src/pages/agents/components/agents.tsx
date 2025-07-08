import { motion } from "framer-motion";
import contentAgentImg from "../images/Frame 1618873168 (3).svg";
import leadScoringImg from "../images/Frame 1618873168.svg";
import chatbot from "../images/Frame 1618873168 (4).svg";
import pageBuilderImg from "../images/Frame 1618873168 (5).svg";
import seoBomberImg from "../images/seoBomber.svg";
import brandcomImg from "../images/brandcom.svg";

export default function SirzAgents() {
    const agents = [
        {
            img: brandcomImg,
            title: `Brandcom AI`,
            intro: `Hi, I’m your branding agent.`,
            description: `My role is to create your brand identity, and my personality is creative and sharp.`,
            link: "#",
            linkText: "Explore BrandcomAi"
        },
        {
            img: leadScoringImg,
            title: `Lead Scoring AI`,
            intro: `Hi, I’m your lead scoring agent.`,
            description: `My role is to rank your leads by sales readiness, I’m data-obsessed and precise.`,
            link: "https://lead-scoring.sirz.co.uk/",
            linkText: "Explore Lead Scoring AI"
        },
        {
            img: seoBomberImg,
            title: `SEO Keywords AI`,
            intro: `Hi, I’m your SEO strategist.`,
            description: `My job is to discover the best keywords for your growth, I’m strategic and insightful.`,
            link: "https://seo-bomber.sirz.co.uk/",
            linkText: "Explore SEO Keywords AI"
        },
        {
            img: contentAgentImg,
            title: `Content Agent`,
            intro: `Hi, I’m your content creator.`,
            description: `I write your blogs, ads, and product copy—on-brand. I’m creative and consistent.`,
            link: "https://content-agent.sirz.co.uk/",
            linkText: "Explore Content Agent"
        },
        {
            img: chatbot,
            title: `Smart Sales Chatbot`,
            intro: `Hi, I’m your sales chatbot.`,
            description: `I chat with visitors, qualify leads & help close deals. I’m friendly, smart and always on.`,
            link: "https://chatbot.sirz.co.uk/",
            linkText: "Explore Smart Sales Chatbot"
        },
        {
            img: pageBuilderImg,
            title: `Landing Page Builder`,
            intro: `Hi, I build your landing pages.`,
            description: `I turn your ideas into conversion-ready pages. I’m fast, flexible, and pixel-perfect.`,
            link: "https://pagebuilder.sirz.co.uk/",
            linkText: "Explore Page Builder"
        },
    ];
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden py-12 sm:w-[80%] w-[90%] mx-auto"
        >
            <div className="text-center">
                <h2 className="text-3xl font-bold leading-relaxed text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-4">
                    Introducing Sirz AI Agents — Your <span className=" italic text-colorBlueDeep">Smart</span> Business Team.
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 sm:max-w-[60%] py-4 mx-auto">
                    Sirz&apos;s AI-powered agents are digital specialists designed to help you launch brands, generate leads, build landing pages, create content, and automate sales—faster and smarter.
                </p>
            </div>

            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden sm:w-[80%] mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            agents.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    onClick={() => window.open(item.link, '_blank')}
                                    className="overflow-hidden border-4 cursor-pointer border-gray-100 dark:border-gray-700 rounded-3xl"
                                >
                                    <img src={item.img} alt="" className=" mx-auto object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-xl font-semibold italic mb-2 bg-gradient-to-r from-[#45C4F9] via-[#7D09FF] to-[#FF0BE5] bg-clip-text text-transparent">{item.intro}</p>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                                        <a href={item.link} className="text-blue-600 underline font-semibold hover:underline">{item.linkText}</a>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}