import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import HeaderFormat from "../../../components/header";

export default function CustomerReviews() {
    return (
        <div className="bg-colorGreenDeeper text-colorDefaultLight py-10">
            <div className=" sm:w-[85%] w-[90%] m-auto relative">
                <HeaderFormat title="Customer success stories" />
                <h4 className=" sm:font-bold py-6 sm:text-[33px] text-[20px] max-sm:text-center">
                    "SIRz has been an exceptional partner for us. Their team is professional, knowledgeable,
                    and dedicated to customer service. Their collaborative approach was crucial in helping us
                    build our drop shipping infrastructure, which has been key to our success today and supports our long-term strategy."
                </h4>
                <div className=" text-[23px] max-sm:text-center pt-5">
                    Alex A Operations Manager, <br />
                    Domesticia Homes
                </div>
                <div className="flex items-center gap-6 sm:absolute max-sm:justify-center max-sm:pt-5 right-0 bottom-6">
                    <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-[20px] text-zinc-600">
                        <FaArrowLeftLong />
                    </div>
                    <div className="h-12 w-12 rounded-full bg-colorGreen flex items-center justify-center text-[20px] text-black">
                        <FaArrowRightLong />
                    </div>
                </div>
            </div>
        </div>
    )
}