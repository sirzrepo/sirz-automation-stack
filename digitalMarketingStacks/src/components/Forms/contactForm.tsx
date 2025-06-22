// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { SirzLogo } from "../../assets";
// import Loader from "../../features/loader";
// import { BASE_URL } from "../../utils";



// const AutomationContactForm = () => {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         website: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const payload = {
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             website: formData.website,
//         };

//         try {
//             const response = await axios.post(`${BASE_URL}/api/automations`, payload);
//             console.log("response", response);
//             toast.success("Message sent successfully!");
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Error sending message. Please try again.");
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit} action="">
//                 <div className=" pb-16
//                 sm:px-10 px-5 border-b-[6px] border-s-[5px] border-e-[7px] border-colorGreen rounded-xl bg-white dark:bg-colorDefaultDark">
//                     <header className="relative sm:py-12 pt-10">
//                         <div className=" sm:w-[70%]">
//                             <h4 className=" font-semibold text-[30px]">Let's get started</h4>
//                             <p className="  max-sm:text-justify pt-1 text-sm">
//                             Fill out the form below to receive your personalized Strategy PDF. It takes less than 2 minutes!
//                             </p>
//                         </div>
//                         <div className="absolute top-3 right-0"><img src={SirzLogo} alt="" className=" h-3" /></div>
//                     </header>

//                     <section className="grid sm:grid-cols-2 max-sm:pt-10 gap-5">
//                         <div className="relative pt-2">
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 className={`w-full p-5 mt-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
//                                 placeholder={'first name'}
//                             />
//                             <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'First Name'}</div>
//                         </div>

//                         <div className="relative pt-2">
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 className={`w-full p-5 mt-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
//                                 placeholder={'last name'}
//                             />
//                             <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Last Name'}</div>
//                         </div>

//                         <div className="relative pt-2">
//                             <input
//                                 type="text"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className={`w-full p-5 mt-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
//                                 placeholder={'email'}
//                             />
//                             <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Email Address'}</div>
//                         </div>

//                         <div className="relative pt-2">
//                             <input
//                                 type="text"
//                                 name="website"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 className={`w-full p-5 mt-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
//                                 placeholder={'website'}
//                             />
//                             <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Website (optional)'}</div>
//                         </div>
//                     </section>
//                 </div>

//                 <section className="mt-6">
//                     {
//                         isLoading ? (
//                             <Loader />
//                         ) : (
//                             <div className=" sm:w-[30%] w-[80%] max-sm:m-auto flex justify-end">
//                                 <button
//                                     type="submit"
//                                     className={`tracking-widest bg-white text-black rounded-full w-full max-sm:mt-5
//                                 'w-full flex align-center justify-center py-5 cursor-pointer text-sm px-8 font-medium floating-button`}
//                                 >
//                                     Claim mt strategy PDF
//                                 </button>
//                             </div>
//                         )
//                     }
//                 </section>
//             </form>
//         </>
//     );
// };

// export default AutomationContactForm;



import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SirzLogo } from "../../assets";
import Loader from "../../features/loader";
import { BASE_URL } from "../../utils";

const AutomationContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        website: "",
    });

    const isFormValid = () =>
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${BASE_URL}/api/automations`, formData);
            toast.success("Message sent successfully!");
            setFormData({ firstName: "", lastName: "", email: "", website: "" });
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error sending message. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border-l-4 border-b-4 border-colorGreen shadow-md p-6 sm:p-10 space-y-8"
        >
            {/* Header */}
            <div className="relative">
                <div className="max-w-md space-y-2">
                    <h2 className="text-xl font-bold text-gray-800">
                        Let's Get Started
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Fill out the form below to receive your personalized strategy PDF. 
                        It takes less than 2 minutes!
                    </p>
                </div>
                <img src={SirzLogo} alt="Sirz Logo" className="absolute top-1 right-0 h-4 sm:h-5" />
            </div>

            {/* Input Fields */}
            <div className="grid sm:grid-cols-2 gap-5">
                {[
                    { name: "firstName", label: "First Name", placeholder: "Enter your first name" },
                    { name: "lastName", label: "Last Name", placeholder: "Enter your last name" },
                    { name: "email", label: "Email Address", placeholder: "Enter your email" },
                    { name: "website", label: "Website (optional)", placeholder: "e.g. yoursite.com" },
                ].map(({ name, label, placeholder }) => (
                    <div key={name} className="relative">
                        <label
                            htmlFor={name}
                            className="text-xs font-medium text-gray-500 px-1 mb-1 block"
                        >
                            {label}
                        </label>
                        <input
                            id={name}
                            type="text"
                            name={name}
                            value={formData[name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full p-3 rounded-lg bg-white border border-gray-300 placeholder:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-end">
                {isLoading ? (
                    <Loader />
                ) : (
                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                            isFormValid()
                                ? "bg-colorGreen text-white hover:bg-green-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Claim My Strategy PDF
                    </button>
                )}
            </div>
        </form>
    );
};

export default AutomationContactForm;

