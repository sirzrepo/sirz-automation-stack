import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import { closeModal, openModal } from "../../../store/modalSlice";
import Loader from "../../../features/loader";
import Modal from "../../../components/layout/modal";

// Define InquiryType interface
interface InquiryType {
  _id?: string;
  businessName: string;
  businessWebsite: string;
  files: string[];
  service: string;
  description: string;
  additionalImages?: string[];
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export default function LandingPageInquiries() {
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType | undefined>(undefined);
  const [refreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiriesPerPage] = useState(5);

  // Fetch inquiries function
  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/landing-page`);
      const inquiryData = response.data || [];
      setInquiries(inquiryData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch landing page inquiries", error);
      setInquiries([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [refreshTrigger]);

  // Handle search
  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchLower = searchQuery?.toLowerCase();
    return (
      inquiry.businessName?.toLowerCase().includes(searchLower) ||
      inquiry.businessWebsite?.toLowerCase().includes(searchLower) ||
      inquiry.service?.toLowerCase().includes(searchLower)
    );
  });

  // Sort inquiries
  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
  });

  // Get current inquiries
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = sortedInquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);
  const totalPages = Math.ceil(sortedInquiries.length / inquiriesPerPage);

  // View inquiry details
  const handleViewInquiry = (inquiry: InquiryType) => {
    setSelectedInquiry(inquiry);
    dispatch(openModal('landingPageInquiry'));
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedInquiry(undefined);
    dispatch(closeModal());
  };

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Business Name",
      "Website",
      "Service Description",
      "Page Description",
      "Date Submitted"
    ];

    const csvData = [
      headers.join(","),
      ...inquiries.map((inquiry) =>
        [
          `"${inquiry.businessName}"`,
          `"${inquiry.businessWebsite}"`,
          `"${inquiry.service.replace(/"/g, '""')}"`,
          `"${inquiry.description.replace(/"/g, '""')}"`,
          new Date(inquiry.createdAt).toLocaleDateString()
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `landing-page-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Landing Page Generator Inquiries</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Date
                    <button
                      onClick={() => setSortOrder(sortOrder === "recent" ? "oldest" : "recent")}
                      className="ml-1 focus:outline-none"
                    >
                      {sortOrder === "recent" ? "↑" : "↓"}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentInquiries.length > 0 ? (
                currentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {inquiry.businessName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={`https://${inquiry.businessWebsite}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {inquiry.businessWebsite}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {inquiry.service.length > 50
                        ? `${inquiry.service.substring(0, 50)}...`
                        : inquiry.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewInquiry(inquiry)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstInquiry + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastInquiry, sortedInquiries.length)}
                  </span>{" "}
                  of <span className="font-medium">{sortedInquiries.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === number
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      <Modal title="Landing Page Inquiry" id="landingPageInquiry" btnText="Close" onclick={handleCloseModal}>
        {selectedInquiry && (
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Business Name</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedInquiry.businessName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a
                    href={`https://${selectedInquiry.businessWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-blue-600 hover:underline"
                  >
                    {selectedInquiry.businessWebsite}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Service Description</h3>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                {selectedInquiry.service}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Page Description</h3>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                {selectedInquiry.description}
              </p>
            </div>

            {selectedInquiry.additionalImages && selectedInquiry.additionalImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedInquiry.additionalImages.map((image, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <img
                        src={image}
                        alt={`Additional image ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

{selectedInquiry.files && selectedInquiry.files.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Images</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedInquiry.files.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={file}
                          alt={`Image ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://via.placeholder.com/200x100?text=Image+Not+Found';
                          }}
                        />
                        <button
                          onClick={() => window.open(file, '_blank')}
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          title="View full size"
                        >
                          <div className="bg-white p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0V7m0 6h6" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
}
