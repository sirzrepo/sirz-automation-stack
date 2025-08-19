import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FiSearch, FiTrash2, FiEye, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { BASE_URL, formatDateTime } from '../../../utils';
import { openModal, closeModal } from '../../../store/modalSlice';
import { RootState } from '../../../store/store';
import Modal from '../../../components/layout/modal';

interface WebQuestionnaireInquiry {
  _id: string;
  businessName: string;
  industry: string;
  businessDescription: string;
  brandStyle?: string;
  hasLogo?: boolean;
  brandColors?: string[];
  websiteType?: string[];
  features?: string[];
  productCount?: number;
  paymentGateways?: string[];
  bookingType?: string;
  calendarIntegration?: string;
  contentProvider?: string;
  needCopywriting?: boolean;
  maintenancePreference?: string;
  budget?: string;
  timeline?: string;
  launchDate?: string;
  additionalRequirements?: string;
  createdAt: string;
  updatedAt: string;
}

const DetailItem = ({ label, value, fullWidth = false }: { label: string; value: any; fullWidth?: boolean }) => {
  if (!value && typeof value !== 'boolean' && typeof value !== 'number') return null;

  const displayValue = Array.isArray(value) ? value.join(', ') : value.toString();

  return (
    <div className={`${fullWidth ? 'col-span-2' : ''}`}>
      <h4 className="font-semibold text-gray-800">{label}</h4>
      <p className="text-gray-700 whitespace-pre-wrap">{displayValue}</p>
    </div>
  );
};

export default function WebQuestionnaireInquiries() {
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState<WebQuestionnaireInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedInquiry, setSelectedInquiry] = useState<WebQuestionnaireInquiry | null>(null);
  const { isOpen, modalId } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/web-form-questionnaire`);
      setInquiries(response.data.data || []);
      console.log("inquiries", inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];
    
    if (searchQuery) {
      result = result.filter(
        (inquiry) =>
          inquiry.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inquiry.industry.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [inquiries, searchQuery, sortOrder]);

  const handleDeleteClick = (inquiry: WebQuestionnaireInquiry) => {
    setSelectedInquiry(inquiry);
    dispatch(openModal('delete_inquiry'));
  };

  const handleConfirmDelete = async () => {
    if (!selectedInquiry?._id) return;
    
    try {
      await axios.delete(`${BASE_URL}/api/web-form-questionnaire/${selectedInquiry._id}`);
      toast.success('Inquiry deleted successfully');
      fetchInquiries();
      dispatch(closeModal());
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  const handleView = (inquiry: WebQuestionnaireInquiry) => {
    setSelectedInquiry(inquiry);
    dispatch(openModal('view_questionnaire'));
  };

  const exportToCSV = () => {
    if (filteredInquiries.length === 0) {
        toast.warn('No inquiries to export.');
        return;
    }
    const headers = [
      { label: 'Business Name', key: 'businessName' },
      { label: 'Industry', key: 'industry' },
      { label: 'Business Description', key: 'businessDescription' },
      { label: 'Brand Style', key: 'brandStyle' },
      { label: 'Has Logo', key: 'hasLogo' },
      { label: 'Brand Colors', key: 'brandColors' },
      { label: 'Website Type', key: 'websiteType' },
      { label: 'Features', key: 'features' },
      { label: 'Product Count', key: 'productCount' },
      { label: 'Payment Gateways', key: 'paymentGateways' },
      { label: 'Booking Type', key: 'bookingType' },
      { label: 'Calendar Integration', key: 'calendarIntegration' },
      { label: 'Content Provider', key: 'contentProvider' },
      { label: 'Need Copywriting', key: 'needCopywriting' },
      { label: 'Maintenance Preference', key: 'maintenancePreference' },
      { label: 'Budget', key: 'budget' },
      { label: 'Timeline', key: 'timeline' },
      { label: 'Launch Date', key: 'launchDate' },
      { label: 'Additional Requirements', key: 'additionalRequirements' },
      { label: 'Date Submitted', key: 'createdAt' },
    ];

    const csvRows = [headers.map(h => h.label).join(',')];

    filteredInquiries.forEach((inquiry) => {
      const values = headers.map(({ key }) => {
        const value = inquiry[key as keyof WebQuestionnaireInquiry];
        if (value === undefined || value === null) return '""';
        if (Array.isArray(value)) {
          return `"${value.join(', ')}"`;
        }
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `web-questionnaire-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Web Questionnaire Inquiries</h1>
      </div>

      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or industry..."
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

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No inquiries have been submitted yet.</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No inquiries match your search.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{inquiry.businessName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{inquiry.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{inquiry.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(inquiry.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleView(inquiry)} className="text-blue-600 hover:text-blue-900 mr-3"><FiEye /></button>
                    <button onClick={() => handleDeleteClick(inquiry)} className="text-red-600 hover:text-red-900"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal 
        id='view_questionnaire' 
        btnText='Close'
        onclick={() => dispatch(closeModal())}
        title={`Inquiry: ${selectedInquiry?.businessName || ''}`}
      >
          {selectedInquiry && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Business Name" value={selectedInquiry.businessName} />
                <DetailItem label="Industry" value={selectedInquiry.industry} />
                <DetailItem label="Budget" value={selectedInquiry.budget} />
                <DetailItem label="Timeline" value={selectedInquiry.timeline} />
                <DetailItem label="Preferred Launch Date" value={selectedInquiry.launchDate} />
                <DetailItem label="Date Submitted" value={formatDateTime(selectedInquiry.createdAt)} />
              </div>
              <hr />
              <DetailItem label="Business Description" value={selectedInquiry.businessDescription} fullWidth />
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem label="Has Logo?" value={selectedInquiry.hasLogo ? 'Yes' : 'No'} />
                  <DetailItem label="Brand Style" value={selectedInquiry.brandStyle} />
                  <DetailItem label="Brand Colors" value={selectedInquiry.brandColors} />
                  <DetailItem label="Website Type" value={selectedInquiry.websiteType} />
                  <DetailItem label="Required Features" value={selectedInquiry.features} />
                  <DetailItem label="Product Count" value={selectedInquiry.productCount} />
                  <DetailItem label="Payment Gateways" value={selectedInquiry.paymentGateways} />
                  <DetailItem label="Booking Type" value={selectedInquiry.bookingType} />
                  <DetailItem label="Calendar Integration" value={selectedInquiry.calendarIntegration} />
                  <DetailItem label="Content Provider" value={selectedInquiry.contentProvider} />
                  <DetailItem label="Need Copywriting?" value={selectedInquiry.needCopywriting ? 'Yes' : 'No'} />
                  <DetailItem label="Maintenance Preference" value={selectedInquiry.maintenancePreference} />
              </div>
              <hr />
              <DetailItem label="Additional Requirements" value={selectedInquiry.additionalRequirements} fullWidth />
            </div>
          )}
      </Modal>

      {isOpen && modalId === 'delete_inquiry' && (
        <Modal modalType='delete_inquiry' title="Confirm Deletion">
        <div>
          <p>Are you sure you want to delete this inquiry from "{selectedInquiry?.businessName}"?</p>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => dispatch(closeModal())} className="px-4 py-2 rounded-md border">Cancel</button>
            <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-md bg-red-600 text-white">Delete</button>
          </div>
        </div>
      </Modal>
      )}
    </section>
  );
}
