import Icon from '@/components/ui/icon';
import { TabType } from '@/pages/Index';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'piggybank' as TabType, icon: 'PiggyBank', label: 'Копилка' },
    { id: 'habits' as TabType, icon: 'CheckCircle2', label: 'Привычки' },
    { id: 'goals' as TabType, icon: 'Target', label: 'Цели' },
    { id: 'feed' as TabType, icon: 'Home', label: 'Лента' },
    { id: 'profile' as TabType, icon: 'User', label: 'Профиль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
              activeTab === tab.id
                ? 'text-primary scale-110'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon
              name={tab.icon}
              size={24}
              className={activeTab === tab.id ? 'animate-bounce-subtle' : ''}
            />
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
