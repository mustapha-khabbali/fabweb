import { useApp } from '../../../context/AppContext';

export default function RecycleBin({ onBack }) {
  const { recycleBin, saveRecycleBin, userProjects, saveProjects } = useApp();

  const restore = (id) => {
    const project = recycleBin.find(p => p.id === id);
    if (!project) return;
    saveRecycleBin(recycleBin.filter(p => p.id !== id));
    saveProjects([...userProjects, project]);
    alert("Projet restauré");
  };

  const permanentDelete = (id) => {
    if (confirm("Supprimer définitivement ?")) {
      saveRecycleBin(recycleBin.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] lg:bg-gray-50/50">
      <div className="pt-10 pb-6 px-6 shrink-0 lg:max-w-4xl lg:mx-auto lg:w-full lg:pt-16 lg:px-12 lg:mb-4">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button onClick={onBack} className="p-2 -ml-2 text-midnight-blue/40 hover:text-midnight-blue transition-colors lg:bg-white lg:rounded-full lg:shadow-sm lg:p-3 lg:-ml-0 lg:hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-2xl font-bold text-midnight-blue lg:text-4xl">Corbeille</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="space-y-4 lg:max-w-4xl lg:mx-auto lg:w-full lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {recycleBin.length === 0 ? (
            <div className="text-center py-10 text-midnight-blue/20 italic text-sm lg:col-span-2 lg:py-20 lg:text-lg">La corbeille est vide</div>
          ) : (
            recycleBin.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between lg:p-6 lg:rounded-[32px] lg:shadow-md lg:hover:shadow-lg lg:transition-shadow">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 relative lg:w-16 lg:h-16">
                    <svg className="w-full h-full text-[#FFCD29]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.89 21.11 6 20 6H12L10 4Z" />
                    </svg>
                  </div>
                  <span className="font-bold text-midnight-blue truncate max-w-[120px] lg:max-w-[200px] lg:text-lg">{p.title}</span>
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => restore(p.id)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                  <button onClick={() => permanentDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
