import { useState, useRef } from 'react';
import { Icon } from '@/components/icons/Icon';
import { useData } from '@/context/DataContext';
import { parseCSV } from '@/utils/csvParser';

export const FileUploader = () => {
  const { setData, setDatasets, datasets } = useData();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };

  const processFile = async (file) => {
    setError(null);
    setSuccess(null);
    setIsProcessing(true);
    try {
      if (!file.name.endsWith('.csv')) throw new Error('Please upload a CSV file');
      const content = await file.text();
      const rows = parseCSV(content);
      if (rows.length === 0) throw new Error('No valid data found in the file');
      setData(rows);
      setDatasets(prev => [...prev, { name: file.name, uploadedAt: new Date(), rows }]);
      setSuccess(`Successfully loaded ${rows.length} rows from ${file.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) processFile(file); };
  const handleFileSelect = (e) => { const file = e.target.files?.[0]; if (file) processFile(file); };

  return (
    <div className="space-y-6">
      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}>
        <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-primary/10' : 'bg-muted'}`}>
            <Icon name="upload" className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">{isDragging ? 'Drop your file here' : 'Drop a CSV file or click to upload'}</p>
            <p className="text-sm text-muted-foreground mt-1">Supports CSV files with date, sales, revenue, and users columns</p>
          </div>
        </div>
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-foreground">Processing file...</span>
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive animate-scale-in">
          <Icon name="alert-circle" className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto p-1 hover:bg-destructive/10 rounded"><Icon name="x" className="w-4 h-4" /></button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg text-success animate-scale-in">
          <Icon name="check-circle" className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{success}</p>
          <button onClick={() => setSuccess(null)} className="ml-auto p-1 hover:bg-success/10 rounded"><Icon name="x" className="w-4 h-4" /></button>
        </div>
      )}
      {datasets.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Uploads</h3>
          <div className="space-y-2">
            {datasets.slice(-5).reverse().map((ds, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="file-text" className="w-5 h-5 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{ds.name}</p>
                  <p className="text-xs text-muted-foreground">{ds.rows.length} rows • {new Date(ds.uploadedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">CSV Format</h4>
        <p className="text-xs text-muted-foreground mb-3">Your CSV file should include the following columns:</p>
        <div className="flex flex-wrap gap-2">
          {['date', 'sales', 'revenue', 'users', 'growth (optional)'].map((col) => (
            <span key={col} className="px-2 py-1 bg-background rounded text-xs font-mono text-foreground">{col}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
