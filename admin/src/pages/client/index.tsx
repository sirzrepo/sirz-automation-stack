import { ChevronLeft, ChevronRight, Download, MoreVertical, Trash2, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { clientsAPI } from "../../services/api";
import { DefaultProfileImg } from "../../assets";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/modalSlice";
import Modal from "../../components/layout/modal";
import { BASE_URL } from "../../utils";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

// Define user type for type safety
interface User {
  _id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  status?: string;
  image?: string;
  createdAt: string;
}

const Clients = () => {
  const navigate = useNavigate();
  // State management
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useAuth();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [limit] = useState(10);
  
  // Filter and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRole, setSelectedRole] = useState("all");
  const [roles, setRoles] = useState<string[]>([]);
  
  // Action menu state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  // State for modals
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
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
  const fetchClients = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await clientsAPI.getClients({
        page: currentPage,
        limit,
        search: searchQuery || undefined,
        sortBy: sortBy || undefined,
        sortOrder,
        role: selectedRole !== "all" ? selectedRole : undefined
      });
      
      setClients(response.data);
      setTotalPages(response.totalPages || 1);
      setTotalClients(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch clients");
      console.error("Error fetching clients:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch data when parameters change
  useEffect(() => {
    fetchClients();
  }, [currentPage, limit, sortBy, sortOrder, selectedRole]);
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchClients();
      } else {
        setCurrentPage(1); // Reset to page 1 when search changes
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Toggle action menu
  const toggleActionMenu = (userId: string) => {
    setActiveMenu(activeMenu === userId ? null : userId);
  };
  
  // Handle delete client
  const handleDeleteClient = async () => {
    if (!userToDelete) return;
    
    try {
      await clientsAPI.deleteClient(userToDelete._id);
      // Refresh the clients list
      fetchClients();
      toast.success('Client deleted successfully');
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
  };
  
  // Handle export CSV
  const handleExport = () => {
    // Create CSV headers
    const headers = ["ID", "Name", "Email", "Role", "Status", "Date Created"];
    // Map client data to CSV rows
    const rows = clients.map(client => [
      client._id,
      `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'N/A',
      client.email,
      client.role || 'N/A',
      client.status || 'Active',
      formatDate(client.createdAt)
    ]);
    
    // Build CSV content
    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers, ...rows].map(row => row.map(val => `"${val}"`).join(",")).join("\n");
    
    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clients_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get name display for client
  const getClientName = (client: User) => {
    if (client.first_name || client.last_name) {
      return `${client.first_name || ''} ${client.last_name || ''}`.trim();
    }
    return client.email.split('@')[0];
  };
  
  // Handle client selection
  const handleClientSelect = (clientId: string) => {
    navigate(`/client-profile?id=${clientId}`);
  };
  
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setSelectedRole(user.role || 'client');
    dispatch(openModal('edit-user'));
    setActiveMenu(null);
  };
  
  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    dispatch(openModal('delete-user'));
    setActiveMenu(null);
  };
  
  
  const handleRoleUpdate = async () => {
    if (!editingUser || !selectedRole) return;
    
    try {
      await clientsAPI.updateClient(editingUser._id, { role: selectedRole });
      // Refresh the clients list
      fetchClients();
      dispatch(closeModal());
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };
  
  return (
    <div className="w-full">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <p className="text-gray-600">Manage your client accounts</p>
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
              const [field, order] = e.target.value.split('-');
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
            onClick={handleExport}
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
      ) : clients.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No clients found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding your first client'}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={() => window.location.href = '/clients/new'}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaUsers size={18} />
              <span>Add Client</span>
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
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <img
                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                            src={client.image || DefaultProfileImg}
                            alt={getClientName(client)}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getClientName(client)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${client.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          client.role === 'content creator' ? 'bg-green-100 text-green-800' : 
                          client.role === 'developer' ? 'bg-blue-100 text-blue-800' : 
                          client.role === 'user' ? 'bg-gray-100 text-gray-800' : 
                         'bg-gray-100 text-gray-800'}`}>
                        {client.role || 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${client.status === 'active' ? 'bg-green-100 text-green-800' : 
                         client.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                         'bg-yellow-100 text-yellow-800'}`}>
                        {client.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap basic  text-right text-sm font-medium relative">
                      <button
                        onClick={() => toggleActionMenu(client._id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {activeMenu === client._id && (
                        <div className="absolute right-6 top-10 z-20  bg-white rounded-md shadow-lg py-1 min-w-[160px] border border-gray-200">
                          <button
                          onClick={() => handleClientSelect(client._id)}
                            // href={`/clients/${client._id}`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <div className="mr-3">👁️</div> View Profile
                          </button>
                          
                          {
                            user?.role === 'admin' && client.role !== "admin" && (
                              <button 
                                onClick={() => openEditModal(client)}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit size={16} className="mr-3 text-gray-500" /> Edit Role
                              </button>
                            )
                          }
                          {
                            user?.role === 'admin' && client.role !== "admin" && (
                              <button 
                                onClick={() => openDeleteModal(client)}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash2 size={16} className="mr-3 text-red-500" /> Delete
                              </button> 
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{clients.length > 0 ? (currentPage - 1) * limit + 1 : 0}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * limit, totalClients)}</span> of{" "}
              <span className="font-medium">{totalClients}</span> clients
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Page numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first, last, current and immediate adjacent pages
                  const pagesBefore = Math.min(2, currentPage - 1);
                  let page = i + Math.max(1, currentPage - pagesBefore);
                  if (page > totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
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
                      onClick={() => handlePageChange(totalPages)}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit User Role Modal */}
      <Modal 
        id="edit-user"
        title="Edit User Role"
        btnText="Save Changes"
        onclick={handleRoleUpdate}
      >
        {editingUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role for {editingUser.first_name || editingUser.email}
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role} selected={role === selectedRole}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        id="delete-user"
        title="Confirm Deletion"
        btnText="Delete User"
        onclick={handleDeleteClient}
      >
        {userToDelete && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <span className="font-semibold">{userToDelete.first_name || userToDelete.email}</span>? This action cannot be undone.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Clients;
