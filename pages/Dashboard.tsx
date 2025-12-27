
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, AppSettings, PaymentStatus } from '../types';

interface DashboardProps {
  user: User;
  settings: AppSettings;
}

const Dashboard: React.FC<DashboardProps> = ({ user, settings }) => {
  const [videoLink, setVideoLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quality, setQuality] = useState('1080p');

  const navigate = useNavigate();

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoLink) return;
    
    setIsProcessing(true);
    // Simulate AI Processing
    setTimeout(() => {
      setIsProcessing(false);
      setProcessed(true);
    }, 4000);
  };

  const isVip = user.paymentStatus === PaymentStatus.APPROVED;
  const isPending = user.paymentStatus === PaymentStatus.PENDING;

  return (
    <div className="min-h-screen flex bg-slate-900 overflow-x-hidden">
      {/* Sidebar Mobile Toggle Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 w-72 glass border-r border-white/10 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-8">
          <h2 className="text-2xl font-orbitron font-black gradient-text mb-12">SORA REMOVE</h2>
          <nav className="space-y-4">
            <Link to="/dashboard" className="flex items-center gap-4 p-4 bg-indigo-600/20 rounded-2xl text-indigo-400 font-bold">
              <i className="fa-solid fa-house"></i> Dashboard
            </Link>
            <a href={settings.telegramLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-slate-300 transition-all">
              <i className="fa-brands fa-telegram text-xl text-blue-400"></i> Join Telegram
            </a>
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-slate-300 transition-all">
              <i className="fa-brands fa-whatsapp text-xl text-green-400"></i> Admin WhatsApp
            </a>
            {!isVip && (
              <Link to="/plans" className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl text-white font-bold animate-pulse">
                <i className="fa-solid fa-crown"></i> Upgrade to VIP
              </Link>
            )}
            <button onClick={() => { localStorage.removeItem('sora_user'); window.location.href = '/'; }} className="w-full flex items-center gap-4 p-4 hover:bg-red-500/10 rounded-2xl text-red-400 transition-all mt-20">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-2xl p-2">
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
          <div className="text-right ml-auto">
            <h3 className="text-slate-400 text-sm">Welcome back,</h3>
            <p className="text-xl font-bold">{user.username}</p>
          </div>
        </header>

        <div className="glass p-8 lg:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10"></div>
          
          <h1 className="text-4xl font-orbitron font-black mb-2">WELCOME TO <span className="text-indigo-400">SORA AI</span></h1>
          <p className="text-slate-400 mb-12">Remove video watermarks instantly with ultra high quality.</p>

          {!isVip && (
            <div className="bg-amber-500/10 border border-amber-500/50 p-6 rounded-3xl mb-12 flex items-center gap-4">
              <i className="fa-solid fa-circle-exclamation text-3xl text-amber-500"></i>
              <div>
                <p className="font-bold text-amber-500">PLEASE UPGRADE TO VIP PLAN</p>
                <p className="text-sm text-slate-400">Your plan status: {isPending ? 'Pending Approval' : 'No Active Plan'}</p>
              </div>
              <Link to="/plans" className="ml-auto px-6 py-2 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all whitespace-nowrap">Upgrade Now</Link>
            </div>
          )}

          <div className={`${!isVip ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
            <form onSubmit={handleProcess} className="mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <i className="fa-solid fa-link absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input 
                    type="url" 
                    placeholder="Paste Sora/TikTok video link here..." 
                    className="w-full bg-slate-800/80 border border-white/10 rounded-2xl py-5 px-12 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
                </div>
                <button 
                  disabled={isProcessing}
                  className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isProcessing ? 'PROCESSING...' : 'REMOVE NOW'}
                </button>
              </div>
            </form>

            {isProcessing && (
              <div className="text-center py-20">
                <div className="inline-block w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="text-2xl font-bold animate-pulse">AI is removing watermark...</h3>
                <p className="text-slate-400">Please wait while we enhance your video to {quality}</p>
              </div>
            )}

            {processed && !isProcessing && (
              <div className="space-y-8 animate-fade-in">
                <div className="glass rounded-[2rem] aspect-video w-full max-w-3xl mx-auto overflow-hidden relative group">
                  <img src="https://picsum.photos/1200/800" className="w-full h-full object-cover" alt="Result" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <i className="fa-solid fa-circle-play text-7xl text-white"></i>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['720p HD', '1080p FHD', '2K QHD', '4K UHD'].map((q) => (
                    <button 
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`p-4 rounded-2xl border transition-all font-bold ${quality === q ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800/50 border-white/10 hover:border-white/20'}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => { alert(`Downloading video in ${quality}...`); }}
                    className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
                  >
                    <i className="fa-solid fa-download"></i> DOWNLOAD NOW
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
