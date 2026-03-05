import { useMemo, useEffect, useState } from 'react';
import { formatNumber } from '@/utils/dataUtils';

export const LineChart = ({ data, title, height = 300 }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [data]);

  const chartData = useMemo(() => {
    if (data.length === 0) return null;
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;
    const padding = { top: 30, right: 20, bottom: 40, left: 60 };
    const chartWidth = 600;
    const chartHeight = height;
    const plotWidth = chartWidth - padding.left - padding.right;
    const plotHeight = chartHeight - padding.top - padding.bottom;
    const points = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * plotWidth;
      const y = padding.top + plotHeight - ((d.value - minValue) / range) * plotHeight;
      return { x, y, ...d };
    });
    const pathData = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');
    const areaPath = `${pathData} L ${points[points.length - 1].x},${padding.top + plotHeight} L ${padding.left},${padding.top + plotHeight} Z`;
    const gridLines = [];
    const gridCount = 5;
    for (let i = 0; i <= gridCount; i++) {
      const y = padding.top + (i / gridCount) * plotHeight;
      const value = maxValue - (i / gridCount) * range;
      gridLines.push({ y, value });
    }
    return { points, pathData, areaPath, gridLines, chartWidth, chartHeight, padding, plotHeight };
  }, [data, height]);

  if (!chartData || data.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">No data available</div>
      </div>
    );
  }

  const pathLength = 1000;

  return (
    <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartData.chartWidth} ${chartData.chartHeight}`} className="w-full min-w-[400px]" style={{ height: `${height}px` }}>
          {chartData.gridLines.map((line, i) => (
            <g key={i}>
              <line x1={chartData.padding.left} y1={line.y} x2={chartData.chartWidth - chartData.padding.right} y2={line.y} className="stroke-border" strokeDasharray="4 4" />
              <text x={chartData.padding.left - 10} y={line.y + 4} className="fill-muted-foreground text-xs" textAnchor="end">{formatNumber(line.value)}</text>
            </g>
          ))}
          <path d={chartData.areaPath} className="fill-primary/10" style={{ opacity: isAnimated ? 1 : 0, transition: 'opacity 0.5s ease-out 0.5s' }} />
          <path d={chartData.pathData} fill="none" className="stroke-primary" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: pathLength, strokeDashoffset: isAnimated ? 0 : pathLength, transition: 'stroke-dashoffset 1s ease-out' }} />
          {chartData.points.map((point, i) => (
            <g key={i} className="group">
              <circle cx={point.x} cy={point.y} r={4} className="fill-background stroke-primary" strokeWidth={2} style={{ opacity: isAnimated ? 1 : 0, transform: isAnimated ? 'scale(1)' : 'scale(0)', transformOrigin: `${point.x}px ${point.y}px`, transition: `all 0.3s ease-out ${0.5 + i * 0.02}s` }} />
              <circle cx={point.x} cy={point.y} r={16} className="fill-transparent cursor-pointer" />
              {i % Math.ceil(data.length / 8) === 0 && (
                <text x={point.x} y={chartData.chartHeight - 10} className="fill-muted-foreground text-xs" textAnchor="middle">{point.label}</text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
