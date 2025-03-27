import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import { users } from '@/data/mockData';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved auth in session storage
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, password is ignored
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      sessionStorage.setItem('user', JSON.stringify(foundUser));
      toast.success('Login successful');
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
