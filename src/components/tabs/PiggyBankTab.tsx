import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProgressChart } from '@/components/ProgressChart';
import Icon from '@/components/ui/icon';

interface Goal {
  id: number;
  name: string;
  emoji: string;
  target: number;
  current: number;
  deadline?: string;
}

export const PiggyBankTab = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: 'Новый велосипед', emoji: '🚴‍♀️', target: 30000, current: 8500 },
    { id: 2, name: 'Отпуск на море', emoji: '🏖️', target: 100000, current: 42000 },
    { id: 3, name: 'Новый ноутбук', emoji: '💻', target: 80000, current: 15000 },
  ]);

  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalEmoji, setNewGoalEmoji] = useState('🎯');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [addAmount, setAddAmount] = useState('');

  const emojis = ['🚴‍♀️', '🏖️', '💻', '📱', '🏠', '🚗', '🎸', '📷', '✈️', '🎮'];

  const handleAddGoal = () => {
    if (newGoalName && newGoalTarget) {
      const goal: Goal = {
        id: Date.now(),
        name: newGoalName,
        emoji: newGoalEmoji,
        target: parseInt(newGoalTarget),
        current: 0,
      };
      setGoals([...goals, goal]);
      setNewGoalName('');
      setNewGoalTarget('');
      setNewGoalEmoji('🎯');
      setShowAddDialog(false);
    }
  };

  const handleAddMoney = () => {
    if (selectedGoal && addAmount) {
      setGoals(
        goals.map((g) =>
          g.id === selectedGoal.id
            ? { ...g, current: Math.min(g.current + parseInt(addAmount), g.target) }
            : g
        )
      );
      setAddAmount('');
      setSelectedGoal(null);
    }
  };

  const handleWithdrawMoney = () => {
    if (selectedGoal && addAmount) {
      setGoals(
        goals.map((g) =>
          g.id === selectedGoal.id
            ? { ...g, current: Math.max(g.current - parseInt(addAmount), 0) }
            : g
        )
      );
      setAddAmount('');
      setSelectedGoal(null);
    }
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Копилка 🐷</h1>
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
              <Input
                type="number"
                placeholder="Целевая сумма"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                className="bg-muted/30"
              />
              <Button onClick={handleAddGoal} className="w-full gradient-purple font-semibold">
                Создать цель
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
        <p className="text-sm font-medium text-muted-foreground mb-1">Всего накоплено</p>
        <p className="text-3xl font-bold">
          {goals.reduce((sum, g) => sum + g.current, 0).toLocaleString()} ₽
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          из {goals.reduce((sum, g) => sum + g.target, 0).toLocaleString()} ₽
        </p>
      </Card>

      <ProgressChart
        title="Прогресс по целям 📊"
        data={goals.map((goal) => ({
          label: goal.name,
          value: goal.current,
          color: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)`,
        }))}
        total={Math.max(...goals.map((g) => g.target))}
      />

      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <Card
              key={goal.id}
              className="p-4 space-y-3 hover:border-primary/40 transition-all animate-scale-in"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                    {goal.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()} ₽
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
              </div>

              <Progress value={progress} className="h-3" />

              <div className="flex gap-2">
                <Dialog
                  open={selectedGoal?.id === goal.id}
                  onOpenChange={(open) => !open && setSelectedGoal(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex-1 gradient-green"
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      Добавить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <DialogHeader>
                      <DialogTitle>
                        {goal.emoji} {goal.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="number"
                        placeholder="Сумма"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        className="bg-muted/30"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddMoney}
                          className="flex-1 gradient-green font-semibold"
                        >
                          Добавить
                        </Button>
                        <Button
                          onClick={handleWithdrawMoney}
                          variant="outline"
                          className="flex-1"
                        >
                          Снять
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};