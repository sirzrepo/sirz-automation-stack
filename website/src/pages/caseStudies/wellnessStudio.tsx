import { WellnessAchievedLogo, WellnessAchievedPalete, WellnessAchievedTagling, WellnessAchievedTypography, WellnessAchievedUser, WellnessAchievedVisual, WellnessGraphImgFive, WellnessGraphImgFour, WellnessGraphImgOne, WellnessGraphImgThree, WellnessGraphImgTwo, WellnesslogoHalf, WellnessStudioBg, WellnessStudioBg2, WellnessWoman } from "../../assets";
import GraphLayout from "../../components/layout/graphLayout";
import { calendyLink } from "../../utils";


   const imageGridData = [
        WellnessGraphImgOne,
        WellnessGraphImgTwo,
        WellnessGraphImgThree,
        WellnessGraphImgFour,
        WellnessGraphImgFive
    ]

export default function WellnessStudio360() {
    const achieveData = [
        {
            img: WellnessAchievedLogo,
            title: "Logo Design",
            text: "Crafted a sleek and modern logo symbolizing movement, balance, and transformation."
        },
        {
            img: WellnessAchievedPalete,
            title: "Color Palette",
            text: "Selected Eerie Black, Stormcloud, White Smoke, Flax, Mindaro, and Peru, conveying strength, calmness, and vitality."
        },
        {
            img: WellnessAchievedTypography,
            title: "Typography",
            text: "Used Poppins, a clean, professional, and modern typeface for clear branding."
        },
        {
            img: WellnessAchievedTagling,
            title: "Tagline Development",
            text: `Integrated phrases like "Well-being begins at home" and "Sweat, stretch, succeed—360° from home.`
        },
        {
            img: WellnessAchievedVisual,
            title: "Cohesive Visual Identity",
            text: "Established a strong and recognizable brand presence across digital and physical platforms."
        },
        {
            img: WellnessAchievedUser,
            title: "User-Centered Branding",
            text: "Created messaging that resonates with health-conscious, busy individuals, ensuring the brand feels supportive, energizing, and transformative"
        },
    ]
    return (
        <div>
            <section className="relative">
                <img src={WellnessStudioBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Wellness Studio 360</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 text-justify">
                        Wellness Studio 360 is a home fitness and well-being brand designed for busy individuals who want
                        to stay healthy, fit, and centered at home. Their offerings combine fitness programs, wellness tips,
                        and mental health resources for a holistic approach.
                    </div>
                </div>
            </section>
            <section className=" sm:w-[90%] m-auto">
                <img src={WellnessStudioBg2} alt="" className=" w-full object-cover" />
            </section>
            <section className=" w-[90%] m-auto py-10">
                <header className=" font-bold sm:text-[40px] col-span-1">Brand Values</header>
                <div className=" grid grid-cols-3 sm:gap-5 gap-2 py-5 sm:w-[60%] m-auto text-black">
                    <div className=" rounded-full sm:py-4 py-2 text-sm bg-[#F4EB64] flex items-center justify-center">Accessibility</div>
                    <div className=" rounded-full sm:py-4 py-2 text-sm bg-[#CC824A] flex items-center justify-center">Accessibility</div>
                    <div className=" rounded-full sm:py-4 py-2 text-sm bg-[#D9FF65] flex items-center justify-center">Accessibility</div>
                </div>
            </section>
            <section className="bg-[#222222] h-[450px] flex items-center relative justify-center">
                <img src={WellnesslogoHalf} alt="" className="absolute left-0 top-0 sm:w-[250px] w-[100px]" />
                <img src={WellnessWoman} alt="" className="absolute right-0 bottom-0 " />
                <div className=" sm:w-[60%] relative max-sm:bg-[#0000007b] rounded-lg max-sm:px-2 w-[90%] m-auto text-center py-10">
                    <header className=" font-bold sm:text-[40px] text-[30px] col-span-1 text-white">The Client’s Aim</header>
                    <div className=" sm:text-[20px] text-[17px] sm:leading-8 text-zinc-300 ">
                        User engagement was largely manual. Fitness programs and wellness tips were sent uniformly,
                        making it difficult to tailor recommendations to individual habits. Engagement was inconsistent,
                        and personalization was time-consuming.
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-16 ">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Solution – Powered by LeadScoring AI</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Personalized Engagement</h3>
                                <p className="text-gray-600 dark:text-white">
                                    Sirz implemented LeadScoring AI, our automated lead scoring and engagement optimization agent, to personalize interactions and enhance user experience.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Key Capabilities</h3>
                                <ul className="space-y-3 text-gray-600 dark:text-white">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Automatically score and segment users based on activity and preferences</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Deliver personalized wellness programs and content aligned with individual goals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Trigger timely notifications and reminders for engagement and motivation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Continuously optimize outreach and retention using AI insights</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#F4EB64] to-[#D9FF65] rounded-lg p-8 text-gray-800 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                            <p className="text-lg mb-6">
                                Wellness Studio 360 transformed its user engagement with an AI-powered system that delivers 
                                personalized fitness and wellness experiences while significantly improving retention and satisfaction.
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-3"></div>
                                    <span>46% increase in daily engagement</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-3"></div>
                                    <span>33% rise in returning users</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-3"></div>
                                    <span>2x improvement in content personalization</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">What we Achieved</header>
                <div className="grid sm:grid-cols-3 sm:w-[85%] w-[90%] py-14 m-auto xxxm:grid-cols-2 gap-8">
                    {
                        achieveData.map((item, index) => (
                            <div key={index} className=" pb-5 bg-colorLight dark:bg-colorDark rounded-md">
                                <img src={item.img} alt="" className="w-full object-cover rounded-t-md h-[250px]" />
                                <section className=" w-[85%] px-3">
                                    <div className="pt-4 pb-4">
                                        <header className=" sm:text-[22px] font-bold">{item.title}</header>
                                        <div className=" text-[13px]">{item.text}</div>
                                    </div>
                                </section>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="relative my-10">
                <img src={WellnessAchievedLogo} alt="" className=" sm:h-[500px] h-[400px] w-full object-cover" />
                <div className=" bg-[#030202d1] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <div className=" w-[70%] m-auto text-center flex justify-center flex-col items-center">
                        <h4 className="font-bold sm:text-[30px] text-[20px] text-white pb-8">
                            Wellness Studio 360 moved to a fully AI-personalized engagement system, delivering tailored
                            content to each user while automating previously manual tasks.
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
                    <h2 className="text-4xl font-bold text-center mb-12">Impact (from the LeadScoring AI Dashboard)</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">💪</div>
                            <p className="text-3xl font-bold text-[#4CAF50]">46%</p>
                            <p className="text-gray-600 dark:text-white mt-2">increase in daily engagement</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱️♀️</div>
                            <p className="text-3xl font-bold text-[#2196F3]">33%</p>
                            <p className="text-gray-600 dark:text-white mt-2">rise in returning users</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#FF9800]">60%</p>
                            <p className="text-gray-600 dark:text-white mt-2">faster workflow execution</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">📊</div>
                            <p className="text-3xl font-bold text-[#9C27B0]">2x</p>
                            <p className="text-gray-600 dark:text-white mt-2">improvement in content personalization accuracy</p>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="py-12 bg-white dark:bg-[#222222]">
                <GraphLayout images={imageGridData} />
                {/* <div className="w-[90%] max-w-4xl mx-auto">
                    <UniversalChart 
                        type="area" 
                        data={data} 
                        dataKeyX="name" 
                        dataKeyY="value" 
                        height={500}
                    />
                    <div className="mt-12 p-6 bg-gray-50 dark:bg-[#424242] rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Insight for Product Evolution</h3>
                        <p className="text-gray-600 dark:text-white">
                            This use case enhanced LeadScoring AI’s Behavioral Segmentation Engine, allowing smarter,
                            automated engagement for wellness brands.
                        </p>
                    </div>
                </div> */}
            </section>
        </div>
    )
}