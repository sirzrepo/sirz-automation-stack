import onboardinLogo from './images/sirz logo png 1.png';
import titleBorder from './images/Frame 3.png';
import markIcon from './images/Vector.png';
import emailImg from './images/bro.png';
// import Button from '../../components/common/button';
import { FacebookIcon, InstagramIcon, LinkedlnIcon } from '../../assets/icons/svg';
import { socialLinks } from '../../utils';
// import { sirzLogoWhite } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes/desc';
import { BlogCardFour, BlogCardOne, BlogCardThree, BlogCardTwo, ClientRevO, ClientRevT, Fivestar, FiveStar, FunnelStartFinish, sirzLogoWhite } from '../../assets';
import Button from '../../components/common/button';
import HeaderFormat from '../../components/header';
// import ContactLetterForm from '../contact/components/contactForm';
// import { useAppSelector } from '../../app/hook';
// import { allReduxSliceInfo } from '../../features/reduxSlice';

// hero images
import rightLargeImg from './images/image 13.png';
import heroSectionBg from './images/herosection bg.png';

// service images
import serviceOneImg from './images/Frame 55.png';
import serviceTwoImg from './images/Frame 55 (1).png';
import serviceThreeImg from './images/Frame 55 (2).png';

// projects
import poepleImg from './images/Frame 6.png';
import rectangleImg from './images/Rectangle 8.png';
import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

// ebook designs
import ebookCardOne from './images/frameCard (1).png';
import ebookCardTwo from './images/frameCard (2).png';
import ebookCardThree from './images/frameCard (3).png';
import ebookCardFour from './images/frameCard (4).png';
import ebookCardFive from './images/frameCard (5).png';

// books
import bookImgOne from './images/book (1).png';
import bookImgTwo from './images/book (2).png';
import bookImgThree from './images/book (3).png';

// seal images
import sealImg from './images/Frame 1808.png';
import sealImgTwo from './images/Frame 1807 (1).png';



const services = [
    {
        title: `Branding That Stands Out`,
        text: `Crafting unique, unforgettable brand identities`,
        img: serviceOneImg
    },
    {
        title: `E-commerce That Converts`,
        text: `Building seamless shopping experiences.`,
        img: serviceTwoImg
    },
    {
        title: `Digital Marketing That Drives Growth`,
        text: `Data-driven strategies for ROI.`,
        img: serviceThreeImg
    },
];

const customerReviews = [
    {
        review: `“ Working with SIRz completely transformed our brand. They didn’t just design a logo; they built an identity that truly reflects our vision. The attention to detail and creativity were beyond our expectations! “`,
        name: `James Osborne, `,
        title: `Founder of Brandcom`,
        img: ClientRevO,
        rate: FiveStar,
    },
    {
        review: `From concept to execution, SIRz made the entire process seamless. Their project management approach ensured we stayed on track, and the results speak for themselves!`,
        name: `Aisha K.`,
        title: `COO of Moss and Glow Beauty`,
        img: ClientRevT,
        rate: Fivestar,
    },
]

const projects = [
    {
        question: `Moss & Glow Beauty`,
        answer: `Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products.`
    },
    {
        question: `Wellness Studio 360`,
        answer: `Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products.`
    },
    {
        question: `Brandcom`,
        answer: `Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products.`
    },
    {
        question: `DentiQ`,
        answer: `Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products.`
    },
]



const dataImg = [
    BlogCardOne,
    BlogCardTwo,
    BlogCardThree,
    BlogCardFour,
];

const ebookImg = [
    ebookCardOne,
    ebookCardTwo,
    ebookCardThree,
    ebookCardFour,
    ebookCardFive,
];
const bookImg = [
    bookImgOne,
    bookImgTwo,
    bookImgThree,
];

const serviceNames = [
    "Branding",
    "Digital marketing",
    "E-commerce"
]

