import { defaultVideo } from "../../assets";
import { motion } from "framer-motion";

export default function Video({video}: {video: string | undefined}) {
    return(
        <motion.div 
            className='pb-7 video-wrapper'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* <img src={VidDemonstration} alt="" className='rounded-tr-2xl rounded-tl-2xl w-full' /> */}
            <video 
                playsInline 
                controls
                autoPlay 
                loop 
                muted 
                className='rounded-br-2xl rounded-bl-2xl w-[90%] mx-auto'
            >
                <source src={video ? video : defaultVideo} type="video/mp4"  />
                Your browser does not support the video tag.
            </video>
        </motion.div>
    )
}