
import { FiDownload, FiEye, FiMoreVertical } from 'react-icons/fi';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
}

const DocumentsTable = () => {
  // Sample documents data
  const documents: Document[] = [
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'PDF',
      size: '2.5 MB',
      lastModified: 'Dec 10, 2023'
    },
    {
      id: 2,
      name: 'Requirements.docx',
      type: 'DOCX',
      size: '1.8 MB',
      lastModified: 'Dec 15, 2023'
    },
    {
      id: 3,
      name: 'Design Assets.zip',
      type: 'ZIP',
      size: '15.2 MB',
      lastModified: 'Dec 18, 2023'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Modified
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((document) => (
            <tr key={document.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{document.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {document.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {document.size}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {document.lastModified}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    title="View"
                  >
                    <FiEye className="h-5 w-5" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    title="Download"
                  >
                    <FiDownload className="h-5 w-5" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    title="More options"
                  >
                    <FiMoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;