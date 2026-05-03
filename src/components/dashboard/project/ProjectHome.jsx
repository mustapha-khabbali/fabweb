import { useApp } from '../../../context/AppContext';

export default function ProjectHome({ onCreateProject, onShowDetail, onShowRecycle, onShowArticles }) {
  const { userProjects, setCurrentProjectId } = useApp();

  const handleProjectClick = (id) => {
    setCurrentProjectId(id);
    onShowDetail();
  };

  return (
    <div className="flex flex-col h-full lg:relative lg:bg-gray-50/50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#F8FAFC] pt-8 pb-4 px-6 shrink-0 border-b border-gray-100/50 lg:bg-transparent lg:border-none lg:pt-12 lg:px-12">
        <h2 className="text-2xl font-bold text-midnight-blue lg:text-4xl">Mon Projet</h2>
      </div>

      {/* Scrollable Grid Section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 lg:px-12 lg:py-8">
        <div className="space-y-6 lg:max-w-7xl lg:mx-auto">
          <h3 className="text-[10px] font-bold text-midnight-blue/30 uppercase tracking-[0.2em] px-1 lg:text-sm lg:tracking-widest">Mes Dossiers</h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-6 lg:gap-8 lg:gap-y-12">
            {userProjects.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-midnight-blue/20 italic text-sm lg:col-span-6 lg:py-20 lg:text-lg">Aucun projet</div>
            ) : (
              userProjects.map(p => (
                <button key={p.id} onClick={() => handleProjectClick(p.id)} className="flex flex-col items-center space-y-2 group transition-all active:scale-95 lg:bg-white lg:p-6 lg:rounded-[32px] lg:shadow-sm lg:border lg:border-gray-100 lg:hover:shadow-xl lg:hover:-translate-y-2 lg:duration-300">
                  <div className="w-full aspect-square flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative lg:w-32 lg:h-32">
                    <svg className="w-full h-full text-[#FFCD29] drop-shadow-md lg:drop-shadow-xl" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.89 21.11 6 20 6H12L10 4Z" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pt-2 lg:pt-4">
                      <svg className="h-6 w-6 text-white/40 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-midnight-blue/80 text-center truncate w-full px-1 capitalize lg:text-sm lg:mt-6 lg:text-midnight-blue">{p.title}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="sticky bottom-0 z-20 bg-white/90 backdrop-blur-xl p-6 shrink-0 border-t border-gray-100 flex items-center justify-between gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] lg:absolute lg:top-12 lg:right-12 lg:bottom-auto lg:w-auto lg:border-none lg:shadow-none lg:bg-transparent lg:p-0 lg:gap-4 lg:flex-row">
        <button onClick={onCreateProject} className="flex-1 flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-[28px] shadow-sm space-y-2 hover:bg-gray-50 transition-all active:scale-95 lg:flex-row lg:flex-initial lg:px-6 lg:py-3 lg:rounded-full lg:h-12 lg:space-y-0 lg:space-x-2 lg:bg-[#3B5FE6] lg:hover:bg-blue-700 lg:border-none lg:shadow-lg lg:hover:shadow-[#3B5FE6]/30">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl lg:p-0 lg:bg-transparent lg:text-white">
            <svg className="h-6 w-6 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          </div>
          <span className="text-[10px] font-bold text-midnight-blue uppercase tracking-tight lg:text-xs lg:text-white lg:tracking-wide">Créer Projet</span>
        </button>
        <button onClick={onShowArticles} className="flex-1 flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-[28px] shadow-sm space-y-2 hover:bg-gray-50 transition-all active:scale-95 lg:flex-row lg:flex-initial lg:px-6 lg:py-3 lg:rounded-full lg:h-12 lg:space-y-0 lg:space-x-2 lg:bg-white lg:hover:bg-gray-50 lg:border-gray-200 lg:shadow-md">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl lg:p-0 lg:bg-transparent lg:text-emerald-600">
            <svg className="h-6 w-6 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <span className="text-[10px] font-bold text-midnight-blue uppercase tracking-tight text-center lg:text-xs lg:tracking-wide">Articles</span>
        </button>
        <button onClick={onShowRecycle} className="flex-1 flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-[28px] shadow-sm space-y-2 hover:bg-gray-50 transition-all active:scale-95 lg:flex-row lg:flex-initial lg:px-6 lg:py-3 lg:rounded-full lg:h-12 lg:space-y-0 lg:space-x-2 lg:bg-white lg:hover:bg-red-50 lg:border-gray-200 lg:shadow-md lg:group">
          <div className="p-2 bg-red-50 text-red-600 rounded-xl lg:p-0 lg:bg-transparent lg:text-red-500 lg:group-hover:text-red-600">
            <svg className="h-6 w-6 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </div>
          <span className="text-[10px] font-bold text-midnight-blue uppercase tracking-tight lg:text-xs lg:tracking-wide lg:text-red-600 lg:hidden xl:block">Corbeille</span>
        </button>
      </div>
    </div>
  );
}
