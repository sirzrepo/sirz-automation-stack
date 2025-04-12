import { useState, useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { LuImageUp } from "react-icons/lu";
import Input from "../../components/common/input";
import TextArea from "../../components/common/textarea";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../utils";
import Loader from "../../features/loader";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { useAuth } from "../../context/AuthContext";

interface ProjectFormProps {
  onSuccess?: () => void;
}

export default function ProjectForm({ onSuccess }: ProjectFormProps) {
    const [status, setStatus] = useState("Planned"); // Default selected status
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { userId } = useAuth();
    const [attachmentType, setAttachmentType] = useState<"url" | "file">("url");
    const [imageType, setImageType] = useState<"url" | "file">("url");
    const attachmentFileRef = useRef<HTMLInputElement>(null);
    const imageFileRef = useRef<HTMLInputElement>(null);

    const formik = useFormik({
        initialValues: {
          projectName: "",
          attachment: "",
          consultant: "",
          manager: "",
          notes: "",
          projectImage: "",
          status: "Planned",
        },
        onSubmit: async (values, { resetForm }) => {
            console.log("values", values);
            setIsLoading(true);
            try {
                const payload = { ...values, status, userId };
                const response = await axios.post(`${BASE_URL}/api/projects`, payload);
                setIsLoading(false);
                console.log("Project created:", response.data);
                resetForm();
                setStatus("Planned");
                dispatch(closeModal());
                
                // Call the onSuccess callback if provided
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Failed to create project:", error);
                setIsLoading(false);
                dispatch(closeModal());
            }
        },
    });

    const handleFileUpload = (field: 'attachment' | 'projectImage', e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // For now, we'll just use the file name as a placeholder
                // In a real app, you'd upload this to a server and get back a URL
                formik.setFieldValue(field, file.name);
            };
            
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            {/* Project Name Input */}
            <Input
                name="projectName"
                value={formik.values.projectName}
                title="Project Name"
                placeholder="Enter project name..."
                onChange={formik.handleChange}
                required
            />

            {/* Consultant Input */}
            <Input
                name="consultant"
                value={formik.values.consultant}
                title="Consultant"
                placeholder="Enter consultant name..."
                onChange={formik.handleChange}
                required
            />

            {/* Manager Input */}
            <Input
                name="manager"
                value={formik.values.manager}
                title="Manager"
                placeholder="Enter manager name..."
                onChange={formik.handleChange}
                required
            />

            {/* Notes TextArea */}
            <TextArea
                name="notes"
                value={formik.values.notes}
                title="Notes"
                placeholder="Project notes..."
                onChange={formik.handleChange}
                required
            />

            {/* Attachment Input */}
            <div className="mb-5">
                <label className="flex justify-between items-center mb-2">
                    <h2 className="font-bold">Attachment</h2>
                    <p className="text-sm text-gray-500">Required</p>
                </label>
                
                <div className="flex gap-3 mb-2">
                    <button 
                        type="button" 
                        className={`px-3 py-1 text-sm rounded border ${attachmentType === 'url' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
                        onClick={() => setAttachmentType('url')}
                    >
                        URL
                    </button>
                    <button 
                        type="button" 
                        className={`px-3 py-1 text-sm rounded border ${attachmentType === 'file' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
                        onClick={() => setAttachmentType('file')}
                    >
                        File
                    </button>
                </div>
                
                {attachmentType === 'url' ? (
                    <Input
                        name="attachment"
                        value={formik.values.attachment}
                        title="Attachment URL"
                        placeholder="Enter attachment URL..."
                        onChange={formik.handleChange}
                        required
                    />
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 mt-2">
                        <input 
                            type="file" 
                            ref={attachmentFileRef}
                            className="hidden" 
                            onChange={(e) => handleFileUpload('attachment', e)}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                            <BsCloudUpload className="text-2xl text-gray-500" />
                            <button
                                type="button"
                                onClick={() => attachmentFileRef.current?.click()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Select File
                            </button>
                            <p className="text-sm text-gray-500 mt-1">
                                {formik.values.attachment ? `Selected: ${formik.values.attachment}` : "No file selected"}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Project Image Input */}
            <div className="mb-5">
                <label className="flex justify-between items-center mb-2">
                    <h2 className="font-bold">Project Image</h2>
                    <p className="text-sm text-gray-500">Optional</p>
                </label>
                
                <div className="flex gap-3 mb-2">
                    <button 
                        type="button" 
                        className={`px-3 py-1 text-sm rounded border ${imageType === 'url' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
                        onClick={() => setImageType('url')}
                    >
                        URL
                    </button>
                    <button 
                        type="button" 
                        className={`px-3 py-1 text-sm rounded border ${imageType === 'file' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100'}`}
                        onClick={() => setImageType('file')}
                    >
                        Image
                    </button>
                </div>
                
                {imageType === 'url' ? (
                    <Input
                        name="projectImage"
                        value={formik.values.projectImage}
                        title="Project Image URL"
                        placeholder="Enter image URL..."
                        onChange={formik.handleChange}
                    />
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 mt-2">
                        <input 
                            type="file" 
                            ref={imageFileRef}
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleFileUpload('projectImage', e)}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                            <LuImageUp className="text-2xl text-gray-500" />
                            <button
                                type="button"
                                onClick={() => imageFileRef.current?.click()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Select Image
                            </button>
                            <p className="text-sm text-gray-500 mt-1">
                                {formik.values.projectImage ? `Selected: ${formik.values.projectImage}` : "No image selected"}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Selection */}
            <div className="mb-7">
                <label className="flex justify-between items-center">
                    <h2 className="font-bold">Status</h2>
                    <p className="text-sm text-gray-500">Required</p>
                </label>
                <div className="flex sm:gap-5 gap-3 mt-4 justify-center">
                    {["Planned", "In progress", "Completed"].map((item) => (
                        <div
                            key={item}
                            className={`px-4 py-2 text-sm rounded-3xl border-[1.5px] border-[#737373] cursor-pointer text-center w-28 transition-all
                            ${status === item ? "bg-[#CFD7FE] text-black border-[#3752E9]" : "bg-gray-200 text-gray-700"}
                            hover:bg-gray-50`}
                            onClick={() => {
                                setStatus(item);
                                formik.setFieldValue("status", item);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex absolute bottom-0 left-0 right-0 justify-end items-center h-[10%] gap-2 bg-[#FAFAFA]'>
              <button
                onClick={handleClose} 
                className="text-md w-fit bg-white text-black px-4 py-2 rounded-sm hover:bg-slate-100 border border-colorBlueDeep transition "
              >
                Cancel
              </button>

              <button
                // onClick={onclick}
                type='submit'
                className="text-md w-fit bg-colorBlueDeep text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition "
              >
                Create Project
              </button>
            </div>

            {isLoading && <Loader />}
        </form>
    );
}