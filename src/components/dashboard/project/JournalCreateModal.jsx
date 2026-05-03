import { useState, useRef } from 'react';

export default function JournalCreateModal({ onSave, onCancel }) {
  const [content, setContent] = useState('');
  const [tempImage, setTempImage] = useState(null);
  const dateRef = useRef(null);

  const previewImage = (input) => {
    const file = input.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setTempImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const date = dateRef.current?.value;
    if (!content.trim()) return;
    onSave(date, content, tempImage);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-midnight-blue/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-8 shadow-2xl flex flex-col h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-midnight-blue">Nouveau Journal</h3>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-midnight-blue transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-6 px-1 custom-scrollbar">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-widest px-1">Date</label>
            <input ref={dateRef} type="date" defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-midnight-blue outline-none transition-all font-bold text-midnight-blue" />
          </div>
          <div className="space-y-1.5 flex-1 flex flex-col min-h-[200px]">
            <label className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-widest px-1">Compte-rendu</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}
              className="w-full flex-1 p-4 bg-gray-50 rounded-2xl focus:bg-white focus:border-midnight-blue border border-transparent outline-none transition-all text-midnight-blue text-sm font-medium custom-scrollbar resize-none" placeholder="Que s'est-il passé aujourd'hui ?" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-widest">Photo</span>
              <label className="cursor-pointer text-[#3B5FE6] text-[10px] font-bold uppercase hover:underline">
                <input type="file" className="hidden" accept="image/*" onChange={previewImage} />Sélectionner
              </label>
            </div>
            <div className="w-full h-32 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 flex items-center justify-center">
              {tempImage ? <img src={tempImage} className="w-full h-full object-cover" alt="Preview" /> : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleSave} className="w-full py-4 mt-6 bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all">Enregistrer</button>
      </div>
    </div>
  );
}
