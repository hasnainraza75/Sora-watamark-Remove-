
import React from 'react';
import { User } from '../../types';

interface ManageUsersProps {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ManageUsers: React.FC<ManageUsersProps> = ({ allUsers, setAllUsers }) => {
  const toggleBlock = (userId: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'blocked' : 'active' };
      }
      return u;
    }));
  };

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setAllUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">User Database</h1>
      <div className="glass rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <th className="p-6">User</th>
              <th className="p-6">Status</th>
              <th className="p-6">Plan</th>
              <th className="p-6">Subscription</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {allUsers.filter(u => u.role !== 'admin').map(user => (
              <tr key={user.id} className="hover:bg-white/5 transition-all">
                <td className="p-6">
                  <p className="font-bold">{user.username}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-6">
                  <span className="text-slate-300 font-bold uppercase text-xs">
                    {user.planId || 'None'}
                  </span>
                </td>
                <td className="p-6">
                  <p className="text-sm">
                    {user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString() : 'Inactive'}
                  </p>
                </td>
                <td className="p-6 text-right space-x-2">
                  <button 
                    onClick={() => toggleBlock(user.id)}
                    className={`p-2 rounded-lg transition-all ${user.status === 'active' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}
                    title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                  >
                    <i className={`fa-solid ${user.status === 'active' ? 'fa-user-slash' : 'fa-user-check'}`}></i>
                  </button>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
