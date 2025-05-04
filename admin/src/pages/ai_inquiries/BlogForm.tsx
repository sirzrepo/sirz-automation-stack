import { useState } from 'react';
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { BASE_URL } from "../../utils";
import { closeModal } from "../../store/modalSlice";
import Input from "../../components/common/input";
import Loader from "../../features/loader";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogFormProps {
  onSuccess?: () => void;
}

export default function BlogForm({ onSuccess }: BlogFormProps) {
  const [status, setStatus] = useState("Draft");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [slugError, setSlugError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { userId } = useAuth();

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // We'll use a simpler approach for line height
  // Instead of trying to register a custom format, we'll use CSS classes
  // The custom CSS file we imported will handle the line height styling

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'link', 'image',
    'list', 'bullet'
  ]

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      coverImage: "",
      slug: "",
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
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      setSlugError(null);
      
      try {
        const payload = {
          ...values,
          author: userId,
          tags,
          status,
        };

        console.log("Payload:", payload);
        
        const response = await axios.post(`${BASE_URL}/api/blogs`, payload);
        setIsLoading(false);
        console.log("Blog created:", response.data);
        resetForm();
        setTags([]);
        setStatus("Draft");
        dispatch(closeModal());
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } catch (error: any) {
        console.error("Failed to create blog:", error);
        
        // Check if it's a duplicate slug error
        if (error.response?.status === 400 && error.response?.data?.error?.code === 11000) {
          setSlugError("This slug is already in use. Please choose a different one.");
        }
        
        setIsLoading(false);
      }
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    formik.setFieldValue("title", title);
    
    // Auto-generate slug when title changes if slug is empty or user hasn't modified it yet
    if (!formik.touched.slug || !formik.values.slug) {
      const generatedSlug = generateSlug(title);
      formik.setFieldValue("slug", generatedSlug);
    }
  };

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
        onChange={handleTitleChange}
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
      <Input
        name="coverImage"
        value={formik.values.coverImage}
        title="Cover Image URL (Optional)"
        placeholder="Enter URL to cover image..."
        onChange={formik.handleChange}
      />

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
          Create Blog Post
        </button>
      </div>

      {isLoading && <Loader />}
    </form>
  );
} 