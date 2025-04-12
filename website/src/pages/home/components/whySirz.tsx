import HeaderFormat from "../../../components/header";
import { WhyIcon } from "../../../assets/icons/svg";

const data = [
    {
        description: `All-round transparency We prioritize your vision and preferences. Our platform allows you to review and approve all content, ensuring it meets your standards.`,
        backgroundColor: "#F9F6FF"
    },
    {
        description: `Low-cost, high quality Most agencies hit you with high charges before you even understand what you're getting into. We're a lean team. Our efficient workflows allow us to charge much less.`,
        backgroundColor: "#F8FCED"
    },
    {
        description: `Cancel anytime Your time is valuable. Stay as long as you love it – or leave whenever. No long-term contracts, no hassles`,
        backgroundColor: "#FFFCEB"
    },
    {
        description: `Expert strategies, seamless execution, and real results. We help businesses thrive with eCommerce, branding, and digital marketing solutions that work.`,
        backgroundColor: "#F0F0F0"
    },
]

export default function WhySirz() {
    return (
        <div className="sm:w-[85%] w-[90%] m-auto sm:mb-20 mt-20">
            <HeaderFormat title="Why Sirz" classNames="text-black dark:text-white" />
            <h4 className=" sm:font-bold py-6 sm:text-[27px] text-[20px] leading-9">The truth is, agencies are slow, pricey, and impersonal. Freelancers tend to provide inconsistent results. DIY tools? Barely scratch your itch like you want. We built SIRz for a better way, we offer;</h4>
            <section className={`sm:pr-4 py-6 rounded-xl grid sm:grid-cols-2 gap-8`}>
                {
                    data.map((item, index) => (
                        <section
                            key={index}
                            style={{ backgroundColor: item.backgroundColor }}
                            className={`sm:grid grid-cols-8 max-sm:flex items-center flex-col sm:gap-2 max-sm:px-4 rounded-2xl sm:ps-12 py-8 `}
                        >
                            {<WhyIcon />}
                            <div className="sm:text-[22px] text-lg col-span-7 dark:text-colorDark">
                                {item.description}
                            </div>
                        </section>
                    ))
                }
            </section>
        </div>
    )
}