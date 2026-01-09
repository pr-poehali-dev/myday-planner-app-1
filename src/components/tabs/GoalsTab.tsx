import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Goal {
  id: number;
  name: string;
  emoji: string;
  period: 'today' | 'week' | 'month' | 'year';
  completed: boolean;
  progress: number;
}

export const GoalsTab = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: 'Сделать зарядку', emoji: '🏃', period: 'today', completed: false, progress: 0 },
    { id: 2, name: 'Прочитать 2 главы', emoji: '📖', period: 'today', completed: true, progress: 100 },
    { id: 3, name: 'Отложить 3000₽', emoji: '💰', period: 'week', completed: false, progress: 60 },
    { id: 4, name: 'Пройти онлайн-курс', emoji: '🎓', period: 'week', completed: false, progress: 45 },
    { id: 5, name: 'Накопить 50000₽', emoji: '💵', period: 'month', completed: false, progress: 30 },
    { id: 6, name: 'Выучить английский', emoji: '🇬🇧', period: 'year', completed: false, progress: 15 },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalPeriod, setNewGoalPeriod] = useState<Goal['period']>('today');
  const [newGoalEmoji, setNewGoalEmoji] = useState('🎯');

  const emojis = ['🎯', '💰', '📚', '🏃', '🎨', '💻', '🎓', '✈️', '🏋️', '🎸'];

  const handleToggleGoal = (goalId: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, completed: !goal.completed, progress: !goal.completed ? 100 : 0 }
          : goal
      )
    );
  };

  const handleAddGoal = () => {
    if (newGoalName) {
      const goal: Goal = {
        id: Date.now(),
        name: newGoalName,
        emoji: newGoalEmoji,
        period: newGoalPeriod,
        completed: false,
        progress: 0,
      };
      setGoals([...goals, goal]);
      setNewGoalName('');
      setNewGoalEmoji('🎯');
      setShowAddDialog(false);
    }
  };

  const periodLabels = {
    today: 'Сегодня',
    week: 'Неделя',
    month: 'Месяц',
    year: 'Год',
  };

  const renderGoal = (goal: Goal) => (
    <Card
      key={goal.id}
      className={`p-4 space-y-3 transition-all animate-scale-in ${
        goal.completed ? 'border-success bg-success/5' : 'hover:border-primary/40'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
              goal.completed
                ? 'bg-gradient-to-br from-success to-success/60'
                : 'bg-gradient-to-br from-primary to-secondary'
            }`}
          >
            {goal.emoji}
          </div>
          <div className="flex-1">
            <p className={`font-semibold ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {goal.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{periodLabels[goal.period]}</p>
          </div>
        </div>
        <Button
          size="icon"
          onClick={() => handleToggleGoal(goal.id)}
          className={`rounded-full w-10 h-10 ${
            goal.completed
              ? 'gradient-green'
              : 'bg-muted/30 hover:bg-muted/50 text-muted-foreground'
          }`}
        >
          <Icon name={goal.completed ? 'Check' : 'Circle'} size={20} />
        </Button>
      </div>

      {!goal.completed && goal.progress > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Прогресс</span>
            <span className="text-primary font-medium">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>
      )}
    </Card>
  );

  const filterGoals = (period: Goal['period']) => goals.filter((g) => g.period === period);

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Цели 🎯</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button size="icon" className="gradient-purple rounded-full shadow-lg">
              <Icon name="Plus" size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Новая цель</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Выберите эмодзи</label>
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewGoalEmoji(emoji)}
                      className={`text-3xl p-2 rounded-xl transition-all ${
                        newGoalEmoji === emoji
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
                placeholder="Название цели"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                className="bg-muted/30"
              />

              <Select
                value={newGoalPeriod}
                onValueChange={(v) => setNewGoalPeriod(v as Goal['period'])}
              >
                <SelectTrigger className="bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Сегодня</SelectItem>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleAddGoal} className="w-full gradient-purple font-semibold">
                Создать цель
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
          <p className="text-xs text-muted-foreground mb-1">Завершено</p>
          <p className="text-2xl font-bold">{goals.filter((g) => g.completed).length}</p>
        </Card>
        <Card className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
          <p className="text-xs text-muted-foreground mb-1">В процессе</p>
          <p className="text-2xl font-bold">{goals.filter((g) => !g.completed).length}</p>
        </Card>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="today">Сегодня</TabsTrigger>
          <TabsTrigger value="week">Неделя</TabsTrigger>
          <TabsTrigger value="month">Месяц</TabsTrigger>
          <TabsTrigger value="year">Год</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-3">
          {filterGoals('today').map(renderGoal)}
        </TabsContent>

        <TabsContent value="week" className="space-y-3">
          {filterGoals('week').map(renderGoal)}
        </TabsContent>

        <TabsContent value="month" className="space-y-3">
          {filterGoals('month').map(renderGoal)}
        </TabsContent>

        <TabsContent value="year" className="space-y-3">
          {filterGoals('year').map(renderGoal)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
