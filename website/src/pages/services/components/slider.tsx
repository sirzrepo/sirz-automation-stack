import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SliderProps {
    imageArray: string[];
}

export default function Slider({ imageArray }: SliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCards = imageArray.length;
    const visibleCards = 5; // Number of visible cards

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [totalCards]);

    return (
        <section className="relative w-full dark:bg-background_dark bg-background_light pb-1">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="relative flex items-center justify-center w-full ">
                    <div className="relative flex justify-center w-full overflow-x-scroll hideScrollBar h-[500px]">
                        {imageArray.map((serviceImg, index) => {
                            const relativeIndex = (index - currentIndex + totalCards) % totalCards;
                            const isActive = relativeIndex === Math.floor(visibleCards / 2); // Center card

                            // Ensure only visibleCards are shown
                            if (relativeIndex >= visibleCards) return null;

                            return (
                                <motion.div
                                    key={index}
                                    onClick={() => { }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0.6, // Dim non-active cards
                                        scale: isActive ? 1.1 : 0.9, // Zoom in active card
                                        x: (relativeIndex - Math.floor(visibleCards / 2)) * 200, // Positioning
                                        filter: isActive ? "blur(0px)" : "blur(0px)", // Blur non-active cards
                                    }}
                                    transition={{ duration: 1 }}
                                    className="absolute sm:w-[600px] w-[300px] min-h-[400px] h-auto p-2 shadow-lg rounded-md cursor-pointer"
                                    style={{
                                        zIndex: isActive ? 10 : 5 - Math.abs(Math.floor(visibleCards / 2) - relativeIndex),
                                    }}
                                >
                                    <img
                                        key={index}
                                        src={serviceImg}
                                        alt={'img'}
                                        className="w-full absolute top-0 left-0 object-cover h-full rounded-md"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}