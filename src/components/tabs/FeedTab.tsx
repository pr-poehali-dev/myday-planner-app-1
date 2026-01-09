import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { DailyQuote } from '@/components/DailyQuote';
import { toast } from 'sonner';

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

interface FeedTabProps {
  userData: { nickname: string; city: string; avatar: string };
}

export const FeedTab = ({ userData }: FeedTabProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [postImage, setPostImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allUsers: any[] = [];

  const filteredUsers = searchQuery
    ? allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allUsers;

  const handleFollow = (userName: string) => {
    toast.success(`Вы подписались на ${userName}`);
  };

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
        author: userData.nickname,
        avatar: userData.avatar,
        content: newPost,
        image: postImage || undefined,
        likes: 0,
        badges: 0,
        comments: 0,
        liked: false,
        badged: false,
        tags: [],
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setPostImage(null);
      setShowNewPost(false);
      toast.success('Пост опубликован!');
    }
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Лента 📰</h1>
        <div className="flex gap-2">
          <Dialog open={showSearch} onOpenChange={setShowSearch}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <Icon name="Search" size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>Поиск пользователей</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Имя или интересы..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-muted/30"
                />
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredUsers.length === 0 ? (
                    <Card className="p-8 text-center">
                      <div className="text-5xl mb-3">🔍</div>
                      <p className="text-muted-foreground">Пользователей пока нет</p>
                    </Card>
                  ) : (
                    filteredUsers.map((user) => (
                      <Card key={user.id} className="p-3 hover:border-primary/40 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.followers} подписчиков
                              </p>
                              <div className="flex gap-1 mt-1">
                                {user.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="gradient-purple"
                            onClick={() => handleFollow(user.name)}
                          >
                            Подписаться
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            size="icon"
            className="gradient-purple rounded-full shadow-lg"
            onClick={() => setShowNewPost(!showNewPost)}
          >
            <Icon name={showNewPost ? 'X' : 'Plus'} size={20} />
          </Button>
        </div>
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
          {postImage && (
            <div className="relative">
              <img src={postImage} alt="Превью" className="w-full rounded-lg" />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => setPostImage(null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => document.getElementById('post-image-upload')?.click()}
            >
              <Icon name="Image" size={16} className="mr-2" />
              Добавить фото
            </Button>
            <input
              id="post-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              onClick={handleCreatePost}
              className="flex-1 gradient-purple font-semibold"
              disabled={!newPost.trim()}
            >
              Опубликовать
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {posts.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold mb-2">Лента пуста</h3>
            <p className="text-muted-foreground mb-4">
              Создай свою первую публикацию и поделись своими достижениями!
            </p>
            <Button
              onClick={() => setShowNewPost(true)}
              className="gradient-purple font-semibold"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Создать пост
            </Button>
          </Card>
        )}
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-4 space-y-3 animate-scale-in hover:border-primary/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">2 часа назад</p>
                </div>
              </div>
              {post.author === userData.nickname && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setPosts(posts.filter((p) => p.id !== post.id))}
                >
                  <Icon name="Trash2" size={16} className="text-muted-foreground" />
                </Button>
              )}
            </div>

            <p className="text-foreground leading-relaxed">{post.content}</p>

            {post.image && (
              <img src={post.image} alt="Пост" className="w-full rounded-lg" />
            )}

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