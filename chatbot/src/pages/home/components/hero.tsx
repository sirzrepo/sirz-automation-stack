import Button from "../../../components/common/ui/Button"
import { LogoTitle } from "../../../assets"

export default function LeadScoringHero() {
  return (
    <div className="flex flex-col md:w-[80%] w-[95%] mx-auto items-center justify-center relative px-4 mt-20">
      <div className="flex space-x-2 mb-16">
          <img src={LogoTitle} alt="" />
      </div>

      <h1
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#F2F2F2] to-[#F7F7F7]">
        Elevate Your Brand with AI-Powered Conversations
      </h1>

      <p className="text-gray-200 text-center max-w-3xl mb-12 text-lg">
      Engage, convert, and retain customers effortlessly with our intelligent chatbot designed for digital marketers and e-commerce brands.      </p>

      <div className="">
        <Button className="bg-gradient-to-r from-[#C9A6FF] via-[#FF8689] to-[#FF8689] hover:bg-blue-700 text-white sm:px-8 px-2 sm:py-4 py-2 sm:text-lg text-sm rounded-full">
          Book a Demo
          {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
          </Button>
      </div>
    </div>
  )
}
