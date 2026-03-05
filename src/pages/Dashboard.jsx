import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DateFilter } from '@/components/dashboard/DateFilter';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { GrowthIndicator } from '@/components/charts/GrowthIndicator';
import { useData } from '@/context/DataContext';
import { filterDataByDateRange, calculateMetrics, prepareLineChartData, prepareBarChartData } from '@/utils/dataUtils';

const Dashboard = () => {
  const { data, dateRange, setDateRange } = useData();
  const filteredData = useMemo(() => filterDataByDateRange(data, dateRange), [data, dateRange]);
  const metrics = useMemo(() => calculateMetrics(filteredData), [filteredData]);
  const lineChartData = useMemo(() => prepareLineChartData(filteredData), [filteredData]);
  const barChartData = useMemo(() => prepareBarChartData(filteredData), [filteredData]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-foreground">Dashboard</h1><p className="text-muted-foreground mt-1">Overview of your analytics data</p></div>
          <DateFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (<MetricCard key={metric.title} data={metric} delay={i * 100} />))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <LineChart data={lineChartData} title="Sales Over Time" height={320} />
          <BarChart data={barChartData} title="Monthly Revenue" height={320} />
        </div>
        <GrowthIndicator data={lineChartData} title="Growth Trend Analysis" />
        <div className="glass-card rounded-xl p-6 opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Data Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">Total Data Points</p><p className="text-2xl font-bold text-foreground">{filteredData.length}</p></div>
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">Date Range</p><p className="text-sm font-medium text-foreground">{filteredData.length > 0 ? `${filteredData[0]?.date} - ${filteredData[filteredData.length - 1]?.date}` : 'No data'}</p></div>
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">Avg. Daily Sales</p><p className="text-2xl font-bold text-foreground">${filteredData.length > 0 ? Math.round(filteredData.reduce((a, b) => a + b.sales, 0) / filteredData.length).toLocaleString() : 0}</p></div>
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-sm text-muted-foreground">Peak Revenue Day</p><p className="text-sm font-medium text-foreground">{filteredData.length > 0 ? filteredData.reduce((max, row) => row.revenue > max.revenue ? row : max, filteredData[0]).date : 'No data'}</p></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
