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

function App() {
  // Helper component to conditionally render Navbar and Footer
  function Layout() {
    const location = useLocation();
    const hideNavbar = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'].includes(location.pathname);

    return (
      <>
        {!hideNavbar && <NavBar />}
        <div className='bg-[#FAFAFA]'>
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
          </Routes>
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
