import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogPost, fetchBlogById, fetchRelatedBlogs } from "../../features/blogApi";
import { formatDate } from "../../utils";
import { IoIosArrowBack } from "react-icons/io";
import { ROUTES } from "../../constants/routes/desc";
import { MainCardBg } from "../../assets";
import { motion } from "framer-motion";
import MainCard from "../../components/layout/cards/mainCard";
import HeaderFormat from "../../components/header";

export default function BlogDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBlog = async () => {
            if (!id) {
                setError("Blog ID not found");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const blogData = await fetchBlogById(id);
                if (blogData) {
                    setBlog(blogData);
                    
                    // Load related blogs after main blog is loaded
                    try {
                        setRelatedLoading(true);
                        const relatedData = await fetchRelatedBlogs(id, 3);
                        setRelatedBlogs(relatedData);
                    } catch (relatedErr) {
                        console.error("Error loading related blogs:", relatedErr);
                    } finally {
                        setRelatedLoading(false);
                    }
                } else {
                    setError("Blog not found");
                }
            } catch (err) {
                setError("Failed to load blog");
                console.error("Error loading blog:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [id]);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <motion.div 
                    className="rounded-full h-12 w-12 border-t-2 border-b-2 border-colorGreen"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <motion.div 
                className="min-h-screen flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4">{error || "Blog not found"}</h2>
                <motion.button 
                    onClick={() => navigate(ROUTES.BLOG.PATH)}
                    className="flex items-center gap-2 bg-colorGreen text-white px-6 py-2 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoIosArrowBack /> Back to Blogs
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <img 
                    src={blog.coverImage || MainCardBg} 
                    alt={blog.title} 
                    className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <motion.div 
                        className="text-center text-white p-8 max-w-3xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                        <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
                            <span>By {blog.author}</span>
                            <div className="h-2 w-2 rounded-full bg-colorGreen"></div>
                            <span>{formatDate(blog.createdAt)}</span>
                            <div className="h-2 w-2 rounded-full bg-colorGreen"></div>
                            <span>{blog.readTime} read</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.button 
                onClick={() => navigate(ROUTES.BLOG.PATH)}
                className="flex items-center gap-2 bg-colorGreen text-white px-4 py-2 rounded-md mt-6 ml-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <IoIosArrowBack /> Back to Blogs
            </motion.button>

            <article className="max-w-3xl mx-auto my-12 px-6">
                {blog.summary && (
                    <motion.div 
                        className="mb-8 text-lg font-medium italic bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-colorGreen"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {blog.summary}
                    </motion.div>
                )}
                
                <motion.div 
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                />

                {blog.tags && blog.tags.length > 0 && (
                    <motion.div 
                        className="mt-12"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <h3 className="text-lg font-semibold mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <motion.span 
                                    key={index} 
                                    className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                                    whileHover={{ scale: 1.05, backgroundColor: "#4CAF50", color: "white" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </article>

            {/* Related Blogs Section */}
            <section className="max-w-6xl mx-auto mt-16 mb-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <HeaderFormat title="Related Posts" classNames="text-black dark:text-white" />
                </motion.div>

                {relatedLoading ? (
                    <div className="flex justify-center py-20">
                        <motion.div 
                            className="rounded-full h-12 w-12 border-t-2 border-b-2 border-colorGreen"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                    </div>
                ) : relatedBlogs.length > 0 ? (
                    <motion.div 
                        className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-8"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {relatedBlogs.map((relatedBlog) => (
                            <motion.div key={relatedBlog._id} variants={item}>
                                <MainCard blog={relatedBlog} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.p 
                        className="text-center py-10 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        No related posts found.
                    </motion.p>
                )}
            </section>
        </motion.div>
    );
} 