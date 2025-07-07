import { FaBars } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";

import DarkModeToggle from "../../features/darkMode";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { allReduxSliceInfo, setIsOpen, setShowServices } from "../../features/reduxSlice";
import { ROUTES } from "../../constants/routes/desc";
import NavbarDropdown from "../../constants/navbardropdown";
import { IoMdClose } from "react-icons/io";
import { sirzLogo, sirzLogoWhite } from "../../assets";
import Button from "../common/button";
import { calendyLink } from "../../utils";

export default function NavBar() {
    // const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { isDarkMode, isOpen } = useAppSelector(allReduxSliceInfo)
    const navigate = useNavigate();

    const menuItem = [
        {
            title: 'Home',
            action: ROUTES.HOME.PATH,
        },
        {
            title: "About us",
            action: ROUTES.ABOUT.PATH,
        },
        // {
        //     title: "Contact",
        //     action: ROUTES.CONTACT.PATH,
        // },
        // {
        //     title: "Market place",
        //     action: ROUTES.CONTACT.PATH,
        // },
        {
            title: <NavbarDropdown />,
            icon: "",
            action: 'services'
        },
        {
            title: "Our projects",
            action: ROUTES.PROJECTS.PATH,
        },
        {
            title: "Our blog",
            action: ROUTES.BLOG.PATH,
        },
        {
            title: "Case Studies",
            action: ROUTES.CASE_STUDY.PATH,
        },
        {
            title: "Contact us",
            action: ROUTES.CONTACT.PATH,
        },
    ];

    const toggleMenu = () => {
        dispatch(setIsOpen(!isOpen));
        dispatch(setShowServices(false));
    };

    return (
        <div className={`fixed w-full z-40 bg-colorDefaultLight dark:bg-colorDark shadow-md`}>
            <div
                className={` text-white sm:w-[95%] w-[90%] m-auto flex justify-between transition-all duration-300 h-[70px] items-center `}
            >
                <div
                    onClick={() => navigate(ROUTES.HOME.PATH)}
                    className={`cursor-pointer sm:w-20 w-12  transition-all duration-300 `}
                >
                    <img
                        src={isDarkMode ? sirzLogoWhite : sirzLogo}
                        alt=""
                        className={` w-full rounded-full`}
                    />
                </div>
                <ul
                    className={`flex max-md:hidden items-center dark:text-white text-black lg:w-[55%] w-[50%] text-background_dark font-normal text-[15px] gap-5 justify-between transition-all`}
                >
                    {menuItem.map((item, index) => (
                        <>
                        <li
                            className={`whitespace-nowrap flex items-center gap-2 lg:text-sm text-[12px] hover:text-colorBlueDeep 
                                ${location.pathname.startsWith(item.action) && item.action !== ""
                                    ? "text-colorBlueDeep"
                                    : ""
                                } cursor-pointer`}
                            onClick={() => {
                                if (item.action === 'services') {
                                    // toggleShowServices() 
                                } else {
                                    { navigate(item?.action); dispatch(setShowServices(false)) }; // Navigate to route
                                }
                            }}
                            key={index}
                        >
                            {item?.title}
                            {item.icon}
                        </li>
                        </>
                    ))}
                    <Link to="https://ai-agents.sirz.co.uk/" className="whitespace-nowrap flex items-center gap-2 lg:text-sm text-[12px] hover:text-colorBlueDeep cursor-pointer"> Sirz Ai agents</Link>

                </ul>

                <div className="flex items-center max-md:hidden ">
                    <DarkModeToggle />
                    {/* <Button text='Schedule a demo' className="" onClick={() => { }} /> */}
                    <a href={calendyLink} target="_blank" rel="noopener noreferrer">
                        <Button text='Schedule a demo' className="" onClick={() => { }} />
                    </a>
                </div>

                {/* display on smaller screen sizes */}
                <div className="md:hidden flex items-center text-black dark:text-white">
                    {
                        !isOpen && <FaBars
                            className="text-[30px] cursor-pointer"
                            onClick={toggleMenu}
                        />
                    }
                    {
                        isOpen && <IoMdClose
                            className="text-[30px] cursor-pointer"
                            onClick={toggleMenu}
                        />
                    }

                </div>
                <div
                    className={`flex absolute bg-colorLight text-black dark:bg-colorDark dark:text-white transform ${isOpen ? 'translate-y-00' : '-translate-y-[800px]'
                        } transition-transform duration-1000 ease-out w-full left-0 right-0 -z-30 top-0 pb-16 pt-20 shadow-lg lg:hidden flex-col items-left lg:text-[18px] justify-between font-comfortaa`}
                >
                    <ul className=" w-[80%] relative m-auto">
                        {menuItem.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer flex items-center gap-2 whitespace-nowrap my-6"
                                onClick={() => {
                                    if (item.action === 'services') {
                                        // toggleShowServices() 
                                    } else {
                                        dispatch(setIsOpen(false)); navigate(item.action)
                                    }
                                }}
                            >
                                {item?.title}
                                {item.icon}
                            </li>
                        ))}
                        <Link to="https://ai-agents.sirz.co.uk/" className="whitespace-nowrap flex items-center gap-2 my-6 hover:text-colorBlueDeep cursor-pointer"> Sirz Ai agents</Link>
                        <li className="flex items-center gap-4">
                            toggle mode
                            <DarkModeToggle />
                        </li>
                    </ul>
                    <div className="flex items-center lg:hidden w-[90%] m-auto pt-8 ">
                        {/* <DarkModeToggle /> */}
                        <a href={calendyLink} target="_blank" rel="noopener noreferrer">
                            <Button text='Schedule a demo' className="" onClick={() => { }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

