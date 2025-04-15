import { ChevronLeft, ChevronRight, Download, MoreVertical, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import { closeModal, openModal } from "../../store/modalSlice";
import Loader from "../../features/loader";
import Button from "../../components/common/button";
import Modal from "../../components/layout/modal";
import BlogForm from "./BlogForm";
import UpdateBlogForm from "./UpdateBlogForm";

// Define BlogType interface
interface BlogType {
  _id?: string;
  title: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  status: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
}

export default function Blogs() {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const { userId } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowActionMenu(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch blogs function
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      // If the user is an admin, fetch all blogs, otherwise fetch only user's blogs
      // const endpoint = user?.role === 'admin' 
      //   ? `${BASE_URL}/api/blogs` 
      //   : `${BASE_URL}/api/blogs/author/${userId}`;
      
      const response = await axios.get(`${BASE_URL}/api/blogs`);
      const blogData = response.data || [];
      setBlogs(blogData);
      
      // Extract unique tags from blog data
      const tags = new Set<string>();
      blogData.forEach((blog: BlogType) => {
        blog.tags?.forEach(tag => tags.add(tag));
      });
      
      setAvailableTags(Array.from(tags));
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setBlogs([]);
      setIsLoading(false);
    }
  };

  // Initial data load and when refreshTrigger changes
  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger, userId]);

  // Helper to refresh data
  const refreshBlogs = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUpdateBlog = (blog: BlogType) => {
    setSelectedBlog(blog);
    dispatch(openModal("update_blog"));
    setShowActionMenu(null);
  };

  const handleViewBlog = (blog: BlogType) => {
    window.open(`/blog/${blog.slug}`, '_blank');
    setShowActionMenu(null);
  };

  const handleCreateSubmit = () => {
    dispatch(closeModal());
    refreshBlogs();
  };

  const handleUpdateSubmit = () => {
    dispatch(closeModal());
    refreshBlogs();
  };

  // Handle delete blog
  const handleDeleteBlog = async (blogId: string | undefined) => {
    if (!blogId) return;
    
    // Open the delete confirmation modal
    setSelectedBlog(blogs.find(blog => blog._id === blogId));
    dispatch(openModal("delete_blog"));
    setShowActionMenu(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedBlog?._id) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/blogs/${selectedBlog._id}`);
      refreshBlogs();
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  // Toggle action menu
  const toggleActionMenu = (blogId: string | undefined) => {
    if (showActionMenu === blogId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(blogId || null);
    }
  };

  // Filter + Sort
  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesStatus = statusFilter === "all" || blog.status === statusFilter;
      const matchesTag = !selectedTagFilter || blog.tags?.includes(selectedTagFilter);
      const matchesSearch = !searchQuery || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesTag && matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Pagination
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // CSV Export
  const handleExport = () => {
    const headers = ["Title", "Status", "Tags", "Slug", "Date Created"];
    const rows = filteredBlogs.map((blog) => [
      blog.title,
      blog.status,
      blog.tags?.join(', ') || "N/A",
      blog.slug,
      new Date(blog.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `blogs_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button
          text="+ Create new blog post"
          onClick={() => dispatch(openModal("create_blog"))}
          className="text-[15px] hover:bg-blue-600"
        />
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="pl-9 pr-3 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          <select
            className="border rounded px-2 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <select
            className="border rounded px-2 py-2"
            value={selectedTagFilter || ""}
            onChange={(e) => setSelectedTagFilter(e.target.value || null)}
          >
            <option value="">All Tags</option>
            {availableTags.map((tag, idx) => (
              <option key={idx} value={tag}>{tag}</option>
            ))}
          </select>

          <select
            className="border rounded px-2 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 border px-3 py-1 rounded hover:bg-gray-100"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : blogs.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8m-4 12h-4" />
                </svg>
              </div>
            </div>
            <p className="text-lg mb-4">No blog posts yet</p>
            <Button
              text="+ Create your first blog post"
              onClick={() => dispatch(openModal("create_blog"))}
              className="text-[15px] hover:bg-blue-600"
            />
          </section>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          {/* Responsive table with horizontal scroll on small screens */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Cover Image</th>
                  <th className="px-4 py-3 whitespace-nowrap">Title</th>
                  <th className="px-4 py-3 whitespace-nowrap">Tags</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date Created</th>
                  <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.map((blog, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {blog.coverImage ? (
                        <div className="w-16 h-16 rounded overflow-hidden">
                          <img 
                            src={blog.coverImage} 
                            alt={blog.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                            }} 
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 font-medium">
                      <div className="flex flex-col">
                        <span>{blog.title}</span>
                        <span className="text-xs text-gray-500 mt-1">/{blog.slug}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags && blog.tags.length > 0 ? blog.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                            {tag}
                          </span>
                        )) : (
                          <span className="text-xs text-gray-500">No tags</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${blog.status === 'Published' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 relative">
                      <button
                        onClick={() => toggleActionMenu(blog._id)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {showActionMenu === blog._id && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10"
                        >
                          <ul>
                            <li>
                              <button
                                onClick={() => handleViewBlog(blog)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                              >
                                View
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleUpdateBlog(blog)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 p-4">
            <button
              onClick={() => paginate("prev")}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => paginate("next")}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Modal for Creating */}
      <Modal
        id="create_blog"
        title="Create New Blog"
        onclick={handleCreateSubmit}
        btnText="Create"
      >
        <BlogForm onSuccess={handleCreateSubmit} />
      </Modal>

      {/* Modal for Updating */}
      <Modal
        id="update_blog"
        title="Update Blog"
        onclick={handleUpdateSubmit}
        btnText="Update"
      >
        <UpdateBlogForm blog={selectedBlog} onSuccess={handleUpdateSubmit} />
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal
        id="delete_blog"
        title="Delete Blog"
        onclick={handleConfirmDelete}
        btnText="Delete"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Are you sure you want to delete the blog post "{selectedBlog?.title}"?
          </p>
          <p className="text-sm text-red-600">
            This action cannot be undone. All data associated with this blog post will be permanently removed.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
} 