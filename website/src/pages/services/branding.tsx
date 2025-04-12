import { useNavigate } from "react-router-dom";
import { BrandImgBg, BrandImgBgTwo, startSmallImg } from "../../assets";
import Button from "../../components/common/button";
import Slider from "./components/slider";
import { ROUTES } from "../../constants/routes/desc";
import { calendyLink } from "../../utils";

const Methods = [
    { num: "01", header: "Brand Discovery", detail: "We uncover the core identity, values, and target audience that make your brand unique.", },
    { num: "02", header: "Brand Strategy", detail: "We create a roadmap to guide your market positioning, from product development to marketing campaigns.", },
    { num: "03", header: "Brand Logo & Visual Identity", detail: "We design a unique logo and visual elements that leave a lasting impression on your audience", },
    { num: "04", header: "Brand Book & Style Guide", detail: "We create a comprehensive guide outlining your brand's core values, mission, and target audience. This ensures consistency across all materials and provides a clear reference for your team and partners.", },
];

const BrandMatters = [
    { title: "Building trust", details: "Customers are more likely to choose and stick with a brand they know and trust.", },
    { title: "Brand Identity", details: "A unique brand identity helps you stand out in a crowded market.", },
    { title: "Customers & Pricing", details: "Strong brands command premium prices and attract more customers", },
    { title: "Reputation", details: "People want to work for companies with a strong reputation.", },
    { title: "Search Engine", details: "Improve search engine visibility and increase organic traffic.", },
];

const SlSocialInsta = [
    { title: "Instagram Post", url: "#", },
    { title: "Instagram Stories", url: "#", },
    { title: "Website design", url: "#", },
    { title: "Client Logos", url: "#", },
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
                        <h1 className="font-bold md:text-[40px] text-[20px] w-full mb-7 md:w-[95%] ">
                            Define, design and build a standout <span className="italic text-colorBlueDeep">identity</span> for your business or product, locally and globally.
                        </h1>
                        <Button text="Request a proposal" onClick={() => { }} className="min:w-[30%] mb-7 md:mb-0" />
                    </div>
                </section>
            </div>

            <div className="py-14 w-[85%] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[100%]">
                <section className="w-full">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <h2 className="font-normal text-lg sm:text-sm">Why Your Brand Matters?</h2>
                    </div>
                    <p className="text-sm sm:text-base">
                        8% of businesses credit brand consistency for 10%+ revenue growth.
                        46% of consumers are more likely to buy from trusted brands.
                        Is your brand helping you achieve these goals?
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
                        <h1 className="font-bold text-3xl italic w-full mb-7 sm:mr-8 mr-0 ">Knowing Your Brand is Our Business</h1>
                        <p className=" mb-7 text-justify ">
                            At SIRz, we believe that understanding your brand is the cornerstone of building a powerful brand identity. We dig deep into your business, getting to know your
                            teams, your goals, and what makes your brand unique. We uncover the qualities that resonate with your audience, to ensure your brand connects on a deeper level.
                            Our expertise goes beyond your company. We thoroughly research your industry, examining consumer trends, business practices, and your competition. With this knowledge,
                            we craft strategies that speak directly to your audience, moving your brand forward.
                        </p>
                        <p className=" mb-8">
                            Let’s work together to elevate your brand to new heights.
                        </p>
                        <button className={` tracking-widest bg-white text-black rounded-full mb-0 sm:mb-6 sm:w-[30%] w-[80%] max-md:m-auto max-sm:mt-5
                            'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                            `}
                            onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                            Get in touch
                        </button>
                    </div>
                </section>
            </div>

            <div className="pt-8">
                {/* Header Section */}
                <section className="w-[95%] sm:w-[85%] m-auto pt-7 ">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" className="w-5 sm:w-6" />
                        <h2 className="font-bold text-lg sm:text-xl">Our Past Projects</h2>
                    </div>

                    <div>
                        <h1 className="text-lg sm:text-2xl lg:text-3xl font-medium italic leading-snug">
                            Explore our portfolio to see how our branding and design teams have
                            brought exceptional projects to life.
                        </h1>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="w-full m-auto mb-7 bg-colorLight dark:bg-colorDark">
                    <div className="w-[90%] m-auto p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {SlSocialInsta.map((item, index) => (
                            <section key={index}
                                className="h-[11vh] flex justify-center first:bg-colorGreenDeeper first:border-b-[6px] border-colorGreen items-center rounded-lg 
                               hover:bg-colorGreen shadow-md cursor-pointer transition-all py-8
                               bg-white first:text-white text-[#001f3e] text-center hoverColor 
                               rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-lg"
                            >
                                <h1 className="font-medium hover:text-white m-auto h-[90%] w-[99.9%] showthis flex justify-center items-center rounded-tl-lg rounded-tr-lg mt-0">{item.title}</h1>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
            <div className=" pt-10 pb-5">
                <Slider />
            </div>

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