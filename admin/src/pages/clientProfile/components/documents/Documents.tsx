import { ChevronLeft, ChevronRight, Download, MoreVertical } from "lucide-react";

import { useEffect, useState, useRef } from "react";
import DocumentForm from "./DocumentForm";
import UpdateDocumentForm from "./UpdateDocumentForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../../utils";
import { closeModal, openModal } from "../../../../store/modalSlice";
import Loader from "../../../../features/loader";
import { ProjectIcon } from "../../../../assets";
import Button from "../../../../components/common/button";
import Modal from "../../../../components/layout/modal";
import { DocumentType } from "./types";

interface DocumentsProps {
  clientId: string | null;
}

export default function Documents({ clientId }: DocumentsProps) {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [docsPerPage] = useState(5);

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

  // Fetch documents function
  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      // Use either clientId (if viewing a client's profile) or userId (if viewing own documents)
      // const targetId = clientId || userId;
      // const endpoint = clientId 
      //   ? `${BASE_URL}/api/documents/clientId/${targetId}` 
      //   : `${BASE_URL}/api/documents/userId/${targetId}`;
        
      
      const response = await axios.get(`${BASE_URL}/api/documents/userId/${clientId}` );
      console.log("response documents", response);
      const docs = response.data || [];
      setDocuments(docs);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch documents", error);
      setDocuments([]);
      setIsLoading(false);
    }
  };

  // Initial data load and when refreshTrigger changes
  useEffect(() => {
    fetchDocuments();
  }, [refreshTrigger, clientId]);

  // Helper to refresh data
  const refreshDocuments = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUpdateDocument = (document: DocumentType) => {
    setSelectedDocument(document);
    dispatch(openModal("update_document"));
    setShowActionMenu(null);
  };

  const handleCreateSubmit = () => {
    dispatch(closeModal());
    refreshDocuments();
  };

  const handleUpdateSubmit = () => {
    dispatch(closeModal());
    refreshDocuments();
  };

  // Handle delete document
  const handleDeleteDocument = async (docId: string | undefined) => {
    if (!docId) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/documents/${docId}`);
      refreshDocuments();
      setShowActionMenu(null);
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  // Toggle action menu
  const toggleActionMenu = (docId: string | undefined) => {
    if (showActionMenu === docId) {
      setShowActionMenu(null);
    } else {
      setShowActionMenu(docId || null);
    }
  };

  // Filter + Sort
  const filteredDocuments = documents && documents.length > 0
    ? documents
        // Remove category filtering since DocumentType doesn't have category property
        .filter(() => true)
        .sort((a, b) =>
          sortOrder === "recent"
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    : [];

  // Pagination
  const indexOfLast = currentPage * docsPerPage;
  const indexOfFirst = indexOfLast - docsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDocuments.length / docsPerPage);

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
    const headers = ["documentName", "fileUrl", "projectId", "Date Created"];
    const rows = filteredDocuments.map((doc) => [
      doc.documentName,
      doc.fileUrl,
      doc.projectId,
      new Date(doc.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `documents_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      {/* Top Filters - Only show if documents exist and not loading */}
      {!isLoading && documents.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
          <div className="flex gap-2 items-center flex-wrap">
            {/* Removed category dropdown since DocumentType doesn't have category */}
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
              onClick={() => dispatch(openModal("create_document"))}
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
      ) : documents.length === 0 ? (
        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm relative">
          <section className="text-center">
            <div className="mb-6 flex justify-center items-center">
              <img src={ProjectIcon} alt="Document Icon" />
            </div>
            <p className="text-lg mb-10">No documents created yet</p>
            <Button
              text="+ Create new document"
              onClick={() => dispatch(openModal("create_document"))}
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
                  <th className="px-4 py-3 whitespace-nowrap">Document Name</th>
                  <th className="px-4 py-3 whitespace-nowrap">Document URL</th>
                  <th className="px-4 py-3 whitespace-nowrap">Project ID</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date Uploaded</th>
                  <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((doc, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{doc.documentName}</td>
                    <td className="px-4 py-2">
                      {doc.fileUrl ? (
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            // Create a proper URL - handle locally and files with special characters
                            const url = doc.fileUrl as string;
                            
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
                          View Document
                        </a>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md">No file</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{doc.projectId}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 relative">
                      <button
                        onClick={() => toggleActionMenu(doc._id)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {showActionMenu === doc._id && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10"
                        >
                          <ul>
                            <li>
                              <button
                                onClick={() => handleUpdateDocument(doc)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                              >
                                Update
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDeleteDocument(doc._id)}
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

      {/* Add button floating at bottom right corner when there are no documents */}
      {!isLoading && documents.length === 0 && (
        <div className="fixed bottom-8 right-8 z-10">
          <button
            onClick={() => dispatch(openModal("create_document"))}
            className="h-14 w-14 flex justify-center items-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
      )}

      {/* Modal for Creating */}
      <Modal
        id="create_document"
        title="Create new document"
        btnText="Submit"
        onclick={handleCreateSubmit}
      >
        <DocumentForm onSuccess={refreshDocuments} />
      </Modal>

      {/* Modal for Updating */}
      <Modal
        id="update_document"
        title="Update document"
        btnText="Update"
        onclick={handleUpdateSubmit}
      >
        <UpdateDocumentForm document={selectedDocument} onSuccess={refreshDocuments} />
      </Modal>
    </section>
  );
}