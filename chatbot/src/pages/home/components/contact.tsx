import { HeroImg } from "../../../assets";
import AutomationContactForm from "../../../components/Forms/contactForm";
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <motion.section 
         style={{
            backgroundImage: `url(${HeroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        className="bg-colorLight dark:bg-colorDark py-10 bg-dashboard-form-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        >
        <header className='flex items-center max-w-[800px] mx-auto text-white px-4 justify-center py-5'>
            <div className='text-center max-w-[800px] mx-auto px-4'>
                <h1 className='font-semibold text-[35px]'>Get in Touch Today</h1>
                <i>No fluff. Just results</i>
            </div>
        </header>
        <div className="lg:w-[60%] md:w-[90%] mx-auto sm:mt-8 mt-5 sm:px-4">
            <AutomationContactForm />
        </div>
        </motion.section>
    );
}