import { Play, Sparkles, X } from "lucide-react"
import Button from "../../../components/common/ui/Button"
import { Video } from "../../../assets"
import { useState } from "react";
import axios from "axios";

type MessageType = 'success' | 'error' | 'loading' | null;

interface StatusMessage {
  type: MessageType;
  message: string;
}

export default function VideoSection() {
  const [companyUrl, setCompanyUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<StatusMessage>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("isSubmitting", isSubmitting)

  // const BASE_URL = `http://localhost:5000`;
  const BASE_URL = `https://sirz-xfqp.onrender.com`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyUrl.trim()) {
      setStatus({ type: 'error', message: 'Please enter a company URL' });
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Submitting your request...' });
    setIsModalOpen(true);

    try {
      await axios.post(`${BASE_URL}/api/lead-scoring`, { companyUrl });
      setStatus({ 
        type: 'success', 
        message: 'Your request has been submitted successfully! We\'ll get back to you soon.' 
      });
      setCompanyUrl('');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit request. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear status after a delay to allow for smooth animation
    if (status.type === 'success' || status.type === 'error') {
      setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 300);
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'success':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'loading':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'loading':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };


  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-8">
      {/* Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 transform transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {status.type === 'success' ? 'Success' : status.type === 'error' ? 'Error' : 'Processing'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={status.type === 'loading'}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2">
                {getStatusIcon()}
                <p className={`mt-3 text-center text-sm ${getStatusColor()}`}>
                  {status.message}
                </p>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={closeModal}
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading' ? 'Processing...' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white max-sm:text-center space-y-8 sm:w-[80%] py-12">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Stop Guessing.
            <br />
            Start Closing.
          </h1>

          <div className="grid sm:grid-cols-4 gap-3 pt-10">
            <div className="col-span-3">
                <input 
                type="text" 
                value={companyUrl} 
                onChange={(e) => setCompanyUrl(e.target.value)} 
                placeholder="Company URL" 
                className="w-full p-4 border border-gray-300 bg-white text-gray-900 rounded outline-none" />
              {/* <select className="w-full p-4 border border-gray-300 bg-white text-gray-900 rounded">
                <option value="">Company URL</option>
                <option value="example1">example1.com</option>
                <option value="example2">example2.com</option>
                <option value="example3">example3.com</option>
              </select> */}
            </div>
            <Button className="bg-[#190343] hover:bg-[#190343]/80 text-white px-8 h-14 text-lg" onClick={handleSubmit}>
              Submit <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-blue-100 text-lg leading-relaxed ">
            Say goodbye to gut decisions and hello to data-driven confidence. With intelligent lead scoring powered by
            AI, your team knows exactly who to talk to, when to reach out, and why it matters. No more wasted time. No
            more missed opportunities.
          </p>

          <div className="sm:flex gap-4">
            <Button className="bg-white  max-sm:w-full text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">Book a demo</Button>
            <Button variant="outline" className="border-white max-sm:w-full max-sm:mt-2 text-white hover:bg-white/10 px-8 py-4 text-lg">
              <Play className="mr-2 h-5 w-5" /> Watch a video
            </Button>
          </div>
        </div>

        {/* Right Demo Video Card */}
        <div className="bg-white rounded-2xl sm:px-4 sm:py-4  shadow-2xl relative">
          <div className=" bottom-0 right-0">
           <video src={Video} controls className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
