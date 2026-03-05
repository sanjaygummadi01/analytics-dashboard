import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FileUploader } from '@/components/upload/FileUploader';
import { DataTable } from '@/components/data/DataTable';
import { useData } from '@/context/DataContext';
import { Icon } from '@/components/icons/Icon';

const UploadData = () => {
  const { data, resetData } = useData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-foreground">Upload Data</h1><p className="text-muted-foreground mt-1">Import CSV files to visualize your analytics</p></div>
          {data.length > 0 && (<button onClick={resetData} className="btn-secondary"><Icon name="refresh" className="w-4 h-4" />Reset to Sample Data</button>)}
        </div>
        <div className="glass-card rounded-xl p-6"><FileUploader /></div>
        {data.length > 0 && (
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-foreground">Data Preview</h2><span className="text-sm text-muted-foreground">{data.length} rows total</span></div>
            <DataTable data={data} maxRows={20} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadData;
