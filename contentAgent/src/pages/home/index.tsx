import LeadScoringHero from './components/hero';
import NavBar from '../../components/layout/nav';
import Analytics from './components/analytics';
import SmartFeatures from './components/smartFeatures';
import { Footer } from '../../components/layout/footer';
import CreateToday from './components/createToday';
import BuiltFor from './components/builtFor';
import Section from './components/section';
import TestimonialSection from './components/testimonial';
import Video from './components/video';


export default function Home() {

    return (
        <div className=" ">
            <NavBar />
            <LeadScoringHero />
            <Analytics />
            <CreateToday />
            <BuiltFor />
            <SmartFeatures />
            <TestimonialSection />
            <Section />
            <Video />
            <Footer />
        </div>
    )
}