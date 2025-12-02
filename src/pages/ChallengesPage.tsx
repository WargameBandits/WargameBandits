import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Challenge } from '../types';

const ChallengesPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'active' | 'retired'>('active');

  // URL에서 카테고리 파라미터 추출 (예: /challenges?category=web)
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'all';

  // Mock Data (실제 데이터 연동 시 교체)
  const mockChallenges: Challenge[] = [
    {
      id: 1, title: "SQL Injection Basic", description: "Learn the basics of SQLi",
      category: "web", difficulty: "easy", points: 100, author: "admin", authorGithub: "admin",
      solvers: Array(236).fill("user"), createdAt: "2024-01-01", isActive: true
    },
    {
      id: 2, title: "Muted Shell", description: "Bypass the filter and get shell",
      category: "pwn", difficulty: "easy", points: 120, author: "hacker", authorGithub: "hacker",
      solvers: Array(150).fill("user"), createdAt: "2024-01-02", isActive: true
    },
    {
      id: 3, title: "NameTag", description: "Format string bug practice",
      category: "pwn", difficulty: "medium", points: 180, author: "pwn_king", authorGithub: "pwn_king",
      solvers: Array(32).fill("user"), createdAt: "2024-01-03", isActive: true
    },
    {
      id: 4, title: "Muted Shell v2", description: "Harder version of Muted Shell",
      category: "pwn", difficulty: "medium", points: 180, author: "hacker", authorGithub: "hacker",
      solvers: Array(69).fill("user"), createdAt: "2024-01-04", isActive: true
    },
    {
      id: 5, title: "Try&Try", description: "Simple buffer overflow",
      category: "pwn", difficulty: "easy", points: 100, author: "newbie", authorGithub: "newbie",
      solvers: Array(62).fill("user"), createdAt: "2024-01-05", isActive: true
    },
    {
      id: 6, title: "Phone Book", description: "Heap exploitation basic",
      category: "pwn", difficulty: "medium", points: 150, author: "heap_master", authorGithub: "heap_master",
      solvers: Array(31).fill("user"), createdAt: "2024-01-06", isActive: true
    },
    {
      id: 7, title: "Simple Encryption", description: "XOR cipher breaking",
      category: "crypto", difficulty: "easy", points: 100, author: "math_lover", authorGithub: "math_lover",
      solvers: Array(300).fill("user"), createdAt: "2024-01-07", isActive: true
    },
    {
      id: 8, title: "Reverse Me", description: "Basic assembly reversing",
      category: "reverse", difficulty: "medium", points: 200, author: "reverser", authorGithub: "reverser",
      solvers: Array(45).fill("user"), createdAt: "2024-01-08", isActive: true
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      // 카테고리 필터링 (all이면 전체, 아니면 해당 카테고리만)
      const filtered = categoryParam === 'all' 
        ? mockChallenges 
        : mockChallenges.filter(c => c.category === categoryParam);
      setChallenges(filtered);
      setLoading(false);
    }, 500);
  }, [categoryParam]);

  // 통계 계산
  const totalPoints = challenges.reduce((acc, cur) => acc + cur.points, 0);
  const userPoints = 0; // 실제로는 user.solvedChallenges 등을 통해 계산
  const progressPercent = totalPoints === 0 ? 0 : Math.round((userPoints / totalPoints) * 100);

  // 난이도별 뱃지 스타일
  const getDifficultyBadge = (difficulty: string = 'easy') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-500 border-green-500/20';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20';
      case 'hard': return 'bg-red-500/20 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const categoryName = categoryParam === 'all' ? 'All Labs' : categoryParam.toUpperCase();
  
  // 카테고리별 설명 및 아이콘
  const getCategoryInfo = (cat: string) => {
    const info: any = {
      web: { desc: "This lab contains web vulnerability challenges.", icon: "🌐" },
      pwn: { desc: "This lab contains binary exploitation challenges.", icon: "💻" },
      crypto: { desc: "This lab contains cryptography challenges.", icon: "🔐" },
      reverse: { desc: "This lab contains reverse engineering challenges.", icon: "⚙️" },
      forensics: { desc: "This lab contains digital forensics challenges.", icon: "🔍" },
      misc: { desc: "Miscellaneous challenges.", icon: "📦" },
      all: { desc: "All available challenges.", icon: "🚀" }
    };
    return info[cat] || info.all;
  };

  const catInfo = getCategoryInfo(categoryParam);

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* 🟢 SIDEBAR (공통 레이아웃 유지) */}
      <div className="fixed left-0 top-0 h-full w-64 bg-dark-800 border-r border-gray-800 z-20">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-accent-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚔️</span>
            </div>
            <span className="text-xl font-bold text-white">WARGAME</span>
          </div>
        </div>

        <nav className="p-4">
          <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700 mb-2">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          
          <div className="mb-2">
            <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-dark-700 text-white mb-2">
               <span>🧪</span>
               <span>Labs</span>
            </Link>
            {/* Labs Submenu */}
            <div className="ml-8 mt-1 space-y-1 border-l border-gray-700 pl-3">
              {['Web', 'Crypto', 'Pwn', 'Reverse'].map((cat) => (
                <Link
                  key={cat}
                  to={`/challenges?category=${cat.toLowerCase()}`}
                  className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                    categoryParam === cat.toLowerCase() 
                      ? 'text-accent-pink bg-dark-800 font-medium' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/events" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700 mb-2">
            <span>📅</span>
            <span>Events</span>
          </Link>

          <Link to="/leaderboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700">
            <span>🏆</span>
            <span>Leaderboard</span>
          </Link>
        </nav>
      </div>

      {/* 🟢 MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Breadcrumb style path */}
          <div className="text-gray-500 text-sm font-medium">
             Training Labs <span className="mx-2">/</span> <span className="text-white">{categoryName}</span>
          </div>

          {/* User Profile & Create Button */}
          <div className="flex items-center space-x-4">
            
            {/* 🆕 Create Challenge Button Added Here */}
            <Link 
              to="/create-challenge"
              className="flex items-center space-x-2 bg-dark-800 hover:bg-dark-700 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:border-accent-pink group"
            >
              <div className="w-5 h-5 rounded bg-accent-pink flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" /></svg>
              </div>
              <span>Create</span>
            </Link>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-800">
              <img
                src={`https://github.com/${user?.githubUsername || 'ghost'}.png`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-accent-pink"
              />
              <div className="hidden md:block">
                <div className="text-white font-medium text-sm">{user?.username || 'Guest'}</div>
                <div className="text-xs text-gray-400">Level 1</div>
              </div>
              <button className="text-gray-400 hover:text-white">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* 🟢 HERO CARD (Category Info + Progress) */}
        <div className="bg-dark-800 rounded-2xl p-8 mb-8 border border-gray-800 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-pink/5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center text-2xl border border-gray-700">
                  {catInfo.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{categoryName}</h1>
                  <p className="text-gray-400 text-sm">{challenges.length} Challenges</p>
                </div>
              </div>
              <p className="text-gray-300 mt-4 max-w-2xl">
                {catInfo.desc}
              </p>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center space-x-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle
                     cx="64" cy="64" r="56"
                     stroke="currentColor" strokeWidth="8"
                     fill="transparent"
                     className="text-dark-700"
                   />
                   <circle
                     cx="64" cy="64" r="56"
                     stroke="currentColor" strokeWidth="8"
                     fill="transparent"
                     strokeDasharray={2 * Math.PI * 56}
                     strokeDashoffset={2 * Math.PI * 56 * (1 - progressPercent / 100)}
                     className="text-green-500 transition-all duration-1000 ease-out"
                     strokeLinecap="round"
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-2xl font-bold text-white">{progressPercent}%</span>
                   <span className="text-xs text-gray-500 font-mono mt-1">
                     {userPoints}/{totalPoints} Pts
                   </span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🟢 TABS (Active / Retired) */}
        <div className="flex space-x-6 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'active' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Active <span className="ml-1 px-2 py-0.5 rounded-full bg-dark-700 text-xs">{challenges.length}</span>
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink rounded-t-full"></div>}
          </button>
          <button
            onClick={() => setActiveTab('retired')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'retired' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Retired <span className="ml-1 px-2 py-0.5 rounded-full bg-dark-700 text-xs">0</span>
            {activeTab === 'retired' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink rounded-t-full"></div>}
          </button>
        </div>

        {/* 🟢 CHALLENGE LIST (Rows style) */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-pink"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <Link 
                key={challenge.id}
                to={`/challenge/${challenge.id}`}
                className="group block bg-dark-800 hover:bg-dark-700 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 min-w-[300px]">
                    <div className="p-2 rounded bg-dark-900 text-gray-400 group-hover:text-white transition-colors">
                      {/* Random Icon based on ID for variety */}
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold group-hover:text-accent-pink transition-colors">
                        {challenge.title}
                      </h3>
                      <div className="text-xs text-gray-500 uppercase font-bold mt-0.5">
                        {challenge.category}
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="flex-1 flex justify-center">
                    <span className={`px-3 py-1 rounded text-xs font-bold border ${getDifficultyBadge(challenge.difficulty)}`}>
                      {challenge.difficulty?.toUpperCase() || 'EASY'}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="flex-1 flex justify-center items-center text-gray-300 font-mono">
                    <span className="text-yellow-500 mr-2">✨</span>
                    {challenge.points} Points
                  </div>

                  {/* Solves */}
                  <div className="flex-1 flex justify-center items-center text-gray-400 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {challenge.solvers.length} Hacks
                  </div>

                  {/* Arrow Icon */}
                  <div className="pl-4 text-gray-600 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>
            ))}

            {challenges.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No active challenges found in this lab.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;