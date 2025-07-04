import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiEye, FiDownload, FiBriefcase } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { BASE_URL, formatDateTime } from '../../utils';
// import { closeModal, openModal } from '../../store/modalSlice';
// import Modal from '../../components/layout/modal';

interface CompanyDetails {
    companyName: string;
    industry: string;
    logo?: string;
  }

interface CompanyData {
  _id: string;
  companyData: CompanyDetails;
  userId: string;
  createdAt: string;
}

export default function Assets() {
  // const dispatch = useDispatch();
  const [assets, setAssets] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  // const [selectedInquiry, setSelectedInquiry] = useState<CompanyData | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/brand-data/companies`);
      setAssets(response.data);
      console.log("assets",response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  // const handleDeleteClick = (inquiry: CompanyData) => {
  //   setSelectedInquiry(inquiry);
  //   dispatch(openModal('delete_inquiry'));
  // };

  // const handleConfirmDelete = async () => {
  //   if (!selectedInquiry?._id) return;
    
  //   try {
  //     await axios.delete(`${BASE_URL}/api/brand-data/companies/${selectedInquiry._id}`);
  //     toast.success('Inquiry deleted successfully');
  //     fetchInquiries();
  //     dispatch(closeModal());
  //   } catch (error) {
  //     console.error('Error deleting inquiry:', error);
  //     toast.error('Failed to delete inquiry');
  //   }
  // };

  // View functionality is now handled by the Link component
  // No need for a separate handleView function

  const exportToCSV = () => {
    const headers = [
      'Company Name',
      'Date Submitted'
    ];

    const csvRows = [];
    csvRows.push(headers.join(','));

    const filteredInquiries = searchQuery
      ? assets.filter(
          (asset) =>
            asset?.companyData?.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : assets;

    filteredInquiries.forEach((asset) => {
      const values = [
        `"${asset.companyData?.companyName || ''}"`,
        `"${formatDateTime(asset.createdAt)}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `brandcom-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sort and filter inquiries
  const getSortedAndFilteredInquiries = () => {
    let result = [...assets];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (asset) =>
          asset?.companyData?.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  };
  
  const filteredInquiries = getSortedAndFilteredInquiries();

  return (
    <section className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Companies</h1>
          <p className="text-gray-600 mt-1">Manage company assets and brand materials</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="pl-9 pr-3 py-2 border rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="appearance-none pl-3 pr-8 py-2 border rounded-md bg-white"
            >
              <option value="newest">Most Recent</option>
              <option value="oldest">Oldest First</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <FiDownload /> Export CSV
        </button>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading companies...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No companies found</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="mt-2 text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>
                      Created
                      {sortOrder === 'newest' ? (
                        <svg className="ml-1 w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="ml-1 w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInquiries.map((asset) => (
                  <tr key={asset._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {asset.companyData?.logo ? (
                          <img 
                            src={asset.companyData.logo} 
                            alt={asset.companyData.companyName} 
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                            {asset.companyData?.companyName?.charAt(0) || 'C'}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{asset.companyData?.companyName}</div>
                          {asset.companyData?.industry && (
                            <div className="flex items-center text-sm text-gray-500">
                              <FiBriefcase className="mr-1" />
                              {asset.companyData.industry}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/assets/${asset.userId}`}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 flex items-center"
                          title="View Assets"
                        >
                          <FiEye className="h-5 w-5" />
                          <span className="ml-1">View</span>
                        </Link>
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(asset);
                          }}
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Inquiry Modal */}
      {/* <Modal
        id="view_inquiry"
        title="Inquiry Details"
        btnText="Close"
        onclick={() => dispatch(closeModal())}
      >
        {selectedInquiry && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedInquiry.companyData?.companyName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date Submitted</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDateTime(selectedInquiry.createdAt)}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
              <p className="mt-1 text-sm text-gray-900">
                {formatDateTime(selectedInquiry.createdAt)}
              </p>
            </div>
          </div>
        )}
      </Modal> */}

      {/* Delete Confirmation Modal */}
      {/* <Modal
        id="delete_inquiry"
        title="Delete Inquiry"
        btnText="Delete"
        onclick={handleConfirmDelete}
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Are you sure you want to delete this inquiry by <b>{selectedInquiry?.companyData?.companyName}</b>?
            This action cannot be undone.
          </p>
        </div>
      </Modal> */}
    </section>
  );
}
