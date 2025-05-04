import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import { FiHome, FiFolder, FiFileText, FiSettings } from 'react-icons/fi'
// import { HiLightBulb } from 'react-icons/hi'
import 'react-quill/dist/quill.snow.css';
import './App.css'
import { useState, useEffect } from 'react'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
// import OTPverification from './pages/auth/OTPverification'
import NavBar from './components/layout/nav'
import Sidebar from './components/layout/Sidebar'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/profile/Profile'
import Home from './pages/home'
import { ProtectedRoute } from './features/ProtectedRoute'
import Clients from './pages/client'
import ClientProfile from './pages/clientProfile'
import Blogs from './pages/blog'
import BlogDetail from './pages/blog/BlogDetail'
import AI_Inquiries from './pages/ai_inquiries';

function App() {
  // Helper component to conditionally render Navbar and Footer
  function Layout() {
    const location = useLocation();
    const hideNavbar = ['/login', '/register'].includes(location.pathname);
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
          className={`
            bg-[#FAFAFA] 
            ${!hideNavbar ? 'pt-[70px]' : ''} 
            ${!hideNavbar ? (isSidebarCollapsed ? 'md:ml-[80px] ml-[80px]' : 'md:ml-[280px] ml-[80px]') : ''}
            min-h-screen 
            transition-all 
            duration-300
          `}
        >
          <div className="px-6">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              {/* <Route path="/otp-verification" element={<OTPverification />} /> */}

              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/clients" element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              } />
              {/* AI_Inquiries */}
              <Route path="/client-profile" element={
                <ProtectedRoute>
                  <ClientProfile />
                </ProtectedRoute>
              } />

              <Route path="/ai-inquiries" element={
                <ProtectedRoute>
                  <AI_Inquiries />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Blog routes */}
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Blogs />
                </ProtectedRoute>
              } />
              <Route path="/blog/:slug" element={
                <ProtectedRoute>
                  <BlogDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
                    <p className="text-gray-600">Configure your application settings here.</p>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
