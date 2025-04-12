import heroBg from './images/Frame 1775.png';
import onboardinLogo from './images/sirz logo png 1.png';
import titleBorder from './images/Frame 3.png';
import markIcon from './images/Group.png';
import Button from '../../components/common/button';
import serviceShow from './images/Frame 1772 (2).png';
import emailImg from './images/bro.png';
import missionImg from './images/Group 1.png';
import indexOne from './images/index (1).png';
import indexTwo from './images/index (2).png';
import indexThree from './images/index (3).png';
import indexFour from './images/index (4).png';
import indexFive from './images/index (5).png';
import { FacebookIcon, InstagramIcon, LinkedlnIcon } from '../../assets/icons/svg';
import { socialLinks } from '../../utils';
import { DashbordVector, sirzLogoWhite, VidDemonstration } from '../../assets';
import WaterflowCards from './slider';
import WaterflowCardTwo from './slider2';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes/desc';
import HeaderFormat from '../../components/header';
import { motion } from 'framer-motion';
import DashboardLetterForm from '../contact/components/dashbordForm';

const expectationData = [
    `A consultative approach, where we listen to your business needs and tailor our services accordingly. `,
    `A dedicated project manager to guide you through every step of the journey.`,
    `Access to our Sirz Portal, where you can track your projects, submit requests, and communicate with our team`,
    `A structured process that ensures transparency, communication, and efficiency.`,
];

const portalOverview = [
    {
        img: indexOne,
        title: `Dashboard Access`,
        text: `View active and completed projects, track progress, and stay updated.`
    },
    {
        img: indexTwo,
        title: `Task Management`,
        text: `Submit requests for services, assign priorities, and set deadlines.`
    },
    {
        img: indexThree,
        title: `Communication Hub`,
        text: `Send messages directly to your dedicated project manager and receive real-time updates.`
    },
    {
        img: indexFour,
        title: `File Sharing`,
        text: `Upload and access important documents and assets for your projects.`
    },
    {
        img: indexFive,
        title: `Performance Reports`,
        text: `Get insights and analytics on your project performance.`
    },
];

const steps = [
    {
        text: `Review the onboarding guide to familiarize yourself with our processes and the Sirz Portal.`
    },
    {
        text: `Complete any necessary intake forms to provide us with key details about your business`
    },
    {
        text: `Schedule a kickoff meeting with your assigned project manager to discuss goals and expectations.`
    },
    {
        text: `Start submitting requests via the Sirz Portal and begin your journey with us`
    },
]

