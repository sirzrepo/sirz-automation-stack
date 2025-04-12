import { ChevronLeft, ChevronRight, Download, MoreVertical } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../utils";
import Loader from "../../../../features/loader";
import { ProjectIcon } from "../../../../assets";
import Button from "../../../../components/common/button";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../../../../store/modalSlice";
import Modal from "../../../../components/layout/modal";
import ProjectForm from "./ProjectForm";
import UpdateProjectForm from "./UpdateProjectForm";

// Define ProjectType interface
interface ProjectType {
  _id?: string;
  projectName?: string;
  consultant: string;
  manager: string;
  notes: string;
  projectImage?: string;
  attachment: string;
  status: string;
  createdAt: string;
}

interface ProjectsProps {
  clientId: string | null;
}

export default function Projects({ clientId }: ProjectsProps) {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [selectedProject, setSelectedProject] = useState<ProjectType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

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

  // Fetch projects function
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      
      const response = await axios.get(`${BASE_URL}/api/projects/userId/${clientId}`);
      const projectData = response.data || [];
      setProjects(projectData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch projects", error);
      setProjects([]);
      setIsLoading(false);
    }
  };

  // Initial data load and when refreshTrigger changes
  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger, clientId]);

  // Helper to refresh data
  const refreshProjects = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUpdateProject = (project: ProjectType) => {
    setSelectedProject(project);
    dispatch(openModal("update_project"));
    setShowActionMenu(null);
  };

  const handleCreateSubmit = () => {
    dispatch(closeModal());
    refreshProjects();
  };

  const handleUpdateSubmit = () => {
    dispatch(closeModal());
    refreshProjects();
  };

  // Handle delete project
  const handleDeleteProject = async (projectId: string | undefined) => {
    if (!projectId) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/projects/${projectId}`);
      refreshProjects();
      setShowActionMenu(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  // Toggle action menu
  const toggleActionMenu = (projectId: string | undefined) => {
    if (showActionMenu === projectId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(projectId || null);
    }
  };

  // Filter + Sort
  const filteredProjects = projects && projects.length > 0
    ? projects
        // Remove category filtering since it doesn't exist in ProjectType
        .filter(() => true)
        .sort((a, b) =>
          sortOrder === "recent"
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    : [];

  // Pagination
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

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
    const headers = ["Project Name", "Consultant", "Manager", "Notes", "Attachment", "Status", "Date Created"];
    const rows = filteredProjects.map((project) => [
      project.projectName || "N/A",
      project.consultant || "N/A",
      project.manager || "N/A",
      project.notes || "N/A",
      project.attachment || "N/A",
      project.status || "N/A",
      new Date(project.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `projects_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      {/* Top Filters - Only show if projects exist and not loading */}
      {!isLoading && projects.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
          <div className="flex gap-2 items-center flex-wrap">
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
              onClick={() => dispatch(openModal("create_project"))}
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
      ) : projects.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm relative">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <img src={ProjectIcon} alt="Project Icon" />
            </div>
            <p className="text-lg mb-10">No projects created yet</p>
            <Button
              text="+ Create new project"
              onClick={() => dispatch(openModal("create_project"))}
              className="text-[15px] hover:bg-blue-600"
            />
          </section>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border mt-4">
          {/* Responsive table with horizontal scroll on small screens */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Project Image</th>
                  <th className="px-4 py-3 whitespace-nowrap">Project Name</th>
                  <th className="px-4 py-3 whitespace-nowrap">Consultant</th>
                  <th className="px-4 py-3 whitespace-nowrap">Manager</th>
                  <th className="px-4 py-3 whitespace-nowrap">Notes</th>
                  <th className="px-4 py-3 whitespace-nowrap">Attachment</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date Created</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {project.projectImage ? (
                        <div className="w-24 h-16 rounded overflow-hidden">
                          <img 
                            src={project.projectImage} 
                            alt={project.projectName || "Project"} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = ProjectIcon;
                              (e.target as HTMLImageElement).onerror = null;
                            }} 
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 font-medium">{project.projectName}</td>
                    <td className="px-4 py-2">{project.consultant}</td>
                    <td className="px-4 py-2">{project.manager}</td>
                    <td className="px-4 py-2 max-w-[200px] truncate">{project.notes || "N/A"}</td>
                    <td className="px-4 py-2 max-w-[150px]">
                      {project.attachment ? (
                        <a 
                          href={project.attachment} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            // Create a proper URL - handle locally and files with special characters
                            const url = project.attachment as string;
                            
                            // Check if this is a local file path (with no protocol)
                            if (!url.match(/^(https?|ftp|file):/i)) {
                              // If URL has no protocol but has square brackets or other special chars
                              const cleanUrl = url.startsWith('/') ? url : `/${url}`;
                              window.open(cleanUrl, '_blank');
                            } else {
                              // For regular URLs with protocols
                              window.open(url, '_blank');
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          View attachment
                        </a>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md">None</span>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          project.status === 'In progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 relative">
                      <button
                        onClick={() => toggleActionMenu(project._id)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {showActionMenu === project._id && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10"
                        >
                          <ul>
                            <li>
                              <button
                                onClick={() => handleUpdateProject(project)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                              >
                                Update
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDeleteProject(project._id)}
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
      {!isLoading && projects.length === 0 && (
        <div className="fixed bottom-8 right-8 z-10">
          <button
            onClick={() => dispatch(openModal("create_project"))}
            className="h-14 w-14 flex justify-center items-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
      )}

      {/* Modal for Creating */}
      <Modal
        id="create_project"
        title="Create new project"
        btnText="Submit"
        onclick={handleCreateSubmit}
      >
        <ProjectForm onSuccess={refreshProjects} />
      </Modal>

      {/* Modal for Updating */}
      <Modal
        id="update_project"
        title="Update project"
        btnText="Update"
        onclick={handleUpdateSubmit}
      >
        <UpdateProjectForm project={selectedProject} onSuccess={refreshProjects} />
      </Modal>
    </section>
  );
}