import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { GrowthIndicator } from '@/components/charts/GrowthIndicator';
import { DateFilter } from '@/components/dashboard/DateFilter';
import { useData } from '@/context/DataContext';
import { filterDataByDateRange, prepareLineChartData, prepareBarChartData } from '@/utils/dataUtils';

const Visualizations = () => {
  const { data, dateRange, setDateRange } = useData();
  const filteredData = useMemo(() => filterDataByDateRange(data, dateRange), [data, dateRange]);
  const lineChartData = useMemo(() => prepareLineChartData(filteredData), [filteredData]);
  const barChartData = useMemo(() => prepareBarChartData(filteredData), [filteredData]);
  const userChartData = useMemo(() => {
    return filteredData.map(row => ({ label: row.date.split('-').slice(1).join('/'), value: row.users, date: new Date(row.date) })).sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));
  }, [filteredData]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-foreground">Visualizations</h1><p className="text-muted-foreground mt-1">Explore your data through interactive charts</p></div>
          <DateFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>
        {data.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center"><p className="text-muted-foreground">No data available. Upload a CSV file to see visualizations.</p></div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-2"><LineChart data={lineChartData} title="Sales Trend" height={350} /><BarChart data={barChartData} title="Revenue by Month" height={350} /></div>
            <div className="grid gap-6 lg:grid-cols-2"><LineChart data={userChartData} title="Active Users Over Time" height={300} /><GrowthIndicator data={lineChartData} title="Sales Growth Analysis" /></div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Chart Guide</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3"><div className="w-3 h-3 mt-1.5 rounded-full bg-chart-1" /><div><p className="font-medium text-foreground">Sales & Revenue</p><p className="text-sm text-muted-foreground">Primary metrics from your data</p></div></div>
                <div className="flex items-start gap-3"><div className="w-3 h-3 mt-1.5 rounded-full bg-chart-2" /><div><p className="font-medium text-foreground">User Activity</p><p className="text-sm text-muted-foreground">Active users over time</p></div></div>
                <div className="flex items-start gap-3"><div className="w-3 h-3 mt-1.5 rounded-full bg-success" /><div><p className="font-medium text-foreground">Growth Indicators</p><p className="text-sm text-muted-foreground">Trend analysis and projections</p></div></div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Visualizations;
