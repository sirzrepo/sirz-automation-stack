import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { BASE_URL, formatDateTime } from '../../utils';

interface Asset {
  _id: string;
  assetType: 'image' | 'document' | 'video' | 'audio' | 'other';
  logo_image: string;
  title: string;
  color_palette?: string;
  createdAt: string;
  website_image: string;
}

interface CompanyData {
  _id: string;
  userId: string;
  companyData: {
    companyName: string;
    industry: string;
    logo?: string;
    brandColors?: string[];
    brandValues?: string[];
    website?: string;
    description?: string;
  };
  assets: Asset[];
  createdAt: string;
  updatedAt: string;
}

export default function AssetDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchCompanyAssets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/brand-data/company-assets/${id}`);
        // company-assets/:userId
        setCompany(response.data);
        console.log("company",response.data);
      } catch (error) {
        console.error('Error fetching company assets:', error);
        toast.error('Failed to load company assets');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyAssets();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8 text-center">
        <p>No company data found</p>
        <Link to="/assets" className="mt-4 text-blue-600 hover:underline inline-flex items-center">
          <FiArrowLeft className="mr-1" /> Back to Assets
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/assets" className="text-blue-600 hover:underline inline-flex items-center mb-4">
          <FiArrowLeft className="mr-1" /> Back to Assets
        </Link>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{company.companyData.companyName}</h1>
              {company.companyData.industry && (
                <p className="text-gray-600">{company.companyData.industry}</p>
              )}
              {company.companyData.website && (
                <a 
                  href={company.companyData.website.startsWith('http') ? company.companyData.website : `https://${company.companyData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center mt-1"
                >
                  {company.companyData.website}
                </a>
              )}
            </div>
            {company.companyData.logo && (
              <div className="mt-4 md:mt-0">
                <img 
                  src={company.companyData.logo} 
                  alt={`${company.companyData.companyName} logo`}
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {company.companyData.brandValues && company.companyData.brandValues.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Brand Values</h3>
              <div className="flex flex-wrap gap-2">
                {company.companyData.brandValues.map((value, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Brand Assets</h2>
        
        {company.assets?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {company.assets.map((asset) => (
              <div 
                key={asset._id}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex flex-col items-center justify-center h-52 bg-red-50">
                  <img src={asset.logo_image} alt="" />
                </div>
                <div className="p-3 border-t bg-gray-50">
                  <p className="text-xs text-gray-500">
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No assets found for this company</p>
          </div>
        )}
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {selectedAsset.title || 'Asset Preview'} • {formatDateTime(selectedAsset.createdAt)}
              </h3>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Logo Image Section */}
                <div className="space-y-4">
                  <div className="border dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                    <img 
                      src={selectedAsset.logo_image} 
                      alt={`${selectedAsset.title} logo`}
                      className="w-full h-auto max-h-[50vh] object-contain mx-auto p-6"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const link = document.createElement('a');
                        link.href = selectedAsset.logo_image;
                        link.download = `${selectedAsset.title?.replace(/\s+/g, '-').toLowerCase() || 'logo'}-${new Date(selectedAsset.createdAt).toISOString().split('T')[0]}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      View Logo
                    </button>
                  </div>
                </div>

                {/* Website Image Section */}
                <div className="space-y-4">
                  <div className="border dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                    <img 
                      src={selectedAsset.website_image} 
                      alt={`${selectedAsset.title} website`}
                      className="w-full h-auto max-h-[50vh] object-contain mx-auto p-6"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const link = document.createElement('a');
                        link.href = selectedAsset.website_image;
                        link.download = `${selectedAsset.title?.replace(/\s+/g, '-').toLowerCase() || 'website'}-${new Date(selectedAsset.createdAt).toISOString().split('T')[0]}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm w-full justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      View Website Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* Color Palette Section */}
              {selectedAsset.color_palette && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Palette</h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedAsset.color_palette || '');
                        toast.success('Color palette copied to clipboard!');
                      }}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      title="Copy to clipboard"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div className="relative">
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                      {selectedAsset.color_palette}
                    </pre>
                    {/* Display color swatches if color_palette is a comma-separated list of colors */}
                    {selectedAsset.color_palette.includes(',') && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedAsset.color_palette.split(',').map((color, idx) => (
                          <div 
                            key={idx} 
                            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
                            style={{ backgroundColor: color.trim() }}
                            title={color.trim()}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
