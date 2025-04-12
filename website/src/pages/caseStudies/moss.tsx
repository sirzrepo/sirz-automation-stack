import { AchievementImg_Five, AchievementImg_Four, AchievementImg_one, AchievementImg_Three, AchievementImg_Two, MossClientImg, MossGlowBg, MossGlowBg2, MossGlowLastBg } from "../../assets";
import { calendyLink } from "../../utils";

export default function MossGlowBeauty() {
    return (
        <div>
            <section className="relative">
                <img src={MossGlowBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#0302022b] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
                    <h4 className="font-bold sm:text-[40px] text-[20px] text-white">Moss & Glow Beauty</h4>
                </div>
            </section>
            <section>
                <div className=" w-[90%] m-auto sm:grid grid-cols-3 py-10">
                    <header className=" font-bold sm:text-[40px] col-span-1">Brand Overview</header>
                    <div className=" col-span-2 sm:text-[20px] text-sm sm:leading-10 text-justify">
                        Moss & Glow Beauty is a skincare brand dedicated to offering natural, sustainable, and eco-friendly products.
                        With a strong emphasis on botanical ingredients and earthy elements, the brand aims to nourish the skin while promoting conscious beauty practices.
                        Their tagline, "Glow Naturally," reflects their mission to help customers achieve radiant skin through 100% plant-based and cruelty-free formulations.
                    </div>
                </div>
            </section>
            <section className="w-[90%] m-auto">
                <img src={MossGlowBg2} alt="" />
            </section>
            <section className=" bg-[#F0F2BC] text-black my-10">
                <div className=" w-[90%] m-auto sm:grid grid-cols-2 pt-12">
                    <div>
                        <header className=" font-bold text-2xl col-span-1">The Client's Aim</header>
                        <div className=" col-span-3 text-lg leading-8 pt-5 text-justify">
                            The client wanted a well-defined brand identity that aligned with their core values of sustainability, transparency, empowerment, and innovation.
                            Their goal was to establish a visual presence that resonated with health-conscious, eco-friendly consumers who prefer vegan and cruelty-free skincare.
                            They also wanted their brand to convey warmth, authenticity, and trust while maintaining a luxurious yet approachable feel.
                        </div>
                    </div>
                    <div className=" col-span-1">
                        <img src={MossClientImg} alt="" className=" w-full object-contain h-[400px]" />
                    </div>
                </div>
            </section>
            <section className=" w-[90%] m-auto">
                <header className="sm:text-[45px] text-[30px] font-bold text-center">What we Achieved</header>
                <div className=" pt-10">
                    <div className=" flex items-center justify-between max-sm:flex-col sm:pb-1 pb-10">
                        <img src={AchievementImg_one} alt="" className="h-[300px] sm:w-[50%] w-full object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Distinctive Logo Design</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                We created a logo integrating the letters "M" and "G" with a leaf motif,
                                symbolizing the brand’s commitment to natural beauty and sustainability.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col flex-row-reverse justify-between sm:pb-1 pb-10">
                        <img src={AchievementImg_Two} alt="" className="h-[300px] w-full sm:w-[50%] object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Typography Selection</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Using a combination of Classy Vogue and Proxima Nova,
                                we balanced sophistication with modern accessibility to reflect the brand’s identity.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col justify-between sm:pb-1 pb-10">
                        <img src={AchievementImg_Three} alt="" className="h-[300px] w-full sm:w-[50%] object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Thoughtful Color Palette</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                The chosen colors—Burnt Orange, Moss Green, Sage Green, and Pastel Lime—evoke warmth, freshness, and an organic, nature-inspired aesthetic.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col flex-row-reverse justify-between sm:pb-1 pb-10">
                        <img src={AchievementImg_Four} alt="" className="h-[300px] w-full sm:w-[50%] object-cover" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Visual Identity System</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                We developed a cohesive branding approach that is instantly recognizable, aligning with the brand’s promise of pure and natural skincare.
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-center max-sm:flex-col justify-between  sm:pb-1 pb-10">
                        <img src={AchievementImg_Five} alt="" className="h-[300px] object-cover sm:w-[50%]" />
                        <div className=" m-auto sm:w-[40%]">
                            <header className=" font-bold sm:text-2xl text-lg col-span-1">Eco-conscious Packaging Direction</header>
                            <div className=" text-lg leading-8 sm:pt-5 pt-2 text-justify">
                                Inspired by the brand’s commitment to sustainability, we recommended packaging solutions made from recyclable and biodegradable materials.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative my-10">
                <img src={MossGlowLastBg} alt="" className=" sm:h-[500px] h-[250px] w-full object-cover" />
                <div className=" bg-[#030202d1] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                    <div className=" w-[70%] m-auto text-center flex justify-center flex-col items-center">
                        <h4 className="font-bold sm:text-[30px] text-[20px] text-white pb-8">
                            By crafting a compelling and nature-inspired brand identity, Moss & Glow Beauty now stands out as a trusted and sustainable skincare brand, appealing to consumers who value transparency, innovation, and holistic beauty
                        </h4>
                        <a href={calendyLink} target="_blank" rel="noopener noreferrer" className={` bg-white text-black rounded-full sm:w-[30%] w-full max-sm:mt-5
                                    'w-full flex align-center justify-center py-3 cursor-pointer text-[16px] px-8 font-medium floating-button  
                                    `}>
                            <button 
                                onClick={() => { }}>
                                Schedule a demo
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}