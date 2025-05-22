import { motion } from "framer-motion";
import CircleTopic from "../../components/layout/templates/circleTopic";
import ServiceCard from "../../components/layout/cards/serviceCard";
import ExploreTemplate from "../../components/layout/templates/exploreTemplate";
import { AuthCardWrapper } from "../../components/layout/cards/authCard/wrapper";
import HumanTemplate from "../../components/layout/templates/humanTouch";
import SectionTemplate from "../../components/layout/templates/sectionTemplate";
import ButtonTemplate from "../../components/layout/templates/buttonTemplate";
import Video from "../../components/layout/video";
import { NumberCardWrapper } from "../../components/layout/cards/numberCard/wrapper";
import { getServiceCardByKey, pageCardSelections, serviceCards } from "../../constants/serviceCards";
import { useParams } from "react-router-dom";


export default function Services() {
    const {service} = useParams();
    const card = getServiceCardByKey(`${service}`);

    const selectedKeys = pageCardSelections["home"];
    const selectedCards = serviceCards.filter(card => selectedKeys.includes(card.key));

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden bg-primary-100"
        >
            {/* Hero Section */}
            {/* <section className=" min-h-screen relative text-white pb-16 md:py-24">
                    <motion.div className=" text-black rounded-lg">
                    <div className="lg:grid grid-cols-2 w-[80%] gap-10 mx-auto  ">

                        <div className="flex 2xl:w-[80%] flex-col sm:mt-20 relative z-10 lg:py-16 ">
                            <div className=" pb-20 max-md:pt-10">
                                <h2 className="text-3xl font-bold text-primary-700 sm:text-4xl lg:text-5xl ">
                                    {card?.title}
                                </h2>
                                <div className="text-lg leading-relaxed py-8 text-gray-700 ">
                                {card?.longDescription}
                                </div>
                                <div className="gap-6">
                                    <ButtonTemplate firstBtnTxt={`Book Now`} classname="" />
                                </div>
                            </div>
                        </div>

                        <img src={card?.image} alt="" className=" mx-auto w-full  object-cover  " />
                    </div>
                </motion.div>
                <img src={Component4} alt="" className="absolute sm:bottom-20 bottom-0  sm:right-20 right-0 max-sm:w-[150px] " />
            </section> */}


            <div className=" min-h-screen  py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20">
                <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
                    {card?.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {card?.longDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Get Demo
                    </button>
                    <button
                    className="bg-white hover:bg-gray-100 border border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Get Started Free
                    </button>
                </div>
                </div>
                <div className="md:w-1/2 relative">
                <div className="rounded-lg shadow-xl overflow-hidden">
                    <img
                    src={card?.image}
                    alt="Website Builder Mockup"
                    className="w-full h-auto object-cover"
                    />
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-indigo-600 text-white w-16 h-16 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.943 12.97 3 11.43 3 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9h6v2H7V9z" clipRule="evenodd" />
                    </svg>
                </div>
                </div>
            </div>
            </div>

            

            <section className="w-[85%] mx-auto">
                <Video />
            </section>


            <div className="flex items-center flex-col text-center justify-center lg:w-[60%] w-[90%] py-16  mx-auto ">
                <div className=" pb-20">
                    <h2 className="sm:text-[53px] mx-auto text-[33px] text-primary-700 font-medium ">Wht You're  <CircleTopic text="Getting" /></h2>
                </div>

                <NumberCardWrapper 
                    title={card?.cards.firstCard.title}
                    description={card?.cards.firstCard.text}
                    titleTwo={card?.cards.secondCard.title} 
                    descriptionTwo={card?.cards.secondCard.text}
                />
            </div>

            <section>
            <   div className="flex items-center flex-col text-center justify-center lg:w-[60%] w-[90%] pt-16  mx-auto ">
                    <div className="">
                        <h2 className="sm:text-[53px] text-[33px] text-primary-700 font-medium ">Discover More  <CircleTopic text="Tools" /></h2>
                        <ButtonTemplate  classname=" md:w-[70%] py-16 sm-md:w-[80%]" />
                    </div>
                </div>


                <div className="flex overflow-x-scroll">
                    {
                        selectedCards.map((data, index) => (
                            <div key={index} className="min-w-[350px]">
                                <ServiceCard 
                                title={data.title}
                                description={data.description}
                                />
                            </div>
                        ))
                    }
                </div>
            </section>



            <section className="bg-primary-200 mt-28 pt-20 pb-32">
                <ExploreTemplate />
                <AuthCardWrapper />
            </section>

            <section className="mb-20">
                <HumanTemplate />
            </section>

            <section className="">
                <SectionTemplate />
            </section>

        </motion.div>
    );
}

