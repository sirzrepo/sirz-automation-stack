import { DentiqAchievedImgs, DentiqBg, DentiqGraphImgFive, DentiqGraphImgFour, DentiqGraphImgOne, DentiqGraphImgThree, DentiqGraphImgTwo, DentiqTeethImg, DentiqWomanTeethImg, greatBg } from "../../assets";
import GraphLayout from "../../components/layout/graphLayout";
import { calendyLink } from "../../utils";

const data = [
    {
        description: `Tech-Driven Dentistry: AI-assisted diagnostics, pain-free laser treatments, and 3D smile simulations.`
    },
    {
        description: `Luxury Dental Experience: Relaxing, spa-like ambiance with personalized patient care.`
    },
    {
        description: `Holistic Oral Health Approach: Beyond treatment—education, prevention, and wellness-focused dental plans.`
    },
]

const imageGridData = [
    DentiqGraphImgOne,
    DentiqGraphImgTwo,
    DentiqGraphImgThree,
    DentiqGraphImgFour,
    DentiqGraphImgFive,
]


export default function DentiQ() {

    const achieveData = [
        {
            img: DentiqAchievedImgs.dentiqAchievedImgOne,
            title: "Distinctive Logo Design:",
            text: "Created a sleek and professional logo that reflects DentiQ’s commitment to innovation, trust, and premium care."
        },
        {
            img: DentiqAchievedImgs.dentiqAchievedImgTwo,
            title: "Key Messaging",
            text: `Reinforced DentiQ’s messaging with compelling phrases such as "A smarter way to a healthier smile" and "Experience dentistry designed for you`
        },
        {
            img: DentiqAchievedImgs.dentiqAchievedImgThree,
            title: "Typography Selection",
            text: "Chose modern and professional fonts that convey a balance of approachability and high-end expertise."
        },
        {
            img: DentiqAchievedImgs.dentiqAchievedImgFour,
            title: "Elegant Color Palette",
            text: "Selected a refined combination of cool blues, whites, and subtle metallics, evoking cleanliness, sophistication, and tranquility."
        },
        {
            img: DentiqAchievedImgs.dentiqAchievedImgFive,
            title: "Visual Identity System",
            text: "Developed a consistent branding strategy that ensures strong recognition across digital platforms, physical clinics, and marketing materials."
        },
    ]
    return (
        <div>
            <section className="relative">
                <img src={DentiqBg} alt="" className=" sm:h-[500px] h-[400px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] text-[25px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 leading-8 text-justify">
                        DentiQ is a premium dental care brand focused on tech-driven, patient-centered services. Their
                        offerings include AI-assisted diagnostics, pain-free laser treatments, and 3D smile simulations.
                    </div>
                </div>
            </section>
            <section className=" bg-colorBlueDeep text-white my-10">
                <div className="grid sm:grid-cols-5 grid-cols-1 sm:gap-8 gap-y-8">
                    <div className="text-justify m-auto sm:w-[80%] w-[90%] max-sm:pt-5 col-span-3">
                        <header className="sm:text-[40px] text-[25px] font-bold">The Client's Aim</header>
                        <p className=" pt-5 leading-8">
                            Manually designing landing pages that reflected DentiQ’s luxury, tech-forward identity was timeintensive and inconsistent.
                        </p>
                    </div>
                    <div className=" col-span-2 ">
                        <img src={DentiqWomanTeethImg} alt="" className=" w-full object-cover" />
                    </div>
                </div>
            </section>

            <section className=" w-[90%] m-auto py-5">
                <header className="sm:text-[40px] font-bold">Branch Personality</header>
                <div className="text-white grid grid-cols-4 sm:w-[80%] m-auto sm:gap-5 gap-32 py-5 max-sm:overflow-x-scroll">
                    <div className=" rounded-full flex items-center justify-center sm:py-4 py-2 max-sm:w-[120px] bg-colorBlueDeep">Trustworthy</div>
                    <div className=" rounded-full flex items-center justify-center sm:py-4 py-2 max-sm:w-[120px] bg-[#FD7000]">Friendly</div>
                    <div className=" rounded-full flex items-center justify-center sm:py-4 py-2 max-sm:w-[120px] bg-colorBlueDeep">Educational</div>
                    <div className=" rounded-full flex items-center justify-center sm:py-4 py-2 max-sm:w-[120px] bg-[#FD7000]">Appreachable</div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-16 bg-white dark:bg-[#222222]">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Solution – Powered by Landing Page Builder</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">AI-Optimized Web Presence</h3>
                                <p className="text-gray-600 dark:text-white">
                                    Sirz implemented Landing Page Builder, our AI-driven page generator, to create optimized web pages that reflect DentiQ's luxury, tech-forward identity.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold dark:text-white mb-3">Key Capabilities</h3>
                                <ul className="space-y-3 text-gray-600 dark:text-white">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Generate high-converting, on-brand landing pages quickly</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Integrate services, testimonials, and AI features automatically</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Optimize layout and calls-to-action using predictive AI</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Continuously test and refine pages based on engagement data</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-colorBlueDeep to-[#FD7000] rounded-lg p-8 text-white flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                            <p className="text-lg mb-6">
                                DentiQ transformed its digital presence with an AI-powered system that delivers 
                                high-performing, on-brand landing pages while significantly reducing design and development time.
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>52% increase in appointment bookings</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>45% faster page creation and updates</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>70% reduction in manual web design effort</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" sm:w-[90%] m-auto">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">What we Achieved</header>
                <div className=" pt-10">
                    {
                        achieveData.map((data, index) => (
                            <div key={index} className=" flex items-center sm:even:flex-row-reverse justify-between max-sm:flex-col sm:pb-1 pb-10">
                                <img src={data.img} alt="" className="h-[300px] sm:w-[50%] w-full object-cover" />
                                <div className=" m-auto sm:w-[40%] max-sm:pt-5 max-sm:px-3">
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
                <img src={DentiqTeethImg} alt="" className=" w-full object-cover" />
            </section>

            <section className="relative my-10">
                <img src={DentiqBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
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

            {/* <section className=" py-16">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Impact (from the Landing Page Builder Dashboard)</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">📈</div>
                            <p className="text-3xl font-bold text-[#4CAF50]">52%</p>
                            <p className="text-gray-600 dark:text-white mt-2">increase in appointment bookings</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⚡</div>
                            <p className="text-3xl font-bold text-[#2196F3]">45%</p>
                            <p className="text-gray-600 dark:text-white mt-2">faster page creation and updates</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">🖥</div>
                            <p className="text-3xl font-bold text-[#FF9800]">38%</p>
                            <p className="text-gray-600 dark:text-white mt-2">higher visitor-to-lead conversion</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#9C27B0]">70%</p>
                            <p className="text-gray-600 dark:text-white mt-2">reduction in manual web design effort</p>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="py-12 bg-white  dark:bg-[#222222]">
                <GraphLayout images={imageGridData} />
                {/* <div className="w-[90%] max-w-4xl mx-auto">
                    <UniversalChart 
                        type="bar" 
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
                </div> */}
            </section>
        </div>
    )
}