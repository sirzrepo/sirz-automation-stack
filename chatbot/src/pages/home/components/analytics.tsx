import { SubHeroImg, SubHeroImg1 } from "../../../assets";

export default function Analytics() {
    return (
    <div className="flex flex-col md:w-[80%] rounded-t-[10%] w-[95%] mx-auto items-center justify-center relative px-4 ">
   
         <h1
           className="text-xl md:text-3xl lg:text-4xl font-bold text-center max-w-3xl mb-6 bg-clip-text text-transparent bg-black">
           Your AI Assistant — Always On. Always Selling.
         </h1>
   
         <p className="text-gray-900 text-center max-w-3xl mb-12 text-lg">
            Unlock the power of automation with a chatbot that does more than chat — it connects, sells, and scales with your brand.      
         </p>
   
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-md overflow-hidden bg-[#23262D]">
                <img src={SubHeroImg1} alt="" />
                <div className=" p-4 text-white">
                    <h2 className="text-xl font-bold">Engage – Spark Conversations 24/7</h2>   
                    <p className="text-sm py-3">Whether it's 2 AM or 2 PM, your chatbot is always ready. It greets visitors instantly, answers basic queries, and starts conversations that feel natural — no delays, no drop-offs.</p>
                </div>
            </div>
            <div className="rounded-md overflow-hidden bg-[#23262D]">
                <img src={SubHeroImg} alt="" />
                <div className="p-4 text-white">
                    <h2 className="text-xl font-bold">Sell – Guide, Recommend & Close Deals</h2>   
                    <p className="text-sm py-3">From showcasing products to guiding users through checkout, your bot is a digital sales rep. It understands customer intent, provides personalized recommendations, and handles objections like a pro.</p>
                </div>
            </div>
         </div>
       </div>
    )
}