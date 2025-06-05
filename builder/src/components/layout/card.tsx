import { motion } from 'framer-motion';

export const SmartFeatureCard = ( { title, description, img, icon, color }: { title: string, description: string, img: string, icon: string, color: string } ) => {
  return (
    <div className="">
      <div className="bg-white sm:p-16 p-8 rounded-lg border text-left">
        <img src={icon} alt="" className="w-14 h-14 mb-12" />
        <h2 className="sm:text-4xl text-3xl font-extrabold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        <div style={{ color }} className={`font-semibold underline mb-6`}>
          Learn more
        </div>
            
        
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <img src={img} alt="" className="object-cover mx-auto " />
        </motion.div>
      </div>
    </div>
  );
};
