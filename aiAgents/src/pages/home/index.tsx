
// import { FacebookIcon, InstagramIcon, LinkedlnIcon } from '../../assets/icons/svg';
import { scrollToElement, socialLinks } from '../../utils';
import { motion } from 'framer-motion';
import { DemoVideo, SirzLogo } from '../../assets';

// images
import heroFrame from '../../assets/img/Frame 8.png';
import heroFrame2 from '../../assets/img/Group 3.png';
import heroFrame3 from '../../assets/img/Group 8 (1).png';

// AI marketing model images
import seoImg from '../../assets/img/Frame 1773.png';
import contentImg from '../../assets/img/Frame 1776.png';
import leadImg from '../../assets/img/Frame 1773 (1).png';
import chatbotImg from '../../assets/img/Frame 1773 (2).png';
import crmImg from '../../assets/img/Frame 1773 (3).png';
import actionImg from '../../assets/img/Frame 1785.png';

import agentImg from '../../assets/img/Frame 1767 (1).png';
import workImg from '../../assets/img/Group 20.png';
import rectangleImg from '../../assets/img/Rectangle 3.png';
import { BarChartIcon, PencilIcon, SearchIcon } from 'lucide-react';
import AutomationContactForm from '../../components/Forms/contactForm';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';
import { MdChatBubbleOutline, MdUpdate, MdWeb } from 'react-icons/md';

const heroPictures = [
    heroFrame2,
    heroFrame,
heroFrame3
]

const automationCards = [
    {
        img: seoImg,
        title: `SEO Keyword Bomber Agent`,
        text: `Know exactly what your customers are searching for. Our SEO agent maps high-intent keywords to buyer journeys and sends real-time insights into your content pipeline.`,
        url: "Learn more about SEO Keyword Agent",
        link: "https://seo-bomber.sirz.co.uk/"
    },
    {
        img: contentImg,
        title: `AI Content Creator Agent`,
        text: `From blog posts to landing pages and email campaigns — get optimized, on-brand content in minutes. Tagged, tracked, and synced directly into your CRM.`,
        url: "Learn more about AI Content Creator Agent",
        link: "https://content-agent.sirz.co.uk/"
    },
    {
        img: leadImg,
        title: `Lead Scoring Engine`,
        text: `Every click, view, and action is tracked and scored in real time. Hot leads are flagged instantly, so your sales team only talks to people who are ready to buy.`,
        url: "Learn more about Lead Scoring Engine",
        link: "https://lead-scoring.sirz.co.uk/"
    },
    {
        img: chatbotImg,
        title: `Smart Sales Chatbot`,
        text: `Not just a chatbot. This AI-powered assistant qualifies leads, answers objections, books meetings, and updates your CRM — automatically.`,
        url: "Learn more about Smart Sales Chatbot",
        link: "https://chatbot.sirz.co.uk/"
    },
    {
        img: crmImg,
        title: `CRM Sync & Automation`,
        text: `Every touchpoint — SEO data, content performance, chatbot chats, lead scores — flows into your custom CRM. Fully automated and visible from one dashboard.`,
        url: "Learn more about CRM Sync & Automation",
        link: "https://ai-agents.sirz.co.uk/"
    },
    {
        img: actionImg,
        title: `Ready to See It in Action?`,
        text: `Let us show you how SIRz AI Agents can plug into your marketing funnel and turn it into a revenue engine.`,
        url: "Book a demo now",
        inverted: true
    }
]

