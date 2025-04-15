import { ImArrowRight2 } from "react-icons/im";
import { MainCardBg } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes/desc";
import { formatDate } from "../../../utils";

// Define a more flexible blog type
type BlogType = {
  _id: string;
  title: string;
  content?: string;
  summary?: string;
  author?: any;
  coverImage?: string;
  tags?: string[];
  createdAt?: string;
  readTime?: string;
};

interface MainCardProps {
    blog?: BlogType;
}

export default function MainCard({ blog }: MainCardProps) {
    const navigate = useNavigate();
    console.log("blog", blog)
    
    // Default values if no blog is provided
    const title = blog?.title || "Digital Marketing Trends You Can't Ignore in 2024";
    const date = blog?.createdAt ? formatDate(blog.createdAt) : "Wed, 8th Feb. 2025";
    
    // Helper function to get content preview
    const getContentPreview = (content: string | undefined): string => {
        if (!content) return '';
        
        // Strip HTML tags
        const stripHtml = (html: string) => {
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || '';
        };
        
        const cleanContent = stripHtml(content);
        
        // Return first 200 characters with ellipsis
        return cleanContent.length > 200 
            ? cleanContent.substring(0, 200) + '...' 
            : cleanContent;
    };
    
    const contentPreview = getContentPreview(blog?.content || "");
    const imageUrl = blog?.coverImage || MainCardBg;
    
    return (
        <div 
        onClick={() => navigate(blog?._id ? `${ROUTES.BLOG.PATH}/${blog._id}` : ROUTES.BLOG.PATH)}
        className=" bg-colorLight dark:bg-colorDark p-2 cursor-pointer rounded-2xl pb-5">
            <img src={imageUrl} alt={title} className="w-full object-cover rounded-2xl h-[250px]" />
            <section className=" font-light text-[14px]">
                <div className="pt-4 pb-6">
                    <header className=" font-bold">{title}</header>
                    <div>{date}</div>
                </div>
                <div>
                    {contentPreview}
                </div>
                <button
                    onClick={() => navigate(blog?._id ? `${ROUTES.BLOG.PATH}/${blog._id}` : ROUTES.BLOG.PATH)}
                    className="flex items-center gap-1 text-colorBlueDeep font-normal text-[17px] pt-5">
                    Read more..
                    <ImArrowRight2 />
                </button>
            </section>
        </div>
    )
}