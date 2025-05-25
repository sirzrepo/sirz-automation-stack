import { motion } from "framer-motion";
import { component51 } from "../../../../assets";
import { IserviceCardProps } from "../../../../types";
import { useNavigate } from "react-router-dom";

export default function ServiceCard({title, description, linkText, image, className, url}: IserviceCardProps){
    const navigate = useNavigate();

    const handleClick = () => {
        if (url) {
            navigate(url)
        }
    }
    return(
        <motion.div onClick={handleClick} className={`bg-white cursor-pointer px-10 py-7 ${className} text-black rounded-md`}>
            <img 
            src={image ? image : component51} 
            alt="" 
            className="w-full object-cover"
            />
            <div className="px-5">
                <h2 className="text-[34px] font-normal py-8">{title}</h2>
                <div className="text-lg ">{description || ""}</div>
                <div className="text-primary-500 font-bold text-lg text-center pt-7 pb-2" > {linkText || ""}</div>
            </div>
        </motion.div>
    )
}