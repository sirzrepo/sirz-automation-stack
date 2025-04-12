import { useRef } from "react";
import { IImageCard } from "../../../constants/types";
import { ImArrowUpRight2 } from "react-icons/im";

export default function ImageCard(props: IImageCard) {
    const { title, description, image, onClick } = props;
    const animatedCardRef = useRef<HTMLDivElement>(null);


    return (
        <div
            ref={animatedCardRef}

            className={`relative bg-colorGreenDeeper overflow-y-hidden mb-4 text-[20px] font-semibold text-white rounded-3xl sm:h-[400px] h-[420px] `}
        >
            <header className=" border-b-2 flex items-center justify-between py-5 px-4 mx-1">
                <h4 className="">{title}</h4>
                <div
                    onClick={onClick}
                    className=" bg-colorGreen cursor-pointer text-black hover:text-white h-12 w-12 flex items-center justify-center rounded-full">
                    <ImArrowUpRight2 className="" />
                </div>
            </header>
            <section className="h-[200px] p-4">
                <img src={image} alt="" className=' w-full object-cover h-full rounded-2xl' />
            </section>
            <div className='w-[85%] m-auto'>
                <p className=""> {description}</p>
            </div>
        </div>
    )
}