const steps = [
    {
        text: `We provide high-quality, conversion-focused sales funnel designs tailored to your brand. Expect engaging landing pages, optimized copy, and seamless integrations that drive results.`,
        title: `Deliverables `,
    },
    {
        text: `Our streamlined process ensures delivery within eight (8) weeks. From strategy to launch, we work efficiently while maintaining top-tier quality.`,
        title: `Timeline `,
    },
    {
        text: `We refine until it's right! Our process includes three (3) revision rounds to ensure your sales funnel aligns perfectly with your vision and goals.`,
        title: `Revisions `,
    },
];

const funnelNext = [
    { tittle: `01 - Finalise Scope`, text: `We’ll define the project scope, ensuring every detail aligns with your goals. This step sets clear expectations and a solid foundation for success.` },
    { tittle: `02 - Pay Deposit`, text: `Secure your project spot with an initial deposit. This allows us to allocate resources and begin crafting your high-converting sales funnel.` },
    { tittle: `03 - Sign Contract`, text: `We’ll formalize our collaboration with a contract that outlines deliverables, timelines, and expectations—keeping everything transparent and aligned.` },
    { tittle: `04 - Project Commencement`, text: `With everything set, we kick off your project! Our team will start bringing your vision to life with strategy, design, and seamless execution.` },
]

