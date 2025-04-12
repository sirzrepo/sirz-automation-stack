import { BrandcomAchievedAI, BrandcomAchievedAudience, BrandcomAchievedDigital, BrandcomAchievedE_com, BrandcomAchievedGrowth, BrandcomBg, BrandcomBg2, BrandcomEnterepreneurBg, greatBg } from "../../assets";
import HeaderFormat from "../../components/header";

const data = [
    {
        description: `Innovative AI Idea Validation. Instantly tests business ideas for feasibility and market demand.`
    },
    {
        description: `All-in-One Automation – Branding, eCommerce, and marketing managed in a single platform.`
    },
    {
        description: `Uses AI to analyze market entry opportunities and sales performance per region`
    },
]

export default function BrandCom() {

    const achieveData = [
        {
            img: BrandcomAchievedAI,
            title: "Developed AI-Driven Branding Tools",
            text: "Created features such as AI Logo Design, Brand Identity Design, and a Brand Guideline Generator, enabling users to establish a strong brand presence effortlessly."
        },
        {
            img: BrandcomAchievedE_com,
            title: "Built a Smart E-Commerce Platform",
            text: "Integrated Shopify, Amazon, and TikTok Shop, allowing seamless product listings, sales tracking, and inventory management."
        },
        {
            img: BrandcomAchievedDigital,
            title: "Automated Digital Marketing Strategies",
            text: "Implemented AI-driven content calendars, ad management, and performance tracking across Meta Ads, Google Ads, TikTok Ads, and Amazon Ads."
        },
        {
            img: BrandcomAchievedAudience,
            title: "Enhanced Market Research Capabilities",
            text: "Introduced Sirz Ecommarket Analysis Tool, providing users with regional profitability insights, market share analytics, and competitive analysis."
        },
        {
            img: BrandcomAchievedGrowth,
            title: "Streamlined the Business Growth Journey",
            text: "Developed an end-to-end process from idea validation to launch, ensuring businesses can stand out in a crowded market with minimal technical knowledge."
        },
    ]
    return (
        <div>
            <section className="relative">
                <img src={BrandcomBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Brandcom - Case Study</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 text-justify">
                        Brandom is an innovative platform that automates branding, eCommerce, and digital marketing processes using AI.
                        Designed for entrepreneurs, business owners, and digital marketing agencies, Brandom simplifies the journey from idea validation to market entry, ensuring businesses can scale efficiently.
                        The platform offers AI-powered branding tools, eCommerce integrations, and data-driven market insights to help users build, launch, and optimize their online presence with real-time accuracy.
                    </div>
                </div>
            </section>
            <section className=" dark:bg-colorDark bg-colorLight py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="The Client's Aim" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                            The goal was to create a seamless and intelligent branding automation platform that allows users to:
                        </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <img src={BrandcomBg2} alt="" />
                        </div>
                        <div className="text-justify m-auto">
                            <p>
                                The goal was to develop a seamless and intelligent branding automation platform that empowers users to validate business ideas instantly using AI-powered analysis.
                                By automating branding, eCommerce, and digital marketing, the platform minimizes manual effort, making it easier for entrepreneurs to launch and scale their businesses.
                                It also provides effortless integration with major eCommerce platforms like Amazon, Shopify, and TikTok Shop, ensuring a smooth transition from product creation to online sales.
                            </p>
                            <p className=" pt-5">
                                Additionally, Brandom leverages AI-driven insights to support market entry, market share analysis, and profitability assessments, equipping users with data-driven strategies for growth.
                                Ultimately, the platform is designed to help entrepreneurs and businesses establish and expand their brands globally with minimal effort, streamlining the entire journey from idea validation to market success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" w-[90%] m-auto">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">What we Achieved</header>
                <div className=" pt-10">
                    {
                        achieveData.map((data, index) => (
                            <div key={index} className=" flex items-center sm:even:flex-row-reverse justify-between max-sm:flex-col sm:pb-1 pb-10">
                                <img src={data.img} alt="" className="h-[300px] sm:w-[50%] w-full object-cover" />
                                <div className=" m-auto sm:w-[40%] max-sm:pt-5">
                                    <header className=" font-bold sm:text-2xl text-lg col-span-1">{data.title}</header>
                                    <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                        {data.text}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section
                style={{
                    backgroundImage: `url(${greatBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'

                }} className=" pt-40 pb-10">
                <div className="sm:w-[85%] w-[90%] pb-10 m-auto">
                    <h4 className="text-white font-semibold">Unique Selling Proposition (USP)</h4>
                    <section className=" grid sm:grid-cols-3 pt-7 gap-x-5 gap-y-8 max-sm:m-auto">
                        {
                            data.map((item, index) => (
                                <div className="flex items-center justify-center bg-colorDefaultLight dark:bg-colorDark h-[200px] rounded-3xl">
                                    <div key={index} className=" grid grid-cols-5 m-auto gap-2  px-8 text-left">
                                        <div className=" font-bold text-[30px] col-span-1 text-colorBlueDeep">0{index + 1}</div>
                                        <div className="text-lg col-span-4 ">{item.description}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </section>
            <section className=" py-14">
                <header className=" sm:w-[75%] w-[90%] m-auto font-semibold sm:text-[30px] text-[19px] text-center">
                    With Brandom, entrepreneurs and businesses can effortlessly build and scale their online presence, leveraging cutting-edge AI to automate the entire process.
                </header>
                <img src={BrandcomEnterepreneurBg} alt="" className=" w-full object-cover" />
            </section>
        </div>
    )
}