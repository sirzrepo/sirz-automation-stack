import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../utils";
import { closeModal } from "../../../../store/modalSlice";
import Input from "../../../../components/common/input";
import TextArea from "../../../../components/common/textarea";
import Loader from "../../../../features/loader";

interface ProjectFormProps {
  onSuccess?: () => void;
}

export default function ProjectForm({ onSuccess }: ProjectFormProps) {
  const [status, setStatus] = useState("Planned");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const formik = useFormik({
    initialValues: {
      projectName: "",
      consultant: "",
      manager: "",
      notes: "",
      attachment: "",
      projectImage: "",
      status: "Planned",
    },
    onSubmit: async (values, { resetForm }) => {
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
        placeholder="Enter project notes..."
        onChange={formik.handleChange}
      />

      {/* Attachment URL Input */}
      <Input
        name="attachment"
        value={formik.values.attachment}
        title="Attachment URL (Optional)"
        placeholder="Enter URL to attachment..."
        onChange={formik.handleChange}
      />

      {/* Project Image URL Input */}
      <Input
        name="projectImage"
        value={formik.values.projectImage}
        title="Project Image URL (Optional)"
        placeholder="Enter URL to project image..."
        onChange={formik.handleChange}
      />

      {/* Status Dropdown */}
      <div className="mb-7">
        <label className="flex justify-between items-center">
          <h2 className="font-bold">Status</h2>
          <p className="text-sm">Required</p>
        </label>
        <div className="border-[1.4px] px-3 py-2">
          <select
            name="status"
            value={formik.values.status}
            onChange={(e) => {
              formik.handleChange(e);
              setStatus(e.target.value);
            }}
            className="border-0 outline-none w-full"
          >
            <option value="Planned">Planned</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
            <option value="On hold">On hold</option>
          </select>
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