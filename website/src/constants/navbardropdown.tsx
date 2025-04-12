import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { AboutStoryBg } from "../assets";
import { allReduxSliceInfo, setIsOpen, setShowServices } from "../features/reduxSlice";
import { useNavigate } from "react-router-dom";
import { socialLinks } from "../utils";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { ROUTES } from "./routes/desc";
import { TbChecks } from "react-icons/tb";

export default function NavbarDropdown() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { showServices } = useAppSelector(allReduxSliceInfo);

    const toggleShowServices = () => {
        dispatch(setShowServices(!showServices));
    };

    const servicePages = [
        {
            title: "branding",
            url: ROUTES.SERVICE_BRANDING.PATH
        },
        {
            title: "digital marketing",
            url: ROUTES.SERVICE_DIGITALMARKETING.PATH
        },
        {
            title: "e-commerce",
            url: ROUTES.SERVICE_ECOMMERCE.PATH
        }
    ];

    return (
        <div>
            <header onClick={toggleShowServices} className="flex items-center gap-2">
                <div>Services</div>
                <div>
                    {
                        !showServices ? <IoIosArrowDown /> : <IoIosArrowUp />
                    }
                </div>
            </header>


            {/* service menu */}
            <section
                className={`flex absolute bg-[#f6f5f2] text-black dark:text-white dark:bg-[#1b1f23] transform ${showServices ? 'translate-y-00' : '-translate-y-[800px]'
                    } transition-transform duration-1000 ease-out w-full left-0 right-0 -z-30 top-0 pb-10 pt-24 shadow-lg flex-col items-center lg:text-[18px] max-md:hidden justify-between font-comfortaa`}
            >
                <div className=" grid grid-cols-2 border-t dark:border-zinc-600 border-zinc-300 pt-8 w-[90%]">
                    <div className=" border-r dark:border-zinc-600 border-zinc-300 relative mr-10 pr-10">
                        <div className="w-full relative ">
                            <img src={AboutStoryBg} alt="" className="w-full rounded-md object-cover max-h-[400px]" />
                        </div>
                        <div className=" absolute bottom-0 bg-[#3752e9d6] rounded-tr-md py-3 px-8">
                            <div className="text-xs font-nexa-light flex flex-col items-start md:items-end">
                                {/* <p className="text-[#fff] text-start md:text-end mb-3">Social Media</p> */}
                                <div className="flex flex-row text-white items-center justify-center gap-x-10">
                                <a href={socialLinks.Linkedin} target="_blank" rel="noopener noreferrer">
                                        {/* <img src={ICONS.FACEBOOK_ICON} alt="Facebook" /> */}
                                        <BsLinkedin className='text-xl' />
                                    </a>
                                    <a href={socialLinks.Facebook} target="_blank" rel="noopener noreferrer">
                                        {/* <img src={ICONS.FACEBOOK_ICON} alt="Facebook" /> */}
                                        <BsFacebook className='text-xl' />
                                    </a>
                                    <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer">
                                        {/* <img src={ICONS.INSTAGRAM_ICON} alt="Instagram" /> */}
                                        <BsInstagram className='text-xl' />
                                    </a>
                                    {/* <a href={socialLinks.Whatsapp} target="_blank" rel="noopener noreferrer">
                                        <BsWhatsapp className='text-xl' />
                                    </a>
                                    <a href={socialLinks.TikTok} target="_blank" rel="noopener noreferrer">
                                        <BsTiktok className='text-xl' />
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <header className=" font-bold font-exo text-[25px]">Our Services</header>
                        <ul className=" text-sm gap-3">
                            {servicePages.map((item, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer whitespace-nowrap capitalize my-2"
                                    onClick={() => { dispatch(setShowServices(false)); navigate(`${item.url}`) }}
                                >
                                    <div className=" text-2xl text-white gap-6 px-8 mt-6 rounded-full w-[40%] bg-colorBlueDeep hover:w-[45%] duration-700 py-3 flex items-center">
                                        <TbChecks className="text-[40px]" />
                                        {item?.title}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>


            <section className={`${showServices ? 'translate-y-00' : '-translate-y-[800px] hidden'} md:hidden pt-6 border-b border-primary pb-6 mb-4`}>
                <ul className=" grid-cols-2 text-sm gap-3 ps-6">
                    {servicePages.map((item, index) => (
                        <li
                            key={index}
                            className="cursor-pointer whitespace-nowrap mt-4 capitalize tracking-wider hover:text-colorBlueDeep"
                            onClick={() => { dispatch(setShowServices(false)); navigate(`${item.url}`); dispatch(setIsOpen(false)) }}
                        >
                            <div className="  flex items-center gap-2 pb-6">
                                <TbChecks className="text-lg" />
                                {item?.title}
                            </div>
                        </li>
                    ))}

                </ul>
            </section>
        </div>
    )
} 