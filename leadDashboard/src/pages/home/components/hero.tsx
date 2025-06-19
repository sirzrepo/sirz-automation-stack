import { PlayCircle } from "lucide-react"
import Button from "../../../components/common/ui/Button"
import { scrollToElement } from "../../../utils"

export default function LeadScoringHero() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] px-4 my-10">
      <div className="flex space-x-2 mb-16">
        <div className="sm:px-8 px-4 py-1 bg-[#EFF2FF] text-colorBlueDeep rounded-xl">Leads</div>
        <div className="sm:px-8 px-4 py-1 bg-[#EFF2FF] text-colorBlueDeep rounded-xl">AI agent</div>
        <div className="sm:px-8 px-4 py-1 bg-[#EFF2FF] text-colorBlueDeep rounded-xl">Scoring</div>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-6xl mb-6">
        Spot Your Next <span className="text-colorBlueDeep">Customer</span> —
        <br />
        Before They Even Raise a Hand
      </h1>

      <p className="text-gray-500 text-center max-w-3xl mb-12 text-lg">
        Our AI-driven Lead-Scoring Agent sifts through every touchpoint, ranks sales-ready prospects in real time, and
        surfaces the ones most likely to convert—so you close more deals with less guesswork.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => scrollToElement('agent-section')}
          className="bg-colorBlueDeep hover:bg-blue-700 text-white sm:px-8 px-2 sm:py-4 py-2 sm:text-lg text-sm rounded-md transition-colors duration-200"
        >
          Create a demo
        </Button>
        <Button
          onClick={() => scrollToElement('video-section')}
          variant="outline"
          className="border-colorBlueDeep text-colorBlueDeep hover:bg-blue-950/30 sm:px-8 px-4 sm:py-4 py-2 sm:text-lg text-sm rounded-md transition-colors duration-200"
        >
          <PlayCircle className="sm:mr-3 mr-1 h-7 w-7" /> Watch a video
        </Button>
      </div>
    </div>
  )
}
