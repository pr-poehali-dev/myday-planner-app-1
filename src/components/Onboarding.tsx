import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface OnboardingProps {
  onComplete: (userData: { nickname: string; city: string; avatar: string }) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');

  const avatars = ['👤', '👩‍💻', '🧑‍💻', '👨‍💻', '👩‍🎨', '🧑‍🎨', '👨‍🎨', '👩‍🚀', '🧑‍🚀', '👨‍🚀', '🦸‍♀️', '🦸', '🦸‍♂️'];

  const handleComplete = () => {
    if (nickname.trim() && city.trim()) {
      onComplete({ nickname, city, avatar: selectedAvatar });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 animate-scale-in">
        {step === 1 && (
          <>
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce-subtle">🚀</div>
              <h1 className="text-3xl font-bold gradient-text">Добро пожаловать в MyDay!</h1>
              <p className="text-muted-foreground">
                Твой личный помощник для достижения целей, отслеживания привычек и накоплений
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/10">
                <Icon name="PiggyBank" size={24} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Копилка</p>
                  <p className="text-sm text-muted-foreground">Накапливай на мечты с фото и дедлайнами</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/10">
                <Icon name="CheckCircle2" size={24} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Привычки</p>
                  <p className="text-sm text-muted-foreground">Отслеживай финансовые и обычные привычки</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/10">
                <Icon name="Target" size={24} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Цели</p>
                  <p className="text-sm text-muted-foreground">Ставь цели на день, неделю, месяц и год</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-success/10">
                <Icon name="Users" size={24} className="text-success mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Сообщество</p>
                  <p className="text-sm text-muted-foreground">Делись успехами и получай вдохновение</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full gradient-purple font-semibold text-lg h-12">
              Начать <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center space-y-2">
              <div className="text-5xl">{selectedAvatar}</div>
              <h2 className="text-2xl font-bold">Создай свой профиль</h2>
              <p className="text-sm text-muted-foreground">Расскажи о себе</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Выбери аватар</Label>
                <div className="grid grid-cols-7 gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`text-3xl p-2 rounded-xl transition-all hover:scale-110 ${
                        selectedAvatar === avatar
                          ? 'bg-primary/30 ring-2 ring-primary scale-110'
                          : 'bg-muted/20 hover:bg-muted/40'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Как тебя зовут?</Label>
                <Input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Введи никнейм"
                  className="bg-muted/30"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Твой город</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Введи название города"
                  className="bg-muted/30"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!nickname.trim() || !city.trim()}
                className="flex-1 gradient-purple font-semibold"
              >
                Готово
                <Icon name="Check" size={16} className="ml-2" />
              </Button>
            </div>
          </>
        )}

        <div className="flex justify-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-all ${step === 1 ? 'bg-primary w-6' : 'bg-muted'}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${step === 2 ? 'bg-primary w-6' : 'bg-muted'}`} />
        </div>
      </Card>
    </div>
  );
};
