import Hero from "./components/hero";
import OurProjects from "./components/projects";
import WhoAreWe from "./components/whoWeAre";
import OurExpertise from "./components/ourExpertise";
import WhySirz from "./components/whySirz";
import SirzIsGreat from "./components/sirzIsGreat";
import OurBlog from "./components/ourBlog";
import GetInTouch from "./components/getInTouch";
import CustomerReviews from "./components/customerReviews";
import { motion } from "framer-motion";

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
};

export default function Home() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
        >
            <Hero />
            <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
                <motion.div {...fadeInUp}>
                    <WhoAreWe />
                </motion.div>
                <motion.div {...fadeInUp}>
                    <OurExpertise />
                </motion.div>
                <motion.div {...fadeInUp}>
                    <WhySirz />
                </motion.div>
                <motion.div {...fadeInUp}>
                    <SirzIsGreat />
                </motion.div>
                <motion.div {...fadeInUp}>
                    <OurProjects />
                </motion.div>
                <motion.div {...fadeInUp}>
                    <OurBlog />
                </motion.div>
                <motion.div {...fadeInUp}>
                    <GetInTouch />
                </motion.div>
            </div>
                
            <motion.div {...fadeInUp}>
                <CustomerReviews />
            </motion.div>   
        </motion.div>
    );
}
