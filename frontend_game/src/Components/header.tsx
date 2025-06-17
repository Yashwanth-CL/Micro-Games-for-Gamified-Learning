"use client"

function Header() {
  return (
    <div className="w-full border-b border-[#e0e0e0] bg-white font-sans">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl text-[#222] m-0">Design Your Course</h1>
          <span className="text-sm px-2.5 py-1 border border-[#d0d0d0] rounded-full text-[#555] bg-[#f5f5f5]">Draft</span>
        </div>
        <div className="flex gap-2.5">
          <button className="text-sm px-3 py-2 border border-[#ccc] rounded-md bg-white cursor-pointer hover:bg-[#f0f0f0]">👁️ Preview</button>
          <button className="text-sm px-3 py-2 border border-[#ccc] rounded-md bg-white cursor-pointer hover:bg-[#f0f0f0]">📝 Save Draft</button>
          <button className="text-sm px-3 py-2 rounded-md bg-[#0d6efd] text-white border-none cursor-pointer hover:bg-[#0b5ed7]">✅ Publish Course</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
