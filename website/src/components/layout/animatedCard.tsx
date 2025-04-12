import { useEffect, useRef, useState } from "react";

interface Idata {
    title: string,
    desc: string,
    index: number,
    image: string
}

export default function AnimatedCard(props: Idata) {
    const { title, desc, index, image } = props;
    const [isActive, setIsActive] = useState(false);
    const animatedCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (animatedCardRef.current) {
                const card = animatedCardRef.current;
                const cardRect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                const isInMiddle =
                    cardRect.top + cardRect.height / 2 > windowHeight / 3 &&
                    cardRect.top + cardRect.height / 2 < (2 * windowHeight) / 3;

                setIsActive(isInMiddle)
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            ref={animatedCardRef}
            className={`relative animatedcardcontainer overflow-y-hidden mb-4 rounded-3xl sm:h-[350px] h-[420px] ${isActive ? 'in-view' : ''}`}
        >
            <img src={image} alt="" className=' w-full object-cover h-full rounded-3xl' />
            <div className='bg-[#F9FCFF] dark:bg-background_dark dark:text-background_light animatedcardtext overflow-y-scroll hideScrollBar absolute bottom-0 p-2 rounded-3xl rounded-br-none sm:w-[90%] w-[95%]'>
                <p className=" text-zinc-400">Step {index}</p>
                <h4 className=' py-0 text-secondary text-[16px] font-semibold'>{title}</h4>
                <div className='animatedcardtext_desc text-[14px] text-justify text-zinc-200'>{desc}</div>
            </div>
        </div>
    )
}