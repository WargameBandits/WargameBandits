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
    // [개발용 임시 코드] 깃허브 OAuth 대신 즉시 로그인 처리
    const mockUser: User = {
      id: 'dev-1',
      username: 'DevHacker', // 테스트하고 싶은 이름
      githubUsername: 'ghost', // 깃허브 프로필 사진용 (ghost는 깃허브 기본 이미지)
      role: 'admin', // 'admin'으로 설정해서 Create Challenge 메뉴도 테스트 해보세요
      points: 1337,
      solvedChallenges: [1, 2],
      createdAt: new Date().toISOString()
    };

    // 로컬 스토리지에 저장 (새로고침 해도 유지되도록)
    localStorage.setItem(config.storage.user, JSON.stringify(mockUser));
    localStorage.setItem(config.storage.authToken, 'mock_token_for_dev');

    // 상태 업데이트
    setAuthState({
      isAuthenticated: true,
      user: mockUser,
      loading: false
    });
    // GitHub OAuth login
    //const authUrl = `https://github.com/login/oauth/authorize?` +
    //  `client_id=${config.githubOAuth.clientId}&` +
    //  `redirect_uri=${encodeURIComponent(config.githubOAuth.redirectUri)}&` +
    //  `scope=${encodeURIComponent(config.githubOAuth.scope)}`;
    
    //window.location.href = authUrl;
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
