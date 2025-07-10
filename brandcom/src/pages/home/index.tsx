import { motion } from "framer-motion";
import { Component4, exclamationLines, group34242, group34252, group34255, group34256, icon, icon2, icon3, toolsDiagram1 } from "../../assets";
import CircleTopic from "../../components/layout/templates/circleTopic";
import { ServiceCardWrapper } from "../../components/layout/cards/serviceCard/wrapper";
import ExploreTemplate from "../../components/layout/templates/exploreTemplate";
import { AuthCardWrapper } from "../../components/layout/cards/authCard/wrapper";
import { SimpleCardWrapper } from "../../components/layout/cards/simpleCard/wrapper";
import HumanTemplate from "../../components/layout/templates/humanTouch";
import SectionTemplate from "../../components/layout/templates/sectionTemplate";
import ButtonTemplate from "../../components/layout/templates/buttonTemplate";
import { pageCardSelections, serviceCards } from "../../constants/serviceCards";

const data = [
    {
        image: icon2,
        description: "Get more eyes on your business"
    },
    {
        image: icon3,
        description: "See more value from every Ad your run"
    },
    {
        image: icon,
        description: "Build a scalable brand without the overwhelm"
    }

]

export default function Home() {
    const selectedKeys = pageCardSelections["home"];
    const selectedCards = serviceCards.filter(card => selectedKeys.includes(card.key))

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden bg-primary-100"
        >
            {/* Hero Section */}
            <section className=" min-h-screen relative text-white py-16 md:py-24">
                 <motion.div className=" w-full text-black rounded-lg">
                    <div className="flex items-center flex-col relative z-10 bg-[#FFFFFFa8] text-center justify-center 2xl:w-[50%] sm:w-[80%] w-[90%] py-16  mx-auto ">
                        <div className=" pb-20 max-md:pt-10">
                            <h2 className="sm:text-[53px] text-[43px] text-primary-700 font-bold ">Create Your Dream  <CircleTopic text="Brand" /> with <CircleTopic text="AI" /> </h2>
                            <div className="sm:text-[27px] text-[20px] py-6 sm:w-[70%] mx-auto ">Brandcom is an AI-powered automation platform built to streamline branding, e-commerce, and digital marketing — all in one place.</div>
                            <div className="flex relative justify-center gap-6 mt-8  mx-auto">
                                <ButtonTemplate firstBtnTxt={"Learn More"} notSecondBtn={true} classname="lg:w-[50%] w-[90%]" />
                                <img src={exclamationLines} alt="" className="absolute right-[-30px] top-0" />
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* group34252, group34242, exclamationLines */}
                        <img src={group34255} alt="" className="absolute bottom-0 max-sm:w-[150px] " />
                        <img src={Component4} alt="" className="absolute sm:bottom-20 bottom-0 z-10 sm:right-20 right-0 max-sm:w-[150px] " />
                        <img src={group34252} alt="" className="absolute top-5 max-sm:w-[150px]" />
                        <img src={group34242} alt="" className="absolute top-5 right-0 max-sm:w-[150px]" />
                    </div>
                </motion.div>
            </section>

            <section className="text-center mx-auto w-[80%] py-16">
                <h2 className="sm:text-[53px] text-[33px] text-primary-700 font-medium ">All the <CircleTopic text="Tools" /> to Get Ahead  </h2>
                <img src={toolsDiagram1} alt="" className="object-cover pt-20 sm:w-[60%] m-auto" />
            </section>

            <section>
                <ServiceCardWrapper cards={selectedCards} />
                <ButtonTemplate classname="2xl:w-[35%] sm:w-[50%] sm-md:w-[80%] w-[90%]" />
            </section>

            <section className="bg-primary-200 mt-28 pt-20 pb-32">
                <ExploreTemplate />
                <AuthCardWrapper />
            </section>

            <section className="py-10">
                <div className="flex items-center flex-col text-center justify-center lg:w-[60%] w-[90%] py-16  mx-auto ">
                    <div className=" pb-20">
                        <h2 className="sm:text-[53px] text-[33px] text-primary-700 font-medium ">Use AI To Get  <CircleTopic text="Results" /></h2>
                        <div className="text-[22px] py-6 sm:w-[70%] mx-auto ">
                            Our tools are designed to drive performance — not just look pretty. From boosting web traffic to increasing your return on ads, we help you grow with purpose.
                        </div>
                        <ButtonTemplate  classname=" md:w-[50%] sm-md:w-[80%]" />
                    </div>
                </div>
                <SimpleCardWrapper cards={data} />
            </section>

            <section className="my-20">
                <HumanTemplate />
            </section>

            <section>
                <div className="flex items-center flex-col text-center justify-center sm:w-[60%] w-[90%] py-16  mx-auto ">
                    <img src={group34256} alt="" />
                    <div className=" pt-20">
                        <h2 className="text-[33px] text-primary-700 font-medium ">Stay Updated</h2>
                        <div className="text-[22px] py-6 mx-auto ">
                            Read our  blog posts for the latest features we’re rolling out! 
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="flex overflow-x-scroll">
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
            </section> */}

            <section className="pt-20">
                <SectionTemplate />
            </section>

        </motion.div>
    );
}