import { motion } from "framer-motion";
import { IsimpleCardProps } from "../../../../types";

export default function SimpleCard({
description,
image,
className,
}: IsimpleCardProps) {
    return(
        <motion.div className={`bg-white border border-gray-400 ${className} px-6 py-8 text-black rounded-lg`}>
            <div className="flex items-center justify-center flex-col text-center">
                <img src={image} alt="" className="w-[50px]" />
                <div className="text-md py-5 capitalize ">{description}</div>
            </div>
        </motion.div>
    )
}