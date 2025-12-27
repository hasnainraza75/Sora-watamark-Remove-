
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6">
        <span className="gradient-text">SORA AI</span><br />
        WATERMARK REMOVER
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12">
        The ultimate professional tool to remove watermarks from AI-generated videos and social media clips in 4K resolution.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        {user ? (
          <Link 
            to="/dashboard" 
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
            >
              Join Premium
            </Link>
          </>
        )}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="glass p-8 rounded-3xl">
          <i className="fa-solid fa-bolt text-4xl text-indigo-400 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Instant Removal</h3>
          <p className="text-slate-400">Process videos in seconds with our advanced AI processing engine.</p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <i className="fa-solid fa-gem text-4xl text-purple-400 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">4K Quality</h3>
          <p className="text-slate-400">Export your videos in crystal clear 4K, 2K, or 1080p resolution.</p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <i className="fa-solid fa-lock text-4xl text-pink-400 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
          <p className="text-slate-400">Your data is processed securely and encrypted at all times.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
