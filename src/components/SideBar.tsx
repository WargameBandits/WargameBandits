import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  // Labs 메뉴는 관련 페이지(challenges, create-challenge 등)에 있을 때 기본적으로 열려있게 설정
  const isLabsActive = location.pathname.includes('/challenges') || 
                       location.pathname.includes('/challenge') || 
                       location.pathname.includes('/create-challenge');
                       
  const [isLabsOpen, setIsLabsOpen] = useState(isLabsActive);

  // 페이지 이동 시 자동으로 Labs 메뉴 열림 상태 동기화 (선택 사항)
  useEffect(() => {
    if (isLabsActive) setIsLabsOpen(true);
  }, [isLabsActive]);

  const isActive = (path: string) => location.pathname === path;

  // URL에서 category 파라미터 확인
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get('category');

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-dark-800 border-r border-gray-800 z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-accent-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">⚔️</span>
          </div>
          <span className="text-xl font-bold text-white">WARGAME</span>
        </div>
      </div>

      <nav className="p-4">
        {/* Home Link */}
        <Link 
          to="/dashboard" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/dashboard') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700'
          }`}
        >
          <span>🏠</span>
          <span>Home</span>
        </Link>
        
        {/* Labs Menu */}
        <div className="mb-2">
          <button
            onClick={() => setIsLabsOpen(!isLabsOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
              isLabsActive ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span>🧪</span>
              <span>Labs</span>
            </div>
            <span className="text-xs">{isLabsOpen ? '▲' : '▼'}</span>
          </button>
          
          {/* Labs Submenu */}
          {isLabsOpen && (
            <div className="ml-8 mt-1 space-y-1 border-l border-gray-700 pl-3">
              {['Web', 'Crypto', 'Pwn', 'Reverse'].map((cat) => (
                <Link
                  key={cat}
                  to={`/challenges?category=${cat.toLowerCase()}`}
                  className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                    currentCategory === cat.toLowerCase()
                      ? 'text-accent-pink bg-dark-800 font-medium' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}
                </Link>
              ))}
              
              {/* Create Button */}
              <Link
                to="/create-challenge"
                className={`flex items-center space-x-2 px-4 py-2 mt-2 text-sm font-bold rounded-md transition-all group ${
                  isActive('/create-challenge')
                    ? 'text-white bg-accent-pink/10'
                    : 'text-accent-pink hover:text-white hover:bg-dark-700/50'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                   isActive('/create-challenge') 
                   ? 'bg-accent-pink border-transparent'
                   : 'border-accent-pink group-hover:bg-accent-pink group-hover:border-transparent'
                }`}>
                  <svg className={`w-3 h-3 ${isActive('/create-challenge') ? 'text-white' : 'text-accent-pink group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span>Create</span>
              </Link>
            </div>
          )}
        </div>

        {/* Events Link */}
        <Link 
          to="/events" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/events') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700'
          }`}
        >
          <span>📅</span>
          <span>Events</span>
        </Link>

        {/* Leaderboard Link */}
        <Link 
          to="/leaderboard" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/leaderboard') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700'
          }`}
        >
          <span>🏆</span>
          <span>Leaderboard</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;