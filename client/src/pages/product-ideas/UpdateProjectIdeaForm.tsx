import { useState, useEffect } from "react";
import Input from "../../components/common/input";
import TextArea from "../../components/common/textarea";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../utils";
import Loader from "../../features/loader";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { ProjectIdeaType } from "../../types";
import { useAuth } from "../../context/AuthContext";

interface UpdateProjectIdeaFormProps {
    idea?: ProjectIdeaType;
    onSuccess?: () => void;
}

export default function UpdateProjectIdeaForm({ idea, onSuccess }: UpdateProjectIdeaFormProps) {
    const [status, setStatus] = useState(idea?.status || "Planned");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const { userId } = useAuth();

    useEffect(() => {
        if (!idea) {
            setError("No project idea data found. Please try again.");
            console.error("Project idea data is undefined");
        } else {
            setError(null);
        }
    }, [idea]);

    const formik = useFormik({
        initialValues: {
            idea: idea?.idea || "",
            notes: idea?.notes || "",
            service: idea?.service || "",
            status: idea?.status || "Planned",
        },
        onSubmit: async (values) => {
            if (!idea || !idea._id) {
                setError("Cannot update: Missing project idea data");
                return;
            }

            setIsLoading(true);
            try {
                const payload = { ...values, status, userId };
                const response = await axios.put(`${BASE_URL}/api/project-ideas/${idea._id}`, payload);
                setIsLoading(false);
                console.log("Project idea updated:", response.data);
                dispatch(closeModal());
                
                // Call the onSuccess callback if provided
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error("Failed to update project idea:", error);
                setError("Failed to update project idea. Please try again.");
                setIsLoading(false);
                dispatch(closeModal());
            }
        },
    });

    // Update form values when idea prop changes
    useEffect(() => {
        if (idea) {
            formik.setValues({
                idea: idea.idea || "",
                notes: idea.notes || "",
                service: idea.service || "",
                status: idea.status || "Planned",
            });
            setStatus(idea.status || "Planned");
        }
    }, [idea]);

    // Show error message if idea is undefined
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
            {/* Services Dropdown */}
            <div className="mb-7">
                <label className="flex justify-between items-center">
                    <h2 className="font-bold">Services</h2>
                    <p className="text-sm">Required</p>
                </label>
                <div className="border-[1.4px] px-3 py-2">
                    <select
                        name="service"
                        value={formik.values.service}
                        onChange={formik.handleChange}
                        className="border-0 outline-none w-full"
                    >
                        <option value="">Select Service</option>
                        <option value="service1">Service 1</option>
                        <option value="service2">Service 2</option>
                    </select>
                </div>
            </div>

            {/* Idea Input */}
            <Input
                name="idea"
                value={formik.values.idea}
                title="Idea"
                placeholder="Type here..."
                onChange={formik.handleChange}
            />

            {/* Notes TextArea */}
            <TextArea
                name="notes"
                value={formik.values.notes}
                title="Notes"
                placeholder="Type here..."
                onChange={formik.handleChange}
            />

            {/* Status Selection */}
            <div className="mb-7">
                <label className="flex justify-between items-center">
                    <h2 className="font-bold">Status</h2>
                    <p className="text-sm text-gray-500">Required</p>
                </label>
                <div className="flex sm:gap-5 gap-3 mt-4 justify-center">
                    {["Planned", "In progress", "Complete"].map((item) => (
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
                Update Idea
              </button>
            </div>

            {isLoading && <Loader />}
        </form>
    );
} 