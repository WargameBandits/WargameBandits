import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SideBar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // 현재 경로에 따라 활성화 상태 체크
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isLabsActive = () => {
    return location.pathname.startsWith('/challenge') || 
           location.pathname === '/create-challenge';
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-dark-800 border-r border-gray-800 z-20">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-accent-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">⚔️</span>
          </div>
          <span className="text-xl font-bold text-white">WARGAME</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <Link 
          to="/dashboard" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/dashboard') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'
          }`}
        >
          <span>🏠</span>
          <span>Home</span>
        </Link>

        {/* Labs Section with Dropdown */}
        <div className="mb-2">
          <Link
            to="/challenges"
            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              isLabsActive() ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span>🧪</span>
              <span>Labs</span>
            </div>
          </Link>
          
          {/* Sub-categories */}
          {isLabsActive() && (
            <div className="ml-8 mt-2 space-y-1 border-l border-gray-700">
              {['Web', 'Crypto', 'Pwn', 'Reverse', 'Forensics', 'Misc'].map((cat) => (
                <Link
                  key={cat}
                  to={`/challenges?category=${cat.toLowerCase()}`}
                  className="block ml-3 px-4 py-2 text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link 
          to="/events" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/events') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'
          }`}
        >
          <span>📅</span>
          <span>Events</span>
        </Link>

        <Link 
          to="/leaderboard" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            isActive('/leaderboard') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'
          }`}
        >
          <span>🏆</span>
          <span>Leaderboard</span>
        </Link>

        {/* Admin Section - Only for creators/admins */}
        {user && (user.role === 'creator' || user.role === 'admin') && (
          <>
            <div className="border-t border-gray-700 my-4"></div>
            <div className="text-gray-500 text-xs uppercase font-bold px-4 mb-2">Admin Zone</div>
            <Link 
              to="/create-challenge" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/create-challenge') ? 'bg-dark-700 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <span>➕</span>
              <span>Create Challenge</span>
            </Link>
          </>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="bg-gradient-to-r from-accent-pink to-accent-purple p-4 rounded-lg">
          <div className="text-white font-bold mb-1">🚀 Pro Tip</div>
          <div className="text-white/80 text-sm">
            Complete challenges to earn points and climb the leaderboard!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
