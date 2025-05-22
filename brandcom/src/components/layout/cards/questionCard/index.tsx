import { motion } from "framer-motion";
import { IquestionCardProps } from "../../../../types";
import { gradientGlassQuestionMark } from "../../../../assets";

export default function QuestionCard({
description,
image,
subdescription,
className,
}: IquestionCardProps) {
    return(
        <motion.div className={`bg-white  ${className} px-6 py-8 min-w-[350px] text-black rounded-lg`}>
            <div className=" ">
                <img src={image ? image : gradientGlassQuestionMark} alt="" className="w[50px] mx-auto" />
                <div className="text-md font-semibold py-5 ">{description ? description : "How does brand automation work?"}</div>
                <span className="text-sm">{subdescription ? subdescription : "Brand Asset Management "}</span>
            </div>
        </motion.div>
    )
}