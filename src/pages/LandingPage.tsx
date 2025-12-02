import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-accent-pink to-accent-purple rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent-blue to-accent-green rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Mouse follow effect */}
      <div 
        className="pointer-events-none fixed w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle at center, rgba(255, 0, 102, 0.1), transparent 70%)`,
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-accent-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">⚔️</span>
          </div>
          <span className="text-2xl font-bold text-white">
            <span className="text-accent-pink">WARGAME</span>BANDITS
          </span>
        </div>
        
        <button
          onClick={login}
          className="px-6 py-2 border border-accent-pink text-white hover:bg-accent-pink hover:text-white transition-all duration-300 rounded-lg font-medium"
        >
          Login
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-8">
        {/* Animated icons around */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[600px] h-[600px]">
            {/* Floating category icons */}
            <FloatingIcon icon="🌐" color="purple" position={{ top: '10%', left: '10%' }} delay={0} />
            <FloatingIcon icon="💻" color="blue" position={{ top: '20%', right: '15%' }} delay={1} />
            <FloatingIcon icon="🔐" color="green" position={{ bottom: '30%', left: '5%' }} delay={2} />
            <FloatingIcon icon="🔍" color="orange" position={{ bottom: '20%', right: '10%' }} delay={3} />
            <FloatingIcon icon="🛡️" color="pink" position={{ top: '40%', left: '80%' }} delay={4} />
            <FloatingIcon icon="⚡" color="purple" position={{ top: '60%', left: '15%' }} delay={5} />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-6 relative">
          <span className="text-white">Let the </span>
          <span className="text-transparent bg-clip-text animated-gradient">
            Hack Begin!
          </span>
        </h1>

        <p className="text-xl text-gray-400 text-center max-w-2xl mb-12">
          Join a community of hackers and cybersecurity enthusiasts to
          practice and compete in a fun, gamified, and competitive way!
        </p>

        {/* CTA Button */}
        <button
          onClick={login}
          className="group relative px-8 py-4 bg-accent-pink text-white font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
            </svg>
            <span>Join Now with GitHub</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 text-center">
          <div className="glass px-6 py-4 rounded-lg">
            <div className="text-3xl font-bold text-accent-pink">50+</div>
            <div className="text-gray-400">Challenges</div>
          </div>
          <div className="glass px-6 py-4 rounded-lg">
            <div className="text-3xl font-bold text-accent-purple">200+</div>
            <div className="text-gray-400">Active Hackers</div>
          </div>
          <div className="glass px-6 py-4 rounded-lg">
            <div className="text-3xl font-bold text-accent-blue">1000+</div>
            <div className="text-gray-400">Flags Captured</div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="relative z-10 text-center pb-8">
        <button className="text-gray-400 hover:text-white transition-colors">
          What is WargameBandits? ↓
        </button>
      </div>
    </div>
  );
};

// Floating Icon Component
const FloatingIcon: React.FC<{
  icon: string;
  color: string;
  position: any;
  delay: number;
}> = ({ icon, color, position, delay }) => {
  const colorClasses: { [key: string]: string } = {
    purple: 'from-purple-500 to-purple-700',
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    pink: 'from-pink-500 to-pink-700',
  };

  return (
    <div
      className="absolute animate-float"
      style={{ 
        ...position, 
        animationDelay: `${delay}s`,
        animationDuration: '8s'
      }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
};

export default LandingPage;