const automationStack = [
    {
        img: SearchIcon,
        title: `SEO Keyword Bomber Agent`,
        link: "https://ai-agents.sirz.co.uk/"
    },
    {
        img: PencilIcon,
        title: `AI Content Creator Agent`,
        link: "https://content-agent.sirz.co.uk/"
    },
    {
        img: BarChartIcon,
        title: `Lead Scoring Engine`,
        link: "https://lead-scoring.sirz.co.uk/"
    },
    {
        img: MdChatBubbleOutline,
        title: `Smart Sales Chatbot`,
        link: "https://chatbot.sirz.co.uk/"
    },
    {
        img: MdUpdate,
        title: `CRM Sync Automation`,
        link: "https://ai-agents.sirz.co.uk/"
    },
    {
        img: MdWeb,
        title: `Landing Page Builder`,
        link: "https://pagebuilder.sirz.co.uk/"
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
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img src={SirzLogo} alt="" />
                            </motion.div>
                            <motion.h4 
                                className='text-[30px] mt-16 text-black sm:text-[45px] sm:w-[70%] font-bold pb-12 text-center'
                                {...fadeInUp}
                            >
                                Let Our AI Agents Run Your <i className='text-colorBlueDeep'>Marketing Funnel</i> From Lead Generation to Purchase
                                {/* AUtomate Your <i className='text-colorBlueDeep'>Digital Marketing</i> Funnel From Search to Sale */}
                                {/* Let Our AI Agents Run Your Marketing Funnel — From Lead Generation to Purchase */}
                                <p className='sm:text-[23px] text-[18px] mt-4 font-normal sm:w-[70%] mx-auto'>SEO Agent. Content Agent. Lead Scoring. Chatbots. CRM Sync. Fully automated. Totally connected.</p>
                            </motion.h4>
                            <section className='flex flex-col sm:flex-row gap-4 sm:w-[50%] pb-6 '>
                            <motion.button 
                            style={{ color: "white"}}
                                className="tracking-widest dark:text-black rounded-full w-full bg-colorBlueDeep py-4 cursor-pointer text-sm px-8 font-medium floating-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToElement('contact-form')}
                                {...fadeInUp}
                            >
                                Contact sales
                            </motion.button>
                            <motion.button 
                                className="tracking-widest bg-white dark:text-black border-2 border-colorBlueLight rounded-full w-full py-4 cursor-pointer text-sm px-8 whitespace-nowrap font-medium floating-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToElement('contact-form')}
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
                className='w-full bg-colorBlueLight mx-auto py-10 '
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.div 
                        className=' sm:w-[80%] w-[90%] mx-auto grid xl:grid-cols-3 md:grid-cols-2   gap-8'
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {
                            automationCards.map((data, index) => (
                                <motion.div 
                                    onClick={() => window.open(data.link, '_blank')}
                                    key={index} 
                                    className={` sm:p-9 p-6 border-colorGreen overflow-hidden rounded-xl ${data.inverted ? ' flex flex-col-reverse bg-dashboard-form-gradient text-white justify-between ' : 'bg-colorLight dark:bg-colorDark border-b-8 border-e-8'}`}
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    
                                    <div className=''>
                                        <h4 className='font-bold text-[20px]  py-2'>{data.title}</h4>
                                        <div className='text-md'>{data.text}</div>
                                        <div className={`text-[12px] cursor-pointer ${data.inverted ? "" : "text-colorBlueDeep"} underline font-semibold pt-2`}>{data.url}</div>
                                    </div>
                                    <img src={data.img} alt="" className=' object-contain w-full ' />
                                </motion.div>
                            ))
                        }
                    </motion.div>
            </motion.section>

            <motion.section 
                className='bg-colorLight sm:w-[70%] w-[90%] py-16 mx-auto dark:bg-colorDark'
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
                        <div className='pb-5 text-lg font-justify'>
                            <i className='text-black font-bold sm:text-[35px] text-[25px] '>What is SIRz AI Agents?</i>
                            <p className='leading-8 tracking-wider pt-6'>
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
                className='sm:w-[80%] w-[90%] mx-auto'
            >
                <header className='flex items-center justify-center py-5'>
                    <div className='text-center  mx-auto px-4'>
                        <h1 className='font-semibold text-[35px]'>Watch the Automation Stack in Action</h1>
                        {/* <img src={titleBorder} alt="" className='w-[120px] mx-auto max-sm:pb-5' /> */}
                        <i>See how each agent works individually — One smart system. From discovery to decision.</i>
                    </div>
                </header>
                <motion.div 
                    className='grid sm:grid-cols-6 grid-cols-2 gap-5 px-4'
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {automationStack.map((data, index) => (
                        <motion.div 
                        onClick={() => window.open(data.link, '_blank')}
                            key={index} 
                            className='bg-colorLight text-center flex flex-col items-center text-sm dark:bg-colorDark px-4 py-5 text-zinc-600 rounded-xl cursor-pointer'
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <data.img className='w-10 h-10' />
                            <h4 className=' text-lg py-2'>{data.title}</h4>
                        </motion.div>
                    ))}
                </motion.div>
                <header className='flex flex-col items-center justify-center py-5'>
                    <div className='text-center max-w-[800px] mx-auto px-4'>
                        <h1 className='font-semibold text-[25px]'>SEO Keyword Bomber Agent</h1>
                        <i>See how our AI pinpoints high-intent keywords and connects them directly to your ideal customers — in real time.</i>
                    </div>
                    <motion.button 
                        className="tracking-widest sm:w-[25%] mt-4 bg-colorBlueDeep text-white  border-2 border-colorBlueLight rounded-full w-full py-4 cursor-pointer text-sm px-8 whitespace-nowrap font-medium floating-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToElement('contact-form')}
                        {...fadeInUp}
                    >
                        Contact sales
                    </motion.button>
                </header>

                <div>
                    <video src={DemoVideo} width={'80%'} autoPlay loop muted className=' mx-auto' />
                </div>
            </motion.section>

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
                <div id='contact-form' className="max-w-[800px] mx-auto sm:mt-8 mt-5 px-4">
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
                            <img src={SirzLogo} alt="" />
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