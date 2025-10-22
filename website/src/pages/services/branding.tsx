import { useNavigate } from "react-router-dom";
import { BrandImgBg, BrandImgBgTwo, startSmallImg } from "../../assets";
import Button from "../../components/common/button";
import { ROUTES } from "../../constants/routes/desc";
import { calendyLink } from "../../utils";
import SliderContainer from "./components/sliderContainer";

const Methods = [
    { num: "01", header: " Brand Discovery (AI-Powered Audit)", detail: "We start by analyzing your current brand assets and audience behavior using AI tools to uncover insights about what’s working — and what’s missing.", },
    { num: "02", header: "Strategy & System Setup", detail: "We build your automated brand hub: logos, palettes, voice guides, and asset templates — all integrated with your campaigns and dashboards.", },
    { num: "03", header: "Visual Identity & Content Sync", detail: "We generate optimized versions of your brand visuals and messaging for each platform (website, Meta, Google, TikTok, Amazon).", },
    { num: "04", header: " Brand Book 2.0", detail: "Your digital brand guide becomes a living system — automatically updated with new campaigns, assets, and design rules.", },
];

const BrandMatters = [
    { title: "Consistency Drives Growth", details: "Brands with consistent messaging see up to 10%+ more revenue growth.", },
    { title: "Trust Wins Customers", details: "Automated brand alignment ensures your visuals and voice never fall out of sync.", },
    { title: "Identity at Scale", details: "Stand out with instantly adaptable brand kits for every channel.", },
    { title: "Smarter Reputation Managemen", details: "Monitor, adjust, and update your brand assets from one dashboard.", },
    { title: "SEO & Visibility", details: "Optimized visuals and copy improve ranking and engagement across platforms.", },
];

