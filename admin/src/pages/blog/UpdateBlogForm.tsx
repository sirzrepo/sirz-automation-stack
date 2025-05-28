import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { closeModal } from "../../store/modalSlice";
import Input from "../../components/common/input";
import Loader from "../../features/loader";
import { LinkIcon, Upload, X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploadComponent from "../../services/cloudinary";


interface BlogType {
  _id?: string;
  title: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  status: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
}

interface UpdateBlogFormProps {
  blog?: BlogType;
  onSuccess?: () => void;
}

export default function UpdateBlogForm({ blog, onSuccess }: UpdateBlogFormProps) {
  console.log(blog);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [hasImageError, setHasImageError] = useState(false);
  const [coverImageId, setCoverImageId] = useState('');

  // ReactQuill configuration with text alignment
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'link', 'image',
    'list', 'bullet'
  ];
  const [status, setStatus] = useState(blog?.status || "Draft");
  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);

  const dispatch = useDispatch();

  // Check if blog is undefined and handle gracefully
  useEffect(() => {
    if (!blog) {
      setError("No blog post data found. Please try again.");
      console.error("Blog data is undefined");
    } else {
      setError(null);
      setTags(blog.tags || []);
    }
  }, [blog]);

  const formik = useFormik({
    initialValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      coverImage: blog?.coverImage || "",
      slug: blog?.slug || "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.content) {
        errors.content = "Content is required";
      }

      if (!values.slug) {
        errors.slug = "Slug is required";
      } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!blog || !blog._id) {
        setError("Cannot update: Missing blog data");
        return;
      }

      setIsLoading(true);
      setSlugError(null);

      try {
        const payload = {
          ...values,
          tags,
          status,
        };

        const response = await axios.put(`${BASE_URL}/api/blogs/${blog._id}`, payload);
        setIsLoading(false);
        console.log("Blog updated:", response.data);
        dispatch(closeModal());

        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } catch (error: any) {
        console.error("Failed to update blog:", error);

        // Check if it's a duplicate slug error
        if (error.response?.status === 400 && error.response?.data?.error?.code === 11000) {
          setSlugError("This slug is already in use. Please choose a different one.");
        } else {
          setError("Failed to update blog post. Please try again.");
        }

        setIsLoading(false);
      }
    },
  });

  // Update form values when blog prop changes
  useEffect(() => {
    if (blog) {
      formik.setValues({
        title: blog.title || "",
        content: blog.content || "",
        coverImage: blog.coverImage || "",
        slug: blog.slug || "",
      });
      setStatus(blog.status || "Draft");
      setTags(blog.tags || []);
      
      // Set the initial upload method based on coverImage
      if (blog.coverImage) {
        setUploadMethod(blog.coverImage.startsWith('http') ? 'url' : 'file');
        setCoverImageId(blog.coverImage);
      }
    }
  }, [blog]);

  // Show error message if blog is undefined
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

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      {/* Title Input */}
      <Input
        name="title"
        value={formik.values.title}
        title="Title"
        placeholder="Enter blog title..."
        onChange={formik.handleChange}
        required
        error={formik.touched.title && formik.errors.title}
      />

      {/* Slug Input */}
      <div className="mb-4">
        <label className="flex justify-between items-center mb-1">
          <h2 className="font-bold">Slug</h2>
          <p className="text-sm">Required</p>
        </label>
        <input
          name="slug"
          value={formik.values.slug}
          placeholder="enter-slug-here"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full border-[1.5px] px-3 py-2 outline-none ${
            (formik.touched.slug && formik.errors.slug) || slugError ? "border-red-500" : ""
          }`}
          required
        />
        {formik.touched.slug && formik.errors.slug && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.slug}</p>
        )}
        {slugError && (
          <p className="text-red-500 text-sm mt-1">{slugError}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          This will be used for the URL: /blog/your-slug
        </p>
      </div>

      {/* Content Editor */}
      <div className="mb-4">
              <label className="flex justify-between items-center mb-1">
                <h2 className="font-bold">Content</h2>
                <p className="text-sm">Required</p>
              </label>
                <ReactQuill
                  value={formik.values.content}
                  onChange={(content) => formik.setFieldValue("content", content)}
                  modules={modules}
                  formats={formats}
                  className={`border-[1.5px] ${
                    formik.touched.content && formik.errors.content ? "border-red-500" : ""
                  }`}
                  placeholder="Write your blog post here..."
                  theme="snow"
                />
              {formik.touched.content && formik.errors.content && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
              )}
            </div>

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
              if (formik.values.coverImage?.startsWith?.('http')) {
                formik.setFieldValue('coverImage', '');
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
              if (formik.values.coverImage && !formik.values.coverImage.startsWith('http')) {
                formik.setFieldValue('coverImage', '');
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
              name="coverImage"
              value={formik.values.coverImage || ''}
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
              onUpload={(publicId) => {
                // When we get a new publicId from Cloudinary, we need to construct the full URL
                const cloudinaryUrl = `https://res.cloudinary.com/dy4nvvdwd/image/upload/${publicId}`;
                setCoverImageId(publicId);
                formik.setFieldValue('coverImage', cloudinaryUrl);
                setHasImageError(false);
              }}
              buttonText="Upload Cover Image"
              className="w-full"
              initialPublicId={coverImageId}
            />
            <p className="mt-2 text-sm text-gray-500 text-center">
              Upload a cover image (recommended size: 1200x630px)
            </p>
          </div>
        )}
        
        {/* Preview for both URL and File upload */}
        {formik.values.coverImage && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
              {!hasImageError ? (
                <img 
                  src={formik.values.coverImage} 
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

      {/* Tags Input */}
      <div className="mb-4">
        <label className="flex justify-between items-center mb-1">
          <h2 className="font-bold">Tags (Optional)</h2>
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="Add a tag and press Enter"
            className="flex-1 border-[1.5px] px-3 py-2 outline-none"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                <span className="text-sm">{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-800 hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
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