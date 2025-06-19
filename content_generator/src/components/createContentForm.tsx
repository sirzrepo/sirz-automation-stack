"use client"

import { useState } from "react"
import { Wand2, Lightbulb, X, Loader2, CheckCircle, XCircle } from "lucide-react"
import TextArea from "./common/textarea"
import Button from "./common/ui/Button"
import axios from "axios";

type MessageType = 'success' | 'error' | 'loading' | null;

interface StatusMessage {
  type: MessageType;
  message: string;
}

export default function CreateContentForm() {
  const [prompt, setPrompt] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<StatusMessage>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!prompt.trim()) {
      setStatus({ type: 'error', message: 'Please enter a prompt' });
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Creating your content...' });
    setIsModalOpen(true);

    const BASE_URL = "https://sirz-xfqp.onrender.com";

    try {
      const response = await axios.post(`${BASE_URL}/api/content-agent`, { prompt });
      
      console.log('Server response:', response.data);
      
      setStatus({ 
        type: 'success', 
        message: 'Your content has been created successfully!' 
      });
      
      // Clear the form on success
      setPrompt('');
    } catch (error: any) {
      console.error('Error creating content:', error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to create content. Please try again.' 
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
            <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <XCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        );
      case 'loading':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" aria-hidden="true" />
          </div>
        );
      default:
        return null;
    }
  };

  const suggestions = [
    "A modern website design",
    "A mobile app interface",
    "A creative logo concept",
    "An interactive dashboard",
  ]

  return (
    <div className="flex items-center justify-center">
      {/* Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {status.type === 'success' ? 'Success' : status.type === 'error' ? 'Error' : 'Processing'}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={closeModal}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2">
              {getStatusIcon()}
              <p className="text-sm text-gray-500 text-center mt-4">
                {status.message}
              </p>
            </div>
            <div className="mt-5 sm:mt-6">
              <Button
                type="button"
                onClick={closeModal}
                className="w-full justify-center"
              >
                {status.type === 'loading' ? 'Processing...' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-2xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-left mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#001F3E] via-[#203DA3] to-[#3752E9]">
            What would you like to create today?
          </h1>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="relative">
            <TextArea
            name=""
            title=""
              placeholder="Type here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              classname=" border-none"
              rows={3}
            />

            {/* Create Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={!prompt.trim() || isSubmitting}
                className="bg-gradient-to-r from-[#45C4F9] via-[#7D0977] to-[#FF0BE3] hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Create
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="text-center">
          <p className="text-slate-600 mb-4 flex items-center justify-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
