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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes/desc";


export default function Services() {
    const navigate = useNavigate();
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
            <div className="relative min-h-screen py-16 md:py-24 overflow-hidden">
              {/* Animated Background Elements */}
              <motion.div 
                className="absolute inset-0 -z-10 overflow-hidden"
                initial="hidden"
                animate="visible"
              >
                {/* Floating Circles */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-100 opacity-20 blur-3xl"
                  animate={{
                    y: [0, 30, 0],
                    x: [0, 20, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-100 opacity-20 blur-3xl"
                  animate={{
                    y: [0, -25, 0],
                    x: [0, -15, 0],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                {/* Animated Grid */}
                <motion.div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%2392a2b8'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                    backgroundSize: '32px 32px'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </motion.div>
              
              <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20">
                <div className="md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
                    {card?.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {card?.longDescription}
                  </p>
                  <div className="flex sm:flex-row gap-4 justify-center md:justify-start">
                    <button
                      onClick={() => navigate(ROUTES.CONTACT.PATH)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Get Demo
                    </button>
                    <button
                      onClick={() => navigate(ROUTES.CONTACT.PATH)}
                      className="bg-white hover:bg-gray-100 border border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Get Started Free
                    </button>
                  </div>
                </div>
                <motion.div 
                  className="md:w-1/2 relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div 
                    className="rounded-2xl shadow-2xl overflow-hidden border-4 border-white/10"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)'
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.img
                      src={card?.image}
                      alt="Website Builder Mockup"
                      className="w-full h-auto object-cover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-4 right-4 rounded-full bg-indigo-600 text-white w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.943 12.97 3 11.43 3 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9h6v2H7V9z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            

            <section className="w-[85%] mx-auto">
                <Video video={card?.video} />
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
                                image={data.image}
                                title={data.title}
                                description={data.description}
                                url={data.url}
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

