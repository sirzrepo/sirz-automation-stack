import Button from "../../../components/common/button";
import HeaderFormat from "../../../components/header";
import { BlogCardFour, BlogCardOne, BlogCardThree, BlogCardTwo, domesticiaImg, InstagramBg, iroseImg } from "../../../assets";
import ButtonCard from "../../../components/layout/cards/buttonCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes/desc";

export default function OurProjects() {
    const navigate = useNavigate();

    const imageData = [
        BlogCardOne,
        BlogCardTwo,
        BlogCardThree,
        BlogCardFour,
    ]
    return (
        <div>
            <div className="py-10 w-[90%] m-auto">
                <HeaderFormat title="Explore our projects" classNames="text-black dark:text-white" />
                <section className="sm:flex items-start justify-between gap-6">
                    <h4 className=" font-bold py-6 text-[27px] sm:w-[80%] w-[100%] leading-9">
                        We take ideas and turn them into powerful digital solutions. Check out some of our latest projects and see how we help businesses thrive!
                    </h4>
                    <div className="sm:w-[20%] w-[80%]">
                        <Button text="View all projects" onClick={() => navigate(ROUTES.PROJECTS.PATH)} />
                    </div>
                </section>

                <section className="grid sm:grid-cols-3 gap-8 pt-10 pb-12 ">
                    <img src={domesticiaImg} alt="" className=" sm:col-span-2" />
                    <ButtonCard
                        title="Domesticia"
                        text="Domestica is an e-commerce platform that offers a curated selection of premium home essentials."
                        text2="From stylish decor to everyday household items, Domestica makes online shopping seamless, delivering quality products with ease."
                        buttonText="view projects"
                        onClick={() => navigate(ROUTES.PROJECTS.PATH)}
                    />
                </section>

                <section className="grid sm:grid-cols-3 pb-12 gap-8 ">
                    <img src={iroseImg} alt="" className=" sm:hidden sm:col-span-2" />
                    <ButtonCard
                        title="Irose Fashion"
                        text="Irose Fashion is a trendy e-commerce brand that offers stylish and affordable clothing for fashion-forward individuals.
                            We designed and developed a modern, user-friendly e-commerce platform that enhances the shopping experience. The website features an intuitive interface, seamless navigation, and visually appealing product displays, making it easy for customers to browse and shop effortlessly."
                        buttonText="view projects"
                        onClick={() => navigate(ROUTES.PROJECTS.PATH)}
                    />
                    <img src={iroseImg} alt="" className="  max-sm:hidden sm:col-span-2" />
                </section>
            </div>
            <section
                style={{
                    backgroundImage: `url(${InstagramBg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: 'center'
                }}
                className="sm:h-[550px] sm:overflow-y-hidden mb-10 "
            >
                <div className=" bg-[#000000a8] py-8 ">
                    <div className=" w-[90%] m-auto grid sm:grid-cols-2 grid-cols-1 gap-8 ">
                        <div className="sm:w-[90%] sm:pt-20 text-white">
                            <HeaderFormat title={'Social media Management'} />
                            <div className="sm:py-10 py-2 sm:text-[30px] text-[20px] font-semibold">
                                Helping brands grow their online presence through engaging content, strategy, and community management.
                            </div>
                            <div className="w-[80%]">
                                <Button text='Contact us to get started' onClick={() => navigate(ROUTES.CONTACT.PATH)} />
                            </div>
                        </div>
                        <div className=" grid grid-cols-2">
                            {
                                imageData.map((data, index) => (
                                    <div key={index}>
                                        <img src={data} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}