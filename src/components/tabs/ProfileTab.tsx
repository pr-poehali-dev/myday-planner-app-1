import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface ProfileTabProps {
  userData: { nickname: string; city: string; avatar: string };
}

export const ProfileTab = ({ userData }: ProfileTabProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [nickname, setNickname] = useState(userData.nickname);
  const [city, setCity] = useState(userData.city);
  const [avatar, setAvatar] = useState(userData.avatar);

  const avatars = ['👤', '👩‍💻', '🧑‍💻', '👨‍💻', '👩‍🎨', '🧑‍🎨', '👨‍🎨', '👩‍🚀', '🧑‍🚀', '👨‍🚀', '🦸‍♀️', '🦸', '🦸‍♂️'];

  const userStats = {
    nickname: nickname,
    avatar: avatar,
    city: city,
    badges: 142,
    posts: 28,
    followers: 156,
    following: 89,
  };

  const achievements = [
    { id: 1, name: '7 дней подряд', emoji: '🔥', description: 'Выполнено 7 дней привычек' },
    { id: 2, name: 'Первая цель', emoji: '🎯', description: 'Достигнута первая цель' },
    { id: 3, name: 'Активный участник', emoji: '⭐', description: 'Получено 100+ значков' },
    { id: 4, name: 'Накопитель', emoji: '💰', description: 'Накоплено 50000₽' },
  ];

  const myPosts = [
    {
      id: 1,
      content: 'Сегодня сделала первый взнос в копилку на новый велосипед! 🚴‍♀️',
      likes: 24,
      badges: 12,
    },
    {
      id: 2,
      content: 'Неделя занятий спортом завершена! Чувствую себя отлично 💪',
      likes: 18,
      badges: 9,
    },
  ];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Профиль 👤</h1>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 gradient-purple text-4xl">
            <AvatarFallback>{userStats.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{userStats.nickname}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Icon name="MapPin" size={14} />
              {userStats.city}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{userStats.posts}</p>
            <p className="text-xs text-muted-foreground">Публикации</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">{userStats.followers}</p>
            <p className="text-xs text-muted-foreground">Подписчики</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{userStats.following}</p>
            <p className="text-xs text-muted-foreground">Подписки</p>
          </div>
        </div>

        <Card className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Значки "Молодец"</p>
              <p className="text-3xl font-bold text-accent">{userStats.badges}</p>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </Card>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
          <TabsTrigger value="posts">Мои посты</TabsTrigger>
          <TabsTrigger value="favorites">Избранное</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className="p-4 hover:border-primary/40 transition-all animate-scale-in"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                  {achievement.emoji}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="posts" className="space-y-3">
          {myPosts.map((post) => (
            <Card
              key={post.id}
              className="p-4 space-y-3 hover:border-primary/40 transition-all animate-scale-in"
            >
              <p className="text-foreground">{post.content}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Heart" size={16} />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Award" size={16} />
                  {post.badges}
                </span>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-3">
          <Card className="p-8 text-center">
            <div className="text-5xl mb-3">⭐</div>
            <p className="text-muted-foreground">Здесь появятся ваши избранные посты</p>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full" onClick={() => setShowSettings(true)}>
          <Icon name="Settings" size={16} className="mr-2" />
          Настройки
        </Button>
        <Button variant="outline" className="w-full" onClick={() => setShowInstallGuide(true)}>
          <Icon name="Download" size={16} className="mr-2" />
          Установить
        </Button>
      </div>

      <Button 
        variant="destructive" 
        className="w-full" 
        onClick={() => setShowResetDialog(true)}
      >
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Сбросить все данные
      </Button>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Настройки профиля</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Никнейм</Label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-muted/30"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Город</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-muted/30"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Аватар</Label>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {avatars.map((av) => (
                  <button
                    key={av}
                    onClick={() => setAvatar(av)}
                    className={`text-2xl p-2 rounded-xl transition-all hover:scale-110 ${
                      avatar === av
                        ? 'bg-primary/30 ring-2 ring-primary scale-110'
                        : 'bg-muted/20 hover:bg-muted/40'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => {
                const newData = { nickname, city, avatar };
                localStorage.setItem('user_data', JSON.stringify(newData));
                toast.success('Настройки сохранены!');
                setShowSettings(false);
              }}
              className="w-full gradient-purple font-semibold"
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showInstallGuide} onOpenChange={setShowInstallGuide}>
        <DialogContent className="bg-card max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Установить MyDay на главный экран 📱</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Зачем устанавливать?</p>
                  <p className="text-sm text-muted-foreground">
                    Приложение будет открываться как обычное, без браузерной панели, и всегда под рукой!
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="text-2xl">🍎</span>
                iPhone / iPad (Safari)
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Откройте MyDay в браузере Safari</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Нажмите кнопку «Поделиться» <Icon name="Share" size={14} className="inline" /> (внизу экрана)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Выберите «На экран Домой» или «Add to Home Screen»</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Нажмите «Добавить» — готово! 🎉</span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                Android (Chrome)
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-secondary">1.</span>
                  <span>Откройте MyDay в браузере Chrome</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-secondary">2.</span>
                  <span>Нажмите меню <Icon name="MoreVertical" size={14} className="inline" /> (три точки вверху справа)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-secondary">3.</span>
                  <span>Выберите «Установить приложение» или «Add to Home screen»</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-secondary">4.</span>
                  <span>Нажмите «Установить» — готово! 🎉</span>
                </li>
              </ol>
            </div>

            <Card className="p-4 bg-success/10 border-success/30">
              <p className="text-sm text-foreground">
                <Icon name="CheckCircle" size={16} className="inline text-success mr-1" />
                После установки иконка MyDay появится на главном экране вместе с другими приложениями!
              </p>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Сбросить все данные? ⚠️</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Это действие удалит все твои цели, привычки, посты и настройки. Приложение вернется к начальному состоянию.
            </p>
            <p className="text-destructive font-semibold">
              Это действие нельзя отменить!
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowResetDialog(false)}
              >
                Отмена
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  localStorage.clear();
                  toast.success('Все данные удалены. Перезагрузи страницу.');
                  setShowResetDialog(false);
                  setTimeout(() => window.location.reload(), 2000);
                }}
              >
                Сбросить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};