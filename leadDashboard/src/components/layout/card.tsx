import { motion } from 'framer-motion';

export const SmartFeatureCard = ( { title, description, img }: { title: string, description: string, img: string } ) => {
  return (
    <div className="">
      <div className="bg-[#FBF9F9] sm:p-16 p-8 rounded-lg shadow-md text-center">
        <h2 className="sm:text-3xl text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <img src={img} alt="" className="object-cover mx-auto h-[200px]" />
        </motion.div>
      </div>
    </div>
  );
};
