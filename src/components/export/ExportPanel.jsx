import { Icon } from '@/components/icons/Icon';
import { generateCSV, generateJSON, generatePowerBICSV, downloadFile } from '@/utils/csvParser';

const ExportFormat = { CSV: 'csv', JSON: 'json', POWERBI: 'powerbi' };

export const ExportPanel = ({ data }) => {
  const handleExport = (format) => {
    if (data.length === 0) return;
    const timestamp = new Date().toISOString().split('T')[0];
    switch (format) {
      case ExportFormat.CSV:
        downloadFile(generateCSV(data), `analytics_${timestamp}.csv`, 'text/csv');
        break;
      case ExportFormat.JSON:
        downloadFile(generateJSON(data), `analytics_${timestamp}.json`, 'application/json');
        break;
      case ExportFormat.POWERBI:
        downloadFile(generatePowerBICSV(data), `powerbi_export_${timestamp}.csv`, 'text/csv');
        break;
    }
  };

  const exportOptions = [
    { format: ExportFormat.CSV, icon: 'file-spreadsheet', title: 'Export CSV', description: 'Standard CSV format with all data' },
    { format: ExportFormat.JSON, icon: 'file-json', title: 'Export JSON', description: 'JSON format for web applications' },
    { format: ExportFormat.POWERBI, icon: 'zap', title: 'Export for Power BI', description: 'Optimized CSV with proper formatting' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {exportOptions.map(({ format, icon, title, description }) => (
        <button key={format} onClick={() => handleExport(format)} disabled={data.length === 0} className="group p-6 bg-card rounded-xl border border-border text-left transition-all duration-200 hover:border-primary/50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Icon name={icon} className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Icon name="download" className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </button>
      ))}
    </div>
  );
};
