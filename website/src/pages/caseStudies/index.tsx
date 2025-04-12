import { ImArrowRight2 } from "react-icons/im";
import { CaseStudiesImg, CaseStudyBg, CaseStudyBg2, GreenVector, Note, Note2, NoteDark } from "../../assets";
import HeaderFormat from "../../components/header";
import { ROUTES } from "../../constants/routes/desc";
import { useNavigate } from "react-router-dom";

export default function CaseStudies() {
    const navigate = useNavigate();

    const caseStudies = [
        {
            image: CaseStudiesImg.caseMoss,
            url: ROUTES.CASE_STUDY_MOSS_GLOW_BEAUTY.PATH,
            title: "Moss & Glow Beauty",
            text: "Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products."
        },
        {
            image: CaseStudiesImg.caseWellness,
            url: ROUTES.CASE_STUDY_WELLNESS_STUDIO.PATH,
            title: "Wellness Studio 360",
            text: "Wellness Studio 360 is a home fitness and wellbeing brand designed for busy individuals who want to stay healthy, fit..."
        },
        {
            image: CaseStudiesImg.caseDentiq,
            url: ROUTES.CASE_STUDY_DENTIQ.PATH,
            title: "DentiQ",
            text: "DentiQ is a premium, patient-focused dental clinic and oral care brand that combines advanced technology with a ..."
        },
        {
            image: CaseStudiesImg.caseBrandcom,
            url: ROUTES.CASE_STUDY_BRANDCOM.PATH,
            title: "Brandcom",
            text: "Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products."
        },
        {
            image: CaseStudiesImg.casePurvia,
            url: ROUTES.CASE_STUDY_PURVIA.PATH,
            title: "Purvia",
            text: "DentiQ is a premium, patient-focused dental clinic and oral care brand that combines advanced technology with a ..."
        },
        {
            image: CaseStudiesImg.caseNuvera,
            url: ROUTES.CASE_STUDY_NUREVA.PATH,
            title: "Nureva",
            text: "Nureva is a modern healthcare brand dedicated to accessible, compassionate, and patient-centered healthcare solutions..."
        },
    ]
    return (
        <div className="pt-12">
            <section className="relative">
                <div className=' sm:w-[75%] w-[90%] m-auto pb-10'>
                    <div className=" sm:w-[70%] w-[90%] m-auto relative z-20">
                        <header className="sm:text-[50px] text-[30px] leading-tight text-center font-bold">Case Study</header>
                        <div className=" text-center pt-6 pb-3 sm:text-[25px] text-[18px] ">
                            <i>Discover how we’ve helped brands grow through digital marketing, branding, and design.</i>
                        </div>
                        <img src={GreenVector} alt="" className=" absolute sm:top-[-10px] top-[-45px] bottom-0 left-0 m-auto right-0" />
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <div className=" w-full">
                        <img
                            src={CaseStudyBg}
                            alt="" className=' h-full min-w-[100vw] w-full object-cover'
                        />
                    </div>
                    <div className="absolute max-sm:hidden top-3">
                        <img
                            src={CaseStudyBg2}
                            alt="" className=' h-full w-full object-cover'
                        />
                    </div>
                </div>
                <img src={NoteDark} alt="" className=" absolute sm:right-[25%] right-16 sm:top-[33%] top-4 w-[50px]" />
                <img src={Note2} alt="" className=" absolute left-3 w-[60px] sm:bottom-[35%] bottom-20 " />
                <img src={Note} alt="" className=" absolute sm:right-[10%] right-10 w-[40px] sm:bottom-[35%] bottom-20" />
            </section>

            <section>
                <div className=" grid sm:grid-cols-2 sm:w-[85%] w-[90%] py-14 m-auto xxxm:grid-cols-2 gap-8">
                    {
                        caseStudies.map((data, index) => (
                            <div key={index} className=" pb-5 bg-colorLight dark:bg-colorDark rounded-md">
                                <img src={data.image} alt="" className="w-full object-cover rounded-t-md " />
                                <section className=" sm:w-[80%] px-3">
                                    <div className="pt-4 pb-4">
                                        <header className=" sm:text-[22px] font-bold">{data.title}</header>
                                        <div className=" sm:text-[15px] text-[13px]">{data.text}</div>
                                    </div>
                                    <div className=" grid grid-cols-3 gap-3 text-black font-light">
                                        <div className="bg-[#CFD7FE] text-[10px] py-2 rounded-full flex items-center justify-center whitespace-nowrap">Branding</div>
                                        <div className="bg-[#CFD7FE] text-[10px] py-2 rounded-full flex items-center justify-center whitespace-nowrap">Visual identity</div>
                                        <div className="bg-[#CFD7FE] text-[10px] py-2 rounded-full flex items-center justify-center whitespace-nowrap">Logo design</div>
                                    </div>
                                    <button
                                        onClick={() => navigate(data?.url)}
                                        className="flex items-center gap-2 text-colorBlueDeep font-normal text-[12px] pt-4">
                                        Read case study
                                        <ImArrowRight2 className="mt-1" />
                                    </button>
                                </section>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className=" bg-colorGreenDeeper text-white ">
                <div className="sm:w-[85%] w-[90%] m-auto py-10">
                    <div className='sm:w-[60%] max-sm:text-center'>
                        <HeaderFormat title="Better together" />
                        <h4 className=" pt-4 sm:text-[20px] text-[17px]">
                            Want to Elevant Your Brand?
                        </h4>
                        <div className=" pb-8 text-[20px] ">
                            Let’s work together! Get in touch today and let’s bring your vision to life.                        </div>
                    </div>
                    <button className={` bg-white text-black rounded-full sm:w-[20%] w-full max-sm:mt-5
                                    'w-full flex align-center justify-center py-2 cursor-pointer text-[16px] px-8 font-medium floating-button  
                                    `}
                        onClick={() => navigate(ROUTES.DASHBOARD.PATH)}>
                        Get in touch
                    </button>
                </div>
            </section>
        </div>
    )
}