import React, { useState } from 'react';
import { User, Bell, Shield, Globe, LogOut, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileSettings() {
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  const handleSave = () => {
     toast.success("Settings saved successfully.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Settings</h1>
        <p className="text-stone-500">Manage your account preferences and privacy controls.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
         <div className="p-6 border-b border-stone-100 flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
               <User className="w-8 h-8" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-stone-900">Guest User</h2>
               <p className="text-sm text-stone-500">guest@peacenet.app</p>
            </div>
            <button className="ml-auto px-4 py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors">
               Edit Profile
            </button>
         </div>

         <div className="divide-y divide-stone-100">
            {/* Notifications */}
            <div className="p-6">
               <div className="flex items-center gap-3 mb-4 text-stone-900 font-bold">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <h3>Notifications</h3>
               </div>
               <div className="flex items-center justify-between py-2">
                  <span className="text-stone-600 text-sm">Receive email updates about community activity</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="sr-only peer" />
                     <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
               </div>
            </div>

            {/* Privacy */}
            <div className="p-6">
               <div className="flex items-center gap-3 mb-4 text-stone-900 font-bold">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3>Privacy & Data</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                     <span className="text-stone-600 text-sm">Allow anonymous data collection for research</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={dataCollection} onChange={(e) => setDataCollection(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                     </label>
                  </div>
                  <button className="text-sm text-red-500 font-medium hover:text-red-600">Delete all my data</button>
               </div>
            </div>

            {/* Language */}
            <div className="p-6">
               <div className="flex items-center gap-3 mb-4 text-stone-900 font-bold">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <h3>Language</h3>
               </div>
               <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors">
                  <span className="text-sm font-medium text-stone-700">English (US)</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
               </div>
            </div>
         </div>
      </div>

      <div className="flex justify-between items-center pt-4">
         <button className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Log Out</span>
         </button>
         <button 
            onClick={handleSave}
            className="px-6 py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-colors shadow-md"
         >
            Save Changes
         </button>
      </div>
    </div>
  );
}
