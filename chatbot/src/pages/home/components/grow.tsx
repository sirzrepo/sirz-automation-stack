import { GrowImg } from "../../../assets";


export default function Grow() {
  return (
    <div className="py-20 my-20 bg-[#1B1C21] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,#303461,rgba(27,28,33,0)_70%)]"></div>
      <div className="relative flex items-center justify-center p-4">
        <div className="lg:w-[80%] w-[95%] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          {/* Left Section (Content) */}
          <div className="text-white text-center lg:text-left p-6">
            <h1 className="text-3xl font-bold mb-6">
              Grow – Collect Leads & <br /> Boost Conversions
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed mb-10">
              Beyond making sales, your chatbot helps build your list and boost lifetime value. It gathers
              emails, offers discount codes, and nudges users toward purchases with strategic upsells – all
              without being pushy.
            </p>
            <button className="bg-gradient-to-r from-[#C9A6FF] via-[#FF8689] to-[#FF8689] hover:bg-pink-600 text-black font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Book a Demo
            </button>
          </div>

          {/* Right Section (Chatbot) */}
          <img src={GrowImg} alt="" />
        </div>
      </div>
    </div>
  )
}
