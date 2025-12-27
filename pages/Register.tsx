
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole, PaymentStatus } from '../types';

interface RegisterProps {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Register: React.FC<RegisterProps> = ({ allUsers, setAllUsers }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (allUsers.find(u => u.email === formData.email)) {
      setError('Email already exists');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: UserRole.USER,
      status: 'active',
      paymentStatus: PaymentStatus.NONE
    };

    setAllUsers([...allUsers, newUser]);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="glass p-8 md:p-12 rounded-[2.5rem] w-full max-w-md shadow-2xl relative overflow-hidden">
        <h2 className="text-3xl font-orbitron font-bold mb-2 text-center">Create <span className="text-purple-400">Account</span></h2>
        <p className="text-slate-400 text-center mb-8">Join the elite video editors</p>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl mb-6 text-sm">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input 
              type="text" 
              required 
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="Your name"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input 
              type="email" 
              required 
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold shadow-xl hover:scale-[1.02] transition-transform active:scale-95"
          >
            Register Now
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Already have an account? <Link to="/login" className="text-purple-400 font-bold hover:underline">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
