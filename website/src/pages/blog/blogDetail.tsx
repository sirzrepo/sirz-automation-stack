import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogById, fetchRelatedBlogs } from "../../features/blogApi";
import { formatDate } from "../../utils";
import { IoIosArrowBack } from "react-icons/io";
import { ROUTES } from "../../constants/routes/desc";
import { MainCardBg } from "../../assets";
import { motion } from "framer-motion";
import MainCard from "../../components/layout/cards/mainCard";
import HeaderFormat from "../../components/header";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./styles/quill.css";

// Define a type that extends the imported BlogPost
type ExtendedBlogPost = {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  author: string | {
    _id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  coverImage?: string;
  tags?: string[];
  status?: string;
  slug?: string;
  createdAt: string;
  updatedAt?: string;
  readTime?: string;
};

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

export default function BlogDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<ExtendedBlogPost | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<ExtendedBlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>("introduction");
    const [contentSections, setContentSections] = useState<{id: string, title: string, level: number}[]>([]);

    // Function to extract headers from HTML content
    const extractHeaders = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const headers = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        
        return headers.map(header => {
            // Create a slug from the header text
            const title = header.textContent || '';
            const id = title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            
            // Determine the level from the tag name (h1 = 1, h2 = 2, etc.)
            const level = parseInt(header.tagName.substring(1));
            
            return { id, title, level };
        });
    };

    // Function to add IDs to headers in HTML content
    const addIdsToHeaders = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headers.forEach(header => {
            const title = header.textContent || '';
            const id = title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            
            header.id = id;
        });
        
        return doc.body.innerHTML;
    };

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
                    // Process the blog content to extract headers and add IDs
                    const sections = extractHeaders(blogData.content);
                    setContentSections(sections);
                    
                    // Add IDs to headers in the content
                    const processedContent = addIdsToHeaders(blogData.content);
                    setBlog({
                        ...blogData,
                        content: processedContent
                    });
                    
                    // Set the active section to the first header or introduction
                    if (sections.length > 0) {
                        setActiveSection(sections[0].id);
                    } else {
                        setActiveSection("introduction");
                    }
                    
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

    // Function to handle social sharing
    const handleShare = (platform: string) => {
        if (!blog) return;
        
        const url = window.location.href;
        const title = blog.title;
        // const text = blog.summary || "Check out this article";
        
        let shareUrl = "";
        
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case "instagram":
                // Instagram doesn't have a direct share URL, so we'll copy to clipboard
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard! You can now paste it in Instagram.");
                return;
            default:
                return;
        }
        
        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    // Function to scroll to section
    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            // Add a small offset to account for fixed headers or navigation
            const offset = 80; // Adjust this value as needed
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    };
    
    // Function to handle scroll events and update active section
    useEffect(() => {
        if (!blog) return;
        
        const handleScroll = () => {
            // Get all section elements
            const sections = contentSections.map(section => document.getElementById(section.id));
            
            // Add introduction section if it exists
            if (blog.summary) {
                const introSection = document.getElementById("introduction");
                if (introSection) {
                    sections.unshift(introSection);
                }
            }
            
            // Find the section that's currently in view
            const currentSection = sections.reduce((nearest, section) => {
                if (!section) return nearest;
                
                const rect = section.getBoundingClientRect();
                const offset = 100; // Adjust this value as needed
                
                // If the section is in the viewport and closer to the top than the current nearest
                if (rect.top <= offset && (!nearest || rect.top > nearest.getBoundingClientRect().top)) {
                    return section;
                }
                
                return nearest;
            }, null as HTMLElement | null);
            
            if (currentSection && currentSection.id !== activeSection) {
                setActiveSection(currentSection.id);
            }
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Call once to set initial active section
        handleScroll();
        
        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, [blog, contentSections, activeSection]);

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
            <div className="relative ">
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
                            <span className=" capitalize ">By {getAuthorName(blog.author)}</span>
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

            {/* Three-column layout */}
            <div className="sm:max-w-[85%] mx-auto my-12 px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left column - Additional content */}
                    <aside className="md:w-1/4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="sticky top-6"
                        >
                            <HeaderFormat title="Table of Content" classNames="text-black dark:text-white" />
                            
                            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                                <ul className="space-y-2">
                                    {blog.summary && (
                                        <li 
                                            className={`${activeSection === "introduction" ? "text-colorGreen font-medium" : "text-gray-600 dark:text-gray-300 hover:text-colorGreen"} cursor-pointer`}
                                            onClick={() => scrollToSection("introduction")}
                                        >
                                            Introduction
                                        </li>
                                    )}
                                    
                                    {/* Dynamically generated table of contents from headers */}
                                    {contentSections.map((section) => (
                                        <li 
                                            key={section.id}
                                            className={`${activeSection === section.id ? "text-colorGreen font-medium" : "text-gray-600 dark:text-gray-300 hover:text-colorGreen"} cursor-pointer ${section.level > 1 ? `pl-${(section.level - 1) * 2}` : ""}`}
                                            onClick={() => scrollToSection(section.id)}
                                            style={{ paddingLeft: section.level > 1 ? `${(section.level - 1) * 0.75}rem` : 0 }}
                                        >
                                            {section.title}
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="mt-6">
                                    <h3 className="font-bold mb-2">Share this article</h3>
                                    <div className="flex space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleShare("facebook")}
                                            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer"
                                            aria-label="Share on Facebook"
                                        >
                                            <FaFacebookF />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleShare("twitter")}
                                            className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white cursor-pointer"
                                            aria-label="Share on Twitter"
                                        >
                                            <FaTwitter />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleShare("instagram")}
                                            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center text-white cursor-pointer"
                                            aria-label="Share on Instagram"
                                        >
                                            <FaInstagram />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </aside>

                    {/* Center column - Main content */}
                    <article className="md:w-1/2">
                        {blog.summary && (
                            <motion.div 
                                id="introduction"
                                className="mb-8 text-lg font-medium italic bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-colorGreen"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                {blog.summary}
                            </motion.div>
                        )}
                        
                        <motion.div 
                            className="ql-snow"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                        >
                            <div 
                                className="ql-editor prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </motion.div>

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

                    {/* Right column - Related blogs */}
                    <aside className="md:w-1/4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="sticky top-6"
                        >
                            <HeaderFormat title="Related Posts" classNames="text-black dark:text-white" />
                            
                            {relatedLoading ? (
                                <div className="flex justify-center py-10">
                                    <motion.div 
                                        className="rounded-full h-12 w-12 border-t-2 border-b-2 border-colorGreen"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    ></motion.div>
                                </div>
                            ) : relatedBlogs.length > 0 ? (
                                <motion.div 
                                    className="flex flex-col gap-6 mt-6"
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {relatedBlogs.map((relatedBlog) => (
                                        <motion.div 
                                            key={relatedBlog._id} 
                                            variants={item}
                                            onClick={() => navigate(`${ROUTES.BLOG.PATH}/${relatedBlog._id}`)}
                                            style={{ cursor: 'pointer' }}
                                        >
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
                        </motion.div>
                    </aside>
                </div>
            </div>
        </motion.div>
    );
} 