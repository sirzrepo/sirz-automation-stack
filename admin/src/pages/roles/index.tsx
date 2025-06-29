import { ChevronLeft, ChevronRight, Search, Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { closeModal, openModal } from "../../store/modalSlice";
import Loader from "../../features/loader";
import Modal from "../../components/layout/modal";
import { axiosApiCall } from "../../services/api";
import { toast } from "react-toastify";

// Define RoleType interface
interface RoleType {
  _id?: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export default function Roles() {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleType | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(10);
  const [formData, setFormData] = useState<Omit<RoleType, '_id' | 'createdAt' | 'updatedAt'>>({ 
    name: '', 
    description: '' 
  });

  // Fetch roles function
  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/roles`);
      setRoles(response.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch roles", error);
      setRoles([]);
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle delete role
  const handleDeleteRole = (role: RoleType) => {
    setSelectedRole(role);
    dispatch(openModal("delete_role"));
  };

  // Handle confirm delete
  // const handleConfirmDelete = async () => {
  //   if (!selectedRole?._id) return;
    
  //   try {
  //     await axios.delete(`${BASE_URL}/api/roles/${selectedRole._id}`);
  //     fetchRoles();
  //     dispatch(closeModal());
  //   } catch (error) {
  //     console.error("Failed to delete role:", error);
  //   }
  // };

  const handleConfirmDelete = async () => {
  if (!selectedRole?._id) return;

  try {
    await axiosApiCall('delete', `${BASE_URL}/api/roles/${selectedRole._id}`);
    fetchRoles();
    dispatch(closeModal());
    toast.success("Role deleted successfully");
  } catch (error) {
    console.error('Error deleting role:', error);
    toast.error("Failed to delete role");
    throw error;
  }
  
  // try {
  //   const token = localStorage.getItem('token'); // Get the token from localStorage
  //   await axios.delete(`${BASE_URL}/api/roles/${selectedRole._id}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   fetchRoles();
  //   dispatch(closeModal());
  // } catch (error) {
  //   console.error("Failed to delete role:", error);
  //   // Add error handling to show error message to user
  // }
};

  // Handle edit role
  const handleEditRole = (role: RoleType) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || ''
    });
    setIsEditing(true);
    dispatch(openModal("edit_role"));
  };

  // Handle create new role
  const handleCreateRole = () => {
    setSelectedRole(undefined);
    setFormData({ name: '', description: '' });
    setIsEditing(false);
    dispatch(openModal("edit_role"));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      if (isEditing && selectedRole?._id) {
        // await axios.put(`${BASE_URL}/api/roles/${selectedRole._id}`, formData);
        try {
          const updatedRole = await axiosApiCall('put', `${BASE_URL}/api/roles/${selectedRole?._id}`, formData);
          toast.success("Role updated successfully");
          fetchRoles();
          dispatch(closeModal());
          return updatedRole;
        } catch (error) {
          console.error('Error updating role:', error);
          toast.error("Failed to update role");
          throw error;
        }
      } else {
        // await axios.post(`${BASE_URL}/api/roles`, formData);
        try {
          const newRole = await axiosApiCall('post', `${BASE_URL}/api/roles`, formData);
          toast.success("Role created successfully");
          fetchRoles();
          dispatch(closeModal());
          return newRole;
        } catch (error) {
          console.error('Error creating role:', error);
          toast.error("Failed to create role");
          throw error;
        }
      }
    } catch (error: any) {
      console.error("Failed to save role:", error);
      toast.error(error.message || "Failed to save role");
    }
  };

  // Filter + Sort
  const filteredRoles = roles
    .filter((role) => {
      const matchesSearch = !searchQuery || 
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (role.description && role.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Pagination
  const indexOfLast = currentPage * rolesPerPage;
  const indexOfFirst = indexOfLast - rolesPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);

  const paginate = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const tableHeaders = [
    "Name",
    "Description",
    "Date Created",
    "Actions",
  ];

  return (
    <section className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles Management</h1>
        <button
          onClick={handleCreateRole}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          Add New Role
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles..."
              className="pl-9 pr-3 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          <select
            className="border rounded px-2 py-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : roles.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className="text-lg mb-4">No roles found</p>
            <button
              onClick={handleCreateRole}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Plus size={16} />
              Create Your First Role
            </button>
          </section>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="px-4 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRoles.map((role, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {role.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {role.description || '—'}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(role.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditRole(role)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => paginate("prev")}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate("next")}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirst + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLast, filteredRoles.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredRoles.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate("prev")}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center px-4">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button
                      onClick={() => paginate("next")}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        id="delete_role"
        title="Delete Role"
        onclick={handleConfirmDelete}
        btnText="Delete"
        // btnVariant="danger"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Are you sure you want to delete the role <b>{selectedRole?.name}</b>?
          </p>
          <p className="text-sm text-red-600">
            This action cannot be undone.
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

      {/* Add/Edit Role Modal */}
      <Modal
        id="edit_role"
        title={isEditing ? 'Edit Role' : 'Add New Role'}
        btnText={isEditing ? 'Update' : 'Create'}
        onclick={handleSubmit}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </form>
      </Modal>
    </section>
  );
}
