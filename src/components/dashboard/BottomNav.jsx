import { useApp, TABS } from '../../context/AppContext';

const FabLabIcon = ({ className }) => (
  <div className={`h-6 w-6 flex items-center justify-center scale-110 ${className}`}>
    <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g transform="translate(0 460) scale(1 -1)" fill="currentColor">
        <path d="M 189.167,361.167 L 189.167,320.78 C 190.617,320.227 192.03,319.564 193.389,318.764 C 212.644,307.411 214.668,275.161 197.906,246.735 C 181.146,218.309 151.95,204.468 132.695,215.82 C 113.44,227.173 111.417,259.422 128.176,287.849 C 130.88,292.434 133.91,296.633 137.167,300.414 L 137.167,330.417 L 95.667,306.667 L 95.667,157.917 L 81.1201,148.314 C 67.8691,172.458 60.333,200.183 60.333,229.667 C 60.333,321.277 133.024,395.86 223.901,398.87 L 223.917,381.417 L 189.167,361.167 Z" />
        <path d="M 140.968,124.801 L 166.333,139.833 C 165.833,144.001 165.817,148.59 165.833,150.167 C 166.065,172.518 196.335,189.509 229.333,189.167 C 262.331,188.825 285.833,168.834 285.667,149.167 C 285.479,126.816 263.985,109.317 231.0,108.334 C 219.833,108.001 209.068,110.23 204.167,111.167 L 185.667,99.334 L 229.667,74.2295 L 359.375,149.625 L 374.25,141.46 C 359.938,117.929 339.671,97.5654 314.119,82.8535 C 234.727,37.1445 133.821,62.9277 85.8701,140.184 L 100.625,149.5 L 140.968,124.801 Z" />
        <path d="M 363.75,206.75 L 336.168,221.168 C 335.168,221.001 329.046,215.27 327.668,214.501 C 308.142,203.623 279.395,218.006 263.334,246.834 C 247.273,275.66 248.643,308.62 268.168,319.501 C 287.695,330.378 316.771,317.327 332.834,288.501 C 335.424,283.851 338.884,273.055 340.501,268.334 L 364.0,254.75 L 363.861,306.328 L 234.5,381.875 L 234.563,398.897 C 262.094,398.134 289.826,390.626 315.27,375.729 C 394.323,329.437 421.952,229.021 378.63,149.079 L 363.75,157.25 L 363.75,206.75 Z" />
      </g>
    </svg>
  </div>
);

export default function BottomNav() {
  const { activeTab, setActiveTab, currentUser } = useApp();
  const isStagiaire = currentUser?.role === 'stagiaire';

  const tabs = [
    { id: TABS.FABLAB, label: 'Fab-Lab', icon: 'fablab' },
    { id: TABS.SCAN, label: 'Scan', icon: 'scan' },
    { id: TABS.NOTIFICATIONS, label: 'Notifs', icon: 'notifications' },
    { id: TABS.MY_PROJECT, label: 'Mon Projet', icon: 'my-project' },
    { id: TABS.PROFILE, label: 'Profile', icon: 'profile' },
  ];

  const getActiveClass = (tabId) => {
    if (tabId === activeTab) {
      return tabId === TABS.FABLAB
        ? 'text-primary-blue-top drop-shadow-[0_0_8px_#00D2FF]'
        : 'text-[#3B5FE6]';
    }
    return 'text-midnight-blue/40';
  };

  const renderIcon = (icon) => {
    switch (icon) {
      case 'fablab':
        return <FabLabIcon />;
      case 'scan':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        );
      case 'notifications':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'my-project':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'profile':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center justify-around shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        // Hide Notifications and My Project for non-stagiaire
        if (!isStagiaire && (tab.id === TABS.NOTIFICATIONS || tab.id === TABS.MY_PROJECT)) return null;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-item flex flex-col items-center space-y-1 px-4 transition-all duration-300 ${getActiveClass(tab.id)}`}
          >
            {renderIcon(tab.icon)}
            <span className={`text-[9px] font-bold ${tab.id === TABS.MY_PROJECT ? 'whitespace-nowrap' : ''}`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
