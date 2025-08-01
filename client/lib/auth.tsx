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

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const authState = localStorage.getItem("justice-journey-auth");
    const userData = localStorage.getItem("justice-journey-user");

    if (authState === "true" && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          id: parsedUser.id,
          name: parsedUser.name,
          email: parsedUser.email,
          role: parsedUser.role
        });
        setIsGuest(false);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("justice-journey-auth");
        localStorage.removeItem("justice-journey-user");
      }
    }
  }, []);

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
