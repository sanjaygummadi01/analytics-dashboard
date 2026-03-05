import { useMemo, useEffect, useState } from 'react';
import { formatNumber } from '@/utils/dataUtils';

export const BarChart = ({ data, title, height = 300 }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [data]);

  const chartData = useMemo(() => {
    if (data.length === 0) return null;
    const values = data.map(d => d.value);
    const maxValue = Math.max(...values);
    const padding = { top: 30, right: 20, bottom: 60, left: 60 };
    const chartWidth = 600;
    const chartHeight = height;
    const plotWidth = chartWidth - padding.left - padding.right;
    const plotHeight = chartHeight - padding.top - padding.bottom;
    const barWidth = Math.min(40, (plotWidth / data.length) * 0.7);
    const gap = (plotWidth - barWidth * data.length) / (data.length + 1);
    const bars = data.map((d, i) => {
      const x = padding.left + gap + i * (barWidth + gap);
      const barHeight = (d.value / maxValue) * plotHeight;
      const y = padding.top + plotHeight - barHeight;
      return { x, y, width: barWidth, height: barHeight, ...d };
    });
    const gridLines = [];
    const gridCount = 5;
    for (let i = 0; i <= gridCount; i++) {
      const y = padding.top + (i / gridCount) * plotHeight;
      const value = maxValue - (i / gridCount) * maxValue;
      gridLines.push({ y, value });
    }
    return { bars, gridLines, chartWidth, chartHeight, padding, plotHeight, maxValue };
  }, [data, height]);

  if (!chartData || data.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">No data available</div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartData.chartWidth} ${chartData.chartHeight}`} className="w-full min-w-[400px]" style={{ height: `${height}px` }}>
          {chartData.gridLines.map((line, i) => (
            <g key={i}>
              <line x1={chartData.padding.left} y1={line.y} x2={chartData.chartWidth - chartData.padding.right} y2={line.y} className="stroke-border" strokeDasharray="4 4" />
              <text x={chartData.padding.left - 10} y={line.y + 4} className="fill-muted-foreground text-xs" textAnchor="end">${formatNumber(line.value)}</text>
            </g>
          ))}
          {chartData.bars.map((bar, i) => (
            <g key={i} className="group">
              <defs>
                <linearGradient id={`barGradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                  <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <rect x={bar.x} y={isAnimated ? bar.y : chartData.padding.top + chartData.plotHeight} width={bar.width} height={isAnimated ? bar.height : 0} rx={4} fill={`url(#barGradient-${i})`} className="group-hover:opacity-80" style={{ transition: `all 0.7s ease-out ${i * 50}ms` }} />
              <text x={bar.x + bar.width / 2} y={bar.y - 8} className="fill-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" textAnchor="middle">${formatNumber(bar.value)}</text>
              <text x={bar.x + bar.width / 2} y={chartData.chartHeight - 20} className="fill-muted-foreground text-xs" textAnchor="middle" transform={`rotate(-45, ${bar.x + bar.width / 2}, ${chartData.chartHeight - 20})`}>{bar.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
