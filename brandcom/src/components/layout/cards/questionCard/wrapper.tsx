import { motion } from "framer-motion";
import ServiceCard from ".";
import { IsimpleCardProps } from "../../../../types";

interface SimpleCardWrapperProps {
    cards: IsimpleCardProps[];
}

export function SimpleCardWrapper({cards}: SimpleCardWrapperProps) {
    return (
        <section className="sm:w-[70%] w-[90%] mx-auto">
        <motion.div className="grid 2xl:grid-cols-3 sm:grid-cols-2 gap-16">
            {
            cards?.map((data, index) => (
                <ServiceCard 
                key={index}
                image={data.image}
                description={data.description ?? ""}
                />
            ))
                }
        </motion.div>
    </section>
    )
}