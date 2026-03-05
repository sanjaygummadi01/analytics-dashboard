import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@/components/icons/Icon';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', path: '/dashboard' },
  { id: 'upload', label: 'Upload Data', icon: 'upload', path: '/upload' },
  { id: 'visualizations', label: 'Visualizations', icon: 'bar-chart', path: '/visualizations' },
  { id: 'reports', label: 'Reports', icon: 'file-text', path: '/reports' },
  { id: 'profile', label: 'Profile', icon: 'user', path: '/profile' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Icon name="bar-chart" className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">DataViz</span>
          </div>
        )}
        <button onClick={onToggle} className="p-2 rounded-lg text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Icon name={isCollapsed ? 'chevron-right' : 'chevron-left'} className="w-4 h-4" />
        </button>
      </div>
      <nav className="p-3 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.id} to={item.path} className={`sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`} title={isCollapsed ? item.label : undefined}>
              <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-muted">
            <p>DataViz Analytics</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  );
};