export default function SalesFunnel() {
    const navigate = useNavigate();
    // const { isDarkMode } = useAppSelector(allReduxSliceInfo);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };
    return (
        <div>
            <section className=''>
                <div
                    style={{
                        backgroundImage: `url(${heroSectionBg})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: 'no-repeat'
                    }}
                    className=' py-3 '
                >
                    <div className=' top-0'>
                        <div className=' flex items-center text-colorDefaultLight pt-10 justify-center sm:w-[90%] w-[95%] text-center m-auto flex-col h-screen'>
                            <div>
                                <img src={onboardinLogo} alt="" />
                            </div>
                            <h4 className=' sm:text-[60px] text-[35px] leading-tight font-extrabold pt-2'>Transform <i className=' text-colorGreen'>Your Business</i> with SIRz: Where Innovation Meets Growth</h4>
                            <p className=' py-5 sm:w-[50%] w-[80%] text-[15px] sm:text-[20px] mb-6'>
                                We don’t just execute projects; we create success stories.
                                Partner with us for top-tier e-commerce, branding, and digital marketing solutions.
                            </p>
                            <button className={` tracking-widest bg-white text-black rounded-full sm:w-[25%] w-[70%]
                                'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                                `}
                                onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                                Get started
                            </button>
                            <div className=' sm:flex gap-3 pt-7 sm:w-[90%] w-[70vw] overflow-x-scroll px-2 hideScrollBar m-auto text-colorGreen sm:justify-center pb-10 grid grid-cols-1'>
                                {
                                    serviceNames.map((data, index) => (
                                        <div>
                                            <div key={index} className=' flex items-center max-sm:pr-10 px-10 rounded-full whitespace-nowrap py-[7px] gap-2 text-sm border-colorGreen border'>
                                                <img src={markIcon} alt="" />
                                                {data}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=' py-10'>
                <div className='border-t-[2px] border-colorGreen w-[90%] m-auto pt-4 grid grid-cols-3'>
                    <div className='text-center border-r-[2px] border-colorGreen flex flex-col justify-center align-middle'>
                        <h4 className=' text-colorBlueDeep font-extrabold text-[40px] sm:text-[60px]'>50+</h4>
                        <p className='text-[20px] font-medium'>Clients</p>
                    </div>
                    <div className='text-center flex flex-col justify-center align-middle'>
                        <h4 className=' text-colorBlueDeep font-extrabold text-[40px] sm:text-[60px]'>50+</h4>
                        <p className='text-[20px] font-medium'>Projects</p>
                    </div>
                    <div className='text-center border-s-[2px] border-colorGreen flex flex-col justify-center align-middle'>
                        <h4 className=' text-colorBlueDeep font-extrabold text-[40px] sm:text-[60px]'>50+</h4>
                        <p className='text-[20px] font-medium'>Brands</p>
                    </div>
                </div>
            </section>

            <section className='bg-colorLight dark:bg-colorDark'>
                <div className="sm:w-[85%] w-[90%] m-auto pt-8 ">
                    <section className=" sm:grid grid-cols-2 gap-12 items-center text-sm justify-between pb-10">
                        <div className=" text-left pt-10">
                            <section className="flex items-center gap-3  pb-5">
                                <HeaderFormat title="Who are we?" />
                            </section>
                            <header className="sm:text-[40px] text-[30px] leading-tight font-bold">Ready to build a <i className=" text-colorBlueDeep">brand</i> that thrives? Let's make it happen!</header>
                            <div className="sm:w-[40%] w-[80%] py-8 m-auto sm:m-0">
                                <Button text="Learn more" onClick={() => navigate(ROUTES.SERVICE_BRANDING.PATH)} />
                            </div>
                        </div>
                        <div className="text-[20px] leading-8 text-zinc-500 text-justify font-normal ">
                            <div>
                                At SIRz, we don’t just build brands—we fuel their success. As your one-stop shop for E-commerce, Branding, and Digital Marketing, we help businesses launch, scale, and dominate in the digital space.
                            </div>
                            <div>
                                With a team of creatives, strategists, and tech experts, we blend innovation with data-driven results—so you can focus on growing while we handle the heavy lifting.
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className='bg-[#FAFAFA] dark:bg-colorDefaultDark'>
                <section className=' w-full m-auto'>
                    <div className=' sm:w-[70%] w-[95%] m-auto pb-10 text-center'>
                        <header className=' flex items-center justify-center py-5'>
                            <div>
                                <h1 className=' font-semibold capitalize text-[45px]'>our <i className=' text-colorGreen'>services</i> - what we offer</h1>
                                <img src={titleBorder} alt="" className=' w-[100px] m-auto' />
                            </div>
                        </header>
                        <i className='font-medium text-[18px]'>
                            From branding to e-commerce and digital marketing, our services are designed to elevate your brand and maximize impact.
                        </i>
                    </div>
                    <div className='  bg-colorLight dark:bg-colorDark mb-10 divide-slate-300 sm:divide-x border-t grid sm:grid-cols-3 grid-cols-1'>
                        {
                            services.map((data, index) => (
                                <div key={index} className=' px-10 py-6 sm:flex-none flex flex-col justify-center items-center text-center'>
                                    <header className=' capitalize text-colorBlueDeep text-[19px] font-bold'>{data.title}</header>
                                    <div className='text-[16px] pb-7'>{data.text}</div>
                                    <img src={data.img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </section>
            </section>

            <section>
                <div className=' sm:w-[70%] w-[95%] m-auto pb-10 text-center'>
                    <header className=' flex items-center justify-center py-5'>
                        <div>
                            <h1 className=' font-semibold capitalize text-[45px]'>our previous <i className=' text-colorGreen'>projects</i></h1>
                            <img src={titleBorder} alt="" className=' w-[100px] m-auto' />
                        </div>
                    </header>
                    <i className='font-medium text-[18px]'>
                        Take a look at some of the incredible projects we’ve worked on. From branding transformations to high-converting e-commerce platforms, our work speaks for itself.
                    </i>
                </div>
                <div
                    style={{
                        // backgroundImage: `url(${rectangleImg})`,
                        backgroundPosition: "center",
                        // backgroundSize: "cover",
                        backgroundRepeat: 'no-repeat'
                    }}
                    className='relative max-xl:py-5 max-xl:bg-salesFunnelBackgroundGradient'
                >
                    <img src={rectangleImg} alt="" className=' max-xl:hidden ' />
                    <div className=' m-auto xl:absolute top-0 pt-10'>
                        <header className='text-white text-[35px] ms-10'>Innovative Brand-niche Websites</header>
                        <div className='grid sm:grid-cols-5 sm:gap-8 pt-8'>
                            <div className="space-y-4 col-span-2 w-[90%] text-zinc-400 m-auto ">
                                {projects.map((faq, index) => (
                                    <div key={index} className=" pb-5 ">
                                        <button
                                            className="flex justify-between border-b border-zinc-500 pb-3 w-full text-left text-lg"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            <div className={`flex items-center ${openIndex === index ? "text-colorLight" : "text-zinc-400"} gap-4 text-[25px] sm:text-[35px]`}>
                                                <p className={`${openIndex === index ? "text-colorGreen border-colorGreen" : "text-[#227272] border-[#227272]"} text-lg border rounded-3xl py-1 px-4`}>0{index + 1}</p>
                                                {faq.question}
                                                {/* #3ACBCC */}
                                            </div>
                                            {openIndex === index ? '' : <BsArrowRight />}
                                        </button>
                                        {openIndex === index && (
                                            <>
                                                <p className="pt-2 text-gray-400 dark:text-gray-400 dark:border-zinc-700 text-[20px]">{faq.answer}</p>
                                                <div className='flex items-center gap-2 pt-3 text-sm'>Read brand case study <BsArrowRight /></div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className=' col-span-3'>
                                <img src={poepleImg} alt="" className='h-[550px] object-cover w-full' />
                                <p className=' text-colorLight underline cursor-pointer text-lg ml-4 sm:ml-0'>View website</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-colorLight dark:bg-colorDefaultDark pt-6">
                <div className="py-10">
                    <div className=' sm:w-[85%] w-[95%] m-auto '>
                        <h4 className=" font-bold text-center pb-12 pt-4 sm:text-[45px] text-colorBlueDeep text-[35px] sm:leading-9">
                            Creative Graphics Designs & Ebook Designs
                        </h4>
                    </div>
                    <div className=" flex gap-4 sm:ps-16 sm:w-[98%] w-[90%] sm:ms-0 ms-7 hideScrollBar overflow-x-scroll">
                        {
                            ebookImg.map((img, index) => (
                                <img key={index} src={img} alt="" className=" object-cover sm:h-[500px]" />
                            ))
                        }
                    </div>
                </div>
            </section>

            <section>
                <div className=" grid grid-cols-3 py-10 gap-4 w-[90%] m-auto">
                    {
                        bookImg.map((img, index) => (
                            <img key={index} src={img} alt="" className=" object-cover " />
                        ))
                    }
                </div>
            </section>

            <section className="bg-colorLight dark:bg-colorDefaultDark pt-6">
                <div className=" sm:w-[85%] w-[90%] m-auto py-10">
                    <div className=''>
                        <h4 className=" font-bold text-center pb-8 pt-4 sm:text-[45px] text-colorBlueDeep text-[40px] sm:leading-9">
                            Social Media Management                   </h4>
                    </div>
                    <div className=" grid grid-cols-4 gap-0">
                        {
                            dataImg.map((img, index) => (
                                <img key={index} src={img} alt="" className=" object-cover" />
                            ))
                        }
                    </div>
                </div>
            </section>


            <section className=' sbg-colorLight dark:bg-colorDark py-5 my-10 bg-[#001F3E]'>
                <div className='w-[80%] m-auto'>
                    <header className='py-5'>
                        <h1 className=' font-semibold font-Helvetica text-white text-[35px]'>OUR PROCESS..</h1>
                    </header>
                    <div className=' grid sm:grid-cols-3 wd-[90%] m-auto gap-5'>
                        {
                            steps.map((data, index) => (
                                <div key={index} className=' bg-white text-black px-4 py-5 rounded-xl'>
                                    <h4 className=' font-bold py-2 text-[40px]' style={{
                                        background: 'linear-gradient(10deg, #001F3E, #203DA3, #3752E9)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>0{index + 1}</h4>
                                    <h2 className='font-bold pb-1 text-base'>{data.title}</h2>
                                    <div className='text-[17px]'>
                                        {data.text}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className=' py-8'>
                <div className=' grid sm:grid-cols-3 grid-cols-2 max-sm:gap-2 sm:w-[90%] w-[95%] m-auto max-sm:pb-8'>
                    <div>
                        <img src={sealImg} alt="" />
                    </div>
                    <div className=' max-sm:hidden flex items-center justify-center flex-col py-5'>
                        <div>
                            <h1 className=' font-bold capitalize sm:text-[25px]'>Seal the Deal</h1>
                            <img src={titleBorder} alt="" className=' sm:w-[100px] w-[70px] m-auto' />
                        </div>
                        <div className='sm:text-[45px] text-[30px] font-bold text-center pb-5'>
                            Ready to Elevate Your <i className=' text-colorGreen'>Business</i>?
                        </div>
                        <Button text="Get started" onClick={() => navigate(ROUTES.DASHBOARD.PATH)} className=' w-[50%] max-sm:hidden' />
                    </div>
                    <div className='items-end justify-end flex'>
                        <img src={sealImgTwo} alt="" />
                    </div>
                </div>
                <div className='  sm:hidden flex items-center justify-center flex-col py-5'>
                    <div>
                        <h1 className=' font-bold capitalize sm:text-[25px]'>Seal the Deal</h1>
                        <img src={titleBorder} alt="" className=' sm:w-[100px] w-[70px] m-auto' />
                    </div>
                    <div className='sm:text-[45px] text-[30px] font-bold text-center pb-5'>
                        Ready to Elevate Your <i className=' text-colorGreen'>Business</i>?
                    </div>
                    <Button text="Get started" onClick={() => navigate(ROUTES.DASHBOARD.PATH)} className=' w-[50%] max-sm:hidden' />
                </div>
                {/* <Button text="Get started" onClick={() => { }} className=' w-[50%] sm:hidden m-auto ' /> */}
            </section>

            <section className='bg-dashboard-form-gradient py-8'>
                <div className='sm:w-[80%] w-[90%] m-auto text-white'>
                    <header>
                        <h1 className='text-5xl font-Helvetica font-bold mb-10'>WHAT’S NEXT???</h1>
                    </header>
                    <section className='grid sm:grid-cols-2 grid-cols-1 gap-7'>
                        {funnelNext.map((data, index) => (
                            <div key={index}>
                                <h2 className='font-bold text-lg pb-1'>{data.tittle}</h2>
                                <p>{data.text}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </section>

            <section>
                <img src={FunnelStartFinish} alt="" />
            </section>

            <section className='bg-salesFunnelBackgroundGradient'>
                <div
                    style={{
                        backgroundImage: `url(${rightLargeImg})`,
                        backgroundPosition: "-10em -5em",
                        backgroundSize: "cover",
                        backgroundRepeat: 'no-repeat'
                    }}
                    className='py-5 text-white'>
                    <section className='w-[90%] m-auto'>
                        <header className=' sm:w-[65%] w-[95%]'>
                            <h2 className='sm:text-6xl text-4xl font-bold mb-5'>CLIENT’S REVIEW..</h2>
                            <p className='sm:text-[30px] text-[20px]'>Our clients are at the heart of everything we do. Here’s what they have to say about working with SIRz!</p>
                        </header>
                        <div className='grid sm:grid-cols-2 gap-4 m-auto py-10'>
                            {
                                customerReviews.map((data, index) => (
                                    <div key={index} className='text-center flex items-center flex-col border rounded-xl p-10 bg-[#001F3E99]'>
                                        <img src={data.img} alt="" className=' rounded-full h-32 w-32 object-cover ' />
                                        <img src={data.rate} alt="" />
                                        <p className='sm:text-[20px] text-[18px] py-3'>
                                            {data.review}
                                        </p>
                                        <b>{data.name}</b>
                                        <p className='text-[12px]'>{data.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </section>
            {/* 
            <section className=" bg-colorLight dark:bg-colorDark py-10">
                <header className="sm:w-[45%] sm:ps-16 w-[90%] max-sm:m-auto">
                    <HeaderFormat title="Schedule a free consultation" />
                    <h4 className=" sm:font-extrabold font-bold  max-sm:text-center pt-5 sm:text-[22px] text-[17px]">
                        Let’s Talk! Book a free consultation and discover how we can elevate your business
                    </h4>
                </header>
                <div className="bg-white dark:bg-colorDefaultDark sm:w-[60%] w-[90%] m-auto p-6 sm:mt-16 mt-10 border-b-[7px] border-s-[5px] border-colorGreen rounded-xl">
                    <header className="relative">
                        <div className=" sm:w-[70%]">
                            <h4 className=" font-bold">Let's get started</h4>
                            <p className="  max-sm:text-justify pt-1 sm:text-[13px] text-[13px]">
                                Please fill in the details correctly and let us know about the services you are interested in
                            </p>
                        </div>
                        <div className="absolute top-3 right-0"><img src={isDarkMode ? sirzLogoWhite : sirzLogo} alt="" className=" h-3" /></div>
                    </header>
                    <div>
                        <ContactLetterForm />
                    </div>
                </div>
            </section> */}

            <section className=' bg-[#FAFAFA] dark:bg-colorDefaultDark'>
                <div className='py-8 w-[90%] m-auto'>
                    <h1 className='sm:text-[85px] text-[40px] sm:w-[80%] w-[95%] font-bold mb-6 '>ANY QUESTIONS OR THOUGHTS? OR MAYBE YOU SHOULD SAY HELLO</h1>
                    <p className='w-[90%] sm:w-[40%] text-[25px]'>Contact us via email on  <span className='underline'>[support@sirz.co.uk] or via</span> mobile on 074 07245685</p>
                </div>
            </section>

            <footer
                className=" bg-colorGreenDeeper pt-4 mt-32 pb-8 relative"
            >
                <div className=' absolute top-[-75px] right-0 left-0 bg-colorGreen sm:w-[50%] w-[90%] m-auto rounded-lg sm:py-10 py-5'>
                    <div className='w-[85%] m-auto flex items-center gap-8'>
                        <img src={emailImg} alt="" className='h-[80px]' />
                        <div>
                            <h4 className=' font-semibold leading-4 pb-3'>
                                Need some help or assistance? Or maybe you want to make an enquiry.
                            </h4>
                            <div className='text-sm'>Reach out to <a href="mailto:support@sirz.co.uk" >[support@sirz.co.uk]</a></div>
                        </div>
                    </div>
                </div>
                <div className='sm:w-[90%] m-auto sm:rounded-2xl sm:px-10 px-5 pt-28 pb-8'>
                    <div className=" pb-12 border-b border-gray-400 mx-auto">
                        <div className='text-center flex items-center justify-center flex-col sm:w-[70%] m-auto'>
                            <img src={sirzLogoWhite} alt="" />
                            <div className=' sm:text-[20px] text-white pt-5'>
                                SIRz is your one-stop shop for E-commerce, Branding, and Digital Marketing, we help businesses launch, scale, and dominate in the digital space.
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:flex items-center justify-between">
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
                        <h4 className="text-[#fff] max-sm:pt-5 font-nexa-light text-[13px] text-center max-sm:flex-col flex items-center sm:gap-8 gap-2 font-thin">
                            <p>17 Barmouth Road marine parade LL42 1NA</p>
                            <p>074 07245685</p>
                            <a href="mailto:support@sirz.co.uk">
                                support@sirz.co.uk
                            </a>
                        </h4>
                    </div>
                </div>
            </footer>

        </div>
    )
}