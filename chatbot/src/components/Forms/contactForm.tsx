import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { SirzLogo } from "../../assets";
import Loader from "../../features/loader";
import { BASE_URL } from "../../utils";
import { FiSend, FiUser, FiMail, FiGlobe } from "react-icons/fi";



const AutomationContactForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        website: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            website: formData.website,
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/chatbot`, payload);
            // const response = await axios.post(`http://localhost:5000/api/chatbot`, payload);
            console.log("response", response);
            toast.success("Message sent successfully!");
            setIsLoading(false);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error sending message. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto sm:px-4 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row bg-white dark:bg-colorDefaultDark sm:rounded-2xl overflow-hidden shadow-xl"
            >
                {/* Illustration Side */}
                <motion.div 
                    className="w-full md:w-1/2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className="relative w-full h-64 md:h-full">
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/20 rounded-full"
                        ></motion.div>
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full"
                        ></motion.div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <FiSend className="w-16 h-16 mx-auto text-white mb-4" />
                            <h3 className="text-2xl font-bold text-white">Let's Connect!</h3>
                            <p className="text-white/80 mt-2">We'll get back to you soon</p>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side */}
                <div className="w-full bg-white md:w-1/2 p-8">
                    <form onSubmit={handleSubmit}>
                        <header className="mb-8 relative">
                            <div className="flex justify-between items-start">
                                <div className="max-w-[80%]">
                                    <h4 className="text-2xl font-bold text-gray-800 ">Let's get started</h4>
                                    <p className="text-gray-600 mt-2 text-sm">
                                        Fill out the form below to receive your personalized Strategy PDF. It takes less than 2 minutes!
                                    </p>
                                </div>
                                <div className="">
                                    <img src={SirzLogo} alt="Sirz Logo" className="h-4" />
                                </div>
                            </div>
                        </header>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Email Address"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiGlobe className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Website (optional)"
                                />
                            </div>

                            <div className="pt-4">
                                {isLoading ? (
                                    <div className="flex justify-center">
                                        <Loader />
                                    </div>
                                ) : (
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg font-medium text-sm tracking-wider hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <FiSend className="h-5 w-5" />
                                        <span>Claim My Strategy PDF</span>
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AutomationContactForm;

