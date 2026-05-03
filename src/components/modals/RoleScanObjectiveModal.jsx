import { useState } from 'react';
import { useApp, TABS } from '../../context/AppContext';

export default function RoleScanObjectiveModal() {
  const { showRoleScanObjectiveModal, setShowRoleScanObjectiveModal, setIsUserInLab, currentUser, setActiveTab } = useApp();
  const [objective, setObjective] = useState('');
  const [projectName, setProjectName] = useState('');
  const [formationName, setFormationName] = useState('');

  if (!showRoleScanObjectiveModal) return null;

  const finalize = () => {
    if (!objective.trim()) { alert("Veuillez indiquer l'objectif de votre visite."); return; }

    const logEntry = {
      userId: currentUser.uid || 'guest',
      userName: `${currentUser.prenom || ''} ${currentUser.nom || ''}`.trim(),
      type: 'in',
      objective,
      project: projectName,
      formation: formationName,
      timestamp: new Date().toISOString()
    };

    let attendance = [];
    try { attendance = JSON.parse(localStorage.getItem('lab_attendance') || '[]'); } catch {}
    attendance.unshift(logEntry);
    localStorage.setItem('lab_attendance', JSON.stringify(attendance));

    setIsUserInLab(true);
    setObjective(''); setProjectName(''); setFormationName('');
    setShowRoleScanObjectiveModal(false);
    alert("Entrée enregistrée avec succès !");
    setActiveTab(TABS.FABLAB);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-midnight-blue/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl flex flex-col space-y-6 transition-transform duration-300 relative">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-midnight-blue">Objectif de votre visite</h3>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-midnight-blue/40 uppercase px-1">Veuillez indiquer l'objectif <span className="text-red-500">*</span></label>
            <input value={objective} onChange={e => setObjective(e.target.value)} type="text" placeholder="Entrez l'objectif..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-midnight-blue text-sm font-bold transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-midnight-blue/40 uppercase px-1">Nom du projet (si applicable)</label>
            <input value={projectName} onChange={e => setProjectName(e.target.value)} type="text"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-midnight-blue text-sm font-bold transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-midnight-blue/40 uppercase px-1">Nom de la formation (si applicable)</label>
            <input value={formationName} onChange={e => setFormationName(e.target.value)} type="text"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-midnight-blue text-sm font-bold transition-all" />
          </div>
        </div>

        <button onClick={finalize}
          className="w-full py-4 bg-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all shrink-0">
          Valider
        </button>
      </div>
    </div>
  );
}
