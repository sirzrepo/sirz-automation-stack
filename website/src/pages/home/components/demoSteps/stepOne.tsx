import { useState } from "react";
import Button from "../../../../components/common/button";
import { sirzLogo, sirzLogoWhite } from "../../../../assets";
import { useAppSelector } from "../../../../app/hook";
import { allReduxSliceInfo } from "../../../../features/reduxSlice";

const businessTypes = [
    "Physical products",
    "Dropshipping",
    "Print-on-demand",
    "Digital products",
    "Subscription service",
    "Marketplace seller",
    "Wholesale",
    "B2B e-commerce",
    "Other",
];

interface StepOneProps {
  step: number;
  setStep: (step: number) => void;
  value: string;
  setValue: (value: string) => void;
}

export default function StepOne({ step, setStep, value, setValue }: StepOneProps) {
  const [selectedType, setSelectedType] = useState<string>(value);
  const {isDarkMode} = useAppSelector(allReduxSliceInfo)
  const [touched, setTouched] = useState(false);

  const handleContinue = () => {
    setTouched(true);
    if (selectedType) {
      setValue(selectedType);
      setStep(step + 1);
    }
  };

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
        What type of e-commerce business do you run?
      </h1>

      {touched && !selectedType && (
        <p className="text-red-600 mb-4">Please select a business type to continue</p>
      )}

      {/* Business type selection grid */}
      <div className="mb-8 grid sm:grid-cols-3 grid-cols-2 gap-4">
        {businessTypes.map((businessType) => {
          const isSelected = selectedType === businessType;
          return (
            <button
              key={businessType}
              className={`h-auto py-4 px-3 text-lg font-bold border-2 rounded-lg transition-all duration-200 text-center
                ${
                  isSelected
                    ? "border-blue-700 bg-blue-100 dark:bg-blue-800 shadow-md transform scale-[1.02]"
                    : "border-gray-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-800"
                }`}
              onClick={() => setSelectedType(businessType)}
              type="button"
              aria-pressed={isSelected}
            >
              {businessType}
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-md mx-auto space-x-4">
        <Button
          type="inverted"
          text="Continue"
          onClick={handleContinue}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
          disabled={!selectedType}
        />
      </div>
    </div>
  );
}
