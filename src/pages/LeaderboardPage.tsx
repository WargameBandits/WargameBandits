import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 네비게이션을 위해 추가
import { useAuth } from '../contexts/AuthContext';
import { LeaderboardEntry } from '../types';

const LeaderboardPage: React.FC = () => {
  const { user } = useAuth(); // 상단 프로필용
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data (실제 데이터 연동 시 교체)
  const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: "Zer0d2Y", githubUsername: "zer0d2y", points: 1250, solvedCount: 15, lastSolve: "2024-11-03T10:30:00" },
    { rank: 2, username: "amineecmoi", githubUsername: "amine", points: 1100, solvedCount: 13, lastSolve: "2024-11-02T15:45:00" },
    { rank: 3, username: "Leslato", githubUsername: "leslato", points: 950, solvedCount: 11, lastSolve: "2024-11-01T20:15:00" },
    { rank: 4, username: "GOLFMG", githubUsername: "golfmg", points: 800, solvedCount: 9, lastSolve: "2024-11-03T08:00:00" },
    { rank: 5, username: "web_wizard", githubUsername: "webwizard", points: 750, solvedCount: 8, lastSolve: "2024-11-02T12:30:00" },
    { rank: 6, username: "pwn_star", githubUsername: "pwnstar", points: 600, solvedCount: 6, lastSolve: "2024-11-02T12:30:00" },
    { rank: 7, username: "rev_eng", githubUsername: "reveng", points: 550, solvedCount: 5, lastSolve: "2024-11-02T12:30:00" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
    }, 500);
  }, []);

  // Top 3 플레이어 분리
  const topThree = leaderboard.slice(0, 3);
  const restPlayers = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* 🟢 SIDEBAR (Dashboard와 동일한 구조 유지) */}
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
          
          <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700 mb-2">
             <span>🧪</span>
             <span>Labs</span>
          </Link>

          <Link to="/events" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700 mb-2">
            <span>📅</span>
            <span>Events</span>
          </Link>

          {/* 현재 페이지 활성화 표시 */}
          <Link to="/leaderboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-dark-700 text-white">
            <span>🏆</span>
            <span>Leaderboard</span>
          </Link>
        </nav>
        {/* Premium 버튼 제거됨 */}
      </div>

      {/* 🟢 MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">
        {/* TOP BAR (Dashboard와 동일한 구조 유지) */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Online players</span>
              <span className="text-white font-bold">• 367</span>
            </div>

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

        {/* 🟢 FLAGYARD STYLE LEADERBOARD UI */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-pink"></div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            
            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-end">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="bg-dark-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center relative hover-lift">
                  <div className="absolute -top-4 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center font-bold text-dark-900 border-2 border-dark-900">2</div>
                  <img src={`https://github.com/${topThree[1].githubUsername}.png`} className="w-20 h-20 rounded-full mb-4 border-2 border-gray-400" alt="avatar" />
                  <div className="text-xl font-bold text-white">{topThree[1].username}</div>
                  <div className="text-accent-pink font-mono mt-1">{topThree[1].points} pts</div>
                </div>
              )}

              {/* 1st Place (Biggest) */}
              {topThree[0] && (
                <div className="bg-dark-800 border border-yellow-500/30 rounded-xl p-8 flex flex-col items-center relative transform -translate-y-4 shadow-[0_0_30px_rgba(251,191,36,0.1)] hover-lift">
                  <div className="absolute -top-5 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-dark-900 border-4 border-dark-900 text-xl">1</div>
                  <div className="absolute top-0 right-0 p-2">👑</div>
                  <img src={`https://github.com/${topThree[0].githubUsername}.png`} className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400 shadow-lg" alt="avatar" />
                  <div className="text-2xl font-bold text-white">{topThree[0].username}</div>
                  <div className="text-yellow-400 font-mono text-lg mt-1 font-bold">{topThree[0].points} pts</div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="bg-dark-800 border border-orange-700/50 rounded-xl p-6 flex flex-col items-center relative hover-lift">
                   <div className="absolute -top-4 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white border-2 border-dark-900">3</div>
                  <img src={`https://github.com/${topThree[2].githubUsername}.png`} className="w-20 h-20 rounded-full mb-4 border-2 border-orange-600" alt="avatar" />
                  <div className="text-xl font-bold text-white">{topThree[2].username}</div>
                  <div className="text-accent-pink font-mono mt-1">{topThree[2].points} pts</div>
                </div>
              )}
            </div>

            {/* List for the rest */}
            <div className="bg-dark-800 rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-dark-700 text-gray-400 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Hacker</th>
                    <th className="px-6 py-4 text-center">Challenges</th>
                    <th className="px-6 py-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {restPlayers.map((entry) => (
                    <tr key={entry.rank} className="hover:bg-dark-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-400 font-mono">#{entry.rank}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img src={`https://github.com/${entry.githubUsername}.png`} className="w-8 h-8 rounded-full" alt="avatar" />
                          <span className="text-white font-medium">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400">{entry.solvedCount}</td>
                      <td className="px-6 py-4 text-right font-mono text-accent-pink font-bold">
                        {entry.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;