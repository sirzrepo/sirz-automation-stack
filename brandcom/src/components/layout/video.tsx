import { video } from "../../assets";
import { motion } from "framer-motion";

export default function Video() {
    return(
        <motion.div 
            className='pb-7'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* <img src={VidDemonstration} alt="" className='rounded-tr-2xl rounded-tl-2xl w-full' /> */}
            <video controls autoPlay loop className='rounded-br-2xl rounded-bl-2xl w-[90%] mx-auto'>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </motion.div>
    )
}