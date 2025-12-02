import React, { useState, useEffect } from 'react';
import { Challenge } from '../types';
import { Link } from 'react-router-dom';

const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data - 실제로는 GitHub API나 Serverless Function에서 가져옴
  const mockChallenges: Challenge[] = [
    {
      id: 1,
      title: "SQL Injection 기초",
      description: "데이터베이스 과목에서 배운 SQL을 활용한 문제",
      category: "web",
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
      subjectTag: "정보보안",
      points: 200,
      author: "park",
      authorGithub: "park",
      solvers: [],
      createdAt: "2024-11-03",
      isActive: true
    }
  ];

  useEffect(() => {
    // 실제 구현시 GitHub API에서 challenges.json 가져오기
    setTimeout(() => {
      setChallenges(mockChallenges);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['all', 'web', 'pwn', 'reverse', 'crypto', 'forensics', 'misc'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (challenge.subjectTag?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      web: 'bg-blue-500',
      pwn: 'bg-red-500',
      reverse: 'bg-yellow-500',
      crypto: 'bg-green-500',
      forensics: 'bg-purple-500',
      misc: 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getDifficultyColor = (points: number) => {
    if (points <= 100) return 'text-green-400';
    if (points <= 200) return 'text-yellow-400';
    if (points <= 300) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Challenges</h1>
          <p className="text-gray-400">문제를 풀고 포인트를 획득하세요!</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="문제 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">Loading challenges...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                to={`/challenge/${challenge.id}`}
                className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors group"
              >
                {/* Challenge Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {challenge.title}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white mt-2 ${getCategoryColor(challenge.category)}`}>
                      {challenge.category.toUpperCase()}
                    </span>
                  </div>
                  <div className={`text-2xl font-bold ${getDifficultyColor(challenge.points)}`}>
                    {challenge.points}
                  </div>
                </div>

                {/* Challenge Description */}
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                {/* Challenge Meta */}
                <div className="space-y-2 text-sm">
                  {challenge.subjectTag && (
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {challenge.subjectTag}
                    </div>
                  )}
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    by {challenge.author}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {challenge.solvers.length} solves
                    {challenge.firstBlood && (
                      <span className="ml-2 text-yellow-400">
                        🩸 {challenge.firstBlood}
                      </span>
                    )}
                  </div>
                </div>

                {/* Solved Indicator */}
                {challenge.solvers.includes('currentUser') && (
                  <div className="mt-4 text-green-400 font-medium flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Solved
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {filteredChallenges.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No challenges found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;
