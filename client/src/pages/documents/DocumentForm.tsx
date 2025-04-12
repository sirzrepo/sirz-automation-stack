import { useState } from "react";
import Input from "../../components/common/input";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../utils";
import Loader from "../../features/loader";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { useAuth } from "../../context/AuthContext";

interface DocumentFormProps {
  onSuccess?: () => void;
}

export default function DocumentForm({ onSuccess }: DocumentFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { userId } = useAuth();

    const formik = useFormik({
        initialValues: {
          documentName: "",
          fileUrl: "",
          projectId: "",
        },
        onSubmit: async (values, { resetForm }) => {
            console.log("values", values);
            setIsLoading(true);
            try {
                const payload = { ...values, userId };
                const response = await axios.post(`${BASE_URL}/api/documents`, payload);
                setIsLoading(false);
                console.log("Document created:", response.data);
                resetForm();
                dispatch(closeModal());
                
                // Call the onSuccess callback if provided
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Failed to create document:", error);
                setIsLoading(false);
                dispatch(closeModal());
            }
        },
    });

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            {/* Document Name Input */}
            <Input
                name="documentName"
                value={formik.values.documentName}
                title="Document Name"
                placeholder="Enter document name..."
                onChange={formik.handleChange}
                required
            />

            {/* Project ID Input */}
            <Input
                name="projectId"
                value={formik.values.projectId}
                title="Project ID"
                placeholder="Enter project ID..."
                onChange={formik.handleChange}
                required
            />

            {/* File URL Input */}
            <Input
                name="fileUrl"
                value={formik.values.fileUrl}
                title="File URL (Optional)"
                placeholder="Link to document..."
                onChange={formik.handleChange}
            />

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
                Submit Document
              </button>
            </div>

            {isLoading && <Loader />}
        </form>
    );
}