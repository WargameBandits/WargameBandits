import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  const stats = {
    totalChallenges: 42,
    totalUsers: 156,
    totalSolves: 892
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-cyan-400">WargameBandits</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            ASC 동아리의 참여형 워게임 플랫폼. IT대학 전공 지식을 활용한 워게임 문제를 직접 출제하고 풀어보세요!
          </p>
          
          {!isAuthenticated && (
            <button
              onClick={login}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center space-x-2 transform hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
              </svg>
              <span>GitHub으로 시작하기</span>
            </button>
          )}
          
          {isAuthenticated && (
            <Link
              to="/challenges"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center space-x-2 transform hover:scale-105 transition-transform"
            >
              <span>문제 풀러 가기</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.totalChallenges}</div>
            <div className="text-gray-300">Total Challenges</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{stats.totalUsers}</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{stats.totalSolves}</div>
            <div className="text-gray-300">Problems Solved</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">플랫폼 특징</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-2xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">학교 특화 문제</h3>
            <p className="text-gray-400">
              IT대학 전공 과목과 연계된 워게임 문제들을 풀어보세요
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-2xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">참여형 플랫폼</h3>
            <p className="text-gray-400">
              동아리 부원이라면 누구나 문제를 출제할 수 있습니다
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-2xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">리더보드</h3>
            <p className="text-gray-400">
              문제를 풀고 포인트를 획득하여 순위를 올려보세요
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-2xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">CTF 아카이브</h3>
            <p className="text-gray-400">
              ASC CTF의 역대 문제들을 모두 만나볼 수 있습니다
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-2xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-white mb-2">GitHub 인증</h3>
            <p className="text-gray-400">
              GitHub OAuth로 안전하고 간편하게 로그인하세요
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-2xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">학습 자료</h3>
            <p className="text-gray-400">
              신입 부원들을 위한 체계적인 워게임 학습 경로 제공
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">문제 카테고리</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Web', 'Pwn', 'Reverse', 'Crypto', 'Forensics', 'Misc'].map((category) => (
            <Link
              key={category}
              to={`/challenges?category=${category.toLowerCase()}`}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
