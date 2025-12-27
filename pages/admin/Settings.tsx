
import React, { useState } from 'react';
import { AppSettings } from '../../types';

interface SettingsProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}

const AdminSettings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const saveSettings = () => {
    setSettings(localSettings);
    alert('Settings Updated Successfully');
  };

  const updateMethod = (id: string, field: string, value: string) => {
    const updated = localSettings.paymentMethods.map(m => {
      if (m.id === id) return { ...m, [field]: value };
      return m;
    });
    setLocalSettings({ ...localSettings, paymentMethods: updated });
  };

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-10">System Settings</h1>
      
      <div className="space-y-8">
        {/* Contact Links */}
        <div className="glass p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold mb-6">Contact & Social</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Telegram Link</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500"
                value={localSettings.telegramLink}
                onChange={(e) => setLocalSettings({...localSettings, telegramLink: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">WhatsApp Number</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500"
                value={localSettings.whatsappNumber}
                onChange={(e) => setLocalSettings({...localSettings, whatsappNumber: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold mb-6">Payment Configuration</h3>
          <div className="space-y-8">
            {localSettings.paymentMethods.map((method) => (
              <div key={method.id} className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="font-black text-indigo-400 mb-4">{method.type}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Account Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 outline-none"
                      value={method.accountName}
                      onChange={(e) => updateMethod(method.id, 'accountName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Account Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 outline-none"
                      value={method.accountNumber}
                      onChange={(e) => updateMethod(method.id, 'accountNumber', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={saveSettings}
          className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] font-black text-xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
        >
          SAVE SYSTEM CHANGES
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
