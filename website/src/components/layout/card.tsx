
// interface Idata {
//     title: string,
//     desc: string,
//     image: string
// }

// export default function Card(props: Idata) {
//     const { title, desc, image } = props;

//     return (
//         <div className=" cursor-pointer relative cardcontainer overflow-y-hidden mb-4 rounded-3xl h-[250px]">
//             <img src={image} alt="" className=' w-full object-cover h-full rounded-3xl' />
//             <div className=" absolute top-0 left-0 right-0 bottom-0  m-auto text-center cardButtonContainer flex items-center justify-center">
//                 <h4 className=' bg-[#2a84a0dd] text-white text-sm font-semibold max-w-[70%] p-2 rounded-sm'>{title}</h4>
//             </div>
//             <div className=' text-[16px]  text-white cardtext absolute bottom-0 p-2 rounded-t-3xl w-[90%] m-auto text-center hover:text-white'>
//                 <h4 className=' text-[18px] font-semibold pt-9'>{title}</h4>
//                 <div className='cardtext_desc text-zinc-400 pt-2'>{desc}</div>
//             </div>
//         </div>
//     )
// }


import { useEffect, useRef, useState } from 'react';

interface Idata {
  title: string;
  desc: string;
  image: string;
}

export default function Card(props: Idata) {
  const { title, desc, image } = props;
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const card = cardRef.current;
        const cardRect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the card is near the vertical center of the viewport
        const isInMiddle =
          cardRect.top + cardRect.height / 2 > windowHeight / 3 &&
          cardRect.top + cardRect.height / 2 < (2 * windowHeight) / 3;

        setIsActive(isInMiddle);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`cursor-pointer relative cardcontainer overflow-y-hidden mb-4 rounded-3xl h-[250px] ${
        isActive ? 'in-view' : ''
      }`}
    >
      <img src={image} alt="" className="w-full object-cover h-full rounded-3xl" />
      <div className="absolute top-0 left-0 right-0 bottom-0 m-auto text-center cardButtonContainer flex items-center justify-center">
        <h4 className="bg-[#2a84a0dd] text-white text-sm font-semibold max-w-[70%] p-2 rounded-sm">
          {title}
        </h4>
      </div>
      <div className="sm:text-[16px] text-[14px] text-white cardtext absolute bottom-0 p-2 rounded-t-3xl w-[90%] m-auto text-center hover:text-white">
        <h4 className="text-[18px] font-semibold pt-4">{title}</h4>
        <div className="cardtext_desc text-zinc-400 pt-2">{desc}</div>
      </div>
    </div>
  );
}

