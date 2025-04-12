import { motion } from "framer-motion";
import imgOne from './images/fe4f2071ece693b72376c26f84a9e01c.jpeg';
import imgTwo from './images/c5d23cfc916bf7034866b353bc254a93.jpeg';
import imgThree from './images/cedb974b03d222b085b8692e5c09f4dc.png';
import imgFour from './images/Frame 37.png';
import imgFive from './images/Frame 39.png';
import imgSix from './images/image 10.png';


const cards = [
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
    imgFive,
    imgSix,
];

export default function WaterflowCardTwo() {
    return (
        <div className="relative w-full overflow-hidden pt-5">
            <motion.div
                className="flex space-x-3 w-max"
                animate={{ x: ["-50%", "0%"] }}
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
