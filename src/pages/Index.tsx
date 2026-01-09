import { useState, useEffect } from 'react';
import { PiggyBankTab } from '@/components/tabs/PiggyBankTab';
import { HabitsTab } from '@/components/tabs/HabitsTab';
import { GoalsTab } from '@/components/tabs/GoalsTab';
import { FeedTab } from '@/components/tabs/FeedTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';
import { BottomNav } from '@/components/BottomNav';
import { Onboarding } from '@/components/Onboarding';

export type TabType = 'piggybank' | 'habits' | 'goals' | 'feed' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userData, setUserData] = useState({ nickname: '', city: '', avatar: '👤' });

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    const savedUser = localStorage.getItem('user_data');
    if (completed && savedUser) {
      setShowOnboarding(false);
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const handleOnboardingComplete = (data: { nickname: string; city: string; avatar: string }) => {
    setUserData(data);
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_data', JSON.stringify(data));
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {activeTab === 'piggybank' && <PiggyBankTab />}
        {activeTab === 'habits' && <HabitsTab />}
        {activeTab === 'goals' && <GoalsTab />}
        {activeTab === 'feed' && <FeedTab />}
        {activeTab === 'profile' && <ProfileTab userData={userData} />}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;