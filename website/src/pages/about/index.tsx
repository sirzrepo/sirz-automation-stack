import { AboutHeroBg, AboutOfferBg, AboutStoryBg, rectangleDarkBlue, sirzLogo, startHalfImg, TeamImgs } from '../../assets';
import HeaderFormat from '../../components/header';
import Button from '../../components/common/button';
import { ROUTES } from '../../constants/routes/desc';
import { useNavigate } from 'react-router-dom';
import { calendyLink } from '../../utils';

const data = [
    {
        title: "01 What we're creating",
        text: `SIRz is an AI-powered automation platform for modern eCommerce brands.
                We’re building a scalable system that eliminates repetitive tasks, unifies your customer data, and delivers actionable insights, all within one smart subscription.`,
        text2: `From automation to CRM and analytics, our product stack gives you the tools to operate like a large enterprise, without the cost or complexity.`
    },
    {
        title: "02 We give the best results",
        text: `We combine AI-driven automation, expert design, and real-time analytics to help businesses scale smarter.`,
        text2: `Our subscription model ensures you always have access to the latest tools and updates, no extra charges, no project delays, just continuous growth.`
    },
    {
        title: "03 Automation-Driven Growth",
        text: `Our automation-first approach replaces manual work with intelligent workflows that deliver consistent results.`,
        text2: `SIRz bridges the gap between marketing, sales, and data, giving your business a central hub where everything just works together.
                This system-driven strategy is why our clients see results that outperform industry standards.`
    },
];

const teamData = [
    {
        name: "Babafemi Sanusi",
        position: "Systems & Automation Architect",
        image: TeamImgs.femiImg
    },
    {
        name: "Araga Dominic",
        position: " Growth Strategist",
        image: TeamImgs.dominicImg
    },
    {
        name: "Daniel Oghenederhie",
        position: "Business Growth Consultant",
        image: TeamImgs.team3Img
    },
];

