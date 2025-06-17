"use client"
import React from 'react';

const Publish = () => {
  return (
    <div className="p-8 bg-[#f9fbfc] font-sans min-h-screen">
      <h2 className="text-[22px] mb-1 font-semibold">Publish Settings</h2>
      <p className="text-sm text-gray-600 mb-8">Configure how and when your course will be available</p>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-lg shadow-sm">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="font-bold text-sm">Publication Status</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                <input type="radio" name="status" className="w-4 h-4 text-blue-600" />
                <span className="ml-2">Save as Draft</span>
              </label>
              <label className="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
                <input type="radio" name="status" defaultChecked className="w-4 h-4 text-blue-600" />
                <span className="ml-2">Publish Now</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bold text-sm">Course Duration</label>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <input type="number" placeholder="Duration (hours)" defaultValue={2} className="p-3 text-sm border border-gray-300 rounded-md w-full hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" />
              </div>
              <div className="flex-1">
                <input type="number" placeholder="Days to Complete" defaultValue={30} className="p-3 text-sm border border-gray-300 rounded-md w-full hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bold text-sm">Visibility Period</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input type="date" className="p-3 text-sm border border-gray-300 rounded-md flex-1 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" />
              <input type="date" className="p-3 text-sm border border-gray-300 rounded-md flex-1 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="font-bold text-sm">Access Control</label>
            <div className="flex flex-col gap-2">
              <label className="block hover:bg-gray-50 p-2 rounded cursor-pointer">
                <div className="flex items-center">
                  <input type="radio" name="access" className="w-4 h-4 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-800">Private</span>
                </div>
                <span className="block text-[13px] text-gray-600 ml-6">Only invited users can access</span>
              </label>
              <label className="block hover:bg-gray-50 p-2 rounded cursor-pointer">
                <div className="flex items-center">
                  <input type="radio" name="access" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-800">Organization-wide</span>
                </div>
                <span className="block text-[13px] text-gray-600 ml-6">All members of your organization can access</span>
              </label>
              <label className="block hover:bg-gray-50 p-2 rounded cursor-pointer">
                <div className="flex items-center">
                  <input type="radio" name="access" className="w-4 h-4 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-800">Public</span>
                </div>
                <span className="block text-[13px] text-gray-600 ml-6">Anyone with the link can access</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bold text-sm">Completion Settings</label>
            <div className="flex flex-col gap-2">
              <label className="block hover:bg-gray-50 p-2 rounded cursor-pointer">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-800">Issue Certificate</span>
                </div>
                <span className="block text-[13px] text-gray-600 ml-6">Learners receive a certificate upon completion</span>
              </label>
              <label className="block hover:bg-gray-50 p-2 rounded cursor-pointer">
                <div className="flex items-center">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-800">Track Progress</span>
                </div>
                <span className="block text-[13px] text-gray-600 ml-6">Monitor learner progress and completion rates</span>
              </label>
              <label className="block hover:bg-gray-50 p-2 rounded cursor-pointer">
                <div className="flex items-center">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-800">Send Notifications</span>
                </div>
                <span className="block text-[13px] text-gray-600 ml-6">Notify learners about course updates</span>
              </label>
            </div>
          </div>

          <div className="bg-[#fff9e5] border-l-4 border-l-[#ffc107] p-4 text-sm rounded-md hover:bg-[#fff5d4] transition-colors">
            <strong className="block mb-1.5 text-[#cc9900] flex items-center">
              <span className="mr-1">⚠</span> Important Note
            </strong>
            <p className="text-[#666]">
              Once published, your course will be available to the selected audience. You can still make edits after publishing, but learners who have already started the course will not see the changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
