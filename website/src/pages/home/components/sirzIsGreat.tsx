import { greatBg } from "../../../assets";

const data = [
    {
        description: `Are starting a new business and need help with e-commerce setup and branding`
    },
    {
        description: `Are making the leap from employee to business owner and want to establish a strong digital presence`
    },
    {
        description: `Are struggling to attract, retain and monetize customers and are seeking to run successful email campaigns`
    },
    {
        description: `Have an existing business and want to optimize processes and improve their online visibility`
    },
    {
        description: `Struggle with managing social media and need expert assistance to grow their online audience`
    },
    {
        description: `Want to improve their website's performance and require SEO-optimized content to boost search rankings`
    },
]

export default function SirzIsGreat() {
    return (
        <div
            style={{
                backgroundImage: `url(${greatBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'

            }} className=" sm:pt-24 pt-36 pb-5">
            <section className="sm:w-[85%] w-[90%] pb-10 m-auto">
                <h4 className="text-white font-semibold">SIRz is great for people who?</h4>
                <section className=" grid sm:grid-cols-3 pt-7 gap-x-5 gap-y-8 max-sm:m-auto">
                    {
                        data.map((item, index) => (
                            <div className="flex items-center justify-center bg-colorDefaultLight dark:bg-colorDark h-[200px] rounded-3xl">
                                <div key={index} className=" grid grid-cols-5 m-auto gap-2  px-8 text-left">
                                    <div className=" font-bold text-[30px] col-span-1 text-colorBlueDeep">0{index + 1}</div>
                                    <div className="text-[20px] col-span-4 ">{item.description}</div>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    )
}