export default function About() {
    const navigate = useNavigate()
    return (
        <div className='pt-8'>
            <section className=' sm:w-[75%] w-[90%] m-auto pb-10'>
                <header className="sm:text-[50px] text-[30px] leading-tight text-center font-bold">Your All-in-One <i className=" text-colorBlueDeep">Automation Stack</i> for Scalable Growth</header>
                <div className='py-4'>
                    <img
                        src={AboutHeroBg}
                        alt="" className=' border rounded-[100px] p-2 border-colorBlueDeep h-full w-full object-cover' />
                </div>
            </section>
            <section className=' bg-colorGreenDeeper py-10 text-white font-normal italic'>
                <p className='sm:w-[70%] sm:text-[30px] w-[90%] text-[15px] m-auto text-center'>
                At SIRz, we understand the pressure that comes with managing operations, marketing, and customer growth all at once. That’s why we built something better; a product-led automation ecosystem that streamlines your entire online business. <br />
                Our AI-powered stack connects automation, CRM, and analytics, so you can focus on scaling while our system runs the backend.
                No more custom quotes or unpredictable agency fees, just one subscription that grows with you.
                </p>
            </section>
            <section className='py-10'>
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <HeaderFormat title="About us.." classNames="" />
                    <h4 className=" sm:font-bold max-sm:text-justify py-6 sm:text-[27px] text-[17px] sm:leading-9">
                        <div>
                            SIRz isn’t just another marketing agency, it’s your growth partner in automation.
                            We dig deep into your why—why you started, why your product matters—and then help you scale using smart, system-driven workflows powered by AI.
                        </div>
                        <div className="pt-6">
                            Our mission is simple: to help eCommerce brands operate efficiently, make data-backed decisions, and grow profitably, without the usual stress of managing multiple service providers.
                        </div>
                    </h4>
                </div>
                <div className=' md:grid bg-colorLight dark:bg-colorDark md:grid-cols-5 sm:h-[500px] mt-10 sm:gap-12 m-auto max-sm:p-5'>
                    <div className=' sm:col-span-3 relative sm:px-16 sm:py-10'>
                        <header className='sm:text-[45px] text-[30px] italic font-bold'>The Story Behind Sirz</header>
                        <div className='pt-4 text-[18px] max-md:text-justify leading-9'>
                            <p>
                                In 2021, the founder of SIRz launched a small online fashion store with a dream: to create something meaningful that could generate passive income while balancing a full-time job. Like many entrepreneurs, the goal was freedom, but the challenge lay in operations.
                            </p>
                            <p className="pt-4">
                                After investing thousands into design and marketing, the realization hit: success doesn’t come from effort alone, it comes from systems.
                            </p>
                        </div>
                        <div className='sm:w-[40%] w-[90%] max-sm:m-auto pt-6 max-sm:pb-20'>
                            <a href={calendyLink} target="_blank" rel="noopener noreferrer">
                                <Button text="Schedule demo" onClick={() => { }} />
                            </a>
                        </div>
                        <div>
                            <img src={startHalfImg} alt="" className=' absolute left-0 bottom-0 max-sm:w-[60px]' />
                        </div>
                    </div>
                    <div className=' col-span-2 w-full'>
                        <img src={AboutStoryBg} alt="" className=' object-cover w-full sm:h-[500px] ' />
                    </div>
                </div>
            </section>
            < section
                className=" max-sm:pb-8 relative " >
                <img src={rectangleDarkBlue} alt="" className=" w-full sm:h-[200px] md:h-[150px] h-[100px] object-top object-cover" />
                <div className="  text-white  ">

                    <div className=" bg-white absolute top-5 z-10 h-20 w-20 m-auto right-0 left-0 flex justify-center rounded-full">
                        <img src={sirzLogo} alt="" className="w-[60px]" />
                    </div>

                    <div className=' bg-colorGreenDeeper pb-10 right-0 left-0 flex items-center justify-center flex-col text-center m-auto'>
                        <div className="flex items-center justify-center flex-col text-center m-auto">
                            <header className='sm:text-[45px] text-[30px] italic font-bold'>Let&apos;s scale your business – automatically.</header>
                            <div className='text-[20px] sm:w-[70%] w-[90%] m-auto pt-4'>
                            Transform how you work with our all-in-one automation stack. Manage your marketing, sales, and customer processes effortlessly, powered by AI, delivered as a simple monthly subscription.
                            </div>
                        </div>
                        <div className=' lg:w-[30%] sm:w-[50%] w-[90%] m-auto pt-10'>
                            <button className={` tracking-widest bg-white text-black rounded-full w-full max-sm:mt-5
                            'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                            `}
                                onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                                Start your free demo →
                            </button>
                        </div>
                    </div>
                </div>
            </section >
            <section className='py-10'>
                <div className=' md:grid grid-cols-5 gap-10 items-center m-auto sm:w-[85%]'>
                    <div className=' col-span-2 w-full'>
                        <img src={AboutOfferBg} alt="" className='w-full h-[700px] object-cover' />
                    </div>
                    <div className=' col-span-3 relative px-4 py-10'>
                        {
                            data.map((item, index) => (
                                <div key={index} className=' border-b pt-3 pb-7'>
                                    <header className='sm:text-[35px] text-[20px] italic font-bold text-colorGreen'>{item.title}</header>
                                    <div className='pt-4 text-[17px] sm:ps-12'>
                                        {item.text}
                                    </div>
                                    <div className='pt-4 text-[17px] sm:ps-12'>
                                        {item.text2}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className='sm:w-[85%] w-[90%] py-20 m-auto'>
                <div className=''>
                    <HeaderFormat title="Meet the team" classNames="" />
                    <h4 className=" sm:font-bold py-6 sm:text-[35px] text-[17px] max-sm:text-justify sm:leading-9">
                        Get to know the passionate minds shaping automation, growth, and innovation at SIRz.
                    </h4>
                </div>
                <div className=' grid md:grid-cols-3 sm:grid-cols-2 gap-3 pt-5 '>
                    {
                        teamData.map((item, index) => (
                            <div key={index} className=' text-center transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                                <img src={item.image} alt="" className=' h-[590px] w-full object-cover' />
                                <div className='py-4'>
                                    <h4 className=' font-bold uppercase tracking-wider'>{item.name}</h4>
                                    <p className='tracking-wider capitalize'>{item.position}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section>
                <div className="bg-colorGreenDeeper text-colorDefaultLight py-10">
                    <div className=" w-[85%] m-auto relative">
                        <HeaderFormat title="Better together" />
                        <h4 className=" py-6 sm:text-[33px] text-[20px] max-sm:text-center">
                        We believe great technology should feel human. At SIRz, we combine automation with creativity to deliver results that make your work—and your life—simpler and more enjoyable.
                        We love what we do, and we love helping businesses grow through intelligent, automated systems.
                        </h4>
                        <button className={` tracking-widest bg-white text-black rounded-full sm:w-[23%] w-full max-sm:mt-5
                                                'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                                                `}
                            onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                            Get in touch
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}