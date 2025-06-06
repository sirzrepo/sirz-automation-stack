import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import { closeModal, openModal } from "../../../store/modalSlice";
import Loader from "../../../features/loader";
import Modal from "../../../components/layout/modal";

// Define ContentAgentInquiryType interface
interface ContentAgentInquiryType {
  _id?: string;
  prompt: string;
  createdAt: string;
  updatedAt?: string;
}

export default function ContentAgentInquiries() {
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState<ContentAgentInquiryType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<ContentAgentInquiryType | undefined>(undefined);
  const [inquiryToDelete, setInquiryToDelete] = useState<ContentAgentInquiryType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiriesPerPage] = useState(5);

  // Fetch inquiries function
  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/content-agent`);
      console.log("Content Agent Inquiries data:", response.data);
      const inquiryData = response.data || [];
      setInquiries(inquiryData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch content agent inquiries", error);
      setInquiries([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [refreshTrigger]);

  // Handle inquiry selection for details view
  const handleViewDetails = (inquiry: ContentAgentInquiryType) => {
    setSelectedInquiry(inquiry);
    dispatch(openModal('inquiryDetails'));
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedInquiry(undefined);
    dispatch(closeModal());
  };

  // Handle delete confirmation
  const confirmDelete = (inquiry: ContentAgentInquiryType) => {
    setInquiryToDelete(inquiry);
    dispatch(openModal('confirmDelete'));
  };

  // Handle inquiry deletion
  const handleDelete = async () => {
    if (!inquiryToDelete?._id) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/content-agent/${inquiryToDelete._id}`);
      setRefreshTrigger(prev => prev + 1);
      setInquiryToDelete(null);
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to delete inquiry', error);
    }
  };

  // Handle cancel delete
  const cancelDelete = () => {
    setInquiryToDelete(null);
    dispatch(closeModal());
  };

  // Filter and sort inquiries
  const filteredInquiries = inquiries
    .filter(inquiry => 
      inquiry.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  // Pagination logic
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = filteredInquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);
  const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Prompt', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...filteredInquiries.map(inquiry => 
        `"${inquiry.prompt.replace(/"/g, '""')}","${new Date(inquiry.createdAt).toLocaleString()}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `content_agent_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Content Agent Inquiries</h1>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search prompts..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
          </select>
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="mr-2" size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {currentInquiries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No content agent inquiries found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prompt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentInquiries.map((inquiry) => (
                <tr key={inquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                      {inquiry.prompt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(inquiry)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(inquiry);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeft className="mr-1" size={18} />
                Previous
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Next
                <ChevronRight className="ml-1" size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Inquiry Details Modal */}
      <Modal title="Content agent prompts" btnText="Close" id="inquiryDetails" onclick={handleCloseModal}>
        {selectedInquiry && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Prompt</h3>
              <p className="mt-1 text-gray-700 whitespace-pre-wrap">{selectedInquiry.prompt}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Created At</h3>
              <p className="mt-1 text-gray-700">
                {new Date(selectedInquiry.createdAt).toLocaleString()}
              </p>
            </div>
            {selectedInquiry.updatedAt && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Last Updated</h3>
                <p className="mt-1 text-gray-700">
                  {new Date(selectedInquiry.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        title="Delete Prompt" 
        btnText="Cancel" 
        id="confirmDelete" 
        onclick={cancelDelete}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this prompt? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={cancelDelete}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
