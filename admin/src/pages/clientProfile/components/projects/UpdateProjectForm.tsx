import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../utils";
import { closeModal } from "../../../../store/modalSlice";
import Input from "../../../../components/common/input";
import TextArea from "../../../../components/common/textarea";
import Loader from "../../../../features/loader";

interface ProjectType {
  _id?: string;
  projectName?: string;
  consultant: string;
  manager: string;
  notes: string;
  projectImage?: string;
  attachment: string;
  status: string;
  createdAt: string;
}

interface UpdateProjectFormProps {
  project?: ProjectType;
  onSuccess?: () => void;
}

export default function UpdateProjectForm({ project, onSuccess }: UpdateProjectFormProps) {
  const [status, setStatus] = useState(project?.status || "Planned");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { userId } = useAuth();

  useEffect(() => {
    if (!project) {
      setError("No project data found. Please try again.");
      console.error("Project data is undefined");
    } else {
      setError(null);
    }
  }, [project]);

  const formik = useFormik({
    initialValues: {
      projectName: project?.projectName || "",
      consultant: project?.consultant || "",
      manager: project?.manager || "",
      notes: project?.notes || "",
      attachment: project?.attachment || "",
      projectImage: project?.projectImage || "",
      status: project?.status || "Planned",
    },
    onSubmit: async (values) => {
      if (!project || !project._id) {
        setError("Cannot update: Missing project data");
        return;
      }

      setIsLoading(true);
      try {
        const payload = { ...values, status, userId };
        const response = await axios.put(`${BASE_URL}/api/projects/${project._id}`, payload);
        setIsLoading(false);
        console.log("Project updated:", response.data);
        dispatch(closeModal());
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Failed to update project:", error);
        setError("Failed to update project. Please try again.");
        setIsLoading(false);
        dispatch(closeModal());
      }
    },
  });

  // Update form values when project prop changes
  useEffect(() => {
    if (project) {
      formik.setValues({
        projectName: project.projectName || "",
        consultant: project.consultant || "",
        manager: project.manager || "",
        notes: project.notes || "",
        attachment: project.attachment || "",
        projectImage: project.projectImage || "",
        status: project.status || "Planned",
      });
      setStatus(project.status || "Planned");
    }
  }, [project]);

  // Show error message if project is undefined
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
          Update Project
        </button>
      </div>

      {isLoading && <Loader />}
    </form>
  );
} 