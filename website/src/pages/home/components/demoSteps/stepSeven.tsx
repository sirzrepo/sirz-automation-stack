import { useState } from "react";
import Button from "../../../../components/common/button";
import { sirzLogo, sirzLogoWhite } from "../../../../assets";
import { useAppSelector } from "../../../../app/hook";
import { allReduxSliceInfo } from "../../../../features/reduxSlice";

const goalsMarkets = [
    "Driving traffic to my store",
    "Improving conversion rates",
    "Scaling ads profitably",
    "Building repeat customers",
    "Expanding into new marketplaces",
    "Managing operations & fulfillment",
];

export default function StepSeven({ handleSubmit, setValue, value }: { formData: { 
    businessType: string; 
    currentPlatform: string; 
    challenge: string; 
    marketTarget: string; 
    isPaidAds: string; 
    isAgency: string; 
    futureGoal: string;
}; handleSubmit: () => void; setValue: (value: string) => void; value: string }) {
  const [futureGoal, setFutureGoal] = useState<string | null>(value);
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
          What's your main goal in the next 3 months?
        </h1>

        {/* Business type selection grid */}
        <div className="mb-8 grid sm:grid-cols-3 grid-cols-2 gap-6">
          {goalsMarkets.map((goalMarket) => {
            const isSelected = futureGoal === goalMarket;
            return (
              <button
                key={goalMarket}
                className={`h-auto py-3 px-3 text-lg font-bold border rounded-lg text-gray-900 dark:text-white transition-colors text-center
                  ${isSelected ?
                    "border-blue-700 bg-blue-300 dark:bg-blue-800 shadow-md" :
                    "border-blue-600 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800"}
                `}
                onClick={() => setFutureGoal(goalMarket)}
                type="button"
                aria-pressed={isSelected}
              >
                {goalMarket}
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="max-w-[20em] mx-auto">
          <Button
            type="inverted"
            text="Complete & Submit"
            onClick={() => {handleSubmit(); setValue(futureGoal || "")}}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
            disabled={!futureGoal}
          />
        </div>
    </div>
  );
}
