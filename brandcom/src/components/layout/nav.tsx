import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { allReduxSliceInfo, setIsOpen, setShowServices } from "../../features/reduxSlice";
import { ROUTES } from "../../constants/routes/desc";
import Button from "../common/button";

// Hamburger icon component
const MenuIcon = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
  <button
    onClick={toggle}
    className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <span className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
    <span className={`block w-6 h-0.5 bg-black dark:bg-white my-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
    <span className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
  </button>
);

export default function NavBar() {
    // const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { isOpen } = useAppSelector(allReduxSliceInfo)
    const navigate = useNavigate();

    const menuItem = [
        {
            title: 'Branding',
            action: ROUTES.BRANDING.PATH,
        },
        {
            title: 'E-commerce',
            action: ROUTES.ECOMMERCE.PATH,
        },
        {
            title: 'Digital Marketing',
            action: ROUTES.DIGITAL_MARKETING.PATH,
        },
    ];

    const toggleMenu = () => {
        dispatch(setIsOpen(!isOpen));
        dispatch(setShowServices(false));
    };

    return (
        <div className="fixed bg-white w-full z-40 bg-colorDefaultLight dark:bg-colorDark shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <div
                            onClick={() => navigate(ROUTES.HOME.PATH)}
                            className="cursor-pointer"
                        >
                            <b className="font-extrabold text-2xl dark:text-white">Brandcome.ai</b>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        <ul className="flex space-x-8">
                            {menuItem.map((item, index) => (
                                <li key={index}>
                                    <div
                                        className={`whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                                            location.pathname.startsWith(item.action) && item.action !== ""
                                                ? "text-colorBlueDeep"
                                                : "text-gray-700 dark:text-gray-200 hover:text-colorBlueDeep"
                                        } cursor-pointer`}
                                        onClick={() => {
                                            if (item.action === 'services') {
                                                // toggleShowServices()
                                            } else {
                                                navigate(item.action);
                                                dispatch(setShowServices(false));
                                            }
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
                        <Button color text="Log in" className="px-4 py-2 text-sm" />
                        <Button text="Get Demo" className="px-6 py-2 text-sm" />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <MenuIcon isOpen={isOpen} toggle={toggleMenu} />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-white dark:bg-colorDark shadow-lg overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {menuItem.map((item, index) => (
                                <div
                                    key={index}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        location.pathname.startsWith(item.action)
                                            ? 'bg-gray-100 dark:bg-gray-800 text-colorBlueDeep'
                                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                    onClick={() => {
                                        navigate(item.action);
                                        dispatch(setIsOpen(false));
                                        dispatch(setShowServices(false));
                                    }}
                                >
                                    {item.title}
                                </div>
                            ))}
                            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="mt-3 space-y-1">
                                    <Button color text="Log in" className="w-full justify-center px-4 py-2 text-base font-medium" />
                                    <Button text="Get Demo" className="w-full justify-center px-4 py-2 text-base font-medium mt-2" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
