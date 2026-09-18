import React, { useState } from 'react';
import WorkspaceScreen from './WorkspaceScreen';
import NewPatientScreen from './NewPatientScreen';
import CaseNotesScreen from './CaseNotesScreen';

const INITIAL_CASES = [
  {
    id: 'PAT-9082',
    name: 'Jane Doe',
    ageGender: '45F',
    procedure: 'Biopsy - Left Lymph Node',
    slidesCount: 3,
    timeAgo: '10m ago',
    notes: 'Biopsy - Left Lymph Node, H&E Stain',
  },
  {
    id: 'PAT-9083',
    name: 'Jane Doe',
    ageGender: '45F',
    procedure: 'Biopsy - Left Lymph Node',
    slidesCount: 3,
    timeAgo: '10m ago',
    notes: 'Frozen Section, Malignant',
  },
];

const EMPTY_DRAFT = {
  name: '',
  age: '',
  gender: '',
  notes: '',
  slides: [
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=150&auto=format&fit=crop&q=80',
  ],
};

export default function App() {
  const [screen, setScreen] = useState('workspace'); // 'workspace' | 'new-patient' | 'case-notes'
  const [cases, setCases] = useState(INITIAL_CASES);
  const [draftCase, setDraftCase] = useState(EMPTY_DRAFT);

  // Navigate to Add Case
  const handleAddNew = () => {
    setDraftCase(EMPTY_DRAFT);
    setScreen('new-patient');
  };

  // Inspect or Edit Existing Case Notes
  const handleSelectCase = (selectedCase) => {
    setDraftCase({
      name: selectedCase.name,
      age: selectedCase.ageGender.replace(/[^0-9]/g, ''),
      gender: selectedCase.ageGender.replace(/[0-9]/g, ''),
      notes: selectedCase.notes || selectedCase.procedure,
      slides: EMPTY_DRAFT.slides,
    });
    setScreen('case-notes');
  };

  // Final Step: Complete flow and update case list
  const handleCompleteFlow = () => {
    const newEntry = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: draftCase.name || 'Anonymous Patient',
      ageGender: `${draftCase.age || '45'}${draftCase.gender?.[0]?.toUpperCase() || 'F'}`,
      procedure: draftCase.notes.split(',')[0] || 'Biopsy - Left Lymph Node',
      slidesCount: draftCase.slides.length,
      timeAgo: 'Just now',
      notes: draftCase.notes,
    };

    setCases([newEntry, ...cases]);
    setScreen('workspace');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start sm:py-6">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md bg-white min-h-screen sm:min-h-[820px] sm:max-h-[820px] sm:rounded-3xl shadow-xl flex flex-col overflow-hidden relative border border-slate-200">
        
        {screen === 'workspace' && (
          <WorkspaceScreen
            cases={cases}
            onAddNew={handleAddNew}
            onSelectCase={handleSelectCase}
          />
        )}

        {screen === 'new-patient' && (
          <NewPatientScreen
            draftCase={draftCase}
            setDraftCase={setDraftCase}
            onCancel={() => setScreen('workspace')}
            onProceed={() => setScreen('case-notes')}
          />
        )}

        {screen === 'case-notes' && (
          <CaseNotesScreen
            draftCase={draftCase}
            setDraftCase={setDraftCase}
            onBack={() => setScreen('new-patient')}
            onComplete={handleCompleteFlow}
          />
        )}

      </div>
    </div>
  );
}