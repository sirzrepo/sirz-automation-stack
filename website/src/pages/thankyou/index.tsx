import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/routes/desc";

const ThankYouPage = () => {
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Hide confetti after animation completes
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Confetti particles animation
    const confettiColors = ['#3ACBCC', '#3752E9', '#71D9DA', '#CED7FE'];
    const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-colorGreenDeeper via-[#203DA3] to-colorBlueDeep relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Circles */}
            <motion.div
                className="absolute top-20 left-20 w-64 h-64 bg-colorGreen opacity-10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-colorBlueDeep opacity-10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {confettiParticles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: particle.color,
                                left: `${particle.x}%`,
                                top: '-10%',
                            }}
                            animate={{
                                y: ['0vh', '110vh'],
                                x: [0, Math.random() * 100 - 50],
                                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                                opacity: [1, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                ease: "easeIn",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2,
                        }}
                        className="mb-8 inline-block"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative"
                        >
                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-colorGreen to-colorGreenLight rounded-full flex items-center justify-center shadow-2xl">
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="w-20 h-20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <motion.path d="M20 6L9 17l-5-5" />
                                </motion.svg>
                            </div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 w-32 h-32 mx-auto bg-colorGreen rounded-full blur-xl opacity-40 animate-pulse" />
                        </motion.div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold font-comfortaa text-white mb-6"
                    >
                        Thank You!
                    </motion.h1>

                    {/* Subheading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl sm:text-3xl font-exo text-colorGreenLight mb-4">
                            We've Received Your Message!
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            Our team of experts will review your request and get back to you within 24 hours. 
                            We're excited to help your business grow and thrive in the digital space!
                        </p>
                    </motion.div>

                    {/* Additional Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-12"
                    >
                        {[
                            {
                                icon: "⚡",
                                title: "Quick Response",
                                description: "We'll get back to you within 24 hours"
                            },
                            {
                                icon: "🎯",
                                title: "Tailored Solutions",
                                description: "Customized strategies for your business"
                            },
                            {
                                icon: "📈",
                                title: "Proven Results",
                                description: "Data-driven approach to growth"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2 font-exo">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Call-to-Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => navigate(ROUTES.HOME.PATH)}
                                className="bg-gradient-to-r from-colorGreen to-colorGreenLight text-colorGreenDeeper font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 min-w-[200px]"
                            >
                                Return to Home
                            </button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => navigate(ROUTES.SERVICE_DIGITALMARKETING.PATH)}
                                className="bg-white/20 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 min-w-[200px]"
                            >
                                Explore Services
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Social Proof / Additional Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="mt-12 pt-8 border-t border-white/20"
                    >
                        <p className="text-gray-300 text-sm">
                            In the meantime, feel free to explore our case studies or connect with us on social media.
                        </p>
                        <div className="flex justify-center gap-6 mt-4">
                            {['LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    className="text-colorGreenLight hover:text-colorGreen transition-colors duration-300"
                                >
                                    {social}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ThankYouPage;
