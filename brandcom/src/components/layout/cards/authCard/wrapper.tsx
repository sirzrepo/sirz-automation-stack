import { motion } from "framer-motion";
import AuthCard from ".";
import { serviceIcon, star, store } from "../../../../assets";
import { ROUTES } from "../../../../constants/routes/desc";

const data = [
    {
        image: serviceIcon,
        header: "E-Commerce Automation",
        description: "Sell smarter. Automate store management, product updates, and customer follow-ups — effortlessly.",
        subheader: "popular features",
        listItems: [
            "FastPerforming",
            "AI Agents",
            "E-commerce Automations"
        ],
        linkText: "learn more",
        get linkUrl() {
            return ROUTES.ECOMMERCE.PATH
        }
    },
    {
        image: star,
        header: "Branding Automation",
        description: "From logos to branch kits, launch a standout identity in seconds  no designer required",
        subheader: "popular features",
        listItems: [
            "Analytics",
            "Brand Identity Package",
            "Fast Brand Agents"
        ],
        linkText: "learn more",
        get linkUrl() {
            return ROUTES.BRANDING.PATH
        }
    },
    {
        image: store,
        header: "Digital Marketing Automation",
        description: "Plan, launch, and analyze campaigns accross multiple platforms with one powerful dashboard",
        subheader: "popular features",
        listItems: [
            "Analytics",
            "Social Media Manager",
            "Marketing Automation"
        ],
        linkText: "learn more",
        get linkUrl() {
            return ROUTES.DIGITAL_MARKETING.PATH
        }
    },
]

export function AuthCardWrapper() {
    return (
        <section className="lg:w-[70%] sm:w-[80%] w-[90%] mx-auto">
        <motion.div className="grid 2xl:grid-cols-3 sm:grid-cols-2 gap-10">
            {
            data?.map((data, index) => (
                <AuthCard 
                    key={index}
                    header={data.header}
                    subheader={data.subheader}
                    image={data.image}
                    listItems={data.listItems}
                    linkText={data?.linkText}
                    description={data.description ?? ""}
                    linkUrl={data?.linkUrl}
                />
            ))
                }
        </motion.div>
    </section>
    )
}