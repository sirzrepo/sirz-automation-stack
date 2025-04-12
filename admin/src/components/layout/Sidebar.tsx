import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SirzLogo, DefaultProfileImg } from '../../assets';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IoHomeOutline, IoSettingsOutline, IoChevronForward, IoChevronBack, IoAnalyticsOutline, IoNewspaperOutline, IoHelpCircleOutline } from 'react-icons/io5';
import { FaBookOpen, FaSignOutAlt, FaUsers, FaUserTie, FaBlog } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  onStateChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onStateChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { userData } = useSelector((state: RootState) => state.user);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Check if the viewport is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on first render
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Notify parent component of state changes
  useEffect(() => {
    onStateChange?.(isCollapsed);
  }, [isCollapsed, onStateChange]);
  
  // Navigation items with icons, labels, and paths
  const navItems = [
    { 
      icon: <IoHomeOutline className="text-xl" />, 
      label: 'Home', 
      path: '/' 
    },
    { 
        icon: <FaUsers className="text-xl" />, 
        label: 'clients', 
        path: '/clients' 
    },
    { 
        icon: <FaUserTie className="text-xl" />, 
        label: 'employees', 
        path: '/employees' 
    },
    { 
        icon: <FaBlog className="text-xl" />, 
        label: 'Blog', 
        path: '/blog' 
    },
    { 
        icon: <IoNewspaperOutline className="text-xl" />, 
        label: 'newsletters', 
        path: '/newsletters' 
    },
    { 
      icon: <IoAnalyticsOutline className="text-xl" />, 
      label: 'Analytics', 
      path: '/analytics' 
    },
    { 
      icon: <FaBookOpen className="text-xl" />, 
      label: 'Courses', 
      path: '/courses' 
    },
    { 
      icon: <IoSettingsOutline className="text-xl" />, 
      label: 'Settings', 
      path: '/settings' 
    },
    { 
        icon: <IoHelpCircleOutline className="text-xl" />, 
        label: 'FAQ', 
        path: '/faq' 
      },
  ];
  
  // Animation variants
  const sidebarVariants = {
    expanded: { width: isMobile ? '70%' : '280px' },
    collapsed: { width: '80px' }
  };
  
  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsCollapsed(true);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Handle toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <motion.div 
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-white to-gray-50 shadow-xl z-50 flex flex-col"
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
      initial={isCollapsed ? 'collapsed' : 'expanded'}
    >
      {/* Toggle button */}
      <motion.button 
        className="absolute top-4 -right-4 z-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-1.5 shadow-lg z-10"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isCollapsed ? <IoChevronForward size={16} /> : <IoChevronBack size={16} />}
      </motion.button>
      
      {/* Logo and branding */}
      <div className="px-5 py-6">
        <div className="flex items-center">
          <div className="relative w-14  flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 rounded-lg"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <img src={SirzLogo} alt="SIRz Logo" className="w-14 relative z-10" />
          </div>
          {/* <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SIRz Admin
                </h1>
              </motion.div>
            )}
          </AnimatePresence> */}
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
      
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={index}>
                <motion.div
                  className={`relative flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-md"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className={`${
                    isActive 
                      ? 'text-blue-600' 
                      : 'text-gray-500'
                    } min-w-[40px] flex justify-center items-center`}
                  >
                    {item.icon}
                  </div>
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className={`font-normal ml-3 ${
                          isActive 
                            ? 'text-blue-700' 
                            : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User profile section at bottom */}
      <div className="mt-auto border-t border-gray-200">
        <div className={`p-4 ${!isCollapsed ? 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mx-3 my-3' : 'py-4'}`}>
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-blue-300 overflow-hidden flex-shrink-0">
                <img 
                  src={userData?.image ? userData.image : DefaultProfileImg}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {userData?.firstName && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 overflow-hidden"
                >
                  <p className="font-semibold text-sm text-gray-800 truncate">
                    {userData?.firstName ? `${userData.firstName} ${userData.lastName || ''}` : 'Guest User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email || 'Not signed in'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Logout button */}
          {!isCollapsed && (
            <motion.button
              className="mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-red-50 to-red-100 text-red-500 hover:from-red-100 hover:to-red-200 w-full border border-red-200"
              onClick={handleLogout}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt />
              <span className="font-medium text-sm">Logout</span>
            </motion.button>
          )}
          
          {isCollapsed && (
            <motion.button
              className="mt-3 flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-red-50 text-red-500 hover:bg-red-100"
              onClick={handleLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSignOutAlt />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 