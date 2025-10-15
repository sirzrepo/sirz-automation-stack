import { useNavigate } from "react-router-dom";
import { domesticiaImg, EcommerceImgBg, EcommerceImgBgTwo, StarHalfTop, startSmallImg } from "../../assets";
import Button from "../../components/common/button";
import HeaderFormat from "../../components/header";
import { ROUTES } from "../../constants/routes/desc";
import { calendyLink } from "../../utils";

export default function Ecommerce() {
    const navigate = useNavigate();

    const Methods = [
        { num: "01", header: "Store Setup", detail: "We build your storefront on Shopify, Amazon, or WooCommerce with conversion-focused designs powered by AI.", },
        { num: "02", header: "Product Listing", detail: " Our system creates SEO-optimised product descriptions, pricing, and media — all tailored for better visibility and conversions.", },
        { num: "03", header: "Operations Automation", detail: "We connect your store to smart workflows that manage inventory, orders, payments, and fulfilment automatically.", },
        { num: "04", header: "Ongoing Optimization & Support", detail: "We don’t stop at setup. Our team and dashboards continually track performance, identify inefficiencies, and enhance conversion rates on a monthly basis.", },
    ];

    const methodsData = [
        { 
            features: "Automation-Ready Store", 
            SIRz: "Connected to workflows, CRM, and analytics from day one.", 
            freelancers: "Manual setup, no system integration.", 
        },
        { 
            features: "Quality Consistency", 
            SIRz: "Dedicated team ensures every store meets top standards.", 
            freelancers: "Varies by freelancer; quality fluctuates.", 
        },
        { 
            features: "Comprehensive Support", 
            SIRz: "Continuous automation updates and expert guidance.", 
            freelancers: "Limited help after setup; pay extra for fixes.", 
        },
        { 
            features: "Efficiency", 
            SIRz: "Streamlined build process powered by AI tools.", 
            freelancers: "Disconnected processes cause delays.", 
        },
        { 
            features: "Cost-Effectiveness", 
            SIRz: "Simple subscription pricing, no hidden costs.", 
            freelancers: "Low entry cost, hidden maintenance fees.", 
        },
    ];

    const Whysirz = [
        { num: "01", title: "Built for the Future", detail: "Our AI-driven ecosystem connects your store, marketing, and CRM to scale effortlessly.", },
        { num: "02", title: "We Go Beyond Setup", detail: "We deliver performance analytics, SEO insights, and automated optimization that drive measurable growth.", },
        { num: "03", title: "Partners in Progress", detail: "With SIRz, you’re not just subscribing to a tool — you’re partnering with a team committed to your success and scalability.", },
    ];



    return (
        <section>
            <div className="sm:pt-20 sm:pb-4 bg-colorLight dark:bg-colorDark">
                <section className=" sm:w-[85%] mx-auto bg-colorGreenDeeper mb-32 sm:rounded-2xl relative p-6 sm:p-12 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className=" text-white sm:pt-4 pt-16 sm:ps-4">
                        <div className="sm:w-[70%]">
                            <h2 className=" sm:text-[45px] text-[25px] font-bold leading-[1.2em]">Launch & Scale <br /> Your <span className="text-colorGreen italic">E-Commerce Brand</span> with AI Power</h2>
                            <p className="text-white mb-6 mt-6">
                            Your journey to a smarter, automated online store starts here.
                            SIRz helps you launch, optimize, and grow your e-commerce business using our all-in-one automation stack, designed to save time, boost sales, and simplify operations.
                            </p>
                        </div>
                        <button className={` tracking-widest bg-white text-black rounded-full sm:w-[23%] w-full mt-10 max-sm:mt-5
                            'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                            `}
                            onClick={() => navigate(ROUTES.CONTACT.PATH)}>
                            Let's talk
                        </button>
                        <img src={StarHalfTop} alt="" className=" top-0 absolute left-0" />
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative flex justify-center sm:absolute sm:top-0 sm:right-0 sm:w-[380px] w-full">
                        <img src={EcommerceImgBg} alt="" className="  object-cover sm:mt-[-1cm] sm:mr-10 mr-0 mt-10" />
                    </div>
                </section>
            </div>

            <div className=" grid sm:grid-cols-2 md:flex-row w-[90%] sm:w-[85%] mx-auto sm:py-16 pb-16 gap-8">
                {/* Left Section */}
                <section className="">
                    <HeaderFormat title="Launch Your Smart Store with Ease" />
                    <h1 className="font-bold text-1xl sm:text-3xl italic w-full my-6 ">
                        E-Commerce Automation Setup from only £99.99/month
                    </h1>
                    <Button
                        text='Get started'
                        onClick={() => navigate(ROUTES.DASHBOARD.PATH)}
                        className="w-full sm:w-[60%] md:w-[50%]"
                    />
                </section>

                {/* Right Section */}
                <section className="">
                    <p className=" text-justify text-base sm:text-lg">
                        Bring your e-commerce dream to life with automation built for growth. From storefront design to CRM, fulfillment, and analytics, the SIRz stack connects every part of your business, so you can focus on scaling, not managing.
                    </p>
                </section>
            </div>


            <div className="bg-colorLight dark:bg-colorDark py-8">
                {/* Intro Section */}
                <section className="w-[90%] sm:w-[85%] mx-auto pt-7 mb-10 sm:mb-14">
                    <HeaderFormat title="How it Works" />

                    <div>
                        <h1 className="text-base sm:text-lg md:text-xl font-bold">
                            Whether you’re launching your first product or scaling your next million in sales, SIRz automates your e-commerce engine from setup to success.
                        </h1>
                    </div>
                </section>

                {/* Methods Section */}

                <section className="w-[90%] sm:w-[85%] mx-auto pb-7">
                    {Methods.map((method, index) => (
                        <div className="flex flex-col sm:flex-row gap-4 border-t-2 border-black pt-0 pb-6 sm:pb-8" key={index}>

                            {/* Number Badge (Flush with Border) */}
                            <section className="w-14 h-16 sm:w-[10%] sm:h-[22vh] bg-colorGreen rounded-br-full rounded-bl-full flex items-center justify-center -mt-[2px]">
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

            <div>
                <div className="bg-colorGreenDeeper py-11 sm:p-10 text-center">
                    <h1 className="italic sm:w-[75%] w-[90%] text-lg sm:text-2xl sm:font-bold text-white mb-6 mx-auto">
                        We go beyond store setup — we give you a complete growth engine built for automation and scale.
                    </h1>
                    <a href={calendyLink} target="_blank" rel="noopener noreferrer">
                        <button
                            className="mt-5 sm:mt-0 m-auto tracking-widest bg-white text-black rounded-full w-[90%] sm:w-[9cm] flex items-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button"
                            onClick={() => { }}
                        >
                            Schedule demo
                        </button>
                    </a>
                </div>
            </div>

            <div className="py-8">
                <section className="w-[90%] sm:w-[85%] m-auto pt-7 mb-7">
                    <HeaderFormat title="How SIRz Compares:" />
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl sm:font-bold">
                            We go beyond store setup — we give you a complete growth engine built for automation and scale.
                        </h1>
                    </div>
                </section>

                <section className="w-[95%] sm:w-[90%] m-auto mb-7">
                    <div className="p-4 sm:p-6 md:p-10">
                        <div className="w-full m-auto overflow-x-auto border rounded-2xl border-l-[5px] border-b-[10px] border-colorGreen ">
                            <table className="w-full min-w-[600px] min-h-[70vh] border-collapse border border-gray-300 rounded-2xl">
                                {/* Table Head */}
                                <thead className="bg-colorBlueDeep text-white text-sm sm:text-base">
                                    <tr>
                                        <th className="border border-[#A9A9A9] p-3">Features</th>
                                        <th className="border border-[#A9A9A9] p-3">SIRz</th>
                                        <th className="border border-[#A9A9A9] p-3">Random Freelancers</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {methodsData.map((method, index) => (
                                        <tr key={index} className="odd:bg-gray-100 even:bg-white dark:bg-colorDefaultDark">
                                            <td className="border border-r-gray-300 text-center px-4 py-2 sm:px-5 sm:py-3">
                                                <div className="flex gap-2 sm:gap-3 items-center">
                                                    <img src={startSmallImg} alt="" className="w-4 sm:w-5" />
                                                    <h2 className="font-medium text-xs sm:text-sm text-start">{method.features}</h2>
                                                </div>
                                            </td>
                                            <td className="border border-r-gray-300 px-4 py-2 sm:px-5 sm:py-3 font-medium text-xs sm:text-sm">{method.SIRz}</td>
                                            <td className="border border-l-gray-300 px-4 py-2 sm:px-5 sm:py-3 font-medium text-xs sm:text-sm">{method.freelancers}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <div className="m-auto w-full py-8 px-4 dark:bg-colorGreenDeeper">
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center mb-5 w-[90%] sm:w-[70%] m-auto">
                    What we offer? Tailored <span className="italic text-colorBlueDeep">E-commerce</span> Automation for Your Brand
                </h1>

                <div className=" sm:w-[85%] m-auto grid sm:grid-cols-5 sm:gap-5 gap-y-8 h-auto md:h-auto">
                    {/* Image Section */}
                    <section className=" col-span-3 h-[300px] md:h-full">
                        <img src={domesticiaImg} alt="" className="w-full h-full object-cover rounded-2xl" />
                    </section>

                    {/* Text Section */}
                    <section className=" col-span-2 sm:rounded-3xl py-8 bg-[#F0F0F0] dark:bg-colorDark text-justify ">
                        <p className=" sm:text-base w-[85%] m-auto leading-loose ">
                            Your online store isn’t just a website — it’s your digital engine.
                            Our automation stack makes it smarter: integrating sales, customer data, and analytics into one seamless system.
                            From beautiful, branded storefronts to AI-powered upsells and CRM integration, SIRz builds the foundation for sustainable growth.
                        </p>
                    </section>
                </div>
            </div>

            <div className="py-8 bg-colorLight dark:bg-colorDark px-4">
                <section className="w-[95%] sm:w-[85%] m-auto pt-7 mb-7">
                    <HeaderFormat title="Why Choose SIRz for Your E-Commerce Business" />
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium italic w-full sm:w-[80%]">
                            We’re not just building stores — we’re redefining how e-commerce works.
                        </h1>
                    </div>
                </section>

                <section className="w-[95%] sm:w-[85%] flex flex-col md:flex-row gap-5 m-auto mb-7">
                    {/* Image Section */}
                    <div className="w-full md:w-[35%] h-[400px] md:h-[85vh]">
                        <img src={EcommerceImgBgTwo} alt="" className="w-full h-full object-cover rounded-2xl object-top" />
                    </div>

                    {/* Text & List Section */}
                    <div className="w-full md:w-[65%] sm:mt-10">
                        {Whysirz.map((item, index) => (
                            <div className="border-b-2 flex gap-5 mb-6 items-start" key={index}>
                                <h1 className="font-bold italic text-2xl sm:text-3xl text-colorGreen">{item.num}</h1>
                                <div>
                                    <h1 className="font-bold italic text-lg sm:text-2xl text-colorGreen">{item.title}</h1>
                                    <p className="mb-3 font-medium w-full sm:w-[95%] text-sm sm:text-base">{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="w-full p-6 sm:p-10 bg-colorGreenDeeper">
                <div className="w-[95%] sm:w-[90%] m-auto text-center sm:text-left">
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl mb-5 sm:mb-7 w-full sm:w-[80%]">
                        Elevate Your Store with the Power of Automation
                        We handle everything — setup, management, and optimization — all for one affordable monthly price.
                        You focus on growth. We handle the system.
                    </h1>
                    <a href={calendyLink} target="_blank" rel="noopener noreferrer">
                        <button
                            className="tracking-widest bg-white text-black rounded-full w-full sm:w-auto sm:min-w-[200px] flex items-center justify-center py-3 sm:py-4 cursor-pointer text-sm px-6 sm:px-8 font-medium floating-button"
                            onClick={() => { }}>
                            Schedule demo
                        </button>
                    </a>
                </div>
            </div>

        </section>
    )
}
