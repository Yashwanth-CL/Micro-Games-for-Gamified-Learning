import { CourseContext } from "@/Context/CourceDetails";
import { useContext } from "react";

// Review page component showing course details and metadata
const ReviewPage = () => {
    const {
        courseTitle,
      description,
      tags,
      targetAudience,
      thumbnail,
      files,
      selectedPolicy,
      selectedControl,
     selectedFramework
      
      
    }=useContext(CourseContext);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Review Course Details</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Course Information</h2>
        
        <div className="mb-4">
          <label className="font-medium">Course Title</label>
          <p className="mt-1">{courseTitle}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Description</label>
          <p className="mt-1 whitespace-pre-wrap">{description}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Target Audience</label>
          <p className="mt-1">{targetAudience}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Tags</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.split(",").map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Associated Content</h2>

        <div className="mb-4">
          <label className="font-medium">Thumbnail</label>
          {thumbnail && (
            <img 
              src={URL.createObjectURL(thumbnail)} 
              alt="Course thumbnail"
              className="mt-2 w-48 h-48 object-cover rounded"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="font-medium">Course Files</label>
          <ul className="mt-2 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Compliance Information</h2>

        <div className="mb-4">
          <label className="font-medium">Selected Policy</label>
          <p className="mt-1">{selectedPolicy || 'None selected'}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Selected Control</label>
          <p className="mt-1">{selectedControl || 'None selected'}</p>
        </div>

        <div className="mb-4">
          <label className="font-medium">Selected Framework</label>
          <p className="mt-1">{selectedFramework || 'None selected'}</p>
        </div>
      </div>

      
    </div>
  );
};

export default ReviewPage;