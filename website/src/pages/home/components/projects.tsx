import Button from "../../../components/common/button";
import HeaderFormat from "../../../components/header";
import { domesticiaImg, iroseImg } from "../../../assets";
import ButtonCard from "../../../components/layout/cards/buttonCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes/desc";
import { motion } from 'framer-motion';

export default function OurProjects() {
    const navigate = useNavigate();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="py-16 w-[90%] max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <HeaderFormat 
                        title="Explore our projects" 
                        classNames="text-4xl font-bold mb-6 text-black dark:text-white" 
                    />
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        We take ideas and turn them into powerful digital solutions. Check out some of our latest projects and see how we help businesses thrive!
                    </p>
                </motion.div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-20"
                >
                    {/* Domesticia Project */}
                    <motion.section 
                        variants={item}
                        className="group relative overflow-hidden rounded-2xl transition-all duration-300"
                    >
                        <div className="lg:grid md:grid-cols-6 gap-8 items-center">
                            <div className="md:col-span-4 overflow-hidden">
                                <img 
                                    src={domesticiaImg} 
                                    alt="Domesticia e-commerce platform" 
                                    className="w-full h-full object-cover transform transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 md:col-span-2">
                                <ButtonCard
                                    title="Domesticia"
                                    text="An e-commerce platform offering a curated selection of premium home essentials."
                                    text2="From stylish decor to everyday household items, Domestica makes online shopping seamless, delivering quality products with ease."
                                    buttonText="View Project"
                                    onClick={() => navigate(ROUTES.PROJECTS.PATH)}
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* Irose Fashion Project */}
                    <motion.section 
                        variants={item}
                        className="group relative overflow-hidden rounded-2xl transition-all duration-300 "
                    >
                        <div className="lg:grid md:grid-cols-6 gap-8 items-center sm:flex-row-reverse">
                            <div className="md:col-span-4 overflow-hidden order-1 md:order-2">
                                <img 
                                    src={iroseImg} 
                                    alt="Irose Fashion e-commerce" 
                                    className="w-full h-full object-cover transform transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 md:col-span-2">
                                <ButtonCard
                                    title="Irose Fashion"
                                    text="A trendy e-commerce brand offering stylish and affordable clothing for fashion-forward individuals."
                                    text2="We designed and developed a modern, user-friendly e-commerce platform that enhances the shopping experience with an intuitive interface and seamless navigation."
                                    buttonText="View Project"
                                    onClick={() => navigate(ROUTES.PROJECTS.PATH)}
                                />
                            </div>
                            {/* <div className="md:col-span-4 overflow-hidden max-sm:hidden order-1 md:order-2">
                                <img 
                                    src={iroseImg} 
                                    alt="Irose Fashion e-commerce" 
                                    className="w-full h-full object-cover transform transition-transform duration-500"
                                />
                            </div> */}
                        </div>
                    </motion.section>

                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Button 
                        text="View All Projects" 
                        onClick={() => navigate(ROUTES.PROJECTS.PATH)}
                        className="px-8 py-3 text-lg font-medium"
                    />
                </motion.div>
            </div>
        </div>
    )
}