import { WellnessAchievedLogo, WellnessAchievedPalete, WellnessAchievedTagling, WellnessAchievedTypography, WellnessAchievedUser, WellnessAchievedVisual, WellnesslogoHalf, WellnessStudioBg, WellnessStudioBg2, WellnessWoman } from "../../assets";

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
                        Wellness Studio 360 is a home fitness and wellbeing brand designed for busy individuals who want to stay healthy, fit, and centered without leaving their homes.
                        Offering fitness programs, equipment, wellness tips, and mental health resources, the brand promotes a holistic approach to an active and balanced lifestyle.
                        Their mission is to make wellness accessible, convenient, and sustainable, with a strong emphasis on both physical fitness and mental well-being.
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
                        The client wanted a modern, supportive, and energizing brand identity that reflects their focus on accessibility, convenience, sustainability, and balance.
                        They aimed to create a motivational and empowering brand presence that resonates with health-conscious individuals looking for at-home wellness solutions.
                    </div>
                </div>
            </section>
            <section className=" py-10">
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
        </div>
    )
}