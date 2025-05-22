import { motion } from "framer-motion";
import { PiCheckCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { IauthCardProps } from "../../../../types";

export default function AuthCard({
header,
subheader,
description,
linkText,
image,
listItems,
className,
linkUrl,
}: IauthCardProps) {

    const navigate = useNavigate();

    return(
        <motion.div className={`bg-white ${className} p-8 text-black rounded-md`}>
            <div>
                <img src={image} alt="" className="w-[50px]" />
                <h2 className="text-[23px] capitalize font-bold pt-5">{header}</h2>
                <div className="text-sm py-8 ">{description}</div>
            </div>
            
            <hr />

            <div>
                <h2 className="text-[18px] font-normal capitalize py-5">{subheader}</h2>
                <ul className="text-sm pb-5 ">
                    {
                        listItems?.map((data, index) => (
                        <li key={index} className="flex items-center gap-2 py-4">
                            <PiCheckCircleFill className="text-primary-500 text-[23px]" />
                            <p className="font-semibold capitalize">{data}</p>
                        </li>
                        ))
                    }
                    
                </ul>
                <button 
                onClick={() => navigate(`${linkUrl}`)}
                className="bg-primary-500 capitalize text-white font-bold text-sm text-center py-5 w-full rounded-lg " 
                >
                    {linkText ? linkText : "Learn more"}
                </button>
            </div>
        </motion.div>
    )
}