import { motion } from "framer-motion";
import { group34257 } from "../../../assets";
import { IexploreTemplateProps } from "../../../types";

export default function ExploreTemplate ({
header,
description,
image,
className,
}: IexploreTemplateProps) {
    return(
        <motion.div className={`border border-gray-400w-full ${className} text-black rounded-lg`}>
        <div className="flex items-center flex-col text-center justify-center sm:w-[80%] py-16  mx-auto ">
            <img src={image ? image : group34257} alt="" className="w-full object-cover" />
            <div className=" py-20 sm:w-[75%] w-[90%] text-primary-700">
                {
                    header ? (

                        <h2 className="text-[43px] font-semibold "> {header}</h2>
                    ) : (

                <h2 className="text-[43px] font-semibold ">  Explore <span className=" font-normal bg-white border border-primary-500 rounded-md p-1">Limitless</span> Opportunities</h2>
                    )
                }
                <div className="text-[18px] py-6 ">
                    {description ? description : 
                    "Say goodbye to scattered tools and disconnected systems. With Brandcom, you can centralize your operations and let automation do the work — freeing up your time to focus on strategy."
                    }
                    </div>
            </div>
        </div>
    </motion.div>
    )
}