import { ChevronLeft, ChevronRight, Download, Trash2, Edit, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { onboardingAPI } from "../../services/api";
import { DefaultProfileImg } from "../../assets";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";
import Modal from "../../components/layout/modal";
import { BASE_URL } from "../../utils";
import axios from "axios";
import BrandProfileDetails from "./profileDetails";

// Define types for type safety
interface ApplicationFormData {
  sectionName: string;
  data: Record<string, any>;
}

interface CompletionStatus {
  challengesSupport: boolean;
  ecommerceExperience: boolean;
  goalsIntent: boolean;
  identity: boolean;
  readinessExpectations: boolean;
  setupPrefrences: boolean;
  strategy: boolean;
  timeline: boolean;
  validation: boolean;
  [key: string]: boolean; // Index signature for dynamic access
}

interface ProgressStatus {
  challengesSupport: number;
  ecommerceExperience: number;
  goalsIntent: number;
  identity: number;
  readinessExpectations: number;
  setupPrefrences: number;
  strategy: number;
  timeline: number;
  validation: number;
  [key: string]: number; // Index signature for dynamic access
}

interface OnboardingProfile {
  _id: string;
  userId: User;
  applicationFormData: ApplicationFormData[];
  completionStatus: CompletionStatus;
  progressStatus: ProgressStatus;
  isComplete: boolean;
  selectedSection: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  status?: string;
  image?: string;
  createdAt: string;
  onboardingProfile?: OnboardingProfile;
  onboardingStatus?: string;
}

const OnboardingProfiles = () => {
  const navigate = useNavigate();
  // State management
  const [profiles, setProfiles] = useState<OnboardingProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [limit] = useState(10);
  
  // Filter and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRole, setSelectedRole] = useState("all");
  const [roles, setRoles] = useState<string[]>([]);
  
  // State for modals
  const [viewingProfile, setViewingProfile] = useState<OnboardingProfile | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<OnboardingProfile | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/roles`);
        // Extract just the role names from the response data
        const roleNames = response.data.map((role: { name: string }) => role.name);
        setRoles(roleNames);
      } catch (err: any) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);
  
  // Fetch clients with pagination, filtering, and sorting
  const fetchProfiles = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await onboardingAPI.getProfiles({
        page: currentPage,
        limit,
        search: searchQuery || undefined,
        sortBy: sortBy || undefined,
        sortOrder,
      });

      console.log("Profiles data:", response);
      
      setProfiles(response.data);
      setTotalPages(response.totalPages || 1);
      setTotalProfiles(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch clients");
      console.error("Error fetching clients:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch data when parameters change
  useEffect(() => {
    fetchProfiles();
  }, [currentPage, limit, sortBy, sortOrder, selectedRole]);
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchProfiles();
      } else {
        setCurrentPage(1); // Reset to page 1 when search changes
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  

  // Handle view profile
  const handleViewProfile = (profile: OnboardingProfile) => {
    setViewingProfile(profile);
    dispatch(openModal('view-profile'));
  };
  
  // Handle delete profile
  const handleDeleteProfile = async () => {
    if (!profileToDelete) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/onboarding/${profileToDelete._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Profile deleted successfully');
      setProfileToDelete(null);
      fetchProfiles(); // Refresh the list
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Failed to delete profile');
    }
  };
  
  return (
    <div className="w-[95%] mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Brand Profiles</h1>
        <p className="text-gray-600">Manage your client onboarding profiles</p>
      </div>
      
      {/* Controls section */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Search and filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              // const [field, order] = e.target.value.split('-');
              const [field, order] = e.target.value;
              setSortBy(field);
              setSortOrder(order as "asc" | "desc");
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="first_name-asc">Name (A-Z)</option>
            <option value="first_name-desc">Name (Z-A)</option>
          </select>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            // onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            <span>Export</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/clients/new'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaUsers size={18} />
            <span>Add Client</span>
          </button>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : profiles.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No brand profiles found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding your first brand profile'}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={() => window.location.href = '/clients/new'}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaUsers size={18} />
              <span>Add Brand Profile</span>
            </button>
          )}
        </div>
      ) : (
        // Client table
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Started
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : profiles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No profiles found
                    </td>
                  </tr>
                ) : (
                  profiles.map((profile) => {

                    // Calculate completion percentage
                    const completedSections = Object.values(profile.completionStatus).filter(Boolean).length;
                    const totalSections = Object.keys(profile.completionStatus).length;
                    const completionPercentage = Math.round((completedSections / totalSections) * 100);
                    
                    return (
                      <tr key={profile._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <img
                                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                src={profile?.userId?.image || DefaultProfileImg}
                                alt={profile?.userId?.first_name || 'Profile'}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {profile?.userId?.first_name || 'Unnamed Profile'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {profile?.userId?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {profile.isComplete ? 'Completed' : 'In Progress'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {completedSections} of {totalSections} sections
                          </div>
                            {/* {profile?.userId?.onboardingStatus} */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{completionPercentage}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className={`h-2.5 rounded-full ${
                                completionPercentage < 30 ? 'bg-red-500' : 
                                completionPercentage < 70 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleViewProfile(profile)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                              title="View Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => navigate(`/onboarding/${profile._id}`)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                              title="Edit Profile"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setProfileToDelete(profile)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Profile"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">
                  {profiles.length > 0 ? (currentPage - 1) * limit + 1 : 0}
                </span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * limit, totalProfiles)}
                </span> of{' '}
                <span className="font-medium">{totalProfiles}</span> profiles
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pagesBefore = Math.min(2, currentPage - 1);
                    let page = i + Math.max(1, currentPage - pagesBefore);
                    if (page > totalPages) return null;
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="flex items-center justify-center w-8 h-8">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Profile Modal */}
      <Modal 
        id="view-profile"
        title="Profile Details"
        // size="lg"
      >
        {viewingProfile && (
          <div className="max-h-[80vh] overflow-y-auto p-4">
            <BrandProfileDetails profile={viewingProfile} />
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        id="delete-user"
        title="Confirm Deletion"
        btnText="Delete User"
        onclick={handleDeleteProfile}
      >
        {profileToDelete && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <span className="font-semibold">{profileToDelete?.userId?.first_name || profileToDelete?.userId?.email}</span>? This action cannot be undone.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OnboardingProfiles;
