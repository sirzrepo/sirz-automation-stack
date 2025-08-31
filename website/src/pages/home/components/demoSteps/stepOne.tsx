import { useState } from "react";
import Button from "../../../../components/common/button";
import { sirzLogo } from "../../../../assets";

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

export default function StepOne({ step, setStep, value, setValue }: { step: number; setStep: (step: number) => void; value: string; setValue: (value: string) => void }) {
  const [selectedType, setSelectedType] = useState<string>(value);
  return (
    <div className="w-full max-w-4xl sm:p-16 max-sm:py-16 max-sm:px-6 text-center max-sm:max-h-[85vh] overflow-y-auto bg-white border-r-[0.6em] border-l-[0.6em] border-b-[0.2em] border-teal-400  shadow-2xl border-0 relative rounded-3xl">
    {/* Subtle glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-lg blur-xl -z-10" />

    {/* Logo */}
    <div className="mb-8 mx-auto w-24">
        <img src={sirzLogo} alt="" />
    </div>

    {/* Welcome message */}
    <h1 className="sm:text-4xl text-2xl font-semibold text-gray-800 mb-8 text-balance">
        What type of e-commerce business do you run?
    </h1>

    {/* Business type selection grid */}
    <div className="mb-8 grid sm:grid-cols-3 grid-cols-2 gap-6">
        {businessTypes.map((businessType) => {
        const isSelected = selectedType === businessType;
        return (
            <button
            key={businessType}
            className={`h-auto py-4 px-3 text-lg font-bold border rounded-lg text-gray-900 transition-colors text-center bg-transparent
                ${isSelected ?
                "border-blue-700 bg-blue-300 shadow-md" :
                "border-blue-600 hover:border-blue-500 hover:bg-blue-100"}
            `}
            onClick={() => setSelectedType(businessType)}
            type="button"
            aria-pressed={isSelected}
            >
            {businessType}
            </button>
        );
        })}
    </div>

    {/* CTA Button */}
    <div className="max-w-[20em] mx-auto">
        <Button
        type="inverted"
        text="Next"
        onClick={() => {setStep(step + 1); setValue(selectedType || "")}}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
        disabled={!selectedType}
        />
    </div>
    </div>
  );
}
