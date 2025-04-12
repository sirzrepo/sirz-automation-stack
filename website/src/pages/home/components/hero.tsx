import { HomeBanner, HomeVector } from "../../../assets";
import Button from "../../../components/common/button";
import bgImg from '../../../assets/imgs/Screenshot (602).png'
import { ROUTES } from "../../../constants/routes/desc";
import { useNavigate } from "react-router-dom";


const cardContent = [
    {
        title: "Customized Strategies",
        description: "No cookie-cutter solutions here! We tailor every strategy to fit your business needs, ensuring you get the best results for your brand’s growth."
    },
    {
        title: "Dedicated Support",
        description: "Forget bots—our expert team is here to guide you every step of the way. We are real people, with real solutions and we deliver real success!"
    },
    {
        title: "Proven Growth",
        description: "We don’t just promise results—we deliver them. Our data-driven approach has helped businesses scale and thrive in the digital space. Yours is next!"
    },
]

export default function Hero() {
    const navigate = useNavigate()

    return (
        <section className={` bg-colorGreenDeeper relative pt-6`}>
            <div className=" sm:w-[90%] m-auto">
                <img src={bgImg} alt="" />
                {/* <div className=" pb-5">
                    <div className=" text-[60px] font-semibold text-white flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <h4 className=" whitespace-nowrap">Fuelling Brands</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <ArrowIcon />
                            <h4 className=" whitespace-nowrap">Driving Sales</h4>
                        </div>
                    </div>
                    <div className="flex items-center ps-56 gap-4 text-[60px] font-semibold text-white justify-center">
                        <ArrowIcon />
                        <h4 className=" whitespace-nowrap">Elevating Digital Experiences.</h4>
                    </div>
                </div> */}
                <div className="relative border-l-[5px] max-sm:h-[300px] border-b-[10px] sm:rounded-3xl border-colorGreen overflow-hidden">
                    <img src={HomeBanner} alt="" className="h-full object-cover" />
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-[#000000a8] flex items-center sm:ps-20">
                        <div className=" max-sm:w-[90%] max-sm:m-auto">
                            <header className="sm:text-[40px] text-white text-[25px] relative z-10 leading-tight sm:font-bold">Power Up Your <i className=" text-colorGreen">Brand</i> with Expert <br className=" max-sm:hidden" /> E-commerce, Branding & Marketing <br className=" max-sm:hidden" /> Solutions!</header>
                            <div className="sm:w-[30%] w-[70%] py-6 max-sm:pt-10">
                                <Button text="Get started" onClick={() => navigate(ROUTES.DASHBOARD.PATH)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" grid sm:grid-cols-3 mt-[-4em] relative gap-5 w-[90%] py-8 m-auto">
                    {
                        cardContent.map((item, index) => (
                            <div key={index} className={` ps-12 bg-white text-colorDark border-2 border-colorGreen pr-4 py-6 rounded-xl`}>
                                <header className="  text-black pb-2 font-bold">{item.title}</header>
                                <div className="text-sm">{item.description}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <img src={HomeVector} alt="" />
        </section>
    )
}