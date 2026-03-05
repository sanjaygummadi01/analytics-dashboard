export const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};

export const parseCSV = (content) => {
  const lines = content.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row');

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
  const requiredFields = ['date', 'sales', 'revenue', 'users'];
  const missingFields = requiredFields.filter(f => !headers.includes(f));
  if (missingFields.length > 0) throw new Error(`Missing required fields: ${missingFields.join(', ')}`);

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(',').map(v => v.trim().replace(/['"]/g, ''));
    if (values.length !== headers.length) { console.warn(`Skipping row ${i + 1}: column count mismatch`); continue; }
    const row = { id: generateId(), date: '', sales: 0, revenue: 0, users: 0, growth: 0 };
    headers.forEach((header, index) => {
      const value = values[index];
      if (header === 'date') { row.date = value; }
      else if (['sales', 'revenue', 'users', 'growth'].includes(header)) { const numValue = parseFloat(value); row[header] = isNaN(numValue) ? 0 : numValue; }
      else { const numValue = parseFloat(value); row[header] = isNaN(numValue) ? value : numValue; }
    });
    rows.push(row);
  }
  return rows;
};

export const generateCSV = (data) => {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]).filter(k => k !== 'id');
  const headerLine = headers.join(',');
  const dataLines = data.map(row => headers.map(h => { const value = row[h]; if (typeof value === 'string' && value.includes(',')) return `"${value}"`; return value; }).join(','));
  return [headerLine, ...dataLines].join('\n');
};

export const generatePowerBICSV = (data) => {
  if (data.length === 0) return '';
  const headers = ['Date', 'Sales', 'Revenue', 'Users', 'Growth'];
  const headerLine = headers.join(',');
  const dataLines = data.map(row => {
    const date = new Date(row.date);
    const formattedDate = !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : row.date;
    return [formattedDate, row.sales.toFixed(2), row.revenue.toFixed(2), Math.round(row.users), row.growth.toFixed(2)].join(',');
  });
  return [headerLine, ...dataLines].join('\n');
};

export const generateJSON = (data) => {
  const cleanData = data.map(({ id, ...rest }) => rest);
  return JSON.stringify(cleanData, null, 2);
};

export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
