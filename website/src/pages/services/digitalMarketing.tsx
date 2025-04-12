import { useNavigate } from "react-router-dom";
import { BlogCardFour, BlogCardOne, BlogCardThree, BlogCardTwo, StarMultiple, StarMultipleSmall, startSmallImg } from "../../assets";
import HeaderFormat from "../../components/header";
import { ROUTES } from "../../constants/routes/desc";

const Methods = [
    { num: "01", header: "Consultation", detail: "We begin with a discovery session to understand your brand, goals, and target audience. You'll also complete a brief questionnaire to help us tailor the perfect strategy for your business.", },
    { num: "02", header: 'Strategy Development', detail: "Based on our insights, we craft a data-driven marketing plan, selecting the best platforms and techniques to enhance your online presence.", },
    { num: "03", header: "Execution", detail: "   Our team brings your strategy to life, managing everything from content creation and ad campaigns to social media engagement and email marketing.", },
    { num: "04", header: "Optimization", detail: "We continuously track performance, refine strategies, and make data-driven adjustments to maximize results.", },
    { num: "05", header: "Reporting & Growth", detail: "You'll receive regular performance reports with actionable insights to help your business scale and achieve long-term success.", },
];

const BrandMatters = [
    { title: "Regain your time", details: "With more free time, you can focus on your core business.", },
    { title: "Make relevant content.", details: "With streamlined workflows, you put out quality content faster.", },
    { title: "Proven Growth", details: "Say goodbye to missed deadlines and inconsistent work.", },
    { title: " Proven Growth", details: "Say goodbye to missed deadlines and inconsistent work.", },
];

const DigitalHeroCard = [
    BlogCardOne,
    BlogCardTwo,
    BlogCardThree,
    BlogCardFour,
];
const sirzOffer = [
    { title: "Social Media Branding & Management", detail: "We develop engaging content, foster community interaction, and monitor performance to ensure your social media channels effectively connect with your target audience", bgColor: "#F9F6FF", },
    { title: "Copywriting and Content Marketing", detail: "From blog posts to social media updates, our content strategies are designed to attract and retain customers, positioning your brand as an authority in your industry.", bgColor: "#F8FCED", },
    { title: "Digital Advertising Campaigns", detail: "Our experts design and manage targeted digital advertising campaigns across platforms like Google Ads and various social media networks.", bgColor: "#FFFCEB", },
    { title: " Email Marketing", detail: "We develop personalized email marketing campaigns that nurture customer relationships and drive conversions. our strategies are tailored to keep your audience engaged.", bgColor: "#F0F0F0", },
];

const methodsData = [
    { SIRz: "All-round transparency We prioritize your vision and preferences. Our platform allows you to review and approve all content, ensuring it meets your standards.", Others: "No transparency Other agencies are paid expensive retainers. Those fees need to come from somewhere. We streamlined our operations to stay competitive. This means lower, simpler, and fair prices.", },
    { SIRz: "Low-cost, high quality Most agencies hit you with high charges before you even understand what you're getting into. We're a lean team. Our efficient workflows allow us to charge much less.", Others: "High charges Big agencies need to fund large payrolls and expensive offices. They don't know what it's like to work with small businesses like yours.", },
    { SIRz: "Cancel anytime Your time is valuable. Stay as long as you love it – or leave whenever. No long-term contracts, no hassles", Others: "Long-term contracts Other agencies prefer long-term commitments. We don't believe in tying you down. Our focus is on building lasting relationships, not contracts", },
];

export default function DigitalMarketing() {
    const navigate = useNavigate();

    return (
        <section>
            <div className=" bg-colorLight dark:bg-colorDark">
                <div className="w-full bg-colorGreenDeeper sm:min-h-[60vh] min-h-[45vh] flex items-center">
                    <section className="w-[90%] sm:w-[80%] m-auto sm:p-6 text-center relative text-white">
                        <h1 className="text-[30px] sm:text-3xl lg:text-4xl relative z-10 font-medium mb-4 leading-tight">
                            Digital Marketing for <span className="italic text-colorGreen">Brands</span>
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl m-auto leading-relaxed">
                            We produce top-notch digital marketing content for your business. You approve.
                            And if you want, we schedule and post for you.
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
                        At SIRZ, we offer a comprehensive suite of digital marketing and social media management
                        services designed to elevate your brand's online presence and drive business growth.
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
                            We’re the affordable, streamlined partner for small businesses and solopreneurs looking
                            to dominate the online world. And to do that, we follow a structured approach to ensure your
                            digital marketing efforts drive real results.
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

            <div className="py-8">
                <section className="w-[90%] sm:w-[85%] m-auto pt-7 mb-7">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" />
                        <h2 className="font-bold">How SIRz Compares:</h2>
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                            We go beyond the basics—offering smarter strategies, better support, and real results for your eCommerce success. Here’s what makes us different.
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
                        Ready to take your digital presence to the next level? Whether you need expert social media management, high-converting ad campaigns, or engaging content marketing, SIRZ is here to help.
                        Get in touch today and let’s craft a winning digital strategy for your business!
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