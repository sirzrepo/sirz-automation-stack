import { BsTelephone } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";
import { TbClockHour5 } from "react-icons/tb";
import { GetInTouchBg } from "../../../assets";

const cardData = [
    {
        icon: <BsTelephone />,
        title: "Phone",
        text: "+447407245685 | +2348100652013"
    },
    {
        icon: <SlLocationPin />,
        title: "Address",
        text: "17 Barmouth Road, Marine Parada LL42 1NA"
    },
    {
        icon: <AiOutlineMail />,
        title: "Email",
        text: "support@sirz.co.uk"
    },
    {
        icon: <TbClockHour5 />,
        title: "Hours",
        text: "Mon-Fri 9:00AM - 5:00PM "
    },
]

export default function GetInTouch() {
    return (
        <div
            style={{
                backgroundImage: `url(${GetInTouchBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="  over relative text-white  mb-14"
        >
            {/* <img src={sampleImgNew} alt="" className="h-full w-full object-cover blur-sm" /> */}
            <div className="pb-12 pt-20 top-0 left-0 right-0 bottom-0 bg-[#000000a8]">
                <div
                    className=" w-[85%] m-auto "
                >
                    <div className="text-center">
                        <header>Get in touch with us!</header>
                        <h4 className=" font-bold sm:w-[60%] m-auto pb-8 pt-3 text-[40px] ">
                        Got questions or need expert support? We're here to help! Reach out and let's make your business thrive
                        </h4>
                    </div>
                    <section className=" py-12 grid sm:grid-cols-2 gap-8 ">
                        {
                            cardData.map((item, index) => (
                                <div key={index} className="bg-white text-black rounded-xl py-5 px-5 flex items-center gap-4">
                                    <div className=" h-16 w-16 bg-colorBlueDeep text-white flex items-center justify-center rounded-full text-[20px] font-semibold">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className=" font-bold text-[18px]">{item.title}:</h4>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </div>
        </div>
    )
}