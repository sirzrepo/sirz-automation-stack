import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { closeModal } from "../../store/modalSlice";
import Input from "../../components/common/input";
import Loader from "../../features/loader";
import { X } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';

interface BlogType {
  _id?: string;
  title: string;
  summary: string;
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
      summary: blog?.summary || "",
      content: blog?.content || "",
      coverImage: blog?.coverImage || "",
      slug: blog?.slug || "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      
      if (!values.title) {
        errors.title = "Title is required";
      }
      
      if (!values.summary) {
        errors.summary = "Summary is required";
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
        summary: blog.summary || "",
        content: blog.content || "",
        coverImage: blog.coverImage || "",
        slug: blog.slug || "",
      });
      setStatus(blog.status || "Draft");
    }
  }, [blog]);

  // Enhanced TipTap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Enable all features by default
        bulletList: {},
        orderedList: {},
        italic: {},
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'listItem'],
      }),
      Image,
    ],
    content: blog?.content || '',
    onUpdate: ({ editor }) => {
      formik.setFieldValue("content", editor.getHTML());
    },
  });

  // Update editor content when blog changes
  useEffect(() => {
    if (blog?.content && editor) {
      editor.commands.setContent(blog.content);
    }
  }, [blog?.content, editor]);

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

      {/* Summary Input */}
      <div className="mb-4">
        <label className="flex justify-between items-center mb-1">
          <h2 className="font-bold">Summary</h2>
          <p className="text-sm">Required</p>
        </label>
        <textarea
          name="summary"
          value={formik.values.summary}
          placeholder="Enter a brief summary of the blog post..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={3}
          className={`w-full border-[1.5px] px-3 py-2 outline-none ${
            formik.touched.summary && formik.errors.summary ? "border-red-500" : ""
          }`}
          required
        />
        {formik.touched.summary && formik.errors.summary && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.summary}</p>
        )}
      </div>

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
        <div className={`border-[1.5px] ${
          formik.touched.content && formik.errors.content ? "border-red-500" : ""
        }`}>
          {/* Text Formatting Toolbar */}
          <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
            {/* Text Style */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
              title="Bold"
            >
              <span className="font-bold">B</span>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
              title="Italic"
            >
              <span className="italic">I</span>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
              title="Underline"
            >
              <span className="underline">U</span>
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Headings */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-2 py-1 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-2 py-1 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-2 py-1 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
              title="Heading 3"
            >
              H3
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Lists */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
              title="Numbered List"
            >
              1. List
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Alignment */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
              title="Align Left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
              title="Align Center"
            >
              ↔
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
              title="Align Right"
            >
              →
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Text Colors */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().setColor('#000000').run()}
              className="px-2 py-1 rounded"
              title="Black"
            >
              <div className="w-4 h-4 bg-black"></div>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().setColor('#FF0000').run()}
              className="px-2 py-1 rounded"
              title="Red"
            >
              <div className="w-4 h-4 bg-red-600"></div>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().setColor('#0000FF').run()}
              className="px-2 py-1 rounded"
              title="Blue"
            >
              <div className="w-4 h-4 bg-blue-600"></div>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().setColor('#008000').run()}
              className="px-2 py-1 rounded"
              title="Green"
            >
              <div className="w-4 h-4 bg-green-600"></div>
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Highlight */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('highlight') ? 'bg-gray-200' : ''}`}
              title="Highlight"
            >
              <span className="bg-yellow-200">H</span>
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Quotes & Code */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('blockquote') ? 'bg-gray-200' : ''}`}
              title="Quote"
            >
              ""
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('codeBlock') ? 'bg-gray-200' : ''}`}
              title="Code Block"
            >
              {'</>'}
            </button>
            
            <div className="border-r border-gray-300 mx-1 h-6"></div>
            
            {/* Link */}
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Enter URL');
                if (url) {
                  editor?.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`px-2 py-1 rounded ${editor?.isActive('link') ? 'bg-gray-200' : ''}`}
              title="Insert Link"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={() => {
                const url = window.prompt('Enter image URL');
                if (url) {
                  editor?.chain().focus().setImage({ src: url }).run();
                }
              }}
              className="px-2 py-1 rounded"
              title="Insert Image"
            >
              🖼️
            </button>
          </div>
          <div className="tiptap-editor-content prose prose-sm sm:prose-base prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal">
            <EditorContent editor={editor} />
          </div>
        </div>
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
          Update Blog Post
        </button>
      </div>

      {isLoading && <Loader />}
    </form>
  );
} 