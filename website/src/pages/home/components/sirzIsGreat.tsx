import { greatBg } from "../../../assets";

const data = [
    {
        description: `Are launching a new business and want a ready-to-go e-commerce growth stack without hiring a full team.`
    },
    {
        description: `Are transitioning from employee to entrepreneur and need a scalable digital foundation powered by automation.`
    },
    {
        description: ` Struggle to attract, retain, and monetize customers—and want automated campaigns that convert consistently.`
    },
    {
        description: `Already run a business but want to optimize operations, streamline workflows, and cut inefficiencies.`
    },
    {
        description: `Feel overwhelmed by managing multiple tools and want a centralized CRM + automation hub that keeps everything in sync.`
    },
    {
        description: `Want to unlock data-driven growth, with real-time insights and SEO-optimized visibility to boost performance.`
    },
]

export default function SirzIsGreat() {
    return (
        <div
            style={{
                backgroundImage: `url(${greatBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'

            }} 
            className=" sm:pt-30 pt-40 pb-10"
        >
            <section className="max-w-7xl mx-auto w-[90%] pb-10">
                <h4 className="text-white text-xl font-semibold">SIRz is great for people who?</h4>
                <section className=" grid md:grid-cols-3 pt-7 gap-x-5 gap-y-8 max-sm:m-auto">
                    {
                        data.map((item, index) => (
                            <div className="flex items-center justify-center bg-colorDefaultLight dark:bg-colorDark h-[200px] rounded-3xl">
                                <div key={index} className=" grid grid-cols-5 m-auto gap-2  px-8 text-left">
                                    <div className=" font-extrabold text-5xl col-span-1 text-colorBlueDeep">0{index + 1}</div>
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