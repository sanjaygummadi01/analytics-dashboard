import { useState } from 'react';
import { Icon } from '@/components/icons/Icon';

export const DateFilter = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFromChange = (e) => {
    const from = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange({ ...dateRange, from });
  };

  const handleToChange = (e) => {
    const to = e.target.value ? new Date(e.target.value) : null;
    onDateRangeChange({ ...dateRange, to });
  };

  const clearFilters = () => {
    onDateRangeChange({ from: null, to: null });
  };

  const hasFilters = dateRange.from || dateRange.to;

  const formatDateForInput = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className={`btn-secondary ${hasFilters ? 'border-primary text-primary' : ''}`}>
        <Icon name="calendar" className="w-4 h-4" />
        <span>{hasFilters ? 'Filters Active' : 'Date Filter'}</span>
        {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 p-4 bg-card rounded-xl border border-border shadow-lg z-20 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Filter by Date</h4>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">From</label>
              <input type="date" value={formatDateForInput(dateRange.from)} onChange={handleFromChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">To</label>
              <input type="date" value={formatDateForInput(dateRange.to)} onChange={handleToChange} className="input-field" />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={clearFilters} className="flex-1 btn-secondary text-sm py-2">Clear</button>
              <button onClick={() => setIsOpen(false)} className="flex-1 btn-primary text-sm py-2">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
