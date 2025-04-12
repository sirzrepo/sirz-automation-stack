import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../features/loader';
import Button from '../../components/common/button';
import { SirzLogo } from '../../assets';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  console.log(error)

  return (
    <section className="bg-colorLight dark:bg-colorDark py-10 bg-dashboard-form-gradient min-h-screen">
      <div className="sm:w-[60%] md:w-[50%] lg:w-[30%] w-[90%] m-auto flex items-center justify-center  mt-10">
        <form onSubmit={handleSubmit} className="py-12 px-12 mt-10 border-b-[6px] border-e-[7px] border-colorGreen rounded-xl bg-white dark:bg-colorDefaultDark">
          <section className="">
            <div className="flex justify-center items-center mb-10">
              <img src={SirzLogo} alt="Logo" />
            </div>

            <div className="text-center mb-7">
              <h1 className="text-[25px] font-bold font-Helvetica mb-6">Welcome to your SIRz Portal</h1>
              <p>Please enter your credentials</p>
            </div>

            {message && (
              <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
                {message}
              </div>
            )}

            <div className="relative pt-2 mb-8">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary"
                placeholder="Enter your email"
                required
              />
              <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">
                Email address
              </div>
            </div>

            <div className="relative pt-2 mb-8">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary"
                placeholder="Enter your password"
                required
              />
              <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">
                Password
              </div>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle the password visibility
                className="absolute cursor-pointer right-3 top-0 bottom-0 text-2xl text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/Hide Icon */}
              </button>
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="max-sm:m-auto flex justify-center">
                <Button
                  type="submit"
                  onClick={() => {}}
                  text="Sign In"
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                />
                  {/* Sign In
                </Button> */}
              </div>
            )}

            <div className="text-center mt-4">
              <a href="/register" className="text-primary-600 hover:text-primary-700">
                Don't have an account? Sign up
              </a>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
};

export default Login;

