import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { Icon } from '@/components/icons/Icon';

const Settings = () => {
  const { settings, setSettings, resetData } = useData();

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all application data? This cannot be undone.')) {
      resetData();
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-foreground">Settings</h1><p className="text-muted-foreground mt-1">Customize your dashboard experience</p></div>
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Appearance</h2>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name={settings.theme === 'light' ? 'sun' : 'moon'} className={`w-5 h-5 ${settings.theme === 'light' ? 'text-warning' : 'text-chart-2'}`} />
              <div><p className="font-medium text-foreground">Theme</p><p className="text-sm text-muted-foreground">Current: {settings.theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p></div>
            </div>
            <button onClick={toggleTheme} className="relative w-14 h-7 bg-muted rounded-full transition-colors duration-200">
              <span className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-200 ${settings.theme === 'dark' ? 'left-8 bg-primary' : 'left-1 bg-muted-foreground'}`} />
            </button>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3"><Icon name="refresh" className="w-5 h-5 text-primary" /><div><p className="font-medium text-foreground">Reset to Sample Data</p><p className="text-sm text-muted-foreground">Replace current data with sample analytics data</p></div></div>
              <button onClick={resetData} className="btn-secondary text-sm">Reset Data</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-3"><Icon name="trash" className="w-5 h-5 text-destructive" /><div><p className="font-medium text-foreground">Clear All Data</p><p className="text-sm text-muted-foreground">Permanently delete all data and reset the application</p></div></div>
              <button onClick={handleResetAll} className="px-4 py-2 bg-destructive text-destructive-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">Clear All</button>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3"><Icon name="globe" className="w-5 h-5 text-primary" /><div><p className="font-medium text-foreground">Currency</p><p className="text-sm text-muted-foreground">Display currency for financial data</p></div></div>
              <select value={settings.currency} onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))} className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option><option value="JPY">JPY (¥)</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3"><div className="w-5 h-5 flex items-center justify-center text-primary font-mono text-xs">DD</div><div><p className="font-medium text-foreground">Date Format</p><p className="text-sm text-muted-foreground">How dates are displayed in the app</p></div></div>
              <select value={settings.dateFormat} onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))} className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="MM/DD/YYYY">MM/DD/YYYY</option><option value="DD/MM/YYYY">DD/MM/YYYY</option><option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground"><span className="text-foreground font-medium">DataViz Analytics</span> v1.0.0</p>
            <p className="text-muted-foreground">A frontend-only data analytics dashboard built with React and JavaScript.</p>
            <p className="text-muted-foreground">All data is stored locally in your browser.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
