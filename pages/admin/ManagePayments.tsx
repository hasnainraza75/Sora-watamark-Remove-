
import React from 'react';
import { User, PaymentStatus } from '../../types';

interface ManagePaymentsProps {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ManagePayments: React.FC<ManagePaymentsProps> = ({ allUsers, setAllUsers }) => {
  const pendingUsers = allUsers.filter(u => u.paymentStatus === PaymentStatus.PENDING);

  const handleAction = (userId: string, action: PaymentStatus) => {
    const nextList = allUsers.map(u => {
      if (u.id === userId) {
        let subscriptionEndDate;
        if (action === PaymentStatus.APPROVED) {
           const days = u.planId === 'weekly' ? 7 : u.planId === 'monthly' ? 30 : 365;
           const date = new Date();
           date.setDate(date.getDate() + days);
           subscriptionEndDate = date.toISOString();
        }
        return { ...u, paymentStatus: action, subscriptionEndDate };
      }
      return u;
    });
    setAllUsers(nextList);
  };

  return (
    <div className="p-10 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Payment Requests</h1>

      {pendingUsers.length === 0 ? (
        <div className="glass p-12 text-center rounded-[3rem]">
          <i className="fa-solid fa-check-double text-5xl text-green-500 mb-4"></i>
          <h3 className="text-xl font-bold">No pending payments</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pendingUsers.map(user => (
            <div key={user.id} className="glass p-8 rounded-[3rem] space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{user.username}</h3>
                  <p className="text-slate-400 text-sm">{user.email}</p>
                </div>
                <div className="bg-indigo-600 px-4 py-1 rounded-full text-xs font-black uppercase">
                  {user.planId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-slate-500 mb-1">Method</p>
                  <p className="font-bold">{user.paymentMethod}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-slate-500 mb-1">TID</p>
                  <p className="font-bold text-indigo-400">{user.transactionId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-300 mb-2">Payment Evidence:</p>
                <div className="rounded-2xl overflow-hidden border border-white/10">
                   <img src={user.paymentScreenshot} alt="Screenshot" className="w-full h-auto max-h-64 object-contain bg-black" />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleAction(user.id, PaymentStatus.APPROVED)}
                  className="flex-1 py-4 bg-green-600 rounded-2xl font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-500/20"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleAction(user.id, PaymentStatus.REJECTED)}
                  className="flex-1 py-4 bg-red-600 rounded-2xl font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-500/20"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePayments;
