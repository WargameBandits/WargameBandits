import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Challenge } from '../types'; // 혹시 타입 에러 나면 주석 해제하거나 지우세요

// 타입 정의가 없다면 임시로 여기에 정의 (에러 방지용)
interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  points: number;
  subjectTag?: string;
  author?: string;
  solvers: string[];
  firstBlood?: string;
}

const ChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // ★★★ 여기가 핵심! 백엔드랑 연결하는 부분 ★★★
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // .env에서 주소 가져오기 (없으면 로컬호스트)
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        console.log("요청 보내는 주소:", `${baseUrl}/challenges`);

        const response = await fetch(`${baseUrl}/challenges`);

        if (!response.ok) {
          throw new Error('서버 응답 에러!');
        }

        const data = await response.json();
        console.log("받은 데이터:", data);

        // 백엔드 데이터(score)를 프론트엔드(points) 모양으로 맞추기
        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          points: item.score, // 백엔드는 score, 프론트는 points
          subjectTag: 'Backend', // 임시 데이터
          author: 'Admin',
          solvers: [],
        }));

        setChallenges(formattedData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // --- 아래는 화면 그리는 로직 (기존과 동일) ---
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
      web: 'bg-blue-500', pwn: 'bg-red-500', reverse: 'bg-yellow-500',
      crypto: 'bg-green-500', forensics: 'bg-purple-500', misc: 'bg-gray-500'
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Challenges</h1>
          <p className="text-gray-400">문제를 풀고 포인트를 획득하세요!</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text" placeholder="문제 검색..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category} onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">서버에서 문제 불러오는 중...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.id} to={`/challenges/${challenge.id}`} // 링크 주소 수정됨 (challenges 복수형)
                className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors group"
              >
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
                <p className="text-gray-400 mb-4 line-clamp-2">{challenge.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    by {challenge.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredChallenges.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">등록된 문제가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;