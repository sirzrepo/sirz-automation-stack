import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface FormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  timeline: string;
}

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    budget: '',
    timeline: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {step}
              </div>
              {step < 3 && (
                <div className={`w-24 h-1 mx-2 ${currentStep > step ? 'bg-primary-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {currentStep === 1 && 'Basic Information'}
          {currentStep === 2 && 'Project Details'}
          {currentStep === 3 && 'Review & Submit'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <>
            <Input
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter product title"
              required
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your product idea"
                required
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Select category"
              required
            />
            <Input
              label="Budget Range"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter budget range"
              required
            />
            <Input
              label="Timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="Expected timeline"
              required
            />
          </>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review Your Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Product Title</dt>
                  <dd className="text-sm text-gray-900">{formData.title}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="text-sm text-gray-900">{formData.description}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">{formData.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Budget Range</dt>
                  <dd className="text-sm text-gray-900">{formData.budget}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                  <dd className="text-sm text-gray-900">{formData.timeline}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            className="ml-auto"
          >
            {currentStep === 3 ? 'Submit' : (
              <>
                Next
                <FiArrowRight className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;