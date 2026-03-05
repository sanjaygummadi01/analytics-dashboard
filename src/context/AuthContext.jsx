import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const generateId = () => Math.random().toString(36).substring(2, 15);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    const savedSession = localStorage.getItem('auth_session');
    
    if (savedUser && savedSession) {
      try {
        const parsedUser = JSON.parse(savedUser);
        parsedUser.profile.joinedAt = new Date(parsedUser.profile.joinedAt);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse saved user', e);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_session');
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = () => {
    try {
      const users = localStorage.getItem('registered_users');
      if (users) {
        return JSON.parse(users);
      }
    } catch (e) {
      console.error('Failed to parse users', e);
    }
    return [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('registered_users', JSON.stringify(users));
  };

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userId = generateId();
    const demoUser = {
      id: userId,
      email: email || 'demo@example.com',
      profile: {
        id: userId,
        name: email || 'Demo User',
        email: email || 'demo@example.com',
        avatar: 'DU',
        role: 'Data Analyst',
        joinedAt: new Date(),
        bio: '',
        location: '',
        phone: '',
      },
    };
    
    setUser(demoUser);
    localStorage.setItem('auth_user', JSON.stringify(demoUser));
    localStorage.setItem('auth_session', 'active');
    setIsLoading(false);
    
    return { success: true };
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userId = generateId();
    const demoUser = {
      id: userId,
      email: email || 'demo@example.com',
      profile: {
        id: userId,
        name: name || 'Demo User',
        email: email || 'demo@example.com',
        avatar: (name || 'DU').slice(0, 2).toUpperCase(),
        role: 'Data Analyst',
        joinedAt: new Date(),
        bio: '',
        location: '',
        phone: '',
      },
    };
    
    setUser(demoUser);
    localStorage.setItem('auth_user', JSON.stringify(demoUser));
    localStorage.setItem('auth_session', 'active');
    setIsLoading(false);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_session');
  };

  const updateProfile = (updates) => {
    if (!user) return;
    
    const updatedProfile = { ...user.profile, ...updates };
    const updatedUser = { ...user, profile: updatedProfile };
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUsers(users);
    }
    
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
  };

  const updateProfileImage = (base64Image) => {
    updateProfile({ avatarImage: base64Image });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        updateProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
