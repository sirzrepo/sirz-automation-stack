import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/button";
import HeaderFormat from "../../../components/header";
import { ROUTES } from "../../../constants/routes/desc";

export default function WhoAreWe() {
    const navigate = useNavigate()

    return (
        <div className="sm:w-[85%] w-[90%] m-auto pt-8 ">
            <section className=" sm:grid grid-cols-2 gap-12 items-center text-sm justify-between pb-10">
                <div className=" text-left pt-10">
                    <section className="flex items-center gap-3  pb-5">
                        <HeaderFormat title="Who are we?" />
                    </section>
                    <header className="sm:text-[40px] text-[30px] leading-tight font-bold">Ready to build a <i className=" text-colorBlueDeep">brand</i> that thrives? Let's make it happen!</header>
                    <div className="sm:w-[40%] w-[80%] py-8 ">
                        <Button text="Learn more" onClick={() => navigate(ROUTES.SERVICE_BRANDING.PATH)} />
                    </div>
                </div>
                <div className="text-[20px] leading-8 text-zinc-500 text-justify font-normal ">
                    <div>
                        At SIRz, we don’t just build brands—we fuel their success. As your one-stop shop for E-commerce, Branding, and Digital Marketing, we help businesses launch, scale, and dominate in the digital space.
                    </div>
                    <div>
                        With a team of creatives, strategists, and tech experts, we blend innovation with data-driven results—so you can focus on growing while we handle the heavy lifting.
                    </div>
                </div>
            </section>
        </div>
    )
}