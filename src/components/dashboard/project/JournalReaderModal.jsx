export default function JournalReaderModal({ activeJournal, onClose }) {
  if (!activeJournal) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-midnight-blue/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-8 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold text-[#3B5FE6] uppercase bg-blue-50 px-3 py-1 rounded-full">
            {new Date(activeJournal.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-midnight-blue transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
          <div className="text-midnight-blue text-sm font-medium leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">{activeJournal.content}</div>
          {activeJournal.image && (
            <div className="w-full rounded-2xl overflow-hidden shadow-sm">
              <img src={activeJournal.image} className="w-full h-auto" alt="Journal" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
