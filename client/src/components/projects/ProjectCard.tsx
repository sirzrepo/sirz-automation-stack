import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  dueDate: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status,
  progress,
  dueDate
}) => {
  const statusColors = {
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreVertical className="h-5 w-5" />
        </button>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
          >
            {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
          <span className="text-sm text-gray-500">Due {dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;