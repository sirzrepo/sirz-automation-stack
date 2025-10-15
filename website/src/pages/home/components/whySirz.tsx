import HeaderFormat from "../../../components/header";
import { WhyIcon } from "../../../assets/icons/svg";

const data = [
    {
        description: `All-in-one transparency – Review, approve, and track everything in one place. No guesswork, no hidden costs.`,
        backgroundColor: "#F9F6FF"
    },
    {
        description: `Affordable, premium quality – Subscription-based pricing gives you enterprise-grade tools without agency-level fees.`,
        backgroundColor: "#F8FCED"
    },
    {
        description: `Flexible & commitment-free – Stay as long as you love it. Cancel anytime—no long-term contracts or lock-ins.`,
        backgroundColor: "#FFFCEB"
    },
    {
        description: `Proven growth framework – Our AI-powered 3-layer stack combines automation, CRM, and insights to deliver real, measurable results.`,
        backgroundColor: "#F0F0F0"
    },
]

export default function WhySirz() {
    return (
        <div className="max-w-7xl px-6 m-auto sm:mb-20 mt-20">
            <HeaderFormat title="Why Sirz" classNames="text-black dark:text-white" />
            <h4 className=" sm:font-bold py-6 sm:text-4xl text-2xl leading-9">Traditional options slow you down:</h4>
            <div className="flex flex-col gap-2 text-xl">
                <li>Agencies are expensive and impersonal.</li>
                <li>Freelancers deliver inconsistent results.</li>
                <li>DIY tools barely scratch the surface.</li>
            </div>
            <h4 className=" sm:font-bold py-6 sm:text-4xl text-2xl leading-9">We built SIRz for a better way—a scalable, product-led automation stack that helps e-commerce brands grow faster, smarter, and without the usual overhead.</h4>
            <div className="py-6 text-xl">Here&apos;s why businesses choose us:</div>
            <section className={`sm:pr-4 py-6 rounded-xl grid sm:grid-cols-2 gap-8`}>
                {
                    data.map((item, index) => (
                        <section
                            key={index}
                            style={{ backgroundColor: item.backgroundColor }}
                            className={`md:grid grid-cols-8 sm:gap-2 max-sm:px-4 rounded-2xl md:ps-12 sm:ps-4 py-8 `}
                        >
                            {<WhyIcon />}
                            <div className="sm:text-2xl text-xl col-span-7 dark:text-colorDark">
                                {item.description}
                            </div>
                        </section>
                    ))
                }
            </section>
        </div>
    )
}