export default function OnboardingPage() {
    const navigate = useNavigate();

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
        <div className="max-w-[1440px] mx-auto">
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='p-2'
            >
                <div
                    style={{
                        backgroundImage: `url(${heroBg})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: 'no-repeat'
                    }}
                    className='rounded-lg overflow-hidden'
                >
                    <div className='bg-[#00000062]'>
                        <div className='flex items-center justify-center min-h-screen flex-col px-4'>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img src={onboardinLogo} alt="" />
                            </motion.div>
                            <motion.h4 
                                className='text-[30px] sm:text-[45px] font-bold text-colorDefaultLight py-5 text-center'
                                {...fadeInUp}
                            >
                                Get started with <i className='text-colorGreen'>SIRz</i> in just a few simple steps
                            </motion.h4>
                            <motion.button 
                                className="tracking-widest bg-white dark:text-black rounded-full w-full sm:w-[30%] py-4 cursor-pointer text-sm px-8 font-medium floating-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(ROUTES.DASHBOARD.PATH)}
                                {...fadeInUp}
                            >
                                Get started
                            </motion.button>
                        </div>
                    </div>
                </div>

                <motion.div 
                    className='bg-colorLight dark:bg-colorDark border-t-8 mt-[-5em] pb-10 rounded-t-3xl mx-auto border-colorGreen max-w-[1200px]'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className='max-w-[800px] mx-auto text-center px-4'>
                        <motion.header className='flex items-center justify-center py-5' {...fadeInUp}>
                            <div>
                                <h1 className='font-semibold text-[30px]'>Welcome to SIRz</h1>
                                <img src={titleBorder} alt="" className='w-[100px] mx-auto' />
                            </div>
                        </motion.header>
                        <motion.p {...fadeInUp}>We believe in providing customized, results-driven solutions for businesses. Our clients benefit from our years of expertise, cutting-edge strategies, and hands-on approach.</motion.p>
                    </div>

                    <motion.div className='text-center pt-6' {...fadeInUp}>
                        <i className='text-colorGreen font-bold text-2xl'>Here's what you can expect:</i>
                        <motion.ul 
                            className='max-w-[800px] mx-auto pt-6 px-4'
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {expectationData.map((data, index) => (
                                <motion.li 
                                    key={index} 
                                    className='text-left flex items-start pt-4 gap-4'
                                    variants={fadeInUp}
                                >
                                    <img src={markIcon} alt="" className='h-[20px]' />
                                    <p>{data}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                        <motion.div {...fadeInUp}>
                            <Button 
                                text='Learn more about us' 
                                onClick={() => navigate(ROUTES.ABOUT.PATH)} 
                                className='mt-10 sm:w-[30%] mx-auto' 
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            <motion.section 
                className='max-w-[1200px] mx-auto py-10 px-4'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <img src={serviceShow} alt="" className="w-full" />
            </motion.section>

            <motion.section 
                className='bg-colorLight dark:bg-colorDark'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className='max-w-[1200px] mx-auto grid sm:grid-cols-5 gap-14 py-12 px-4'>
                    <motion.div 
                        className='sm:col-span-2'
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={missionImg} alt="" className='w-full' />
                    </motion.div>
                    <motion.div 
                        className='sm:col-span-3 my-auto'
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className='pb-5'>
                            <i className='text-colorGreen font-bold text-2xl'>Who Are We?</i>
                            <p className='leading-8 tracking-wider'>
                                SIRz is a technology-driven, innovation-focused company
                                dedicated to delivering high-quality digital solutions. We work
                                with businesses of all sizes, from startups to established
                                enterprises, helping them navigate the digital landscape
                                effectively
                            </p>
                        </div>
                        <div>
                            <i className='text-colorGreen font-bold text-2xl'>Our Mission:</i>
                            <p className='leading-8 tracking-wider'>
                                Our mission is to empower businesses with the tools and
                                strategies needed to succeed in today's competitive market.
                                We believe in data-driven decision-making, creativity,
                                and leveraging technology to help brands stand out, grow,
                                and achieve long-term success.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <header className='flex items-center justify-center py-5'>
                    <div className='text-center max-w-[800px] mx-auto px-4'>
                        <h1 className='font-semibold text-[35px]'>Sirz Portal Overview</h1>
                        <img src={titleBorder} alt="" className='w-[120px] mx-auto max-sm:pb-5' />
                        <i>Our Sirz Portal is a one-stop project management platform designed to keep everything organized and efficient. Here's how it works</i>
                    </div>
                </header>
                <motion.div 
                    className='grid sm:grid-cols-5 max-w-[1200px] mx-auto gap-5 px-4'
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {portalOverview.map((data, index) => (
                        <motion.div 
                            key={index} 
                            className='bg-colorLight dark:bg-colorDark border-b-8 px-4 py-5 border-colorGreen rounded-xl'
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img src={data.img} alt="" className='h-[50px]' />
                            <h4 className='font-semibold py-2'>{data.title}</h4>
                            <div className='text-sm'>{data.text}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            <motion.section 
                className='pt-16'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className='text-colorGreen italic font-bold text-[25px] text-center max-w-[800px] mx-auto mb-6'>
                    Turning Ideas into Impact..
                </div>
                <div className='py-5'>
                    <WaterflowCards />
                    <WaterflowCardTwo />
                </div>
                <div className='text-colorGreen italic font-bold text-center text-[25px] max-w-[800px] mx-auto'>
                    One Success Story at a Time!
                </div>
            </motion.section>

            <motion.section 
                className='bg-colorLight dark:bg-colorDark py-5 my-10'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <header className='flex items-center justify-center py-5'>
                    <div className='text-center max-w-[800px] mx-auto px-4'>
                        <h1 className='font-semibold text-[35px]'>Ready To Get Started?</h1>
                        <img src={titleBorder} alt="" className='w-[120px] mx-auto' />
                    </div>
                </header>
                <motion.div 
                    className='grid sm:grid-cols-4 max-w-[1200px] mx-auto gap-5 px-4'
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {steps.map((data, index) => (
                        <motion.div 
                            key={index} 
                            className='bg-colorBlueDeep text-white border-b-8 px-4 py-5 border-colorGreen rounded-xl'
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h4 className='font-bold py-2 text-[40px]'>0{index + 1}</h4>
                            <div className='text-sm'>{data.text}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            <motion.section 
                className='bg-[#FAFAFA] dark:bg-colorDefaultDark'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <section className='pt-16 max-w-[1200px] mx-auto pb-8 px-4'>
                    <div className='text-colorGreen italic font-bold text-[25px] text-center max-w-[800px] mx-auto mb-6'>
                        Take a quick tour - Watch this demonstration video on how you to use our client portal
                    </div>
                    <motion.div 
                        className='pb-7'
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src={VidDemonstration} alt="" className='rounded-tr-2xl rounded-tl-2xl w-full' />
                    </motion.div>

                    <div className='flex justify-center'>
                        <Button text="Client portal sign up" onClick={() => { }} className='sm:w-[250px] w-full' />
                    </div>
                </section>
            </motion.section>

            <motion.section 
                className="bg-colorLight dark:bg-colorDark py-10 bg-dashboard-form-gradient"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <header className="max-w-[800px] mx-auto text-white px-4">
                    <HeaderFormat title="Schedule a free consultation" />
                    <h4 className="font-bold max-sm:text-center pt-5 sm:text-[22px] text-[17px]">
                        Let's Talk! Book a free consultation and discover how we can elevate your business
                    </h4>
                </header>
                <div className='flex justify-center items-center mt-3'>
                    <img src={DashbordVector} alt="" />
                </div>
                <div className="max-w-[800px] mx-auto sm:mt-16 mt-10 px-4">
                    <DashboardLetterForm />
                </div>
            </motion.section>

            <motion.footer
                className="bg-colorGreenDeeper pt-4 mt-32 pb-8 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className='absolute top-[-75px] right-0 left-0 bg-colorGreen max-w-[800px] mx-auto rounded-lg sm:py-10 py-5'>
                    <div className='max-w-[700px] mx-auto flex items-center gap-8 px-4'>
                        <img src={emailImg} alt="" className='h-[80px]' />
                        <div>
                            <h4 className='font-semibold leading-4 pb-3'>
                                Need some help or assistance? Or maybe you want to make an enquiry.
                            </h4>
                            <div className='text-sm'>Reach out to <a href="mailto:support@sirz.co.uk">[support@sirz.co.uk]</a></div>
                        </div>
                    </div>
                </div>
                <div className='max-w-[1200px] mx-auto sm:rounded-2xl sm:px-10 px-5 pt-28 pb-8'>
                    <div className="pb-12 border-b border-gray-400">
                        <div className='text-center flex items-center justify-center flex-col max-w-[800px] mx-auto'>
                            <img src={sirzLogoWhite} alt="" />
                            <div className='text-[20px] text-white pt-5'>
                                SIRz is your one-stop shop for E-commerce, Branding, and Digital Marketing, we help businesses launch, scale, and dominate in the digital space.
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex text-white flex-row items-center justify-center gap-x-5">
                            <a href={socialLinks.Facebook} target="_blank" rel="noopener noreferrer">
                                <LinkedlnIcon />
                            </a>
                            <a href={socialLinks.Facebook} target="_blank" rel="noopener noreferrer">
                                <FacebookIcon />
                            </a>
                            <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer">
                                <InstagramIcon />
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