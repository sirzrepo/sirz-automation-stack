import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FiSearch, FiTrash2, FiEye, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { BASE_URL, formatDateTime } from '../../../utils';
import { openModal, closeModal } from '../../../store/modalSlice';
import Modal from '../../../components/layout/modal';

interface DemoEntry {
  _id: string;
  businessType: string;
  currentPlatform: string;
  challenge: string;
  marketTarget?: string;
  isPaidAds?: string;
  isAgency?: string;
  futureGoal?: string;
  createdAt: string;
  updatedAt: string;
}

export default function DemoEntries() {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState<DemoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedEntry, setSelectedEntry] = useState<DemoEntry | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/demo-data`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching demo entries:', error);
      toast.error('Failed to fetch demo entries');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (entry: DemoEntry) => {
    setSelectedEntry(entry);
    dispatch(openModal('delete_entry'));
  };

  const handleConfirmDelete = async () => {
    if (!selectedEntry?._id) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/demo-data/${selectedEntry._id}`);
      toast.success('Entry deleted successfully');
      fetchEntries();
      dispatch(closeModal());
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete entry');
    }
  };

  const handleView = (entry: DemoEntry) => {
    setSelectedEntry(entry);
    dispatch(openModal('view_entry'));
  };

  const exportToCSV = () => {
    const headers = [
      'Business Type',
      'Current Platform',
      'Challenge',
      'Market Target',
      'Is Paid Ads',
      'Is Agency',
      'Future Goal',
      'Date Submitted'
    ];

    const csvRows = [];
    csvRows.push(headers.join(','));

    const filteredEntries = searchQuery
      ? entries.filter(
          (entry) =>
            entry.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.currentPlatform.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.challenge.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : entries;

    filteredEntries.forEach((entry) => {
      const values = [
        `"${entry.businessType || ''}"`,
        `"${entry.currentPlatform || ''}"`,
        `"${entry.challenge || ''}"`,
        `"${entry.marketTarget || ''}"`,
        `"${entry.isPaidAds || ''}"`,
        `"${entry.isAgency || ''}"`,
        `"${entry.futureGoal || ''}"`,
        `"${formatDateTime(entry.createdAt)}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `demo-entries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sort and filter entries
  const getSortedAndFilteredEntries = () => {
    let result = [...entries];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (entry) =>
          entry.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.currentPlatform.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.challenge.toLowerCase().includes(searchQuery.toLowerCase())
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
  
  const filteredEntries = getSortedAndFilteredEntries();

  return (
    <section className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Scoring Inquiries</h1>
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
          <div className="p-8 text-center">Loading...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No inquiries found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Paid Ads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Future Goal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                    <div className="flex items-center inline">
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
                {filteredEntries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{entry.businessType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.currentPlatform}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.challenge}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.marketTarget}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.isPaidAds}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.isAgency}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.futureGoal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(entry.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(entry)}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                          title="View Details"
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(entry)}
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
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
      <Modal
        id="view_entry"
        title="Demo Entry Details"
        btnText="Close"
        onclick={() => dispatch(closeModal())}
      >
        {selectedEntry && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Business Type</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.businessType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Platform</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.currentPlatform}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Challenge</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.challenge}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Market Target</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.marketTarget}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Is Paid Ads</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.isPaidAds}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Is Agency</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.isAgency}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Future Goal</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedEntry.futureGoal}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
                <p className="mt-1 text-sm text-gray-900">{formatDateTime(selectedEntry.createdAt)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        id="delete_entry"
        title="Delete Entry"
        btnText="Delete"
        onclick={handleConfirmDelete}
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">
            Are you sure you want to delete this entry for <b>{selectedEntry?.businessType}</b>?<br />
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </section>
  );
}
