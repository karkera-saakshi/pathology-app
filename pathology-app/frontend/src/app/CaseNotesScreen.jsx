import React, { useState } from 'react';
import { ArrowLeft, Mic } from 'lucide-react';

const SUGGESTED_TAGS = ['H&E Stain', 'Biopsy', 'Malignant', 'Benign', 'Frozen Section'];

export default function CaseNotesScreen({ draftCase, setDraftCase, onBack, onComplete }) {
  const [isRecording, setIsRecording] = useState(false);

  const handleAddTag = (tag) => {
    setDraftCase((prev) => ({
      ...prev,
      notes: prev.notes ? `${prev.notes.trimEnd()}, ${tag}` : tag,
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <header className="bg-[#1e4db7] text-white px-5 pt-6 pb-5 flex items-center shadow-sm flex-shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 mr-3 text-white/90 hover:text-white rounded-full transition hover:bg-white/10"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-semibold tracking-wide">Add Case Notes</h1>
      </header>

      {/* Note Area */}
      <main className="flex-1 p-4 flex flex-col overflow-hidden">
        <div className="w-full flex-1 border border-slate-300 rounded-2xl p-4 flex flex-col bg-white overflow-hidden">
          
          {/* Notes Area & Voice */}
          <div className="relative flex-1 min-h-[160px] pb-4 border-b border-slate-100">
            <textarea
              value={draftCase.notes}
              onChange={(e) =>
                setDraftCase((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Enter gross pathology observations, tissue origin, stain details (e.g., H&E, IHC)..."
              className="w-full h-full pr-10 resize-none text-[13px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />

            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`absolute top-0 right-0 p-2 rounded-xl transition ${
                isRecording
                  ? 'bg-red-50 text-red-600 ring-2 ring-red-300 animate-pulse'
                  : 'bg-blue-50 text-[#1e4db7] hover:bg-blue-100'
              }`}
            >
              <Mic size={18} />
            </button>
          </div>

          {/* Quick Tags */}
          <div className="pt-3.5 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 active:bg-blue-50 active:text-[#1e4db7] border border-slate-200/80 rounded-lg text-xs font-medium text-slate-700 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          {/* Complete Submission Button */}
          <button
            type="button"
            onClick={onComplete}
            className="w-full py-3 mt-4 bg-[#1e4db7] text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow hover:bg-[#183e95] active:scale-[0.99] transition flex-shrink-0"
          >
            Complete &amp; Save
          </button>
        </div>
      </main>
    </div>
  );
}