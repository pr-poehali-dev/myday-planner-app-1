import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const quotes = [
  'Маленькие шаги каждый день приводят к большим результатам 🚀',
  'Твоя мечта уже ждёт тебя — просто иди к ней! ✨',
  'Каждая копейка приближает тебя к цели 💰',
  'Привычки формируют будущее 🌟',
  'Верь в себя, и всё получится! 💪',
];

export const DailyQuote = () => {
  const today = new Date().getDate();
  const quote = quotes[today % quotes.length];

  return (
    <Card className="p-4 gradient-purple text-primary-foreground animate-scale-in relative overflow-hidden">
      <div className="absolute top-0 right-0 text-6xl opacity-20">💭</div>
      <div className="flex items-start gap-3 relative z-10">
        <Icon name="Sparkles" size={24} className="mt-1 flex-shrink-0" />
        <div>
          <p className="font-bold text-sm mb-1">Цитата дня</p>
          <p className="text-base leading-relaxed">{quote}</p>
        </div>
      </div>
    </Card>
  );
};
