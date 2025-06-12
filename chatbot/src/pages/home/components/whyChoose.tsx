import { motion } from "framer-motion"
import { WhyChooseImg } from "../../../assets"

export default function WhyChoose() {
    const features = [
        {
            title: "24/7 Customer Engagement",
            description: "Never miss a lead or sales opportunity. Our chatbot works round the clock, instantly greeting visitors and answering their questions—day or night—so you’re always open for business, even when you’re not.",
            color: "#E00BEB"
        },
        {
            title: "Personalized Interactions",
            description: "Every customer is unique, and so should be their experience. Our chatbot uses smart AI to understand visitor preferences and tailor conversations accordingly, building trust and boosting engagement.",
        },
        {
            title: "Seamless Integration",
            description: "Plug our chatbot into the platforms you already use—Instagram, WhatsApp Business, Shopify, and more. No complicated setups or disruptions to your workflow.",
        },
    ]
    return (
         <div className=" py-20 my-20 flex items-center justify-center p-4">
            <div className="lg:w-[80%] w-[95%] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
              {/* Left Section (Content) */}
              <div className="text-black text-center lg:text-left p-6">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
              Why Choose Our Chatbot?
              </h1>
              <p className="text-lg lg:text-xl leading-relaxed mb-10">
              Our chatbot is designed to seamlessly fit into your digital ecosystem and elevate your business by delivering smart, personalized, and efficient customer interactions — all while saving you time and effort.
              </p>
              
              <div className="">
                <img src={WhyChooseImg} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
        
              {/* Right Section (Chatbot) */}
              <div className="lg:ps-20">
                {
                    features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`mb-6 border-s-4 border-s-[${feature.color}] p-4 lg:p-6 lg:my-10`}
                        >
                            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                            <p className="text-lg text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))
                }
              </div>
            </div>
          </div>
    )
}