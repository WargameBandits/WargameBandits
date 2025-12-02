import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CreateChallengePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    category: 'web',
    difficulty: 'easy',
    points: 100,
    description: '',
    flag: '',
    file: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: 실제 백엔드 연동 (FireBase or API)
    console.log('Submitting Challenge:', formData);

    // 임시로 1.5초 뒤 대시보드로 이동
    setTimeout(() => {
      setLoading(false);
      alert('Challenge Created Successfully!');
      navigate('/challenges');
    }, 1500);
  };

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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-500 text-sm font-medium">
             Admin Zone <span className="mx-2">/</span> <span className="text-white">Create Challenge</span>
          </div>
          <div className="flex items-center space-x-3">
            <img src={`https://github.com/${user?.githubUsername || 'ghost'}.png`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-accent-pink" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800 rounded-xl border border-gray-800 p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-accent-pink/10 rounded-lg text-accent-pink">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Create New Challenge</h1>
                <p className="text-gray-400">Share your knowledge by creating a new wargame challenge.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Challenge Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink transition-colors"
                    placeholder="e.g., SQL Injection 101"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink transition-colors"
                  >
                    <option value="web">Web Hacking</option>
                    <option value="pwn">System Hacking (Pwn)</option>
                    <option value="reverse">Reverse Engineering</option>
                    <option value="crypto">Cryptography</option>
                    <option value="forensics">Forensics</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>
              </div>

              {/* Difficulty & Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink transition-colors"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">Points</label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink transition-colors"
                    placeholder="e.g., 100"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2">Description (Markdown supported)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-pink transition-colors"
                  placeholder="Explain the challenge goal and provide hints..."
                  required
                ></textarea>
              </div>

              {/* Flag */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2">Flag</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🏁</span>
                  </div>
                  <input
                    type="text"
                    name="flag"
                    value={formData.flag}
                    onChange={handleChange}
                    className="w-full bg-dark-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent-pink transition-colors"
                    placeholder="ASC{...}"
                    required
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2">Attachment (Optional)</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-accent-pink transition-colors cursor-pointer bg-dark-900">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="file-upload" 
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-400">
                      {formData.file ? (
                        <span className="text-accent-pink font-bold">{formData.file.name}</span>
                      ) : (
                        "Click to upload or drag and drop source code/binary"
                      )}
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Link to="/challenges" className="px-6 py-3 mr-4 text-gray-400 hover:text-white font-bold transition-colors">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-accent-pink to-purple-600 hover:opacity-90 text-white rounded-lg font-bold shadow-lg shadow-accent-pink/20 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Challenge"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallengePage;