import { motion } from "framer-motion";
import Button from "../../common/button";
import { group34241 } from "../../../assets";
import { IhumanTemplateProps } from "../../../types";
import { ROUTES } from "../../../constants/routes/desc";
import { useNavigate } from "react-router-dom";



export default function HumanTemplate({
header,
description,
// linkText,
image,
className,
}: IhumanTemplateProps) {
    const navigate = useNavigate()

    // const navigate = useNavigate()
    return(
        <motion.div className={`bg-primary-200 ${className} border border-gray-400w-full text-black rounded-lg`}>
            <div className="grid xl:grid-cols-2 max-xl:gap-24 sm:w-[70%] py-28  mx-auto ">
                <div className="w-[90%] mx-auto max-xl:text-center">
                    <h2 className="sm:text-[55px] text-[40px] text-primary-700 font-medium ">{ header ? header : "Need a Human Touch"}</h2>
                    <div className="text-[22px] py-6 ">{ description ? description : "Book a personalized 1:1 strategy session with our team at Sirz and get expert support to guide your journey"}</div>
                    <Button onClick={() => navigate(ROUTES.CONTACT.PATH)} className="underline py-4 px-14" text="Get Demo" />
                </div>
                <img src={ image ? image : group34241} alt="" className="sm:w-[90%] object-cover" />
            </div>
        </motion.div>
    )
}