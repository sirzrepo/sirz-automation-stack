import { useNavigate } from "react-router-dom";
import { BlogCardFour, BlogCardOne, BlogCardThree, BlogCardTwo, InstagramBg } from "../../../assets";
import HeaderFormat from "../../../components/header";
import { ROUTES } from "../../../constants/routes/desc";
import Button from "../../../components/common/button";

export const SocialMedia = () => {
    const navigate = useNavigate();
    return (
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
                                    <div className="sm:py-10 py-2 sm:text-4xl text-2xl font-semibold">
                                        Helping brands grow their online presence through engaging content, strategy, and community management.
                                    </div>
                                    <div className="w-[80%]">
                                        <Button text='Contact us to get started' onClick={() => navigate(ROUTES.CONTACT.PATH)} />
                                    </div>
                                </div>
                                <div className=" grid grid-cols-2">
                                    {
                                        [BlogCardOne, BlogCardTwo, BlogCardThree, BlogCardFour].map((data, index) => (
                                            <div key={index}>
                                                <img src={data} alt="" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
    );
};