import { useState } from 'react';
import { useApp, SCREENS } from '../../../context/AppContext';
import { validateEmail, validatePhone } from '../../../utils/validation';

export default function ProfileTab() {
  const { currentUser, setCurrentUser, navigateTo, isProfileEditing, setIsProfileEditing } = useApp();
  const isStagiaire = currentUser?.role === 'stagiaire';

  const [editForm, setEditForm] = useState({
    prenom: currentUser.prenom || '',
    nom: currentUser.nom || '',
    bio: currentUser.bio || '',
    cin: currentUser.cin || '',
    cef: currentUser.cef || '',
    email: currentUser.email || '',
    tel: currentUser.tel || '',
  });

  const updateEdit = (field, value) => setEditForm(prev => ({ ...prev, [field]: value }));

  const toggleEdit = () => {
    if (!isProfileEditing) {
      setEditForm({
        prenom: currentUser.prenom || '',
        nom: currentUser.nom || '',
        bio: currentUser.bio || '',
        cin: currentUser.cin || '',
        cef: currentUser.cef || '',
        email: currentUser.email || '',
        tel: currentUser.tel || '',
      });
    }
    setIsProfileEditing(!isProfileEditing);
  };

  const saveChanges = () => {
    if (!validateEmail(editForm.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    if (!validatePhone(editForm.tel)) {
      alert("Le numéro de téléphone doit commencer par 06 ou 07 et contenir 10 chiffres au total.");
      return;
    }
    const updated = { ...currentUser, ...editForm };
    setCurrentUser(updated);
    localStorage.setItem('user_profile_data', JSON.stringify(updated));
    setIsProfileEditing(false);
    alert("Profil mis à jour avec succès !");
  };

  const roleLabel = currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'Stagiaire';

  return (
    <div className="flex flex-col p-6 space-y-6 overflow-y-auto custom-scrollbar pt-12 pb-24">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full border-2 border-[#3B5FE6] flex items-center justify-center overflow-hidden shadow-2xl transition-transform active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-midnight-blue" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <label className="absolute bottom-1 right-1 w-9 h-9 bg-[#3B5FE6] text-white rounded-full flex items-center justify-center border-4 border-[#F0F7FF] cursor-pointer hover:brightness-110 shadow-lg">
            <input type="file" className="hidden" accept="image/*" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </label>
        </div>
        <div className="text-center space-y-2">
          {isProfileEditing ? (
            <div className="flex space-x-2 justify-center">
              <input value={editForm.prenom} onChange={e => updateEdit('prenom', e.target.value)} placeholder="Prénom"
                className="w-1/2 text-sm font-bold text-midnight-blue bg-blue-50/50 rounded-xl outline-none px-4 py-2 border-2 border-transparent focus:border-[#3B5FE6]" />
              <input value={editForm.nom} onChange={e => updateEdit('nom', e.target.value)} placeholder="Nom"
                className="w-1/2 text-sm font-bold text-midnight-blue bg-blue-50/50 rounded-xl outline-none px-4 py-2 border-2 border-transparent focus:border-[#3B5FE6]" />
            </div>
          ) : (
            <div className="text-2xl font-bold text-midnight-blue">{currentUser.prenom} {currentUser.nom}</div>
          )}
          <p className="text-midnight-blue/40 font-bold text-sm uppercase tracking-widest">{roleLabel}</p>
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-8 pt-4">
        {/* BIO Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-midnight-blue/40 uppercase tracking-widest px-1">À propos</h4>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 group">
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-[#3B5FE6]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">Bio</span>
            </div>
            {isProfileEditing ? (
              <textarea value={editForm.bio} onChange={e => updateEdit('bio', e.target.value)} rows="3"
                className="w-full text-sm font-medium text-midnight-blue bg-blue-50/50 rounded-xl outline-none p-3 border-2 border-[#3B5FE6]/20 focus:border-[#3B5FE6] transition-all" />
            ) : (
              <div className="text-sm font-medium text-midnight-blue leading-relaxed">
                {currentUser.bio || "Passionné par le Fab Lab et l'innovation technologique."}
              </div>
            )}
          </div>
        </div>

        {/* ACADEMIC Section (Stagiaire only) */}
        {isStagiaire && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-midnight-blue/40 uppercase tracking-widest px-1">Parcours Académique</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-[#3B5FE6]"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
                  <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">Pôle</span>
                </div>
                <div className="text-sm font-bold text-midnight-blue">{currentUser.pole || '-'}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-[#3B5FE6]"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                  <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">Niveau</span>
                </div>
                <div className="text-sm font-bold text-midnight-blue">{currentUser.niveau || '-'}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 group">
                <div className="flex items-center space-x-3 mb-1">
                  <div className="text-[#3B5FE6]"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                  <span className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-widest">Filière</span>
                </div>
                <div className="text-sm font-bold text-midnight-blue leading-tight">{currentUser.filiere || '-'}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <p className="text-[10px] font-bold text-midnight-blue/40 uppercase">Année</p>
                  <div className="text-sm font-bold text-midnight-blue mt-0.5">{currentUser.year || '-'}</div>
                </div>
                {currentUser.option && currentUser.option !== 'N' && (
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                    <p className="text-[10px] font-bold text-midnight-blue/40 uppercase">Option</p>
                    <div className="text-sm font-bold text-midnight-blue mt-0.5">{currentUser.option}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* IDENTITY Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-midnight-blue/40 uppercase tracking-widest px-1">Identifiants</h4>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">CIN</span>
                {isProfileEditing ? (
                  <input value={editForm.cin} onChange={e => updateEdit('cin', e.target.value)} placeholder="AB123456"
                    className="text-right w-1/2 text-sm font-bold text-midnight-blue bg-blue-50/50 rounded-lg outline-none px-2 py-1 border border-transparent focus:border-midnight-blue" />
                ) : (
                  <div className="text-sm font-bold text-midnight-blue uppercase">{currentUser.cin || '-'}</div>
                )}
              </div>
              <div className="h-[1px] bg-gray-50 w-full"></div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-midnight-blue/40 uppercase">CEF</span>
                {isProfileEditing ? (
                  <input type="number" value={editForm.cef} onChange={e => updateEdit('cef', e.target.value)} placeholder="2006062400264"
                    className="text-right w-1/2 text-sm font-bold text-midnight-blue bg-blue-50/50 rounded-lg outline-none px-2 py-1 border border-transparent focus:border-midnight-blue" />
                ) : (
                  <div className="text-sm font-bold text-midnight-blue">{currentUser.cef || '-'}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-midnight-blue/40 uppercase tracking-widest px-1">Contact</h4>
          <div className="bg-white p-1 rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            <div className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 text-[#3B5FE6] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-midnight-blue/40 uppercase">Email</p>
                {isProfileEditing ? (
                  <input value={editForm.email} onChange={e => updateEdit('email', e.target.value)}
                    className="w-full text-sm font-bold text-midnight-blue bg-blue-50/50 rounded-lg outline-none px-2 py-0.5" />
                ) : (
                  <div className="text-sm font-bold text-midnight-blue leading-tight lowercase">{currentUser.email || '-'}</div>
                )}
              </div>
            </div>
            <div className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-midnight-blue/40 uppercase">Téléphone</p>
                {isProfileEditing ? (
                  <input value={editForm.tel} onChange={e => updateEdit('tel', e.target.value)}
                    className="w-full text-sm font-bold text-midnight-blue bg-blue-50/50 rounded-lg outline-none px-2 py-0.5" />
                ) : (
                  <div className="text-sm font-bold text-midnight-blue leading-tight">{currentUser.tel || '-'}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 space-y-4">
        {!isProfileEditing ? (
          <button onClick={toggleEdit}
            className="w-full py-4 bg-white border-2 border-midnight-blue text-midnight-blue font-bold text-lg rounded-2xl shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center space-x-3 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Modifier le profil</span>
          </button>
        ) : (
          <button onClick={saveChanges}
            className="w-full py-4 bg-green-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-3 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Enregistrer les modifications</span>
          </button>
        )}

        <button onClick={() => navigateTo(SCREENS.HOME)}
          className="w-full py-4 bg-[#EB4444]/10 text-[#EB4444] font-bold text-lg rounded-2xl border-2 border-transparent hover:border-[#EB4444] transition-all flex items-center justify-center space-x-3 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
}
