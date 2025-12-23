
import { usePopoverStore } from '@/lib/usePopoverStore';
import React from 'react';

interface GreetingProps {
  userName: string;
  taskCount: number;
  progress: number;
}

export const Greeting: React.FC<GreetingProps> = ({ userName, taskCount, progress }) => {
  const [title, setTitle] = React.useState('')
  const { togglePopover } = usePopoverStore();  

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/40 border border-gray-200/60 rounded-[2.5rem] relative overflow-hidden p-4 md:p-6">
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Good Morning, <span className="text-violet-600">{userName}</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            You have <span className="text-slate-900 font-bold">{taskCount} tasks</span> remaining for today.
          </p>
        </div>

        <div className="relative max-w-md w-full">
          <input
            type="text"
            onChange={(e) => { setTitle(e.target.value) }}
            placeholder="Quick add a new task..."
            className="w-full bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl px-6 py-4 shadow-sm focus:shadow-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-300 outline-none transition-all duration-300 text-slate-700"
          />
          <button
            onClick={() => togglePopover('new-task', { title: title })}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-violet-600 text-white p-2 rounded-xl shadow-lg shadow-violet-200 hover:scale-110 active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
            <circle
              className="text-violet-600 transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (progress / 100) * 251.2}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-slate-900">{progress}%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Done</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-slate-600 bg-white/50 px-4 py-1 rounded-full border border-white/50">Keep it up!</p>
      </div>
    </div>
  );
};
