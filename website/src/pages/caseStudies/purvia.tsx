import { PurviaAchievedImgs, PurviaBg, PurviaSection2Bg } from "../../assets";
import HeaderFormat from "../../components/header";
import UniversalChart from "../../features/rechart";
import { calendyLink } from "../../utils";

export default function Purvia() {

    const achieveData = [
        {
            img: PurviaAchievedImgs.purviaAchievedImgOne,
            title: `Developed a Strong Brand Identity`,
            text: `Created a name and concept that reflects cleanliness, sustainability, and innovation, ensuring strong brand recall.`
        },
        {
            img: PurviaAchievedImgs.purviaAchievedImgTwo,
            title: `Designed an Eco-Friendly Visual Identity`,
            text: `Crafted a logo and branding elements that convey purity, freshness, and environmental responsibility.`
        },
        {
            img: PurviaAchievedImgs.purviaAchievedImgThree,
            title: `Established a Cohesive Brand Voice`,
            text: `Defined a warm, professional, and reassuring tone that resonates with homeowners, businesses, and eco-conscious consumers.`
        },
        {
            img: PurviaAchievedImgs.purviaAchievedImgFour,
            title: `Refined Key Messaging`,
            text: `Developed impactful taglines such as "The path to a cleaner world" and "Effective cleaning, naturally."`
        },
        {
            img: PurviaAchievedImgs.purviaAchievedImgFive,
            title: `Strengthened Market Differentiation`,
            text: `Highlighted affordable, eco-friendly, and professional cleaning services, setting Purvia apart in the industry.`
        },
        {
            img: PurviaAchievedImgs.purviaAchievedImgSix,
            title: `Customer-Centric Branding Approach`,
            text: `Positioned Purvia as a trusted and accessible brand, offering customizable and high-standard cleaning solutions`
        },
    ]

    const chartData = [
        {
            name: "Appointment Bookings",
            value: 52
        },
        {
            name: "Page Creation and Updates",
            value: 45
        },
        {
            name: "Visitor-to-Lead Conversion",
            value: 38
        },
        {
            name: "Manual Design Effort (Reduction)",
            value: 70
        }
    ]
    return (
        <div>
            <section className="relative">
                <img src={PurviaBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Purvia - Case Study</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 gap-2 py-10">
                    <header className=" font-bold sm:text-[40px] text-[25px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 leading-8 text-justify">
                    Purvia provides non-toxic, professional cleaning solutions with a focus on eco-consciousness. They serve both residential and commercial clients, emphasizing reliability, hygiene, and advanced cleaning techniques.
                    </div>
                </div>
            </section>
            <section className=" dark:bg-colorDark bg-colorLight py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="The Client's Aim" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                            Creating consistent, on-brand messaging for multiple audiences manually was slow and resourceintensive
                        </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <img src={PurviaSection2Bg} alt="" />
                        </div>
                        <div className="text-justify sm:leading-10 m-auto">
                            <p>
                                Purvia sought a strong visual identity and compelling messaging that aligns with its mission to provide high-quality, non-toxic, and professional cleaning solutions.
                                The brand also wanted to emphasize eco-consciousness, hygiene maintenance, and tailored cleaning services, ensuring that individuals and businesses receive safe, effective, and reliable cleaning solutions.
                                Additionally, Purvia aimed to position itself as a leader in offering biodegradable cleaning products and advanced cleaning techniques, catering to both residential and commercial clients.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" sm:w-[90%] w-[95%] m-auto py-10">
                <header className="sm:text-[40px] font-bold">Branch Values</header>
                <div className="text-white grid grid-cols-3 sm:w-[70%] m-auto sm:gap-5 gap-1 py-5 ">
                    <div className=" rounded-full flex items-center justify-center py-3 bg-[#022047]">Cleanliness</div>
                    <div className=" rounded-full flex items-center justify-center py-3 bg-colorBlueDeep">Sustainability</div>
                    <div className=" rounded-full flex items-center justify-center py-3 bg-[#022047]">Luxury</div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-16 bg-white dark:bg-[#222222]">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Solution – Powered by Content Agent</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Automated Content Generation</h3>
                                <p className="text-gray-600 dark:text-white">
                                    Sirz deployed Content Agent, our AI-powered content automation tool, to generate, schedule, and optimize messaging for Purvia's diverse client base.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Key Capabilities</h3>
                                <ul className="space-y-3 text-gray-600 dark:text-white">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Automatically generate on-brand copy for websites, emails, and social media</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Tailor messages for residential vs. commercial clients</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Schedule and publish content across channels automatically</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Analyze engagement and adjust content strategy using AI insights</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#022047] to-colorBlueDeep rounded-lg p-8 text-white flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                            <p className="text-lg mb-6">
                                Purvia transformed its content strategy with an AI-powered system that delivers consistent, 
                                on-brand messaging while significantly reducing manual effort and increasing engagement.
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Consistent brand voice across all channels</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>50% faster content production</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>40% increase in customer engagement</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">What we Achieved</header>
                <div className=" grid sm:grid-cols-2 sm:w-[85%] w-[90%] py-14 m-auto xxxm:grid-cols-2 md:gap-8 gap-2">
                    {
                        achieveData.map((data, index) => (
                            <div key={index} className=" pb-3 bg-colorLight dark:bg-colorDark rounded-md">
                                <img src={data.img} alt="" className="w-full object-cover rounded-t-md " />
                                <section className=" sm:w-[80%] px-3">
                                    <div className="pt-4 pb-4">
                                        <header className=" sm:text-[22px] font-bold">{data.title}</header>
                                        <div className=" text-[15px]">{data.text}</div>
                                    </div>
                                </section>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="relative my-10">
                <img src={PurviaBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#030202d1] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <div className=" w-[70%] m-auto text-center flex justify-center flex-col items-center">
                        <h4 className="font-bold sm:text-[30px] text-[20px] text-white pb-8">
                            DentiQ shifted to a fully automated, AI-optimized digital presence, reinforcing their luxury and
                            tech-driven brand while maximizing patient engagement.
                        </h4>
                        <a href={calendyLink} target="_blank" rel="noopener noreferrer" className={` bg-white text-black rounded-full sm:w-[30%] w-full max-sm:mt-5
                                    'w-full flex align-center justify-center py-3 cursor-pointer text-[16px] px-8 font-medium floating-button  
                                    `}>
                            <button 
                                onClick={() => { }}>
                                Schedule a demo
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            <section className=" py-16">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Impact (from the Content Agent Dashboard)</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">📈</div>
                            <p className="text-3xl font-bold text-[#4CAF50]">40%</p>
                            <p className="text-gray-600 dark:text-white mt-2">increase in customer engagement</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⚡</div>
                            <p className="text-3xl font-bold text-[#2196F3]">50%</p>
                            <p className="text-gray-600 dark:text-white mt-2">faster content production</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">🏆</div>
                            <p className="text-3xl font-bold text-[#FF9800]">Improved</p>
                            <p className="text-gray-600 dark:text-white mt-2">brand consistency across channels</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#9C27B0]">65%</p>
                            <p className="text-gray-600 dark:text-white mt-2">reduction in manual content effort</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white dark:bg-[#222222]">
                <div className="w-[90%] max-w-4xl mx-auto">
                    <UniversalChart 
                        type="line" 
                        data={chartData} 
                        dataKeyX="name" 
                        dataKeyY="value" 
                        height={500}
                    />
                    <div className="mt-12 p-6 bg-gray-50 dark:bg-[#424242] rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Insight for Product Evolution</h3>
                        <p className="text-gray-600 dark:text-white">
                            This refined the Landing Page Builder’s Brand Alignment Engine, ensuring AI-generated pages
                            consistently reflect luxury and innovation.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}