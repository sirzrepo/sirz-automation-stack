import { useNavigate } from "react-router-dom";
import { BlogCardFour, BlogCardOne, BlogCardThree, BlogCardTwo, StarMultiple, StarMultipleSmall, startSmallImg } from "../../assets";
import HeaderFormat from "../../components/header";
import { ROUTES } from "../../constants/routes/desc";

const Methods = [
    { num: "01", header: "Client Onboarding on SIRz App", detail: `Your automation journey begins here.
 We guide you through a quick setup inside the SIRz App — defining your goals, target audience, and preferred marketing channels. Once onboarded, your brand data connects seamlessly to our automation system.`, },
    { num: "02", header: 'Strategy Development', detail: `Our AI engine analyzes your inputs and creates a tailored, data-driven marketing strategy.
 From audience segmentation to platform selection, the system builds a roadmap designed to grow your brand efficiently.`, },
    { num: "03", header: "Execution", detail: `Once your strategy is ready, campaigns go live automatically across platforms.
 From ad creatives to content publishing, the SIRz system handles your day-to-day marketing — saving you hours of manual work.` },
    { num: "04", header: "Optimization", detail: `We track key metrics like CTR, CPA, and ROAS in real time.
 The system continuously refines targeting, content, and timing to maximize performance while keeping your costs low.`, },
    { num: "05", header: "Reporting & Growth", detail: `Access your live dashboard anytime to view performance insights and growth trends.
 Use the data to plan your next steps, adjust strategies, or scale campaigns — all within one intuitive platform.`, },
];

const BrandMatters = [
    { title: "Regain your time", details: "Spend less time creating and scheduling posts. Let automation handle it while you focus on strategy and growth.", },
    { title: "Make relevant content.", details: "AI creates platform-ready content, optimized for engagement and aligned with your brand tone.", },
    { title: "Proven Growth", details: "Track CTR, ROAS, and CPA in real-time dashboards, no missed deadlines, no guesswork, just results.", },
];

const DigitalHeroCard = [
    BlogCardOne,
    BlogCardTwo,
    BlogCardThree,
    BlogCardFour,
];
const sirzOffer = [
    { title: "Social Media Automation & Management", detail: " We create, schedule, and optimize posts automatically. AI content agents tailor visuals and captions for each platform.", bgColor: "#F9F6FF", },
    { title: "AI Copywriting & Content Marketing", detail: " Generate on-brand content that drives engagement. From carousels to blog posts, our system handles it end-to-end.", bgColor: "#F8FCED", },
    { title: "Ad Campaign Automation", detail: "Launch Meta, Google, and TikTok ads in one click. The system tests variations and optimizes for conversions.", bgColor: "#FFFCEB", },
    { title: " Email & Retargeting Automation", detail: "Personalized emails are triggered by customer behavior — helping you turn interest into repeat purchases.", bgColor: "#F0F0F0", },
];

const methodsData = [
    { SIRz: "Automation-First Approach – AI runs your content and ads efficiently.", Others: "Manual work and slow delivery.", },
    { SIRz: "Transparent Reports – See results in real time.", Others: "Hidden data and inconsistent updates.", },
    { SIRz: "Fair Pricing – Simple subscription model.", Others: "High retainers and hidden fees.", },
    { SIRz: "Cancel Anytime – Stay for the results, not the contracts.", Others: "Long-term lock-ins.", },
    { SIRz: "Built for E-Commerce – Connects directly with Shopify, TikTok, and Amazon.", Others: "Generic campaigns with no store integration.", },
    { SIRz: "", Others: "", },

];

