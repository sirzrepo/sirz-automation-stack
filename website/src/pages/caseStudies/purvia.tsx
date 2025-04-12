import { PurviaAchievedImgs, PurviaBg, PurviaSection2Bg } from "../../assets";
import HeaderFormat from "../../components/header";

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
                        Purvia is a modern cleaning brand dedicated to providing eco-friendly, effective, and innovative cleaning solutions.
                        With a focus on maintaining cleanliness, hygiene, and a healthier environment, Purvia ensures that both homes and businesses have access to safe and sustainable cleaning products and services.
                        The brand name, inspired by "pure" and "via," represents its mission of delivering a cleaner, healthier world through innovation and responsibility.
                    </div>
                </div>
            </section>
            <section className=" dark:bg-colorDark bg-colorLight py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="The Client's Aim" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                            The goal was to establish a trustworthy and environmentally responsible cleaning brand that embodies cleanliness, sustainability, efficiency, trust, and innovation
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
        </div>
    )
}