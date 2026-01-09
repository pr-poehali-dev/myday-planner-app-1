import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
}

interface ProgressChartProps {
  title: string;
  data: ChartDataPoint[];
  total?: number;
}

export const ProgressChart = ({ title, data, total }: ProgressChartProps) => {
  const maxValue = total || Math.max(...data.map((d) => d.value));

  return (
    <Card className="p-4 space-y-4 bg-card">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-foreground">
                  {item.value.toLocaleString()} ₽
                </span>
              </div>
              <div className="relative">
                <Progress value={percentage} className="h-2" />
                <div
                  className="absolute top-0 left-0 h-2 rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
