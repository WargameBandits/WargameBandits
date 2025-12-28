import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast'; // 알림 추가

// 인터페이스 수정 (JSON 데이터 구조에 맞춤)
interface ChallengeDetail {
  id: string; // JSON의 id는 문자열 (web-01 등)
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard'; // 대문자로 수정
  points: number;
  solvedBy: number; // solversCount -> solvedBy
  description: string;
  // firstBlood, author 등은 JSON에 없으면 optional로 처리
  firstBlood?: { username: string; time: string; };
  author?: string;
  files?: boolean;
}

const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details');
  const [instanceStatus, setInstanceStatus] = useState<'offline' | 'starting' | 'online'>('offline');
  
  // Flag 입력 관리 State
  const [flagInput, setFlagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. 데이터 가져오기 (API 연동)
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`/api/challenge?id=${id}`);
        if (!response.ok) throw new Error('Failed to load challenge');
        const data = await response.json();
        setChallenge(data);
      } catch (error) {
        console.error(error);
        toast.error("문제를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  // 2. 플래그 제출 핸들러 (API 연동)
  const handleSubmitFlag = async () => {
    if (!flagInput.trim()) {
      toast('플래그를 입력해주세요.', { icon: '🤔' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: id, flag: flagInput }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setFlagInput(''); // 입력창 초기화
        // 여기에 정답 맞췄을 때 폭죽 효과 등을 추가할 수 있습니다.
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('서버 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartInstance = () => {
    setInstanceStatus('starting');
    setTimeout(() => setInstanceStatus('online'), 2000);
  };

  const getDifficultyBadge = (diff: string) => {
    const d = diff.toLowerCase();
    switch (d) {
      case 'easy': return 'bg-green-500/20 text-green-500 border-green-500/20';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20';
      case 'hard': return 'bg-red-500/20 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Loading...</div>;
  if (!challenge) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Challenge not found</div>;

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* 알림용 Toaster 컴포넌트 */}
      <Toaster position="top-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

      {/* 🟢 SIDEBAR (공통) */}
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
            <span>🏠</span><span>Home</span>
          </Link>
          <div className="mb-2">
            <Link to="/challenges" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-dark-700 text-white mb-2">
               <span>🧪</span><span>Labs</span>
            </Link>
            <div className="ml-8 mt-1 space-y-1 border-l border-gray-700 pl-3">
              {['Web', 'Crypto', 'Pwn', 'Reverse'].map((cat) => (
                <Link key={cat} to={`/challenges?category=${cat.toLowerCase()}`} className="block px-4 py-2 text-sm text-gray-500 hover:text-white rounded-md">{cat}</Link>
              ))}
            </div>
          </div>
          <Link to="/events" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700 mb-2"><span>📅</span><span>Events</span></Link>
          <Link to="/leaderboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-dark-700"><span>🏆</span><span>Leaderboard</span></Link>
        </nav>
      </div>

      {/* 🟢 MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">
        {/* Top Header & Breadcrumbs */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-gray-500 text-sm font-medium">
              Training Labs <span className="mx-2">/</span> {challenge.category} <span className="mx-2">/</span> <span className="text-white">{challenge.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <img src={`https://github.com/${user?.githubUsername || 'ghost'}.png`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-accent-pink" />
            <div className="hidden md:block">
              <div className="text-white font-medium text-sm">{user?.username || 'Guest'}</div>
              <div className="text-xs text-gray-400">Level 1</div>
            </div>
          </div>
        </div>

        {/* 🟢 1. STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Points */}
          <div className="bg-dark-800 rounded-xl p-6 border border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase font-bold">Challenge Points</div>
              <div className="text-white text-xl font-bold">{challenge.points} Points</div>
            </div>
          </div>

          {/* Hacks */}
          <div className="bg-dark-800 rounded-xl p-6 border border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase font-bold">Solved By</div>
              <div className="text-white text-xl font-bold">{challenge.solvedBy} Users</div>
            </div>
          </div>

          {/* First Blood (Optional) */}
          <div className="bg-dark-800 rounded-xl p-6 border border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase font-bold">First Blood</div>
              <div className="text-white text-sm font-bold flex items-center">
                 {challenge.firstBlood ? (
                    <>
                      <img src={`https://github.com/${challenge.firstBlood.username}.png`} className="w-5 h-5 rounded-full mr-2" alt="" />
                      {challenge.firstBlood.username} 
                    </>
                 ) : (
                    <span className="text-gray-500">Not solved yet</span>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* 🟢 2. HEADER CARD */}
        <div className="bg-dark-800 rounded-xl p-8 border border-gray-800 mb-8 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div className="flex space-x-6">
              <div className="w-20 h-20 bg-dark-700 rounded-2xl flex items-center justify-center border border-gray-700 text-gray-400 font-mono text-xs">
                <div className="text-center opacity-50">
                  0101<br/>0011
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{challenge.title}</h1>
                  <span className={`px-3 py-1 rounded text-xs font-bold border ${getDifficultyBadge(challenge.difficulty)}`}>
                    {challenge.difficulty.toUpperCase()}
                  </span>
                </div>
                <div className="text-gray-500 text-sm font-bold mb-4">{challenge.category}</div>
                <p className="text-gray-300 max-w-3xl">{challenge.description}</p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">By {challenge.author || 'Admin'}</div>
          </div>
        </div>

        {/* 🟢 3. TABS */}
        <div className="flex space-x-8 border-b border-gray-800 mb-8">
          <button 
            onClick={() => setActiveTab('details')}
            className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === 'details' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Challenge Details
            {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === 'activity' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Activity
          </button>
        </div>

        {/* 🟢 4. ACTIONS GRID (Instance & Files) */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Instance Card */}
            <div className="bg-dark-800 rounded-xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-dark-700 rounded-lg text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Instance</h3>
                    <p className="text-gray-500 text-sm">Start your instance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${instanceStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-400 text-sm capitalize">{instanceStatus}</span>
                </div>
              </div>
              
              {instanceStatus === 'online' ? (
                <div className="bg-dark-900 p-4 rounded-lg font-mono text-green-400 text-sm mb-4 border border-gray-700 break-all">
                  nc host3.wargamebandits.com 31337
                </div>
              ) : (
                <button 
                  onClick={handleStartInstance}
                  disabled={instanceStatus === 'starting'}
                  className="px-6 py-2 border border-gray-600 hover:border-white text-white rounded-lg font-medium transition-colors text-sm"
                >
                  {instanceStatus === 'starting' ? 'Starting...' : 'Start instance'}
                </button>
              )}
            </div>

            {/* Files Card */}
            <div className="bg-dark-800 rounded-xl p-6 border border-gray-800">
               <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-dark-700 rounded-lg text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Challenge Files</h3>
                    <p className="text-gray-500 text-sm">Challenge needed files</p>
                  </div>
                </div>
              </div>
              <button className="px-6 py-2 border border-gray-600 hover:border-white text-white rounded-lg font-medium transition-colors text-sm">
                Download
              </button>
            </div>
          </div>
        )}

        {/* 🟢 5. SUBMIT FLAG CARD */}
        {activeTab === 'details' && (
          <div className="bg-dark-800 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 21h18M5 11V7a5 5 0 0110 0v4" /></svg>
              </div>
              <div>
                <h3 className="text-white font-bold">Submit Flag</h3>
                <p className="text-gray-500 text-sm">Found the flag? submit it below</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">The Flag</label>
                <input 
                  type="text" 
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitFlag()}
                  placeholder="Enter flag (e.g., FLAG{...})" 
                  className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink focus:ring-1 focus:ring-accent-pink transition-all"
                />
              </div>
              <button 
                onClick={handleSubmitFlag}
                disabled={isSubmitting}
                className="px-8 py-2 bg-[#be123c] hover:bg-[#9f1239] disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Checking...
                  </>
                ) : 'Submit'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;