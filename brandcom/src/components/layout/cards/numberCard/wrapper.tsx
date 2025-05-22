import { motion } from "framer-motion";
import NumberCard from ".";

interface NumberWrapperProps {
    title?: string,
    description?: string,
    titleTwo?: string,
    descriptionTwo?: string,
    inverted?: boolean,
    className?: string,
}

export function NumberCardWrapper(props: NumberWrapperProps) {
    const {title, description, className, titleTwo, descriptionTwo} = props;
    return (
        <section className="sm:w-[90%] w-[90%] mx-auto">
        <motion.div className="grid sm:grid-cols-2 grid-cols-1 gap-16">
            <NumberCard 
                title={title}
                className={className}
                inverted
                description={description ?? ""}
            />

            <NumberCard 
                title={titleTwo}
                className={className}
                // inverted
                description={descriptionTwo}
            />
        </motion.div>
    </section>
    )
}