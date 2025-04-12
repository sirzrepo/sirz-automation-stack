import { DentiqAchievedImgs, DentiqBg, DentiqTeethImg, DentiqWomanTeethImg, greatBg } from "../../assets";

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
                <img src={DentiqBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] text-[25px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 leading-8 text-justify">
                        DentiQ is a premium, patient-focused dental clinic and oral care brand that combines advanced technology with a personalized touch to redefine the dental experience.
                        With a commitment to precision, comfort, and innovation, DentiQ ensures that every patient receives cutting-edge treatment in a spa-like, stress-free environment.
                        Their tagline, "Smart Smiles, Lasting Impressions," reflects their dedication to providing high-quality dental care that enhances both oral health and confidence.
                    </div>
                </div>
            </section>
            <section className=" bg-colorBlueDeep text-white my-10">
                <div className="grid sm:grid-cols-5 grid-cols-1 sm:gap-8 gap-y-8">
                    <div className="text-justify m-auto sm:w-[80%] w-[90%] max-sm:pt-5 col-span-3">
                        <header className="sm:text-[40px] text-[25px] font-bold">The Client's Aim</header>
                        <p className=" pt-5 leading-8">
                            DentiQ wanted a modern and sophisticated brand identity that positioned them as a trustworthy, tech-driven, and patient-centered dental care provider.
                            They aimed to differentiate themselves through a luxury dental experience, holistic oral health approach,
                            and the integration of AI-assisted diagnostics, pain-free laser treatments, and 3D smile simulations.
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
        </div>
    )
}