
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../../types';

interface AdminLoginProps {
  setUser: (user: User) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-set fixed credentials
    if (username === 'Admin' && password === 'Hasnain1283@') {
      const adminUser: User = {
        id: 'admin_id',
        username: 'Admin',
        email: 'admin@sora.com',
        role: UserRole.ADMIN,
        status: 'active',
        paymentStatus: 'approved' as any
      };
      setUser(adminUser);
      navigate('/admin');
    } else {
      setError('Invalid Admin Credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="glass p-10 rounded-[3rem] w-full max-w-md border-indigo-500/30">
        <h2 className="text-3xl font-orbitron font-black mb-8 text-center text-indigo-400 uppercase tracking-widest">Admin Panel</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Username</label>
            <input 
              type="text" 
              required 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-6 focus:border-indigo-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-6 focus:border-indigo-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">
            SECURE LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
