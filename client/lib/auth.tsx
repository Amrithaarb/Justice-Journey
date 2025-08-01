import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loginAsGuest: (name?: string) => void;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsGuest(false);
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
  };

  const loginAsGuest = (name = "Guest") => {
    setUser({
      id: 'guest',
      name,
      email: 'guest@example.com',
      role: 'Guest'
    });
    setIsGuest(true);
  };

  const isLoggedIn = user !== null;

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    loginAsGuest,
    isGuest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
