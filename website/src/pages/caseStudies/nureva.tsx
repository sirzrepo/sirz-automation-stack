import { NuveraAchievedImgs, NuveraBg, NuveraSection2Bg } from "../../assets";
import HeaderFormat from "../../components/header";

export default function Nureva() {

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
                <img src={NuveraBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Nuvera - Case Study</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] text-[25px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 leading-8 text-justify">
                        Nureva is a modern healthcare brand dedicated to accessible, compassionate, and patient-centered healthcare solutions.
                        With a strong focus on holistic wellness, preventive care, and high-quality medical services, Nureva aims to improve individual and community well-being.
                        The brand name, inspired by "nurture" and "revive," reflects its commitment to care, renewal, and overall health.
                    </div>
                </div>
            </section>
            <section className=" dark:bg-colorDark bg-colorLight py-10">
                <div className='sm:w-[85%] w-[90%] m-auto'>
                    <div className=''>
                        <HeaderFormat title="The Client's Aim" classNames="text-black dark:text-white" />
                        <h4 className=" sm:font-bold max-sm:text-justify sm:py-6 py-4 sm:text-[27px] text-[17px] sm:leading-9">
                            The goal was to develop a trustworthy and forward-thinking technology brand that embodies innovation, efficiency, accessibility, and user empowerment.
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
        </div>
    )
}