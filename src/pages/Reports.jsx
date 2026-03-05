import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ExportPanel } from '@/components/export/ExportPanel';
import { DataTable } from '@/components/data/DataTable';
import { useData } from '@/context/DataContext';
import { Icon } from '@/components/icons/Icon';

const Reports = () => {
  const { data, datasets } = useData();
  const reportSummary = {
    totalRecords: data.length,
    dateRange: data.length > 0 ? `${data[0]?.date} to ${data[data.length - 1]?.date}` : 'No data',
    totalRevenue: data.reduce((sum, row) => sum + row.revenue, 0),
    avgGrowth: data.length > 0 ? (data.reduce((sum, row) => sum + row.growth, 0) / data.length).toFixed(1) : 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-foreground">Reports</h1><p className="text-muted-foreground mt-1">Generate and export reports from your data</p></div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-xl p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-primary/10 rounded-lg"><Icon name="file-text" className="w-5 h-5 text-primary" /></div><h3 className="font-medium text-foreground">Total Records</h3></div><p className="text-3xl font-bold text-foreground">{reportSummary.totalRecords}</p></div>
          <div className="glass-card rounded-xl p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-chart-2/10 rounded-lg"><Icon name="calendar" className="w-5 h-5 text-chart-2" /></div><h3 className="font-medium text-foreground">Date Range</h3></div><p className="text-sm font-medium text-foreground">{reportSummary.dateRange}</p></div>
          <div className="glass-card rounded-xl p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-success/10 rounded-lg"><Icon name="trending-up" className="w-5 h-5 text-success" /></div><h3 className="font-medium text-foreground">Avg. Growth</h3></div><p className="text-3xl font-bold text-foreground">{reportSummary.avgGrowth}%</p></div>
        </div>
        <div className="glass-card rounded-xl p-6"><h2 className="text-lg font-semibold text-foreground mb-4">Export Data</h2><ExportPanel data={data} /></div>
        {data.length > 0 && (
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-foreground">Preview Export Data</h2><span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">{data.length} records</span></div>
            <DataTable data={data} maxRows={10} />
          </div>
        )}
        {datasets.length > 0 && (
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Upload History</h2>
            <div className="space-y-3">
              {datasets.map((ds, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3"><Icon name="file-text" className="w-5 h-5 text-primary" /><div><p className="font-medium text-foreground">{ds.name}</p><p className="text-sm text-muted-foreground">{ds.rows.length} rows</p></div></div>
                  <p className="text-sm text-muted-foreground">{new Date(ds.uploadedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