export default function Branding() {
    const navigate = useNavigate()

    return (
        <section>
            <div className="bg-colorLight dark:bg-colorDark ">
                <section className="w-full grid sm:grid-cols-5 gap-8  ">
                    {/* Image Section */}
                    <div className=" sm:col-span-2 max-sm:w-[100vw] sm:h-[400px] h-[300px]">
                        <img src={BrandImgBg} alt="" className="w-full h-full object-cover " />
                    </div>

                    {/* Text & List Section */}
                    <div className=" sm:col-span-3 m-auto sm:text-left ml-7 md:ml-8">
                        <h1 className="font-bold md:text-[40px] text-[20px] w-full mb-3 md:w-[95%] ">
                        Build a Brand That Runs on <span className="italic text-colorBlueDeep">Automation</span>.
                        </h1>
                        <p className="text-3xl sm:text-2xl mb-7">
                            Define, design, and automate your brand identity across every platform.
                        </p>
                        <Button text="See it in action" onClick={() => { }} className="min:w-[30%] mb-7 md:mb-0" />
                    </div>
                </section>
            </div>

            <div className="py-14 w-[85%] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[100%]">
                <section className="w-full">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <h2 className="font-normal text-lg sm:text-sm">Why Automated Branding Matters</h2>
                    </div>
                    <p className="text-sm sm:text-base">
                        Your brand isn’t just your logo, it’s the system that connects your product, story, and customers. At SIRz, we turn branding into a scalable digital asset powered by automation.
                    </p>
                    <p className="mt-2">
                    From visual identity to campaign templates, we build AI-driven brand systems that keep your messaging, visuals, and tone consistent, everywhere your customers shop or scroll.
                    </p>
                </section>

                {BrandMatters.map((item, index) => (
                    <section
                        key={index}
                        className="w-full px-5 sm:px-7 pt-8 sm:pt-11 pb-6 sm:pb-9 text-black 
                        hover:text-white hover:bg-colorGreenDeeper dark:hover:bg-colorGreenDeeper bg-colorLight dark:text-colorLight dark:bg-colorDark  
                        cursor-pointer transition-all rounded-2xl shadow-sm"
                    >
                        <h1 className="font-medium mb-4 sm:mb-6">{item.title}</h1>
                        <p className="text-sm sm:text-base">{item.details}</p>
                    </section>
                ))}
            </div>


            <div className="bg-colorLight dark:bg-colorDark py-8 px-7">
                {/* Intro Section */}
                <section className="w-[90%] sm:w-[85%] mx-auto pt-7 mb-10 sm:mb-14">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <h2 className="font-bold text-lg sm:text-xl">Our work flow</h2>
                    </div>

                    <div>
                        <h1 className="text-base sm:text-lg md:text-xl sm:font-bold font-semibold text-justify">
                            Are you a small or medium-sized business looking to expand online? Or an individual with a
                            great product idea ready to sell? Our e-commerce setup service supports you every step of the way.
                        </h1>
                    </div>
                </section>

                {/* Methods Section */}

                <section className="w-[95%] sm:w-[85%] lg:w-[60%] mx-auto mb-7">
                    {Methods.map((method, index) => (
                        <div className="flex flex-col sm:flex-row gap-4 border-t-2 border-black pt-0 pb-6 sm:pb-8" key={index}>

                            {/* Number Badge (Flush with Border) */}
                            <section className="w-12 h-12 sm:w-[10%] sm:h-[15vh] bg-colorGreen rounded-br-full rounded-bl-full flex items-center justify-center -mt-[2px]">
                                <h1 className="text-white text-2xl font-medium">{method.num}</h1>
                            </section>

                            {/* Method Details (Slight Padding & Lowered Position) */}
                            <section className="flex-1 pt-0 sm:pt-2">
                                <h2 className="font-bold text-lg sm:text-xl">{method.header}</h2>
                                <p className="text-sm sm:text-base">{method.detail}</p>
                            </section>
                        </div>
                    ))}
                </section>

            </div>

            <div className="bg-colorGreenDeeper">

                <section className=" grid sm:grid-cols-5 grid-cols-1 ">
                    {/* Image Section */}
                    <div className="col-span-2 h-[500px] ">
                        <img src={BrandImgBgTwo} alt="" className="w-full h-full object-cover object-top" />
                    </div>

                    {/* Text & List Section */}
                    <div className="w-[80%] max-sm:w-[90%] max-sm:py-10 text-white m-auto col-span-3 ">
                        <h1 className="font-bold text-3xl italic w-full mb-7 sm:mr-8 mr-0 ">Understanding Your Brand, Amplified by AI</h1>
                        <p className=" mb-7 text-justify ">
                            At SIRz, we combine creative expertise with intelligent automation to make branding simpler, faster, and smarter. Our systems help you maintain a cohesive identity while freeing your team to focus on innovation and sales.
                        </p>
                        <p className=" mb-8">
                            We study your business, audience, and competitors — then transform that knowledge into automated brand systems that evolve with you.
                        </p>
                        <button className={` tracking-widest bg-white text-black rounded-full mb-0 sm:mb-6 sm:w-[40%] w-[80%] max-md:m-auto max-sm:mt-5
                            'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                            `}
                            onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                            Book a Demo
                        </button>
                    </div>
                </section>
            </div>

            <SliderContainer />

            <div className="w-full p-6 sm:p-10 bg-colorGreenDeeper">
                <div className="w-[95%] sm:w-[90%] m-auto text-center">
                    <h1 className="text-white text-xl italic font-bold sm:text-2xl md:text-3xl mb-5 sm:mb-7 w-full sm:w-[50%] m-auto">
                        Ready to Take your Brand to the next level?
                    </h1>
                    <a href={calendyLink} target="_blank" rel="noopener noreferrer">
                        <button
                            className="tracking-widest m-auto bg-white text-black rounded-full w-full sm:w-auto sm:min-w-[200px] flex items-center justify-center py-3 sm:py-4 cursor-pointer text-sm px-6 sm:px-8 font-medium floating-button"
                            onClick={() => { }}>
                            Schedule a demo
                        </button>
                    </a>
                </div>
            </div>

        </section>
    )
}