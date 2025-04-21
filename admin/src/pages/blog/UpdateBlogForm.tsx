import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { closeModal } from "../../store/modalSlice";
import Input from "../../components/common/input";
import Loader from "../../features/loader";
import { X } from "lucide-react";
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import { FontSize } from '@tiptap/extension-font-size';
import { LineHeight } from "../../services/lineHeight";

  // Custom line height extension
  const CustomLineHeight = Extension.create({
    name: 'customLineHeight',
    addGlobalAttributes() {
      return [
        {
          types: ['paragraph', 'heading'],
          attributes: {
            lineHeight: {
              default: null,
              parseHTML: element => element.style.lineHeight,
              renderHTML: attributes => {
                if (attributes.lineHeight) {
                  return { style: `line-height: ${attributes.lineHeight}` };
                }
                return {};
              }
            }
          }
        }
      ];
    },
    addCommands() {
      return {
        setLineHeight: (lineHeight: string | number) => ({ chain }) => {
          return chain().setMark('textStyle', { lineHeight }).run();
        },
      };
    },
  });

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
    }
  }, [blog]);

  // Enhanced TipTap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Preserve more of the original formatting
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        paragraph: {
          HTMLAttributes: {
            class: 'preserve-whitespace',
          },
        },
        italic: {},
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      LineHeight,
      TextStyle,
      Color,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'listItem'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Image,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Typography,
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      CustomLineHeight,
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
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('strike') ? 'bg-gray-200' : ''}`}
              title="Strikethrough"
            >
              <span className="line-through">S</span>
            </button>

            <div className="border-r border-gray-300 mx-1 h-6"></div>

            {/* Font Family */}
            <select
              onChange={(e) => {
                editor?.chain().focus().setFontFamily(e.target.value).run();
              }}
              className="px-2 py-1 rounded text-sm bg-white border border-gray-200"
              title="Font Family"
            >
              <option value="">Font</option>
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
            </select>

            {/* Font Size */}
            <select
              onChange={(e) => {
                editor?.chain().focus().setFontSize(e.target.value).run();
              }}
              className="px-2 py-1 rounded text-sm bg-white border border-gray-200"
              title="Font Size"
            >
              <option value="">Size</option>
              <option value="8pt">8</option>
              <option value="10pt">10</option>
              <option value="12pt">12</option>
              <option value="14pt">14</option>
              <option value="16pt">16</option>
              <option value="18pt">18</option>
              <option value="20pt">20</option>
              <option value="24pt">24</option>
              <option value="30pt">30</option>
              <option value="36pt">36</option>
              <option value="48pt">48</option>
              <option value="60pt">60</option>
              <option value="72pt">72</option>
            </select>

            {/* Line Height */}
            <select
              onChange={(e) => {
                editor?.chain().focus().setLineHeight(e.target.value).run();
              }}
              className="px-2 py-1 rounded text-sm bg-white border border-gray-200"
              title="Line Height"
            >
              <option value="">Line Height</option>
              <option value="1">1.0</option>
              <option value="1.15">1.15</option>
              <option value="1.5">1.5</option>
              <option value="2">2.0</option>
              <option value="2.5">2.5</option>
              <option value="3">3.0</option>
            </select>

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
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleTaskList().run()}
              className={`px-2 py-1 rounded ${editor?.isActive('taskList') ? 'bg-gray-200' : ''}`}
              title="Task List"
            >
              ☑ Tasks
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
            <button
              type="button"
              onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
              className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}`}
              title="Justify"
            >
              ⇔
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
            <button
              type="button"
              onClick={() => editor?.chain().focus().setColor('#FFA500').run()}
              className="px-2 py-1 rounded"
              title="Orange"
            >
              <div className="w-4 h-4 bg-orange-500"></div>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().setColor('#800080').run()}
              className="px-2 py-1 rounded"
              title="Purple"
            >
              <div className="w-4 h-4 bg-purple-600"></div>
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
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHighlight({ color: '#8CE99A' }).run()}
              className="px-2 py-1 rounded"
              title="Green Highlight"
            >
              <span className="bg-green-200">H</span>
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleHighlight({ color: '#FF8787' }).run()}
              className="px-2 py-1 rounded"
              title="Red Highlight"
            >
              <span className="bg-red-200">H</span>
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

            <div className="border-r border-gray-300 mx-1 h-6"></div>

            {/* Clear Formatting */}
            <button
              type="button"
              onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
              className="px-2 py-1 rounded"
              title="Clear Formatting"
            >
              Clear
            </button>
          </div>
          <div className="tiptap-editor-content prose prose-sm sm:prose-base prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal min-h-[200px] p-3">
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