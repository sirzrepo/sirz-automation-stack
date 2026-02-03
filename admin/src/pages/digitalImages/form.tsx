import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { closeModal } from "../../store/modalSlice";
import Input from "../../components/common/input";
import Loader from "../../features/loader";
import { Upload, Link as LinkIcon } from "lucide-react";
import ImageUploadComponent from "../../services/cloudinary";

interface DigitalImageFormProps {
  onSuccess?: () => void;
}

interface FormValues {
  title: string;
  category: string;
  image: string;
  status: "Draft" | "Published";
}

export default function DigitalImageForm({ onSuccess }: DigitalImageFormProps) {
  const dispatch = useDispatch();
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      category: "",
      image: "",
      status: "Draft",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      if (!values.title) errors.title = "Title is required";
      if (!values.category) errors.category = "Category is required";
      if (!values.image) errors.image = "Image is required";
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        await axios.post(`${BASE_URL}/api/digital-images`, values);
        if (onSuccess) onSuccess();
        resetForm();
        setImagePreview("");
        dispatch(closeModal());
      } catch (err) {
        console.error("Failed to create digital image", err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = () => dispatch(closeModal());

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      {/* Title */}
      <Input
        name="title"
        title="Title"
        placeholder="Enter title..."
        value={formik.values.title}
        onChange={formik.handleChange}
        required
        error={formik.touched.title && formik.errors.title}
      />

      {/* Category */}
      <Input
        name="category"
        title="Category"
        placeholder="Enter category..."
        value={formik.values.category}
        onChange={formik.handleChange}
        required
        error={formik.touched.category && formik.errors.category}
      />

      {/* Image */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            type="button"
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              uploadMethod === "file" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setUploadMethod("file");
              formik.setFieldValue("image", "");
              setImagePreview("{}");
            }}
          >
            <Upload className="w-4 h-4 mr-2" /> Upload File
          </button>
          <button
            type="button"
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              uploadMethod === "url" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setUploadMethod("url");
              formik.setFieldValue("image", "");
              setImagePreview("");
            }}
          >
            <LinkIcon className="w-4 h-4 mr-2" /> Image URL
          </button>
        </div>

        {uploadMethod === "url" ? (
          <Input
            name="image"
            title="Image URL"
            placeholder="https://example.com/image.jpg"
            value={formik.values.image}
            onChange={(e) => {
              formik.handleChange(e);
              setImagePreview(e.target.value);
            }}
            required
            error={formik.touched.image && formik.errors.image}
            icon={<LinkIcon className="w-4 h-4 text-gray-400" />}
          />
        ) : (
          <ImageUploadComponent
            onUpload={({ url }) => {
              formik.setFieldValue("image", url);
              setImagePreview(url);
            }}
            buttonText="Upload Image"
            className="w-full"
          />
        )}

        {/* Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mb-7">
        <label className="flex justify-between items-center mb-1">
          <h2 className="font-bold">Status</h2>
        </label>
        <div className="border-[1.4px] px-3 py-2">
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            className="border-0 outline-none w-full"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 bg-[#FAFAFA] p-4">
        <button
          type="button"
          onClick={handleClose}
          className="bg-white text-black px-4 py-2 rounded-sm hover:bg-slate-100 border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-colorBlueDeep text-white px-4 py-2 rounded-sm hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {isLoading && <Loader />}
    </form>
  );
}
