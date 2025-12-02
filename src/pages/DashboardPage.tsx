import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Challenge, LeaderboardEntry } from '../types';
import SideBar from '../components/SideBar'; // Sidebar 컴포넌트 import (경로에 맞게 수정 필요)

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // selectedTab 상태는 Sidebar 컴포넌트 내부에서 라우팅으로 처리되므로 제거했습니다.
  
  // Mock data
  const recentChallenges: Challenge[] = [
    {
      id: 1,
      title: "Normal El-Gamal",
      category: "crypto",
      points: 100,
      difficulty: "hard",
      solvers: [],
      author: "admin",
      authorGithub: "admin",
      description: "",
      createdAt: "2024-11-20",
      isActive: true
    },
    {
      id: 2,
      title: "Mischenger",
      category: "web",
      points: 150,
      difficulty: "medium",
      solvers: [],
      author: "kimh",
      authorGithub: "kimh",
      description: "",
      createdAt: "2024-11-19",
      isActive: true
    },
    {
      id: 3,
      title: "White Bird",
      category: "reverse",
      points: 200,
      difficulty: "medium",
      solvers: [],
      author: "park",
      authorGithub: "park",
      description: "",
      createdAt: "2024-11-18",
      isActive: true
    }
  ];

  const latestActivity = [
    { user: "Zer0d2Y", challenge: "QRRR!", points: 50, time: "2 minutes ago", avatar: "🟣" },
    { user: "amineecmoi", challenge: "Simple Encryption", points: 100, time: "7 hours ago", avatar: "🟢" },
    { user: "Leslato", challenge: "nooter", points: 100, time: "7 hours ago", avatar: "⚫" },
    { user: "GOLFMG", challenge: "R1p-2@ac@m", points: 220, time: "9 hours ago", avatar: "🔴" }
  ];

  const topPlayers: LeaderboardEntry[] = [
    { rank: 1, username: "Zer0d2Y", githubUsername: "zer0d2y", points: 1250, solvedCount: 15 },
    { rank: 2, username: "amineecmoi", githubUsername: "amine", points: 1100, solvedCount: 13 },
    { rank: 3, username: "Leslato", githubUsername: "leslato", points: 950, solvedCount: 11 }
  ];

  const progressPercentage = 40; // 40% to Amateur

  return (
    <div className="min-h-screen bg-dark-900">
      {/* 기존의 하드코딩된 사이드바 코드를 제거하고 
        Sidebar 컴포넌트로 대체했습니다.
        위치는 absolute/fixed 레이아웃상 동일하게 유지됩니다.
      */}
      <SideBar></SideBar>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          
          <div className="flex items-center space-x-6">
            {/* Online players */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Online players</span>
              <span className="text-white font-bold">• 367</span>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <img
                src={`https://github.com/${user?.githubUsername || 'ghost'}.png`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-accent-pink"
              />
              <div>
                <div className="text-white font-medium">{user?.username || 'Anonymous'}</div>
                <div className="text-xs text-gray-400">{user?.points || 0} points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-dark-800 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Your Progress</span>
            <span className="text-white font-bold">{progressPercentage}% to be Amateur</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-accent-pink to-accent-purple h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Beginner</span>
            <span>Amateur</span>
            <span>Expert</span>
            <span>Master</span>
            <span>Legend</span>
          </div>
        </div>

        {/* Rank Badge */}
        <div className="bg-dark-800 rounded-lg p-6 mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Rank</h3>
            <p className="text-gray-400">Unranked yet</p>
          </div>
          <div className="text-6xl">🎯</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Announcements */}
          <div className="bg-dark-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Announcements</h2>
            <div className="text-center py-8 text-gray-500">
              No announcements yet
            </div>
          </div>

          {/* Latest Releases */}
          <div className="bg-dark-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Latest Releases</h2>
            <div className="space-y-4">
              {recentChallenges.map((challenge) => (
                <Link
                  key={challenge.id}
                  to={`/challenge/${challenge.id}`}
                  className="block hover:bg-dark-700 p-3 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl category-gradient-${challenge.category}`}>
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{challenge.title}</div>
                        <div className="text-xs text-gray-400 capitalize">{challenge.category}</div>
                      </div>
                    </div>
                    <span className={`difficulty-badge badge-${challenge.difficulty}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Activity */}
        <div className="mt-8 bg-dark-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Latest Activity</h2>
          <div className="space-y-3">
            {latestActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-dark-700 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{activity.avatar}</div>
                  <div>
                    <span className="text-white font-medium">{activity.user}</span>
                    <span className="text-gray-400"> claimed the flag in </span>
                    <span className="text-accent-pink">{activity.challenge}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500">⭐ {activity.points} points</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    web: '🌐',
    crypto: '🔐',
    pwn: '💻',
    reverse: '⚙️',
    forensics: '🔍',
    misc: '📦'
  };
  return icons[category] || '📦';
};

export default DashboardPage;