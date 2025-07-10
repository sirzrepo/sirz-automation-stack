
import { motion } from 'framer-motion';
import { LeadScoringHeroBg } from '../../assets';

import LeadScoringHero from './components/hero';
import NavBar from '../../components/layout/nav';
import Analytics from './components/analytics';
import Manual from './components/manual';
import SmartFeatures from './components/smartFeatures';
import Gallery from './components/gallery';
import VideoSection from './components/videoSection';
import { Footer } from '../../components/layout/footer';
import AgentWrapper from './components/agent/wrapper';


export default function Home() {

    return (
        <div className=" ">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ 
                    backgroundImage: `url(${LeadScoringHeroBg})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundAttachment: 'fixed',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <NavBar />
                <LeadScoringHero />
                <Analytics />
            </motion.div>

            <Manual />
            <SmartFeatures />
            <VideoSection />
            <Gallery />
            <AgentWrapper />

            <Footer />
        </div>
    )
}