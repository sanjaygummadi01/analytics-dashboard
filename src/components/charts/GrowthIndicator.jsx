import { useMemo, useEffect, useState } from 'react';

export const GrowthIndicator = ({ data, title }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [data]);

  const chartData = useMemo(() => {
    if (data.length < 2) return null;
    const recentData = data.slice(-30);
    const values = recentData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;
    const width = 200;
    const height = 60;
    const points = recentData.map((d, i) => {
      const x = (i / (recentData.length - 1)) * width;
      const y = height - ((d.value - minValue) / range) * height;
      return { x, y };
    });
    const pathData = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    const trendPercentage = ((secondAvg - firstAvg) / firstAvg) * 100;
    return { pathData, trendPercentage, isPositive: trendPercentage >= 0, currentValue: values[values.length - 1] };
  }, [data]);

  if (!chartData) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">Not enough data</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{chartData.trendPercentage.toFixed(1)}%</span>
            <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${chartData.isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {chartData.isPositive ? '↑' : '↓'} trend
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{chartData.isPositive ? 'Growth' : 'Decline'} over period</p>
        </div>
        <svg width="200" height="60" className="overflow-visible">
          <defs>
            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={chartData.isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chartData.isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} />
            </linearGradient>
          </defs>
          <path d={chartData.pathData} fill="none" stroke="url(#sparklineGradient)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 500, strokeDashoffset: isAnimated ? 0 : 500, transition: 'stroke-dashoffset 1.5s ease-out' }} />
          <circle
            cx={200}
            cy={60 - ((chartData.currentValue - Math.min(...data.slice(-30).map(d => d.value))) / (Math.max(...data.slice(-30).map(d => d.value)) - Math.min(...data.slice(-30).map(d => d.value)) || 1)) * 60}
            r={4}
            fill={chartData.isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
            style={{ opacity: isAnimated ? 1 : 0, transition: 'opacity 0.3s ease-out 1s' }}
          />
        </svg>
      </div>
    </div>
  );
};
