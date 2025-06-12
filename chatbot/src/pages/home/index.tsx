import LeadScoringHero from './components/hero';
import NavBar from '../../components/layout/nav';
import Analytics from './components/analytics';
import { Footer } from '../../components/layout/footer';
import Video from './components/video';
import Grow from './components/grow';
import WhyChoose from './components/whyChoose';
import HowItWorks from './components/howItWorks';
import Tailored from './components/tailored';
import Testimonials from './components/testimonials';
import { HeroImg } from '../../assets';


export default function Home() {

    return (
        <div className=" ">
            <div 
            style={{
                backgroundImage: `url(${HeroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className=" pb-28">
            <NavBar />
            <LeadScoringHero />
            </div>
            <div 
            style={{
                borderRadius: '50%'
            }}
            className=" h-32 bg-white mx-auto mt-[-60px] overflow-x-hidden">
                <div className=''>

                </div>
            </div>
            <Analytics />
            <Grow />
            <WhyChoose />
            <HowItWorks />
            <Tailored />
            <Testimonials />
            <Video />
            <Footer />
        </div>
    )
}