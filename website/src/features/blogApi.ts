import { BASE_URL } from "../utils";

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  createdAt: string;
  readTime: string;
  coverImage: string;
  tags?: string[];
}

export const fetchAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    // Add status=Published parameter to only fetch published blogs
    const response = await fetch(`${BASE_URL}/api/blogs?status=Published`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogs = await response.json();
    // Double-check to filter out any drafts that might have been returned
    return blogs.filter((blog: any) => blog.status === 'Published');
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const fetchBlogById = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    const blog = await response.json();
    
    // Check if the blog is published, return null if it's a draft
    if (blog.status !== 'Published') {
      console.log('Attempted to access draft blog:', id);
      return null;
    }
    
    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

/**
 * Fetch related blogs based on the current blog's ID
 * This function tries to get blogs with similar tags or from the same author
 * If the backend doesn't have a dedicated endpoint, we'll fetch all blogs and filter locally
 */
export const fetchRelatedBlogs = async (currentBlogId: string, limit: number = 4): Promise<BlogPost[]> => {
  try {
    // Ideally, the backend would have an endpoint like `/api/blogs/${currentBlogId}/related`
    // Since we may not have that, we'll simulate by fetching all blogs and filtering

    // First, try the dedicated endpoint if it exists
    try {
      const response = await fetch(`${BASE_URL}/api/blogs/${currentBlogId}/related?limit=${limit}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // If dedicated endpoint fails, continue with fallback approach
    }

    // Fallback: fetch all blogs and filter locally
    const allBlogs = await fetchAllBlogs();
    
    // Filter out the current blog
    const otherBlogs = allBlogs.filter(blog => blog._id !== currentBlogId);
    
    // Get the current blog to compare tags, etc.
    const currentBlog = await fetchBlogById(currentBlogId);
    
    if (currentBlog && currentBlog.tags && currentBlog.tags.length > 0) {
      // Sort blogs by number of matching tags with the current blog
      otherBlogs.sort((a, b) => {
        const aTags = a.tags || [];
        const bTags = b.tags || [];
        const aMatchCount = aTags.filter(tag => currentBlog.tags?.includes(tag)).length;
        const bMatchCount = bTags.filter(tag => currentBlog.tags?.includes(tag)).length;
        
        // If same number of matching tags, prioritize blogs from same author
        if (aMatchCount === bMatchCount) {
          if (a.author === currentBlog.author && b.author !== currentBlog.author) return -1;
          if (b.author === currentBlog.author && a.author !== currentBlog.author) return 1;
          // If neither has same author, sort by date (newer first)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        
        return bMatchCount - aMatchCount;
      });
    } else {
      // If current blog has no tags, sort by author match and then by date
      otherBlogs.sort((a, b) => {
        if (currentBlog) {
          if (a.author === currentBlog.author && b.author !== currentBlog.author) return -1;
          if (b.author === currentBlog.author && a.author !== currentBlog.author) return 1;
        }
        // Sort by date (newer first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
    
    // Return the top 'limit' blogs
    return otherBlogs.slice(0, limit);
    
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
}; 