
import React from 'react';
import { Link } from 'react-router-dom';
import { User, PaymentStatus } from '../../types';

interface AdminDashboardProps {
  allUsers: User[];
  logout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ allUsers, logout }) => {
  const stats = {
    totalUsers: allUsers.length,
    activeSubscriptions: allUsers.filter(u => u.paymentStatus === PaymentStatus.APPROVED).length,
    pendingPayments: allUsers.filter(u => u.paymentStatus === PaymentStatus.PENDING).length,
    blockedUsers: allUsers.filter(u => u.status === 'blocked').length
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Admin Sidebar */}
      <div className="w-72 bg-black border-r border-white/5 p-8">
        <h2 className="text-xl font-orbitron font-black text-indigo-400 mb-12">CONTROL HUB</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="flex items-center gap-4 p-4 bg-indigo-600/20 rounded-2xl text-indigo-400 font-bold">
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </Link>
          <Link to="/admin/payments" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-slate-300">
            <i className="fa-solid fa-receipt"></i> Pending Payments
            {stats.pendingPayments > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">{stats.pendingPayments}</span>}
          </Link>
          <Link to="/admin/users" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-slate-300">
            <i className="fa-solid fa-users"></i> Manage Users
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl text-slate-300">
            <i className="fa-solid fa-gears"></i> App Settings
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-4 p-4 text-red-400 mt-20">
            <i className="fa-solid fa-power-off"></i> Exit Panel
          </button>
        </nav>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">System Statistics</h1>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold">A</div>
             <p className="font-bold">Super Admin</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass p-8 rounded-[2rem]">
            <p className="text-slate-500 text-xs font-bold uppercase mb-2">Total Users</p>
            <h4 className="text-4xl font-black">{stats.totalUsers}</h4>
          </div>
          <div className="glass p-8 rounded-[2rem] border-green-500/20">
            <p className="text-slate-500 text-xs font-bold uppercase mb-2">Active VIPs</p>
            <h4 className="text-4xl font-black text-green-400">{stats.activeSubscriptions}</h4>
          </div>
          <div className="glass p-8 rounded-[2rem] border-red-500/20">
            <p className="text-slate-500 text-xs font-bold uppercase mb-2">Pending</p>
            <h4 className="text-4xl font-black text-red-400">{stats.pendingPayments}</h4>
          </div>
          <div className="glass p-8 rounded-[2rem]">
            <p className="text-slate-500 text-xs font-bold uppercase mb-2">Blocked</p>
            <h4 className="text-4xl font-black">{stats.blockedUsers}</h4>
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem]">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {allUsers.slice(-5).reverse().map(u => (
              <div key={u.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-bold">{u.username[0]}</div>
                  <div>
                    <p className="font-bold">{u.username}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase font-bold text-slate-400">{u.role}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${u.paymentStatus === PaymentStatus.APPROVED ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                    {u.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
