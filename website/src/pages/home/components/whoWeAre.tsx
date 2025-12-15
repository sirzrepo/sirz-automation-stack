import Button from "../../../components/common/button";
import HeaderFormat from "../../../components/header";

export default function WhoAreWe() {

    return (
        <div className="sm:w-[85%] w-[90%] m-auto pt-8 ">
            <section className=" sm:grid grid-cols-2 gap-12 items-center text-sm justify-between pb-10">
                <div className=" text-left pt-10">
                    <section className="flex items-center gap-3  pb-5">
                        <HeaderFormat title="Who are we?" />
                    </section>
                    <header className="md:text-7xl sm:text-5xl text-4xl leading-tight font-bold">Ready to scale <i className=" text-colorBlueDeep">smarter?</i> Let’s make it happen.</header>
                    <div className="sm:w-[40%] w-[80%] py-8 ">
                        {/* <Button text="Learn more" onClick={() => navigate(ROUTES.SERVICE_BRANDING.PATH)} /> */}
                        <a href="https://client.sirz.co.uk/" target="_blank" rel="noopener noreferrer">
                            <Button text="Learn more" onClick={() => () => {}} />
                        </a>
                    </div>
                </div>
                <div className="text-2xl sm:text-3xl leading-8  text-justify font-normal ">
                    <div>
                    At SIRz, we don’t just offer services—we deliver a product-led technology stack designed to solve the core problems of scaling businesses.
                    </div>
                    <div className="mt-3">
                    With automation, CRM, and data insights built in, our subscription model helps you launch, grow, and scale seamlessly while we handle the heavy lifting.
                    </div>
                </div>
            </section>
        </div>
    )
}