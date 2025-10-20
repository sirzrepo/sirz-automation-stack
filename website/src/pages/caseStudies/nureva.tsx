import { NuveraAchievedImgs, NuveraBg, NuveraGraphImgFive, NuveraGraphImgFour, NuveraGraphImgOne, NuveraGraphImgThree, NuveraGraphImgTwo, NuveraSection2Bg } from "../../assets";
import HeaderFormat from "../../components/header";
import GraphLayout from "../../components/layout/graphLayout";
import { calendyLink } from "../../utils";

export default function Nureva() {

    const imageGridData = [
        NuveraGraphImgOne,
        NuveraGraphImgTwo,
        NuveraGraphImgThree,
        NuveraGraphImgFour,
        NuveraGraphImgFive
        ]

    const achieveData = [
        {
            img: NuveraAchievedImgs.nuveraAchievedImgOne,
            title: `Developed a Strong Brand Identity`,
            text: `Created a name and concept that encapsulates care, renewal, and well-being, ensuring strong brand recall`
        },
        {
            img: NuveraAchievedImgs.nuveraAchievedImgTwo,
            title: `Designed a Professional Visual Identity`,
            text: `Crafted a logo and branding elements that reflect trust, approachability, and excellence.`
        },
        {
            img: NuveraAchievedImgs.nuveraAchievedImgThree,
            title: `Established a Cohesive Brand Voice`,
            text: `Defined a warm, professional, and reassuring tone, ensuring consistent communication across all platforms.`
        },
        {
            img: NuveraAchievedImgs.nuveraAchievedImgFour,
            title: `Refined Key Messaging`,
            text: `Developed impactful taglines such as "Caring for you, every step of the way" and "Your health, our commitment”`
        },
        {
            img: NuveraAchievedImgs.nuveraAchievedImgFive,
            title: `Created a Patient-Centered Branding Approach`,
            text: `Positioned Nureva as a holistic healthcare provider, balancing modern and traditional medicine.`
        },
        {
            img: NuveraAchievedImgs.nuveraAchievedImgSix,
            title: `Strengthened Market Differentiation`,
            text: `Highlighted affordable, accessible, and preventive healthcare solutions, making Nureva stand out in the industry.`
        },
    ]
    return (
        <div>
            <section className="relative">
                <img src={NuveraBg} alt="" className=" sm:h-[500px] h-[400px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Nuvera - Case Study</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] text-[25px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 leading-8 text-justify">
                        Nureva is a modern healthcare brand focused on accessible, patient-centered services. They
                        emphasize holistic wellness, preventive care, and community health.
                    </div>
                </div>
            </section>
            <section className=" dark:bg-colorDark bg-colorLight py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="The Client's Aim" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                            Manual patient support was time-consuming. Responding to inquiries, scheduling appointments,
                            and providing guidance on wellness programs led to delays and inconsistent experiences.
                        </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <img src={NuveraSection2Bg} alt="" />
                        </div>
                        <div className="text-justify m-auto sm:leading-10">
                            <p>
                                {`The goal was to develop a trustworthy and approachable healthcare brand that embodies compassion, integrity, excellence, wellness, and community. 
                            Nureva sought a strong visual identity and messaging that aligns with its mission of providing high-quality, patient-first healthcare services. 
                            The brand also wanted to emphasize preventive care, holistic wellness, and accessibility, ensuring that individuals and families receive the best healthcare experience. 
                            Additionally, Nureva aimed to position itself as a leader in integrating traditional and modern medical practices while fostering community-based healthcare initiatives.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" h-[500px] bg-[#00645B] my-10 py-10">
                <div className="w-[90%] m-auto">
                    <header className=" sm:text-[40px] text-[25px] font-bold text-white">Core Values</header>
                    <div className="text-black sm:w-[70%] pt-20 m-auto grid grid-cols-3 sm:gap-5 gap-y-10 ">
                        <div className=" rounded-full flex items-center justify-center py-2 h-12 max-sm:w-[120px] bg-[#FFFFFF]">Compassion</div>
                        <div className=" rounded-full mt-12 flex items-center justify-center py-2 h-12 max-sm:w-[120px] bg-[#C3E0B7]">Trust</div>
                        <div className=" rounded-full flex items-center justify-center py-2 h-12 max-sm:w-[120px] bg-[#FFFFFF]">Integrity</div>
                        <div className=" rounded-full flex items-center justify-center py-2 h-12 max-sm:w-[120px] bg-[#2AFF65]">Community</div>
                        <div className=" rounded-full flex  mt-12  items-center justify-center py-2 h-12 max-sm:w-[120px] bg-[#C3E0B7]">Wellness</div>
                        <div className=" rounded-full flex items-center justify-center py-2 h-12 max-sm:w-[120px] bg-[#2AFF65]">Excellence</div>
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-16 bg-white dark:bg-[#222222]">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Solution – Powered by Smart Sales Chatbot</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Automated Patient Engagement</h3>
                                <p className="text-gray-600 dark:text-white">
                                    Sirz implemented Smart Sales Chatbot, our AI-driven conversational agent, to automate patient engagement.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Key Capabilities</h3>
                                <ul className="space-y-3 text-gray-600 dark:text-white">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Answer patient queries instantly about services and wellness programs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Guide appointment scheduling and preventive care reminders</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Provide personalized recommendations based on patient needs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Track interactions for continuous AI-driven optimization</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#00645B] to-[#2AFF65] rounded-lg p-8 text-white flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                            <p className="text-lg mb-6">
                                Nureva transformed its patient engagement with an AI-powered system that delivers instant, 
                                accurate responses while allowing healthcare professionals to focus on delivering exceptional care.
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>24/7 patient support</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Reduced administrative workload</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Improved patient satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" w-[90%] m-auto">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">What we Achieved</header>
                <div className=" py-16">
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

            <section className="relative my-10">
                <img src={NuveraBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#030202d1] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <div className=" w-[70%] m-auto text-center flex justify-center flex-col items-center">
                        <h4 className="font-bold sm:text-[30px] text-[20px] text-white pb-8">
                            Nureva transitioned to a fully AI-powered patient engagement system, ensuring instant, accurate,
                            and compassionate responses while freeing staff for care delivery.
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

            {/* <section className=" py-16">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Impact (from the Smart Sales Chatbot Dashboard)</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#4CAF50]">50%</p>
                            <p className="text-gray-600 dark:text-white mt-2">reduction in response time to queries</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">📈</div>
                            <p className="text-3xl font-bold text-[#2196F3]">42%</p>
                            <p className="text-gray-600 dark:text-white mt-2">increase in scheduled appointments</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#FF9800]">Significant</p>
                            <p className="text-gray-600 dark:text-white mt-2">improvement in patient satisfaction and trust</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#9C27B0]">65%</p>
                            <p className="text-gray-600 dark:text-white mt-2">reduction in manual support effort</p>
                       </div>
                    </div>
                </div>
            </section> */}

            <section className="py-12 dark:bg-[#222222]">
                <GraphLayout images={imageGridData} />
                {/* <div className="w-[90%] max-w-4xl mx-auto">
                    <UniversalChart 
                        type="pie" 
                        data={chartData} 
                        dataKeyX="name" 
                        dataKeyY="value" 
                        height={500}
                    />
                    <div className="mt-12 p-6 bg-gray-50 dark:bg-[#424242] rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Insight for Product Evolution</h3>
                        <p className="text-gray-600 dark:text-white">
                            Refined Smart Sales Chatbot’s Healthcare Guidance Module, enabling AI to deliver context-aware,
                            compassionate interactions for healthcare brands.
                        </p>
                    </div>
                </div> */}
            </section>
        </div>
    )
}