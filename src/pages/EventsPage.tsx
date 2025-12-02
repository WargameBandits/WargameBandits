import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// 이벤트 데이터 타입 정의
interface Event {
  id: number;
  title: string;
  imageUrl: string; // 이미지 URL
  status: 'upcoming' | 'ongoing' | 'ended';
  date: string;
}

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);

  // Mock Data (실제 데이터 연동 시 교체)
  const mockEvents: Event[] = [
    {
      id: 1,
      title: "2025 WargameBandits CTF Qualification",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", // 사이버 보안 관련 무료 이미지
      status: "upcoming",
      date: "Starts Dec 15, 2025"
    },
    {
      id: 2,
      title: "Whitehat School Winter Camp",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      status: "ended",
      date: "Ended Nov 20, 2025"
    },
    {
      id: 3,
      title: "System Hacking Workshop",
      imageUrl: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      status: "ended",
      date: "Ended Oct 10, 2025"
    },
    {
      id: 4,
      title: "ASC Regular CTF 2024",
      imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      status: "ended",
      date: "Ended Sep 05, 2024"
    }
  ];

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* 🟢 SIDEBAR (공통 레이아웃) */}
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

          {/* 현재 페이지 활성화 */}
          <Link to="/events" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-dark-700 text-white mb-2">
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
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Events</h1>
          
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

        {/* 🟢 EVENT LIST CONTENT */}
        <div className="mb-6">
          <p className="text-gray-400">All events hosted by WargameBandits</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-pink"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-dark-800 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-gray-800 hover:border-gray-600 group"
              >
                {/* Event Image Banner */}
                <div className="h-40 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Status Badge */}
                  {event.status === 'upcoming' && (
                    <span className="absolute top-3 right-3 z-20 bg-accent-pink text-white text-xs font-bold px-2 py-1 rounded">
                      UPCOMING
                    </span>
                  )}
                </div>

                {/* Event Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-4 line-clamp-2 h-14">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm border-t border-gray-700 pt-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;