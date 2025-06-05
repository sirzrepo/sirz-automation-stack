import Button from "../../../components/common/ui/Button"

export default function LeadScoringHero() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] px-4 my-10">
      <div className="flex space-x-2 mb-16">
        <div className="text-[#737373] text-xl">SIRz Landing Page Agent</div>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-6xl mb-6">
        Turn Your Brand Into a Stunning Landing Page in Minutes
      </h1>

      <p className="text-gray-500 text-center max-w-3xl mb-12 text-lg">
        Sirz Landing Page Agent helps you generate a sleek, high-converting landing page with just your business name and a short description. No design skills needed.
      </p>

      <div className="">
        <Button className="bg-colorBlueDeep hover:bg-blue-700 text-white sm:px-8 px-2 sm:py-4 py-2 sm:text-lg text-sm rounded-md">Create your first website</Button>
      </div>
    </div>
  )
}
