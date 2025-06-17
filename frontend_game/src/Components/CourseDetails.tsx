"use client" 
import { CourseContext } from '@/Context/CourceDetails';
import React, {  useCallback, useContext } from 'react';

interface CourseDetailsProps {
  onSubmit?: (data: CourseFormData) => void;
}

interface CourseFormData {
  courseTitle: string;
  description: string;
  tags: string[];
  targetAudience: string;
  thumbnail: File | null;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ onSubmit }) => {
  
  const { courseTitle,
            setCourseTitle,
            description,
            setDescription,
            tags,
            setTags,
            targetAudience,
            setTargetAudience,
            thumbnail,
            setThumbnail,
            errors,
            setErrors}=useContext(CourseContext)
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CourseFormData, string>> = {};
    
    if (!courseTitle?.trim()) newErrors.courseTitle = 'Course title is required';
    if (!description?.trim()) newErrors.description = 'Description is required';
    if (!targetAudience) newErrors.targetAudience = 'Target audience is required';
    
    setErrors?.(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && onSubmit) {
      onSubmit({
        courseTitle,
        description,
        tags: tags?.split(',').map(tag => tag?.trim()),
        targetAudience,
        thumbnail
      });
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail?.(file);
    }
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#f9fbfc] w-[90vw]">
      <div className="bg-white p-4 md:p-8 flex flex-col md:flex-row justify-between gap-5 md:gap-10 rounded-xl shadow-sm">
        <div className="w-full md:flex-1 flex flex-col">
          <label className="font-bold mt-3 md:mt-5 mb-1 text-gray-800">Course Title</label>
          <input 
            type="text" 
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle?.(e.target.value)}
            className={`p-2 md:p-3 rounded-lg border ${errors?.courseTitle ? 'border-red-500' : 'border-gray-200'} text-sm w-full`}
          />
          {errors?.courseTitle && <span className="text-red-500 text-xs mt-1">{errors.courseTitle}</span>}

          <label className="font-bold mt-3 md:mt-5 mb-1 text-gray-800">Description</label>
          <textarea 
            rows={5} 
            placeholder="Describe your course"
            value={description}
            onChange={(e) => setDescription?.(e.target.value)}
            className={`p-2 md:p-3 rounded-lg border ${errors?.description ? 'border-red-500' : 'border-gray-200'} text-sm w-full resize-y`}
          ></textarea>
          {errors?.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}

          <label className="font-bold mt-3 md:mt-5 mb-1 text-gray-800">Tags</label>
          <input 
            type="text" 
            value={tags}
            onChange={(e) => setTags?.(e.target.value)}
            className="p-2 md:p-3 rounded-lg border border-gray-200 text-sm w-full"
          />
          <small className="text-xs text-gray-500 mt-1">Separate tags with commas</small>

          <label className="font-bold mt-3 md:mt-5 mb-1 text-gray-800">Course Complexity</label>
          <select 
            value={targetAudience}
            onChange={(e) => setTargetAudience?.(e.target.value)}
            className={`p-2 md:p-3 rounded-lg border ${errors?.targetAudience ? 'border-red-500' : 'border-gray-200'} text-sm w-full`}
          >
            <option value="">Select Complexity</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors?.targetAudience && <span className="text-red-500 text-xs mt-1">{errors.targetAudience}</span>}
        </div>

        <div className="w-full md:flex-1 flex flex-col">
          <label className="font-bold mt-3 md:mt-5 mb-1 text-gray-800">Course Thumbnail</label>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg text-center p-4 md:p-10 mt-4 bg-gray-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {thumbnail ? (
              <div className="relative">
                <img 
                  src={URL.createObjectURL(thumbnail)} 
                  alt="Thumbnail preview" 
                  className="max-w-full h-auto rounded"
                />
                <button
                  onClick={() => setThumbnail?.(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="text-3xl md:text-4xl mb-2">🖼️</div>
                <p className="text-sm md:text-base">Drag and drop an image or click to browse</p>
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) setThumbnail?.(file);
                    };
                    input.click();
                  }}
                  className="mt-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 text-sm md:text-base"
                >
                  ⬆️ Upload Image
                </button>
              </>
            )}
            <span className="block mt-2 text-xs text-gray-500">
              Recommended size: 1280x720px (16:9)
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Course Details
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;
