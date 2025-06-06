import { ArrowRight } from "lucide-react"
import Button from "../../../components/common/ui/Button"

export default function LeadScoringHero() {
  return (
    <div className="flex flex-col items-center justify-center  px-4 mt-20">
      <div className="flex space-x-2 mb-16">
        <div className="text-[#737373] text-xl">SIRz AI Content Generator</div>
      </div>

      <h1
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#001F3E] via-[#203DA3] to-[#3752E9]">
        Turn One Idea Into 10+ Social Media Assets in Seconds
      </h1>

      <p className="text-gray-500 text-center max-w-3xl mb-12 text-lg">
      Instantly generate scroll-stopping carousels, reels scripts, infographics & more from a single content idea — powered by AI trained for growth.
      </p>

      <div className="">
        <Button className="bg-gradient-to-r from-[#45C4F9] via-[#7D0977] to-[#FF0BE3] hover:bg-blue-700 text-white sm:px-8 px-2 sm:py-4 py-2 sm:text-lg text-sm rounded-lg">
          Generate My First Content
          <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
      </div>
      {/* <img src={HeroImg} alt="" /> */}
    </div>
  )
}
