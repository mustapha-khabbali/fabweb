import { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export default function ProjectCreateForm({ onBack }) {
  const { userProjects, saveProjects } = useApp();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleCreate = () => {
    if (!title || !desc) {
      alert("Titre et description requis.");
      return;
    }
    const newProject = {
      id: crypto.randomUUID(),
      title, description: desc, image: null, journals: [], color: '#3B5FE6'
    };
    saveProjects([...userProjects, newProject]);
    setTitle(''); setDesc('');
    onBack();
  };

  return (
    <div className="flex flex-col space-y-6 p-6 lg:max-w-3xl lg:mx-auto lg:w-full lg:py-16">
      <div className="flex items-center space-x-4 pt-4 lg:pt-0 lg:mb-4">
        <button onClick={onBack} className="p-2 text-midnight-blue/40 hover:text-midnight-blue transition-colors lg:bg-white lg:rounded-full lg:shadow-sm lg:p-3 lg:-ml-2 lg:hover:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-midnight-blue lg:text-3xl">Nouveau Projet</h2>
      </div>

      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 space-y-6 lg:p-10 lg:shadow-xl lg:rounded-[40px] lg:space-y-8">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-widest px-1">Titre du Projet</label>
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Entrez le titre..."
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-midnight-blue outline-none transition-all font-bold text-midnight-blue" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between px-1">
            <label className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-widest">Description</label>
            <span className="text-[10px] font-bold text-midnight-blue/20">{desc.length}/255</span>
          </div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows="5" maxLength="255" placeholder="Décrivez votre idée, vos objectifs..."
            className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-midnight-blue outline-none transition-all custom-scrollbar text-midnight-blue font-medium" />
        </div>
        <button onClick={handleCreate}
          className="w-full py-5 bg-midnight-blue text-white font-bold text-lg rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all">Créer le projet</button>
      </div>
    </div>
  );
}
