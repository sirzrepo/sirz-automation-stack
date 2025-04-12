import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import { toast } from "react-toastify";
import Loader from "../../../features/loader";
import { sirzLogo, sirzLogoWhite } from "../../../assets";
import { useAppSelector } from "../../../app/hook";
import { allReduxSliceInfo } from "../../../features/reduxSlice";

const DashboardLetterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isDarkMode } = useAppSelector(allReduxSliceInfo);
    const [formData, setFormData] = useState({
        whatDoYouSell: "",
        HaveStore: "",
        TargetedAudience: "",
        goalsForEcommWeb: "",
        preferredPlatform: "",
        importantFeatures: "",
        brandIdentity: "",
        customerExperience: "",
        budgetForProject: "",
        projectTimeline: "",
        trafficStrategy: "",
        needsSupport: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formattedData = {
            businessOverview: {
                productType: formData.whatDoYouSell,
                hasExistingStore: formData.HaveStore
            },
            targetingAndGoals: {
                targetMarket: formData.TargetedAudience,
                primaryGoals: formData.goalsForEcommWeb
            },
            platformPreferences: {
                preferredPlatform: formData.preferredPlatform,
                keyFeatures: formData.importantFeatures
            },
            designAndExperience: {
                brandIdentity: formData.brandIdentity,
                customerExperience: formData.customerExperience
            },
            budgetAndTimeline: {
                projectBudget: formData.budgetForProject,
                expectedLaunchDate: formData.projectTimeline
            },
            marketingStrategy: {
                trafficStrategy: formData.trafficStrategy,
                needsOngoingSupport: formData.needsSupport
            }
        };

        console.log("formattedData", formattedData);

        const payload = {
            subject: "New E-commerce Project Inquiry",
            text: JSON.stringify(formattedData, null, 2), // Formatted for readability in plain text
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>New E-commerce Project Inquiry</h2>
                    
                    <h3>Business Overview</h3>
                    <p><strong>Product Type:</strong> ${formattedData.businessOverview.productType}</p>
                    <p><strong>Existing Store:</strong> ${formattedData.businessOverview.hasExistingStore}</p>
                    
                    <h3>Target Audience & Goals</h3>
                    <p><strong>Target Market:</strong> ${formattedData.targetingAndGoals.targetMarket}</p>
                    <p><strong>Primary Goals:</strong> ${formattedData.targetingAndGoals.primaryGoals}</p>
                    
                    <h3>Platform Preferences</h3>
                    <p><strong>Preferred Platform:</strong> ${formattedData.platformPreferences.preferredPlatform}</p>
                    <p><strong>Key Features:</strong> ${formattedData.platformPreferences.keyFeatures}</p>
                    
                    <h3>Design & User Experience</h3>
                    <p><strong>Brand Identity:</strong> ${formattedData.designAndExperience.brandIdentity}</p>
                    <p><strong>Customer Experience:</strong> ${formattedData.designAndExperience.customerExperience}</p>
                    
                    <h3>Budget & Timeline</h3>
                    <p><strong>Project Budget:</strong> ${formattedData.budgetAndTimeline.projectBudget}</p>
                    <p><strong>Expected Launch:</strong> ${formattedData.budgetAndTimeline.expectedLaunchDate}</p>
                    
                    <h3>Marketing Strategy</h3>
                    <p><strong>Traffic Strategy:</strong> ${formattedData.marketingStrategy.trafficStrategy}</p>
                    <p><strong>Needs Ongoing Support:</strong> ${formattedData.marketingStrategy.needsOngoingSupport}</p>
                </div>
            `
        };

        try {
            const response = await axios.post(`${BASE_URL}/consultation-booking`, payload);
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
        <>
            <form onSubmit={handleSubmit} action="">
                <div className=" grid sm:grid-colws-2 gap-5 py-8     
                px-6 sm:mt-16 mt-10 border-b-[6px] border-s-[5px] border-e-[7px] border-colorGreen rounded-xl bg-white dark:bg-colorDefaultDark">
                    <header className="relative">
                        <div className=" sm:w-[70%]">
                            <h4 className=" font-bold">Let's get started</h4>
                            <p className="  max-sm:text-justify pt-1 sm:text-[13px] text-[13px]">
                                Please fill in the details correctly and let us know about the services you are interested in
                            </p>
                        </div>
                        <div className="absolute top-3 right-0"><img src={isDarkMode ? sirzLogoWhite : sirzLogo} alt="" className=" h-3" /></div>
                    </header>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"1)"}  Business OverView</h1>
                        <div className="relative pt-2">
                            <input
                                type="text"
                                name="whatDoYouSell"
                                value={formData.whatDoYouSell}
                                onChange={handleChange}
                                className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                placeholder={'Eg. Beauty products'}
                            />
                            <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'What type of Products do you sell?'}</div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"2)"}  Do you currently have an online store or is this your first e-commerce platform?</h1>

                        <div className="pt-2 sm:flex items-center sm:gap-6 grid grid-cols-1 gap-2">

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="HaveStore"
                                    value="yes"
                                    checked={formData.HaveStore === "yes"}
                                    onChange={() => handleRadioChange("HaveStore", "yes")}
                                    className="w-5 h-5 text-[#3ACBCC] border-[#3ACBCC] focus:ring-[#3ACBCC] checked:bg-[#3ACBCC]"
                                />
                                <span className="text-gray-700">I have an online store</span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="HaveStore"
                                    value="no"
                                    checked={formData.HaveStore === "no"}
                                    onChange={() => handleRadioChange("HaveStore", "no")}
                                    className="w-5 h-5 text-[#3ACBCC] border-[#3ACBCC] focus:ring-[#3ACBCC] checked:bg-[#3ACBCC]"
                                />
                                <span className="text-gray-700">This is my first e-commerce platform</span>
                            </label>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"3)"}  Target Audience and Goal</h1>
                        <section className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                            <div className="relative pt-2">
                                <input
                                    type="text"
                                    name="TargetedAudience"
                                    value={formData.TargetedAudience}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                    placeholder={'Eg. Women, men'}
                                />
                                <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'who is your target market'}</div>
                            </div>

                            <div className="relative pt-2">
                                <select
                                    name="goalsForEcommWeb"
                                    value={formData.goalsForEcommWeb}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                >
                                    <option value="">Select</option>
                                    <option value="increase_sales">Increase Sales</option>
                                    <option value="brand_awareness">Brand Awareness</option>
                                    <option value="customer_engagement">Customer Engagement</option>
                                </select>
                                <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Primary goals for the e-commerce website'}</div>
                            </div>
                        </section>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"4)"}  Platform and Features </h1>
                        <section className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                            <div className="relative pt-2">
                                <select
                                    name="preferredPlatform"
                                    value={formData.preferredPlatform}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                >
                                    <option value="">Select</option>
                                    <option value="shopify">Shopify</option>
                                    <option value="amazon">Amazon Store</option>
                                    <option value="tiktok">TikTok Shop</option>
                                    <option value="ebay">eBay</option>
                                    <option value="fb_ig">Facebook/Instagram Shop</option>
                                    <option value="woocommerce">WooCommerce</option>
                                    <option value="magento">Magento</option>
                                </select>
                                <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Do you have a preferred e-commerce platform?'}</div>
                            </div>

                            <div className="relative pt-2">
                                <select
                                    name="importantFeatures"
                                    value={formData.importantFeatures}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                >
                                    <option value="">Select</option>
                                    <option value="payment_gateways">Payment Gateways</option>
                                    <option value="inventory_management">Inventory Management</option>
                                    <option value="marketing_tools">Marketing Tools</option>
                                    <option value="automation">Automation</option>
                                </select>
                                <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'What features are most important for you?'}</div>
                            </div>
                        </section>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"5)"}  Design and User Experience </h1>
                        <section className="grid grid-cols-1 gap-3">
                            <div className="relative pt-2">
                                <input
                                    type="text"
                                    name="brandIdentity"
                                    value={formData.brandIdentity}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                    placeholder={'Eg. Beauty products'}
                                />
                                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'Do you have a brand identity or specific design requirements?'}</div>
                            </div>

                            <div className="relative pt-2">
                                <input
                                    type="text"
                                    name="customerExperience"
                                    value={formData.customerExperience}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                    placeholder={'Eg. Beauty products'}
                                />
                                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'What kind of customer experience are you aiming for?'}</div>
                            </div>
                        </section>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"6)"} Budget and Timeline</h1>
                        <section className="grid grid-cols-1 gap-3">
                            <div className="relative pt-2">
                                <input
                                    type="text"
                                    name="budgetForProject"
                                    value={formData.budgetForProject}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                    placeholder={'Eg. Beauty products'}
                                />
                                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'What is your budget for this project?'}</div>
                            </div>

                            <div className="relative pt-2">
                                <input
                                    type="text"
                                    name="projectTimeline"
                                    value={formData.projectTimeline}
                                    onChange={handleChange}
                                    className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                                    placeholder={'Eg. Beauty products'}
                                />
                                <div className=" absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'When do you need the e-commerce site to be fully operational?'}</div>
                            </div>
                        </section>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"7)"} Marketing and Growth Strategy</h1>
                        <div className="relative pt-2">
                            <select
                                name="trafficStrategy"
                                value={formData.trafficStrategy}
                                onChange={handleChange}
                                className={`w-full p-3 border border-gray-300 dark:bg-colorDefaultDark rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                            >
                                <option value="">Select</option>
                                <option value="seo">SEO</option>
                                <option value="paid_ads">Paid Ads</option>
                                <option value="social_media">Social Media Marketing</option>
                            </select>
                            <div className="absolute top-0 left-3 bg-white px-2 text-[12px] text-zinc-500 font-comfortaa dark:bg-colorDefaultDark">{'How do you plan to drive traffic to your store?'}</div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-2">
                        <h1>{"8)"} Do you need ongoing support for marketing and automation?</h1>

                        <div className="pt-2 sm:flex items-center sm:gap-6 grid grid-cols-1 gap-2">

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="yes"
                                    checked={formData.needsSupport === "yes"}
                                    onChange={() => handleRadioChange("needsSupport", "yes")}
                                    className="w-5 h-5 text-[#3ACBCC] border-[#3ACBCC] focus:ring-[#3ACBCC] checked:bg-[#3ACBCC]"
                                />
                                <span className="text-gray-700">Yes, I need</span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="no"
                                    checked={formData.needsSupport === "no"}
                                    onChange={() => handleRadioChange("needsSupport", "no")}
                                    className="w-5 h-5 text-[#3ACBCC] border-[#3ACBCC] focus:ring-[#3ACBCC] checked:bg-[#3ACBCC]"
                                />
                                <span className="text-gray-700">No, I don't need</span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="needsSupport"
                                    value="not_sure"
                                    checked={formData.needsSupport === "not_sure"}
                                    onChange={() => handleRadioChange("needsSupport", "not_sure")}
                                    className="w-5 h-5 text-[#3ACBCC] border-[#3ACBCC] focus:ring-[#3ACBCC] checked:bg-[#3ACBCC]"
                                />
                                <span className="text-gray-700">I am not sure yet</span>
                            </label>
                        </div>
                    </section>



                </div>

                <section className="mt-6">
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            <div className=" sm:w-[40%] w-[80%] max-sm:m-auto flex justify-end">
                                <button
                                    type="submit"
                                    className={`tracking-widest bg-white text-black rounded-full w-full max-sm:mt-5
                                'w-full flex align-center justify-center py-4 cursor-pointer text-sm px-8 font-medium floating-button`}
                                >
                                    Send message
                                </button>
                            </div>
                        )
                    }
                </section>
            </form>
        </>
    );
};

export default DashboardLetterForm;

