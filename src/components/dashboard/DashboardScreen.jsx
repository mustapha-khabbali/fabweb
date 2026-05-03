import { useApp, TABS } from '../../context/AppContext';
import BottomNav from './BottomNav';
import FabLabTab from './tabs/FabLabTab';
import ScanTab from './tabs/ScanTab';
import NotificationsTab from './tabs/NotificationsTab';
import MyProjectTab from './tabs/MyProjectTab';
import ProfileTab from './tabs/ProfileTab';

export default function DashboardScreen() {
  const { activeTab } = useApp();

  const renderTab = () => {
    switch (activeTab) {
      case TABS.FABLAB: return <FabLabTab />;
      case TABS.SCAN: return <ScanTab />;
      case TABS.NOTIFICATIONS: return <NotificationsTab />;
      case TABS.MY_PROJECT: return <MyProjectTab />;
      case TABS.PROFILE: return <ProfileTab />;
      default: return <ScanTab />;
    }
  };

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative pb-24">
        {renderTab()}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}
