import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../utils";
import Loader from "../../features/loader";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    first_name?: string;
    last_name?: string;
    email: string;
  };
  coverImage?: string;
  tags?: string[];
  status: string;
  slug: string;
  createdAt: string;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      // setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs/slug/${slug}`);
        setBlog(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load blog post. It may have been deleted or is not published.");
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render HTML content safely
  const renderHtmlContent = (content: string) => {
    return (
      <div 
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal" 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  };

  // Get author name
  const getAuthorName = (author: BlogPost['author']) => {
    if (author?.first_name || author?.last_name) {
      return `${author.first_name || ''} ${author.last_name || ''}`.trim();
    }
    return author?.email ? author.email.split('@')[0] : 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-24">
        <Loader />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "This blog post doesn't exist or has been removed."}</p>
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-8">
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2" size={16} />
          Back to Blog
        </Link>
      </div>

      {/* Cover image */}
      {blog.coverImage && (
        <div className="mb-8 rounded-lg overflow-hidden h-96 bg-gray-100">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x600?text=Blog+Cover";
            }}
          />
        </div>
      )}

      {/* Title and metadata */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            {formatDate(blog.createdAt)}
          </div>
          
          {blog.author && (
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {getAuthorName(blog.author)}
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose max-w-none">
        {renderHtmlContent(blog.content)}
      </div>
    </article>
  );
} 