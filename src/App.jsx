import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { useApp, SCREENS } from './context/AppContext';
import useBlockZoom from './hooks/useBlockZoom';

// Modals are lightweight and globally used, keep them static
import FeedbackModal from './components/modals/FeedbackModal';
import ScanObjectiveModal from './components/modals/ScanObjectiveModal';
import RoleScanObjectiveModal from './components/modals/RoleScanObjectiveModal';

// Lazy-loaded Screens for Code Splitting
const HomeScreen = lazy(() => import('./components/screens/HomeScreen'));
const RoleSelectionScreen = lazy(() => import('./components/screens/RoleSelectionScreen'));
const StagiaireScreen = lazy(() => import('./components/screens/StagiaireScreen'));
const RoleRegistrationScreen = lazy(() => import('./components/screens/RoleRegistrationScreen'));
const CharteScreen = lazy(() => import('./components/screens/CharteScreen'));
const DashboardScreen = lazy(() => import('./components/dashboard/DashboardScreen'));

function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  // If no user is set, redirect to the home page
  if (!currentUser || Object.keys(currentUser).length === 0) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();
  useBlockZoom();

  // Dashboard fills full screen, other screens are centered on gradient
  const isFullScreen = location.pathname === '/dashboard';
  const isRegistration = location.pathname === '/stagiaire' || location.pathname === '/role-registration';

  return (
    <>
      <div className={
        isFullScreen
          ? 'main-container h-dvh w-full overflow-hidden'
          : isRegistration
            ? 'main-container h-dvh flex flex-col items-center justify-start pt-0 overflow-hidden'
            : 'main-container h-dvh flex flex-col items-center justify-center p-0 md:p-12 overflow-hidden'
      }>
        <Suspense fallback={<div className="flex items-center justify-center h-full w-full text-midnight-blue">Chargement...</div>}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/role-selection" element={<RoleSelectionScreen />} />
            <Route path="/stagiaire" element={<StagiaireScreen />} />
            <Route path="/role-registration" element={<RoleRegistrationScreen />} />
            <Route path="/charte" element={<CharteScreen />} />
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardScreen />
              </ProtectedRoute>
            } />
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </Suspense>
      </div>

      {/* Global Modals */}
      <FeedbackModal />
      <ScanObjectiveModal />
      <RoleScanObjectiveModal />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
