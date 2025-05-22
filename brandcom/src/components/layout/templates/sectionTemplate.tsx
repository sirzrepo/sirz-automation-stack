import { motion } from "framer-motion";
import { womanOnSwing } from "../../../assets";
import ButtonTemplate from "./buttonTemplate";

interface IsectionTemplateProps {
    header?: string,
    description?: string,
    linkText?: string,
    image?: string,
    className?: string
}

export default function SectionTemplate({
header,
description,
image,
className,
}: IsectionTemplateProps) {
    return (
        <motion.div className={` w-full ${className} text-black rounded-lg`}>
                <div className="flex items-center flex-col text-center justify-center xl:w-[40%] md:w-[60%] w-[90%] py-16  mx-auto ">
                    <div className=" pb-20">
                        <h2 className="sm:text-[53px] text-[33px] text-primary-700 font-semibold ">{header? header : "You’ve Got Everything You Need to Grow"}</h2>
                        <div className="text-[22px] py-6 ">{description ? description : "No more tool hopping. No more guesswork. Just one platform, built for modern brands like yours."}</div>
                        <ButtonTemplate classname="xl:w-[70%] lg:w-[50%] md:w-[70%] sm:w-[60%] md-lg:w-[70%]" />
                    </div>
                    {
                        // image && (
                            <img src={image ? image : womanOnSwing} alt="" className=" object-contain" />
                        // )
                    }
                </div>
        </motion.div>
    )
}