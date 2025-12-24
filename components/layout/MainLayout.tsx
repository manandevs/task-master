import React, { useState } from 'react';
import { GiCircleSparks } from 'react-icons/gi';
import { BiLogOut, BiX } from 'react-icons/bi';
import { useTaskStore } from '@/lib/useTaskStore';
import { AVATAR_OPTIONS } from '@/lib/data';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, setCurrentUser } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize state from local storage
  const [currentAvatar, setCurrentAvatar] = useState(
    localStorage.getItem('task_master_avatar') || 
    `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser}&backgroundColor=8b5cf6,6366f1`
  );

  const handleAvatarUpdate = (newAvatar: string) => {
    localStorage.setItem('task_master_avatar', newAvatar);
    setCurrentAvatar(newAvatar);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 md:px-5">
      
      {/* --- AVATAR SELECTION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 max-w-md w-full animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
            >
              <BiX size={24} />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Update Profile Picture</h3>
              <p className="text-slate-500 text-sm">Select a new look for your workspace</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {AVATAR_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAvatarUpdate(item.avatar)}
                  className={`relative transition-all duration-200 ${currentAvatar === item.avatar ? 'scale-110 ring-4 ring-violet-500 rounded-full' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                >
                  <img 
                    src={item.avatar} 
                    alt="avatar option" 
                    className="w-12 h-12 rounded-full object-cover bg-slate-100 border border-slate-200"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-10 h-20 flex items-center backdrop-blur-sm bg-slate-50/80">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-200 text-white text-4xl group-hover:rotate-12 transition-transform duration-300">
              <GiCircleSparks />
            </div>
            <span className="hidden md:block text-xl font-extrabold text-slate-700 tracking-tight">
              Task<span className="text-violet-600">Master</span>
            </span>
          </div>

          {/* User Profile & Controls */}
          <div className="flex items-center gap-2 pl-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-1.5 shadow-sm hover:shadow-md transition-all">
            
            {/* User Info (Clickable for Avatar Update) */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-2 group hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              title="Change Avatar"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 capitalize leading-none mb-1 group-hover:text-violet-600 transition-colors">{currentUser}</p>
                <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">Online</p>
              </div>
              <div className="relative">
                <img
                    src={currentAvatar}
                    alt="Profile"
                    className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm bg-violet-100 object-cover group-hover:ring-violet-200 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 bg-violet-600 text-white rounded-full p-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
              </div>
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* Logout Button */}
            <button
              onClick={() => {
                if(confirm('Are you sure you want to log out?')) {
                   localStorage.removeItem('task_master_avatar'); 
                   setCurrentUser('');
                }
              }}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Sign Out"
            >
              <BiLogOut size={20} />
            </button>
          </div>

        </div>
      </header>

      <main className="px-2 md:px-0 py-8">{children}</main>
    </div>
  );
};