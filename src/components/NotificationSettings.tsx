import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface NotificationSettingsProps {
  habitId: number;
  habitName: string;
  onSave: (settings: NotificationConfig) => void;
}

export interface NotificationConfig {
  enabled: boolean;
  time: string;
  days: string[];
}

export const NotificationSettings = ({ habitName, onSave }: NotificationSettingsProps) => {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<string[]>([
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс',
  ]);

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    onSave({ enabled, time, days: selectedDays });
  };

  return (
    <Card className="p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Напоминания</p>
          <p className="text-sm text-muted-foreground">{habitName}</p>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      {enabled && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <Label className="text-sm font-medium mb-2 block">Время напоминания</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-muted/30"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Дни недели</Label>
            <div className="flex gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedDays.includes(day)
                      ? 'gradient-purple text-primary-foreground scale-105'
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full gradient-purple font-semibold">
            <Icon name="Bell" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      )}
    </Card>
  );
};
