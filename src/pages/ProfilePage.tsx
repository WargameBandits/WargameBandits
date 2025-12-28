import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SideBar from '../components/SideBar';
import { Challenge } from '../types';

interface ProfileStats {
  totalSolved: number;
  totalPoints: number;
  rank: number;
  joinDate: string;
  lastSolve?: string;
  solvedChallenges: Challenge[];
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'achievements'>('overview');

  // Check if viewing own profile
  const isOwnProfile = !username || username === user?.githubUsername;
  const profileUsername = username || user?.githubUsername || 'guest';

  useEffect(() => {
    // Mock data - 실제로는 API에서 가져옴
    setTimeout(() => {
      setProfileData({
        totalSolved: 15,
        totalPoints: 1250,
        rank: 3,
        joinDate: '2024-01-15',
        lastSolve: '2024-11-20',
        solvedChallenges: [
          {
            id: 1,
            title: "SQL Injection 기초",
            category: "web",
            points: 100,
            difficulty: "easy",
            description: "",
            author: "admin",
            authorGithub: "admin",
            solvers: [],
            createdAt: "",
            isActive: true
          },
          {
            id: 2,
            title: "Buffer Overflow",
            category: "pwn",
            points: 150,
            difficulty: "medium",
            description: "",
            author: "admin",
            authorGithub: "admin",
            solvers: [],
            createdAt: "",
            isActive: true
          }
        ],
        achievements: [
          {
            id: '1',
            name: 'First Blood',
            description: 'Be the first to solve a challenge',
            icon: '🩸',
            unlockedAt: '2024-02-01'
          },
          {
            id: '2',
            name: 'Web Master',
            description: 'Solve 10 web challenges',
            icon: '🌐',
            unlockedAt: '2024-03-15'
          },
          {
            id: '3',
            name: 'Crypto Expert',
            description: 'Solve 5 crypto challenges',
            icon: '🔐',
            unlockedAt: '2024-04-20'
          },
          {
            id: '4',
            name: 'Speed Runner',
            description: 'Solve a challenge within 5 minutes',
            icon: '⚡',
            unlockedAt: '2024-05-10'
          }
        ]
      });
      setLoading(false);
    }, 500);
  }, [username]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'text-yellow-400', name: 'Champion' };
    if (rank === 2) return { icon: '🥈', color: 'text-gray-400', name: 'Runner-up' };
    if (rank === 3) return { icon: '🥉', color: 'text-orange-600', name: 'Third Place' };
    if (rank <= 10) return { icon: '🏆', color: 'text-purple-400', name: 'Top 10' };
    if (rank <= 50) return { icon: '⭐', color: 'text-blue-400', name: 'Top 50' };
    return { icon: '🎯', color: 'text-gray-400', name: 'Competitor' };
  };

  const rankBadge = profileData ? getRankBadge(profileData.rank) : null;

  // Activity chart data (mock)
  const activityData = Array.from({ length: 52 }, (_, i) => ({
    week: i,
    count: Math.floor(Math.random() * 5)
  }));

  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-dark-700';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count === 3) return 'bg-green-500';
    return 'bg-green-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex">
        <SideBar />
        <div className="ml-64 flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-pink"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <SideBar />
      
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="bg-dark-800 rounded-xl border border-gray-800 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={`https://github.com/${profileUsername}.png`}
                alt={profileUsername}
                className="w-32 h-32 rounded-full border-4 border-accent-pink"
              />
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{profileUsername}</h1>
                  {rankBadge && (
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{rankBadge.icon}</span>
                      <span className={`font-bold ${rankBadge.color}`}>{rankBadge.name}</span>
                    </div>
                  )}
                </div>
                <div className="text-gray-400 mb-4">
                  Member since {new Date(profileData?.joinDate || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center space-x-6">
                  <div>
                    <div className="text-2xl font-bold text-accent-pink">{profileData?.totalPoints}</div>
                    <div className="text-sm text-gray-400">Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{profileData?.totalSolved}</div>
                    <div className="text-sm text-gray-400">Solved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">#{profileData?.rank}</div>
                    <div className="text-sm text-gray-400">Rank</div>
                  </div>
                </div>
              </div>
            </div>
            
            {isOwnProfile && (
              <Link
                to="/settings"
                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
              >
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-dark-800 rounded-xl border border-gray-800 p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Activity Overview</h2>
          <div className="flex space-x-1">
            {activityData.map((week, i) => (
              <div key={i} className="flex flex-col space-y-1">
                {Array.from({ length: 7 }, (_, j) => (
                  <div
                    key={j}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(week.count)} hover:ring-2 hover:ring-white transition-all`}
                    title={`Week ${i + 1}, Day ${j + 1}: ${week.count} solves`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className={`w-3 h-3 rounded-sm ${getActivityColor(i)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-800 mb-6">
          {(['overview', 'challenges', 'achievements'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold capitalize transition-colors relative ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Solves */}
            <div className="bg-dark-800 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Solves</h3>
              <div className="space-y-3">
                {profileData?.solvedChallenges.slice(0, 5).map((challenge) => (
                  <Link
                    key={challenge.id}
                    to={`/challenge/${challenge.id}`}
                    className="flex items-center justify-between p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`difficulty-badge badge-${challenge.difficulty}`}>
                        {challenge.difficulty}
                      </span>
                      <div>
                        <div className="text-white font-medium">{challenge.title}</div>
                        <div className="text-xs text-gray-400 capitalize">{challenge.category}</div>
                      </div>
                    </div>
                    <div className="text-accent-pink font-bold">+{challenge.points}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-dark-800 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-white font-bold">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Time</span>
                  <span className="text-white font-bold">2h 34m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite Category</span>
                  <span className="text-white font-bold">Web</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">First Bloods</span>
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-white font-bold">7 days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {profileData?.solvedChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                to={`/challenge/${challenge.id}`}
                className="bg-dark-800 rounded-lg border border-gray-800 p-4 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`difficulty-badge badge-${challenge.difficulty}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-accent-pink font-bold">{challenge.points} pts</span>
                </div>
                <h4 className="text-white font-medium mb-1">{challenge.title}</h4>
                <p className="text-xs text-gray-400 capitalize">{challenge.category}</p>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {profileData?.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-dark-800 rounded-lg border border-gray-800 p-6 text-center hover:border-gray-600 transition-colors"
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="text-white font-bold mb-1">{achievement.name}</h4>
                <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>
                {achievement.unlockedAt && (
                  <p className="text-xs text-green-400">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
