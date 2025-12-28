import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Challenge } from '../types';
import SideBar from '../components/SideBar';

const ChallengesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data - 실제로는 GitHub API나 Serverless Function에서 가져옴
  const mockChallenges: Challenge[] = [
    {
      id: 1,
      title: "SQL Injection 기초",
      description: "데이터베이스 과목에서 배운 SQL을 활용한 문제",
      category: "web",
      difficulty: "easy",
      subjectTag: "데이터베이스",
      points: 100,
      author: "kimh",
      authorGithub: "kimh",
      solvers: ["user1", "user2"],
      firstBlood: "user1",
      createdAt: "2024-11-01",
      isActive: true
    },
    {
      id: 2,
      title: "Buffer Overflow 입문",
      description: "시스템 프로그래밍에서 배운 메모리 구조 활용",
      category: "pwn",
      difficulty: "medium",
      subjectTag: "시스템프로그래밍",
      points: 150,
      author: "lee",
      authorGithub: "lee",
      solvers: ["user1"],
      firstBlood: "user1",
      createdAt: "2024-11-02",
      isActive: true
    },
    {
      id: 3,
      title: "RSA 암호 해독",
      description: "정보보안 과목의 RSA 암호화 알고리즘",
      category: "crypto",
      difficulty: "hard",
      subjectTag: "정보보안",
      points: 200,
      author: "park",
      authorGithub: "park",
      solvers: [],
      createdAt: "2024-11-03",
      isActive: true
    },
    {
      id: 4,
      title: "XSS Challenge",
      description: "Cross-Site Scripting 취약점을 찾아보세요",
      category: "web",
      difficulty: "medium",
      points: 120,
      author: "admin",
      authorGithub: "admin",
      solvers: ["user3"],
      createdAt: "2024-11-04",
      isActive: true
    },
    {
      id: 5,
      title: "Binary Analysis",
      description: "주어진 바이너리를 분석하여 플래그를 찾으세요",
      category: "reverse",
      difficulty: "hard",
      points: 250,
      author: "kim",
      authorGithub: "kim",
      solvers: [],
      createdAt: "2024-11-05",
      isActive: true
    }
  ];

  useEffect(() => {
    // 실제 구현시 GitHub API에서 challenges.json 가져오기
    setTimeout(() => {
      setChallenges(mockChallenges);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = ['all', 'web', 'pwn', 'reverse', 'crypto', 'forensics', 'misc'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (challenge.subjectTag?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

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

  const getDifficultyColor = (difficulty?: string) => {
    switch(difficulty) {
      case 'easy': return 'badge-easy';
      case 'medium': return 'badge-medium';
      case 'hard': return 'badge-hard';
      default: return 'badge-medium';
    }
  };

  const getCategoryGradient = (category: string) => {
    const gradients: { [key: string]: string } = {
      web: 'category-gradient-web',
      crypto: 'category-gradient-crypto',
      pwn: 'category-gradient-pwn',
      reverse: 'category-gradient-reverse',
      forensics: 'category-gradient-forensics',
      misc: 'category-gradient-misc'
    };
    return gradients[category] || 'category-gradient-misc';
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <SideBar />
      
      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Challenges</h1>
            <p className="text-gray-400 mt-2">Test your skills and earn points!</p>
          </div>
          
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

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 border border-gray-700 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:border-accent-pink transition-colors"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-accent-pink text-white shadow-lg shadow-accent-pink/20'
                    : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white border border-gray-700'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-gray-400">
              <span className="text-white font-bold">{filteredChallenges.length}</span> challenges found
            </div>
            <div className="text-gray-400">
              <span className="text-green-400 font-bold">
                {filteredChallenges.filter(c => c.solvers.includes(user?.username || '')).length}
              </span> solved
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400 font-bold">
                {filteredChallenges.reduce((acc, c) => acc + c.points, 0)}
              </span> total points
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-pink"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                to={`/challenge/${challenge.id}`}
                className="bg-dark-800 rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-all hover-lift group"
              >
                {/* Challenge Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${getCategoryGradient(challenge.category)}`}>
                      {getCategoryIcon(challenge.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-pink transition-colors">
                        {challenge.title}
                      </h3>
                      <span className="text-xs text-gray-500 capitalize">
                        {challenge.category}
                      </span>
                    </div>
                  </div>
                  <span className={`difficulty-badge ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Challenge Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                {/* Challenge Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {challenge.solvers.length}
                    </div>
                    {challenge.subjectTag && (
                      <span className="text-xs px-2 py-1 bg-dark-700 text-gray-400 rounded">
                        {challenge.subjectTag}
                      </span>
                    )}
                  </div>
                  <div className="text-accent-pink font-bold">
                    {challenge.points} pts
                  </div>
                </div>

                {/* Solved Indicator */}
                {challenge.solvers.includes(user?.username || '') && (
                  <div className="mt-3 flex items-center text-green-400 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Solved
                  </div>
                )}

                {/* First Blood */}
                {challenge.firstBlood && (
                  <div className="mt-2 flex items-center text-yellow-400 text-xs">
                    <span className="mr-1">🩸</span>
                    First Blood: {challenge.firstBlood}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {filteredChallenges.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-xl">No challenges found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;
