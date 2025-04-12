import { useNavigate } from "react-router-dom";
import { ExperticeImgOne, ExperticeImgThree, ExperticeImgTwo, rectangleBlue, sirzLogo } from "../../../assets";
import HeaderFormat from "../../../components/header";
import ImageCard from "../../../components/layout/cards/imageCard";
import { ROUTES } from "../../../constants/routes/desc";

export default function OurExpertise() {
    const navigate = useNavigate();

    const data = [
        {
            title: "E-commerce",
            description: "Launch & Scale Your Online Store with Ease",
            image: ExperticeImgOne,
            url: ROUTES.SERVICE_ECOMMERCE.PATH
        },
        {
            title: "Branding",
            description: "Build a Brand that Stands Out & Sells",
            image: ExperticeImgTwo,
            url: ROUTES.SERVICE_BRANDING.PATH
        },
        {
            title: "Digital Marketing",
            description: " Get Noticed. Get Customers. Get Results",
            image: ExperticeImgThree,
            url: ROUTES.SERVICE_DIGITALMARKETING.PATH
        },
    ];

    return (
        < section
            // style={{
            //     backgroundImage: `url(${rectangleBlue})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
            className=" relative " >
            <div className=" ">
                <div className="">
                    <img src={rectangleBlue} alt="" className="w-full sm:h-[200px] md:h-[150px] h-[100px] object-top object-cover " />
                    <div className=" bg-white absolute top-5 z-10 h-24 w-24 m-auto right-0 left-0 flex justify-center rounded-full">
                        <img src={sirzLogo} alt="" className="w-[60px]" />
                    </div>
                </div>

                <div className=" bg-colorBlueDeep pb-5 ">
                    <div className=" sm:ps-24 ps-5 pb-10 text-left">
                        <HeaderFormat title="Our Expertise" classNames="text-white" />
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 sm:w-[85%] w-[90%] m-auto gap-8">
                        {
                            data.map((item, index) => (
                                <div key={index}>
                                    <ImageCard
                                        onClick={() => navigate(item.url)}
                                        image={item.image}
                                        description={item.description}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}