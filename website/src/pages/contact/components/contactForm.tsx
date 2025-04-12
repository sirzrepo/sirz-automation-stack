import { useState } from "react";
import Button from "../../../components/common/button";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import { toast } from "react-toastify";
import Loader from "../../../features/loader";

const ContactLetterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        businessName: "",
        serviceType: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            from: formData.email,
            subject: "New Contact Request",
            text: `
                <div>
                <p>firstName: ${formData.firstName}</p>
                <p>lastName: ${formData.lastName}</p>
                <p>email: ${formData.email}</p>
                <p>phone: ${formData.phone}</p>
                <p>businessName: ${formData.businessName}</p>
                <p>service: ${formData.serviceType}</p>
                </div>
            `,
            html: `
                <div>
                <p>firstName: ${formData.firstName}</p>
                <p>lastName: ${formData.lastName}</p>
                <p>email: ${formData.email}</p>
                <p>phone: ${formData.phone}</p>
                <p>businessName: ${formData.businessName}</p>
                <p>service: ${formData.serviceType}</p>
                </div>
            `,
        }

        try {
            const response = await axios.post(`${BASE_URL}/contact`, payload)
            console.log("response", response);
            toast.success("Message sent successfully");
            setIsLoading(false);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error sending message");
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className=" grid sm:grid-cols-2 gap-5 py-8 ">

            <div className="relative pt-2">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                    placeholder={'Eg Chinonye'}
                />
                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'First name'}</div>
            </div>

            <div className="relative pt-2">
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                    placeholder={'Eg Umeh'}
                />
                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Last name'}</div>
            </div>

            <div className="relative pt-2">
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                    placeholder={'Eg chinonye@gmail.com'}
                />
                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Email address'}</div>
            </div>


            <div className="relative pt-2">
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                    placeholder={'Eg 905 889 9842'}
                />
                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Phone number'}</div>
            </div>

            <div className="relative pt-2">
                <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                    placeholder={'Eg Chinonye Limited'}
                />
                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Business name'}</div>
            </div>

            <div className="relative pt-2">
                <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                    placeholder={'Select service'}
                />
                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Service interested in'}</div>
            </div>

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className=" sm:w-[60%] w-[80%] max-sm:m-auto flex justify-end">
                        <Button text="Send message" onClick={() => { }} className="" />
                    </div>
                )
            }
        </form>
    );
};

export default ContactLetterForm;
