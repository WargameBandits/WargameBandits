import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/challenges', label: 'Challenges' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-cyan-400">⚔️</span>
              <span className="ml-2 text-xl font-bold text-white">WargameBandits</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && user?.role !== 'user' && (
                <Link
                  to="/create"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/create')
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Create Challenge
                </Link>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src={user?.avatarUrl || `https://github.com/${user?.githubUsername}.png`}
                    alt={user?.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-white text-sm">{user?.username}</span>
                  <span className="text-cyan-400 text-xs">({user?.points} pts)</span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-slate-800 text-gray-300 hover:bg-slate-700 px-3 py-1 rounded-md text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={login}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
                </svg>
                <span>Login with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.path)
                  ? 'bg-slate-800 text-cyan-400'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
