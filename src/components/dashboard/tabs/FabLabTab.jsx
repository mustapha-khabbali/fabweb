export default function FabLabTab() {
  return (
    <div className="flex flex-col p-6 space-y-8 min-h-full">
      <div className="text-center space-y-2 pt-4">
        <div className="h-20 w-20 mx-auto mb-4 bg-white rounded-2xl shadow-sm p-2 flex items-center justify-center">
          <img src="/f.webp" alt="Fab Lab Logo" className="max-h-full max-w-full object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-midnight-blue">L'Univers Fab Lab</h2>
        <p className="text-sm text-midnight-blue/60 font-medium leading-relaxed px-4">
          Un laboratoire de fabrication numérique ouvert à tous pour concrétiser vos idées.
        </p>
      </div>

      {/* Definition Section */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center space-x-3 text-[#3B5FE6]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="font-bold text-lg">C'est quoi un Fab Lab ?</h3>
        </div>
        <p className="text-sm text-midnight-blue/70 leading-relaxed">
          Le concept de <b>Fab Lab</b> (Fabrication Laboratory) est un réseau mondial de laboratoires locaux qui dopent l'inventivité en donnant accès à des outils de fabrication numérique. C'est un espace de partage de connaissances où l'on peut fabriquer (presque) n'importe quoi.
        </p>
      </div>

      {/* Machines Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-midnight-blue/40 uppercase tracking-[0.2em] px-2">Nos Machines</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Impression 3D", desc: "Créez des objets physiques couche par couche à partir de modèles numériques.", color: "blue", icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" },
            { name: "Découpe Laser", desc: "Découpez ou gravez divers matériaux avec une précision chirurgicale.", color: "emerald", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { name: "Fraisage CNC", desc: "Usinage de précision pour le bois, le métal et les circuits imprimés.", color: "purple", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
            { name: "Électronique", desc: "Postes de soudure, oscilloscopes et conception de circuits.", color: "orange", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
          ].map((machine) => (
            <div key={machine.name} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className={`p-2 bg-${machine.color}-50 text-${machine.color}-600 rounded-xl w-fit`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={machine.icon} />
                </svg>
              </div>
              <h4 className="font-bold text-sm text-midnight-blue">{machine.name}</h4>
              <p className="text-[11px] text-midnight-blue/60 leading-tight">{machine.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-[#3B5FE6] rounded-[32px] p-6 shadow-xl text-white space-y-6">
        <h3 className="font-bold text-xl">Comment ça marche ?</h3>
        <div className="space-y-4">
          {[
            { step: 1, text: <><b>Imaginez</b> votre concept ou projet.</> },
            { step: 2, text: <><b>Modélisez</b> en utilisant nos logiciels de CAO.</> },
            { step: 3, text: <><b>Fabriquez</b> avec l'aide de nos experts.</> }
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start space-x-4">
              <div className="bg-white/20 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shrink-0">{step}</div>
              <p className="text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-24"></div>
    </div>
  );
}
