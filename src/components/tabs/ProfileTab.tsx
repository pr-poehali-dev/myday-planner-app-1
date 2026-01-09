import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

export const ProfileTab = () => {
  const userStats = {
    nickname: 'МарияПетрова',
    avatar: '👩‍💻',
    city: 'Москва',
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

      <Button variant="outline" className="w-full">
        <Icon name="Settings" size={16} className="mr-2" />
        Настройки
      </Button>
    </div>
  );
};
