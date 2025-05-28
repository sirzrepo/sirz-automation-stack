import { HeroOfferBg } from "../../assets";
import Button from "../../components/common/button";
import HeaderFormat from "../../components/header";
import MainCard from "../../components/layout/cards/mainCard";
import { useState, useEffect } from "react";
import { BlogPost, fetchAllBlogs } from "../../features/blogApi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils";

// Helper function to get author name
const getAuthorName = (author: any) => {
    if (typeof author === 'object' && author !== null) {
        if (author.first_name || author.last_name) {
            return `${author.first_name || ''} ${author.last_name || ''}`.trim();
        }
        return author.email ? author.email.split('@')[0] : 'Unknown';
    }
    return author || 'Unknown';
};

export default function OurBlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const blogData = await fetchAllBlogs();
                setBlogs(blogData);
            } catch (err) {
                setError("Failed to load blogs");
                console.error("Error loading blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    // Get featured blog (first blog or null if no blogs)
    const featuredBlog = blogs.length > 0 ? blogs[0] : null;
    
    // Rest of the blogs excluding the featured one
    const restOfBlogs = blogs.slice(1);

    return (
        <div>
            <section
                style={{
                    backgroundImage: `url(${HeroOfferBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="pb-20 pt-28 relative"
            >
                {featuredBlog ? (
                    <div className="bg-white relative z-10 dark:bg-colorDark sm:w-[55%] w-[90%] max-sm:m-auto sm:ms-28 rounded-md sm:py-10 py-10">
                        <div className="sm:w-[80%] m-auto max-sm:px-5">
                            <p className="flex items-center gap-3 text-sm">
                                {formatDate(featuredBlog.createdAt)} 
                                <div className="h-2 w-2 rounded-full bg-colorGreen"></div> 
                                New blog post
                            </p>
                            <h4 className="pt-8 pb-5 font-bold sm:text-[33px] text-[23px] leading-7">
                                {featuredBlog.title}
                            </h4>
                            <p className="flex items-center gap-3 text-sm">
                                By {getAuthorName(featuredBlog.author)} 
                                <div className="h-2 w-2 rounded-full bg-colorGreen"></div> 
                                {featuredBlog.readTime} read
                            </p>
                            <div className="sm:w-[50%] pt-10">
                                <Button 
                                    text='Read now' 
                                    onClick={() => navigate(`/blog/${featuredBlog.slug || featuredBlog._id}`)} 
                                />
                            </div>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="bg-white relative z-10 dark:bg-colorDark sm:w-[55%] w-[90%] max-sm:m-auto sm:ms-28 rounded-md sm:py-10 py-10 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-colorGreen"></div>
                    </div>
                ) : (
                    <div className="bg-white relative z-10 dark:bg-colorDark sm:w-[55%] w-[90%] max-sm:m-auto sm:ms-28 rounded-md sm:py-10 py-10">
                        <div className="sm:w-[80%] m-auto max-sm:px-5">
                            <h4 className="pt-8 pb-5 font-bold sm:text-[33px] text-[23px] leading-7">
                                {error || "No blog posts available at the moment"}
                            </h4>
                        </div>
                    </div>
                )}
                <div className=" bg-colorGreenDeeper absolute top-0 right-[60%] bottom-0 left-0 "></div>
            </section>
            <section className='sm:w-[85%] w-[90%] m-auto py-20'>
                <div className=''>
                    <HeaderFormat title="Featured blog post from us" classNames="text-black" />
                    <h4 className=" sm:font-bold max-sm:text-justify py-6 sm:text-[27px] text-[17px] sm:leading-9">
                        Whether you're launching a business or scalling one, our blog keeps you informed and inspired. Read the latest now!
                    </h4>
                </div>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-colorGreen"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p>{error}</p>
                    </div>
                ) : restOfBlogs.length > 0 ? (
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 pt-5 gap-8">
                        {restOfBlogs.map((blog) => (
                            <MainCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p>No additional blog posts available.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
