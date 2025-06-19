import { X, Upload, XCircle, Image as ImageIcon } from "lucide-react";
import Button from "../../../components/common/ui/Button";
import { SirzLogo } from "../../../assets";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Input from "../../../components/common/input";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type MessageType = 'success' | 'error' | 'loading' | null;

interface StatusMessage {
  type: MessageType;
  message: string;
}

interface FormDataState {
  businessWebsite: string;
  businessName: string;
  description: string;
  service: string;
  logoUrl: string;
  additionalImages: string[];
}

export default function PageGeneratorForm() {
  const [formData, setFormData] = useState<FormDataState>({
    businessWebsite: '',
    businessName: '',
    description: '',
    service: '',
    logoUrl: '',
    additionalImages: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<StatusMessage>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadWidget = useRef<any>(null);
  const uploadType = useRef<'logo' | 'additional'>('logo');

  console.log("isSubmitting", isSubmitting)

  // const BASE_URL = `http://localhost:5000`;
  const BASE_URL = `https://sirz-xfqp.onrender.com`;

  useEffect(() => {
    // Load Cloudinary script
    if (document.getElementById('cloudinary-script')) return;
    
    const script = document.createElement('script');
    script.id = 'cloudinary-script';
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptElement = document.getElementById('cloudinary-script');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  const openUploadWidget = (type: 'logo' | 'additional') => {
    uploadType.current = type;
    
    // Create a new instance of the widget each time to prevent state issues
    uploadWidget.current = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dy4nvvdwd',
        uploadPreset: 'mhatons1',
        sources: ['local'],
        multiple: type === 'additional',
        maxFiles: type === 'additional' ? 5 - formData.additionalImages.length : 1,
        clientAllowedFormats: ['image'],
        maxImageFileSize: 5000000, // 5MB
        cropping: false,
        showSkipCropButton: false,
        showCompletedButton: true
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const { secure_url } = result.info;
          if (uploadType.current === 'logo') {
            setFormData(prev => ({ ...prev, logoUrl: secure_url }));
          } else {
            setFormData(prev => ({
              ...prev,
              additionalImages: [...prev.additionalImages, secure_url].slice(0, 5)
            }));
          }
        } else if (result && result.event === 'close' && result.info === 'shown') {
          if (uploadType.current === 'additional' && formData.additionalImages.length >= 5) {
            alert('You can upload a maximum of 5 additional images');
          }
        }
      }
    );
    
    uploadWidget.current.open();
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessWebsite.trim() || !formData.description.trim() || !formData.service.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' });
      setIsModalOpen(true);
      return;
    }

    if (!formData.logoUrl) {
      setStatus({ type: 'error', message: 'Please upload a logo for your business' });
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Creating your page...' });
    setIsModalOpen(true);

    try {
      // Prepare data in the format expected by the server
      const requestData = {
        businessName: formData.businessName,
        businessWebsite: formData.businessWebsite,
        service: formData.service,
        description: formData.description,
        // Combine logo and additional images into files array
        files: [formData.logoUrl, ...formData.additionalImages],
        // Keep the original fields for backward compatibility
        logoUrl: formData.logoUrl,
        additionalImages: formData.additionalImages
      };

      console.log('Sending data to server:', requestData);
      const response = await axios.post(`${BASE_URL}/api/landing-page`, requestData);
      
      console.log('Server response:', response.data);
      
      setStatus({ 
        type: 'success', 
        message: 'Your page has been created successfully!' 
      });
      
      // Reset form
      setFormData({
        businessWebsite: '',
        businessName: '',
        description: '',
        service: '',
        logoUrl: '',
        additionalImages: []
      });
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
    <div className="relative bg-gradient-to-t from-[#4ACCD1] via-[#70CFDE] to-[#CFD7FC] sm:px-8 px-4 py-16">
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

      <div>
        <div className="flex flex-col items-center justify-center px-4 my-20">
            <div className="text-center">
                <h1 className="text-2xl md:text-4xl text-[#001f3e] lg:text-5xl font-bold text-center max-w-3xl mb-6">
                  Landing Page Generator
                </h1>

                <p className="text-[#001f3e] text-center font-semibold max-w-5xl sm:text-2xl text-xl ">
                  Create Your Landing Page Now
                </p>
            </div>
        </div>

        <div className="lg:w-[50%] w-full mx-auto relative pr-[15px] pb-[15px] bg-gradient-to-t from-[#012042] via-[#173588] via-[#2B47C3] to-[#334FDF] rounded-3xl">
          <div className=" bg-white rounded-2xl mt-[-20px] sm:px-12 px-6 sm:py-14 py-6 relative ">
            <div className="w-[80%]">
              <h2 className="sm:text-3xl text-2xl font-medium text-[#001f3e]">
                  No login required. 100% free to start.
              </h2>
              <p className="text-gray-700  max-w-3xl mb-12 mt-3 text-md">
                  Tell us a little about your brand and the look you’re going for—we’ll turn your answers into a fully-designed, conversion-ready page in under 60 seconds.
              </p>
            </div>

            <img src={SirzLogo} alt="" className="w-16 h-16 sm:w-24 sm:h-24 absolute sm:top-8 top-2 sm:right-10 right-2" />
            <form action="">
              <Input 
              title="Business Name" 
              onChange={handleInputChange} 
              name="businessName" 
              value={formData.businessName}
              placeholder="e.g Sirz Bakery & Cafe"
              />

              <Input 
                title="Business Website" 
                onChange={handleInputChange} 
                name="businessWebsite" 
                value={formData.businessWebsite}
                placeholder="yourbrand.com"
                required
              />

              {/* Logo Upload */}
              <div className="w-full">
                <label className='block text-md font-medium text-gray-700 mb-2'>
                  Upload Logo
                </label>
                {!formData.logoUrl ? (
                  <div 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => openUploadWidget('logo')}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> your logo
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group w-32 h-32 border rounded-lg overflow-hidden">
                    <img 
                      src={formData.logoUrl} 
                      alt="Logo preview"
                      className="w-full h-full object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove logo"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Additional Images */}
              <div className="w-full py-7">
                <label className='block text-md font-medium text-gray-700 mb-2'>
                  Additional Brand Assets (Optional)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {formData.additionalImages.map((url, index) => (
                    <div key={index} className="relative group h-32 border rounded-lg overflow-hidden">
                      <img 
                        src={url} 
                        alt={`Brand asset ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.additionalImages.length < 5 && (
                    <div 
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => openUploadWidget('additional')}
                    >
                      <ImageIcon className="w-6 h-6 text-gray-500 mb-1" />
                      <p className="text-xs text-gray-500 text-center px-2">
                        Add Image
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Upload up to 5 additional images (optional)
                </p>
              </div>

              <div className="w-full pt-4">
                <label className='block text-md font-medium text-gray-700 mb-2'>
                  Describe Your Business / Service
                </label>
                <textarea
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business or service"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div className="w-full pt-4">
                <label className='block text-md font-medium text-gray-700 mb-2'>
                  Describe the landing page you want to create
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What kind of landing page are you looking to create?"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <Button
                type="submit"
                className=" bg-blue-600 max-sm:w-full mx-auto hover:bg-blue-700 text-white font-medium py-3 px-8 mt-8 rounded-md"
                onClick={handleSubmit}
              >
                Generate My Page
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
