import { ChevronLeft, ChevronRight, Download, MoreVertical } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ProductIdeaForm from "./ProductIdeaForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import UpdateProjectIdeaForm from "./UpdateProjectIdeaForm";
import { useAuth } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../utils";
import { closeModal, openModal } from "../../../../store/modalSlice";
import Loader from "../../../../features/loader";
import { ProjectIcon } from "../../../../assets";
import Modal from "../../../../components/layout/modal";

// Define ProjectIdeaType interface with required properties
interface ProjectIdeaType {
  _id?: string;
  service: string;
  idea: string;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

interface ProductIdeasProps {
  clientId: string | null;
}

export default function ProductIdeas({ clientId }: ProductIdeasProps) {
  const dispatch = useDispatch();
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdeaType[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdeaType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ideasPerPage] = useState(5);
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

  // Fetch ideas function
  const fetchIdeas = async () => {
    setIsLoading(true);
    console.log("client", clientId, "user", userId)
    try {
      // Use either clientId (if viewing a client's profile) or userId (if viewing own ideas)
      // const targetId = userId || userId;
      // const endpoint = userId 
      //   ? `${BASE_URL}/api/project-ideas/userId/${clientId}` 
      //   : `${BASE_URL}/api/project-ideas/userId/${targetId}`;
      
      const response = await axios.get(`${BASE_URL}/api/project-ideas/userId/${clientId}` );
      const ideas = response.data || [];
      setProjectIdeas(ideas);

      const uniqueServices = Array.from(
        new Set(ideas.map((idea: any) => idea.service as string))
      ) as string[];
      
      setServices(uniqueServices);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch ideas", error);
      setProjectIdeas([]);
      setIsLoading(false);
    }
  };

  // Initial data load and when refreshTrigger changes
  useEffect(() => {
    fetchIdeas();
  }, [refreshTrigger, clientId]);

  // Helper to refresh data
  const refreshIdeas = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUpdateIdea = (idea: ProjectIdeaType) => {
    setSelectedIdea(idea);
    dispatch(openModal("update_project_idea"));
    setShowActionMenu(null);
  };

  const handleCreateSubmit = () => {
    dispatch(closeModal());
    refreshIdeas();
  };

  const handleUpdateSubmit = () => {
    dispatch(closeModal());
    refreshIdeas();
  };

  // Handle delete idea
  const handleDeleteIdea = async (ideaId: string | undefined) => {
    if (!ideaId) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/project-ideas/${ideaId}`);
      refreshIdeas();
      setShowActionMenu(null);
    } catch (error) {
      console.error("Failed to delete idea:", error);
    }
  };

  // Toggle action menu
  const toggleActionMenu = (ideaId: string | undefined) => {
    if (showActionMenu === ideaId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(ideaId || null);
    }
  };

  // Filter + Sort
  const filteredIdeas = projectIdeas
    .filter((idea) => (selectedService === "all" ? true : idea.service === selectedService))
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Pagination
  const indexOfLast = currentPage * ideasPerPage;
  const indexOfFirst = indexOfLast - ideasPerPage;
  const currentIdeas = filteredIdeas.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredIdeas.length / ideasPerPage);

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
    const headers = ["Service", "Idea", "Notes", "Status", "Date Created"];
    const rows = filteredIdeas.map((idea) => [
      idea.service,
      idea.idea,
      idea.notes || "N/A",
      idea.status,
      new Date(idea.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `project_ideas_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      {/* Top Filters - Only show if ideas exist and not loading */}
      {!isLoading && projectIdeas.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
          <div className="flex gap-2 items-center flex-wrap">
            <select
              className="border rounded px-2 py-1"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="all">All Services</option>
              {services.map((service, idx) => (
                <option key={idx} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-2 py-1"
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
            <button
              onClick={() => dispatch(openModal("create_project_idea"))}
              className="text-[25px] h-12 w-12 flex justify-center items-center hover:bg-blue-800 bg-blue-600 text-white px-3 py-1 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : projectIdeas.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm relative">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <img src={ProjectIcon} alt="Project Icon" />
            </div>
            <p className="text-lg mb-4">No project ideas found for this client</p>
          </section>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border mt-4">
          {/* Responsive table with horizontal scroll on small screens */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Service</th>
                  <th className="px-4 py-3 whitespace-nowrap">Idea</th>
                  <th className="px-4 py-3 whitespace-nowrap">Notes</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date Created</th>
                  <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentIdeas.map((idea, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 font-medium">
                        {idea.service}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-normal max-w-[200px] truncate">{idea.idea}</td>
                    <td className="px-4 py-2 max-w-[200px] truncate">{idea.notes || "N/A"}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${idea.status === 'Complete' ? 'bg-green-100 text-green-800' : 
                          idea.status === 'In progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {idea.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(idea.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 relative">
                      <button
                        onClick={() => toggleActionMenu(idea._id)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {showActionMenu === idea._id && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10"
                        >
                          <ul>
                            <li>
                              <button
                                onClick={() => handleUpdateIdea(idea)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                              >
                                Update
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDeleteIdea(idea._id)}
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
              Page {currentPage} of {totalPages}
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

      {/* Add button floating at bottom right corner when there are no projects */}
      {!isLoading && projectIdeas.length === 0 && (
        <div className="fixed bottom-8 right-8 z-10">
          <button
            onClick={() => dispatch(openModal("create_project_idea"))}
            className="h-14 w-14 flex justify-center items-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
      )}

      {/* Modal for Creating */}
      <Modal
        id="create_project_idea"
        title="Create new project idea"
        btnText="Submit"
        onclick={handleCreateSubmit}
      >
        <ProductIdeaForm onSuccess={refreshIdeas} />
      </Modal>

      {/* Modal for Updating */}
      <Modal
        id="update_project_idea"
        title="Update project idea"
        btnText="Update"
        onclick={handleUpdateSubmit}
      >
        <UpdateProjectIdeaForm idea={selectedIdea} onSuccess={refreshIdeas} />
      </Modal>
    </section>
  );
}
