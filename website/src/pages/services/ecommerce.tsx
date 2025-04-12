import { useNavigate } from "react-router-dom";
import { domesticiaImg, EcommerceImgBg, EcommerceImgBgTwo, StarHalfTop, startSmallImg } from "../../assets";
import Button from "../../components/common/button";
import HeaderFormat from "../../components/header";
import { ROUTES } from "../../constants/routes/desc";
import { calendyLink } from "../../utils";

export default function Ecommerce() {
    const navigate = useNavigate();

    const Methods = [
        { num: "01", header: "Store Setup", detail: "From choosing the right platform (Shopify, Amazon, and more) to designing a visually appealing storefront, we handle it all.", },
        { num: "02", header: "Product Listing", detail: "We create persuasive, SEO-friendly product descriptions and high-quality images to effectively showcase your products.", },
        { num: "03", header: "Operational Setup", detail: "We streamline your store's operations—covering inventory management, shipping, and payment processing. We also handle demand forecasting and real-time troubleshooting that only humans can manage.", },
        { num: "04", header: "Ongoing Support Beyond Automation", detail: "Our dedicated team offers continuous assistance with in-depth performance analysis, strategic guidance, and proactive issue resolution that software alone can’t provide, ensuring your store runs smoothly..", },
    ];

    const methodsData = [
        { features: "Quality Consistency", SIRz: "Consistent, high-quality work from a dedicated team", freelancers: "Varies by freelancer; quality can be inconsistent", },
        { features: "Comprehensive Support", SIRz: "Ongoing support and troubleshooting included", freelancers: "Limited post-launch support; may require additional hires", },
        { features: "Integrated Solutions", SIRz: "Complete setup, management, and support in one package", freelancers: "May require multiple freelancers for different tasks, leading to potential gaps", },
        { features: "Efficiency", SIRz: "Streamlined process with a single point of contact", freelancers: "Multiple freelancers can lead to coordination issues and delays", },
        { features: "Cost-Effectiveness", SIRz: "Transparent pricing with no hidden costs", freelancers: "Initial low costs can lead to hidden fees and extra charges", },
    ];

    const Whysirz = [
        { num: "01", title: "We’re redefining e-commerce", detail: "Our approach is a blend of cutting-edge technology, deep industry expertise, and a customer-centric philosophy. We don’t just build online stores; we create digital experiences that drive sales and build lasting customer relationships.", },
        { num: "02", title: "We go the extra mile", detail: "From meticulous store design to practical insights from analytics, we deliver unparalleled results. We’re not just meeting expectations; we’re exceeding them.", },
        { num: "03", title: "Partners in Progress", detail: "With SIRz, you’re not just getting a service; you’re partnering with a team committed to revolutionizing your online presence and driving actual growth.", },
    ];



    return (
        <section>
            <div className="sm:pt-20 sm:pb-4 bg-colorLight dark:bg-colorDark">
                <section className=" sm:w-[85%] mx-auto bg-colorGreenDeeper mb-32 sm:rounded-2xl relative p-6 sm:p-12 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className=" text-white sm:pt-4 pt-16 sm:ps-4">
                        <div className="sm:w-[70%]">
                            <h2 className=" sm:text-[45px] text-[25px] font-bold leading-[1.2em]">Launch & Scale <br /> Your Online <span className="text-colorGreen italic">Store</span> with Ease</h2>
                            <p className="text-white mb-6 mt-6">
                                Your journey to a thriving eCommerce business starts here. We help you build, optimize, and grow your online store. Let’s talk
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
                    <HeaderFormat title="Launch Your Online Store with Ease" />
                    <h1 className="font-bold text-1xl sm:text-3xl italic w-full my-6 ">
                        E-commerce Business Setup from only £99.99
                    </h1>
                    <Button
                        text='Get started'
                        onClick={() => navigate(ROUTES.DASHBOARD.PATH)}
                        className="w-full sm:w-[50%] md:w-[40%]"
                    />
                </section>

                {/* Right Section */}
                <section className="">
                    <p className=" text-justify text-base sm:text-lg">
                        Bring your E-commerce business desire to reality with a hands-on, results-driven approach that covers it all—strategy, measurement,
                        execution, and operations. Our team of copywriters, developers, designers, store managers, and social media managers, is all at your disposal.
                    </p>
                </section>
            </div>


            <div className="bg-colorLight dark:bg-colorDark py-8">
                {/* Intro Section */}
                <section className="w-[90%] sm:w-[85%] mx-auto pt-7 mb-10 sm:mb-14">
                    <HeaderFormat title="How it Works" />

                    <div>
                        <h1 className="text-base sm:text-lg md:text-xl font-bold">
                            Are you a small or medium-sized business looking to expand online? Or an individual with a great
                            product idea ready to sell? Our e-commerce setup service supports you every step of the way.
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
                        You can find cheaper options for setting up your online store. But trust us, you get what you pay for.
                        With SIRZ, you’re not just saving money; you’re investing in a high-quality e-commerce store that’ll
                        actually make you money. We offer the whole package – setup, management, and support – to give you value for your money.
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
                            We go beyond the basics—offering smarter strategies, better support, and real results for your eCommerce success. Here’s what makes us different.
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
                    What we offer? Tailored <span className="italic text-colorBlueDeep">E-commerce</span> Store Design Exclusively for Your Brand
                </h1>

                <div className=" sm:w-[85%] m-auto grid sm:grid-cols-5 sm:gap-5 gap-y-8 h-auto md:h-auto">
                    {/* Image Section */}
                    <section className=" col-span-3 h-[300px] md:h-full">
                        <img src={domesticiaImg} alt="" className="w-full h-full object-cover rounded-2xl" />
                    </section>

                    {/* Text Section */}
                    <section className=" col-span-2 sm:rounded-3xl py-8 bg-[#F0F0F0] dark:bg-colorDark text-justify ">
                        <p className=" sm:text-base w-[85%] m-auto leading-loose ">
                            Your online store is your digital storefront. Let's make it unforgettable. Our design team crafts custom e-commerce experiences that align perfectly with your brand identity. From captivating visuals to intuitive navigation, we create online spaces that not only look stunning but also drive conversions.
                            Whether you're selling high-end fashion or everyday essentials, we'll design a store that reflects your unique selling proposition and leaves a lasting impression on your customers.
                        </p>
                    </section>
                </div>
            </div>

            <div className="py-8 bg-colorLight dark:bg-colorDark px-4">
                <section className="w-[95%] sm:w-[85%] m-auto pt-7 mb-7">
                    <HeaderFormat title="Why use SIRz for your e-commerce business" />
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium italic w-full sm:w-[80%]">
                            We're not just another e-commerce business setup solution. We're a revolution.
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
                        Elevate your e-commerce store with our setup services.
                        We handle everything for a low monthly price, so you can focus on growing your business.
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
