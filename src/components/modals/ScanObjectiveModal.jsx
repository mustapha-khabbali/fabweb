import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const OBJECTIVES = [
  { value: 'Projet en cours', label: 'Projet en cours' },
  { value: "Demande d'information", label: "Demande d'information / Consultation" },
  { value: 'Amélioration', label: "Amélioration / Demande d'idée" },
  { value: 'Formation', label: 'Formation' },
  { value: 'Stage', label: 'Stage' },
  { value: 'Autre', label: 'Autre' },
];

export default function ScanObjectiveModal() {
  const { showScanObjectiveModal, setShowScanObjectiveModal, setIsUserInLab, currentUser } = useApp();
  const [selectedObjective, setSelectedObjective] = useState('');
  const [projectName, setProjectName] = useState('');
  const [companion, setCompanion] = useState('Responsable FAB LAB');
  const [phase, setPhase] = useState('Prototypage POC');

  if (!showScanObjectiveModal) return null;

  const isProjectBranch = selectedObjective === 'Projet en cours';

  const reset = () => {
    setSelectedObjective('');
    setProjectName('');
    setCompanion('Responsable FAB LAB');
    setPhase('Prototypage POC');
  };

  const finalize = () => {
    if (!selectedObjective) { alert("Veuillez sélectionner un objectif."); return; }
    if (isProjectBranch && !projectName) { alert("Veuillez entrer le nom du projet."); return; }

    const logEntry = {
      userId: currentUser.uid || 'guest',
      userName: `${currentUser.prenom || ''} ${currentUser.nom || ''}`.trim(),
      type: 'in',
      objective: selectedObjective,
      timestamp: new Date().toISOString()
    };

    if (isProjectBranch) {
      logEntry.project = projectName;
      logEntry.companion = companion;
      logEntry.phase = phase;
    }

    let attendance = [];
    try { attendance = JSON.parse(localStorage.getItem('lab_attendance') || '[]'); } catch {}
    attendance.unshift(logEntry);
    localStorage.setItem('lab_attendance', JSON.stringify(attendance));

    setIsUserInLab(true);
    reset();
    setShowScanObjectiveModal(false);
    alert("Entrée enregistrée avec succès !");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-midnight-blue/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl flex flex-col space-y-6 transition-transform duration-300 relative">

        {/* Modal Header */}
        <div className="relative pt-2">
          {selectedObjective && (
            <button onClick={reset} className="absolute -left-2 top-0 p-2 text-midnight-blue/40 hover:text-midnight-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-midnight-blue">
              {selectedObjective || "Objectif de la visite"}
            </h3>
            <p className="text-sm text-midnight-blue/60 font-medium leading-relaxed">
              {selectedObjective ? "Veuillez compléter les détails" : "Pourquoi visitez-vous le Lab aujourd'hui ?"}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {!selectedObjective ? (
            <div className="space-y-2 max-h-[40vh] overflow-y-auto px-1 custom-scrollbar">
              {OBJECTIVES.map(obj => (
                <button key={obj.value} onClick={() => setSelectedObjective(obj.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-left text-sm font-bold text-midnight-blue hover:border-midnight-blue transition-all">
                  {obj.label}
                </button>
              ))}
            </div>
          ) : isProjectBranch ? (
            <div className="space-y-4 px-1 max-h-[40vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-midnight-blue/40 uppercase px-1">Nom de projet</label>
                <input value={projectName} onChange={e => setProjectName(e.target.value)} type="text" placeholder="Nom du projet"
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-midnight-blue text-sm font-bold transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-midnight-blue/40 uppercase px-1">Accompagné par</label>
                <select value={companion} onChange={e => setCompanion(e.target.value)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-midnight-blue text-sm font-bold transition-all">
                  <option value="Responsable FAB LAB">Responsable FAB LAB</option>
                  <option value="Responsable Entrepreneuriat">Responsable Entrepreneuriat</option>
                  <option value="Formateur">Formateur</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-midnight-blue/40 uppercase px-1">Phase de projet</label>
                <select value={phase} onChange={e => setPhase(e.target.value)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-midnight-blue text-sm font-bold transition-all">
                  <option value="Prototypage POC">Prototypage POC</option>
                  <option value="Prototypage MVP">Prototypage MVP</option>
                  <option value="Prototypage READY MARKET">Prototypage READY MARKET</option>
                  <option value="Compétition">Compétition</option>
                  <option value="Réunion / Feedback">Réunion / Feedback</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-10 px-4 text-center">
              <p className="text-midnight-blue/60 font-medium italic">Veuillez valider votre entrée pour cette activité.</p>
            </div>
          )}
        </div>

        <button onClick={finalize}
          className="w-full py-4 bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all shrink-0">
          Valider l'entrée
        </button>
      </div>
    </div>
  );
}
