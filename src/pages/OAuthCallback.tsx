import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      // 실제 구현시 Serverless Function 호출하여 토큰 교환
      console.log('OAuth code received:', code);
      // TODO: Exchange code for token via API
      
      // 임시로 로그인 처리 (Mock Data)
      const mockUser = {
        id: '1',
        username: 'testuser',
        githubUsername: 'testuser',
        role: 'user' as const,
        points: 0,
        solvedChallenges: [],
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('wargame_user', JSON.stringify(mockUser));
      localStorage.setItem('wargame_auth_token', 'mock_token');
      
      // window.location.href 대신 navigate 사용 (SPA 방식 유지)
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-900">
      <div className="text-white text-xl">Logging in...</div>
    </div>
  );
};

export default OAuthCallback;