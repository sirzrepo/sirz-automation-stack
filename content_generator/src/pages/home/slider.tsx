import { motion } from "framer-motion";
import imgOne from './images/a7dfe7fc94da69ae32367be2fa38d0db.png';
import imgTwo from './images/6a16960f0517718861cb2355055bf347.png';
import imgThree from './images/Frame 41.png';
import imgFour from './images/Frame 43.png';
import imgFive from './images/image 12.png';
import imgSix from './images/image 31.png';
// import imgSeven from './images/image 32.png';

const cards = [
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
    imgFive,
    imgSix,
    // imgSeven
];
export default function WaterflowCards() {
    return (
        <div className="relative w-full overflow-hidden ">
            <motion.div
                className="flex space-x-3 w-max"
                animate={{ x: ["0%", "-50%"] }} // Move only half of the duplicated list
                transition={{
                    ease: "linear",
                    duration: 6,
                    repeat: Infinity,
                }}
            >
                {[...cards, ...cards].map((card, index) => (
                    <div
                        key={index}
                        className={` flex items-center justify-center text-white font-bold text-xl rounded-xl shadow-lg`}
                    >
                        <img src={card} alt="" className="sm:w-64 sm:h-64 w-48 h-48 object-cover" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
