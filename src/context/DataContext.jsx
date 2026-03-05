import { createContext, useContext, useState, useEffect } from 'react';
import { generateSampleData } from '@/utils/dataUtils';

const DataContext = createContext(undefined);

const defaultSettings = {
  theme: 'light',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
};

const defaultProfile = {
  id: 'default-user',
  name: 'Alex Johnson',
  email: 'alex@analytics.co',
  avatar: 'AJ',
  role: 'Data Analyst',
  joinedAt: new Date('2023-06-15'),
  bio: '',
  location: '',
  phone: '',
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [settings, setSettings] = useState(defaultSettings);
  const [userProfile, setUserProfile] = useState(defaultProfile);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('analytics_data');
    const savedDatasets = localStorage.getItem('analytics_datasets');
    const savedSettings = localStorage.getItem('analytics_settings');

    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        setData(generateSampleData());
      }
    } else {
      setData(generateSampleData());
    }

    if (savedDatasets) {
      try {
        const parsed = JSON.parse(savedDatasets);
        setDatasets(parsed.map((ds) => ({
          ...ds,
          uploadedAt: new Date(ds.uploadedAt),
        })));
      } catch (e) {
        console.error('Failed to parse datasets', e);
      }
    }

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        if (parsed.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('analytics_data', JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (datasets.length > 0) {
      localStorage.setItem('analytics_datasets', JSON.stringify(datasets));
    }
  }, [datasets]);

  useEffect(() => {
    localStorage.setItem('analytics_settings', JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const resetData = () => {
    const sampleData = generateSampleData();
    setData(sampleData);
    setDatasets([]);
    setDateRange({ from: null, to: null });
    localStorage.removeItem('analytics_data');
    localStorage.removeItem('analytics_datasets');
  };

  const updateRow = (id, field, value) => {
    setData(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const deleteRow = (id) => {
    setData(prev => prev.filter(row => row.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        data, setData,
        datasets, setDatasets,
        dateRange, setDateRange,
        settings, setSettings,
        userProfile, setUserProfile,
        isLoading, setIsLoading,
        resetData, updateRow, deleteRow,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
