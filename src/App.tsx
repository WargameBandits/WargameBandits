import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ChallengesPage from './pages/ChallengesPage';
import LeaderboardPage from './pages/LeaderboardPage';

// GitHub Pages는 HashRouter 사용 (BrowserRouter 대신)
// URL이 /#/challenges 형태가 됨

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-slate-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/callback" element={<OAuthCallback />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// OAuth Callback 페이지 (GitHub 로그인 후 리다이렉트)
const OAuthCallback: React.FC = () => {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      // 실제 구현시 Serverless Function 호출하여 토큰 교환
      console.log('OAuth code received:', code);
      // TODO: Exchange code for token via API
      window.location.href = '/#/';
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-white text-xl">Logging in...</div>
    </div>
  );
};

// About 페이지
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">About WargameBandits</h1>
        
        <div className="bg-slate-800 rounded-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎯 프로젝트 소개</h2>
            <p className="text-gray-300 leading-relaxed">
              WargameBandits는 ASC 해킹동아리에서 개발한 참여형 워게임 플랫폼입니다. 
              IT대학 전공 과목에서 배운 지식을 활용하여 워게임 문제를 직접 출제하고 
              풀어볼 수 있는 교육용 플랫폼을 목표로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">💻 기술 스택</h2>
            <div className="space-y-2 text-gray-300">
              <p>• Frontend: React + TypeScript + Tailwind CSS</p>
              <p>• Hosting: GitHub Pages (100% 무료)</p>
              <p>• Backend: Vercel Serverless Functions</p>
              <p>• Database: GitHub Repository (JSON)</p>
              <p>• Authentication: GitHub OAuth</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">👥 기여 방법</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              WargameBandits는 오픈소스 프로젝트입니다. 누구나 기여할 수 있습니다!
            </p>
            <a 
              href="https://github.com/WargameBandits/WargameBandits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
              </svg>
              <span>GitHub Repository</span>
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">📧 Contact</h2>
            <p className="text-gray-300">
              문의사항은 ASC 디스코드 서버에서 @kimh로 연락주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
