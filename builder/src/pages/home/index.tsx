
import { motion } from 'framer-motion';

import LeadScoringHero from './components/hero';
import NavBar from '../../components/layout/nav';
import Analytics from './components/analytics';
import SmartFeatures from './components/smartFeatures';
import { Footer } from '../../components/layout/footer';
import PageInMinutes from './components/pageInMinutes';
import Stunning from './components/stunning';
import PageGeneratorForm from './components/pageGeneratorForm';


export default function Home() {

    return (
        <div className=" ">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-[#E4E1F5] via-[#FFFCF9] via-[#FFFCF9] via-[#E0F7D7] to-[#FBF7E1]"
            >
                <NavBar />
                <LeadScoringHero />
                <Analytics />
            </motion.div>

            <PageInMinutes />
            <SmartFeatures />
            <PageGeneratorForm />
            <Stunning />

            <Footer />
        </div>
    )
}