import { 
    AchievementImg_Five, 
    AchievementImg_Four, AchievementImg_one, AchievementImg_Three, AchievementImg_Two, MossAchievedImgFive, MossAchievedImgFour, MossAchievedImgOne, MossAchievedImgSix, MossAchievedImgThree, MossAchievedImgTwo, MossClientImg, MossGlowBg, MossGlowBg2, MossGlowLastBg } from "../../assets";
import GraphLayout from "../../components/layout/graphLayout";
import { calendyLink } from "../../utils";

export default function MossGlowBeauty() {

    const imageGridData = [
        MossAchievedImgOne,
        MossAchievedImgTwo,
        MossAchievedImgThree,
        MossAchievedImgFour,
        MossAchievedImgFive,
        MossAchievedImgSix
    ]
    return (
        <div>
            <section className="relative">
                <img src={MossGlowBg} alt="" className=" sm:h-[500px] h-[400px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Moss & Glow Beauty</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 text-justify">
                        Moss & Glow Beauty is a skincare brand rooted in sustainability and conscious beauty. Their “Glow
                        Naturally” mission promotes 100% plant-based, cruelty-free skincare for health-conscious
                        consumers. While the brand had a loyal following, they faced challenges in maintaining consistent
                        engagement and optimizing campaigns for growth.
                    </div>
                </div>
            </section>
            <section className="w-[90%] mx-auto">
                <img src={MossGlowBg2} alt="" className=" h-[500px] w-full object-cover" />
            </section>
            <section className=" bg-[#F0F2BC] text-black my-10">
                <div className=" w-[90%] m-auto sm:grid grid-cols-2 pt-12">
                    <div>
                        <header className=" font-bold text-2xl col-span-1">The Client’s Aim</header>
                        <div className=" col-span-3 text-lg leading-8 pt-5 text-justify">
                            Marketing campaigns were difficult to scale efficiently. Without automation, creating, scheduling,
                            and optimizing content across multiple channels was slow and fragmented. The brand needed a
                            solution that could automate their marketing strategy and provide real-time insights into campaign performance.
                        </div>
                    </div>
                    <div className=" col-span-1">
                        <img src={MossClientImg} alt="" className=" w-full object-contain h-[400px]" />
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-16 bg-white dark:bg-[#222222]">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Solution – Powered by BrandCom</h2>
                    <div className="text-lg leading-8 text-center sm:w-[70%] w-full mx-auto mb-12">
                        Sirz implemented BrandCom, our AI-driven brand content and campaign automation agent, to
                        streamline Moss & Glow's marketing. BrandCom enabled the brand to:
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">AI-Powered Marketing Automation</h3>
                                <p className="text-gray-600 dark:text-white">
                                    BrandCom transformed Moss & Glow's marketing with intelligent automation and real-time optimization.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Key Capabilities</h3>
                                <ul className="space-y-3 text-gray-600 dark:text-white">
                                    <li className="flex items-start dark:text-white">
                                        <span className="mr-2">•</span>
                                        <span>Automate content creation and campaign launches tailored to audience behavior</span>
                                    </li>
                                    <li className="flex items-start dark:text-white">
                                        <span className="mr-2">•</span>
                                        <span>Track engagement, conversions, and reach in a single AI-powered dashboard</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Optimize posting times and creative strategies using predictive analytics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Deliver personalized retargeting messages to customers showing purchase intent</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#F0F2BC] to-[#D9FF65] rounded-lg p-8 text-gray-800 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                            <p className="text-lg mb-6">
                                Moss & Glow transformed its marketing with an AI-powered system that delivers
                                personalized, high-performing campaigns while significantly reducing manual effort.
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-3"></div>
                                    <span>37% increase in returning customers</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-3"></div>
                                    <span>42% faster campaign execution</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full mr-3"></div>
                                    <span>70% reduction in manual campaign effort</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className=" w-[90%] m-auto">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">Solution – Powered by BrandCom</header>
                <div className=" text-lg leading-8 pt-5 text-center sm:w-[70%] w-full m-auto">
                    Sirz implemented BrandCom, our AI-driven brand content and campaign automation agent, to
                    streamline Moss & Glow’s marketing. BrandCom enabled the brand to:
                </div>
                <div className=" pt-10">
                    <div className=" flex items-center justify-between max-sm:flex-col sm:pb-1 pb-10">
                        <img src={AchievementImg_one} alt="" className="h-[300px] sm:w-[50%] w-full object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Smart Automation</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Automate content creation and campaign launches tailored to audience behavior
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col flex-row-reverse justify-between sm:pb-1 pb-10">
                        <img src={AchievementImg_Two} alt="" className="h-[300px] w-full sm:w-[50%] object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Unified Analytics</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Track engagement, conversions, and reach in a single AI-powered dashboard.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col justify-between sm:pb-1 pb-10">
                        <img src={AchievementImg_Three} alt="" className="h-[300px] w-full sm:w-[50%] object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Predictive Optimization</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Optimize posting times and creative strategies using predictive analytics.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col flex-row-reverse justify-between sm:pb-1 pb-10">
                        <img src={AchievementImg_Four} alt="" className="h-[300px] w-full sm:w-[50%] object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Personalized Retargeting</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Deliver personalized retargeting messages to customers showing purchase intent.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col justify-between  sm:pb-1 pb-10">
                        <img src={AchievementImg_Five} alt="" className="h-[300px] object-cover sm:w-[50%]" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Smart Retargeting</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Use AI to identify and target customers most likely to convert.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative my-10">
                <img src={MossGlowLastBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#030202d1] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <div className=" w-[70%] m-auto text-center flex justify-center flex-col items-center">
                        <h4 className="font-bold sm:text-[30px] text-[20px] text-white pb-8">
                            Moss & Glow transitioned to a fully automated, AI-optimized marketing system, allowing the team to focus on product innovation while BrandCom handled performance tracking and engagement in real time.
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
                    <h2 className="text-4xl font-bold text-center mb-12">Impact (from the BrandCom Dashboard)</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">🚀</div>
                            <p className="text-3xl font-bold text-[#4CAF50]">37%</p>
                            <p className="text-gray-600 mt-2 dark:text-white">increase in returning customers</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⚡</div>
                            <p className="text-3xl font-bold text-[#2196F3]">42%</p>
                            <p className="text-gray-600 mt-2 dark:text-white">faster campaign execution</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">📈</div>
                            <p className="text-3xl font-bold text-[#FF9800]">28%</p>
                            <p className="text-gray-600 mt-2 dark:text-white">growth in overall engagement rate</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg text-center">
                            <div className="text-4xl mb-3">⏱</div>
                            <p className="text-3xl font-bold text-[#9C27B0]">70%</p>
                            <p className="text-gray-600 mt-2 dark:text-white">reduction in manual campaign effort</p>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="py-12 bg-white dark:bg-[#222222]">
                <GraphLayout images={imageGridData} />
                {/* <div className="w-[90%] max-w-4xl mx-auto">
                    <UniversalChart 
                        type="bar" 
                        data={data} 
                        dataKeyX="name" 
                        dataKeyY="value" 
                        height={500}
                    />
                    <div className="mt-12 p-6 bg-gray-50 dark:bg-[#424242] rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Insight for Product Evolution</h3>
                        <p className="text-gray-600 dark:text-white">
                            Collaboration refined BrandCom's Behavioral Trigger Engine, enabling automated, personalized
                            campaigns for eco-conscious brands without compromising authenticity.
                        </p>
                    </div>
                </div> */}
            </section>

            
        </div>
    )
}