
import React from 'react';
import { Memo } from '../../../types';

export const StickyNotes: React.FC<{ memos: Memo[] }> = ({ memos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memos.map((memo) => (
        <div key={memo.id} className={`${memo.color} p-8 rounded-[2rem] shadow-[0_10px_20px_rgba(0,0,0,0.02)] rotate-1 hover:rotate-0 transition-transform duration-300 cursor-default border-b-4 border-black/5`}>
          <div className="w-12 h-1 w-full bg-black/5 rounded-full mb-4 mx-auto"></div>
          <p className="text-lg font-medium text-slate-800 italic leading-relaxed">"{memo.content}"</p>
        </div>
      ))}
    </div>
  );
};
