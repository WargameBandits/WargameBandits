import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "hacker123",
      githubUsername: "hacker123",
      points: 1250,
      solvedCount: 15,
      lastSolve: "2024-11-03T10:30:00"
    },
    {
      rank: 2,
      username: "cyber_warrior",
      githubUsername: "cyberwarrior",
      points: 1100,
      solvedCount: 13,
      lastSolve: "2024-11-02T15:45:00"
    },
    {
      rank: 3,
      username: "pwn_master",
      githubUsername: "pwnmaster",
      points: 950,
      solvedCount: 11,
      lastSolve: "2024-11-01T20:15:00"
    },
    {
      rank: 4,
      username: "crypto_king",
      githubUsername: "cryptoking",
      points: 800,
      solvedCount: 9,
      lastSolve: "2024-11-03T08:00:00"
    },
    {
      rank: 5,
      username: "web_wizard",
      githubUsername: "webwizard",
      points: 750,
      solvedCount: 8,
      lastSolve: "2024-11-02T12:30:00"
    }
  ];

  useEffect(() => {
    // 실제 구현시 GitHub API에서 leaderboard.json 가져오기
    setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
    }, 1000);
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 text-2xl font-bold';
    if (rank === 2) return 'text-gray-400 text-xl font-bold';
    if (rank === 3) return 'text-orange-600 text-xl font-bold';
    return 'text-white';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const formatLastSolve = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Recently';
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-400">WargameBandits의 최고 해커들을 만나보세요!</p>
        </div>

        {/* Top 3 Podium */}
        {!loading && leaderboard.length >= 3 && (
          <div className="mb-12">
            <div className="flex justify-center items-end space-x-4">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="bg-slate-800 rounded-lg p-6 w-40 h-36 flex flex-col justify-center">
                  <div className="text-5xl mb-2">🥈</div>
                  <img
                    src={`https://github.com/${leaderboard[1].githubUsername}.png`}
                    alt={leaderboard[1].username}
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                  />
                  <div className="text-white font-bold">{leaderboard[1].username}</div>
                  <div className="text-gray-400">{leaderboard[1].points} pts</div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-lg p-6 w-44 h-44 flex flex-col justify-center shadow-lg">
                  <div className="text-6xl mb-2">🥇</div>
                  <img
                    src={`https://github.com/${leaderboard[0].githubUsername}.png`}
                    alt={leaderboard[0].username}
                    className="w-20 h-20 rounded-full mx-auto mb-2 border-4 border-yellow-400"
                  />
                  <div className="text-white font-bold text-lg">{leaderboard[0].username}</div>
                  <div className="text-yellow-100">{leaderboard[0].points} pts</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="bg-slate-800 rounded-lg p-6 w-40 h-32 flex flex-col justify-center">
                  <div className="text-5xl mb-2">🥉</div>
                  <img
                    src={`https://github.com/${leaderboard[2].githubUsername}.png`}
                    alt={leaderboard[2].username}
                    className="w-14 h-14 rounded-full mx-auto mb-2"
                  />
                  <div className="text-white font-bold">{leaderboard[2].username}</div>
                  <div className="text-gray-400">{leaderboard[2].points} pts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-xl">Loading leaderboard...</div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Solved
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Solve
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {leaderboard.map((entry) => (
                  <tr key={entry.rank} className="hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getRankStyle(entry.rank)}>
                        {getRankIcon(entry.rank)} #{entry.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://github.com/${entry.githubUsername}.png`}
                          alt={entry.username}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {entry.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            @{entry.githubUsername}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-lg font-semibold text-cyan-400">
                        {entry.points}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-white">
                        {entry.solvedCount} challenges
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-gray-400">
                        {formatLastSolve(entry.lastSolve)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Total Players</div>
            <div className="text-2xl font-bold text-white">{leaderboard.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Total Points</div>
            <div className="text-2xl font-bold text-cyan-400">
              {leaderboard.reduce((sum, entry) => sum + entry.points, 0)}
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Total Solves</div>
            <div className="text-2xl font-bold text-green-400">
              {leaderboard.reduce((sum, entry) => sum + entry.solvedCount, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
