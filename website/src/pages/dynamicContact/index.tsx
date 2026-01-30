import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '../../utils';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  serviceType: string;
};


const services = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'SEO Optimization',
  'Cloud Solutions',
  'Consulting',
  'Other',
];


export default function DynamicContact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = new URLSearchParams(location.search);
  const urlOrigin = params.get("from") || "/";

  console.log("urlOrigin", urlOrigin);


  useEffect(() => {
    if (submitStatus) {
      setIsModalOpen(true);
      // Auto-close the modal after 5 seconds
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setSubmitStatus({
        success: false,
        message: 'Email, First name and Last name are required'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const payload = {
          from: formData.email,
          subject: "New Contact Request",
          text: `
              <div>
              <p>firstName: ${formData.firstName}</p>
              <p>lastName: ${formData.lastName}</p>
              <p>email: ${formData.email}</p>
              <p>phone: ${formData.phone}</p>
              <p>businessName: ${formData.businessName}</p>
              <p>service: ${formData.serviceType}</p>
              </div>
          `,
          html: `
              <div>
              <p>firstName: ${formData.firstName}</p>
              <p>lastName: ${formData.lastName}</p>
              <p>email: ${formData.email}</p>
              <p>phone: ${formData.phone}</p>
              <p>businessName: ${formData.businessName}</p>
              <p>service: ${formData.serviceType}</p>
              </div>
          `,
        }

    try {
      const response = await axios.post(`${BASE_URL}/contact`, payload);
      
      if (response.status === 200 || response.status === 201) {
        setSubmitStatus({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.'
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          serviceType: '',
        });
        window.location.href = urlOrigin;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'An error occurred while submitting the form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[100vh] bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => window.location.href = urlOrigin}
        className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-indigo-600"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      {/* Success/Error Modal */}
      <AnimatePresence>
        {isModalOpen && submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              className={`relative max-w-md w-full p-6 rounded-lg shadow-xl ${
                submitStatus.success ? 'bg-green-50' : 'bg-red-50'
              }`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 h-6 w-6 ${
                  submitStatus.success ? 'text-green-500' : 'text-red-500'
                }`}>
                  {submitStatus.success ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-lg font-medium ${
                    submitStatus.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {submitStatus.success ? 'Success!' : 'Error'}
                  </h3>
                  <div className={`mt-2 text-sm ${
                    submitStatus.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    <p>{submitStatus.message}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(false);
                  }}
                  className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="md:grid md:grid-cols-2 gap-20 py-20 md:w-[80%] w-[90%] mx-auto">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get a Free Demo of <span className="text-indigo-600">SIRz</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            SIRz is an AI-powered automation ecosystem that unifies automation, CRM, and analytics—so you can scale while we handle the backend.
            One smart subscription, zero agency fees.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-5">Popular Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 mt-6">AI-Powered Automation</h4>
                <ul className="list-none space-y-1">
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Intelligent Workflows
                  </li>
                  <li className="flex text-gray-600 items-center py-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Task Elimination
                  </li>
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Consistent Results
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 mt-6">Unified CRM</h4>
                <ul className="list-none space-y-1">
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Central Customer Data
                  </li>
                  <li className="flex text-gray-600 items-center py-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Seamless Integrations
                  </li>
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Scalable Subscription
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 mt-6">Actionable Analytics</h4>
                <ul className="list-none space-y-1">
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Real-Time Insights
                  </li>
                  <li className="flex text-gray-600 items-center py-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Data-Driven Decisions
                  </li>
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Growth Dashboards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='shadow-2xl'>
        <div className="md:col-span-1 w-[90%] py-12 mx-auto">
          <div className="space-y-4">
           <div className='grid sm:grid-cols-2 gap-6'>

              <div className=" pt-2">
                <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                  <input
                      name="firstName"
                          onChange={handleChange}
                          value={formData.firstName}
                          type='text'
                          placeholder='First Name'
                      className={`w-full mt-1 p-3 border border-gray-300 text-black rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                  />
              </div>

              <div className=" pt-2">
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                      name="lastName"
                          onChange={handleChange}
                          value={formData.lastName}
                          type='text'
                          placeholder='Last Name'
                      className={`w-full mt-1 p-3 border border-gray-300 text-black rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                  />
              </div>

           </div>

           <div className='grid sm:grid-cols-2 gap-6'>
            <div className="pt-2">
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                      name="email"
                          onChange={handleChange}
                          value={formData.email}
                          type='email'
                          placeholder='Email'
                      className={`w-full mt-1 p-3 border border-gray-300 text-black rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                  />
              </div>

            <div className=" pt-2">
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                      name="phone"
                          onChange={handleChange}
                          value={formData.phone}
                          type='number'
                          placeholder='Phone Number'
                      className={`w-full mt-1 p-3 border border-gray-300 text-black rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                  />
              </div>

           </div>

           <div className='grid sm:grid-cols-2 gap-6'>
            <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                    businessName Name
                  </label>
                  <input
                      name="businessName"
                          onChange={handleChange}
                          value={formData.businessName}
                          type='text'
                          placeholder='businessName Name'
                      className={`w-full mt-1 p-3 border border-gray-300 text-black rounded-lg bg-tranparent dark:bg-background_dark placeholder:text-[12px] focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary`}
                  />
              </div>

             <div>
              <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                Services
              </label>
              <select
                id="employees"
                name="employees"
                value={formData.serviceType}
                onChange={handleChange}
                className="mt-1 block w-full py-3 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select your preferred service</option>
                {
                  services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))
                }
              </select>
            </div>
           </div>

            <div className="text-sm text-gray-500 py-2">
              We're committed to your privacy. SIRZ uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </div>
            {submitStatus && (
              <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Your Inquiry'}
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}