import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { DailyQuote } from '@/components/DailyQuote';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  badges: number;
  comments: number;
  liked: boolean;
  badged: boolean;
  tags: string[];
}

export const FeedTab = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Мария Петрова',
      avatar: '👩‍💻',
      content: 'Сегодня сделала первый взнос в копилку на новый велосипед! Уже 10% от цели! 🚴‍♀️',
      likes: 24,
      badges: 12,
      comments: 3,
      liked: false,
      badged: false,
      tags: ['финансы', 'мечты', 'велосипед'],
    },
    {
      id: 2,
      author: 'Алексей Иванов',
      avatar: '🧑‍🎨',
      content: '30 дней подряд занимаюсь спортом! Никогда не думал, что смогу 💪',
      likes: 45,
      badges: 28,
      comments: 7,
      liked: false,
      badged: false,
      tags: ['спорт', 'привычки', 'достижение'],
    },
    {
      id: 3,
      author: 'Екатерина Смирнова',
      avatar: '👩‍🎤',
      content: 'Накопила на отпуск мечты! Через неделю улетаю на море ✈️🏖️',
      likes: 67,
      badges: 42,
      comments: 15,
      liked: false,
      badged: false,
      tags: ['отпуск', 'мечта', 'путешествия'],
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBadge = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              badged: !post.badged,
              badges: post.badged ? post.badges - 1 : post.badges + 1,
            }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        author: 'Вы',
        avatar: '😊',
        content: newPost,
        likes: 0,
        badges: 0,
        comments: 0,
        liked: false,
        badged: false,
        tags: [],
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Лента 📰</h1>
        <Button
          size="icon"
          className="gradient-purple rounded-full shadow-lg"
          onClick={() => setShowNewPost(!showNewPost)}
        >
          <Icon name={showNewPost ? 'X' : 'Plus'} size={20} />
        </Button>
      </div>

      <DailyQuote />

      {showNewPost && (
        <Card className="p-4 space-y-3 animate-scale-in bg-card border-primary/20">
          <Textarea
            placeholder="Поделитесь своим достижением... 🎉"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-24 bg-muted/30 border-muted"
          />
          <Button
            onClick={handleCreatePost}
            className="w-full gradient-purple font-semibold"
            disabled={!newPost.trim()}
          >
            Опубликовать
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-4 space-y-3 animate-scale-in hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                {post.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">2 часа назад</p>
              </div>
            </div>

            <p className="text-foreground leading-relaxed">{post.content}</p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6 pt-2 border-t border-border">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 transition-all ${
                  post.liked
                    ? 'text-secondary scale-110'
                    : 'text-muted-foreground hover:text-secondary'
                }`}
              >
                <Icon name="Heart" size={20} fill={post.liked ? 'currentColor' : 'none'} />
                <span className="font-medium">{post.likes}</span>
              </button>

              <button
                onClick={() => handleBadge(post.id)}
                className={`flex items-center gap-2 transition-all ${
                  post.badged
                    ? 'text-accent scale-110'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                <Icon name="Award" size={20} fill={post.badged ? 'currentColor' : 'none'} />
                <span className="font-medium">{post.badges}</span>
              </button>

              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="MessageCircle" size={20} />
                <span className="font-medium">{post.comments}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
