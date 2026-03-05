export const filterDataByDateRange = (data, dateRange) => {
  if (!dateRange.from && !dateRange.to) return data;
  return data.filter(row => {
    const rowDate = new Date(row.date);
    if (isNaN(rowDate.getTime())) return true;
    if (dateRange.from && rowDate < dateRange.from) return false;
    if (dateRange.to && rowDate > dateRange.to) return false;
    return true;
  });
};

export const calculateMetrics = (data) => {
  if (data.length === 0) {
    return [
      { title: 'Total Sales', value: '$0', change: 0, changeLabel: 'vs last period', icon: 'sales' },
      { title: 'Monthly Revenue', value: '$0', change: 0, changeLabel: 'vs last month', icon: 'revenue' },
      { title: 'Active Users', value: '0', change: 0, changeLabel: 'vs last period', icon: 'users' },
      { title: 'Growth Rate', value: '0%', change: 0, changeLabel: 'vs last period', icon: 'growth' },
    ];
  }
  const totalSales = data.reduce((sum, row) => sum + row.sales, 0);
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalUsers = data.reduce((sum, row) => sum + row.users, 0);
  const avgGrowth = data.reduce((sum, row) => sum + row.growth, 0) / data.length;
  const midpoint = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, midpoint);
  const secondHalf = data.slice(midpoint);
  const firstHalfSales = firstHalf.reduce((sum, row) => sum + row.sales, 0);
  const secondHalfSales = secondHalf.reduce((sum, row) => sum + row.sales, 0);
  const salesChange = firstHalfSales > 0 ? ((secondHalfSales - firstHalfSales) / firstHalfSales) * 100 : 0;
  const firstHalfRevenue = firstHalf.reduce((sum, row) => sum + row.revenue, 0);
  const secondHalfRevenue = secondHalf.reduce((sum, row) => sum + row.revenue, 0);
  const revenueChange = firstHalfRevenue > 0 ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100 : 0;
  const firstHalfUsers = firstHalf.reduce((sum, row) => sum + row.users, 0);
  const secondHalfUsers = secondHalf.reduce((sum, row) => sum + row.users, 0);
  const usersChange = firstHalfUsers > 0 ? ((secondHalfUsers - firstHalfUsers) / firstHalfUsers) * 100 : 0;
  return [
    { title: 'Total Sales', value: `$${formatNumber(totalSales)}`, change: parseFloat(salesChange.toFixed(1)), changeLabel: 'vs last period', icon: 'sales' },
    { title: 'Monthly Revenue', value: `$${formatNumber(totalRevenue)}`, change: parseFloat(revenueChange.toFixed(1)), changeLabel: 'vs last month', icon: 'revenue' },
    { title: 'Active Users', value: formatNumber(Math.round(totalUsers)), change: parseFloat(usersChange.toFixed(1)), changeLabel: 'vs last period', icon: 'users' },
    { title: 'Growth Rate', value: `${avgGrowth.toFixed(1)}%`, change: parseFloat(avgGrowth.toFixed(1)), changeLabel: 'average', icon: 'growth' },
  ];
};

export const prepareLineChartData = (data) => {
  return data.map(row => ({ label: formatDateShort(row.date), value: row.sales, date: new Date(row.date) })).sort((a, b) => (a.date?.getTime() || 0) - (b.date?.getTime() || 0));
};

export const prepareBarChartData = (data) => {
  const monthlyData = {};
  data.forEach(row => {
    const date = new Date(row.date);
    if (isNaN(date.getTime())) return;
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + row.revenue;
  });
  return Object.entries(monthlyData).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => {
    const [year, month] = key.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return { label: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }), value, date };
  });
};

export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
};

export const formatDateShort = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDateFull = (date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const generateSampleData = () => {
  const data = [];
  const startDate = new Date('2024-01-01');
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const baseSales = 1000 + Math.random() * 500;
    const trend = i * 5;
    const seasonality = Math.sin(i / 7 * Math.PI) * 200;
    data.push({
      id: `sample-${i}`,
      date: date.toISOString().split('T')[0],
      sales: Math.round(baseSales + trend + seasonality),
      revenue: Math.round((baseSales + trend + seasonality) * 1.5),
      users: Math.round(50 + Math.random() * 30 + i * 0.5),
      growth: parseFloat((2 + Math.random() * 3 - 1).toFixed(1)),
    });
  }
  return data;
};
