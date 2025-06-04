import { HomeBanner, HomeVector } from "../../../assets";
import Button from "../../../components/common/button";
import bgImg from '../../../assets/imgs/Screenshot (602).png'
import { ROUTES } from "../../../constants/routes/desc";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cardContent = [
    {
        title: "Customized Strategies",
        description: "No cookie-cutter solutions here! We tailor every strategy to fit your business needs, ensuring you get the best results for your brand's growth."
    },
    {
        title: "Dedicated Support",
        description: "Forget bots—our expert team is here to guide you every step of the way. We are real people, with real solutions and we deliver real success!"
    },
    {
        title: "Proven Growth",
        description: "We don't just promise results—we deliver them. Our data-driven approach has helped businesses scale and thrive in the digital space. Yours is next!"
    },
]

export default function Hero() {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={sectionRef} className="bg-colorGreenDeeper relative pt-6 overflow-hidden">
            <motion.div 
                style={{ y, opacity }}
                className="container mx-auto px-4 sm:px-6 lg:px-8"
            >
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src={bgImg} alt="Background" className="w-full h-auto" />
                </motion.div>
                
                <div className="relative border-l-[5px] max-sm:h-[300px] border-b-[10px] sm:rounded-3xl border-colorGreen overflow-hidden mt-8">
                    <motion.img 
                        src={HomeBanner} 
                        alt="Hero Banner" 
                        className="h-full w-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        whileHover={{ scale: 1.05 }}
                        // transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-r from-[#000000a8] to-[#00000080] flex items-center sm:ps-20">
                        <div className="max-sm:w-[90%] max-sm:m-auto">
                            <motion.header 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="sm:text-[40px] text-white text-[25px] relative z-10 leading-tight sm:font-bold"
                            >
                                Power Up Your <motion.i 
                                    className="text-colorGreen"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >Brand</motion.i> with Expert <br className="max-sm:hidden" /> E-commerce, Branding & Marketing <br className="max-sm:hidden" /> Solutions!
                            </motion.header>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="sm:w-[30%] w-[70%] py-6 max-sm:pt-10"
                            >
                                <Button text="Get started" onClick={() => navigate(ROUTES.DASHBOARD.PATH)} />
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 mt-[-4em] relative gap-5 w-[90%] py-8 m-auto">
                    {cardContent.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                            }}
                            className="ps-12 bg-white text-colorDark border-2 border-colorGreen pr-4 py-6 rounded-xl transition-all duration-300"
                        >
                            <motion.header 
                                className="text-black pb-2 font-bold text-lg"
                                whileHover={{ color: "#22c55e" }}
                            >
                                {item.title}
                            </motion.header>
                            <div className="text-sm text-gray-600">{item.description}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <motion.img 
                src={HomeVector} 
                alt="Vector" 
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
            />
        </section>
    )
}