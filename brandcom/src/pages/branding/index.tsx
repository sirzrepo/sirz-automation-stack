import { motion } from "framer-motion";
import { brandingImg, Component4, ecommerceImg, icon, icon2, icon3, star, } from "../../assets";
import CircleTopic from "../../components/layout/templates/circleTopic";
import { ServiceCardWrapper } from "../../components/layout/cards/serviceCard/wrapper";
import { SimpleCardWrapper } from "../../components/layout/cards/simpleCard/wrapper";
import HumanTemplate from "../../components/layout/templates/humanTouch";
import SectionTemplate from "../../components/layout/templates/sectionTemplate";
import ButtonTemplate from "../../components/layout/templates/buttonTemplate";
import Video from "../../components/layout/video";
import { pageCardSelections, serviceCards } from "../../constants/serviceCards";

const data = [
    {
        image: icon2,
        description: "fast brand agents"
    },
    {
        image: icon3,
        description: "brand identity"
    },
    {
        image: icon,
        description: "analytics"
    }

]

export default function Branding() {
                const selectedKeys = pageCardSelections["branding"];
                const selectedCards = serviceCards.filter(card => selectedKeys.includes(card.key));

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden bg-primary-100"
        >
            {/* Hero Section */}
            <section className=" min-h-screen relative text-white py-16 md:py-24">
                 <motion.div className=" text-black rounded-lg">
                    <div className="lg:grid grid-cols-2 w-[90%] gap-10 mx-auto  ">
                        <img src={brandingImg} alt="" className=" mx-auto max-lg:hidden " />

                        <div className="flex 2xl:w-[80%] flex-col relative z-10 lg:py-16 ">
                            <div className=" pb-20 max-md:pt-10">
                                <h2 className="sm:text-[40px] text-[25px]  flex items-center gap-4 text-primary-700 font-medium ">
                                    <img src={star} alt="" />
                                    Branding Automation
                                </h2>
                                <div className="sm:text-[23px] leading-10 text-[18px] py-8  ">
                                Build a powerful brand identity in minutes. From logo creation to brand kits, our AI handles the heavy lifting so you can focus on telling your story. Consistent, scalable, and on-brand—every time.
                                </div>
                                <div className="gap-6">
                                    <ButtonTemplate firstBtnTxt={`Book Now`} classname="" />
                                </div>
                            </div>
                        </div>

                        <img src={ecommerceImg} alt="" className=" mx-auto lg:hidden " />
                    </div>
                </motion.div>
                <img src={Component4} alt="" className="absolute sm:bottom-20 bottom-0  sm:right-20 right-0 max-sm:w-[150px] " />
            </section>

            <section className="text-center mx-auto w-[80%] py-16">
                <h2 className="sm:text-[53px] text-[33px] text-primary-700 font-medium ">Popular <CircleTopic text="Features" /> </h2>
                <div className="py-20">
                    <SimpleCardWrapper cards={data} />
                </div>
            </section>

            <section>
                <Video video={""} />
            </section>

            <section>
            <div className="flex items-center flex-col text-center justify-center lg:w-[60%] w-[90%] py-16  mx-auto ">
                    <div className="pb-10">
                        <h2 className="sm:text-[53px] text-[33px] text-primary-700 font-medium ">Fine These  <CircleTopic text="Tools" /> Inside</h2>
                        <ButtonTemplate  classname=" md:w-[80%] pt-10 sm-md:w-[80%]" />
                    </div>
                </div>
                <ServiceCardWrapper cards={selectedCards} />   
            </section>

            <section className="mt-16">
                <HumanTemplate />
            </section>

            <section className="">
                <SectionTemplate />
            </section>

        </motion.div>
    );
}