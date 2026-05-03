import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppContext = createContext(null);

// All possible screens in the app
export const SCREENS = {
  HOME: 'home',
  ROLE_SELECTION: 'role-selection',
  STAGIAIRE: 'stagiaire',
  ROLE_REGISTRATION: 'role-registration',
  CHARTE: 'charte',
  DASHBOARD: 'dashboard',
};

// Dashboard tab names
export const TABS = {
  FABLAB: 'fablab',
  SCAN: 'scan',
  NOTIFICATIONS: 'notifications',
  MY_PROJECT: 'my-project',
  PROFILE: 'profile',
};

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // We can derive currentScreen from the pathname if really needed, but mostly we just navigate
  const currentScreen = location.pathname === '/' ? SCREENS.HOME : location.pathname.replace('/', '');

  // Dashboard tab
  const [activeTab, setActiveTab] = useState(TABS.SCAN);

  // User state
  const [currentUser, setCurrentUser] = useState({});
  const [pendingRole, setPendingRole] = useState('');

  // Lab presence state
  const [isUserInLab, setIsUserInLab] = useState(false);

  // Feedback state
  const [currentRating, setCurrentRating] = useState(0);

  // Profile editing
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Project management
  const [userProjects, setUserProjects] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user_projects') || '[]'); } catch { return []; }
  });
  const [recycleBin, setRecycleBin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recycle_bin') || '[]'); } catch { return []; }
  });
  const [currentProjectId, setCurrentProjectId] = useState(null);

  // Article management
  const [userArticles, setUserArticles] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user_articles') || '[]'); } catch { return []; }
  });

  // Modal states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showScanObjectiveModal, setShowScanObjectiveModal] = useState(false);
  const [showRoleScanObjectiveModal, setShowRoleScanObjectiveModal] = useState(false);

  // Charte navigation memory
  const [charteReturnScreen, setCharteReturnScreen] = useState(SCREENS.STAGIAIRE);
  const [registrationDraft, setRegistrationDraft] = useState({});

  // Navigate to screen with transition
  const navigateTo = useCallback((screen) => {
    navigate(`/${screen === SCREENS.HOME ? '' : screen}`);
  }, [navigate]);

  // Navigate to charte, remembering where to return
  const goToCharte = useCallback((returnTo) => {
    setCharteReturnScreen(returnTo);
    navigate('/charte');
  }, [navigate]);

  const returnFromCharte = useCallback(() => {
    navigate(`/${charteReturnScreen}`);
  }, [navigate, charteReturnScreen]);

  // Show dashboard and set default tab
  const showDashboard = useCallback(() => {
    navigate('/dashboard');
    setActiveTab(TABS.SCAN);
  }, [navigate]);

  // Project helpers with localStorage sync
  const saveProjects = useCallback((projects) => {
    setUserProjects(projects);
    localStorage.setItem('user_projects', JSON.stringify(projects));
  }, []);

  const saveRecycleBin = useCallback((bin) => {
    setRecycleBin(bin);
    localStorage.setItem('recycle_bin', JSON.stringify(bin));
  }, []);

  const saveArticles = useCallback((articles) => {
    setUserArticles(articles);
    localStorage.setItem('user_articles', JSON.stringify(articles));
  }, []);

  const value = {
    // Screen navigation
    currentScreen,
    navigateTo,
    goToCharte,
    returnFromCharte,
    showDashboard,

    // Dashboard tabs
    activeTab,
    setActiveTab,

    // User
    currentUser,
    setCurrentUser,
    pendingRole,
    setPendingRole,

    // Lab state
    isUserInLab,
    setIsUserInLab,

    // Feedback
    currentRating,
    setCurrentRating,
    showFeedbackModal,
    setShowFeedbackModal,

    // Scan modals
    showScanObjectiveModal,
    setShowScanObjectiveModal,
    showRoleScanObjectiveModal,
    setShowRoleScanObjectiveModal,

    // Profile
    isProfileEditing,
    setIsProfileEditing,

    // Draft form
    registrationDraft,
    setRegistrationDraft,

    // Projects
    userProjects,
    saveProjects,
    recycleBin,
    saveRecycleBin,
    currentProjectId,
    setCurrentProjectId,

    // Articles
    userArticles,
    saveArticles,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
