import React from 'react';
import { GiCircleSparks } from 'react-icons/gi';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-slate-50 px-3 md:px-5">
    <header className="sticky top-0 z-10 h-20 flex items-center">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-200 text-white text-4xl">
          <GiCircleSparks />
        </div>

        {/* Profile Button */}
        <button className="flex items-center gap-3 px-3 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border border-gray-400/40 hover:bg-gray-50">
          <img
            src="https://picsum.photos/seed/user/100"
            alt="Profile"
            className="w-9 h-9 rounded-full ring-2 ring-violet-100"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-800">John Doe</span>
            <span className="text-xs text-slate-400">Pro Account</span>
          </div>
        </button>
      </div>
    </header>

    <main className="px-6 lg:px-12 py-8">{children}</main>
  </div>
);
