import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes/desc';
import { BrandcomBg } from '../../../assets';
import { useEffect } from 'react';

export const BrandCom = () => {
    const navigate = useNavigate();
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls.start({ opacity: 1, y: 0 });
        };
        sequence();
    }, [controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
            },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4517eb] via-[#3a0ca3] to-[#4517eb] py-20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4517eb]/20 rounded-full filter blur-[100px] animate-float-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7B2CBF]/20 rounded-full filter blur-[120px] animate-float" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    className="max-w-5xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        className="relative inline-block mb-12"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img 
                            src={BrandcomBg} 
                            alt="Brandcom Platform Interface" 
                            className="mx-auto rounded-2xl shadow-2xl border-2 border-white/10"
                        />
                        <motion.div 
                            className="absolute -top-4 -right-4"
                            animate={controls}
                            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                            variants={{
                                visible: { 
                                    opacity: 1, 
                                    scale: 1, 
                                    rotate: 0,
                                    transition: { 
                                        type: 'spring', 
                                        stiffness: 100,
                                        damping: 10,
                                        delay: 0.5
                                    } 
                                }
                            }}
                        >
                            {/* <Sparkle className="w-16 h-16 text-yellow-400" /> */}
                        </motion.div>
                    </motion.div>

                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                    >
                        Create Your{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
                                Dream Brand
                            </span>
                            <span className="absolute bottom-3 left-0 w-full h-4 bg-white/20 -z-0 rounded-full blur-sm"></span>
                        </span>{' '}
                        with{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                AI Power
                            </span>
                            <span className="absolute bottom-3 left-0 w-full h-4 bg-purple-400/20 -z-0 rounded-full blur-sm"></span>
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        Brandcom is an AI-powered automation platform built to streamline branding, e-commerce, and digital marketing — all in one place.
                    </motion.p>
                    
                    <motion.div 
                        variants={itemVariants}
                        className="flex justify-center"
                    >
                        <motion.button 
                            onClick={() => window.open('https://brandcom.sirz.co.uk', '_blank')}
                            className="relative overflow-hidden group bg-white text-[#4517eb] hover:bg-gray-100 font-medium py-4 px-12 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <span>Learn More</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </span>
                        </motion.button>
                    </motion.div>
                    
                    <motion.div 
                        className="mt-16 flex flex-wrap justify-center gap-8 opacity-70"
                        variants={itemVariants}
                    >
                        {['AI-Powered', 'All-in-One Platform', 'Easy to Use', '24/7 Support'].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-white/80">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Animated floating elements */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/5 backdrop-blur-sm"
                    style={{
                        width: Math.random() * 20 + 10,
                        height: Math.random() * 20 + 10,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </section>
    );
};