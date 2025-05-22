import { motion } from "framer-motion";
import ServiceCard from ".";
import { IserviceCardProps } from "../../../../types";

interface ServiceCardWrapperProps {
    cards: IserviceCardProps[];
}

export function ServiceCardWrapper({cards}: ServiceCardWrapperProps) {
    return (
        <section className="lg:w-[80%] mx-auto">
        <motion.div className="grid 2xl:grid-cols-2 md:grid-cols-2 gap-10">
            {
            cards?.map((data, index) => (
                <ServiceCard 
                key={index}
                title={data.title}
                image={data.image}
                description={data.description ?? ""}
                url={data.url}
                />
            ))
                }
        </motion.div>
    </section>
    )
}