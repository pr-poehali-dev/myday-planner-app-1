import { useState } from 'react';
import { PiggyBankTab } from '@/components/tabs/PiggyBankTab';
import { HabitsTab } from '@/components/tabs/HabitsTab';
import { GoalsTab } from '@/components/tabs/GoalsTab';
import { FeedTab } from '@/components/tabs/FeedTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';
import { BottomNav } from '@/components/BottomNav';

export type TabType = 'piggybank' | 'habits' | 'goals' | 'feed' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {activeTab === 'piggybank' && <PiggyBankTab />}
        {activeTab === 'habits' && <HabitsTab />}
        {activeTab === 'goals' && <GoalsTab />}
        {activeTab === 'feed' && <FeedTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
