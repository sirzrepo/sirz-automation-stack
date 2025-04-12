import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './styles.css'
import { ROUTES } from "../../constants/routes/desc";
import { useAppSelector } from "../../app/hook";
import { allReduxSliceInfo } from "../../features/reduxSlice";
import { sirzLogo, sirzLogoWhite } from "../../assets";

export default function Welcome() {
    const navigate = useNavigate();
    const { isDarkMode } = useAppSelector(allReduxSliceInfo)
    // const [loading, setLoading] = useState<boolean>(false);
    const [redirecting, setRedirecting] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRedirecting(true);
            navigate(ROUTES.HOME.PATH);
        }, 5000);

        // setTimeout(() => {
        //     setLoading(true);
        // }, 500);

        return () => clearTimeout(timer);
    }, [navigate]);

    if (redirecting) return null;

    return (
        <div className="overflow-x-hidden fixed top-0 left-0 right-0 bottom-0 bg-colorLight dark:bg-colorDefaultDark z-50 dark:bg-darkModeDeep dark:text-white flex items-center justify-center h-screen">
            <div className="text-center">
                <div className="xxxm:w-[150px] w-[100px] m-auto mb-5">
                    <img src={isDarkMode ? sirzLogoWhite : sirzLogo} className="w-full flipClass" alt="" />
                </div>
                {/* <h1 className={` ${loading && "tracking-normal font-semibold text-primary "} uppercase welcome-text whitespace-nowrap tracking-[2em] font-comfortaa duration-[4s] xxxm:text-2xl sm:text-lg text-sm`}>
                    Welcome to Haven & Hive Interiors
                </h1> */}
            </div>
        </div>
    );
}
