import { useState } from "react";
import { BASE_URL } from "../../../utils";
import axios from 'axios'
import { toast } from "react-toastify";
import Loader from "../../../features/loader";

export default function NewsLetterFunction() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        const payload = {
            from: formData.email,
            subject: "Newsletter Signup",
            text: `I just signed up for your newsletter, my email is ${formData.email}`,
            html: `I just signed up for your newsletter, my email is ${formData.email}`,
        }

        try {
            const response = await axios.post(`${BASE_URL}/subscribe`, payload)
            console.log("response", response);
            toast.success("You've successfully subscribed to our newsletter");
            setIsLoading(false);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error subscribing to the newsletter");
            setIsLoading(false);
        }
    };


    return (
        <div className="sm:w-[50%] w-[90%] m-auto text-white">
            <div className="flex items-center justify-center flex-col text-center m-auto">
                <header className='sm:text-[45px] text-[30px] italic font-bold'>Join Our Newsletter</header>
                <div className='text-[20px] m-auto pt-4'>Subscribe to receive our latest updates in your inbox!</div>
            </div>
            <form onSubmit={handleSubmit} className=' sm:grid sm:grid-cols-5 gap-4 pt-14'>
                <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    className=" bg-transparent border border-white rounded-full w-full col-span-3 py-4 px-4 placeholder:text-white text-sm"
                    placeholder="Input your email"
                />
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <button className={` tracking-widest sm:col-span-2 bg-white text-black rounded-full sm:w-full w-[100%] max-sm:mt-5
                            'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button  
                            `}
                            onClick={() => { }}>
                            Sign up
                        </button>
                    )
                }


            </form>
        </div>
    )
}