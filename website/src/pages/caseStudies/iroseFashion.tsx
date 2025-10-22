import { IroseAchievedImgs, IroseGraphImgFive, IroseGraphImgFour, IroseGraphImgOne, IroseGraphImgSix, IroseGraphImgThree, IroseGraphImgTwo, IroseHeroBg, IroseSection2Bg, } from "../../assets";
import HeaderFormat from "../../components/header";
import GraphLayout from "../../components/layout/graphLayout";
import { calendyLink } from "../../utils";

export default function IroseFashion() {

    const achieveData = [
        {
            img: IroseAchievedImgs.iroseAchievedImgOne,
            title: `Increased Average Order Value`,
            text: `Achieved a 47% increase in average order value from retail stores through targeted automation.`
        },
        {
            img: IroseAchievedImgs.iroseAchievedImgTwo,
            title: `Reduced Operational Costs`,
            text: `Cut warehousing and ad spend costs by 35% through smarter inventory management.`
        },
        {
            img: IroseAchievedImgs.iroseAchievedImgThree,
            title: `International Market Growth`,
            text: `Significantly improved ROI in key international markets, particularly Brazil and India.`
        },
        {
            img: IroseAchievedImgs.iroseAchievedImgFour,
            title: `AI-Driven Buyer Segmentation`,
            text: `Implemented intelligent buyer grouping based on purchasing behavior for better targeting.`
        },
        {
            img: IroseAchievedImgs.iroseAchievedImgFive,
            title: `Automated Remarketing`,
            text: `Established effective automated flows to encourage repeat and bulk purchases.`
        },
        {
            img: IroseAchievedImgs.iroseAchievedImgSix,
            title: `Data-Backed Decision Making`,
            text: `Leveraged predictive analytics for smarter ad spend and inventory management.`
        },
    ]

        const imageGridData = [
            IroseGraphImgOne,
            IroseGraphImgTwo,
            IroseGraphImgThree,
            IroseGraphImgFour,
            IroseGraphImgFive,
            IroseGraphImgSix
        ]
        
    return (
        <div>
            <section className="relative">
                <img src={IroseHeroBg} alt="" className=" sm:h-[600px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] max-w-[90%] bg-black/50 text-center m-auto text-white">Irose: From Rising Costs to High-Value Orders with Smart Sales Automation</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 gap-2 py-10">
                    <header className=" font-bold sm:text-[40px] text-[25px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 leading-8 text-justify">
                        Irose is a US-based fashion brand that specializes in the wholesale delivery of fashion wears and accessories to retail stores across the United States, Brazil, India, and Australia. The brand faced challenges with low order values from retail stores, leading to slow stock movement and increased operational costs.
                    </div>
                </div>
            </section>
            <section className=" dark:bg-colorDark bg-colorLight py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="The Challenge" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                            Irose was struggling with low order values from retail store owners, which led to slow inventory turnover and increased warehousing costs. The marketing team faced challenges with rising social media ad spend that wasn't translating into proportional sales growth, putting pressure on profit margins.
                        </h4>
                    </div>
                </div>
            </section>

            <section className=" sm:w-[90%] w-[95%] m-auto py-10">
                <header className="sm:text-[40px] font-bold mb-8">Key Achievements</header>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Data-Driven Strategy</h3>
                        <p className="text-gray-600 dark:text-white">
                            Implemented AI-powered analytics to identify high-value market segments and optimize inventory distribution.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Automated Engagement</h3>
                        <p className="text-gray-600 dark:text-white">
                            Deployed intelligent remarketing flows that increased customer lifetime value and order frequency.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Cost Optimization</h3>
                        <p className="text-gray-600 dark:text-white">
                            Reduced operational costs by 35% through better inventory management and targeted marketing spend.
                        </p>
                    </div>
                </div>
            </section>

            {/* Solution */}
            <section className="py-16 bg-white dark:bg-[#222222]">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Solution – Powered by Content Agent</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Automated Buyer Engagement</h3>
                                <p className="text-gray-600 dark:text-white">
                                    Through the SIRZ Automation and Analytics System, Irose restructured how it engaged with retail buyers and managed its sales process.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#424242] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Key Capabilities</h3>
                                <ul className="space-y-3 text-gray-600 dark:text-white">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>AI-driven segmentation identified high-potential buyers and grouped them based on purchasing behavior.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Automated remarketing flows encouraged repeat orders and bulk purchases.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Predictive analytics provided insights into which regions and products drove higher value, guiding smarter ad spend.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>AI-powered recommendations optimized inventory levels, ensuring just-in-time replenishment.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#022047] to-colorBlueDeep rounded-lg p-8 text-white flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">The Result:</h3>
                            <p className="text-lg mb-6">
                                Within three months, Irose achieved:
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>47% increase in average order value from retail stores.</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>35% reduction in warehousing and ad spend costs through smarter inventory movement and targeted campaigns.</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                                    <span>Improved ROI across international markets, especially in Brazil and India.</span>
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
                                <img src={data.img} alt="" className="w-full max-h-[700px] object-cover rounded-t-md " />
                                <section className=" sm:w-[80%] px-3 py-4">
                                    <div className="pt-4 pb-4">
                                        <header className=" sm:text-2xl font-bold">{data.title}</header>
                                        <div className=" text-lg">{data.text}</div>
                                    </div>
                                </section>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="relative my-10">
                <img src={IroseSection2Bg} alt="" className=" sm:h-[550px] h-[450px] w-full object-cover" />
                <div className=" bg-[#030202d1] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <div className=" sm:w-[70%] w-[90%] m-auto text-center flex justify-center flex-col items-center">
                        <h4 className="sm:font-bold font-medium sm:text-[30px] text-[18px] text-white pb-8">
                            By combining automation with data intelligence, Irose turned its distribution challenges into growth opportunities. The brand now operates more efficiently, with higher-value orders, reduced operational costs, and stronger international relationships — proving that smart systems can elevate even established wholesale models.
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


            <section className="py-12 bg-white dark:bg-[#222222]">
                <GraphLayout images={imageGridData} />
            </section>
        </div>
    )
}