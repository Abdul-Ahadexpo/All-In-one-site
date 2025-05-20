import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// Hard-coded admin password
const ADMIN_PASSWORD = 'Niharuka1829';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const login = (password: string): boolean => {
    const isCorrect = password === ADMIN_PASSWORD;
    if (isCorrect) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
    }
    return isCorrect;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};