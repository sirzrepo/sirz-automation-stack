import Button from "../../../../components/common/button";
import { sirzLogo, sirzLogoWhite } from "../../../../assets";
import initiateIcon from "../../../../assets/imgs/initiateIcon.svg";
import { useAppSelector } from "../../../../app/hook";
import { allReduxSliceInfo } from "../../../../features/reduxSlice";

export default function InitiateLevels({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  const { isDarkMode } = useAppSelector(allReduxSliceInfo)
  return (
    <div className="w-full max-w-4xl sm:p-16 max-sm:py-16 max-sm:px-6 text-center bg-white dark:bg-zinc-900 border-r-[0.6em] border-l-[0.6em] border-b-[0.2em] border-teal-400  shadow-2xl border-0 relative rounded-3xl">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-lg blur-xl -z-10" />

        {/* Logo */}
        <div className="mb-8 mx-auto w-24">
          <img 
          src={isDarkMode ? sirzLogoWhite : sirzLogo}
          alt="" />
        </div>

        {/* Welcome message */}
        <h1 className="sm:text-4xl text-2xl font-semibold text-gray-800 mb-8 text-balance dark:text-white">
          We are glad to have you here!
        </h1>

        {/* Business type selection grid */}
        <div className="mb-8 mx-auto w-[20em]">
          <img src={initiateIcon} alt="" />
          <p className="text-gray-800 text-xl font-medium mb-8 mt-4 text-balance dark:text-white">
          Lets tailor your experience
          </p>
        </div>

        {/* CTA Button */}
        <div className="max-w-[20em] mx-auto">
          <Button
            type="inverted"
            text="Let’s get started"
            onClick={() => {setStep(step + 1)}}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
          />
        </div>
    </div>
  );
}
