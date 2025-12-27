
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const savedUsers = JSON.parse(localStorage.getItem('sora_all_users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      if (foundUser.status === 'blocked') {
        setError('Your account has been blocked. Contact admin.');
        return;
      }
      setSuccess('Login Successful!');
      setTimeout(() => {
        setUser(foundUser);
        navigate('/dashboard');
      }, 1500);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="glass p-8 md:p-12 rounded-[2.5rem] w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 scale-150">
          <i className="fa-solid fa-user-lock text-9xl"></i>
        </div>

        <h2 className="text-3xl font-orbitron font-bold mb-2 text-center">Welcome <span className="text-indigo-400">Back</span></h2>
        <p className="text-slate-400 text-center mb-8">Login to your premium account</p>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i> {error}
        </div>}
        
        {success && <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-check"></i> {success}
        </div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                type="email" 
                required 
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-3 px-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                type="password" 
                required 
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-3 px-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold shadow-xl hover:scale-[1.02] transition-transform active:scale-95"
          >
            Login Now
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account? <Link to="/register" className="text-indigo-400 font-bold hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
