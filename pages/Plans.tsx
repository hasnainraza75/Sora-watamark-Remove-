
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Plan } from '../types';
import { PLANS } from '../constants';

interface PlansProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Plans: React.FC<PlansProps> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: Plan) => {
    setUser({ ...user, planId: plan.id });
    navigate('/payment');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">Choose Your <span className="gradient-text">Power Plan</span></h2>
        <p className="text-slate-400 mb-16">Unlock the full potential of Sora AI watermarks removal</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`glass p-8 rounded-[3rem] relative flex flex-col transition-all hover:scale-105 ${plan.id === 'monthly' ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : ''}`}
            >
              {plan.id === 'monthly' && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold py-1 px-4 rounded-full uppercase tracking-widest">Most Popular</span>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-sm font-medium text-slate-400">PKR</span>
                <span className="text-5xl font-black gradient-text"> {plan.price}</span>
              </div>

              <div className="flex-grow space-y-4 mb-10 text-left">
                <p className="font-bold text-slate-300">PLANS DETAILS:</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <i className="fa-solid fa-check-circle text-indigo-400 mt-1"></i>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSelectPlan(plan)}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold hover:shadow-lg transition-all"
              >
                Buy Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
