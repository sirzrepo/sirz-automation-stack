
// import { FacebookIcon, InstagramIcon, LinkedlnIcon } from '../../assets/icons/svg';
import { socialLinks } from '../../utils';
import { motion } from 'framer-motion';
import { SirzLogo, SirzLogoLight } from '../../assets';
import demoVideo from '../../assets/img/Full Demo.mp4';

import titleBorder from '../../assets/img/Ellipse 6.svg';
import titleBorder2 from '../../assets/img/Ellipse 7.svg';



// images
import heroFrame from '../../assets/img/Frame 8.png';
import heroFrame2 from '../../assets/img/Group 3.svg';
import heroFrame3 from '../../assets/img/Group 8 (1).png';

import agentImg from '../../assets/img/Frame 1767 (1).png';
import workImg from '../../assets/img/Group 20.png';
import rectangleImg from '../../assets/img/Rectangle 3.png';
import { Calendar1Icon, NotebookIcon } from 'lucide-react';
import AutomationContactForm from '../../components/Forms/contactForm';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';
import Automation from './automation';

const heroPictures = [
    heroFrame2,
    heroFrame,
    heroFrame3
]

const automationStack = [
    {
        img: Calendar1Icon,
        title: `SEO Keyword Bomber Agent`,
    },
    {
        img: NotebookIcon,
        title: `AI Content Creator Agent`,
    },
    {
        img: NotebookIcon,
        title: `Lead Scoring Engine`,
    },
    {
        img: NotebookIcon,
        title: `Smart Sales Chatbot`,
    },
    {
        img: NotebookIcon,
        title: `CRM Sync Automation`,
    },
];

