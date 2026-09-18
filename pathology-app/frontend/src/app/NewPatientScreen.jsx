import React, { useRef } from 'react';
import { X, Images, Camera, Plus } from 'lucide-react';

export default function NewPatientScreen({ draftCase, setDraftCase, onCancel, onProceed }) {
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setDraftCase((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setDraftCase((prev) => ({
      ...prev,
      slides: [...prev.slides, ...newUrls],
    }));
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <header className="bg-[#1e4db7] text-white px-5 pt-6 pb-4 flex items-center justify-between shadow-sm">
          <button
            type="button"
            onClick={onCancel}
            className="p-1 -ml-1 text-white/90 hover:text-white rounded-full transition hover:bg-white/10"
          >
            <X size={22} />
          </button>

          <div className="text-center">
            <h1 className="text-base font-semibold leading-tight">New Patient</h1>
            <p className="text-[11px] text-blue-200 font-normal">Case Identifier</p>
          </div>

          <button
            type="button"
            onClick={onProceed}
            className="text-sm font-medium text-white/90 hover:text-white transition"
          >
            Save
          </button>
        </header>

        {/* Inputs */}
        <div className="p-5 space-y-4">
          <input
            type="text"
            placeholder="Patient Full Name or Unique ID"
            value={draftCase.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e4db7]/30 focus:border-[#1e4db7]"
          />

          <input
            type="number"
            placeholder="Age"
            value={draftCase.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e4db7]/30 focus:border-[#1e4db7]"
          />

          <input
            type="text"
            placeholder="Gender / Sex"
            value={draftCase.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e4db7]/30 focus:border-[#1e4db7]"
          />

          {/* Pathology Images Upload Section */}
          <div className="pt-2">
            <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase">
              Pathology Images &amp; Slides
            </label>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="mt-2.5 p-3 rounded-xl border border-dashed border-sky-300 bg-sky-50/40 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1e4db7] text-white shadow-sm hover:bg-[#183e95] active:scale-[0.98] transition"
              >
                <Images size={28} className="mb-2" />
                <span className="text-xs font-medium">From Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#dbeafe] text-[#1e4db7] hover:bg-blue-100 active:scale-[0.98] transition"
              >
                <Camera size={28} className="mb-2 text-[#1e4db7]" />
                <span className="text-xs font-semibold">Camera Drop</span>
              </button>
            </div>
          </div>

          {/* Slides Carousel */}
          <div className="pt-1 flex items-center gap-2.5 overflow-x-auto pb-1">
            {draftCase.slides.map((url, idx) => (
              <div
                key={idx}
                className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm"
              >
                <img src={url} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 rounded-lg border border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-600 hover:bg-slate-100 transition flex-shrink-0"
            >
              <Plus size={16} />
              <span className="text-[9px] font-medium leading-none mt-1">Add More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-5 pb-6">
        <button
          type="button"
          onClick={onProceed}
          className="w-full py-3.5 bg-[#0e274e] text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow hover:bg-[#091a35] active:scale-[0.99] transition"
        >
          Save Case
        </button>
      </div>
    </div>
  );
}