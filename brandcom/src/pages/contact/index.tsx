import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../components/common/input';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  employees: string;
  country: string;
};

const BASE_URL = `https://sirz-xfqp.onrender.com`;


export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    employees: '1-20',
    country: 'Nigeria',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${BASE_URL}/api/brandcom-form`, formData);
      
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
          company: '',
          website: '',
          employees: '1-20',
          country: 'Nigeria',
        });
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
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
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
            Get a Free Demo of <span className="text-indigo-600">Brandcom.ai</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Brandcom.ai has all the tools you need for branding, digital marketing, e-commerce, and content creation.
            Automate and scale faster with these tools on our belt.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-5">Popular Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 mt-6">E-commerce Automation</h4>
                <ul className="list-none space-y-1">
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Fast Performing
                  </li>
                  <li className="flex text-gray-600 items-center py-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    AI Agents
                  </li>
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    E-commerce Automations
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 mt-6">Branding Automation</h4>
                <ul className="list-none space-y-1">
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Analytics
                  </li>
                  <li className="flex text-gray-600 items-center py-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Brand Identity Package
                  </li>
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Fast Brand Agents
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 mt-6">Digital Marketing</h4>
                <ul className="list-none space-y-1">
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Analytics
                  </li>
                  <li className="flex text-gray-600 items-center py-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Social Media Manager
                  </li>
                  <li className="flex text-gray-600 items-center">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Marketing Automation
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
            <Input 
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    type='text'
                    placeholder='First Name'
                    required
                />

                <Input 
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    type='text'
                    placeholder='Last Name'
                    required
                />
           </div>

           <div className='grid sm:grid-cols-2 gap-6'>
            <Input 
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    type='email'
                    placeholder='Email'
                    required
                />

                <Input 
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    type='number'
                    placeholder='Phone Number'
                />
           </div>

           <div className='grid sm:grid-cols-2 gap-6'>
            <Input 
                    name="company"
                    onChange={handleChange}
                    value={formData.company}
                    type='text'
                    placeholder='Company Name'
                />

                <Input 
                    name="website"
                    onChange={handleChange}
                    value={formData.website}
                    type='text'
                    placeholder='Website URL'
                />
           </div>

            <div>
              <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                Employees
              </label>
              <select
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>1-20</option>
                <option>21-50</option>
                <option>51-200</option>
                <option>201-500</option>
                <option>500+</option>
              </select>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country of Company Headquarters
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Nigeria</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            <div className="text-sm text-gray-500 py-2">
              We're committed to your privacy. HubSpot uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
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
                {isSubmitting ? 'Submitting...' : 'Get Your Free Demo'}
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}