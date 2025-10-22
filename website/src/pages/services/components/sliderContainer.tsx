import { useState } from "react";
import { startSmallImg } from "../../../assets";
import Slider from "./slider";

// branding slider images
// brand
import brandSilderOne from './brandingSlider/brand/Synflex Billboard.png';
import brandSilderTwo from './brandingSlider/brand/Product Design Asset 4.jpg';
import brandSilderThree from './brandingSlider/brand/Branding 3 (1).png';
import brandSilderFour from './brandingSlider/brand/Product Design 7.jpg';
import brandSilderFive from './brandingSlider/brand/Branding 2 (2).png';

// client logos
import clientLogosSliderOne from './brandingSlider/clientLogos/Synflex Wallpaper.png';
import clientLogosSliderTwo from './brandingSlider/clientLogos/Branding 5.png';
import clientLogosSliderThree from './brandingSlider/clientLogos/Wallpaper.png';
import clientLogosSliderFour from './brandingSlider/clientLogos/Wallpaper2.png';
import clientLogosSliderFive from './brandingSlider/clientLogos/iroseLogo.jpeg';

// instagram ads
import instagramSliderOne from './brandingSlider/instagramAds/8.png';
import instagramSliderTwo from './brandingSlider/instagramAds/9.png';
import instagramSliderThree from './brandingSlider/instagramAds/5.png';
import instagramSliderFour from './brandingSlider/instagramAds/6.png';
import instagramSliderFive from './brandingSlider/instagramAds/7.png';

// landing pages
import landingPagesSliderOne from './brandingSlider/landingPages/img4.png';
import landingPagesSliderTwo from './brandingSlider/landingPages/img1.png';
import landingPagesSliderThree from './brandingSlider/landingPages/img2.png';
import landingPagesSliderFour from './brandingSlider/landingPages/img3.png';
import landingPagesSliderFive from './brandingSlider/landingPages/img5.png';

// instagram ads slider images
// export const brandSliderImg = [
//     brandSilderOne,
//     brandSilderTwo,
//     brandSilderThree,
// ];

// landing pages slider images
export const landingPagesSliderImg = [
    landingPagesSliderOne,
    landingPagesSliderTwo,
    landingPagesSliderThree,
    landingPagesSliderFour,
    landingPagesSliderFive,
];

// brand systems slider images
export const brandSystemsSliderImg = [
    brandSilderOne,
    brandSilderTwo,
    brandSilderThree,
    brandSilderFour,
    brandSilderFive,
];

// client logos slider images
export const clientLogosSliderImg = [
    clientLogosSliderOne,
    clientLogosSliderTwo,
    clientLogosSliderThree,
    clientLogosSliderFour,
    clientLogosSliderFive,
];

// instagram ads slider images
export const instagramSliderImg = [
    instagramSliderOne,
    instagramSliderTwo,
    instagramSliderThree,
    instagramSliderFour,
    instagramSliderFive,
];

// Dummy image arrays for different project types
const projectImages = {
    "Instagram Ads": instagramSliderImg,
    "Landing Pages": landingPagesSliderImg,
    "Brand Systems": brandSystemsSliderImg,
    "Client Logos": clientLogosSliderImg,
};

export default function SliderContainer() {
    const [activeProject, setActiveProject] = useState<string>("Instagram Ads");
    
    const projectHeaders = [
        { title: "Instagram Ads", url: "#" },
        { title: "Landing Pages", url: "#" },
        { title: "Brand Systems", url: "#" },
        { title: "Client Logos", url: "#" },
    ];

    const handleProjectClick = (title: string) => {
        setActiveProject(title);
    };

    return (
        <div>
            <div className="pt-8">
                {/* Header Section */}
                <section className="w-[95%] sm:w-[85%] m-auto py-10 ">
                    <div className="flex gap-3 items-center mb-2">
                        <img src={startSmallImg} alt="" className="w-5 sm:w-6" />
                        <h2 className="font-bold text-lg sm:text-xl">See Our Work</h2>
                    </div>

                    <div>
                        <h1 className="text-lg sm:text-2xl lg:text-3xl font-medium italic leading-snug">
                        Explore how SIRz has helped brands evolve from static visuals to scalable, AI-powered identities.
                        </h1>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="w-full m-auto mb-7 bg-colorLight dark:bg-colorDark">
                    <div className="w-[90%] m-auto p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {projectHeaders.map((item, index) => {
                            const isActive = activeProject === item.title;
                            return (
                                <section 
                                    key={index}
                                    onClick={() => handleProjectClick(item.title)}
                                    className={`h-[11vh] flex justify-center items-center rounded-lg 
                                        shadow-md cursor-pointer transition-all py-8 text-center
                                        ${isActive 
                                            ? 'bg-colorGreenDeeper border-b-[6px] border-colorGreen text-white' 
                                            : 'bg-white text-[#001f3e] hover:bg-colorGreen hover:text-white'}
                                        `}
                                >
                                    <h1 className="font-medium m-auto h-[90%] w-[99.9%] flex justify-center items-center">
                                        {item.title}
                                    </h1>
                                </section>
                            );
                        })}
                    </div>
                </section>
            </div>
            <div className="pt-10 pb-5">
                <Slider imageArray={projectImages[activeProject as keyof typeof projectImages] || []} />
            </div>
        </div>
    )
}