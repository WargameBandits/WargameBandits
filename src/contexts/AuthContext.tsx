import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { config } from '../utils/config';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem(config.storage.user);
    const token = localStorage.getItem(config.storage.authToken);
    
    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const login = () => {
    // GitHub OAuth login
    const authUrl = `https://github.com/login/oauth/authorize?` +
      `client_id=${config.githubOAuth.clientId}&` +
      `redirect_uri=${encodeURIComponent(config.githubOAuth.redirectUri)}&` +
      `scope=${encodeURIComponent(config.githubOAuth.scope)}`;
    
    window.location.href = authUrl;
  };

  const logout = () => {
    localStorage.removeItem(config.storage.user);
    localStorage.removeItem(config.storage.authToken);
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
