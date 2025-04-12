import { ImArrowRight2 } from "react-icons/im";
import { MainCardBg } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes/desc";
import { BlogPost } from "../../../features/blogApi";
import { formatDate } from "../../../utils";

interface MainCardProps {
    blog?: BlogPost;
}

export default function MainCard({ blog }: MainCardProps) {
    const navigate = useNavigate();
    console.log("blog", blog)
    
    // Default values if no blog is provided
    const title = blog?.title || "Digital Marketing Trends You Can't Ignore in 2024";
    const date = blog?.createdAt ? formatDate(blog.createdAt) : "Wed, 8th Feb. 2025";
    const summary = blog?.summary || "Stay ahead of the competition with the latest marketing strategies! From AI-driven campaigns to social media shifts, here's what's shaping the digital landscape this year";
    const imageUrl = blog?.coverImage || MainCardBg;
    
    return (
        <div className=" bg-colorLight dark:bg-colorDark p-2 rounded-2xl pb-5">
            <img src={imageUrl} alt={title} className="w-full object-cover rounded-2xl h-[250px]" />
            <section className=" font-light text-[14px]">
                <div className="pt-4 pb-6">
                    <header className=" font-bold">{title}</header>
                    <div>{date}</div>
                </div>
                <div>
                    {summary}
                </div>
                <button
                    onClick={() => navigate(blog?._id ? `${ROUTES.BLOG.PATH}/${blog._id}` : ROUTES.BLOG.PATH)}
                    className="flex items-center gap-1 text-colorBlueDeep font-normal text-[17px] pt-5">
                    Read more
                    <ImArrowRight2 />
                </button>
            </section>
        </div>
    )
}