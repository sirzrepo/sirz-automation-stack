import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { closeModal } from "../../store/modalSlice";
import Input from "../../components/common/input";
import Loader from "../../features/loader";
import { LinkIcon, Upload } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import ImageUploadComponent from "../../services/cloudinary";


interface BlogType {
  _id?: string;
  title: string;
  category: string;
  image?: string;
  imagePublicId?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

interface UpdateDigitalImageFormProps {
  digitalImage?: BlogType;
  onSuccess?: () => void;
}

export default function UpdateDigitalImageForm({ digitalImage, onSuccess }: UpdateDigitalImageFormProps) {
  console.log(digitalImage);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [hasImageError, setHasImageError] = useState(false);
  const [coverImage, setCoverImage] = useState({ publicId: '', url: '' });


  const [status, setStatus] = useState(digitalImage?.status || "Draft");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  // Check if digitalImage is undefined and handle gracefully
  useEffect(() => {
    if (!digitalImage) {
      setError("No digital image data found. Please try again.");
      console.error("Digital image data is undefined");
    } else {
      setError(null);
    }
  }, [digitalImage]);

  const formik = useFormik({
    initialValues: {
      title: digitalImage?.title || "",
      category: digitalImage?.category || "",
      image: digitalImage?.image || "",
      imagePublicId: digitalImage?.imagePublicId || "",
      status: digitalImage?.status || "Draft",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.category) {
        errors.category = "Category is required";
      }


      return errors;
    },
    onSubmit: async (values) => {
      if (!digitalImage || !digitalImage._id) {
        setError("Cannot update: Missing digital image data");
        return;
      }

      setIsLoading(true);

      try {
        const payload = {
          ...values,
          status,
        };

        const response = await axios.put(`${BASE_URL}/api/digital-images/${digitalImage._id}`, payload);
        setIsLoading(false);
        console.log("Digital image updated:", response.data);
        dispatch(closeModal());

        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } catch (error: any) {
        console.error("Failed to update digital image:", error);

        setIsLoading(false);
      }
    },
  });

  // Update form values when digitalImage prop changes
  useEffect(() => {
    if (digitalImage) {
      formik.setValues({
        title: digitalImage.title || "",
        category: digitalImage.category || "",
        image: digitalImage.image || "",
        imagePublicId: digitalImage.imagePublicId || "",
        status: digitalImage.status || "Draft",
      });
      setStatus(digitalImage.status || "Draft");
    }
  }, [digitalImage]);

  // Show error message if digitalImage is undefined
  if (error) {
    return (
      <div className="text-center p-6">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => dispatch(closeModal())}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    );
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      {/* Title Input */}
      <Input
        name="title"
        value={formik.values.title}
        title="Title"
        placeholder="Enter digital image title..."
        onChange={formik.handleChange}
        required
        error={formik.touched.title && formik.errors.title}
      />

      {/* Cover Image URL Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image
          <span className="text-gray-500 text-sm ml-1">(Optional)</span>
        </label>
        
        {/* Tabs for upload method */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            type="button"
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              uploadMethod === 'file'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setUploadMethod('file');
              if (formik.values.image?.startsWith?.('http')) {
                formik.setFieldValue('image', '');
              }
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </button>
          <button
            type="button"
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              uploadMethod === 'url'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setUploadMethod('url');
              if (formik.values.image && !formik.values.image.startsWith('http')) {
                formik.setFieldValue('image', '');
              }
            }}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Image URL
          </button>
        </div>

        {/* Content based on selected tab */}
        {uploadMethod === 'url' ? (
          <div>
            <Input
              name="image"
              value={formik.values.image || ''}
              placeholder="https://example.com/image.jpg"
              onChange={(e) => {
                formik.handleChange(e);
                setHasImageError(false);
              }}
              title=""
              className="mb-0"
              icon={<LinkIcon className="w-4 h-4 text-gray-400" />}
            />
            <p className="mt-2 text-sm text-gray-500">
              Paste the URL of your cover image
            </p>
          </div>
        ) : (
          <div>
            <ImageUploadComponent
              onUpload={({ publicId, url }) => {
                setCoverImage({ publicId, url });
                formik.setFieldValue('image', url);
                formik.setFieldValue('imagePublicId', publicId);
              }}
              buttonText="Upload Cover Image"
              className="w-full"
              initialPublicId={coverImage.publicId}
            />
            <p className="mt-2 text-sm text-gray-500 text-center">
              Upload a cover image (recommended size: 1200x630px)
            </p>
          </div>
        )}
        
        {/* Preview for both URL and File upload */}
        {formik.values.image && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
              {!hasImageError ? (
                <img 
                  src={formik.values.image} 
                  alt="Cover preview" 
                  className="w-full h-full object-cover"
                  onError={() => setHasImageError(true)}
                  onLoad={() => setHasImageError(false)}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    {uploadMethod === 'url' 
                      ? 'Invalid image URL or failed to load' 
                      : 'Failed to load image'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Dropdown */}
      <div className="mb-7">
        <label className="flex justify-between items-center mb-1">
          <h2 className="font-bold">Status</h2>
          <p className="text-sm">Required</p>
        </label>
        <div className="border-[1.4px] px-3 py-2">
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-0 outline-none w-full"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      <div className='flex absolute bottom-0 left-0 right-0 justify-end items-center h-[10%] gap-2 bg-[#FAFAFA]'>
        <button
          type="button"
          onClick={handleClose}
          className="text-md w-fit bg-white text-black px-4 py-2 rounded-sm hover:bg-slate-100 border border-colorBlueDeep transition"
        >
          Cancel
        </button>

        <button
          type='submit'
          className="text-md w-fit bg-colorBlueDeep text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition"
        >
          Update Blog Post
        </button>
      </div>

      {isLoading && <Loader />}
    </form>
  );
}