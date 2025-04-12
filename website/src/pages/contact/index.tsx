import { TbClockHour5 } from "react-icons/tb";
import { useAppSelector } from "../../app/hook";
import { ContactBg, rectangleDarkBlue, sirzLogo, sirzLogoWhite, starFullImg } from "../../assets";
import HeaderFormat from "../../components/header";
import { allReduxSliceInfo } from "../../features/reduxSlice";
import { AiOutlineMail } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import ContactLetterForm from "./components/contactForm";
import NewsLetterFunction from "./components/newsLetterForm";

const cardData = [
    {
        icon: <BsTelephone />,
        title: "Phone",
        text: "074 07245685"
    },
    {
        icon: <SlLocationPin />,
        title: "Address",
        text: "17 Barmouth Road marine parada LL42 1NA"
    },
    {
        icon: <AiOutlineMail />,
        title: "Email",
        text: "support@sirz.co.uk"
    },
    {
        icon: <TbClockHour5 />,
        title: "Hours",
        text: ". Mon-Fri 9:00AM - 5:00AM | Sat-Sun 10:00AM-6:00AM"
    },
]

export default function Contact() {
    const { isDarkMode } = useAppSelector(allReduxSliceInfo);

    return (
        <div>
            <section className="bg-colorLight dark:bg-colorDefaultDark py-16">
                <div className=" relative text-center sm:w-[70%] w-[90%] m-auto pt-10">
                    <header className="sm:text-[50px] text-[30px] relative z-10 leading-tight font-bold">Have <i className=" text-colorBlueDeep">Questions</i> or ready to take your business to the next level? Reach out to us!</header>
                    <img src={starFullImg} alt="" className='absolute top-0' />
                </div>
            </section>
            <section className="grid sm:grid-cols-2 sm:w-[85%] gap-10 w-[90%] py-10 m-auto">
                <div className=''>
                    <HeaderFormat title="Get in touch with us!" classNames="text-black" />
                    <h4 className="  max-sm:text-justify pt-5 sm:text-[17px] sm:ms-10 text-[17px]">
                        Got questions or need expert support? We're here to help! Reach out and let's make your business thrive
                    </h4>
                    <section className="sm:ms-10 pt-5">
                        {
                            cardData.map((item, index) => (
                                <div key={index} className="bg-colorBlueDeep text-colorDefaultLight rounded-xl mb-4 py-5 px-5 flex items-center gap-4">
                                    <div className=" h-12 w-12 bg-colorDefaultLight text-colorDefaultDark flex items-center justify-center rounded-full text-[20px] font-semibold">
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
                <div>
                    <img src={ContactBg} alt="" />
                </div>
            </section>

            < section
                style={{
                    backgroundImage: `url(${rectangleDarkBlue})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className=" max-sm:pb-8 relative sm:h-[570px]" >
                <div className="sm:pt-48 pt-36 text-white">
                    <div className=" bg-white absolute top-5 z-10 h-20 w-20 m-auto right-0 left-0 flex justify-center rounded-full">
                        <img src={sirzLogo} alt="" className="w-[60px]" />
                    </div>

                    <div className="sm:w-[75%] w-[90%] m-auto">
                        <div className="flex items-center justify-center flex-col text-center m-auto">
                            <header className='sm:text-[45px] text-[30px] italic font-bold'>Give Us a Chance to Support You and Your Online Business</header>
                            <div className='text-[20px] sm:w-[50%] w-[90%] m-auto sm:pt-4 pt-10'>What happens next?</div>
                        </div>
                        <div className=' grid sm:grid-cols-3 gap-4 sm:pt-14 pt-4'>
                            <div className="flex items-center gap-3">
                                <h1 className=" font-bold text-colorGreen text-[30px]">01</h1>
                                <div>We Schedule a call at your convenience</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <h1 className=" font-bold text-colorGreen text-[30px]">02</h1>
                                <div>We do a discovery and consulting meeting</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <h1 className=" font-bold text-colorGreen text-[30px]">03</h1>
                                <div>We prepare a proposal tailored to your business</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section className=" bg-colorLight dark:bg-colorDark py-10">
                <header className="sm:w-[45%] sm:ps-16 w-[90%] max-sm:m-auto">
                    <HeaderFormat title="Schedule a free consultation" />
                    <h4 className=" sm:font-extrabold font-bold  max-sm:text-center pt-5 sm:text-[17px] text-[17px]">
                        Let’s Talk! Book a free consultation and discover how we can elevate your business
                    </h4>
                </header>
                <div className="bg-white dark:bg-colorDefaultDark sm:w-[60%] w-[90%] m-auto p-6 sm:mt-16 mt-10 border-b-[7px] border-s-[5px] border-colorGreen rounded-xl">
                    <header className="relative">
                        <div className=" sm:w-[70%]">
                            <h4 className=" font-bold">Let's get started</h4>
                            <p className="  max-sm:text-justify pt-1 sm:text-[13px] text-[13px]">
                                Please fill in the details correctly and let us know about the services you are interested in
                            </p>
                        </div>
                        <div className="absolute top-3 right-0"><img src={isDarkMode ? sirzLogoWhite : sirzLogo} alt="" className=" h-3" /></div>
                    </header>
                    <div>
                        <ContactLetterForm />
                    </div>
                </div>
            </section>

            <section className=" bg-colorGreenDeeper py-10">
                {/* <div className="sm:w-[50%] w-[90%] m-auto text-white">
                    <div className="flex items-center justify-center flex-col text-center m-auto">
                        <header className='sm:text-[45px] text-[30px] italic font-bold'>Join Our Newsletter</header>
                        <div className='text-[20px] m-auto pt-4'>Subscribe to receive our latest updates in your inbox!</div>
                    </div>
                    <div className=' sm:grid sm:grid-cols-5 gap-4 pt-14'>
                        <input type="text" className=" bg-transparent border border-white rounded-full w-full col-span-3 py-4 px-4 placeholder:text-white text-sm" placeholder="Input your email" />
                        <button className={` tracking-widest sm:col-span-2 bg-white text-black rounded-full sm:w-full w-[100%] max-sm:mt-5
                            'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                            `}
                            onClick={() => { }}>
                            Sign up
                        </button>
                    </div>
                </div> */}
                <NewsLetterFunction />
            </section>
        </div>
    )
}