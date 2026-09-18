import React from 'react';
import { Home, ClipboardList, UserPlus, Image as ImageIcon, Plus } from 'lucide-react';

export default function WorkspaceScreen({ cases, onAddNew, onSelectCase }) {
  return (
    <div className="flex-1 flex flex-col justify-between h-full relative">
      {/* Content */}
      <div className="flex-1 flex flex-col pb-20 overflow-hidden">
        {/* Header */}
        <header className="bg-[#1e4db7] text-white px-6 pt-7 pb-6 rounded-b-[20px] shadow-sm flex-shrink-0">
          <h1 className="text-xl font-semibold tracking-wide">
            Pathology Workspace
          </h1>
        </header>

        {/* Case Cards List */}
        <main className="p-4 space-y-3.5 flex-1 overflow-y-auto">
          {cases.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCase(item)}
              className="bg-white border border-[#2b59c3]/30 rounded-xl p-4 shadow-sm hover:border-[#1e4db7] hover:shadow transition cursor-pointer"
            >
              <p className="text-[13px] font-medium text-slate-700 leading-tight">
                #{item.id} &bull; {item.name} ({item.ageGender})
              </p>
              <h2 className="text-[15px] font-semibold text-slate-900 mt-1 mb-2">
                {item.procedure}
              </h2>
              <div className="flex items-center text-xs text-slate-500 font-medium space-x-1.5">
                <ImageIcon size={14} className="text-slate-700" />
                <span>{item.slidesCount} slides</span>
                <span className="text-slate-400">&bull;</span>
                <span>Added {item.timeAgo}</span>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onAddNew}
        aria-label="Add Case"
        className="absolute right-5 bottom-20 w-12 h-12 bg-[#1e4db7] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#183e95] active:scale-95 transition-transform z-10"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-10">
        <button
          type="button"
          className="flex flex-col items-center flex-1 py-1 text-slate-400 hover:text-slate-700"
        >
          <Home size={22} />
          <span className="text-[11px] font-medium mt-1">Home</span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center flex-1 py-1 text-[#1e4db7]"
        >
          <ClipboardList size={22} />
          <span className="text-[11px] font-medium mt-1">Cases</span>
        </button>

        <button
          type="button"
          onClick={onAddNew}
          className="flex flex-col items-center flex-1 py-1 text-slate-400 hover:text-slate-700"
        >
          <UserPlus size={22} />
          <span className="text-[11px] font-medium mt-1">Add Patient</span>
        </button>
      </nav>
    </div>
  );
}