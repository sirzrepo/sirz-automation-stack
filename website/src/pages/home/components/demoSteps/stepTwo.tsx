import { useState } from "react";
import Button from "../../../../components/common/button";
import { sirzLogo, sirzLogoWhite } from "../../../../assets";
import { useAppSelector } from "../../../../app/hook";
import { allReduxSliceInfo } from "../../../../features/reduxSlice";

const currentPlatforms = [
    "Shopify",
    "WooCommerce",
    "Magento",
    "Amazon",
    "Etsy",
    "Walmart",
    "Other",
];

export default function StepTwo({ step, setStep, value, setValue }: { step: number; setStep: (step: number) => void; value: string; setValue: (value: string) => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(value);
  const {isDarkMode} = useAppSelector(allReduxSliceInfo)
  return (
    <div className="w-full max-w-4xl sm:p-16 max-sm:py-16 max-sm:px-6 dark:bg-zinc-900 text-center max-sm:max-h-[85vh] overflow-y-auto bg-white border-r-[0.6em] border-l-[0.6em] border-b-[0.2em] border-teal-400  shadow-2xl border-0 relative rounded-3xl">
    {/* Subtle glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-lg blur-xl -z-10" />

    {/* Logo */}
    <div className="mb-8 mx-auto w-24">
        <img src={isDarkMode ? sirzLogoWhite : sirzLogo} alt="" />
    </div>

    {/* Welcome message */}
    <h1 className="sm:text-4xl text-2xl font-semibold text-gray-800 mb-8 text-balance dark:text-white">
        Which platforms do you currently sell on?
    </h1>

    {/* Business type selection grid */}
    <div className="mb-8 grid sm:grid-cols-3 grid-cols-2 gap-6">
        {currentPlatforms.map((platform) => {
        const isSelected = selectedPlatform === platform;
        return (
            <button
            key={platform}
            className={`h-auto py-4 px-3 text-lg font-bold border rounded-lg text-gray-900 dark:text-white transition-colors text-center
                ${isSelected ?
                "border-blue-700 bg-blue-300 dark:bg-blue-800 shadow-md" :
                "border-blue-600 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800"}
            `}
            onClick={() => setSelectedPlatform(platform)}
            type="button"
            aria-pressed={isSelected}
            >
            {platform}
            </button>
        );
        })}
    </div>

    {/* CTA Button */}
    <div className="max-w-[20em] mx-auto">
        <Button
        type="inverted"
        text="Next"
        onClick={() => {setStep(step + 1); setValue(selectedPlatform || "")}}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
        disabled={!selectedPlatform}
        />
    </div>
    </div>
  );
}