export default function Home() {

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className=" ">
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className=''
            >
                <div
                    style={{
                        backgroundImage: `url(${rectangleImg})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: "white"
                    }}
                    className='rounded-lg overflow-hidden'
                >
                    <div className='py-16 sm:w-[80%] w-[90%] mx-auto'>
                        <div className='flex items-center justify-center min-h-screen flex-col px-4'>
                            <div className='border-b border-gray-300 w-full flex items-center justify-center pb-5'>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <img src={SirzLogo} alt="" className="sm:w-[130px] w-[70px] object-cover" />
                                </motion.div>
                            </div>
                            <motion.h4 
                                className='text-[30px] mt-16 text-black sm:text-[45px] sm:w-[60%] font-bold pb-12 text-center'
                                {...fadeInUp}
                            >
                                AUtomate Your <i className='text-colorBlueDeep'>Digital Marketing</i> Funnel From Search to Sale
                                <p className='text-sm font-normal w-[60%] mx-auto'>SEO Agent. Content Agent. Lead Scoring. Chatbots. CRM Sync. Fully automated. Totally connected.</p>
                            </motion.h4>
                            <section className='flex flex-col sm:flex-row gap-4 sm:w-[50%] pb-6 '>
                            <motion.button 
                            style={{ color: "white"}}
                                className="tracking-widest dark:text-black rounded-full w-full bg-colorBlueDeep py-4 cursor-pointer text-sm px-8 font-medium floating-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                // onClick={() => navigate(ROUTES.DASHBOARD.PATH)}
                                {...fadeInUp}
                            >
                                Contact sales
                            </motion.button>
                            <motion.button 
                                className="tracking-widest bg-white dark:text-black border-2 border-colorBlueLight rounded-full w-full py-4 cursor-pointer text-sm px-8 whitespace-nowrap font-medium floating-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                // onClick={() => navigate(ROUTES.DASHBOARD.PATH)}
                                {...fadeInUp}
                            >
                                Claim free strategy pdf
                            </motion.button>
                            </section>

                            <section className='grid sm:grid-cols-3 gap-4 items-baseline'>
                                {
                                    heroPictures.map((item, index) => (
                                        <div key={index} className=''>
                                            <img src={item} alt="" className=' object-cover' />
                                        </div>
                                    ))
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section 
                className='w-full bg-[#F1F3FF] mx-auto py-10 '
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Automation />
            </motion.section>

            <motion.section 
                className='bg-colorLight sm:w-[80%] w-[90%] mx-auto mt-10 rounded-xl px-4 dark:bg-colorDark'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className=' mx-auto grid sm:grid-cols-5 gap-14 py-12 px-4'>
                    <motion.div 
                        className='sm:col-span-2'
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={agentImg} alt="" className='' />
                    </motion.div>
                    <motion.div 
                        className='sm:col-span-3 my-auto text-md '
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className='pb-5'>
                            <i className='text-black font-bold text-2xl '>What is SIRz AI Agents?</i>
                            <p className='leading-8 tracking-wider pt-3'>
                                SIRz AI Agents is your all-in-one automation powerhouse — designed to turn your digital marketing funnel into a smart, self-optimizing engine.
                            </p>
                            <p className='leading-8 tracking-wider py-3'>
                                Built for growth-focused teams, SIRz brings together intelligent SEO discovery, high-speed content creation, real-time lead scoring, and an always-on AI chatbot — all fully synced with your CRM. From the moment someone searches, to the second your sales team steps in, every touchpoint is tracked, scored, and optimized to drive conversions.                            </p>
                            <p className='leading-8 tracking-wider'>
                                No more guesswork. No more disconnected tools. Just seamless automation that actually works — from search to sale.                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className='relative mt-20'
            >
                <header className='flex items-center justify-center py-5'>
                    <div className='text-center  mx-auto px-4'>
                        <h1 className='font-extrabold bg-gradient-to-r from-[#001F3E] via-[#203DA3] to-[#3752E9] text-transparent bg-clip-text text-[45px]'>Watch the Automation Stack in Action</h1>
                        <i className='text-lg font-normal'>See how each agent works individually — One smart system. From discovery to decision.</i>
                    </div>
                </header>
                <motion.div 
                    className=''
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <div className='sm:w-[80%] w-[90%] mx-auto grid sm:grid-cols-5 grid-cols-2 gap-5 px-4'>   
                    {automationStack.map((data, index) => (
                        <motion.div 
                            key={index} 
                            className='bg-colorLight text-center flex flex-col items-center text-sm dark:bg-colorDark px-4 py-5 text-zinc-600'
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <data.img className='w-14 h-14' />
                            <h4 className=' text-lg py-2'>{data.title}</h4>
                        </motion.div>
                    ))}
                    </div>
                    <div>
                        <img src={titleBorder} alt="" className='absolute top-0 sm:bottom-0 z-[-10] left-0' />
                        <img src={titleBorder2} alt="" className='absolute bottom-0 sm:top-0 z-[-10] right-0' />
                    </div>
                </motion.div>
               
            </motion.section>

            <motion.div className='sm:w-[80%] w-[95%] mx-auto pt-10'>
            <header className='flex flex-col items-center justify-center py-5 pb-20'>
                <div className='text-center max-w-[800px] mx-auto px-4'>
                    <h1 className='font-bold bg-gradient-to-r from-[#001F3E] via-[#203DA3] to-[#3752E9] text-transparent bg-clip-text sm:text-[35px] text-[20px]'>SEO Keyword Bomber Agent</h1>
                    <i className='text-lg font-normal'>See how our AI pinpoints high-intent keywords and connects them directly to your ideal customers — in real time.</i>
                </div>
                <motion.button 
                            className="tracking-widest sm:w-[25%] mt-4 bg-colorBlueDeep text-white  border-2 border-colorBlueLight rounded-full w-full py-4 cursor-pointer text-sm px-8 whitespace-nowrap font-medium floating-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            // onClick={() => navigate(ROUTES.DASHBOARD.PATH)}
                            {...fadeInUp}
                        >
                            Contact sales
                        </motion.button>
            </header>

                <div>
                    <video src={demoVideo} autoPlay loop muted />
                </div>
            </motion.div>

            <motion.section 
                className='pt-16 '
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <header className='flex items-center justify-center py-5'>
                    <div className='text-center max-w-[800px] mx-auto px-4'>
                        <h1 className='font-semibold text-[35px]'>How It All Works Together</h1>
                        <i>Your funnel becomes smarter, faster, and more predictable — with zero manual effort.</i>
                    </div>
                </header>
                <div className='py-5 sm:w-[80%] w-[90%] mx-auto'>
                    <img src={workImg} alt="" className=' object-cover w-full' />
                </div>
            </motion.section>

            <motion.section 
                className="bg-colorLight dark:bg-colorDark py-10 bg-dashboard-form-gradient"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <header className='flex items-center max-w-[800px] mx-auto text-white px-4 justify-center py-5'>
                    <div className='text-center max-w-[800px] mx-auto px-4'>
                        <h1 className='font-semibold text-[35px]'>Start Automating Today</h1>
                        <i>No fluff. Just results</i>
                    </div>
                </header>
                <div className="max-w-[60%] mx-auto sm:mt-8 mt-5 px-4">
                    <AutomationContactForm />
                </div>
            </motion.section>

            <motion.footer
                className="bg-colorGreenDeeper pt-4 mt-32 pb-8 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className='max-w-[1200px] mx-auto sm:rounded-2xl sm:px-10 px-5 pt-28 pb-8'>
                    <div className="pb-12 border-b border-gray-400">
                        <div className='text-center flex items-center justify-center flex-col max-w-[800px] mx-auto'>
                            <img src={SirzLogoLight} alt="" />
                            <div className='text-[20px] text-white pt-5'>
                                SIRz is your one-stop shop for E-commerce, Branding, and Digital Marketing, we help businesses launch, scale, and dominate in the digital space.
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex text-white flex-row items-center justify-center gap-x-5">
                            <a href={socialLinks.Facebook} target="_blank" rel="noopener noreferrer">
                                <IoLogoLinkedin className='text-[30px]' />
                            </a>
                            <a href={socialLinks.Facebook} target="_blank" rel="noopener noreferrer">
                                <IoLogoFacebook className='text-[30px]' />
                            </a>
                            <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer">
                                <IoLogoInstagram className='text-[30px]' />
                            </a>
                        </div>
                        <h4 className="text-[#fff] font-nexa-light text-[13px] text-center flex flex-col sm:flex-row items-center gap-2 sm:gap-8 font-thin">
                            <p>17 Barmouth Road marine parade LL42 1NA</p>
                            <p>074 07245685</p>
                            <a href="mailto:support@sirz.co.uk">
                                support@sirz.co.uk
                            </a>
                        </h4>
                    </div>
                </div>
            </motion.footer>
        </div>
    )
}