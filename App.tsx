
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, UserRole, PaymentStatus, AppSettings } from './types';
import { INITIAL_SETTINGS } from './constants';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePayments from './pages/admin/ManagePayments';
import ManageUsers from './pages/admin/ManageUsers';
import AdminSettings from './pages/admin/Settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sora_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('sora_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sora_all_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sora_user', JSON.stringify(user));
    if (user) {
      // Update the user in the allUsers list whenever current user state changes
      setAllUsers(prev => {
        const index = prev.findIndex(u => u.id === user.id);
        if (index > -1) {
          const newList = [...prev];
          newList[index] = user;
          return newList;
        }
        return prev;
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sora_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sora_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setAllUsers={setAllUsers} allUsers={allUsers} />} />
          
          {/* User Routes */}
          <Route path="/plans" element={user ? <Plans user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/payment" element={user ? <Payment user={user} setUser={setUser} settings={settings} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} settings={settings} /> : <Navigate to="/login" />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin setUser={setUser} />} />
          <Route 
            path="/admin/*" 
            element={
              user?.role === UserRole.ADMIN ? (
                <Routes>
                  <Route index element={<AdminDashboard allUsers={allUsers} logout={handleLogout} />} />
                  <Route path="payments" element={<ManagePayments allUsers={allUsers} setAllUsers={setAllUsers} />} />
                  <Route path="users" element={<ManageUsers allUsers={allUsers} setAllUsers={setAllUsers} />} />
                  <Route path="settings" element={<AdminSettings settings={settings} setSettings={setSettings} />} />
                </Routes>
              ) : (
                <Navigate to="/admin/login" />
              )
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
