import { AboutHeroBg, BlogCardFour, BlogCardOne, BlogCardThree, BlogCardTwo, ebookDesigns, graphicProjects, GreenVector, IroseBg, ProjectVector, ProjectWebBg } from "../../assets";
import Button from "../../components/common/button";
import HeaderFormat from "../../components/header";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes/desc";

export default function Projects() {
    
    const navigate = useNavigate();

    const dataImg = [
        BlogCardOne,
        BlogCardTwo,
        BlogCardThree,
        BlogCardFour,
    ];

    return (
        <div className=''>
            <section className="relative bg-colorLight dark:bg-colorDefaultDark pt-8">
                <div className=' sm:w-[75%] w-[90%] m-auto pb-10'>
                    <div className=" sm:w-[70%] w-[90%] m-auto relative">
                        <header className="sm:text-[50px] text-[30px] leading-tight text-center font-bold">Our Projects</header>
                        <div className=" text-center pt-6 pb-3 sm:text-[25px] text-[18px] ">
                            <i>Explore how our clients are achieving measurable growth through the SIRz App — our digital marketing automation system designed to help brands create, automate, and measure every campaign in one place.</i>
                        </div>
                        <img src={GreenVector} alt="" className=" absolute sm:top-[-10px] top-[-45px] bottom-0 left-0 m-auto right-0" />
                    </div>
                    <div className='py-4 relative z-10'>
                        <img
                            src={AboutHeroBg}
                            alt="" className=' border rounded-[100px] p-2 border-colorBlueDeep h-full w-full object-cover'
                        />
                    </div>
                </div>
                <img src={ProjectVector} alt="" className=" absolute sm:top-36 top-40 bottom-0 left-0 right-0" />
            </section>
            <section className=" dark:bg-colorDark py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="E-Commerce Websites" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                        We build high-performance, automation-ready websites that do more than look good — they work intelligently.
                        Each site connects directly to the SIRz App, giving brands access to automated marketing workflows, live dashboards, and data-driven creative tools that simplify growth.
                        </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <img src={ProjectWebBg} alt="" />
                        </div>
                        <div className=" max-sm:text-justify">
                            <header className=" font-bold text-[20px] text-left">Domestica</header>
                            <div>
                                <header className=" py-4">
                                    Domestica is a home-essentials brand that wanted a clean, modern e-commerce experience to boost sales and customer engagement.
                                    We designed a fast, intuitive storefront integrated with the SIRz App, enabling automated product recommendations, real-time analytics, and personalized campaigns triggered by customer activity.
                                </header>
                                <header className=" font-bold py-4">Core Integrations</header>
                                <div className=" list-disc list-inside space-y-3">
                                    <li>Automated email and retargeting flows</li>
                                    <li>Product-based content scheduling</li>
                                    <li>Real-time performance dashboards</li>
                                </div>
                            </div>
                            <div>
                                <header className=" font-bold py-4">Results</header>
                                <div className=" list-disc list-inside space-y-3">
                                    <li>Improved conversion rates and repeat purchases</li>
                                    <li>Increased email engagement and CTR</li>
                                    <li>Simplified campaign tracking across channels</li>
                                </div>
                            </div>
                            <a href="http://Domesticia.com">

                            <Button text="Visit the website" onClick={() => navigate('#')} className="sm:w-[60%] w-[90%] m-auto mt-8" />
                            </a>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 pt-14">
                        <div className=" max-sm:text-justify">
                            <header className=" font-bold text-[20px] text-left pb-4">Irose Fashion</header>
                            <div>
                                <p>
                                    Irose Fashion brings affordable style to the modern shopper. Their goal was to grow engagement and streamline their marketing operations.
                                    Through the SIRz App, we built a fully automated e-commerce system where new arrivals, promotions, and social campaigns run seamlessly from one dashboard.
                                </p>
                            </div>
                            <div>
                                <header className=" font-bold py-4">Core Integrations</header>
                                <div className=" list-disc list-inside space-y-3">
                                    <li>Automated post scheduling and optimization</li>
                                    <li>AI-generated ad creatives for Meta and TikTok</li>
                                    <li>Dynamic product-feed content for campaigns</li>
                                </div>
                            </div>

                            <div>
                                <header className=" font-bold py-4">Results</header>
                                <div className=" list-disc list-inside space-y-3">
                                    <li>Consistent audience growth</li>
                                    <li>Higher conversion rates on retargeted ads</li>
                                    <li>Centralized performance tracking in real time</li>
                                </div>
                            </div>
                            <Button
                                text="Visit the website"
                                onClick={() => window.location.href = 'https://irosefashion.com/'}
                                className="sm:w-[60%] w-[90%] m-auto mt-8"
                            />
                        </div>
                        <div>
                            <img src={IroseBg} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className=" bg-colorLight dark:bg-colorGreenDeeper py-10 ">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="AI Media Assets" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify pb-8 pt-4 sm:text-[22px] text-[17px] sm:leading-9">
                            Every creative we produce — from banners to email headers — is powered by the SIRz AI Media Agent, ensuring every design asset is automatically linked to live campaigns and measurable outcomes.
                            <div className=" pt-4">
                                Our design system generates, manages, and tracks all assets inside SIRz — so brands always know which visuals perform best and why.
                            </div>
                        </h4>
                        <div>
                            <header className=" font-bold py-4">Results</header>
                            <div className=" list-disc list-inside space-y-3">
                                <li>Engagement & reach per asset</li>
                                <li>ROI of creatives across channels</li>
                                <li>Consistency of brand visuals over time</li>
                            </div>
                        </div>
                        <h4 className=" font-bold py-4">Beautiful designs, backed by data.</h4>
                    </div>
                    {/* <div className=" grid sm:grid-cols-3 gap-8 pb-10">
                        {
                            data.map((item, index) => (
                                <div key={index} className=" bg-white dark:bg-colorDefaultDark p-2 rounded-2xl pb-2">
                                    <img src={item.image} alt="" className="w-full rounded-2xl object-cover h-[350px]" />
                                    <section className=" font-light text-[14px]">
                                        <div className="pt-4 pb-1">
                                            <header className=" font-bold">{item.title}</header>
                                        </div>
                                        <div className="text-[12px]">
                                            {item.text}
                                        </div>
                                        <button
                                            className="flex items-center gap-1 text-colorBlueDeep font-normal text-[17px] pt-2">
                                            Get now
                                            <ImArrowRight2 />
                                        </button>
                                    </section>
                                </div>
                            ))
                        }
                    </div> */}

                    <div className=" grid grid-cols-2 gap-8">
                        {
                            graphicProjects.map((data, index) => (
                                <img src={data} alt={`graphics ${index}`} />
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="dark:bg-colorDark ">
                <div className=" sm:w-[85%] w-[90%] m-auto py-10">
                    <div className=''>
                        <HeaderFormat title="Branding" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify pb-8 pt-4 sm:text-[22px] text-[17px] sm:leading-9">
                            Your brand isn’t just visuals, it’s a system.
                            Through <b>Brandcom</b>, our AI-driven-brand content and campaign automation agent, we help businesses create data-driven identities designed to adapt, scale, and perform across all digital channels.
                        </h4>
                    </div>
                    <div className=" grid grid-cols-3 sm:gap-5 gap-2">
                        {
                            ebookDesigns.map((img, index) => (
                                <img key={index} src={img} alt="" className="rounded-lg " />
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="bg-colorLight dark:bg-colorDefaultDark pt-6">
                <div className=" sm:w-[85%] w-[90%] m-auto py-10">
                    <div className=''>
                        <HeaderFormat title="Social Media Management" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify pb-8 pt-4 sm:text-[22px] text-[17px] sm:leading-9">
                            We don’t just manage pages, we automate brand presence.
                            With the SIRz AI Media Agent, social posts, analytics, and ad performance connect directly to your CRM, turning followers into data-driven growth insights.                    </h4>
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

            <section className=" bg-colorGreenDeeper text-white ">
                <div className="sm:w-[85%] w-[90%] m-auto py-10">
                    <div className='sm:w-[60%] max-sm:text-center'>
                        <HeaderFormat title="Better together" />
                        <h4 className=" py-4 sm:text-[16px] text-[17px]">
                            Every project we create — from websites to visuals — connects back to one central goal: helping brands grow through automation, intelligence, and creativity.
                            With SIRz, you can manage your brand, marketing, and performance from one simple system.
                        </h4>
                    </div>
                    <button className={` bg-white text-black rounded-full sm:w-[33%] w-full max-sm:mt-5
                        'w-full flex align-center justify-center py-4 cursor-pointer text-[20px] px-8 font-medium floating-button  
                        `}
                        onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                        Schedule a Demo
                    </button>
                </div>
            </section>
        </div>
    )
}