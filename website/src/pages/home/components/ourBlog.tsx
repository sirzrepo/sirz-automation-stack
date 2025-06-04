import { useEffect, useState } from "react";
import HeaderFormat from "../../../components/header";
import MainCard from "../../../components/layout/cards/mainCard";
import { BlogPost, fetchAllBlogs } from "../../../features/blogApi";
import { motion } from "framer-motion";

export default function OurBlog() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const blogData = await fetchAllBlogs();
                // Get the three most recent blogs
                const recentBlogs = blogData.slice(0, 3);
                setBlogs(recentBlogs);
            } catch (err) {
                setError("Failed to load blogs");
                console.error("Error loading blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

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

    return (
        <div className="sm:w-[85%] w-[90%] m-auto pb-10">
            <HeaderFormat title="Check out our blog.." classNames="text-black dark:text-white" />
            <h4 className="font-bold py-6 text-[27px] leading-9">
                Whether you're launching a business or scaling one, our blog keeps you informed and inspired. Read the latest now!
            </h4>
            
            {loading ? (
                <div className="flex justify-center py-20">
                    <motion.div 
                        className="rounded-full h-12 w-12 border-t-2 border-b-2 border-colorGreen"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p>{error}</p>
                </div>
            ) : blogs.length > 0 ? (
                <motion.section 
                    className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {blogs.map((blog) => (
                        <motion.div key={blog._id} variants={item}>
                            <MainCard blog={blog} />
                        </motion.div>
                    ))}
                </motion.section>
            ) : (
                <div className="text-center py-20">
                    <p>No blog posts available at the moment.</p>
                </div>
            )}
        </div>
    );
}