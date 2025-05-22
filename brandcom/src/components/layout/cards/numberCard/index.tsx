import { motion } from "framer-motion";
import { Idata } from "../../../../types";
import { vector1, vector2 } from "../../../../assets";

export default function NumberCard({
    title,
    description,
    inverted,
    className,
}: Idata) {
    return(
        <motion.div className={`bg-white relative border border-gray-400 ${className} px-6 w-full py-4 text-black rounded-lg`}>
            {
                inverted ? (
                <div className="relative overflow-hidden h-[500px] w-full">
                    <div className="font-extrabold text-[40px] text-primary-500 text-left">01</div>
                        <img src={vector2} alt="" className="absolute top-0 right-0" />
                        <div className="text-left absolute bottom-0 ">
                        <h2 className="text-[30px] font-semibold">{title ? title : "Launch Fast"}</h2>
                        <div className="text-[20px] py-2 capitalize font-normal ">{description ? description : "Build and publish websites in minutes"}</div>
                </div>
                </div>
                ) : (
                <div className="relative overflow-hidden h-[500px] w-full">
                    <div className="text-left">
                        <h2 className="text-[30px] font-semibold">{title}</h2>
                        <div className="text-[20px] py-2 capitalize font-normal ">{description}</div>
                    </div>
                    <div className="font-extrabold text-[40px] absolute bottom-0 text-primary-500 text-left">02</div>
                    <img src={vector1} alt="" className="absolute bottom-0 right-0" />
                    
                </div>
                )
            }
        </motion.div>
    )
}