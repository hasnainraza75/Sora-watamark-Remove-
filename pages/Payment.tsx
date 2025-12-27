
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AppSettings, PaymentStatus } from '../types';
import { PLANS } from '../constants';

interface PaymentProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  settings: AppSettings;
}

const Payment: React.FC<PaymentProps> = ({ user, setUser, settings }) => {
  const [selectedMethod, setSelectedMethod] = useState(settings.paymentMethods[0]?.id || '');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectedPlan = PLANS.find(p => p.id === user.planId);
  const currentMethod = settings.paymentMethods.find(m => m.id === selectedMethod);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      alert('Please upload a payment screenshot');
      return;
    }

    const updatedUser: User = {
      ...user,
      paymentStatus: PaymentStatus.PENDING,
      transactionId,
      paymentScreenshot: screenshot,
      paymentMethod: currentMethod?.type
    };

    setUser(updatedUser);
    navigate('/dashboard');
  };

  if (!selectedPlan) return <div className="p-20 text-center">Plan not selected.</div>;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto glass p-8 md:p-12 rounded-[3rem]">
        <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">Complete <span className="text-indigo-400">Payment</span></h2>

        <div className="bg-indigo-600/20 p-6 rounded-3xl mb-8 border border-indigo-500/30">
          <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Payable Amount</p>
          <p className="text-4xl font-black">PKR {selectedPlan.price}</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-300 mb-3">Select Category</label>
          <div className="grid grid-cols-1 gap-3">
            {settings.paymentMethods.map(method => (
              <button 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-2xl border transition-all text-left flex justify-between items-center ${selectedMethod === method.id ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-800/50 border-white/10 hover:border-white/20'}`}
              >
                <span className="font-bold">{method.type}</span>
                {selectedMethod === method.id && <i className="fa-solid fa-check-circle text-indigo-400"></i>}
              </button>
            ))}
          </div>
        </div>

        {currentMethod && (
          <div className="bg-slate-800/50 p-6 rounded-3xl mb-8 border border-white/10 space-y-4">
            <h4 className="font-bold text-indigo-300">Bank Account Details:</h4>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Account Name</p>
              <p className="text-lg font-bold">{currentMethod.accountName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Account Number</p>
              <p className="text-lg font-bold flex items-center gap-3">
                {currentMethod.accountNumber}
                <button onClick={() => navigator.clipboard.writeText(currentMethod.accountNumber)} className="text-sm text-slate-400 hover:text-white">
                  <i className="fa-regular fa-copy"></i>
                </button>
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Transaction ID</label>
            <input 
              type="text" 
              required 
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter TID from SMS"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Payment Screenshot</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden" 
                id="screenshot-upload"
              />
              <label 
                htmlFor="screenshot-upload" 
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all"
              >
                {screenshot ? (
                  <img src={screenshot} alt="Preview" className="max-h-32 rounded-xl mb-2" />
                ) : (
                  <>
                    <i className="fa-solid fa-image text-3xl text-slate-500 mb-2"></i>
                    <p className="text-slate-400 text-sm">Upload Screenshot (JPG/PNG)</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
