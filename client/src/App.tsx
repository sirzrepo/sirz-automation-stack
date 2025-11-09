import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import { FiHome, FiFolder, FiFileText, FiSettings } from 'react-icons/fi'
// import { HiLightBulb } from 'react-icons/hi'
import './App.css'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
// import OTPverification from './pages/auth/OTPverification'
import NavBar from './layout/nav'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Profile from './pages/profile/Profile'
import Courses from './pages/courses'
import Home from './pages/home'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import EmailVerification from './pages/auth/emailVerification'
import { useState, useEffect } from 'react'
import Sidebar from './layout/Sidebar'
import { ToastContainer } from 'react-toastify'
import LeadClassifier from './pages/agents/leadClassifier'
import ContentCreation from './pages/agents/contentCreation'
import LogoCreator from './pages/agents/logoCreator'
import DataAnalyst from './pages/agents/dataAnalyst'
import Chat from './pages/agents/chat'

function App() {
  // Helper component to conditionally render Navbar and Footer
  function Layout() {
    const location = useLocation();
    const hideNavbar = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'].includes(location.pathname);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 768);

    // Handle sidebar collapse state changes
    const handleSidebarStateChange = (collapsed: boolean) => {
      setIsSidebarCollapsed(collapsed);
    };
    
    // Track window resize
    useEffect(() => {
      const handleResize = () => {
        setIsSidebarCollapsed(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <>
        {!hideNavbar && <NavBar />}
        {!hideNavbar && <Sidebar onStateChange={handleSidebarStateChange} />}
        <div 
          className={
            `bg-[#FAFAFA] 
            ${!hideNavbar ? 'pt-[40px]' : ''} 
            ${!hideNavbar ? (isSidebarCollapsed ? 'md:ml-[80px] ml-[80px]' : 'md:ml-[280px] ml-[80px]') : ''}
            min-h-screen 
            transition-all 
            duration-300
          `}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            {/* <Route path="/otp-verification" element={<OTPverification />} /> */}

            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <div className="text-2xl">Settings</div>
              </ProtectedRoute>
            } />

            {/* Agent routes */}
            <Route path="/agent/leadClassifier" element={
                <ProtectedRoute>
                  <LeadClassifier />
                </ProtectedRoute>
              } />
              <Route path="/agent/contentCreation" element={
                <ProtectedRoute>
                  <ContentCreation />
                </ProtectedRoute>
              } />
              <Route path="/agent/logoCreator" element={
                <ProtectedRoute>
                  <LogoCreator />
                </ProtectedRoute>
              } />
              <Route path="/agent/dataAnalyst" element={
                <ProtectedRoute>
                  <DataAnalyst />
                </ProtectedRoute>
              } />
              <Route path="/agent/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
          </Routes>
        </div>
      </>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
