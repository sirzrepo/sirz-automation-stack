import { useState } from "react";
import Button from "../../../../components/common/button";
import { sirzLogo, sirzLogoWhite } from "../../../../assets";
import { useAppSelector } from "../../../../app/hook";
import { allReduxSliceInfo } from "../../../../features/reduxSlice";

interface UserDataProps {
  step: number;
  setStep: (step: number) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export default function UserData({ step, setStep, name, setName, email, setEmail }: UserDataProps) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const {isDarkMode} = useAppSelector(allReduxSliceInfo)
  const [touched, setTouched] = useState({
    name: false,
    email: false
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setIsValidEmail(validateEmail(value));
    }
  };

  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email' && email) {
      setIsValidEmail(validateEmail(email));
    }
  };

  const isFormValid = name.trim() !== '' && email.trim() !== '' && isValidEmail;

  return (
    <div className="w-full max-w-4xl sm:p-16 max-sm:py-16 max-sm:px-6 dark:bg-zinc-900 text-center max-sm:max-h-[85vh] overflow-y-auto bg-white border-r-[0.6em] border-l-[0.6em] border-b-[0.2em] border-teal-400 shadow-2xl border-0 relative rounded-3xl">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-lg blur-xl -z-10" />

      {/* Logo */}
      <div className="mb-8 mx-auto w-24">
        <img src={isDarkMode ? sirzLogoWhite : sirzLogo} alt="SIRZ Logo" />
      </div>

      {/* Welcome message */}
      <h1 className="sm:text-4xl text-2xl font-semibold text-gray-800 mb-8 dark:text-white">
        Let's get to know you
      </h1>

      <div className="max-w-[80%] mx-auto space-y-6 text-left">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm dark:text-white font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            className={`w-full px-4 py-3 rounded-lg border ${
              touched.name && !name.trim() ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 dark:text-black focus:border-transparent transition`}
            placeholder="John Doe"
            required
          />
          {touched.name && !name.trim() && (
            <p className="mt-1 text-sm text-red-600">Name is required</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm dark:text-white font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 rounded-lg border ${
              (touched.email && !email.trim()) || (touched.email && !isValidEmail)
                ? 'border-red-500'
                : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 dark:text-black focus:border-transparent transition`}
            placeholder="you@example.com"
            required
          />
          {touched.email && !email.trim() ? (
            <p className="mt-1 text-sm text-red-600">Email is required</p>
          ) : touched.email && !isValidEmail ? (
            <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
          ) : null}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10 max-w-[20em] mx-auto">
        <Button
          type="inverted"
          text="Continue"
          onClick={() => setStep(step + 1)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
}
