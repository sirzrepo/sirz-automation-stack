import { useState } from "react";
import Button from "../../components/common/button";
// import axios from "axios";
// import { BASE_URL } from "../../utils";
// import { toast } from '../../'
import Loader from "../../features/loader";
import { GoogleLog, orLogo, SirzLogo } from "../../assets";
import { useAuth } from "../../context/AuthContext";

const ContactLetterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
    });
    const { login } = useAuth();
    const password= '12345678';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Here you would typically make an API call to verify the email
            // For now, we'll just simulate a successful login
            await new Promise(resolve => setTimeout(resolve, 1000));
            login(formData.email, password);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="py-12 px-6 sm:mt-16 mt-10 border-b-[6px] border-e-[7px] border-colorGreen rounded-xl bg-white dark:bg-colorDefaultDark">
            <section className="">
                <div className="flex justify-center items-center mb-10">
                    <img src={SirzLogo} alt="" />
                </div>

                <div className="text-center mb-7">
                    <h1 className="text-[25px] font-bold font-Helvetica mb-6">Welcome to your SIRz Portal</h1>
                    <p>Please enter your email address</p>
                </div>

                <div className="relative pt-2 mb-8">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary"
                        placeholder="Eg chinonye@gmail.com"
                        required
                    />
                    <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">
                        Email address
                    </div>
                </div>

                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="max-sm:m-auto flex justify-center">
                        <Button 
                            text="Sign In" 
                            type="submit"
                            onClick={() => {}}
                            className="w-full text-[14px] font-semibold" 
                        />
                    </div>
                )}

                <div className="flex flex-col justify-center items-center mt-6">
                    <img src={orLogo} alt="" />
                </div>

                <div className="border-[1.4px] cursor-pointer p-3 flex gap-4 items-center justify-center mt-5 hover:bg-slate-50">
                    <img src={GoogleLog} alt="" />
                    <h1>Continue with Google</h1>
                </div>
            </section>
        </form>
    );
};

export default ContactLetterForm;
