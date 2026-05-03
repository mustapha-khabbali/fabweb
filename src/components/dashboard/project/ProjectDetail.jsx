import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import ModifyProjectModal from './ModifyProjectModal';
import JournalCreateModal from './JournalCreateModal';
import JournalReaderModal from './JournalReaderModal';

const JOURNAL_COLORS = ['#FF6B6B', '#4ECDC4', '#3B5FE6', '#FF9F43', '#10AC84', '#EE5253', '#5F27CD', '#222F3E'];

export default function ProjectDetail({ onBack }) {
  const { userProjects, saveProjects, currentProjectId, recycleBin, saveRecycleBin } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showJournalReader, setShowJournalReader] = useState(false);
  const [activeJournal, setActiveJournal] = useState(null);

  const project = userProjects.find(p => p.id === currentProjectId);
  if (!project) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleModify = () => {
    setShowModify(true);
    setMenuOpen(false);
  };

  const saveEdits = (newTitle, newDesc) => {
    const updated = userProjects.map(p =>
      p.id === currentProjectId ? { ...p, title: newTitle, description: newDesc } : p
    );
    saveProjects(updated);
    setShowModify(false);
  };

  const updateMainImage = (input) => {
    const file = input.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = userProjects.map(p =>
        p.id === currentProjectId ? { ...p, image: e.target.result } : p
      );
      saveProjects(updated);
      alert("Image mise à jour");
    };
    reader.readAsDataURL(file);
  };

  const confirmRemove = () => {
    if (confirm("Are you sure you want to remove this project?")) {
      const remaining = userProjects.filter(p => p.id !== currentProjectId);
      saveProjects(remaining);
      saveRecycleBin([project, ...recycleBin]);
      alert("Projet déplacé vers la corbeille");
      onBack();
    }
    setMenuOpen(false);
  };

  const openJournalForm = () => {
    setShowJournalModal(true);
    setMenuOpen(false);
  };

  const saveJournal = (date, content, tempImage) => {
    const entry = { id: crypto.randomUUID(), date, content, image: tempImage };
    const updated = userProjects.map(p =>
      p.id === currentProjectId ? { ...p, journals: [entry, ...p.journals] } : p
    );
    saveProjects(updated);
    setShowJournalModal(false);
  };

  const openJournalReader = (journal) => {
    setActiveJournal(journal);
    setShowJournalReader(true);
  };

  return (
    <div className="flex flex-col space-y-6 pb-24 relative p-6 lg:max-w-6xl lg:mx-auto lg:w-full lg:py-12 lg:px-12 lg:space-y-10 lg:pb-32">
      {/* Header with Hamburger */}
      <div className="flex items-center justify-between pt-4 px-2 lg:pt-0">
        <button onClick={onBack} className="p-2 text-midnight-blue/40 hover:text-midnight-blue transition-colors lg:bg-white lg:rounded-full lg:shadow-sm lg:p-3 lg:-ml-4 lg:hover:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold text-midnight-blue truncate max-w-[150px] lg:max-w-none lg:text-4xl lg:flex-1 lg:ml-6 lg:tracking-tight">{project.title}</h2>
        <button onClick={toggleMenu} className="p-2 text-midnight-blue hover:bg-gray-100 rounded-full transition-colors relative lg:bg-white lg:shadow-sm lg:p-4 lg:hover:shadow-md lg:border lg:border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <button onClick={handleModify} className="w-full p-4 text-left text-sm font-bold text-midnight-blue hover:bg-gray-50 border-b border-gray-50 flex items-center space-x-3">
            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <span>Modifier</span>
          </button>
          <button onClick={openJournalForm} className="w-full p-4 text-left text-sm font-bold text-midnight-blue hover:bg-gray-50 border-b border-gray-50 flex items-center space-x-3">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            <span>Ajouter Journal</span>
          </button>
          <button onClick={confirmRemove} className="w-full p-4 text-left text-sm font-bold text-red-500 hover:bg-red-50 flex items-center space-x-3">
            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            <span>Supprimer</span>
          </button>
        </div>
      )}

      {/* Project Info */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 space-y-4 mx-2 lg:p-10 lg:rounded-[40px] lg:shadow-xl lg:mx-0 lg:flex lg:flex-row-reverse lg:gap-12 lg:space-y-0 lg:items-start lg:border-none">
        {project.image && (
          <div className="w-full h-48 rounded-2xl overflow-hidden shadow-sm mt-2 lg:w-[40%] lg:h-72 lg:mt-0 lg:shadow-2xl lg:rounded-[32px] lg:shrink-0 lg:border-4 lg:border-white">
            <img src={project.image} className="w-full h-full object-cover" alt="Project" />
          </div>
        )}
        <div className="space-y-1 lg:flex-1 lg:space-y-4">
          <h3 className="text-[10px] font-bold text-midnight-blue/30 uppercase tracking-[0.2em] lg:text-sm lg:tracking-widest">Description</h3>
          <p className="text-sm text-midnight-blue/80 font-medium leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere lg:text-lg lg:leading-loose">{project.description}</p>
        </div>
      </div>

      {/* Journal Section */}
      <div className="space-y-4 px-2 lg:px-0 lg:mt-12 lg:bg-white lg:p-10 lg:rounded-[40px] lg:shadow-xl lg:border-none">
        <h3 className="text-[10px] font-bold text-midnight-blue/30 uppercase tracking-[0.2em] px-2 lg:text-sm lg:tracking-widest lg:px-1 lg:mb-8">Journaux</h3>
        {(!project.journals || project.journals.length === 0) ? (
          <div className="text-center py-6 text-midnight-blue/20 italic text-sm lg:py-16 lg:text-lg">Aucun journal</div>
        ) : (
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-6 lg:gap-8 lg:gap-y-12">
            {project.journals.map((j, idx) => (
              <button key={j.id} onClick={() => openJournalReader(j)} className="flex flex-col items-center space-y-2 group transition-all active:scale-95 lg:bg-gray-50/50 lg:p-6 lg:rounded-[32px] lg:border lg:border-gray-100 lg:hover:shadow-xl lg:hover:-translate-y-2 lg:hover:bg-white lg:duration-300">
                <div className="w-full aspect-square rounded-[20px] shadow-md flex items-center justify-center group-hover:rotate-2 transition-transform lg:w-24 lg:h-24 lg:rounded-3xl lg:shadow-lg lg:group-hover:rotate-6 lg:group-hover:scale-110 lg:duration-300" style={{ backgroundColor: JOURNAL_COLORS[idx % JOURNAL_COLORS.length] }}>
                  <svg className="h-8 w-8 text-white lg:h-10 lg:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-midnight-blue/60 text-center uppercase tracking-tighter lg:text-xs lg:mt-6 lg:tracking-wide lg:text-midnight-blue/80">
                  {new Date(j.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modify Modal */}
      {showModify && (
        <ModifyProjectModal project={project} onSave={saveEdits} onCancel={() => setShowModify(false)} updateMainImage={updateMainImage} />
      )}

      {/* Journal Modal */}
      {showJournalModal && (
        <JournalCreateModal onSave={saveJournal} onCancel={() => setShowJournalModal(false)} />
      )}

      {/* Journal Reader Modal */}
      <JournalReaderModal activeJournal={showJournalReader ? activeJournal : null} onClose={() => setShowJournalReader(false)} />
    </div>
  );
}
