import { ChevronLeft, ChevronRight, Download, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import { useAuth } from "../../../context/AuthContext";
import { closeModal, openModal } from "../../../store/modalSlice";
import Loader from "../../../features/loader";
import Modal from "../../../components/layout/modal";

// Define BlogType interface
interface InquiryType {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  serviceOfInterest: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export default function ContactFormEnteries() {
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [inquiriesPerPage] = useState(5);
  const { userId } = useAuth();

  // Fetch inquiries function
  const fetchInquiries = async () => {
    // setIsLoading(true);
    try { 
      const response = await axios.get(`${BASE_URL}/api/contact-inquiries`);
      const inquiryData = response.data || [];
      setInquiries(inquiryData);
      
      
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setInquiries([]);
      setIsLoading(false);
    }
  };

  // Initial data load and when refreshTrigger changes
  useEffect(() => {
    fetchInquiries();
  }, [refreshTrigger, userId]);

  // Helper to refresh data
  const refreshBlogs = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Handle delete blog
  const handleDeleteInquiry = async (inquiryId: string | undefined) => {
    if (!inquiryId) return;
    
    // Open the delete confirmation modal
    setSelectedInquiry(inquiries.find(inquiry => inquiry._id === inquiryId));
    dispatch(openModal("delete_inquiry"));
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedInquiry?._id) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/contact-inquiries/${selectedInquiry._id}`);
      refreshBlogs();
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };


  const handleViewInquiry = (inquiry: InquiryType) => {
    if (!inquiry._id) return;
    
    // Open the view inquiry modal
    setSelectedInquiry(inquiry);
    dispatch(openModal("view_inquiry"));
  };

  // Filter + Sort
  const filteredInquiries = inquiries
    .filter((inquiry) => {
      const matchesSearch = !searchQuery || 
      inquiry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Pagination
  const indexOfLast = currentPage * inquiriesPerPage;
  const indexOfFirst = indexOfLast - inquiriesPerPage;
  const currentInquiries = filteredInquiries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);

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
    const headers = ["Title", "Date Created"];
    const rows = filteredInquiries.map((inquiry) => [
      inquiry.firstName,
      inquiry.lastName,
      inquiry.email,
      inquiry.businessName,
      inquiry.serviceOfInterest,
      inquiry.message,
      new Date(inquiry.createdAt).toLocaleDateString(),
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

  const tableHeaders = [
    "Name (s)",
    "Email",
    "Business Name",
    "Service Type",
    "Message",
    "Date Created",
    "Actions",
  ]

  return (
    <section className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Automation Inquiries</h1>
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inquiries..."
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
      ) : inquiries.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8m-4 12h-4" />
                </svg>
              </div>
            </div>
            <p className="text-lg mb-4">No inquiries yet</p>
          </section>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          {/* Responsive table with horizontal scroll on small screens */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 font-medium">
                <tr>
                  {
                    tableHeaders.map((header, index) => (
                      <th key={index} className="px-4 py-2">
                        {header}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {currentInquiries.map((inquiry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    
                    <td className="px-4 py-2 font-medium">
                      <div className="flex flex-col">
                        <span>{inquiry.firstName} {inquiry.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span>{inquiry.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span>{inquiry.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col truncate">
                        <span>{inquiry.businessName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col truncate">
                        <span>{inquiry.serviceOfInterest}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col truncate max-w-xs ">
                        <span>{inquiry.message}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                          <button
                          onClick={() => handleViewInquiry(inquiry)}
                          className="text-blue-500 text-xs hover:text-blue-700"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inquiry._id)}
                          className="text-red-500 text-xs hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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

      <Modal
        id="delete_inquiry"
        title="Delete AI Inquiry"
        onclick={handleConfirmDelete}
        btnText="Delete"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Are you sure you want to delete this inquiry by <b>{selectedInquiry?.firstName} {selectedInquiry?.lastName}</b>?
          </p>
          <p className="text-sm text-red-600">
            This action cannot be undone. All data associated with this inquiry will be permanently removed.
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

<Modal
  id="view_inquiry"
  title="Inquiry Details"
  btnText="Close"
>
  <div className="space-y-6">
    
    {/* Header */}
    <div className="border-b border-gray-200 pb-4">
      <h2 className="text-xl font-semibold text-gray-900">
        {selectedInquiry?.firstName} {selectedInquiry?.lastName}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Submitted on{" "}
        {selectedInquiry?.createdAt
          ? new Date(selectedInquiry.createdAt).toLocaleString()
          : "N/A"}
      </p>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          First Name
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-1">
          {selectedInquiry?.firstName || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Last Name
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-1">
          {selectedInquiry?.lastName || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Email Address
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-1 break-all">
          {selectedInquiry?.email || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Business Name
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-1">
          {selectedInquiry?.businessName || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 md:col-span-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Service Of Interest
        </p>
        <p className="text-sm font-semibold text-gray-800 mt-1">
          {selectedInquiry?.serviceOfInterest || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 md:col-span-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Message
        </p>

        <div className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
          {selectedInquiry?.message || "No message provided."}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-end pt-2">
      <button
        onClick={() => dispatch(closeModal())}
        className="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-xl hover:opacity-90 transition-all duration-200"
      >
        Close
      </button>
    </div>
  </div>
</Modal>
    </section>
  );
} 