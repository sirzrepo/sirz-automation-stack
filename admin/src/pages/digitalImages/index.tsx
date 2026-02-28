import { ChevronLeft, ChevronRight, Download, MoreVertical, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL, isYouTubeUrl, extractYouTubeId } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import { closeModal, openModal } from "../../store/modalSlice";
import Loader from "../../features/loader";
import Button from "../../components/common/button";
import Modal from "../../components/layout/modal";
import DigitalImageForm from "./form";
import { Image, Transformation } from "cloudinary-react";
import UpdateDigitalImageForm from "./UpdateForm";

// Define DigitalImageType interface
interface DigitalImageType {
  _id?: string;
  title: string;
  category: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export default function DigitalImages() {
  const dispatch = useDispatch();
  const [contents, setContents] = useState<DigitalImageType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDigitalImage, setSelectedDigitalImage] = useState<DigitalImageType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(20);
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
    // setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/digital-images`);
      console.log("Digital images data:", response.data);
      const digitalImageData = response.data || [];
      setContents(digitalImageData);
  
      
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setContents([]);
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

  const handleUpdate = (digitalImage: DigitalImageType) => {
    setSelectedDigitalImage(digitalImage);
    dispatch(openModal("update_digital_image"));
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
  const handleDeleteDigitalImage = async (digitalImageId: string | undefined) => {
    if (!digitalImageId) return;
    
    // Open the delete confirmation modal
    setSelectedDigitalImage(contents.find(content => content._id === digitalImageId));
    dispatch(openModal("delete_digital_image"));
    setShowActionMenu(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedDigitalImage?._id) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/digital-images/${selectedDigitalImage._id}`);
      refreshBlogs();
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to delete digital image:", error);
    }
  };

  // Toggle action menu
  const toggleActionMenu = (digitalImageId: string | undefined) => {
    if (showActionMenu === digitalImageId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(digitalImageId || null);
    }
  };

  // Filter + Sort
  const filteredBlogs = contents
    .filter((content) => {
      const matchesStatus = statusFilter === "all" || content.status === statusFilter;
      // const matchesTag = !selectedTagFilter || content.tags?.includes(selectedTagFilter);
      const matchesSearch = !searchQuery || 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Pagination
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentDigitalImages = filteredBlogs.slice(indexOfFirst, indexOfLast);
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
    const headers = ["Title", "Status", "Category", "Date Created"];
    const rows = filteredBlogs.map((content) => [
      content.title,
      content.status,
      content.category,
      new Date(content.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digital_media_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Digital Media Management</h1>
        <Button
          text="+ Create new digital media"
          onClick={() => dispatch(openModal("create_digital_image"))}
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
              placeholder="Search media..."
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
      ) : contents.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8m-4 12h-4" />
                </svg>
              </div>
            </div>
            <p className="text-lg mb-4">No digital media yet</p>
            <Button
              text="+ Create your first digital media"
              onClick={() => dispatch(openModal("create_digital_image"))}
              className="text-[15px] hover:bg-blue-600"
            />
          </section>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentDigitalImages.map((digitalImage) => (
            <div
              key={digitalImage._id}
              className="group relative rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Media */}
              <div className="relative w-full h-56 bg-gray-100">
                {digitalImage.mediaUrl ? (
                  digitalImage.mediaType === "image" ? (
                    <Image
                      publicId={digitalImage.mediaUrl}
                      cloudName="dy4nvvdwd"
                      className="w-full h-full object-cover"
                    >
                      <Transformation width="800" height="450" crop="fill" />
                    </Image>
                  ) : (
                    (isYouTubeUrl(digitalImage.mediaUrl) || !digitalImage.mediaUrl.includes('http')) ? (
                      <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(digitalImage.mediaUrl)}`}
                        title="Video"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        width="100%"
                        height="400"
                        src={digitalImage.mediaUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No media
                  </div>
                )}

                {/* Hover Overlay Actions */}
                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleUpdate(digitalImage)}
                    className="px-4 py-2 text-sm bg-white rounded-md hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteDigitalImage(digitalImage._id)}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div> */}

                {/* Status Badge */}
                <span
                  className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full font-medium
                    ${
                      digitalImage.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {digitalImage.status}
                </span>

                {/* More Menu */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleActionMenu(digitalImage._id)}
                    className="p-2 rounded-full bg-white/80 hover:bg-white"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {showActionMenu === digitalImage._id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-20"
                    >
                      <ul>
                        <li>
                          <button
                            onClick={() => handleUpdate(digitalImage)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDeleteDigitalImage(digitalImage._id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4">
                <h3 className="font-medium truncate">{digitalImage.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {digitalImage.category} • {new Date(digitalImage.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </section>

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
        id="create_digital_image"
        title="Create Digital Media"
        onclick={handleCreateSubmit}
        btnText="Create"
      >
        <DigitalImageForm onSuccess={handleCreateSubmit} />
      </Modal>

      {/* Modal for Updating */}
      <Modal
        id="update_digital_image"
        title="Update Digital Media"
        onclick={handleUpdateSubmit}
        btnText="Update"
      >
        <UpdateDigitalImageForm digitalImage={selectedDigitalImage} onSuccess={handleUpdateSubmit} />
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal
        id="delete_digital_image"
        title="Delete Digital Media"
        onclick={handleConfirmDelete}
        btnText="Delete"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Are you sure you want to delete the digital media "{selectedDigitalImage?.title}"?
          </p>
          <p className="text-sm text-red-600">
            This action cannot be undone. All data associated with this digital media will be permanently removed.
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