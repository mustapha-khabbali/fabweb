import { useState } from 'react';

export default function ModifyProjectModal({ project, onSave, onCancel, updateMainImage }) {
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDesc, setEditDesc] = useState(project.description);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-midnight-blue/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-8 shadow-2xl flex flex-col space-y-6">
        <h3 className="text-2xl font-bold text-midnight-blue">Modifier Projet</h3>
        <div className="space-y-4">
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} type="text" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:border-midnight-blue border border-transparent font-bold" />
          <div className="space-y-1">
            <div className="flex justify-between px-1">
              <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">Description</span>
              <span className="text-[10px] font-bold text-midnight-blue/20">{editDesc.length}/255</span>
            </div>
            <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows="4" maxLength="255" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:border-midnight-blue border border-transparent font-medium" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">Image Principale</span>
            <label className="bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
              <input type="file" className="hidden" onChange={updateMainImage} />Changer
            </label>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={onCancel} className="flex-1 py-4 bg-gray-100 text-midnight-blue font-bold rounded-2xl">Annuler</button>
          <button onClick={() => onSave(editTitle, editDesc)} className="flex-1 py-4 bg-midnight-blue text-white font-bold rounded-2xl">Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}
