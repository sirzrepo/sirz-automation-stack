import { useState, useEffect } from "react";
import Input from "../../components/common/input";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../utils";
import Loader from "../../features/loader";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { DocumentType } from "../../types";
import { useAuth } from "../../context/AuthContext";

interface UpdateDocumentFormProps {
    document?: DocumentType;
    onSuccess?: () => void;
}

export default function UpdateDocumentForm({ document, onSuccess }: UpdateDocumentFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { userId } = useAuth();

    // Check if document is undefined and handle gracefully
    useEffect(() => {
        if (!document) {
            setError("No document data found. Please try again.");
            console.error("Document data is undefined");
        } else {
            setError(null);
        }
    }, [document]);

    const formik = useFormik({
        initialValues: {
            documentName: document?.documentName || "",
            fileUrl: document?.fileUrl || "",
            projectId: document?.projectId || "",
        },
        onSubmit: async (values) => {
            if (!document || !document._id) {
                setError("Cannot update: Missing document data");
                return;
            }

            setIsLoading(true);
            try {
                const payload = { ...values, userId };
                const response = await axios.put(`${BASE_URL}/api/documents/${document._id}`, payload);
                setIsLoading(false);
                console.log("Document updated:", response.data);
                dispatch(closeModal());
                
                // Call the onSuccess callback if provided
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Failed to update document:", error);
                setError("Failed to update document. Please try again.");
                setIsLoading(false);
                dispatch(closeModal());
            }
        },
    });

    // Update form values when document prop changes
    useEffect(() => {
        if (document) {
            formik.setValues({
                documentName: document.documentName || "",
                fileUrl: document.fileUrl || "",
                projectId: document.projectId || "",
            });
        }
    }, [document]);

    // Show error message if document is undefined
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
                Update Document
              </button>
            </div>

            {isLoading && <Loader />}
        </form>
    );
} 