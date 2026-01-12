import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/movie';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: (User & { password: string })[] = [
  { id: '1', name: 'Admin User', email: 'admin@cinema.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'user@cinema.com', password: 'user123', role: 'user' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cinema_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string, isAdmin = false): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = demoUsers.find(
      u => u.email === email && u.password === password && (isAdmin ? u.role === 'admin' : true)
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('cinema_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email already exists
    if (demoUsers.some(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user'
    };

    demoUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('cinema_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cinema_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