export default function DigitalMarketing() {
    const navigate = useNavigate();

    return (
        <section>
            <div className=" bg-colorLight dark:bg-colorDark">
                <div className="w-full bg-colorGreenDeeper sm:min-h-[60vh] min-h-[45vh] flex items-center">
                    <section className="w-[90%] sm:w-[80%] m-auto sm:p-6 text-center relative text-white">
                        <h1 className="text-[30px] sm:text-3xl lg:text-4xl relative z-10 font-medium mb-4 leading-tight">
                            Digital Marketing Automation for E-Commerce <span className="italic text-colorGreen">Brands</span>
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl m-auto leading-relaxed">
                        We help your business create, manage, and optimize digital marketing campaigns — automatically.
                        From AI-generated content to data-driven ad management, SIRz connects your brand to customers across platforms like Meta, Google, and TikTok, all from one smart system.
                        </p>
                        <div className=" absolute top-[-20px] sm:right-[48%] flex items-center justify-center">
                            <img src={StarMultiple} alt="" className="" />
                        </div>
                        <div className=" absolute top-[10px] sm:left-[35%] max-sm:right-0 flex items-center justify-center">
                            <img src={StarMultiple} alt="" className="" />
                        </div>
                        <div className=" absolute sm:top-[60px] top-[35px] right-[43.4%] flex items-center justify-center">
                            <img src={StarMultipleSmall} alt="" className="" />
                        </div>
                    </section>


                </div>
                {/* Image Grid - Digital Hero Cards */}
                <section className="w-[90%] mt-[-60px] m-auto grid grid-cols-2 lg:grid-cols-4 sm:gap-6">
                    {DigitalHeroCard.map((item, index) => (
                        <div key={index} className="relative mb-6">
                            <img src={item} alt="" className="w-full h-auto" />
                        </div>
                    ))}
                </section>
            </div>

            <div className="bg-colorLight dark:bg-colorDefaultDark max-sm:pt-6 pt-14">

                {/* Brand Matters Grid */}
                <section className="w-[90%] sm:w-[90%] m-auto mb-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
                        {BrandMatters.map((item, index) => (
                            <section
                                key={index}
                                className="w-full px-5 sm:px-7 pt-6 sm:pt-9 pb-5 sm:pb-8 text-black dark:text-colorLight
                                hover:text-white hover:bg-colorGreenDeeper bg-white dark:bg-colorDark border dark:border-none 
                                cursor-pointer transition-all rounded-2xl shadow-sm"
                            >
                                <h1 className="font-medium mb-3 max-sm:text-[20px] ">{item.title}</h1>
                                <p className=" text-sm text-zinc-500 sm:text-base">{item.details}</p>
                            </section>
                        ))}
                    </div>
                </section>
            </div>

            <div className="py-8">
                {/* Header Section */}
                <section className="w-[90%] sm:w-[80%] m-auto mb-7">
                    <HeaderFormat title="What we offer" />
                    <div className="text-lg sm:text-xl lg:text-2xl pt-4 font-bold leading-snug">
                        At SIRz, we’ve transformed digital marketing into a product-driven experience.
                        Our automation suite combines AI, design, and analytics, giving small businesses the same power as big marketing teams.
                    </div>
                </section>

                {/* Offer Cards Section */}
                <section className="w-[90%] sm:w-[85%] m-auto pt-10">
                    <div className=" grid md:grid-cols-2 gap-x-6 gap-y-10">
                        {sirzOffer.map((item, index) => (
                            <div
                                key={index}
                                className="w-full p-10 rounded-xl shadow-md dark:text-colorDark text-sm transition-all hover:scale-105"
                                style={{ backgroundColor: item.bgColor }}
                            >
                                <h2 className=" font-medium text-lg sm:text-xl">{item.title}</h2>
                                <p className="text-sm sm:text-base leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>


            <div className="bg-colorLight dark:bg-colorDark py-8 px-7">
                {/* Intro Section */}
                <section className="w-[90%] sm:w-[85%] mx-auto pt-7 mb-10 sm:mb-14">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <h2 className="font-bold text-lg sm:text-xl">How we work</h2>
                    </div>

                    <div>
                        <h1 className="text-base sm:text-lg md:text-xl font-bold">
                            At SIRz, everything starts inside the SIRz App, your all-in-one dashboard for automated digital marketing.
                            From onboarding to campaign execution, our system combines AI-driven strategy, creative automation, and real-time analytics to help your business grow smarter, faster & effortlessly.
                        </h1>
                        <h4 className="text-base sm:text-lg md:text-xl text-zinc-700 font-bold mt-4">Here’s how it works:</h4>
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

            <div className="py-8">
                <section className="w-[90%] sm:w-[85%] m-auto pt-7 mb-7">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" />
                        <h2 className="font-bold">How SIRz Compares:</h2>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                            We don’t just manage campaigns — we automate them. Here’s what makes SIRz different.
                        </h1>
                    </div>
                </section>

                <section className="w-[95%] sm:w-[90%] m-auto mb-7">
                    <div className="p-4 sm:p-6 md:p-10">
                        <div className="w-full m-auto overflow-x-auto  rounded-2xl border-l-[5px] border-colorGreen border-b-[10px]">
                            <table className="w-full min-w-[600px] min-h-[70vh] border-collapse border border-gray-300 rounded-2xl">
                                {/* Table Head */}
                                <thead className="bg-colorBlueDeep text-white h-16 text-sm sm:text-base">
                                    <tr>
                                        <th className="border border-[#A9A9A9]">SIRz</th>
                                        <th className="border border-[#A9A9A9]">Others</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {methodsData.map((method, index) => (
                                        <tr key={index} className="odd:bg-gray-100 dark:odd:bg-colorDark dark:bg-colorDefaultDark even:bg-white">
                                            <td className="border-r border-r-gray-300 px-10 py-2 font-medium text-xs sm:text-sm">{method.SIRz}</td>
                                            <td className="border-l border-l-gray-300 px-10 py-2 font-medium text-xs sm:text-sm">{method.Others}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <div className="w-full p-6 sm:p-10 bg-colorGreenDeeper">
                <div className="w-[95%] sm:w-[90%] m-auto text-center sm:text-left">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" />
                        <h2 className="font-medium text-xl text-white">Let’s Elevate Your Brand! 🚀</h2>
                    </div>
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl mb-5 sm:mb-7 w-full sm:w-[80%]">
                    Ready to automate your marketing and grow faster? Whether it’s social media management, ad campaigns, or content strategy, SIRz helps your eCommerce brand scale effortlessly.
                    </h1>
                    <button
                        className="tracking-widest bg-white text-black rounded-full w-full sm:w-auto sm:min-w-[200px] flex items-center justify-center py-3 sm:py-4 cursor-pointer text-sm px-6 sm:px-8 font-medium floating-button"
                        onClick={() => navigate(ROUTES.CONTACT.PATH)}>
                        Contant Us now
                    </button>
                </div>
            </div>

        </section>
    )
}