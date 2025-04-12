
import { useEffect, useRef, useState } from 'react';

interface Idata {
  title: string;
  desc: string;
  image: string;
}

export default function ProjectCard(props: Idata) {
  const { title, desc, image } = props;
  const [isActive, setIsActive] = useState(false);
  const projectcardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (projectcardRef.current) {
        const card = projectcardRef.current;
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
      ref={projectcardRef}
      className={`cursor-pointer relative hideScrollBar overflow-hidden projectcardcontainer overflow-y-hidden mb-4 h-[300px] ${
        isActive ? 'in-view' : ''
      }`}
    >
      <img src={image} alt="" className="w-full object-cover h-full " />
      <div className="sm:text-[16px] text-[14px] projectcardtext bg-[#f4f5f7a8] dark:bg-[#000000a8] absolute bottom-0 p-2  w-[95%] rounded-tr-2xl m-auto text-center hover:text-white">
        <h4 className="text-[18px] dark:text-primary_light text-primary_dark font-semibold pt-4">{title}</h4>
        <div className="projectcardtext_desc dark:text-zinc-200 text-zinc-800 pt-2">{desc}</div>
      </div>
    </div>
  );
}

