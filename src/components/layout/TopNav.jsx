import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/components/icons/Icon";
import { useAuth } from "@/context/AuthContext";

export const TopNav = ({ onMenuClick, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const profile = user?.profile;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-sm border-b border-border z-30 transition-all duration-300 ${
        isSidebarCollapsed ? "left-16" : "left-64"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Icon name="menu" className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
            <Icon
              name="search"
              className="w-4 h-4 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search analytics..."
              className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Icon name="bell" className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {profile?.avatarImage ? (
                <img
                  src={profile.avatarImage}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-sm font-medium text-primary-foreground">
                  {profile?.avatar || "U"}
                </div>
              )}

              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">
                  {profile?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {profile?.role || "Member"}
                </p>
              </div>

              <Icon
                name="chevron-down"
                className="w-4 h-4 text-muted-foreground hidden md:block"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-card rounded-lg border border-border shadow-lg animate-scale-in">
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  View Profile
                </button>

                <button
                  onClick={() => handleNavigate("/settings")}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Settings
                </button>

                <div className="border-t border-border my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};