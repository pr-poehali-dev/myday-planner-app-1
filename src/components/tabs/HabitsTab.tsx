import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationSettings, NotificationConfig } from '@/components/NotificationSettings';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Habit {
  id: number;
  name: string;
  emoji: string;
  type: 'financial' | 'general';
  streak: number;
  completedToday: boolean;
  daysCompleted: number[];
}

export const HabitsTab = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: 'Откладывать 500₽',
      emoji: '💰',
      type: 'financial',
      streak: 7,
      completedToday: false,
      daysCompleted: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      id: 2,
      name: 'Заниматься спортом',
      emoji: '💪',
      type: 'general',
      streak: 14,
      completedToday: false,
      daysCompleted: Array.from({ length: 14 }, (_, i) => i + 1),
    },
    {
      id: 3,
      name: 'Читать 30 минут',
      emoji: '📚',
      type: 'general',
      streak: 5,
      completedToday: false,
      daysCompleted: [1, 2, 3, 4, 5],
    },
    {
      id: 4,
      name: 'Не тратить на кофе',
      emoji: '☕',
      type: 'financial',
      streak: 3,
      completedToday: false,
      daysCompleted: [1, 2, 3],
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitType, setNewHabitType] = useState<'financial' | 'general'>('general');
  const [newHabitEmoji, setNewHabitEmoji] = useState('✅');

  const financialEmojis = ['💰', '💵', '💳', '🏦', '☕', '🛒', '🎯'];
  const generalEmojis = ['💪', '📚', '🧘', '🏃', '🎨', '🎵', '🌱'];

  const handleToggleHabit = (habitId: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const completed = !habit.completedToday;
          return {
            ...habit,
            completedToday: completed,
            streak: completed ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            daysCompleted: completed
              ? [...habit.daysCompleted, habit.daysCompleted.length + 1]
              : habit.daysCompleted.slice(0, -1),
          };
        }
        return habit;
      })
    );
  };

  const handleAddHabit = () => {
    if (newHabitName) {
      const habit: Habit = {
        id: Date.now(),
        name: newHabitName,
        emoji: newHabitEmoji,
        type: newHabitType,
        streak: 0,
        completedToday: false,
        daysCompleted: [],
      };
      setHabits([...habits, habit]);
      setNewHabitName('');
      setNewHabitEmoji('✅');
      setShowAddDialog(false);
    }
  };

  const [notificationHabit, setNotificationHabit] = useState<Habit | null>(null);

  const handleSaveNotification = (config: NotificationConfig) => {
    toast.success(`Напоминания ${config.enabled ? 'включены' : 'выключены'} для "${notificationHabit?.name}"`, {
      description: config.enabled ? `Время: ${config.time}, дни: ${config.days.join(', ')}` : undefined,
    });
    setNotificationHabit(null);
  };

  const financialHabits = habits.filter((h) => h.type === 'financial');
  const generalHabits = habits.filter((h) => h.type === 'general');

  const renderHabit = (habit: Habit) => (
    <Card
      key={habit.id}
      className={`p-4 space-y-3 transition-all animate-scale-in ${
        habit.completedToday ? 'border-success bg-success/5' : 'hover:border-primary/40'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
              habit.completedToday
                ? 'bg-gradient-to-br from-success to-success/60'
                : 'bg-gradient-to-br from-primary to-secondary'
            }`}
          >
            {habit.emoji}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{habit.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="Flame" size={16} className="text-orange-500" />
              <p className="text-sm font-medium text-orange-500">{habit.streak} дней</p>
            </div>
          </div>
        </div>
        <Button
          size="icon"
          onClick={() => handleToggleHabit(habit.id)}
          className={`rounded-full w-12 h-12 ${
            habit.completedToday
              ? 'gradient-green'
              : 'bg-muted/30 hover:bg-muted/50 text-muted-foreground'
          }`}
        >
          <Icon name={habit.completedToday ? 'Check' : 'Circle'} size={24} />
        </Button>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < habit.daysCompleted.length % 7 ? 'bg-success' : 'bg-muted/30'
            }`}
          />
        ))}
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={() => setNotificationHabit(habit)}
        className="w-full"
      >
        <Icon name="Bell" size={16} className="mr-2" />
        Настроить напоминания
      </Button>
    </Card>
  );

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Привычки ✅</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="icon" className="gradient-purple rounded-full shadow-lg">
              <Icon name="Plus" size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Новая привычка</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs value={newHabitType} onValueChange={(v) => setNewHabitType(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">Обычная</TabsTrigger>
                  <TabsTrigger value="financial">Финансовая</TabsTrigger>
                </TabsList>
              </Tabs>

              <div>
                <label className="text-sm font-medium mb-2 block">Выберите эмодзи</label>
                <div className="grid grid-cols-5 gap-2">
                  {(newHabitType === 'financial' ? financialEmojis : generalEmojis).map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewHabitEmoji(emoji)}
                      className={`text-3xl p-2 rounded-xl transition-all ${
                        newHabitEmoji === emoji
                          ? 'bg-primary/20 scale-110'
                          : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                placeholder="Название привычки"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="bg-muted/30"
              />
              <Button onClick={handleAddHabit} className="w-full gradient-purple font-semibold">
                Создать привычку
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="general">Обычные</TabsTrigger>
          <TabsTrigger value="financial">Финансовые</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {habits.map(renderHabit)}
        </TabsContent>

        <TabsContent value="general" className="space-y-3">
          {generalHabits.map(renderHabit)}
        </TabsContent>

        <TabsContent value="financial" className="space-y-3">
          {financialHabits.map(renderHabit)}
        </TabsContent>
      </Tabs>

      {notificationHabit && (
        <Dialog open={!!notificationHabit} onOpenChange={() => setNotificationHabit(null)}>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Настройки уведомлений</DialogTitle>
            </DialogHeader>
            <NotificationSettings
              habitId={notificationHabit.id}
              habitName={notificationHabit.name}
              onSave={handleSaveNotification}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};