import { motion } from "framer-motion";
import HeroSection from "./components/hero";
import SirzAgents from "./components/agents";
import Growth from "./components/growth";
import MeetSirz from "./components/meetSirz";
import OneYear from "./components/oneYear";
import Smarter from "./components/smarter";

export default function Agents() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
        >
             <HeroSection />
             <SirzAgents />
             <Growth />
             <MeetSirz />
             <OneYear />
             <Smarter />
        </motion.div>
    )
}